import React, { useState, useEffect } from 'react';
import { Card, Tabs, Radio, Space, Cascader } from 'antd';
import styles from './index.less';
import Tabpane1 from '../../components/Tabpane1';
import Tabpane2 from '../../components/Tabpane2';
import RichEditor from '../../components/RichEditor';
import DayJs from '../../components/DayJs';
import FromSelf from '../../components/FormSelf';

const { TabPane } = Tabs;

const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    // children: [
    //   {
    //     value: 'hangzhou',
    //     label: 'Hangzhou',
    //     children: [
    //       {
    //         value: 'xihu',
    //         label: 'West Lake',
    //       },
    //     ],
    //   },
    //   {
    //     value: 'yiwu',
    //     label: 'yiwu',
    //     children: [
    //       {
    //         value: 'xx',
    //         label: 'xx',
    //       },
    //     ],
    //   },
    // ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];

export default function index() {
  const [tabPosition, setTabPosition] = useState('left');
  const [tabKey, setTabKey] = useState('1');

  function callback(key) {
    console.log(key);
  }
  const changeTabPosition = (e) => {
    setTabPosition(e.target.value);
  };

  function onChange(value) {
    console.log(value);
  }


  return (
    <div className={styles.loginInfo}>
      <Cascader
        options={options}
        onChange={onChange}
        placeholder="Please select"
      />

      <Card size="small" className={styles.card}>
        <Tabs
          defaultActiveKey="1"
          onChange={callback}
          className={styles.titles}
        >
          <TabPane tab="Tab 1" key="1">
            1111111111111111111111
          </TabPane>
          <TabPane tab="Tab 2" key="2">
            222222222222222222222
          </TabPane>
          <TabPane tab="Tab 3" key="3">
            3333333333333333333333
          </TabPane>
        </Tabs>
      </Card>

      <Space style={{ marginBottom: 24 }}>
        Tab position:
        <Radio.Group value={tabPosition} onChange={changeTabPosition}>
          <Radio.Button value="top">top</Radio.Button>
          <Radio.Button value="bottom">bottom</Radio.Button>
          <Radio.Button value="left">left</Radio.Button>
          <Radio.Button value="right">right</Radio.Button>
        </Radio.Group>
      </Space>

      <Tabs tabPosition={tabPosition} destroyInactiveTabPane={true}>
        <TabPane tab="Tab 1" key="1">
          <Tabpane1></Tabpane1>
        </TabPane>

        <TabPane tab="Tab 2" key="2">
          <Tabpane2></Tabpane2>
        </TabPane>
        <TabPane tab="Tab 3" key="3">
          Content of Tab 33333333333
        </TabPane>
      </Tabs>

      <RichEditor></RichEditor>

      <DayJs></DayJs>

      <FromSelf></FromSelf>
    </div>
  );
}
