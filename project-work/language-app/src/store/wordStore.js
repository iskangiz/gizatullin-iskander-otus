import axios from 'axios'

const wordStore = {
    state: {
        isLoggedIn: false,
        token: localStorage.getItem('token') || '',
        user : {}
    },
    getters: {
        getIsLoggedIn(store) {
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
        testRequest() {
            return new Promise((resolve) => {
                axios({
                    url: `${process.env.VUE_APP_NOT_SECRET_CODE}/WeatherForecast`,
                    method: 'GET'
                })
                    .then(resp => {
                        console.log(resp)
                        resolve(resp)
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
        },
    }

};

export default wordStore;
