<template>
    <div>
        <div class="spinner-border text-primary" role="status" v-if="getIsSettingsLoading">
            <span class="sr-only">Loading...</span>
        </div>
        <div v-else>
            <h2>Привет!</h2>
            <statistics :day=24 :all-tasks=25 :solved-tasks=10 :accuracy=80 />

            <h4>Настройки</h4>
            <Range  :min-value=1
                    :max-value=15
                    measure="Длительность"
                    measure-unit="минут"
                    :init-value=7
                    @rangeValueChanged="onInputValueChanged($event,'setDuration')"/>
            <Range  :min-value=1
                    :max-value=10
                    measure="Сложность"
                    :init-value=5
                    @rangeValueChanged="onInputValueChanged($event,'setComplexity')"/>
            <Checkbox title="Суммирование"
                      :init-value=getIsSumEnabled
                      checkbox-element-id="sumChk"
                      @checkboxValueChanged="onInputValueChanged($event,'setIsSumEnabled')"/>
            <Checkbox title="Разность"
                      :init-value=getIsDiffEnabled
                      checkbox-element-id="diffChk"
                      @checkboxValueChanged="onInputValueChanged($event,'setIsDiffEnabled')"/>
            <Checkbox title="Умножение"
                      :init-value=getIsMultEnabled
                      checkbox-element-id="multChk"
                      @checkboxValueChanged="onInputValueChanged($event,'setIsMultEnabled')"/>
            <Checkbox title="Деление"
                      :init-value=getIsDivEnabled
                      checkbox-element-id="exponChk"
                      @checkboxValueChanged="onInputValueChanged($event,'setIsDivEnabled')" />
            <Checkbox title="Возведение в степень"
                      :init-value=getIsExpEnabled
                      checkbox-element-id="divideChk"
                      @checkboxValueChanged="onInputValueChanged($event,'setIsExpEnabled')" />
            <div id="buttonDiv">
                <router-link :to="{name: 'Play'}">
                    <button class="btn btn-light">Play!</button>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import Statistics from "./Statistics";
    import Range from "./Range";
    import Checkbox from "./Checkbox";
    import {mapGetters, mapMutations, mapActions} from "vuex";
    export default {
        name: "FirstPage",
        components:{
            Statistics,
            Range,
            Checkbox
        },
        created() {
            this.loadSettings();
        },
        methods: {
            ...mapActions([
                 'loadSettings'
            ]),
            ...mapMutations([
                'setIsSumEnabled',
                'setIsDiffEnabled',
                'setIsMultEnabled',
                'setIsDivEnabled',
                'setIsExpEnabled',
                'setDuration',
                'setComplexity',
                'setIsSettingsLoading'
            ]),
            onInputValueChanged (checked,mutationName) {
                this.$store.commit(mutationName,checked);
            }
        },
        computed: {
            ...mapGetters([
                'getIsSumEnabled',
                'getIsDiffEnabled',
                'getIsMultEnabled',
                'getIsDivEnabled',
                'getIsExpEnabled',
                'getDuration',
                'getComplexity',
                'getIsSettingsLoading'
            ])
        }
    }
</script>

<style scoped>
    #buttonDiv {
        text-align: right;
    }
</style>