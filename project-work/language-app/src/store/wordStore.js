import axios from 'axios'

const wordStore = {
    state: {
    },
    getters: {
    },
    mutations: {
    },
    actions: {
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
        },
        getRandomWords(event, randomWordsParams) {
            return new Promise((resolve) => {
                axios({
                    url: `${process.env.VUE_APP_NOT_SECRET_CODE}/Word/GetRandomWords`,
                    params: {categoryId: randomWordsParams.categoryId, maxWords: randomWordsParams.maxWords},
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
        checkWordTranslation(event, parameters) {
            return new Promise((resolve) => {
                axios({
                    url: `${process.env.VUE_APP_NOT_SECRET_CODE}/Word/checkWordTranslation`,
                    params: {wordId: parameters.wordId, translation: parameters.translation},
                    method: 'POST'
                })
                    .then(resp => {
                        resolve(resp)
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
        },
        checkWordAudio(event, parameters) {
            return new Promise((resolve) => {
                let formData = new FormData();
                formData.append('file', parameters.file)
                axios({
                    url: `${process.env.VUE_APP_NOT_SECRET_CODE}/Word/checkWordAudio`,
                    params: {wordId: parameters.wordId},
                    data: formData,
                    method: 'POST'
                })
                    .then(resp => {
                        resolve(resp)
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
        }
    }

};

export default wordStore;
