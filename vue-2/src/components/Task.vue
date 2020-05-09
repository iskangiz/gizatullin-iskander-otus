<template>
    <div>
        <TaskVariable v-for="(variable, index) in getTaskNumbers" :key="index" :variable="variable"></TaskVariable>
        <div v-if="getIsTaskEqualityTask">
            <p><span class="userInput"> {{getUserEqualitySign}}</span></p>
            <p><span>{{getTaskResultToShow}}</span></p>
        </div>
        <div v-else>
            <p><span>=</span></p>
            <p><span class="userInput">{{getUserInputValue}}</span></p>
        </div>
    </div>
</template>

<script>
    import TaskVariable from "./TaskVariable";
    import { mapGetters } from 'vuex';
    export default {
        name: "Task",
        components: {
            TaskVariable
        },
        computed: {
            ...mapGetters([
                'getTaskNumbers',
                'getIsTaskEqualityTask',
                'getTaskResultToShow',
                'getUserInputValue',
                'getUserEqualitySign'
            ])
        }
    }
</script>

<style scoped>
    div {
        text-align: center;
    }
</style>