<template>
    <v-container>
        <v-row>
            <v-col cols="2">
                <v-card max-width="300px" v-if="this.getIsAdmin">
                    <v-container align="middle">
                        <v-row align="center">
                            <v-btn v-for="(user, index) in connectedUsers" :key="index" @click="connectClick(user)">connect to {{user}}</v-btn>&nbsp;
                        </v-row>

                    </v-container>

                </v-card>

                <v-card max-width="300px">
                    <v-container>
                        <v-row>
                            <h1>Chat</h1>
                            <div id="inputForm">
                                <input type="text" id="message" />
                                <input type="button" id="sendBtn" value="Отправить" @click="sndClick">
                            </div>

                        </v-row>
                        <v-row>
                            <div id="chatroom"></div>
                        </v-row>
                    </v-container>
                </v-card>
            </v-col>
            <v-col>
                <ExerciseBlockTraining :block-id="this.$route.query.blockId"/>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import ExerciseBlockTraining from "../components/Exercise/ExerciseBlockTraining";
    import {mapGetters} from "vuex";
    import * as signalR from '@microsoft/signalr';

    export default {
        name: 'ExerciseTrainingView',
        components: {ExerciseBlockTraining},
        props: {
            msg: String
        },
        created() {
            this.hubConnection = new signalR.HubConnectionBuilder()
            // const thisVue = this;
            // this.hubConnection = new signalR.HubConnectionBuilder()
            //     .withUrl(`${process.env.VUE_APP_NOT_SECRET_CODE}/chat`, { accessTokenFactory: () => this.getToken})
            //     .build();
            // this.hubConnection.onclose((x)=>x.start());
            //
            // this.hubConnection.on("Send2", function (data) {
            //     let elem = document.createElement("p");
            //     elem.appendChild(document.createTextNode(data));
            //     let firstElem = document.getElementById("chatroom").firstChild;
            //     document.getElementById("chatroom").insertBefore(elem, firstElem);
            // });
            //
            // this.hubConnection.on("SomeoneConnected", function (data) {
            //     alert('Someone!'+data)
            // });
            //
            // if(this.getIsAdmin) {
            //     this.hubConnection.on("ListOfUsers", function (data) {
            //         thisVue.$data.connectedUsers = data;
            //     });
            // }
            //
            // this.hubConnection.start();
        },
        destroyed() {
            //this.hubConnection.stop();
        },
        methods: {
            sndClick() {
                let message = document.getElementById("message").value;
                this.hubConnection.invoke("Send", message);
            },
            connectClick(user) {
                this.hubConnection.invoke("ConnectToUser", user);
            }
        },
        computed: {
            ...mapGetters([
                'getToken',
                'getIsAdmin'
            ])
        },
        data: () => ({
            hubConnection: {},
            connectedUsers: []
        })
    }
</script>

<style scoped>

</style>
