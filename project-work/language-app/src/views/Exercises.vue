<template>
    <div>
        <h1>Exercise blocks</h1>

        <ExerciseBlock v-for="exerciseBlock in exerciseBlocks"
                       :key="exerciseBlock.id" :exercise-block="exerciseBlock"
                       @exerciseAdding="openAddExerciseDialog($event)"
                       @exerciseDeleted="onExerciseAdded($event)"
                       @exerciseBlockDeleted="onExerciseBlockDeleted($event)"/>

        <template v-if="getIsAdmin">
            <AddExercise v-model="showAddExerciseDialog" :block-id="addExerciseBlockId" @exerciseAdded="onExerciseAdded($event)" />
            <AddExerciseBlock v-model="showAddExerciseBlockDialog" @exerciseBlockAdded="onExerciseBlockAdded($event)"/>
            <v-col align="center">
                <v-btn x-large color="primary" @click="openAddExerciseBlockDialog">Add exercise block</v-btn>
            </v-col>
        </template>
    </div>

</template>

<script>
    import {mapActions, mapGetters} from "vuex";
    import Vue from 'vue'
    import ExerciseBlock from "../components/Exercise/ExerciseBlock";
    import AddExerciseBlock from "../components/Exercise/AddExerciseBlock";
    import AddExercise from "../components/Exercise/AddExercise";

    export default {
        name: "Exercises",
        components: {AddExercise, AddExerciseBlock, ExerciseBlock},
        created() {
            this.getExerciseBlocks().then((x) => {
                this.$data.exerciseBlocks = x.data
            });
        },
        data: () => ({
            exerciseBlocks: [],
            showAddExerciseDialog: false,
            addExerciseBlockId: 0,
            showAddExerciseBlockDialog: false
        }),
        methods: {
            ...mapActions([
                'getExerciseBlocks',
                'getExerciseBlock',
                'deleteExerciseBlock'
            ]),
            openAddExerciseDialog(event) {
                this.$data.addExerciseBlockId = event;
                this.$data.showAddExerciseDialog = true
            },
            onExerciseAdded(exerciseBlockId) {
                this.getExerciseBlock(exerciseBlockId).then((x) => {
                    let exerciseBlockIndex = this.$data.exerciseBlocks.findIndex(x => x.id === exerciseBlockId);
                    this.$data.exerciseBlocks[exerciseBlockIndex] = x.data;
                    Vue.set(this.$data.exerciseBlocks, exerciseBlockIndex, x.data)
                });
            },
            onExerciseBlockAdded(exerciseBlockId) {
                this.getExerciseBlock(exerciseBlockId).then((x) => {
                    this.$data.exerciseBlocks.push(x.data);
                });
            },
            onExerciseBlockDeleted(exerciseBlockId) {
                this.deleteExerciseBlock(exerciseBlockId).then(() => {
                    let exerciseBlockIndex = this.$data.exerciseBlocks.findIndex(x => x.id === exerciseBlockId);
                    this.$data.exerciseBlocks.splice(exerciseBlockIndex, 1);
                });
            },
            openAddExerciseBlockDialog() {
                this.$data.showAddExerciseBlockDialog = true
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
