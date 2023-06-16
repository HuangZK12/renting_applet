/**
 * @description: 登录模块接口
 * author: hzk
 */
import { get, post } from '../http'

// 登录
export const login_api = (params) => post('/oauth/token', params)

// 获取用户信息
export const get_user_info = () => get('/system/login/user')

// 获取office信息
export const get_office = () => get('/system/login/areaOffices')

// 获取用户详细详细
export const get_user_detail = (params) => get(`/system/user/basicInfo/info/${params}`)