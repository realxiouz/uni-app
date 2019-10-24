
const state = {
	listType: '',
    shopId: null
};

const getters = {};

const actions = {};

const mutations = {
	setListType(s, o) {
		s.listType = o
	},
    setShopId(state, id) {
	    state.shopId = id;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
