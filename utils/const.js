export const BASE_URL = 'https://dev.km999.com'
export const QINIU = 'http://upload-z2.qiniup.com/'
export const QINIU_PUBLIC = 'http://st.fangxiaoke.com/'

export const RULES = {
	phone: v => v && /^1[\d]{10}$/.test(v),
	notNull: v => !!v
}
