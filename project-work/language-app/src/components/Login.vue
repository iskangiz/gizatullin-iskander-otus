<template>
    <v-dialog max-width="500px" v-model="show" persistent>
        <v-form ref="form">
            <v-card>
                <v-alert v-model="loginFailure" type="error">Error while logging</v-alert>
                <v-card-title>
                    <span class="headline">Login</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col>
                                <v-text-field label="Login*"
                                              required
                                              :rules="[v => !!v || 'Login is required']"
                                              v-model="login" />
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-text-field label="Password"
                                              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                              hint="example of helper text only on focus"
                                              :type="showPassword ? 'text' : 'password'"
                                              :rules="[v => !!v || 'Password is required']"
                                              @click:append="showPassword = !showPassword"
                                              v-model="password">
                                </v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                    <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDialog">Close</v-btn>
                    <v-btn color="blue darken-1" text @click="loginBtn">Login</v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
    </v-dialog>
</template>

<script>
    import {mapMutations, mapActions} from "vuex";
    export default {
        name: "Login",
        props: {
            value: Boolean
        },
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
                this.$refs.form.reset();
                this.show = false;
                this.$data.loginFailure= false;
            }
        },
        data: () => ({
            login: "",
            password: "",
            showPassword: false,
            loginFailure: false
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
