import request from "../utils/request";

// import request from "umi-request";



// 获取到所有用户
export const getAllUser = (params) => {
  return request.get('/api/shoppingCat', {params})
}


// // 获取到所有用户
// export const getAllUser = (params) => {
//   return request.get('/api/shoppingCat', {params})
// }

// 新增用户
export const addUser = (data)=>{
  return request.post("/users/accountadd", {data})
}
