import {
	BASE_URL
} from '@/utils/const.js'

export const http = (url, data, method = 'GET') => {
	let token = uni.getStorageSync('apiToken') || ''
	return new Promise((resolve, reject) => {
		uni.request({
			url: `${BASE_URL}/api/${url}`,
			data,
			method: method.toUpperCase(),
			header: {
				'X-Requested-With': 'XMLHttpRequest',
				Authorization: `Bearer ${token}`
			}
		}).then(r => {
			let [err, data] = r
			if (err) {
				reject(err)
			}
			let status = data.statusCode
			switch (status) {
				case 401:
					reject(new Error('auth失败'))
					uni.navigateTo({
						url: '/pages/public/login/index'
					})
					break;
				case 403:
					uni.uni.showToast({
						title: 'token失效,重新登录',
						icon: 'none'
					});
					reject(new Error('token失效,重新登录'))
					uni.navigateTo({
						url: '/pages/public/login/index'
					})
					break;
				case 200:
					resolve(data.data)
				default:
					resolve(data)
					break;
			}
		})
	})
}
