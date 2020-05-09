const settingsStore = {
    state: {
        isSumEnabled: true,
        isDiffEnabled: true,
        isMultEnabled: true,
        isDivEnabled: false,
        isExpEnabled: false,
        duration: 7,
        complexity: 2,
        isSettingsLoading: false
    },
    getters: {
        getIsSumEnabled: state => {
            return state.isSumEnabled;
        },
        getIsDiffEnabled: state => {
            return state.isDiffEnabled;
        },
        getIsMultEnabled: state => {
            return state.isMultEnabled;
        },
        getIsDivEnabled: state => {
            return state.isDivEnabled;
        },
        getIsExpEnabled: state => {
            return state.isExpEnabled;
        },
        getDuration: state => {
            return state.duration;
        },
        getComplexity: state => {
            return state.complexity;
        },
        getIsSettingsLoading: state => {
            return state.isSettingsLoading;
        },
        getAllSettings: state=> {
            return {
                "isSumEnabled": state.isSumEnabled,
                "isDiffEnabled": state.isDiffEnabled,
                "isMultEnabled": state.isMultEnabled,
                "isDivEnabled": state.isDivEnabled,
                "isExpEnabled": state.isExpEnabled,
                "duration": state.duration,
                "complexity": state.complexity
            }
        }
    },
    mutations: {
        setIsSumEnabled(store, value) {
            store.isSumEnabled = value
        },
        setIsDiffEnabled(store, value) {
            store.isDiffEnabled = value
        },
        setIsMultEnabled(store, value) {
            store.isMultEnabled = value
        },
        async setIsDivEnabled(store, value) {
            store.isDivEnabled = value
        },
        setIsExpEnabled(store, value) {
            store.isExpEnabled = value
        },
        setDuration(store, value) {
            store.duration = value;
        },
        setComplexity(store, value) {
            store.complexity = value;
        },
        setIsSettingsLoading(store, value) {
            store.isSettingsLoading = value;
        }
    },
    actions: {
        loadSettings({commit}) {
            commit('setIsSettingsLoading', true);
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve()
                }, 2000)
            }).then(() => {
                commit('setIsSettingsLoading', false)
            })
        }
    }
};

export default settingsStore;