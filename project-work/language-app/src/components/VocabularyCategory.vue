<template>
    <v-row>
        <v-col col="4">category</v-col>
        <v-col cols="8">
            <v-row v-for="word in words" :key="word.id">
                <v-col>{{word.title}}</v-col>
                <v-col>{{word.url}}</v-col>
            </v-row>
            <v-row>
                <v-col>
                    qwe
                    <v-btn icon @click="playAudio()">
                        <v-icon>mdi-volume-high</v-icon>
                    </v-btn>
                </v-col>
                <v-col>фыв</v-col>
            </v-row>
        </v-col>
    </v-row>
</template>

<script>

    import {mapActions} from "vuex";

    export default {
        name: "VocabularyCategory",
        data: () => ({
            words: [
                {id: 1, title: "Home", url: "/"},
                {id: 2, title: "Settings", url: "/Settings"}
            ]
        }),
        methods: {
            ...mapActions([
                'testRequest'
            ]),
            playAudio() {
                this.testRequest();
                alert('щас спою');
                //new Audio('https://file-examples.com/wp-content/uploads/2017/11/file_example_MP3_700KB.mp3').play();
            }
        }
    }
</script>

<style scoped>

</style>
