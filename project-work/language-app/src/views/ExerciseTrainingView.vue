<template>
    <v-container>
        <v-row>
            <v-col cols="2">

                <v-card>
                    <Chat :hub-connection="this.hubConnection" :with-whom-chat="this.withWhomChat"/>
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
    import Chat from  "../components/Chat"
    import {mapGetters} from "vuex";
    import * as signalR from '@microsoft/signalr';

    export default {
        name: 'ExerciseTrainingView',
        components: {Chat, ExerciseBlockTraining},
        created() {
            const thisVue = this;
            this.hubConnection = new signalR.HubConnectionBuilder()
                .withUrl(`${process.env.VUE_APP_NOT_SECRET_CODE}/chat`, { accessTokenFactory: () => this.getToken})
                .build();
            this.hubConnection.serverTimeoutInMilliseconds = 200000;
            this.hubConnection.onclose((x)=>x.start());

            this.hubConnection.on("SomeoneConnected", function (data) {
                thisVue.withWhomChat = data;
                let blockId = parseInt(thisVue.$route.query.blockId);
                thisVue.hubConnection.invoke("SendBlockId", data, blockId);
            });

            if(this.getIsAdmin) {
                this.hubConnection.on("ListOfUsers", function (data) {
                    thisVue.$data.connectedUsers = data;
                });
            }

            this.hubConnection.start();
        },
        destroyed() {
            this.hubConnection.stop();
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
            connectedUsers: [],
            withWhomChat: null
        })
    }
</script>

<style scoped>

</style>
