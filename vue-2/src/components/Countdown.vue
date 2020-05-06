<template>
    <div>
        <progress :value="progressPercentage" max="100"></progress>
        {{currentCountDownInMinutes()}}
    </div>
</template>

<script>
    export default {
        name: "Countdown",
        data:function () {
            return {
                initialCountDown: this.initialCountdownInSeconds,
                currentCountdown: this.initialCountdownInSeconds,
                progressPercentage: 100,
            }
        },
        methods: {
            countdownTimer() {
                if(this.currentCountdown > 0) {
                    setTimeout(() => {
                        if(this.currentCountdown >0)
                            this.currentCountdown -= 1;
                        this.countdownTimer();
                        this.progressPercentage= this.currentCountdown / (this.initialCountDown/100);
                    }, 1000)
                }else{
                    this.$emit('countdownEnded')
                }
            },
            currentCountDownInMinutes() {
                let minutesFloat = this.currentCountdown / 60;
                let seconds = this.currentCountdown % 60;
                return `${parseInt(minutesFloat)}:${this.getSecondsString(seconds)}`;
            },
            getSecondsString(seconds) {
                if(seconds <10)
                    return `0${seconds}`;
                else
                    return  seconds;
            }
        },
        created() {
            this.countdownTimer();
        },
        props: {
            initialCountdownInSeconds: Number
        }
    }
</script>

<style scoped>
     progress[value="1"] + .progress-value:before
    {
        content: "1%";
    }
</style>