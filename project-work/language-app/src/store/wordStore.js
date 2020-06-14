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
        getCategory(event, categoryId) {
            return new Promise((resolve) => {
                axios({
                    url: `${process.env.VUE_APP_NOT_SECRET_CODE}/Category/getCategoryById`,
                    params: {categoryId: categoryId},
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
        addWord(event, data) {
            return new Promise((resolve) => {
                let formData = new FormData();
                formData.append('file', data.image)
                axios({
                    url: `${process.env.VUE_APP_NOT_SECRET_CODE}/Word/addWord`,
                    params: {word: data.word, categoryId: data.categoryId},
                    data: formData,

                    method: 'POST'
                })
                    .then(resp => {
                        resolve(resp)
                    })
                    .catch(err => {
                        console.log(err);
                        throw err;
                    })
            })
        },
        deleteWord(event, wordId) {
            return new Promise((resolve) => {
                axios({
                    url: `${process.env.VUE_APP_NOT_SECRET_CODE}/Word/deleteWord`,
                    params: {id: wordId},
                    method: 'DELETE'
                })
                    .then(resp => {
                        resolve(resp)
                    })
                    .catch(err => {
                        console.log(err);
                        throw err;
                    })
            })
        }
    }

};

export default wordStore;
