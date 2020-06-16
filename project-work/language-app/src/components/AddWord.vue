<template>
    <v-dialog max-width="600px" v-model="show" persistent>
        <v-card>
            <v-form ref="form">
                <v-card>
                    <v-alert v-model="saveFailure" type="error">Error while saving</v-alert>
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
        name: "AddWord",
        props: {
            categoryId: Number,
            value: Boolean
        },
        methods: {
            ...mapMutations([]),
            ...mapActions([
                'addWord'
            ]),
            saveBtn() {
                if (this.$refs.form.validate()) {
                    this.addWord({"word": this.$data.word, "categoryId": this.categoryId, "image": this.$data.image}).then(() => {
                        this.$data.saveFailure = false;
                        this.$refs.form.reset();
                        this.show = false;
                        this.$emit('wordAdded', this.categoryId);
                    }).catch((er) => {
                        console.log(er);
                        this.$data.saveFailure = true
                    });
                }
            },
            closeDialog() {
                console.log(this.$data.image)
                this.$refs.form.reset();
                this.show = false;
                this.$data.saveFailure= false;
            }
        },
        data: () => ({
            word: "",
            saveFailure: false,
            image:null,
            rules: [
                value => !value || value.size < 2000000 || 'Image size should be less than 2 MB!',
                v => !!v || 'Image is required'
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
