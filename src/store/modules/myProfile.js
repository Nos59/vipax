import {api, set} from "../../utils/main";

const state = () => ({
    profile: {
        avatar_url: '',
            login: '',
            html_url: '',
            created_at: '',
            repos_url: '',
            following_url: '',
    },
    repos: [],
    following: []
})

const getters = {
    getFollowingUrl: state => {
        return state.profile.following_url.replace('{/other_user}', '')
    }
}

const actions = {
    async fetchProfile({ commit, dispatch }){
        const data = await api('https://api.github.com/users/shaharelisha')
        commit('setProfile', data)
        dispatch('fetchRepos')
        dispatch('fetchFollowing')
    },

    async fetchRepos({ commit, state }){
        const data = await api(state.profile.repos_url)
        commit('setRepos', data)
    },

    async fetchFollowing({ commit, getters }){
        const data = await api(getters.getFollowingUrl)
        commit('setFollowing', data)
    }
}

const mutations = {
    setProfile: set('profile'),
        setRepos: set('repos'),
        setFollowing: set('following')
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}