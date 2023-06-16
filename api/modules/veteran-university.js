import { get, post } from "../http";
const veteranUniversity = {
     //   老年大学列表
  schoolUniversityInfoList(params) {
    return post("/school/universityInfo/appList", params);
  },
  //   老年大学详情
  schoolUniversityInfoListInfo(params) {
    return get(`/school/universityInfo/info/${params}`);
  },
  //   院系新列表
  universityDepartmentInfoDepartmentList(params) {
    return post(`/school/universityDepartmentInfo/departmentList`,params);
  },
  //   院系课程新列表
  universityCourseInfoCourseInfoList(params) {
    return post(`/school/universityCourseInfo/courseInfoAppList`,params);
  },
  //   课程详情
  schoolUniversityCourseInfoInfo(params) {
    return get(`/school/universityCourseInfo/info/${params}`);
  },
  // 课程报名
  universityApplyInfoAdd(params) {
    return post(`/school/universityApplyInfo/add`,params);
  }
}
export default veteranUniversity;