<template>
    <div>
        <TaskVariable v-for="variable in getVariables" :key="variable" :variable="variable"></TaskVariable>
        <p>={{result}}</p>
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
        props: {
            variables: Array,
            result: Object
        },
        computed: {
            ...mapGetters([
                'getVariables'
            ])
        }
    }
</script>

<style scoped>
    div {
        text-align: center;
    }
</style>