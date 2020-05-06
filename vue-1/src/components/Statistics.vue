<template>
    <div>
        <p>Добро пожаловать на {{day}} тренировочный день</p>
        <p>Ваш последний результат - решено {{solvedTasks}} из {{allTasks}}</p>
        <p>Общая точность {{accuracy}}%</p>
    </div>
</template>

<script>
    export default {
        name: "Statistics",
        props: {
            day: Number,
            allTasks: Number,
            solvedTasks: Number,
            accuracy: Number
        }
    }
</script>

<style scoped>

</style>