import { http as axios} from '@/utils/request'

const state = {
    company: {},
    perfection: false
};

const getters = {
    usingMiddlePhone(state) {
        if (state.company.settings)
            return state.company.settings.some(
                i =>
                i.setting_code === "customer_middle_phone" &&
                +i.setting_value === 1
            );
    },
    usingSecretPhone(state) {
        if (state.company.settings)
            return state.company.settings.some(
                i =>
                i.setting_code === "customer_secret_phone" &&
                +i.setting_value === 1
            );
    }
};

const actions = {
    getCompany({
        commit,
        state,
        rootState
    }) {
        return new Promise((resolve, reject) => {
            axios("company/" + rootState.userInfo.company_id)
                .then(res => {
                    commit("setCompany", res);
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
    // 检测公司信息是否已完善
    checkPerfection({
        commit,
        state,
        rootState
    }) {
        return new Promise((resolve, reject) => {
            axios("company/check")
                .then(res => {
                    if (res.data.code) {
                        if (res.data.code == -1) {
                            commit("setPerfection", false);
                        } else {
                            commit("setPerfection", true);
                        }
                    }

                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                })
                .finally(() => {});
        });
    },
    updateCompany({
        commit,
        state
    }) {}
};

const mutations = {
    setCompany(state, company) {
        state.company = company;
    },
    setPerfection(state, perfct) {
        state.perfection = perfct;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
