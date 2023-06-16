import { isEmpty } from "lodash-es";
import { BASE_URL } from "../../env";

/**
 *
 * @param {*} name 文件id
 * @author hzk
 * @returns void
 */
export function downloadFile(fileId) {
  return new Promise((resolve, reject) => {
    if (isEmpty(fileId)) return;
    uni.showLoading({
      title: '下载中...'
    });
    uni.downloadFile({
      url: `${BASE_URL}/file/download/${fileId}`,
      success: async (res) => {
        if (res.statusCode === 200) {
          uni.saveFile({
            tempFilePath: res.tempFilePath,//文件的临时路径
            success: async ({ savedFilePath }) => {
              const { confirm } = await uni.showModal({
                title: '下载成功',
                content: '是否打开文件？',
              })
              if (confirm) {
                // 打开文件
                await uni.openDocument({
                  filePath: savedFilePath,
                });
                resolve(savedFilePath)
              } else {
                uni.showToast({
                  title: '文件已保存到' + savedFilePath,
                  duration: 2000,
                  icon: 'none'
                });
                resolve(savedFilePath)
              }
            },
            fail: function (err) {
              uni.showToast({
                title: '下载失败,请重试',
                duration: 2000,
                icon: 'error'
              });
              reject(err)
            },
            complete: function () {
              uni.hideLoading();
            }
          });

        }
      },
      fail: function (err) {
        uni.showToast({
          title: '下载失败,请重试',
          duration: 2000,
          icon: 'error'
        });
        uni.hideLoading()
        reject(err)
      },
    });
  })
}