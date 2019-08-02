import Vue from 'vue'
import Vuex from 'vuex'
import attendance from './attendance/index.js'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		attendance,
	},
	state: {
		hasLogin: false,
		userInfo: {},
	},
	mutations: {
		login(state, userInfo) {
			state.hasLogin = true;
			state.userInfo = userInfo;
		},
		logout(state) {
			state.hasLogin = false;
			state.userInfo = {};
		}
	},
	actions: {
	
	}
})

export default store
