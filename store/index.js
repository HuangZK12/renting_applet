import { defineStore } from 'pinia';
import { get_office, get_user_info, login_api } from '@/api/modules/login';

// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
export const useAuthStore = defineStore('authState', {
  // state: 返回对象的函数
  state: () => ({
    userInfo: uni.getStorageSync('userInfo') || {},
    token: uni.getStorageSync('token') || null,
    expiration: uni.getStorageSync('expiration') || null,
    office: uni.getStorageSync('office') || {}
  }),
  getters: {
    areaId: (state) => state.office?.areaId,
    // 是否登录过期
    isExpired: (state) => (state._expiration < Date.now()) && !!state._token
  },
  actions: {
    // 登录
    login(params) {
      return new Promise(async (resolve, reject) => {
        uni.showLoading({
          title: '登陆中',
          mask: true
        });
        try {
          // 获取token
          const { data } = await login_api(params)
          // 储存token
          await this.setToken(data.token, data.refreshToken.expiration)
          // 获取机构信息
          const res = await get_office()
          // 拿第一项
          const [office] = res.data
          // 储存机构信息
          await this.setOffice(office)
          // 获取用户信息
          await this.getUserInfo()
          uni.showToast({
            title: '登录成功',
            duration: 2000
          });
          return resolve(data)
        } catch (error) {
          return reject(error)
        } finally {
          uni.hideLoading();
        }
      })
    },
    // 退出登录
    async logout() {
      return new Promise(async (resolve, reject) => {
        await this.removeStorage()
        this.resetState()
        await uni.reLaunch({
          url: '/pages/login/login'
        });
        resolve()
      })
    },
    // 获取并保存用户信息
    getUserInfo() {
      return new Promise((resolve, reject) => {
        get_user_info().then(async (data) => {
          await this.setUserInfo(data.data)
          resolve(data)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    // 设置token  有效期
    setToken(token, expiration) {
      return new Promise(async (resolve, reject) => {
        this.token = token;
        this.expiration = expiration;
        try {
          await uni.setStorage({
            key: 'token',
            data: token,
          })
          await uni.setStorage({
            key: 'expiration',
            data: expiration,
          });
          resolve()
        } catch (error) {
          reject(error)
        }
      })
    },
    // 存储机构
    setOffice(office) {
      return new Promise(async (resolve, reject) => {
        this.office = office;
        uni.setStorage({
          key: 'office',
          data: office,
          success: () => {
            resolve()
          },
          fail: () => {
            reject()
          }
        });
      })
    },
    // 存储用户信息
    setUserInfo(userInfo) {
      return new Promise(async (resolve, reject) => {
        this.userInfo = userInfo;
        uni.setStorage({
          key: 'userInfo',
          data: userInfo,
          success: () => {
            resolve()
          },
          fail: () => {
            reject()
          }
        });
      })
    },
    // 清除本地缓存
    removeStorage() {
      return new Promise(async (resolve, reject) => {
        const keys = ['token', 'expiration', 'office', 'userInfo']
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          try {
            await uni.removeStorage({
              key
            });
          } catch (error) {
            // 可能会存在找不到key的情况，不影响使用
            console.log('--error>>', error);
          } finally {
            resolve()
          }
        }
      })
    },
    // 清空
    resetState() {
      this.token = null;
      this.expiration = null;
      this.userInfo = {};
      this.office = {};
    }
  }
});