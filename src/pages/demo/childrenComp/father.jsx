import React, { Component } from 'react';

import Son from './son';

export default class father extends Component {
  constructor() {
    super();
    this.state = {
      word: '',
    };
  }

  render() {
    console.log('---父组件---==', this.props);

    const { callback, sayMsg } = this.props;
    return (
      <div style={{ margin: '10px 0' }}>
        这是父组件: 下面是儿子说的话:
        <span style={{ color: 'red' }}>{sayMsg}</span>
        <div>
          把大父亲说的话，让儿子给孙子传达 (问问我宝贝大孙子回来吗？)
          <div
            onClick={() => this.setState({ word: '问问我宝贝大孙子回来吗？' })}
          >
            点击（传达给孙子）
          </div>
        </div>
        <Son theFunc={this.props} sayGradSon={this.state.word} />
      </div>
    );
  }
}
