<template>
    <v-card
            class="mx-auto"
            max-width="1000">
        <v-alert type="success" v-model="successAlert" transition="fade-transition">
            Correct
        </v-alert>

        <v-alert type="error" v-model="errorAlert">
            Wrong answer
        </v-alert>
        <TextToTextTraining v-if="currentWord && currentWord.type==='TextToText'" :word="currentWord" @processed="processedHandler"/>
        <ImageToTextTraining v-if="currentWord && currentWord.type==='ImageToText'" :word="currentWord" :words="words" @processed="processedHandler"/>
        <AudioToTextTraining v-if="currentWord && currentWord.type==='AudioToText'" :word="currentWord" @processed="processedHandler"/>
        <TextToAudioTraining v-if="currentWord && currentWord.type==='TextToAudio'" :word="currentWord" @processed="processedHandler"/>
    </v-card>

</template>

<script>
    import {mapActions} from "vuex";
    import AudioToTextTraining from "../components/VocubularyTraining/AudioToTextTraining"
    import ImageToTextTraining from "../components/VocubularyTraining/ImageToTextTraining"
    import TextToAudioTraining from "../components/VocubularyTraining/TextToAudioTraining"
    import TextToTextTraining from "../components/VocubularyTraining/TextToTextTraining"

    export default {
        name: "VocabularyTraining",
        components: {AudioToTextTraining, ImageToTextTraining, TextToAudioTraining, TextToTextTraining},
        created() {
            this.init();
        },
        methods: {
            ...mapActions([
                'getRandomWords'
            ]),
            async init() {
                this.$data.words = (await this.getRandomWords({'categoryId': 1, 'maxWords': 10})).data;
            },
            setCurrentIndex() {
                if(this.$data.currentIndex === this.$data.words.length - 1) {
                    this.$router.push('/')
                } else {
                    this.$data.currentIndex++;
                }
            },
            processedHandler(event) {
                if (event)
                    this.showSuccessAlert();
                else
                    this.showErrorAlert();
                this.setCurrentIndex();
            },
            showSuccessAlert() {
                this.successAlert = true;
                window.setInterval(() => {
                    this.successAlert = false;
                }, 1000)
            },
            showErrorAlert() {
                this.errorAlert = true;
                window.setInterval(() => {
                    this.errorAlert = false;
                }, 1000)
            }
        },
        data: () => ({
            words: [],
            currentIndex: 0,
            successAlert: false,
            errorAlert: false
        }),
        computed: {
            currentWord: function () {
                return this.words[this.currentIndex];
            }
        }
    }
</script>

<style scoped>

</style>
