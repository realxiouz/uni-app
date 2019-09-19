
const state = {
	new: {},
	chats: [],
	isLoaded: false,
	isNotice: true
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
	setNotice(state, boo) {
		state.isNotice = boo;
	}
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
