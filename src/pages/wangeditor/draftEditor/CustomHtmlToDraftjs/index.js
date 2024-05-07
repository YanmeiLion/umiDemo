/* @flow */

import { CharacterMetadata, ContentBlock, genKey, Entity } from 'draft-js';
import { Map, List, OrderedMap, OrderedSet } from 'immutable';
import {
  createTextChunk,
  getSoftNewlineChunk,
  getEmptyChunk,
  getBlockDividerChunk,
  getFirstBlockChunk,
  getAtomicBlockChunk,
  joinChunks,
} from './chunkBuilder';
import getBlockTypeForTag from './getBlockTypeForTag';
import processInlineTag from './processInlineTag';

const SPACE = ' ';
const REGEX_NBSP = new RegExp('&nbsp;', 'g');

let firstBlock = true;

function getBlockData(node) {
  if (node.style.textAlign) {
    return new Map({
      'text-align': node.style.textAlign,
    });
  } else if (node.style.marginLeft) {
    return new Map({
      'margin-left': node.style.marginLeft,
    });
  }
  return undefined;
}

const getSafeBodyFromHTML = (html) => {
  var doc;
  var root = null;
  if (document.implementation && document.implementation.createHTMLDocument) {
    doc = document.implementation.createHTMLDocument('foo');
    doc.documentElement.innerHTML = html;
    root = doc.getElementsByTagName('body')[0];
  }
  return root;
};

const getEntityId = (node) => {
  let entityId = undefined;
  if (node instanceof HTMLAnchorElement) {
    const entityConfig = {};
    if (node.dataset && node.dataset.mention !== undefined) {
      entityConfig.url = node.href;
      entityConfig.text = node.innerHTML;
      entityConfig.value = node.dataset.value;
      entityId = Entity.__create('MENTION', 'IMMUTABLE', entityConfig);
    } else {
      entityConfig.url = node.getAttribute
        ? node.getAttribute('href') || node.href
        : node.href;
      entityConfig.title = node.innerHTML;
      entityConfig.targetOption = node.target;
      entityId = Entity.__create('LINK', 'MUTABLE', entityConfig);
    }
  }
  return entityId;
};

function genFragment(
  node,
  inlineStyle,
  depth,
  lastList,
  inEntity,
  customChunkGenerator,
) {
  const nodeName = node.nodeName.toLowerCase();

  if (customChunkGenerator) {
    const value = customChunkGenerator(nodeName, node);
    if (value) {
      const entityId = Entity.__create(
        value.type,
        value.mutability,
        value.data || {},
      );
      return { chunk: getAtomicBlockChunk(entityId) };
    }
  }

  if (nodeName === '#text' && node.textContent !== '\n') {
    return createTextChunk(node, inlineStyle, inEntity);
  }

  if (nodeName === 'br') {
    return { chunk: getSoftNewlineChunk() };
  }

  if (nodeName === 'img' && node instanceof HTMLImageElement) {
    const entityConfig = {};
    entityConfig.src = node.getAttribute
      ? node.getAttribute('src') || node.src
      : node.src;
    entityConfig.alt = node.alt;
    entityConfig.height = node.style.height;
    entityConfig.width = node.style.width;
    if (node.style.float) {
      entityConfig.alignment = node.style.float;
    }
    const entityId = Entity.__create('IMAGE', 'MUTABLE', entityConfig);
    return { chunk: getAtomicBlockChunk(entityId) };
  }

  if (nodeName === 'video' && node instanceof HTMLVideoElement) {
    const entityConfig = {};
    entityConfig.src = node.getAttribute
      ? node.getAttribute('src') || node.src
      : node.src;
    entityConfig.alt = node.alt;
    entityConfig.height = node.style.height;
    entityConfig.width = node.style.width;
    if (node.style.float) {
      entityConfig.alignment = node.style.float;
    }
    const entityId = Entity.__create('VIDEO', 'MUTABLE', entityConfig);
    return { chunk: getAtomicBlockChunk(entityId) };
  }

  if (nodeName === 'iframe' && node instanceof HTMLIFrameElement) {
    const entityConfig = {};
    entityConfig.src = node.getAttribute
      ? node.getAttribute('src') || node.src
      : node.src;
    entityConfig.height = node.height;
    entityConfig.width = node.width;
    const entityId = Entity.__create('EMBEDDED_LINK', 'MUTABLE', entityConfig);
    return { chunk: getAtomicBlockChunk(entityId) };
  }

  const blockType = getBlockTypeForTag(nodeName, lastList);

  let chunk;
  if (blockType) {
    if (nodeName === 'ul' || nodeName === 'ol') {
      lastList = nodeName;
      depth += 1;
    } else {
      if (
        blockType !== 'unordered-list-item' &&
        blockType !== 'ordered-list-item'
      ) {
        lastList = '';
        depth = -1;
      }
      if (!firstBlock) {
        chunk = getBlockDividerChunk(blockType, depth, getBlockData(node));
      } else {
        chunk = getFirstBlockChunk(blockType, getBlockData(node));
        firstBlock = false;
      }
    }
  }
  if (!chunk) {
    chunk = getEmptyChunk();
  }

  inlineStyle = processInlineTag(nodeName, node, inlineStyle);

  let child = node.firstChild;
  while (child) {
    const entityId = getEntityId(child);
    const { chunk: generatedChunk } = genFragment(
      child,
      inlineStyle,
      depth,
      lastList,
      entityId || inEntity,
      customChunkGenerator,
    );
    chunk = joinChunks(chunk, generatedChunk);
    const sibling = child.nextSibling;
    child = sibling;
  }

  return { chunk };
}

function getChunkForHTML(html, customChunkGenerator) {
  const sanitizedHtml = html.trim().replace(REGEX_NBSP, SPACE);
  const safeBody = getSafeBodyFromHTML(sanitizedHtml);
  if (!safeBody) {
    return null;
  }
  firstBlock = true;
  const { chunk } = genFragment(
    safeBody,
    new OrderedSet(),
    -1,
    '',
    undefined,
    customChunkGenerator,
  );
  return { chunk };
}

export default function customHtmlToDraft(html, customChunkGenerator) {
  const chunkData = getChunkForHTML(html, customChunkGenerator);

  if (chunkData) {
    const { chunk } = chunkData;

    let entityMap = new OrderedMap({});
    chunk.entities &&
      chunk.entities.forEach((entity) => {
        if (entity) {
          entityMap = entityMap.set(entity, Entity.__get(entity));
        }
      });
    let start = 0;

    return {
      contentBlocks: chunk.text.split('\r').map((textBlock, ii) => {
        const end = start + textBlock.length;
        const inlines = chunk && chunk.inlines.slice(start, end);
        const entities = chunk && chunk.entities.slice(start, end);
        const characterList = new List(
          inlines.map((style, index) => {
            const data = { style, entity: null };
            if (entities[index]) {
              data.entity = entities[index];
            }

            return CharacterMetadata.create(data);
          }),
        );
        start = end;
        return new ContentBlock({
          key: genKey(),
          type:
            (chunk && chunk.blocks[ii] && chunk.blocks[ii].type) || 'unstyled',
          depth: chunk && chunk.blocks[ii] && chunk.blocks[ii].depth,
          data:
            (chunk && chunk.blocks[ii] && chunk.blocks[ii].data) || new Map({}),
          text: textBlock,
          characterList,
        });
      }),
      entityMap,
    };
  }
  return null;
}
