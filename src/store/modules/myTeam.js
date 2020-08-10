import {api, set} from "../../utils/main";

const state = () => ({
    usersList: []
})

const getters = {}

const actions = {
    async fetchUsersList({ commit }){
        const data = await api('https://api.github.com/users?since=50000000')
        commit('setUsersList', data)
    }
}

const mutations = {
    setUsersList: set('usersList')
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}