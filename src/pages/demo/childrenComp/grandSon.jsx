import React, { Component } from 'react';

export default class grandSon extends Component {
  render() {
    console.log('---这是孙子==', this.props);
    return (
      <div style={{ background: 'bisque', margin: '10px 0' }}>
        这是儿子的儿子 孙子听到的：{' '}
        <span style={{ color: 'blue' }}>{this.props.msg}</span>
      </div>
    );
  }
}
