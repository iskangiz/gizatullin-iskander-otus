import axios from 'axios'

const accountStore = {
    state: {
        isLoggedIn: false,
        token: localStorage.getItem('token') || '',
        user : {}
    },
    getters: {
        getIsTaskEqualityTask(store) {
            return store.task.isEquality;
        }
    },
    mutations: {
        auth_success(state, token, user){
            state.isLoggedIn = true;
            state.token = token;
            state.user = user
        },
        auth_error(state){
            state.isLoggedIn = false
        },
        logout(state){
            state.isLoggedIn = false;
            state.token = ''
        },
    },
    actions: {
        loginRequest({commit}, user) {
            return new Promise((resolve, reject) => {
                commit('auth_request');
                axios({
                    url: `${process.env.VUE_APP_NOT_SECRET_CODE}/token`,
                    params: {username: user.login, password: user.password},
                    method: 'POST'
                })
                    .then(resp => {
                        const token = resp.data.access_token
                        const user = resp.data.username
                        localStorage.setItem('token', token)
                        axios.defaults.headers.common['Authorization'] = token
                        commit('auth_success', token, user)
                        resolve(resp)
                    })
                    .catch(err => {
                        commit('auth_error')
                        localStorage.removeItem('token')
                        reject(err)
                    })
            })
        }
    }
};

export default accountStore;
