
const state = {
    week: [
		{text: '周一', value: '1', checked: true, gradeName: '', gradeId: ''},
		{text: '周二', value: '2', checked: true, gradeName: '', gradeId: ''},
		{text: '周三', value: '3', checked: true, gradeName: '', gradeId: ''},
		{text: '周四', value: '4', checked: true, gradeName: '', gradeId: ''},
		{text: '周五', value: '5', checked: true, gradeName: '', gradeId: ''},
		{text: '周六', value: '6', checked: false, gradeName: '', gradeId: ''},
		{text: '周日', value: '0', checked: false, gradeName: '', gradeId: ''}
	],
	wifi: [
		{
			BSSID: "dc:ef:09:ac:ed:20",
			SSID: "KmNet1",
			secure: true,
			signalStrength: 99
		}
	],
	staffs: []
}

const getters = {
	weekString(state) {
		let temp = state.week.filter(i => i.checked && i.gradeId).map(i => i.text[1])
		return temp.length ? `周${temp.join('、')}` : '还未选择'
	}
}

const actions = {}

const mutations = {
    setWeek(state, week) {
		state.week = week
	},
	setWifi(state, wifi) {
		state.wifi = wifi
	},
	setStaffs(state, staffs) {
		state.staffs = staffs
	}
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
