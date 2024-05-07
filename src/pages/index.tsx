import styles from './index.less';
import { Button } from 'antd';
import { Link, useDispatch } from 'umi';
import { useEffect } from 'react';

const treeData = [
  {
    value: 'the parent One_1',
    title: 'the parent One_1',
    children: [
      {
        value: 'parent 1-0',
        title: 'parent 1-0',
        children: [
          {
            value: 'leaf1',
            title: 'leaf1',
          },
          {
            value: 'leaf2',
            title: 'leaf2',
          },
        ],
      },
      {
        value: 'parent 1-1',
        title: 'parent 1-1',
        children: [
          {
            value: 'leaf3',
            title: 'leaf3',
          },
        ],
      },
    ],
  },
];

export default function IndexPage(props: any) {
  const dispatch = useDispatch();
  const toHome = () => {
    // props.history.push('/home')
    // 派发数据
    dispatch({
      type: 'usersModel/getAllUser',
      payload: {
        size: ['XS', 'S', 'M', 'ML'],
        filter: 'normal',
      },
    });
  };

  // window.addEventListener(
  //   'popstate',
  //   function (event) {
  //     console.log('---current_state---', event);

  //     window.history.pushState('forward', null, '#');
  //     window.history.forward(1);

  //     const res = confirm('你即将退出浏览器');
  //     console.log('==res=代码的==', res);
  //   },
  //   false,
  // );

  return (
    <div className={styles.main}>
      <Button type="primary" onClick={toHome}>
        前往首页
      </Button>
      <br />
      <Button type="primary">
        {' '}
        <Link to="/other">前往Css</Link>{' '}
      </Button>
      <br />
      <br />
      <Button type="primary">
        {' '}
        <Link to="/login">去到登录界面</Link>{' '}
      </Button>
      <br /> <br />
      <Button type="primary">
        {' '}
        <Link to="/dragdrop">拖拽demo</Link>{' '}
      </Button>
      <br /> <br />
      <Button type="primary">
        {' '}
        <Link to="/dnd">dnd 拖拽demo</Link>{' '}
      </Button>
      <br /> <br />
      <Button type="primary">
        {' '}
        <Link to="/sortable">sortable Demo</Link>{' '}
      </Button>
      <br /> <br />
      <Button type="primary">
        {' '}
        <Link to="/wangeditor"> React Editor 编辑器 </Link>{' '}
      </Button>
      <br /> <br />
      <Button type="primary">
        {' '}
        <Link to="/formList"> FormList </Link>{' '}
      </Button>
      <br /> <br />
      <Button type="primary">
        {' '}
        <Link to="/demo"> demo </Link>{' '}
      </Button>
      <br /> <br />
      <Button type="primary">
        {' '}
        <Link to="/form"> form </Link>{' '}
      </Button>
    </div>
  );
}

// $(function () {
//   pushHistory();
//   window.addEventListener(
//     "popstate",
//     function (event) {
//       console.log("---控制台开始检测输句---", event);
//       const current_state = event?.state;
//       // if (current_state === null) {
//         console.log("----确实是-----");
//         const res = confirm("我监听到了浏览器的返回按钮事件啦");
//         console.log("==res=代码的==", res);
//       // }
//     },
//     false
//   );
//   function pushHistory() {
//     var state = {
//       title: "title",
//       url: "#",
//     };
//     window.history.pushState(state, "title", "#");
//   }
// });

// ————————————————————————————————————————————————————————————
// $(document).ready(function () {
//   // 检测是否为移动端
//   const isMobile = !!ua.match(/AppleWebKit.*Mobile.*/);
//   if (!isMobile) return;

//   history.pushState(null, document.title, location.href);

//   if (window.history && window.history.pushState) {
//     window.addEventListener("popstate", checkBrowserReturnFunc);

//     function checkBrowserReturnFunc(event) {
//       history.pushState(null, document.title, location.href);

//       checkHaveExitAlertTemplate(); // 退出前类型弹框
//       CartTempSatisfyAlertCondition(); // 购物车类型弹框
//       normalSubPopupSatisfyAlertCondition(); // 普通类型弹框 退出前行为

//       window.removeEventListener("popstate", checkBrowserReturnFunc);
//     }
//   }
// });

// ————————————————————————————————————————————————————————————
// $(document).ready(function () {

// $(document).ready(function () {
//   // 检测是否为移动端
//   const isMobile = !!ua.match(/AppleWebKit.*Mobile.*/);
//   if (!isMobile) return;

//   console.log("--检测是否为移动端---");

//   if (window.history && window.history.pushState) {
//     window.addEventListener("popstate", function () {
//       console.log("---监听用户退出----");

//       window.history.pushState("forward", null, "#");
//       window.history.forward(1);

//       // =这里放置弹出的效果--
//       // checkHaveExitAlertTemplate(); // 退出前类型弹框
//       // CartTempSatisfyAlertCondition(); // 购物车类型弹框
//       // normalSubPopupSatisfyAlertCondition(); // 普通类型弹框 退出前行为

//       // const res = confirm("你即将退出浏览器");
//       // console.log("==res=consile--输出结果了这里--=", res);

//       // if (res) {
//       //   // =这里放置弹出的效果--
//       //   console.log("==这里放置弹出的效果---=");
//       // } else {
//       //   console.log("---没有干操作-----");
//       // }
//     });
//   }

//   window.history.pushState("forward", null, "#");
//   window.history.forward(1);
// });

// —————————————————树状转表头—————————————————
// let newData = JSON.parse(JSON.stringify(treeData)) || [];
// transfromDataType(newData);
// const transfromDataType = (arrData) => {
//   return arrData?.map((item) => {
//     if (item?.children) {
//       delete item.value;
//     } else {
//       item.key = item.value;
//       item.dataIndex = item.value;
//       delete item.value;
//     }

//     if (item?.children?.length) {
//       transfromDataType(item?.children);
//     }
//   });
// };
