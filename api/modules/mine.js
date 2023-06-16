/**
 * @description: 我的模块接口
 * author: hzk
 */
import { get, post } from '../http'

// 列表
export const collection_list = (params) =>
  get('/info/publish/WorkTrend/myfavorite', params)


// 删除
export const collection_cancel = (params) =>
  get('/info/publish/notice/cancelFavorite', params)

// 修改个人信息
export const update_user_info = (params) =>
  post('/system/user/basicInfo/edit', params)