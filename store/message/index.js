
const state = {
	new: {
		both: {},
		window: {}
	},
	chats: [],
	isLoaded: false,
	messageList: [],
	currentBothId: ''
}

const getters = {}

const actions = {}

const mutations = {
	setNew(s, o) {
		s.new = o
	},
	setChats(s, a) {
		s.chats = a
	},
	setPushMessageList(state, data) {
		let index = state.messageList.findIndex(item => Number(item.id) === Number(data.id));
		if (index === -1) {
			state.messageList.push(data);
		} else {
			state.messageList.splice(index, 1, data);
		}
		
	},
	setSpliceMessageList(state, id) {
		let index = state.messageList.findIndex(item => Number(item.id) === Number(id));
		state.messageList.splice(index, 1);
	},
	setCurrentBothId(state, id) {
		state.currentBothId = id;
	}
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
