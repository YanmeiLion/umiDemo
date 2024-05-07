import { EditorState, Modifier, RichUtils } from 'draft-js';

// 全局样式匹配属性对象
const customInlineStylesMap = {
  color: {},
  bgcolor: {},
  fontSize: {},
  fontFamily: {},
  lineHeight: {},
  CODE: {
    fontFamily: 'monospace',
    wordWrap: 'break-word',
    background: '#f1f1f1',
    borderRadius: 3,
    padding: '1px 3px',
  },
  SUPERSCRIPT: {
    fontSize: 11,
    position: 'relative',
    top: -8,
    display: 'inline-flex',
  },
  SUBSCRIPT: {
    fontSize: 11,
    position: 'relative',
    bottom: -8,
    display: 'inline-flex',
  },
};

/**
 * Set style.
 */
const addToCustomStyleMap = (styleType, styleKey, style) => {
  // eslint-disable-line
  customInlineStylesMap[styleType][`${styleType.toLowerCase()}-${style}`] = {
    [`${styleKey}`]: style,
  };
};

/**
 * Function returns size at a offset.
 * 函数返回偏移量处的大小。
 */
function getCurrentOffesttyle(editorState, stylePrefix) {
  const styles = editorState.getCurrentInlineStyle().toList();

  const style = styles.filter((s) => {
    s.startsWith(stylePrefix.toLowerCase());
  });

  if (style && style.size > 0) {
    return style.get(0);
  }
  return undefined;
}

/**
 * Function returns collection of currently selected blocks.
 */
function getSelectedBlocksMap(editorState) {
  const selectionState = editorState.getSelection();
  const contentState = editorState.getCurrentContent();
  const startKey = selectionState.getStartKey();
  const endKey = selectionState.getEndKey();
  const blockMap = contentState.getBlockMap();
  return blockMap
    .toSeq()
    .skipUntil((_, k) => k === startKey)
    .takeUntil((_, k) => k === endKey)
    .concat([[endKey, blockMap.get(endKey)]]);
}

/**
 * Function returns collection of currently selected blocks.
 */
function getSelectedBlocksList(editorState) {
  return getSelectedBlocksMap(editorState).toList();
}

/**
 * Function returns size at a offset.
 */
function getStyleAtOffset(block, stylePrefix, offset) {
  const styles = block.getInlineStyleAt(offset).toList();
  const style = styles.filter((s) => s.startsWith(stylePrefix.toLowerCase()));

  if (style && style.size > 0) {
    return style.get(0);
  }
  return undefined;
}

// 设置样式回显-func
export function getSelectionCustomInlineStyleFunc(editorState, styles) {
  if (editorState && styles && styles.length > 0) {
    const currentSelection = editorState.getSelection();
    const inlineStyles = {};

    if (currentSelection.isCollapsed()) {
      styles.forEach((s) => {
        inlineStyles[s] = getCurrentOffesttyle(editorState, s);
      });

      return inlineStyles;
    }

    const start = currentSelection.getStartOffset();
    const end = currentSelection.getEndOffset();
    const selectedBlocks = getSelectedBlocksList(editorState);

    if (selectedBlocks.size > 0) {
      for (let i = 0; i < selectedBlocks.size; i += 1) {
        let blockStart = i === 0 ? start : 0;
        let blockEnd =
          i === selectedBlocks.size - 1
            ? end
            : selectedBlocks.get(i).getText().length;

        if (blockStart === blockEnd && blockStart === 0) {
          blockStart = 1;
          blockEnd = 2;
        } else if (blockStart === blockEnd) {
          blockStart -= 1;
        }

        for (let j = blockStart; j < blockEnd; j += 1) {
          if (j === blockStart) {
            styles.forEach((s) => {
              inlineStyles[s] = getStyleAtOffset(selectedBlocks.get(i), s, j);
            });
          } else {
            styles.forEach((s) => {
              if (
                inlineStyles[s] &&
                inlineStyles[s] !==
                  getStyleAtOffset(selectedBlocks.get(i), s, j)
              ) {
                inlineStyles[s] = undefined;
              }
            });
          }
        }
      }

      return inlineStyles;
    }
  }
  return {};
}

/**
 * 函数在当前选择中切换自定义内联样式。
 * @param {*} editorState  editorState对象
 * @param {*} styleType  富文本样式类型
 * @param {*} style  当前选中的样式value -- 如 3: line-height: 3rem
 * @returns
 */
export const dealCustomInlineStyle = (editorState, styleType, style) => {
  const selection = editorState.getSelection();

  const nextContentState = Object.keys(customInlineStylesMap[styleType]).reduce(
    (contentState, s) => Modifier.removeInlineStyle(contentState, selection, s),
    editorState.getCurrentContent(),
  );

  let nextEditorState = EditorState.push(
    editorState,
    nextContentState,
    'changeinline-style',
  );

  const currentStyle = editorState.getCurrentInlineStyle();
  if (selection.isCollapsed()) {
    nextEditorState = currentStyle.reduce(
      (state, s) => RichUtils.toggleInlineStyle(state, s),
      nextEditorState,
    );
  }
  if (styleType === 'SUPERSCRIPT' || styleType == 'SUBSCRIPT') {
    if (!currentStyle.has(style)) {
      nextEditorState = RichUtils.toggleInlineStyle(nextEditorState, style);
    }
  } else {
    const styleKey = styleType === 'bgcolor' ? 'backgroundColor' : styleType;

    if (!currentStyle.has(`${styleType}-${style}`)) {
      nextEditorState = RichUtils.toggleInlineStyle(
        nextEditorState,
        `${styleType.toLowerCase()}-${style}`,
      );

      addToCustomStyleMap(styleType, styleKey, style);
    }
  }
  return nextEditorState;
};
