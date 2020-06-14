<template>
    <v-row >
        <v-col col="2">
            <h3>{{category.title}}</h3>
            <v-btn v-if="getIsAdmin" @click="$emit('wordAdding', category.id)">Add word</v-btn>
        </v-col>
        <v-col cols="10">
            <v-row v-for="word in category.words" :key="word.id">
                <v-col>
                    {{word.title}}
                </v-col>
                <v-col>
                    {{word.translation}}
                    <v-btn v-if="word.hasAudio" icon @click="playAudio(word.id)">
                        <v-icon>mdi-volume-high</v-icon>
                    </v-btn>
                </v-col>
                <v-col>
                    <v-img  max-width="50" max-height="50" v-if="word.hasImage" :src="getImgUrl(word.id)"></v-img>
                </v-col>
                <v-col>
                    <v-btn v-if="getIsAdmin" icon @click="deleteWordClick(word.id)">
                        <v-icon>mdi-delete</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>

<script>

    import {mapActions, mapGetters} from "vuex";

    export default {
        name: "VocabularyCategory",
        props:{
            category: Object
        },
        data: () => ({
            words: [
                {id: 1, title: "Home", url: "/"},
                {id: 2, title: "Settings", url: "/Settings"}
            ]
        }),
        methods: {
            ...mapActions([
                'deleteWord'
            ]),
            playAudio(wordId) {
                new Audio(`${process.env.VUE_APP_NOT_SECRET_CODE}/Word/getVoice?id=${wordId}`).play();
            },
            getImgUrl(wordId) {
                return `${process.env.VUE_APP_NOT_SECRET_CODE}/Word/getImage?id=${wordId}`
            },
            deleteWordClick(wordId) {
                this.deleteWord(wordId).then(() => {
                    this.$emit('wordDeleted', this.category.id);
                })
            }
        },

        computed: {
            ...mapGetters([
                'getIsAdmin'
            ])
        }
    }
</script>

<style scoped>

</style>
