import Vue from 'vue'
import Vuex from 'vuex'
import attendance from './attendance'
import customer from './customer'
import baobei from './baobei'
import message from './message'
import project from './project'
import ucenter from './ucenter'
import company from './company'
Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		attendance, customer, baobei, message, project, ucenter, company
	},
	state: {
		isH5: false,
		hasLogin: false,
		userInfo: {
			department: {},
			company: {
				features: []
			}	
		},// 用户的相关信息, 登录
		statusBarHeight: 0, //状态栏的高度，单位px
        defaultAvatar: 'https://st.fangxiaoke.com/common/person.png',
        projectDefaultImg: 'https://st.fangxiaoke.com/common/no-photo.png',
        token: ''
	},
	mutations: {
		login(state, userInfo) {
			state.hasLogin = true;
			state.userInfo = userInfo;
		},
		logout(state) {
			state.hasLogin = false;
			uni.removeStorage({key: 'apiToken'});
            state.token = '';
			state.userInfo = {
				department: {},
				company: {
					features: []
				}	
			};
		},
		changeToken(state, token) {
			state.token = token;
		},
		setH5(s) {
			s.isH5 = true
		}
	},
	actions: {
	    getUserInfo({commit, state}, $http) {
            let token = state.token;
            if (token && !Reflect.has(state.userInfo, 'id')) {
                $http('auth/user').then(r => {
                    let res = r;
                    if (!res.avatar) {
                        res.avatar = state.defaultAvatar;
                    }
                    commit('login', res);
                })
            } else if (!token) {
                uni.reLaunch({
                    url: '/pages/public/login/index'
                })
            }
        }
	}
})

export default store
