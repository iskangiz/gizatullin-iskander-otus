<template>
    <div class="custom-control custom-checkbox">
        <input type="checkbox" v-bind:id=checkboxElementId class="custom-control-input" v-model=value >
        <label class="custom-control-label" :for=checkboxElementId>{{title}}</label>
    </div>
</template>

<script>
    export default {
        name: "Checkbox",
        props: {
            title: String,
            initValue: Boolean,
            checkboxElementId: String
        },
        data: function () {
            return {
                value: this.initValue
            }
        }
    }
</script>

<style scoped>
</style>