<template>
    <label>
        <input type="text" v-if="variable.isHidden">
        <label v-if="!variable.isHidden">{{variable.number}}</label>
        <label>{{getOperationString(variable.operation)}}</label>
    </label>
</template>

<script>
    export default {
        name: "TaskVariable",
        props: {
            // number: Number,
            // nextOperation: String,
            // isHidden: Boolean
            variable: Object
        },
        methods: {
            getOperationString (operation) {
                switch (operation) {
                    case "add":
                        return "+";
                    case "diff":
                        return "-";
                    case "multiple":
                        return "*";
                    case "divide":
                        return "/";
                }

                return  "";
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