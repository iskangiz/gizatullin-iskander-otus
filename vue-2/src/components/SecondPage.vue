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
                    <Countdown :initial-countdown-in-seconds=getDurationInSeconds @countdownEnded="countdownEnded" />
                </div>
            </div>
        </div>

        <div><Task /></div>

        <div class="container">
            <div class="row">
                <div class="col-sm">
                    <button type="button"
                            :disabled='getIsTaskEqualityTask'
                            @click="numberButtonClick(1)"
                            class="btn btn-warning btn-circle btn-xl">1</button>
                </div>
                <div class="col-sm">
                    <button type="button"
                            :disabled='getIsTaskEqualityTask'
                            @click="numberButtonClick(2)"
                            class="btn btn-warning btn-circle btn-xl">2</button>
                </div>
                <div class="col-sm">
                    <button type="button"
                            :disabled='getIsTaskEqualityTask'
                            @click="numberButtonClick(3)"
                            class="btn btn-warning btn-circle btn-xl">3</button>
                </div>
                <div class="col-sm">
                    <button type="button"
                            :disabled='!getIsTaskEqualityTask'
                            @click="equalityButtonClick('<')"
                            class="btn btn-secondary btn-circle btn-xl">&lt;</button>
                </div>
            </div>
            <div class="row">
                <div class="col-sm">
                    <button type="button"
                            :disabled='getIsTaskEqualityTask'
                            @click="numberButtonClick(4)"
                            class="btn btn-warning btn-circle btn-xl">4</button>
                </div>
                <div class="col-sm">
                    <button type="button"
                            :disabled='getIsTaskEqualityTask'
                            @click="numberButtonClick(5)"
                            class="btn btn-warning btn-circle btn-xl">5</button>
                </div>
                <div class="col-sm">
                    <button type="button"
                            :disabled='getIsTaskEqualityTask'
                            @click="numberButtonClick(6)"
                            class="btn btn-warning btn-circle btn-xl">6</button>
                </div>
                <div class="col-sm">
                    <button type="button"
                            :disabled='!getIsTaskEqualityTask'
                            @click="equalityButtonClick('>')"
                            class="btn btn-secondary btn-circle btn-xl">&gt;</button>
                </div>
            </div>
            <div class="row">
                <div class="col-sm">
                    <button type="button"
                            :disabled='getIsTaskEqualityTask'
                            @click="numberButtonClick(7)"
                            class="btn btn-warning btn-circle btn-xl">7</button>
                </div>
                <div class="col-sm">
                    <button type="button"
                            :disabled='getIsTaskEqualityTask'
                            @click="numberButtonClick(8)"
                            class="btn btn-warning btn-circle btn-xl">8</button>
                </div>
                <div class="col-sm">
                    <button type="button"
                            :disabled='getIsTaskEqualityTask'
                            @click="numberButtonClick(9)"
                            class="btn btn-warning btn-circle btn-xl">9</button>
                </div>
                <div class="col-sm">
                    <button type="button"
                            :disabled='!getIsTaskEqualityTask'
                            @click="equalityButtonClick('=')"
                            class="btn btn-secondary btn-circle btn-xl">=</button>
                </div>
            </div>
            <div class="row">
                <div class="col-sm">
                    <button type="button"
                            :disabled='getIsTaskEqualityTask'
                            @click="numberButtonClick('-')"
                            class="btn btn-warning btn-circle btn-xl">-</button>
                </div>
                <div class="col-sm">
                    <button type="button"
                            :disabled='getIsTaskEqualityTask'
                            @click="numberButtonClick(0)"
                            class="btn btn-warning btn-circle btn-xl">0</button>
                </div>
                <div class="col-sm">
                    <button type="button"
                            :disabled='getIsTaskEqualityTask'
                            @click="deleteButtonClick"
                            class="btn btn-warning btn-circle btn-xl">del</button>
                </div>
                <div class="col-sm">
                    <button type="button"
                            @click="submitButtonClick"
                            class="btn btn-success btn-circle btn-xl">ok</button>
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
            ...mapMutations([
                "addUserInputNumber",
                "deleteUserInputNumber",
                "setUserEqualitySign",
                "setSettings"]),
            ...mapActions([
                'setTask',
                'submitTask'
            ]),
            countdownEnded() {
                this.$router.push({ path: '/'});
            },
            numberButtonClick(number) {
                this.$store.commit('addUserInputNumber', number);
            },
            deleteButtonClick(number) {
                this.$store.commit('deleteUserInputNumber', number);
            },
            equalityButtonClick(equalitySign) {
                this.$store.commit('setUserEqualitySign', equalitySign)
            },
            submitButtonClick() {
                this.submitTask();
            }
        },
        created() {
            this.setTask();
        },
        computed: {
            ...mapGetters([
                'getDuration','getIsTaskEqualityTask'
            ]),
            getDurationInSeconds: function () {
                return this.getDuration * 60
            }
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