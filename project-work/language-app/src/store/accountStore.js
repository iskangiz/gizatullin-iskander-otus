import axios from 'axios'

const accountStore = {
    state: {
        isLoggedIn: false,
        token: localStorage.getItem('token') || '',
        user : {}
    },
    getters: {
        isLoggedIn(store) {
            return store.isLoggedIn;
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
                axios({
                    url: `${process.env.VUE_APP_NOT_SECRET_CODE}/token`,
                    params: {username: user.login, password: user.password},
                    method: 'POST'
                })
                    .then(resp => {
                        const token = resp.data.access_token;
                        const user = resp.data.username;
                        localStorage.setItem('token', token);
                        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                        commit('auth_success', token, user);
                        resolve(resp)
                    })
                    .catch(err => {
                        commit('auth_error');
                        localStorage.removeItem('token');
                        reject(err)
                    })
            })
        },
        logout({commit}) {
            commit('logout');
            localStorage.removeItem('token');
            delete axios.defaults.headers.common['Authorization'];
        }
    }

};

export default accountStore;
