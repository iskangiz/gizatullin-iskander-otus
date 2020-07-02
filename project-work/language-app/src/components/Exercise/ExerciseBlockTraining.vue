<template>
    <v-card>
        <v-container>
            <v-row style="border-bottom: #0b2e13 1px solid" v-for="exercise in block.exercises" :key="exercise.id">
                <v-col>
                    <ExerciseTraining :exercise="exercise"></ExerciseTraining>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>
    import {mapActions} from "vuex";
    import ExerciseTraining from "./ExerciseTraining";

    export default {
        name: "ExerciseBlockTraining",
        components: {ExerciseTraining},
        props: {
            blockId: Number
        },
        created() {
            if (this.blockId != undefined) {
                this.getExerciseBlock(this.blockId).then((x) => {
                    this.block = x.data
                })
            }
        },
        watch: {
            blockId: function (newBlockId) {
                this.getExerciseBlock(newBlockId).then((x) => {
                    this.block = x.data
                })
            }
        },
        data: () => ({
            block: {}
        }),
        methods: {
            ...mapActions([
                'getExerciseBlock'
            ]),
        }
    }
</script>

<style scoped>

</style>
