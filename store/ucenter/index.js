import Vue from 'vue';
import {BASE_URL} from "../../utils/const";

export default {
	namespaced: true,
	state: {
		currentUserInfo: {// 用户相关信息, 非登录
			template_id: '0'
		},
		LoginUserHouseArr: [], // 当前登录用户的推荐楼盘楼盘
        currentUserHouseArr: [], // 被分享人用户的推荐楼盘
		statusBarHeight: 0, //状态栏的高度，单位px
		houseId: [],//保存被选中的楼盘ID,
		imgSrc: BASE_URL + '/storage/vicard/',
        downLoadImg: {
            img_phone: '',
            img_company: '',
            img_bg: '',
            img_avatar: '',
            img_phone_black: '',
            img_company_black: '',
            img_large_bg: ''
        },
        currentLoginUserInfo: {},
        currentInfo: {}
	},
	mutations: {
		changeCurrentUserInfo(state, data) {
			for (const [key, val] of Object.entries(data)) {
				Vue.set(state.checkUserInfo, key, val);
			}
		},
		changeLoginUserHouseArr(state, data) {
			state.LoginUserHouseArr = data;
		},
        changeCurrentUserHouseArr(state, data) {
		    state.currentUserHouseArr = data;
        },
		changeHouseId(state, data) {
			if (data.isAdd) {
				state.houseId.push(data.id);
			} else {
				state.houseId.splice(data.index, 1);
			}
		},
        changeImg(state, obj) {
            Vue.set(state.downLoadImg, obj.key, obj.url);
        },
        changeCurrentLoginUserInfo(state, data) {
		    for (const [key, val] of Object.entries(data)) {
		        Vue.set(state.currentLoginUserInfo, key, val);
            }
        },
        changeCurrentInfo(state, data) {
		    state.currentInfo = data;
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