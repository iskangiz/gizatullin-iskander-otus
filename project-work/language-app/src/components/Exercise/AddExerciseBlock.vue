<template>
    <v-dialog max-width="600px" v-model="show" persistent>
        <v-card>
            <v-form ref="form">
                <v-card>
                    <v-alert v-model="saveFailure" type="error">Error while saving</v-alert>
                    <v-card-title>
                        <span class="headline">Add exercise block</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col>
                                    <v-text-field label="Description*"
                                                  required
                                                  :rules="[v => !!v || 'Description is required']"
                                                  v-model="description" />
                                </v-col>
                            </v-row>
                        </v-container>
                        <small>*indicates required field</small>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="closeDialog">Close</v-btn>
                        <v-btn color="blue darken-1" text @click="saveBtn">Save</v-btn>
                    </v-card-actions>
                </v-card>
            </v-form>
        </v-card>
    </v-dialog>
</template>

<script>
    import {mapActions, mapMutations} from "vuex";

    export default {
        name: "AddExerciseBlock",
        props: {
            value: Boolean
        },
        methods: {
            ...mapMutations([]),
            ...mapActions([
                'addExerciseBlock'
            ]),
            saveBtn() {
                if (this.$refs.form.validate()) {
                    this.addExerciseBlock(this.$data.description).then((x) => {
                        this.$data.saveFailure = false;
                        this.$refs.form.reset();
                        this.show = false;
                        this.$emit('exerciseBlockAdded', x.data);
                    }).catch((er) => {
                        console.log(er);
                        this.$data.saveFailure = true
                    });
                }
            },
            closeDialog() {
                this.$refs.form.reset();
                this.show = false;
                this.$data.saveFailure= false;
            }
        },
        data: () => ({
            description: "",
            saveFailure: false,
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
