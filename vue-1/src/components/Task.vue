<template>
    <div>
        <TaskVariable v-for="variable in variables" :key="variable" :variable="variable"></TaskVariable>
        <p>={{result}}</p>
    </div>
</template>

<script>
    import TaskVariable from "./TaskVariable";
    export default {
        name: "Task",
        components: {
            TaskVariable
        },
        props: {
            variables: Array,
            result: Object
        }
    }
</script>

<style scoped>
    div {
        text-align: center;
    }
</style>