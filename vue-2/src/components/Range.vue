<template>
    <div>
        <input type="range" class="custom-range range-field" :min=minValue :max=maxValue v-model=value @change="onValueChanged">
        <p>{{measure}} {{value}} {{measureUnit}} </p>
    </div>
</template>

<script>
    export default {
        name: "Range",
        props: {
            minValue: Number,
            maxValue: Number,
            initValue: Number,
            measure: String,
            measureUnit: String
        },
        data: function () {
            return {
                value: this.initValue
            }
        },
        methods : {
            onValueChanged(e) {
                this.$emit('rangeValueChanged', e.target.value)
            }
        }
    }
</script>

<style scoped>
    input[type=range] {
        width: 300px
    }
</style>