import Vue from 'vue'
import Vuex from 'vuex'
import settingsStore from './settingsStore'
import playStore from "./playStore";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
    },
    getters: {
    },
    mutations: {
    },
    actions: {
    },
    modules: {
        settingsStore,
        playStore
    }
})