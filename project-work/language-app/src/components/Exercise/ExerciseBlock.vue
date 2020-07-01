<template>
    <v-row>
        <v-col col="2">
            <p style="word-wrap: break-word; width:250px" class="text-wrap">{{exerciseBlock.description}}</p>
            <v-btn v-if="getIsAdmin" @click="$emit('exerciseAdding', exerciseBlock.id)">Add</v-btn>
            <v-btn v-if="getIsAdmin" @click="deleteExerciseBlockClick"><v-icon>mdi-delete</v-icon></v-btn>
            <v-btn @click="goToTraining(exerciseBlock.id)">Train</v-btn>
        </v-col>
        <v-col cols="10">
            <v-row style="border-bottom: #0b2e13 1px solid" v-for="exercise in exerciseBlock.exercises" :key="exercise.id">
                <v-col>
                    <Exercise :exercise="exercise"></Exercise>
                </v-col>
                <v-col>
                    <v-btn v-if="getIsAdmin" icon @click="deleteExerciseClick(exercise.id)">
                        <v-icon>mdi-delete</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";
    import Exercise from "./Exercise";

    export default {
        name: "ExerciseBlock",
        components: {Exercise},
        props:{
            exerciseBlock: Object
        },
        data: () => ({
        }),
        created() {
            console.log(this.exerciseBlock)
        },
        methods: {
            ...mapActions([
                'deleteWord',
                'deleteExercise'
            ]),
            deleteExerciseClick(wordId) {
                if (confirm('Are you sure?')) {
                    this.deleteExercise(wordId).then(() => {
                        this.$emit('exerciseDeleted', this.exerciseBlock.id);
                    })
                }
            },
            goToTraining(blockId) {
                this.$router.push({ path: 'ExerciseTraining', query: { blockId: blockId } })
            },
            deleteExerciseBlockClick() {
                if (confirm('Are you sure?')) {
                    this.$emit('exerciseBlockDeleted', this.exerciseBlock.id)
                }
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
