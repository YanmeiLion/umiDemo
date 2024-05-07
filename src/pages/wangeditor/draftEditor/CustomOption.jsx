import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EditorState, Modifier } from 'draft-js';
import { Select } from 'antd';

const { Option } = Select;

const optionData = [
  { name: '邮箱', value: 'email' },
  { name: '姓', value: 'surname' },
  { name: '名', value: 'name' },
  { name: '地址', value: 'address' },
  { name: '邮编', value: 'postCode' },
];

class CustomOption extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    editorState: PropTypes.object,
  };

  addStar = (theValue) => {
    const { editorState, onChange } = this.props;

    const contentState = Modifier.replaceText(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      '【' + theValue + '】',
      editorState.getCurrentInlineStyle(),
    );

    onChange(EditorState.push(editorState, contentState, 'insert-characters'));

    // ---------------------------------------

    // const newState = toggleCustomInlineStyle(editorState, 'fontSize', '34px');
    // // const newState = toggleCustomInlineStyle(editorState, 'lineHeight', '34px');

    // onChange(newState);

    // let newState = RichUtils.toggleInlineStyle(editorState, newStyle);
    // onChange(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
  };

  handleChange = (value) => {
    let theName = '';
    optionData.filter((item) => {
      if (item?.value == value) {
        theName = item?.name;
      }
    });

    this.addStar(theName);
  };

  render() {
    return (
      <div
      // onClick={this.addStar}
      // className="rdw-fontfamily-wrapper"
      >
        {/* ⭐  */}

        <Select
          placeholder="插入变量"
          style={{ width: '100%' }}
          onChange={this.handleChange}
        >
          {optionData?.map((item) => {
            return (
              <Option value={item?.value} key={item?.value}>
                {item?.name}
              </Option>
            );
          })}
        </Select>
      </div>
    );
  }
}

export default CustomOption;
