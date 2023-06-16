/**
 * @description: 云上党支部接口
 */
import { get, _post, post } from '../http'

// 阵地信息列表
export const getPositionList = (params) => _post('/party/position/logic/list', params)

// 详情
export const getPositionInfo = (params) => _post('/party/position/logic/info', params)

// 所在党支部列表
export const getLocalPartyList = (params) => post('/party/partyInfo/localParty', params)

// 党支部详情
export const getLocalPartyInfo = (params) => _post('/party/partyInfo/logic/info', params)