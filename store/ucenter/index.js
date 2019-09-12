import Vue from 'vue';
import {BASE_URL} from "../../utils/const";

export default {
	namespaced: true,
	state: {
		currentUserInfo: {// 被分享用户相关信息, 非登录
			template_id: '0'
		},
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
        currentLoginUserInfo: {},// 登录用户的信息
        currentInfo: {},// 当前显示使用的信息(登录或被分享的)
        uId: '',
        browseUser: [],
        interceptUId: ''
	},
	mutations: {
		changeCurrentUserInfo(state, data) {
            for (const [key, val] of Object.entries(data)) {
                Vue.set(state.currentUserInfo, key, val);
            }
		},
		changeLoginUserHouseArr(state, data) {
			state.loginUserHouseArr = data;
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
        },
        clearEmpty(state) {
            state.currentLoginUserInfo = {};
            state.currentUserInfo = {};
            state.downLoadImg = {
                img_phone: '',
                img_company: '',
                img_bg: '',
                img_avatar: '',
                img_phone_black: '',
                img_company_black: '',
                img_large_bg: ''
            };
            state.uId = '';
            state.interceptUId = '';
        },
        setUId(state, id) {
		    state.uId = id;
        },
        setBrowseUser(state, arr) {
		    state.browseUser = arr;
        },
        setInterceptUId(state, id) {
		    state.interceptUId = id;
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