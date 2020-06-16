<template>
    <v-row>
        <v-col align="center">
            <v-btn icon @click="playAudio(word.id)">
                <v-icon x-large >mdi-volume-high</v-icon>
            </v-btn>
            <v-text-field v-model="translation"/>
            <v-btn @click="checkClick"  size="large">Check</v-btn>
        </v-col>
    </v-row>
</template>

<script>
    import {mapActions} from "vuex";

    export default {
        name: "AudioToTextTraining",
        props: {
            word: Object
        },
        data: () => ({
            translation: ''
        }),
        methods: {
            ...mapActions([
                'checkWordTranslation'
            ]),
            checkClick() {
                this.checkWordTranslation({
                    "wordId": this.word.id,
                    "translation": this.translation
                }).then((x) => this.$emit('processed', x.data));
            },
            playAudio() {
                new Audio(`${process.env.VUE_APP_NOT_SECRET_CODE}/Word/getVoice?id=${this.word.id}`).play();
            }
        }
    }
</script>

<style scoped>

</style>
