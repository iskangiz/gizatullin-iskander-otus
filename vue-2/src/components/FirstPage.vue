<template>
    <div>
        <h2>Привет!</h2>
        <statistics :day=24 :all-tasks=25 :solved-tasks=10 :accuracy=80></statistics>

        <h4>Настройки</h4>
        <Range :min-value=1 :max-value=15 measure="Длительность" measure-unit="минут" :init-value=7></Range>
        <Range :min-value=1 :max-value=10 measure="Сложность" :init-value=5></Range>
        <Checkbox title="Суммирование" :init-value=true checkbox-element-id="sumChk"></Checkbox>
        <Checkbox title="Разность" :init-value=false checkbox-element-id="diffChk"></Checkbox>
        <Checkbox title="Умножение" :init-value=false checkbox-element-id="multChk"></Checkbox>
        <Checkbox title="Деление" :init-value=true checkbox-element-id="exponChk"></Checkbox>
        <Checkbox title="Возведение в степень" :init-value=true checkbox-element-id="divideChk"></Checkbox>
        <div id="buttonDiv">
            <router-link :to="{name: 'Play'}">
                <button class="btn btn-light">Play!</button>
            </router-link>
        </div>
    </div>
</template>

<script>
    import Statistics from "./Statistics";
    import Range from "./Range";
    import Checkbox from "./Checkbox";
    export default {
        name: "FirstPage",
        components:{
            Statistics,
            Range,
            Checkbox
        }
    }
</script>

<style scoped>
    #buttonDiv {
        text-align: right;
    }
</style>