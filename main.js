import App from './App'
import { createPinia } from 'pinia'
import { persist } from './store/persist'
import uviewPlus from '@/uni_modules/uview-plus'
// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'

try {
	function isPromise(obj) {
		return (
			!!obj &&
			(typeof obj === "object" || typeof obj === "function") &&
			typeof obj.then === "function"
		);
	}

	// 统一 vue2 API Promise 化返回格式与 vue3 保持一致
	uni.addInterceptor({
		returnValue(res) {
			if (!isPromise(res)) {
				return res;
			}
			return new Promise((resolve, reject) => {
				res.then((res) => {
					if (res[0]) {
						reject(res[0]);
					} else {
						resolve(res[1]);
					}
				});
			});
		},
	});
} catch (error) { }

const app = new Vue({
	...App
})
const pinia = createPinia()
pinia.use(persist)
app.use(pinia)
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
const pinia = createPinia()
	app.use(pinia)
	app.use(uviewPlus)
	setConfig()
	return {
		app
	}
}
// #endif
function setConfig() {
	uni.$u.setConfig({
		// 修改$u.config对象的属性
		config: {
			// 修改默认单位为rpx，相当于执行 uni.$u.config.unit = 'rpx'
			unit: 'rpx'
		},
		// 修改$u.props对象的属性
		props: {
			radio: {
				size: 15
			},
			icon: {
				size: 64
			},
			button: {
				shape: 'circle',
				size: "large"
			}
		},
		color: {
			primary: '#0F7D9C'
		}
	})
	console.log('--uni.$u.props>>', uni.$u.props);
}
