import { get, post } from "../http";
const pensionService = {
  serviceManagerList(params) {
    return post("/serviceManager/elderlyCareServicesInfo/list", params);
  },
  serviceManagerInfo(params) {
    return get(`/serviceManager/elderlyCareServicesInfo/info/${params}`);
  },
  //   老年大学列表
  schoolUniversityInfoList(params) {
    return post("/school/universityInfo/list", params);
  },
  //   老年大学详情
  schoolUniversityInfoListInfo(params) {
    return get(`/school/universityInfo/info/${params}`);
  },
};
export default pensionService;
