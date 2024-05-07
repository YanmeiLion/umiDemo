import React, { useState, useEffect } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
// import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import styles from './index.less';

// 改写转html（兼容lineheight样式设置)
import customDraftToHtml from './draftEditor/CustomDraftjsToHtml/index.js';

// 改写转draftjs (兼容lineHeight样式回显)
import customHtmlToDraft from './draftEditor/CustomHtmlToDraftjs/index.js';

// import htmlToDraft from 'html-to-draftjs';
// import draftToHtml from 'draftjs-to-html';

import redraft, { createStylesRenderer, createBlockRenderer } from 'redraft';

// 引入module
import CustomOption from './draftEditor/CustomOption';
import LineHeightOption from './draftEditor/LineHeightOption';
import ColorOption from './draftEditor/ColorOption';
import CustomColorSet from './draftEditor/CustomColorSet';
const obj = {
  blocks: [
    {
      key: '8a4p1',
      text: 'aaaa',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [
        {
          offset: 0,
          length: 4,
          style: 'BOLD',
        },
        {
          offset: 0,
          length: 4,
          style: 'fontsize-24',
        },
      ],
      entityRanges: [],
      data: {},
    },
    {
      key: '4267v',
      text: '哈哈哈哈😂',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [
        {
          offset: 0,
          length: 5,
          style: 'fontsize-24',
        },
      ],
      entityRanges: [],
      data: {},
    },
    {
      key: '4h250',
      text: '阿斯顿发 ',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [
        {
          offset: 0,
          length: 4,
          style: 'fontsize-24',
        },
      ],
      entityRanges: [
        {
          offset: 0,
          length: 4,
          key: 0,
        },
      ],
      data: {},
    },
  ],
  entityMap: {
    0: {
      type: 'LINK',
      mutability: 'MUTABLE',
      data: {
        url: 'http://baidu.com',
        targetOption: '_self',
      },
    },
  },
};

const strTemp =
  '<p style="margin: 0;"><span style="font-size: 24px;line-height: 3rem; color: rgba(255,33,56);">1212</span></p><p style="margin: 0;"><span style="font-size: 24px;line-height: 3rem;">wseraqwer </span></p>';

// const strTemp =
//   '<p style="margin: 0; margin-left:0px;">11</p><p style="margin: 0; text-align: center;">&nbsp;</p><p style="margin: 0; margin: 0;">22</p>';
const addBreaklines = (children) => children.map((child) => [child, <br />]);
const renderers = {
  inline: {
    BOLD: (children, { key }) => <strong key={key}>{children}</strong>,
    ITALIC: (children, { key }) => <em key={key}>{children}</em>,
    UNDERLINE: (children, { key }) => <u key={key}>{children}</u>,
    STRIKETHROUGH: (children, { key }) => <del key={key}>{children}</del>,
    'fontsize-30': (children, { key }) => (
      <span key={key} style={{ fontSize: '30px' }}>
        {children}
      </span>
    ),
    'fontsize-24': (children, { key }) => (
      <span key={key} style={{ fontSize: '24px' }}>
        {children}
      </span>
    ),
    'fontfamily-Comic Sans MS': (children, { key }) => (
      <span key={key} style={{ fontFamily: 'Comic Sans MS' }}>
        {children}
      </span>
    ),
  },

  entities: {
    // key is the entity key value from raw
    LINK: (children, data, { key }) => (
      <a key={key} href={data.url} target="_blank">
        {children}
      </a>
    ),
  },
  blocks: {
    unstyled: (children) =>
      children.map((child) => <p style={{ margin: 0 }}>{child}</p>),
    blockquote: (children) => (
      <blockquote>{addBreaklines(children)}</blockquote>
    ),
    'header-one': (children) => children.map((child) => <h1>{child}</h1>),
    'header-two': (children) => children.map((child) => <h2>{child}</h2>),
    // or depth for nested lists
    'unordered-list-item': (children, { depth, keys }) => (
      <ul key={keys[keys.length - 1]} className={`ul-level-${depth}`}>
        {children.map((child) => (
          <li>{child}</li>
        ))}
      </ul>
    ),

    'ordered-list-item': (children, { depth, keys }) => (
      <ol key={keys.join('|')} className={`ol-level-${depth}`}>
        {children.map((child, index) => (
          <li key={keys[index]}>{child}</li>
        ))}
      </ol>
    ),
    // If your blocks use meta data it can also be accessed like keys
    atomic: (children, { keys, data }) =>
      children.map((child, i) => <Atomic key={keys[i]} {...data[i]} />),
  },
};

