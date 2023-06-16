

/**
 * @description: 封装请求方法，添加loading效果，设用于获取详情等操作
 * @param {Function} api 请求方法
 * @param {Object} option 配置项
 * @param {Object} option.params 请求参数
 * @param {String} option.handle 操作名称
 * @param {Function} option.success 成功回调
 * @param {Function} option.finish 完成回调
 * @param {Function} option.error 失败回调
 * @param {Boolean} option.tip 是否显示提示信息
 * @return {Promise} Promise对象
 */
export const useRequestLoading = (api, option = {}) => {
  return new Promise((resolve, reject) => {
    const {
      params = {},
      handle = "操作",
      success = null,
      finish = null,
      error = null,
      tip = true,
    } = option;
    uni.showLoading({
      title: `${handle}中`,
      mask: true,
    });
    api(params)
      .then((res) => {
        success && success(res);
        resolve(res);
        tip && uni.showToast({
          title: `${handle}成功！`,
          icon: 'success',
        });;
      })
      .finally(() => {
        uni.hideLoading();
        finish && finish();
      })
      .catch((err) => {
        error && error(err);
        reject(err);
        tip && uni.showToast({
          title: err?.message || `${ handle}失败`,
          icon: 'error',
        });;
      });
  });
};
