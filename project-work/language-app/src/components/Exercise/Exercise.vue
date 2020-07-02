<template>
    <div>
        <span v-for="word in exercise.words" :key="word.id">
            &nbsp;
            <span v-if="word.hidden"><v-icon>mdi-eye-off</v-icon></span>
            <span v-else>{{word.content}}</span>
        </span>
    </div>
</template>

<script>
    export default {
        name: "Exercise",
        props:{
            exercise: Object
        },
    }
</script>

<style scoped>

</style>
