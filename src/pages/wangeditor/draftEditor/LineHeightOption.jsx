import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  dealCustomInlineStyle,
  getSelectionCustomInlineStyleFunc,
} from './CustomDraftjsUtils/draftjsUtils';

import { Select } from 'antd';

const { Option } = Select;

const optionData = [
  { name: '1rem', value: '1' },
  { name: '1.2rem', value: '1.2' },
  { name: '1.5rem', value: '1.5' },
  { name: '1.8rem', value: '1.8' },
  { name: '2rem', value: '2' },
  { name: '2.5rem', value: '2.5' },
  { name: '3rem', value: '3' },
  { name: '3.5rem', value: '3.5' },
  { name: '4rem', value: '4' },
];

export default class LineHeightOption extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    editorState: PropTypes.object,
    modalHandler: PropTypes.object,
    config: PropTypes.object,
    translations: PropTypes.object,
  };

  constructor(props) {
    super(props);
    const { editorState, modalHandler } = props;

    this.state = {
      expanded: undefined,

      currentFontSize: editorState
        ? getSelectionCustomInlineStyleFunc(editorState, ['LINEHEIGHT'])
            .LINEHEIGHT
        : undefined,
    };

    modalHandler.registerCallBack(this.expandCollapse);
  }

  componentDidUpdate(prevProps) {
    const { editorState } = this.props;
    if (editorState && editorState !== prevProps.editorState) {
      this.setState({
        currentFontSize: getSelectionCustomInlineStyleFunc(editorState, [
          'LINEHEIGHT',
        ]).LINEHEIGHT,
      });
    }
  }

  componentWillUnmount() {
    const { modalHandler } = this.props;
    modalHandler.deregisterCallBack(this.expandCollapse);
  }

  expandCollapse = () => {
    this.setState({
      expanded: this.signalExpanded,
    });
    this.signalExpanded = false;
  };

  toggleLineHeight = (lineheight) => {
    const { editorState, onChange } = this.props;

    const newState = dealCustomInlineStyle(
      editorState,
      'lineHeight',
      lineheight,
    );

    if (newState) {
      onChange(newState);
    }
  };

  render() {
    // const { currentFontSize } = this.state;
    // const lineHeight = currentFontSize && Number(currentFontSize.substring(11));

    // console.log('----fontSize---', currentFontSize, lineHeight);

    return (
      <div>
        <Select
          placeholder="选择行高"
          style={{ width: '100px', marginLeft: '40px' }}
          onChange={this.toggleLineHeight}
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
