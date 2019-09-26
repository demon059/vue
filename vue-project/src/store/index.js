import Vue from 'vue'
import Vuex from 'vuex'
import issues from './modules/issues'

Vue.use(Vuex);

const store = new Vuex.Store({

    state: {},
    getters : {},
    mutations: {},
    actions:{},

    modules : {
        issues
    }
})

export default store