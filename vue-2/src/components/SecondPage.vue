<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-sm" style="text-align: left">
                    <router-link :to="{name: 'Settings'}">
                        <button type="button" class="btn btn-light"><img src="../assets/cross.png">Отмена</button>
                    </router-link>
                </div>
                <div class="col-sm" style="text-align: right">
                    <Countdown :initial-countdown-in-seconds="10" @countdownEnded="countdownEnded"></Countdown>
                </div>
            </div>
        </div>

        <div><Task :variables="variablesToShow" result="84240"></Task></div>

        <div class="container">
            <div class="row">
                <div class="col-sm">
                    <button type="button" v-on:click="buttonCl" class="btn btn-warning btn-circle btn-xl">1</button>
                </div>
                <div class="col-sm">
                    <button type="button" class="btn btn-warning btn-circle btn-xl">2</button>
                </div>
                <div class="col-sm">
                    <button type="button" class="btn btn-warning btn-circle btn-xl">3</button>
                </div>
                <div class="col-sm">
                    <button type="button" class="btn btn-secondary btn-circle btn-xl">&lt;</button>
                </div>
            </div>
            <div class="row">
                <div class="col-sm">
                    <button type="button" class="btn btn-warning btn-circle btn-xl">5</button>
                </div>
                <div class="col-sm">
                    <button type="button" class="btn btn-warning btn-circle btn-xl">6</button>
                </div>
                <div class="col-sm">
                    <button type="button" class="btn btn-warning btn-circle btn-xl">7</button>
                </div>
                <div class="col-sm">
                    <button type="button" class="btn btn-secondary btn-circle btn-xl">&gt;</button>
                </div>
            </div>
            <div class="row">
                <div class="col-sm">
                    <button type="button" class="btn btn-warning btn-circle btn-xl">5</button>
                </div>
                <div class="col-sm">
                    <button type="button" class="btn btn-warning btn-circle btn-xl">6</button>
                </div>
                <div class="col-sm">
                    <button type="button" class="btn btn-warning btn-circle btn-xl">7</button>
                </div>
                <div class="col-sm">
                    <button type="button" class="btn btn-secondary btn-circle btn-xl">?</button>
                </div>
            </div>
            <div class="row">
                <div class="col-sm">
                </div>
                <div class="col-sm">
                    <button type="button" class="btn btn-warning btn-circle btn-xl">0</button>
                </div>
                <div class="col-sm">
                </div>
                <div class="col-sm">
                    <button type="button" class="btn btn-secondary btn-circle btn-xl">=</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Countdown from "./Countdown";
    import Task from "./Task";
    import {mapMutations, mapActions, mapGetters} from "vuex";
    export default {
        name: "SecondPage",
        components: {
            Countdown,
            Task
        },
        methods: {
            ...mapMutations(["setVariables","setCurrentVariable","setCurrentVariableValue"]),
            ...mapActions([
                'setTask'
            ]),
            countdownEnded() {
                //alert('countdownEnded!');
            },
            buttonCl(){
                this.$store.commit('setCurrentVariableValue',1);
            }
        },
        created() {
            let settings = this.getAllSettings;
            this.setTask(settings);
            // let variablesToShow=  [
            //     {number: 13, operation: "multiple", isHidden: false},
            //     {number: 2, operation: "multiple", isHidden: true},
            //     {number: 3240, operation: null, isHidden: true}
            // ];
            // this.$store.commit('setVariables', variablesToShow);
            // this.$store.commit('setCurrentVariable', variablesToShow[1]);
        },
        computed: {
            ...mapGetters([
                'getAllSettings'
            ])
        }
    }
</script>

<style scoped>
    .btn-circle.btn-xl {
        width: 60px;
        height: 60px;
        padding: 10px 16px;
        border-radius: 35px;
        font-size: 24px;
        line-height: 1.33;
    }

    .btn-circle {
        width: 30px;
        height: 30px;
        padding: 6px 0px;
        border-radius: 15px;
        text-align: center;
        font-size: 12px;
        line-height: 1.42857;
    }
    .btn:focus {
        outline: none;
        box-shadow: none;
    }
    .col-sm {
        padding-top: 15px;
        padding-bottom: 15px;
    }
</style>