
const state = {
	new: {},
	chats: [],
	isLoaded: false
}

const getters = {}

const actions = {}

const mutations = {
	setNew(s, o) {
		s.new = o
	},
	setChats(s, a) {
		s.chats = a
	}
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