const fontArray = [
  '微软雅黑',
  '宋体',
  '仿宋体',
  '黑体',
  'Arial',
  'Arial Black',
  'Book Antiqua',
  'Comic Sans MS',
  'Courier New',
  'Georgia',
  'Helvetica',
  'Lucida Grande',
  'Impact',
  'Montserrat',
  'Oswald',
  'Palatino',
  'Tahoma',
  'Terminal',
  'Times New Roman',
  'Verdana',
];

export default function draftEditor() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const [html, setHtml] = useState();

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    let draftHtml = '';
    draftHtml = customDraftToHtml(
      convertToRaw(editorState.getCurrentContent()),
    );
    draftHtml = replaceHtml(draftHtml);
    draftHtml = searchStrAndAppendStr(draftHtml, '<p style="', 'margin: 0; ');

    draftHtml = replaceBrHtml(draftHtml);
    setHtml(draftHtml);
  };

  // 替换空内容P标签为换行符号
  const replaceBrHtml = (
    str,
    searchStr = '<p style=',
    appendStr = '&nbsp;',
  ) => {
    //   const arr = '<p style="margin: 0; margin: 0;"></p>';
    let strBuf = str;

    // 查询字符出现的第一个索引位置
    let index = strBuf.indexOf(searchStr);

    while (index != -1) {
      const befortPIndex = strBuf.indexOf('>', index);
      const lastPIndex = strBuf.indexOf('</p>', index);

      if (lastPIndex - befortPIndex === 1) {
        strBuf =
          strBuf.slice(0, befortPIndex + 1) +
          appendStr +
          strBuf.slice(lastPIndex);
      }

      //查询第二，三,n个字符出现位置
      index = strBuf.indexOf(searchStr, index + 1);
    }

    return strBuf.toString();
  };

  // 替换没有style样式的p标签
  const replaceHtml = (theStr) => {
    let newHtml = theStr;
    newHtml = newHtml.replace(/<p>/g, '<p style="margin: 0;">');
    return newHtml;
  };

  useEffect(() => {
    const contentHtml = customHtmlToDraft(strTemp);

    const contentState_new = ContentState.createFromBlockArray(
      contentHtml.contentBlocks,
    );
    const editorState_new = EditorState.createWithContent(contentState_new);
    setEditorState(editorState_new);
  }, []);

  const searchStrAndAppendStr = (str, searchStr, appendStr) => {
    let strBuf = str;

    // 查询字符出现的第一个索引位置
    let index = strBuf.indexOf(searchStr);
    let searchStrLength = searchStr.split('').length;

    while (index != -1) {
      // 添加字符
      strBuf =
        strBuf.slice(0, index + searchStrLength) +
        appendStr +
        strBuf.slice(index + searchStrLength);

      //查询第二，三,n个字符出现位置
      index = strBuf.indexOf(searchStr, index + 1);
    }
    return strBuf.toString();
  };

  return (
    <div>
      外层 react-draft-wysiwyg
      <Editor
        editorState={editorState}
        wrapperClassName={styles['demo-wrapper']}
        editorClassName={styles['demo-editor']}
        toolbarClassName={styles['toolbar-class']}
        placeholder="请输入内容"
        onEditorStateChange={onEditorStateChange}
        localization={{ locale: 'zh' }}
        // add star
        toolbarCustomButtons={[<CustomOption />, <LineHeightOption />]}
        // <ColorOption />,

        toolbar={{
          options: [
            'inline',
            // 'blockType',
            'fontSize',
            'fontFamily',
            'list',
            'textAlign',
            'colorPicker',
            'link',
            'emoji',
          ],
          inline: {
            options: ['bold', 'italic', 'underline', 'strikethrough'],
          },
          fontFamily: {
            options: fontArray,
            className: undefined,
            component: undefined,
            dropdownClassName: undefined,
          },
          // colorPicker: {
          //   // icon: color,
          //   // className: undefined,
          //   // component: undefined,
          //   popupClassName: undefined,
          //   colors: [
          //     'rgb(97,189,109)',
          //     'rgb(26,188,156)',
          //     'rgb(84,172,210)',
          //     'rgb(44,130,201)',
          //     '',
          //   ],
          // },
          // colorPicker: { component: ColorOption },
          colorPicker: { component: CustomColorSet },
        }}
      />
      <textarea
        disabled
        style={{ width: '100%', minHeight: '100px' }}
        value={customDraftToHtml(convertToRaw(editorState.getCurrentContent()))}
      />
      <div>
        {redraft(convertToRaw(editorState.getCurrentContent()), renderers)}
      </div>
      <div
        style={{ border: '1px blue solid', minHeight: '100px' }}
        // dangerouslySetInnerHTML={{ __html: html }}
        dangerouslySetInnerHTML={{ __html: html }}
      ></div>
    </div>
  );
}
