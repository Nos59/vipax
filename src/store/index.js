import Vue from 'vue'
import Vuex from 'vuex'
import myTeam from "./modules/myTeam";
import myProfile from "./modules/myProfile";

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        myTeam,
        myProfile
    }
})
