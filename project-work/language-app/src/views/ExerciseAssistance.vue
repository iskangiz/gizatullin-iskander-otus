<template>
    <v-container>
        <v-row>
            <v-col cols="2">
                <v-card max-width="300px">
                    <v-container align="middle">
                        <v-row align="center">
                            <v-btn v-for="(user, index) in connectedUsers" :key="index" @click="connectClick(user)">connect to {{user}}</v-btn>&nbsp;
                        </v-row>
                    </v-container>

                </v-card>
                <v-card>
                    <Chat :hub-connection="this.hubConnection" :with-whom-chat="this.withWhomChat"/>
                </v-card>
            </v-col>
            <v-col>
                <ExerciseBlockTraining :block-id="this.blockId"/>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import Chat from "../components/Chat";
    import ExerciseBlockTraining from "../components/Exercise/ExerciseBlockTraining";
    import * as signalR from "@microsoft/signalr";
    import {mapGetters} from "vuex";

    export default {
        name: "ExerciseAssistance",
        components: {Chat, ExerciseBlockTraining},
        created() {
            const thisVue = this;
            this.hubConnection = new signalR.HubConnectionBuilder()
                .withUrl(`${process.env.VUE_APP_NOT_SECRET_CODE}/chat`, { accessTokenFactory: () => this.getToken})
                .build();
            this.hubConnection.serverTimeoutInMilliseconds = 200000;
            this.hubConnection.onclose((x)=>x.start());

            if(this.getIsAdmin) {
                this.hubConnection.on("ListOfUsers", function (data) {
                    thisVue.$data.connectedUsers = data;
                });

                this.hubConnection.on("ReceiveBlockId", function (data) {
                    thisVue.blockId = data;
                });
            }

            this.hubConnection.start();
        },
        data: () => ({
            hubConnection: {},
            connectedUsers: [],
            withWhomChat: null,
            blockId: undefined
        }),
        computed: {
            ...mapGetters([
                'getToken',
                'getIsAdmin'
            ])
        },
        methods: {
            connectClick(user) {
                this.hubConnection.invoke("ConnectToUser", user).then(()=>{
                    this.withWhomChat = user;
                });

            }
        }
    }
</script>

<style scoped>

</style>
