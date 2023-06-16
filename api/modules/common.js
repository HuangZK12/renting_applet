/**
 * @description: 公共模块接口
 * author: hzk
 */
import { get, _post } from "../http";

// 列表
export const uploadFile = (params) =>{
  console.log('--params>>',params[0]);
  const fileData = new Blob([params[0]]);
  const file = new File([params[0]]);
  const formData = new FormData();
  formData.append("files", file);
  _post("/file/uploads", formData);
}
