import { _post, get } from "../http";

// 场地预约列表：（场地列表）
export const venue_list = (params) => get('/school/universityPlaceInfo/appList', params)

// 场地预约列表：（个人预约历史）
export const venue_order_list = (params) => get('/school/universityPlaceReserve/myList', params)

// 场地信息
export const venue_info = (params) => get(`/school/universityPlaceInfo/info/${params}`)

// 场地时间段
export const venue_time_list = (params) => get(`/school/universityPlaceInfo/openConfigInfoById`, params)

// 场地信息--预定人员信息
export const venue_order_info = (params) => get(`/school/universityPlaceInfo/placeReserveInfoById`, params)

// 预约信息详情
export const venue_reserve_info = (params) => get(`/school/universityPlaceReserve/info/${params}`)

// 常规预约
export const venue_reserve = (params) => get(`/school/universityPlaceReserve/add`, params)

// 电影预约
export const venue_reserve_movie = (params) => _post(`/school/universityPlaceReserve/adds`, params)

// 取消预约
export const venue_cancel = (params) => get(`/school/universityPlaceReserve/cancelStatus`, params)
