/**
 * @description: 我的活动接口
 */
import { get, _post, post } from '../http'

// 所有活动列表
export const getActivityList = (params) => get('/info/publish/careWorkersActivity/list', params)

// 我的活动
export const getMyActivityList = (params) => get('/info/publish/careWorkersActivity/myActivity', params)

// 详情
export const getActivityInfo = (id) => _post(`/info/publish/careWorkersActivity/info/${id}`)

// 活动报名
export const signUpActivity = (params) => post('/info/publish/joinUser/add', params)