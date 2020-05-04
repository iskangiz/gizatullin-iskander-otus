<template>
    <div>
    <h1>hello, i am child component</h1>
    <h2>here is what parent sent: {{somethingToPassToChild}}</h2>
        <button v-on:click="changeProp"></button>
        <input type="checkbox" id="checkbox" v-model="checked">
        <label for="checkbox">{{ checked }}</label>
        <input type="text" v-model="somethingToPassToChild">
    </div>
</template>

<script>
    export default {
        name: "Child",
        data: function () {
            return {
                checked: true
            }
        },
        methods: {
            changeProp() {
                this.$emit('childClick','somethingToPassToParent')
                console.log(this.somethingToPassToChild);
            }
        },
        props: {
            somethingToPassToChild: String
        }
    }
</script>

<style scoped>

</style>