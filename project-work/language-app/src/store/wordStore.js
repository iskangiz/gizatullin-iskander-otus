import axios from 'axios'

const wordStore = {
    state: {
        isLoggedIn: false,
        token: localStorage.getItem('token') || '',
        user : {}
    },
    getters: {
    },
    mutations: {
    },
    actions: {
        getCategories() {
            return new Promise((resolve) => {
                axios({
                    url: `${process.env.VUE_APP_NOT_SECRET_CODE}/Category/getAllCategories`,
                    method: 'GET'
                })
                    .then(resp => {
                        resolve(resp)
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
        },
        addWord() {
        }
    }

};

export default wordStore;
