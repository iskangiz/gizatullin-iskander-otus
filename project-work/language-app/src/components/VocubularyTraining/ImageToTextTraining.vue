<template>
    <v-container align="center">
        <v-row>
            <v-col align="center">
                <v-img  max-width="450" height="250" :src="getImgUrl(word.id)"></v-img>
            </v-col>
        </v-row>
        <v-row>
            <v-col align="center">
                <v-btn @click="checkClick(firstOption)">{{firstOption}}</v-btn>
            </v-col>
            <v-col align="center">
                <v-btn @click="checkClick(secondOption)">{{secondOption}}</v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col align="center">
                <v-btn @click="checkClick(thirdOption)">{{thirdOption}}</v-btn>
            </v-col>
            <v-col align="center">
                <v-btn @click="checkClick(fourthOption)">{{fourthOption}}</v-btn>
            </v-col>
        </v-row>

    </v-container>
</template>

<script>
    import {mapActions} from "vuex";

    export default {
        name: "ImageToTextTraining",
        props: {
            word: Object,
            words: Array
        },
        created() {
            this.setOptions()
        },
        data: () => ({
            translation: '',
            firstOption: '',
            secondOption: '',
            thirdOption: '',
            fourthOption: '',
        }),
        methods: {
            ...mapActions([
                'checkWordTranslation'
            ]),
            getImgUrl(wordId) {
                return `${process.env.VUE_APP_NOT_SECRET_CODE}/Word/getImage?id=${wordId}`
            },
            getRandomElement(arr) {
                let index = Math.floor(Math.random() * arr.length);
                let result = arr[index];
                arr.splice(index,1);
                return result;
            },
            checkClick(valueToCheck) {
                this.checkWordTranslation({
                    "wordId": this.word.id,
                    "translation": valueToCheck
                }).then((x) => this.$emit('processed', x.data));
            },
            setOptions() {
                let otherWords = this.words.filter(x => x.id !== this.word.id);
                let optionArr= [this.word.translation];
                optionArr.push(this.getRandomElement(otherWords).translation);
                optionArr.push(this.getRandomElement(otherWords).translation);
                optionArr.push(this.getRandomElement(otherWords).translation);
                optionArr.sort(() => Math.random() - 0.5);
                this.firstOption = optionArr[0];
                this.secondOption = optionArr[1];
                this.thirdOption = optionArr[2];
                this.fourthOption = optionArr[3];
            }
        },
        watch: {
            word: function() { // watch it
                this.setOptions();
            }
        }
    }
</script>

<style scoped>

</style>
