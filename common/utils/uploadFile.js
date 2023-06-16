import { isObject } from "lodash-es";
import { BASE_URL } from "../../env";
import { useAuthStore } from "../../store";
// 选择图片
export async function chooseImage(options = {}) {
  if (!isObject(options)) {
    throw new Error('参数必须是对象{}!!!!!!!!!!!!!!!!!!!')
  }
  const {
    count = 1,
    sourceType = 'album',
  } = options;
  const { tempFilePaths } = await uni.chooseImage({
    count,
    sourceType,
    ...options
  });
  const [filePath] = tempFilePaths;
  return uploadFile(filePath)
}

// 选择文件
// TODO: 不支持app端
export function chooseFile(options = {}) {
  if (!isObject(options)) {
    throw new Error('参数必须是对象{}!!!!!!!!!!!!!!!!!!!')
  }
  const {
    count = 1,
  } = options;
  uni.chooseFile({
    count,
    ...options,
    success: (res) => {
      const [filePath] = res.tempFilePaths
      uploadFile(filePath)
    }
  });
}

// 上传
function uploadFile(filePath) {
  return new Promise((resolve, reject) => {
    uni.showLoading({
      title: '上传中...'
    });
    const authState = useAuthStore();
    uni.uploadFile({
      url: `${BASE_URL}/file/uploads`,
      filePath,
      name: 'files',
      header: {
        'Authorization': authState.token,
        'u-login-areaId': authState.areaId
      },
      success: ({ data }) => {
        uni.showToast({
          icon: 'success',
          mask: true,
          title: '上传成功',
        });
        resolve(JSON.parse(data))
      },
      fail: (err) => {
        uni.showToast({
          icon: 'none',
          mask: true,
          title: '上传失败',
        });
        reject(err)
      },
      complete: () => {
        uni.hideLoading();
      }
    });
  })
}