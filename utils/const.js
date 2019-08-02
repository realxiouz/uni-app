
export var GLOBALDATA = {
    // baseUrl: 'https://oa.km999.com',
    cardlist: '',//名片
    colletelist: [],//名片收藏
    housearr: [],//楼盘
    templatecurrnum: 0,//保存名片当前被选中值
    userInfo: null,//用户基本信息
    token: '',//token值
    informations: {},//浏览记录
    houseid: [],//保存被选中的楼盘ID
    currentuserinfo: {},
    visituserinfo: null,
	header() {
		return {
			"X-Requested-With": "XMLHttpRequest",
			"Authorization": "Bearer " + this.token
		}
	}
};

export const BASE_URL = 'https://dev.km999.com'

export const RULES = {
	phone: v => v && /^1[\d]{10}$/.test(v)
}
