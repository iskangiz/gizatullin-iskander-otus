<template>
    <v-card>
        <v-form ref="form">
            <v-card>
                <v-alert v-model="loginFailure" type="error">Error while logging</v-alert>
                <v-card-title>
                    <span class="headline">Add word</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col>
                                <v-text-field label="Word*"
                                              required
                                              :rules="[v => !!v || 'Word is required']"
                                              v-model="word" />
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-file-input
                                        v-model="image"
                                        :rules="rules"
                                        accept="image/png, image/jpeg, image/bmp"
                                        placeholder="Pick an image"
                                        prepend-icon="mdi-camera"
                                        label="Image" />
                            </v-col>
                        </v-row>
                    </v-container>
                    <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDialog">Close</v-btn>
                    <v-btn color="blue darken-1" text @click="loginBtn">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
    </v-card>
</template>

<script>
    import {mapActions, mapMutations} from "vuex";

    export default {
        name: "AddWord",
        props: {
            categoryId: Number
        } ,
        methods: {
            ...mapMutations([]),
            ...mapActions([
                'loginRequest'
            ]),
            loginBtn() {
                if (this.$refs.form.validate()) {
                    this.loginRequest({"login": this.$data.login, "password": this.$data.password}).then(() => {
                        this.$data.loginFailure = false;
                        this.$refs.form.reset();
                        this.show = false;
                    }).catch((er) => {
                        console.log(er);
                        this.$data.loginFailure = true
                    });
                }
            },
            closeDialog() {
                console.log(this.$data.image)
                this.$refs.form.reset();
                this.show = false;
                this.$data.loginFailure= false;
            }
        },
        data: () => ({
            login: "",
            password: "",
            loginFailure: false,
            image:null,
            rules: [
                value => !value || value.size < 2000000 || 'Image size should be less than 2 MB!',
            ],
        }),
        computed: {
            show: {
                get () {
                    return this.value
                },
                set (value) {
                    this.$emit('input', value)
                }
            }
        }
    }
</script>

<style scoped>

</style>
