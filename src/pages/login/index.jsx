import React from 'react';
import { Card, Tabs } from 'antd';
import styles from './index.less';
const { TabPane } = Tabs;

export default function index() {
  function callback(key) {
    console.log(key);
  }
  console.log('qq');

  return (
    <div className={styles.loginInfo}>
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
    </div>
  );
}
