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
				console.log('出错了...')
				reject(err)
			}
			let status = data.statusCode
			switch (status) {
				case 401:
					reject(new Error('auth失败'))
					uni.reLaunch({
						url: '/pages/public/login/index'
					})
					break
				case 403:
					uni.showToast({
						title: data.data.message,
						icon: 'none'
					});
					reject(new Error('非正常响应'))
					// uni.navigateTo({
					// 	url: '/pages/public/login/index'
					// })
					break
				case 422:
					let e = data.data.errors
					if (e){
						let str = ''
						for (let i in e) {
							str += e[i].join(',')
						}
						uni.showToast({
							title: str,
							icon: 'none'
						});
					}
					reject(new Error('表单不完整'))
					break;
				case 500:
					reject(new Error('500'))
					break;
				case 200:
					resolve(data.data)
					break
				default:
					resolve(data)
					break;
			}
		})
	})
}
