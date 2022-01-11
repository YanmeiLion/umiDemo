const breadcrumbData = [
  { id: 1, title: '自动化邮件流程编辑', url: '/home' },
  { id: 2, title: '欢迎邮件1', url: '222' },
  { id: 3, title: '选择模板', url: '333' },
  { id: 4, title: '编辑内容', url: '444' },
];

// 提取公共面包屑
const commonBreadCrumb = (commonIndex) => {
  // setNewArrBreadcrumb(newArrBreadcrumb.splice(0, newArr?.length))
  // setNewArrBreadcrumb([]);
  let newArr = [];
  breadcrumbData?.map((item, index) => {
    if (index <= commonIndex) {
      newArr.push(item);
    }
  });
  // setNewArrBreadcrumb(newArr);
  return newArr;
};

// 默认面包屑导航（数据）
export const BreadCrumbDefaultData = () => {
  return breadcrumbData;
};

// 上一步
export const BreadCrumbPreviousStep = (index) => {
  return commonBreadCrumb(index);
};

// 下一步
export const BreadCrumbNextStep = (currentLength) => {
  return commonBreadCrumb(currentLength);
};

// // 提取公共面包屑
// const commonBreadCrumb = (commonIndex, data) => {
//   // setNewArrBreadcrumb(newArrBreadcrumb.splice(0, newArr?.length))
//   let newArr = [];
//   data?.map((item, index) => {
//     if (index <= commonIndex) {
//       newArr.push(item);
//     }
//   });
//   return newArr;
// };

// // 默认面包屑导航（数据）
// export const BreadCrumbDefaultData = (name = '') => {
//   // 面包屑数组
//   const breadcrumbData = [
//     { id: 1, title: '自动化邮件流程编辑', url: '/emailAutomation/editorAutomateEmails' },
//     { id: 2, title: `${name || '欢迎邮件1'}`, url: '/emailAutomation/showAutomateEmail' },
//     { id: 3, title: '选择模板', url: '/emailManageEditor/changeEmails' },
//     { id: 4, title: '编辑内容', url: '/emailManageEditor/editorEmails' },
//   ];
//   return breadcrumbData;
// };

// // 上一步
// export const BreadCrumbPreviousStep = (index, data) => {
//   return commonBreadCrumb(index, data);
// };

// // 下一步
// export const BreadCrumbNextStep = (currentLength, data) => {
//   return commonBreadCrumb(currentLength, data);
// };
