import axios from 'axios'

const exerciseStore = {
    state: {
    },
    getters: {
    },
    mutations: {
    },
    actions: {
        addExercise(event, params) {
            return new Promise((resolve) => {
                axios({
                    url: `${process.env.VUE_APP_NOT_SECRET_CODE}/Exercise/addExercise`,
                    data: params,
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
        deleteExercise(event, id) {
            return new Promise((resolve) => {
                axios({
                    url: `${process.env.VUE_APP_NOT_SECRET_CODE}/Exercise/deleteExercise`,
                    params: {id: id},
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
        },
        checkExercise(event, params) {
            return new Promise((resolve) => {
                axios({
                    url: `${process.env.VUE_APP_NOT_SECRET_CODE}/Exercise/checkExercise`,
                    data: params,
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
        }
    }

};

export default exerciseStore;
