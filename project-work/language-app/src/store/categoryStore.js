import axios from 'axios'

const categoryStore = {
    state: {
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
        addCategory(event, title) {
            return new Promise((resolve) => {
                axios({
                    url: `${process.env.VUE_APP_NOT_SECRET_CODE}/Category/addCategory`,
                    params: {title: title},
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
        deleteCategory(event, categoryId) {
            return new Promise((resolve) => {
                axios({
                    url: `${process.env.VUE_APP_NOT_SECRET_CODE}/Category/deleteCategory`,
                    params: {id: categoryId},
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

export default categoryStore;
