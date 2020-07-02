<template>
    <v-row>
        <v-col align="center">
            <v-btn @click="checkClick" icon>
                <v-icon v-if="isRecording" x-large>mdi-microphone</v-icon>
                <v-icon v-else x-large>mdi-microphone-outline</v-icon>
            </v-btn>
            <h3>{{word.title}}</h3>
            <v-btn @click="skipClick">Skip</v-btn>
        </v-col>
    </v-row>
</template>

<script>
    import {mapActions} from "vuex";

    export default {
        name: "TextToAudioTraining",
        props: {
            word: Object
        },
        data: () => ({
            isRecording: false
        }),
        methods: {
            ...mapActions([
                'checkWordAudio'
            ]),
            async checkClick() {
                await navigator.mediaDevices.getUserMedia({
                    audio: true
                }).then((mediaStreamObj) => {
                    this.$data.isRecording=true;
                    let mediaRecorder = new MediaRecorder(mediaStreamObj);
                    let chunks = [];

                    mediaRecorder.start();

                    mediaRecorder.ondataavailable = function(ev) {
                        chunks.push(ev.data);
                    };

                    mediaRecorder.onstop = ()=> {
                        let blob = new Blob(chunks);
                        chunks = [];

                        this.checkWordAudio({"wordId": this.word.id, "file": blob})
                            .then((x) => this.$emit('processed', x.data))
                            .catch(() => this.$emit('processed', false))
                    };

                    setTimeout(() => {
                        mediaStreamObj.getTracks().forEach(track => {
                            track.stop()
                        });
                        mediaRecorder.stop();
                        this.$data.isRecording=false;
                    }, 3000);
                });
            },
            skipClick() {
                this.$emit('processed')
            }
        }
    }
</script>

<style scoped>

</style>
