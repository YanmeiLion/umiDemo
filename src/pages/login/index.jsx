import React, { useState, useEffect } from 'react';
import { Card, Tabs, Breadcrumb, Button } from 'antd';
import styles from './index.less';
const { TabPane } = Tabs;
import { NavLink } from 'umi';

import {
  BreadCrumbDefaultData,
  BreadCrumbPreviousStep,
  BreadCrumbNextStep,
} from '@/utils/commonBreadCrumb.js';

export default function index() {
  // 面包屑
  const [newArrBreadcrumb, setNewArrBreadcrumb] = useState([]);

  useEffect(() => {
    const result = BreadCrumbDefaultData();
    setNewArrBreadcrumb(result);
  }, []);

  function callback(key) {
    console.log(key);
  }

  const onClickCurrentBreadcrumb = (currentIndex) => {
    // commonBreadCrumb(currentIndex);
    const previousData = BreadCrumbPreviousStep(currentIndex);
    setNewArrBreadcrumb(previousData);
  };

  // // 提取公共面包屑
  // const commonBreadCrumb = (commonIndex) => {
  //   // setNewArrBreadcrumb(newArrBreadcrumb.splice(0, newArr?.length))
  //   setNewArrBreadcrumb([]);
  //   let newArr = [];
  //   breadcrumbData?.map((item, index) => {
  //     if (index <= commonIndex) {
  //       newArr.push(item);
  //     }
  //   });
  //   setNewArrBreadcrumb(newArr);
  // };

  const nextStep = () => {
    // commonBreadCrumb(newArrBreadcrumb?.length);
    const nextData = BreadCrumbNextStep(newArrBreadcrumb?.length);
    setNewArrBreadcrumb(nextData);
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
              <NavLink to={item?.url}> {item?.title} </NavLink>
              {/* {item?.title} */}
            </Breadcrumb.Item>
          );
        })}
      </Breadcrumb>

      <Button onClick={nextStep}>下一步</Button>
    </div>
  );
}
