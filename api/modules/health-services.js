/**
 * @description: 健康服务模块接口
 * author: hzk
 */
import { get, post } from '../http'

// 列表
export const health_services_list = (params) => get('/serviceManager/healthExaminationUser/myList', params)