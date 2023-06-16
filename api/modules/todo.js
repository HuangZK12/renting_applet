/**
 * @description: 待办模块接口
 * author: hzk
 */
import { get, _post } from '../http'

// 列表
export const todo_list = (params) => _post('todo/logic/list', params)