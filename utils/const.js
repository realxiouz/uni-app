export const BASE_URL = 'https://erp.fangxiaoke.com'
export const QINIU = 'https://upload-z2.qiniup.com/'
// https://erp.fangxiaoke.com
export const QINIU_PUBLIC = 'http://st.fangxiaoke.com/';

export const RULES = {
	phone: v => v && /^1[\d]{10}$/.test(v),
	notNull: v => !!v
};

export const WX_APPID = 'wxf4cb3f3f8140375b';
export const WX_APPSECRET = '506845b91490290462a3d283621ff1eb';

export const priceMap = {
	'新房': [0, 30, 50, 100, 150, 200, 500],
	'租房': [0, 1000, 1500, 2000, 2500, 3000, 4000, 5000],
	'二手房': [0, 30, 50, 100, 150, 200, 500]
}

export const priceUnitMap = {
	'新房': '万',
	'租房': '元',
	'二手房': '万'
}

export const unitMap = {
	'新房': [0, 5000, 8000, 10000, 15000, 20000, 30000],
	'租房': [0, 5000, 8000, 10000, 15000, 20000, 30000],
	'二手房': [0, 5000, 8000, 10000, 15000, 20000, 30000]
}
