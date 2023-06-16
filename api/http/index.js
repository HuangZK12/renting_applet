/**
 * desc: 请求方法封装
 */
import { stringify } from 'qs';
import http from './HttpClient';

/**
 * get方法
 * @param {String} url 接口地址
 * @param {Object} data 参数有
 * @param {Object} config 配置项
 * @returns 请求结果
 */
export function get(url, params = {}, config = {}) {
  return http.server().get(url, {
    params,
    ...config
  })
}

/**
 * 使用form-data格式的post方法
 * @param {String} url 接口地址
 * @param {Object} data 参数有
 * @param {Object} config 配置项
 * @returns 请求结果
 */
export function post(url, data = {}, config = {}) {
  if (!config["headers"]) {
    config["headers"] = {}
  }
  config["headers"]["Content-Type"] = "application/x-www-form-urlencoded"
  return http.server().post(url, stringify(data), config)
}

/**
 * 使用JSON格式的post方法
 * @param {String} url 接口地址
 * @param {Object} data 参数有
 * @param {Object} config 配置项
 * @returns 请求结果
 */
export function _post(url, data = {}, config = {}) {
  return http.server().post(url, data, config)
}

/**
 * 公共请求方法（不想重复写return啥的请求函数了）
 * @param {String} url 接口地址
 * @param {Object} params 参数
 * @param {Object} options 配置项
 * @returns 请求结果
 */
export function request(url, params, options = {}) {
  const {
    method = 'get',
    json = true,
    postQuery = {}
  } = options
  const isPost = method?.toLowerCase() === 'post'
  return http.server().request({
    method,
    url,
    params: isPost ? postQuery : params,
    data: isPost ? params : {},
    headers: {
      'Content-Type': (isPost && json) ? 'application/json' : 'application/x-www-form-urlencoded'
    }
  })
}