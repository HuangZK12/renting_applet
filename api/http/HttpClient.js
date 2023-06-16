import axios from 'axios';
import {
  uniAdapter
} from 'fant-axios-adapter';
import { useAuthStore } from '@/store';
import { BASE_URL } from '@/env';

export default class ApiClient {
  // 登录默认token
  static #defaultToken = "basic enlzb2Z0Onp5c29mdCo2MDc5";
  static server() {
    // 可以在这里拦截
    return ApiClient.create();
  }

  static create() {
    const instance = axios.create({
      withCredentials: true,
      baseURL: BASE_URL,
      timeout: 60000,
      adapter: uniAdapter // 配置适配器
    });

    instance.interceptors.request.use((request) => {
      const authState = useAuthStore();
      if (authState.isExpired) {
        authState.logout();
        return Promise.reject({ errMsg: '登录过期，请重新登录' });
      }
      request.headers["Authorization"] = authState.token || this.#defaultToken;
      request.headers["u-login-areaId"] = authState.areaId;
      return request;
    }, (error) => {
      return Promise.reject(error);
    });

    instance.interceptors.response.use((res) => {
      const { data } = res;
      const code = data.code;
      if (code == 200) {
        return Promise.resolve(data)
      } else if (code == 302) {
        // 未登录
        const oauthStore = useAuthStore()
        oauthStore.logout();
        uni.showToast({
          icon: 'error',
          title: data.message,
        })
      } else {
        const disposition = res.headers["content-disposition"]; // 判断是否为文件
        if (disposition?.includes("attachment;")) {
          return Promise.resolve(data);
        } else {
          uni.showToast({
            icon: 'error',
            title: data.message,
          })
          return Promise.reject(data);
        }
      }
    }, (error) => {
      console.log('--error.errMsg>>',error);
      uni.showToast({
        icon: 'error',
        title: error.errMsg || '系统错误',
      })
      return Promise.reject(error);
    });
    return instance;
  }
}