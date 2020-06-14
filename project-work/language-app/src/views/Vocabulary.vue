<template>

    <div>
        <h1>Vocabulary</h1>

        <VocabularyCategory v-for="category in categories" :key="category.id" :category="category" @wordAdding="openAddWordDialog($event)" ></VocabularyCategory>

        <v-dialog max-width="600px" v-model="showAddWordDialog" persistent>
            <AddWord :category-id="addWordCategoryId"></AddWord>
        </v-dialog>
    </div>

</template>

<script>
    import VocabularyCategory from "@/components/VocabularyCategory";
    import AddWord from "../components/AddWord";
    import {mapActions, mapGetters} from "vuex";

    export default {
        name: "Vocabulary",
        components: {VocabularyCategory, AddWord},
        created() {
            this.getCategories().then((x) => {
                this.$data.categories = x.data
            });
        },
        data: () => ({
            categories: [],
            showAddWordDialog: false,
            addWordCategoryId:0
        }),
        methods: {
            ...mapActions([
                'getCategories'
            ]),
            openAddWordDialog(event) {
                this.$data.addWordCategoryId = event;
                this.$data.showAddWordDialog = true
            }
        },
        computed: {
            ...mapGetters([
                'getIsAdmin'
            ])
        }
    }
</script>

<style scoped>

</style>
