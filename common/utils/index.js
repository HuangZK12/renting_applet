import { BASE_URL } from "../../env";
import dayjs from 'dayjs'
import { useAuthStore } from "../../store";
import { isEmpty } from "lodash-es";


/**
 *
 * @param {*} name 图片后缀
 * @returns 图片完整地址
 */
export const imageFormat = (name) => BASE_URL + '/image/' + name

// 获取文件后缀
export const getSuffix = (url, separator = '.') => {
  if (!url) return ''
  let suffix = ''
  const i = url.lastIndexOf(separator)
  if (i !== -1) {
    suffix = url.substring(i + 1)
    const i2 = suffix.lastIndexOf('?')
    if (i2 !== -1) {
      suffix = suffix.substring(0, i2)
    }
  }
  return suffix
}

// 判断手机系统
export const isSystem = (e) => {
  const u = navigator.userAgent
  const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 //  android终端
  if (isAndroid) {
    return 'android'
  }
  return 'ios'
}
// 是否是 office 文件
export const isWordFile = (n) => {
  const regx = /^(doc|docx|xls|xlsx|ppt|pptx|pdf)$/i
  return regx.test(n)
}

/**
 *
 * @param time 需要格式化的时间
 * @param format 想要的格式
 * @returns {string|string}
 */
export function dateFormat(time, format = 'YYYY-MM-DD HH:mm') {
  if (!time) return ''
  try {
    return dayjs(time).format(format) || ''
  } catch (e) {
    console.log('--e>>', e);
    return ''
  }
}
/**
 * 格式化时间戳，返回中文日期
 * @param timestamp 需要格式化的时间戳
 * @returns {string|string}
 */
export function weekDayFormat(timestamp, usePrefix = true) {
  const d = dayjs(+timestamp)
  const now = dayjs()
  let prefix = '今天'
  const day = ['今天', '明天', '后天']
  const week = ['日', '一', '二', '三', '四', '五', '六']
  if (d.diff(now, 'day') < 2) {
    prefix = day[d.diff(now, 'day')]
  } else {
    prefix = `周${week[d.day()]}`
  }
  return usePrefix ? prefix + d.format('MM月DD号 ') : d.format('MM月DD号 ')
}


// 上传附件
export function uploadFiles(filePath) {
  return new Promise((resolve, reject) => {
    const authState = useAuthStore();
    uni.uploadFile({
      url: `${BASE_URL}/file/uploads`,
      filePath: filePath,
      name: 'files',
      formData: {
        // Other form data to send along with the file
      },
      header: {
        'Authorization': authState.token || "basic enlzb2Z0Onp5c29mdCo2MDc5",
        'u-login-areaId': authState.areaId
      },
      success: function (uploadFileRes) {
        // Handle the successful upload response
        resolve(JSON.parse(uploadFileRes.data))
      },
      fail: function (error) {
        console.log(error);
        uni.showToast({
          title: '上传失败,请重试',
          duration: 2000,
          icon: 'error'
        });
      }
    });
  })
}
/**
 *
 * @param lat1 // 第一个地点的纬度
 * @param lon1 // 第一个地点的经度
 * * @param lat2 // 第二个地点的纬度
 * * @param lon2 // 第二个地点的经度
 */
export function calculateDistance(lat1, lon1, lat2, lon2) {
  var earthRadiusKm = 6371; // 地球半径，单位：千米

  var dLat = degreesToRadians(lat2 - lat1);
  var dLon = degreesToRadians(lon2 - lon1);

  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degreesToRadians(lat1)) *
    Math.cos(degreesToRadians(lat2)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var distance = earthRadiusKm * c;

  return distance.toFixed(1);
}
export function degreesToRadians(degrees) {
  return (degrees * Math.PI) / 180;
}

/**
 * 判断是否需要登录
 * @returns 是否需要登录
 */
export const needLogin = async () => {
  const authState = useAuthStore();
  if (isLogin) return true
  await uni.showToast({
    title: '请先登录',
    duration: 2000,
    icon: 'error'
  });
  authState.logout()
  return false
}

/**
 * 判断是否登录
 * @returns 是否登录
 */
export const isLogin = () => {
  const authState = useAuthStore();
  return !authState.isExpired && !isEmpty(authState.token) && !isEmpty(authState.userInfo)
}