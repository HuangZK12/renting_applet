import { get, post, _post } from "../http";
const coursewareService = {
  //  证件
  serviceManagerProcessGuideInfo(params) {
    return get("/serviceManager/app/processGuide/processGuideInfo", params);
  },
  //   schoolUniversityInfoListInfo(params) {
  //     return get(`/school/universityInfo/info/${params}`);
  //   },
  // 新增办理人员信息
  credentialTransactUserAdd(params) {
    return post(`/serviceManager/credentialTransactUser/appAdd`, params);
  },
// 查找本人办理人员信息进度
credentialTransactUserHandlingList(params) {
  return post(`/serviceManager/app/credentialTransactUser/handlingList`, params);
},
  // 文件上传
  // uploadFile(params) {
  //   return _post('/file/uploads', params)
  // },
};
export default coursewareService;
