import React from 'react';

export default function index() {
  return (
    <div>
      这是首页
      {/* 实现卡片两边自带透明半圆 */}
      <div
        style={{
          width: '100%',
          height: '100px',
          margin: '0 auto',
          boxSizing: 'border-box',
          display: 'flex',
          backgroundColor: 'orchid',
          textAlign: 'center',
          marginBottom: '20px',

          backgroundImage:
            'radial-gradient(circle at 9px 50%, transparent 8px, orchid 9px)',
          backgroundPosition: '-9px 0px',
          backgroundSize: '46px', // 100%
        }}
      >
        111
      </div>
    </div>
  );
}
