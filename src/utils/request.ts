import { extend } from 'umi-request'

const request = extend({
  // prefix: "http://127.0.1:8080",
  // suffix:".json",
  timeout: 2000, 
  headers: {
    "Content-type": "application/json"
  },
  // params:{
  //     token:"xxx"
  // },
  errorHandler: error => {
    console.log("请求失败：", error);
  },
})
export default request