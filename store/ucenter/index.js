import Vue from 'vue';
export default {
	namespaced: true,
	state: {
		userInfo: {},// 用户的相关信息, 登录
		currentUserInfo: {// 用户相关信息, 非登录
			template_id: '0'
		},
		houseArr: [], // 楼盘
		statusBarHeight: 0, //状态栏的高度，单位px
		houseId: [],//保存被选中的楼盘ID,
		imgSrc: 'http://st.fangxiaoke.com/wxapp/'
	},
	mutations: {
		changeCurrentUserInfo(state, data) {
			for (const [key, val] of Object.entries(data)) {
				Vue.set(state.currentUserInfo, key, val);
			}
		},
		changeHouseArr(state, data) {
			state.houseArr = data;
		},
		changeHouseId(state, data) {
			if (data.isAdd) {
				state.houseId.push(data.id);
			} else {
				state.houseId.splice(data.index, 1);
			}
		}
	},
	actions: {
		
	},
	getters: {
		imgSrcGetters(state) {
			return item => state.imgSrc + item;
		}
	}
}