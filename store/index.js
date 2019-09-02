import Vue from 'vue'
import Vuex from 'vuex'
import attendance from './attendance'
import customer from './customer'
import baobei from './baobei'
import message from './message'
import project from './project'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		attendance, customer, baobei, message, project
	},
	state: {
		isH5: false,
		hasLogin: false,
		userInfo: {},// 用户的相关信息, 登录
		token: uni.getStorageSync('apiToken') || '',
		currentuserinfo: {// 用户相关信息, 非登录
			template_id: '0'
		},
		housearr: [], // 楼盘
		statusBarHeight: 0, //状态栏的高度，单位px
		houseid: [],//保存被选中的楼盘ID
	},
	mutations: {
		login(state, userInfo) {
			state.hasLogin = true;
			state.userInfo = userInfo;
		},
		logout(state) {
			state.hasLogin = false;
			state.userInfo = {};
		},
		changeCurrentUserInfo(state, data) {
			for (const [key, val] of Object.entries(data)) {
				Vue.set(state.currentuserinfo, key, val);
			}
		},
		changeHouseArr(state, data) {
			state.housearr = data;
		},
		changeHouseId(state, data) {
			if (data.isAdd) {
				state.houseid.push(data.id);
			} else {
				state.houseid.splice(data.index, 1);
			}
		},
		changeToken(state, token) {
			state.token = token;
		},
		setH5(s) {
			s.isH5 = true
		}
	},
	actions: {
	
	}
})

export default store
