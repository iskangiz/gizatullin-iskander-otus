<template>
    <v-row>
        <v-col align="center">
            <h3>{{word.title}}</h3>
            <v-text-field v-model="translation"/>
            <v-btn @click="checkClick">Check</v-btn>
        </v-col>
    </v-row>
</template>

<script>
    import {mapActions} from "vuex";

    export default {
        name: "TextToTextTraining",
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
                }).then((x) => {
                    this.translation = null;
                    this.$emit('processed', x.data)
                });
            }
        }
    }
</script>

<style scoped>

</style>
