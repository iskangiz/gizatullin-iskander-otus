import Vue from 'vue'
import Vuex from 'vuex'
import settingsStore from './settingsStore'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        variables: [],
    },
    getters: {
        getVariables: state => {
            return state.variables;
        }
    },
    mutations: {
        setCurrentVariable(state, variable) {
            state.currentVariable = variable;
        },
        setVariables: (state, variables) => {
            state.variables = variables;
        },
        setCurrentVariableValue(state, value) {
            state.currentVariable.number =  value;
        }
    },
    actions: {
    },
    modules: {
        settingsStore
    }
})