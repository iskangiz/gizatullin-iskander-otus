<template>
    <label>{{getVariableText}}
    </label>
</template>

<script>
    export default {
        name: "TaskVariable",
        props: {
            variable: Object
        },
        data: () => ({
            focused: true
        }),
        computed: {
            getVariableText: function () {
                let operation = this.variable.operation !==null ? this.variable.operation: "";
                return ` ${operation} ${this.variable.value} `
            }
        }
    }
</script>

<style scoped>
    input {
        width:50px;
        border: none;
        border-bottom: black 1px solid;
    }
</style>