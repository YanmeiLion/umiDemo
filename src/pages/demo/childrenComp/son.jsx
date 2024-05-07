import React, { Component } from 'react';

import GrandSon from './grandSon';

export default class son extends Component {
  render() {
    console.log('---this--props=子组件==', this.props);

    const { theFunc = { callback, sayMsg }, sayGradSon = '' } = this.props;

    return (
      <div style={{ backgroundColor: 'aqua', margin: '10px 0' }}>
        这是儿子组件
        <span>今年五一不回去： 吧这句话说给父亲</span>
        <div onClick={() => theFunc.callback('今年五一不回去')}>
          点击回传给父亲
        </div>
        <GrandSon msg={sayGradSon} />
      </div>
    );
  }
}
