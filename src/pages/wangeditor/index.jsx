import React, { useState } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';

import WangEditor from './wangEditor';
import DraftEditor from './draftEditor';

export default function index() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  );

  // 键盘控制样式
  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onChange(newState);
      return 'handled';
    }

    return 'not-handled';
  };

  const onChange = (editorState) => {
    // console.log('editorState', editorState)
    setEditorState(editorState);
  };

  // 加粗样式
  const _onBoldClick = () => {
    onChange(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
  };

  return (
    <>
      <div
        style={{
          border: '1px red solid',
          margin: '30px',
          width: '80%',
          minHeight: '200px',
        }}
      >
        富文本编辑器:
        <DraftEditor />
      </div>

      <div
        style={{
          border: '1px #ddd solid',
          margin: '30px',
          width: '80%',
          height: '200px',
        }}
      >
        富文本编辑器:draftEditor
        <br />
        <button onClick={_onBoldClick}>Bold</button>
        <Editor
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          onChange={onChange}
        />
      </div>

      <div
        style={{
          border: '1px #ddd solid',
          margin: '30px',
          width: '80%',
          height: '200px',
        }}
      >
        富文本编辑器: wangeditor
        <WangEditor />
      </div>
    </>
  );
}
