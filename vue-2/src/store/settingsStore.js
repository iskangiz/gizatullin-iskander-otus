const settingsStore = {
    state: {
        isSumEnabled: true,
        isDiffEnabled: false,
        isMultEnabled: false,
        isDivEnabled: true,
        isExpEnabled: true,
        duration: 7,
        complexity: 5,
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
        }
    },
    mutations: {
        setIsSumEnabled(store, value) {
            store.isSumEnabled = value
        },
        setIsDiffEnabled(store, value) {
            store.isSumEnabled = value
        },
        setIsMultEnabled(store, value) {
            store.isSumEnabled = value
        },
        async setIsDivEnabled(store, value) {
            store.isSumEnabled = value
        },
        setIsExpEnabled(store, value) {
            store.isSumEnabled = value
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