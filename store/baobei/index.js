
const state = {
	selCustomer: [
		{name: '', phone: ''}
	],
	daikan: {
		name: '',
		phone: ''
	},
	selProject: [],
}

const getters = {}

const actions = {}

const mutations = {
	setSelCustomer(s, a) {
		s.selCustomer = a
	},
	setDaikan(s, o) {
		s.daikan = o
	},
	setSelProject(s, a) {
		s.selProject = a
	}
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
