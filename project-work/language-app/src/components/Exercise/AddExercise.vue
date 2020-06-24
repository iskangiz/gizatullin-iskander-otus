<template>
    <v-dialog max-width="1200px" v-model="show" persistent>
        <v-card>
            <v-form ref="form">
                <v-card>
                    <v-alert v-model="saveFailure" type="error">Error while saving</v-alert>
                    <v-card-title>
                        <span class="headline">Add exercise</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-text-field v-for="word in words"
                                              v-model="word.content"
                                              :key="word.id"
                                              :append-icon="word.hidden ? 'mdi-eye-off' : 'mdi-eye'"
                                              :append-outer-icon="'mdi-delete'"
                                              @click:append="word.hidden=!word.hidden"
                                              @click:append-outer="deleteClick(word.id)"/>
                            </v-row>
                            <v-row>
                                <v-btn @click="addClick" icon>
                                    <v-icon>mdi-plus</v-icon>
                                </v-btn>
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
        name: "AddExercise",
        props: {
            blockId: Number,
            value: Boolean
        },
        methods: {
            ...mapMutations([]),
            ...mapActions([
                'addExercise'
            ]),
            addClick() {
                let newWord = {id: this.index, title: "", hidden: false};
                this.words.push(newWord);
                this.index++;
            },
            deleteClick(id) {
                let index = this.words.findIndex(x => x.id === id);
                this.words.splice(index, 1);
            },
            saveBtn() {
                if (this.$refs.form.validate()) {
                    this.addExercise({"exerciseBlockId": this.blockId, "words": this.words}).then(() => {
                        this.$data.saveFailure = false;
                        this.$refs.form.reset();
                        this.words = [];
                        this.show = false;
                        this.$emit('exerciseAdded', this.blockId);
                    }).catch((er) => {
                        console.log(er);
                        this.$data.saveFailure = true
                    });
                }
            },
            closeDialog() {
                this.$refs.form.reset();
                this.words = [];
                this.show = false;
                this.$data.saveFailure = false;
            }
        },
        data: () => ({
            words:[],
            index:0,
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
