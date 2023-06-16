/**
 * @description: 每日播报接口
 */
import { get, _post, post } from '../http'

// 每日播报列表
export const geBroadcastList = (params) => get('/info/publish/WorkTrend/list', params)

// 通知详情
export const getNoticeInfo = (id) => _post(`/info/publish/notice/info/${id}`)

// 工作动态详情
export const getWorkTrendInfo = (id) => _post(`/info/publish/WorkTrend/info/${id}`)

// 收藏通知
export const collectNotice = (params) =>  post('/info/publish/notice/favorite', params)

// 收藏工作动态
export const collectWorkTrend = (params) => post('/info/publish/WorkTrend/favorite', params)

// 删除收藏
export const cancelCollectBroadcast = (params) =>  get('/info/publish/notice/cancelFavorite', params)

// 点赞
export const likeBroadcast = (params) => post('/info/publish/notice/like', params)