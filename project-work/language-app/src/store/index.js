import Vue from 'vue'
import Vuex from 'vuex'
import accountStore from "./accountStore";
import wordStore from "./wordStore";
import categoryStore from "./categoryStore";
import exerciseBlockStore from "./exerciseBlockStore";
import exerciseStore from "./exerciseStore";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    accountStore,
    wordStore,
    categoryStore,
    exerciseBlockStore,
    exerciseStore
  }
})
