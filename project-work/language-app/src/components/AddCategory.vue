<template>
    <v-dialog max-width="600px" v-model="show" persistent>
        <v-card>
            <v-form ref="form">
                <v-card>
                    <v-alert v-model="saveFailure" type="error">Error while saving</v-alert>
                    <v-card-title>
                        <span class="headline">Add category</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col>
                                    <v-text-field label="Category*"
                                                  required
                                                  :rules="[v => !!v || 'Category is required']"
                                                  v-model="category" />
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
        name: "AddCategory",
        props: {
            categoryId: Number,
            value: Boolean
        },
        methods: {
            ...mapMutations([]),
            ...mapActions([
                'addCategory'
            ]),
            saveBtn() {
                if (this.$refs.form.validate()) {
                    this.addCategory(this.$data.category).then((x) => {
                        this.$data.saveFailure = false;
                        this.$refs.form.reset();
                        this.show = false;
                        this.$emit('categoryAdded', x.data);
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
            category: "",
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
