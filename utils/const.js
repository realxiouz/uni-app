export const BASE_URL = 'https://dev.km999.com'
export const QINIU = 'https://upload-z2.qiniup.com/'
export const QINIU_PUBLIC = 'http://st.fangxiaoke.com/'

export const RULES = {
	phone: v => v && /^1[\d]{10}$/.test(v),
	notNull: v => !!v
}

export const WX_APPID = 'wxf4cb3f3f8140375b'
export const WX_APPSECRET = '506845b91490290462a3d283621ff1eb'
