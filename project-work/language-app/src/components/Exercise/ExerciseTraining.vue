<template>
    <v-row>
        <v-col cols="10">

            <span v-for="word in exercise.words" :key="word.id">
                            &nbsp;
                <input v-if="word.hidden && !answered" v-model="word.answer">
                <span v-else>{{word.content}}</span>
            </span>
        </v-col>

        <v-col cols="2">
            <v-btn v-if="!answered" @click="checkBtnClick">Check</v-btn>
            <span v-else>{{result}}</span>
        </v-col>
    </v-row>
</template>

<script>
    import {mapActions} from "vuex";

    export default {
        name: "ExerciseTraining",
        props:{
            exercise: Object
        },
        created() {
        },
        data: () => ({
            result: '',
            answered: false,
        }),
        methods: {
            ...mapActions([
                'checkExercise'
            ]),
            checkBtnClick() {
                this.checkExercise(this.exercise).then((x)=>{
                    this.answered = true;
                    this.result= x.data ? 'correct' : 'not correct';
                });
            }
        }
    }
</script>

<style scoped>
    input {
        border-bottom: 1px solid black;
    }
</style>
