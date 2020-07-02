<template>
    <v-container>
        <h3>Chat</h3>
        <h3 v-if="this.withWhomChat !== null">{{this.withWhomChat}}</h3>
        <v-row v-for="(message, index) in messages" :key="index">
            <v-col v-if="message.own" align="right">{{message.text}}</v-col>
            <v-col v-if="!message.own" align="left">{{message.text}}</v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row v-if="this.withWhomChat !== null">
            <div id="inputForm">
                <input type="text" id="message" v-model="newMessage" />
                <input type="button" id="sendBtn" value="Отправить" @click="sndClick">
            </div>

        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: "Chat",
        props: {
            hubConnection: Object,
            withWhomChat: String
        },
        created() {
            const thisVue = this;
            this.hubConnection.on("Send", function (data) {
                thisVue.messages.push({text:data, own: false});
            });
        },
        data: () => ({
            messages: [],
            newMessage: ''
        }),
        methods: {
            sndClick () {
                this.hubConnection.invoke("Send", this.newMessage, this.withWhomChat).then(() => {
                    this.messages.push({text:this.newMessage, own: true});
                    this.newMessage = '';
                });
            }
        }
    }
</script>

<style scoped>

</style>
