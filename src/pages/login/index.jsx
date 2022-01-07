import React, { useState } from 'react';
import { Card, Tabs, Breadcrumb, Button } from 'antd';
import styles from './index.less';
const { TabPane } = Tabs;

const breadcrumbData = [
  { id: 1, title: '自动化邮件流程编辑', url: '111' },
  { id: 2, title: '欢迎邮件1', url: '222' },
  { id: 3, title: '选择模板', url: '333' },
  { id: 4, title: '编辑内容', url: '444' },
];

export default function index() {
  // 面包屑
  const [newArrBreadcrumb, setNewArrBreadcrumb] = useState(
    breadcrumbData ?? [],
  );

  function callback(key) {
    console.log(key);
  }

  const onClickCurrentBreadcrumb = (currentIndex) => {
    commonBreadCrumb(currentIndex);
  };

  // 提取公共面包屑
  const commonBreadCrumb = (commonIndex) => {
    // setNewArrBreadcrumb(newArrBreadcrumb.splice(0, newArr?.length))
    setNewArrBreadcrumb([]);
    let newArr = [];
    breadcrumbData?.map((item, index) => {
      if (index <= commonIndex) {
        newArr.push(item);
      }
    });
    setNewArrBreadcrumb(newArr);
  };

  const nextStep = () => {
    commonBreadCrumb(newArrBreadcrumb?.length);
  };

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

      <br />
      <br />
      <br />

      <Breadcrumb separator=">">
        {newArrBreadcrumb?.map((item, index) => {
          return (
            <Breadcrumb.Item
              key={item?.id}
              onClick={() => onClickCurrentBreadcrumb(index)}
            >
              {item?.title}
            </Breadcrumb.Item>
          );
        })}
      </Breadcrumb>

      <Button onClick={nextStep}>下一步</Button>
    </div>
  );
}
