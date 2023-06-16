// .env.js 文件
// 不同环境访问不同的路径
// #ifdef H5
let protocol = window.location.protocol;
// #endif
const ENV_BASE_URL = {
  development: 'https://www.baidu.com', //开发环境
  production: 'https://www.baidu.com', //生产环境
}

export const BASE_URL = ENV_BASE_URL[process.env.NODE_ENV || 'development']; //后台根域名