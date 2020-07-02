import axios from 'axios'

const exerciseBlockStore = {
    state: {
    },
    getters: {
    },
    mutations: {
    },
    actions: {
        getExerciseBlocks() {
            return new Promise((resolve) => {
                axios({
                    url: `${process.env.VUE_APP_NOT_SECRET_CODE}/ExerciseBlock/getAllExerciseBlocks`,
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
        getExerciseBlock(event, exerciseBlockId) {
            return new Promise((resolve) => {
                axios({
                    url: `${process.env.VUE_APP_NOT_SECRET_CODE}/ExerciseBlock/getExerciseBlockById`,
                    params: {exerciseBlockId: exerciseBlockId},
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
        addExerciseBlock(event, description) {
            return new Promise((resolve) => {
                axios({
                    url: `${process.env.VUE_APP_NOT_SECRET_CODE}/ExerciseBlock/addExerciseBlock`,
                    params: {description: description},
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
        deleteExerciseBlock(event, id) {
            return new Promise((resolve) => {
                axios({
                    url: `${process.env.VUE_APP_NOT_SECRET_CODE}/ExerciseBlock/deleteExerciseBlock`,
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
        }
    }

};

export default exerciseBlockStore;
