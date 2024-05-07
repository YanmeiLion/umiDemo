import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SketchPicker } from 'react-color';

// 改版后的例子

class CustomColorSet extends Component {
  static propTypes = {
    expanded: PropTypes.bool,
    onExpandEvent: PropTypes.func,
    onChange: PropTypes.func,
    currentState: PropTypes.object,
  };

  state = {
    currentType: 'color', // 当前选中文字、背景 状态
    showColorPicker: false,
  };

  stopClosePicker = (event) => {
    event.stopPropagation();
  };

  onChangeColor = (color) => {
    const { onChange } = this.props;
    const { currentType } = this.state;

    if (currentType === 'color') {
      // 字体颜色
      onChange('color', color.hex);
    } else {
      // 背景色
      onChange('bgcolor', color.hex);
    }
  };

  renderModal = () => {
    const { currentState } = this.props;
    const { currentType } = this.state; // 记录当前文字还是背景
    // console.log('--------------------------', currentType, currentState);
    return (
      <div
        onClick={this.stopClosePicker}
        style={{ position: 'absolute', zIndex: '2' }}
      >
        <div
          style={{
            backgroundColor: '#fff',
            borderRadius: '4px',
            boxShadow:
              'rgb(0 0 0 / 15%) 0px 0px 0px 1px, rgb(0 0 0 / 15%) 0px 8px 16px',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              borderBottom: '1px #d3d3d3 solid',
            }}
          >
            <div
              style={{
                width: '50%',
                textAlign: 'center',
                padding: '6px 0',
                cursor: 'pointer',
                borderBottom:
                  currentType === 'color' ? '2px blue solid' : 'none',
              }}
              onClick={() => {
                this.setState({
                  currentType: 'color',
                });
              }}
            >
              文字
            </div>
            <div
              style={{
                width: '50%',
                textAlign: 'center',
                padding: '6px 0',
                cursor: 'pointer',
                borderBottom:
                  currentType === 'bgColor' ? '2px blue solid' : 'none',
              }}
              onClick={() => {
                this.setState({
                  currentType: 'bgColor',
                });
              }}
            >
              背景
            </div>
          </div>

          <SketchPicker
            onChangeComplete={this.onChangeColor}
            color={
              // 区分取色器颜色展示
              currentType === 'color'
                ? currentState?.color || '#000000'
                : currentState?.bgColor || '#ffffff'
            }
          />
        </div>
      </div>
    );
  };

  checkStyleColor = (e) => {
    e.stopPropagation();
    const { showColorPicker } = this.state;

    this.setState({
      showColorPicker: !showColorPicker,
    });
  };

  componentDidMount() {
    // 点击其他地方隐藏输入框
    document.addEventListener('click', (e) => {
      this.setState({
        showColorPicker: false,
      });
    });
  }

  render() {
    const { showColorPicker } = this.state;

    // const { expanded, onExpandEvent } = this.props;

    return (
      <div>
        <div
          onClick={this.checkStyleColor}
          // onClick={onExpandEvent}
          style={{
            border: '1px #F1F1F1 solid',
            cursor: 'pointer',
            minWidth: '25px',
            padding: '5px',
            margin: '0 4px',
            height: '20px',
            textTransform: 'capitalize',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img src={require('../../../assets/image/color.svg')} alt="" />
          {/* <span>字体颜色</span> */}
        </div>
        {showColorPicker ? this.renderModal() : undefined}
        {/* {expanded ? this.renderModal() : undefined} */}
      </div>
    );
  }
}

export default CustomColorSet;
