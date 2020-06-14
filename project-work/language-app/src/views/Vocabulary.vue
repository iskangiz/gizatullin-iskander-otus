<template>

    <div>
        <h1>Vocabulary</h1>

        <VocabularyCategory v-for="category in categories" :key="category.id" :category="category" @wordAdding="openAddWordDialog($event)" @wordDeleted="onWordAdded($event)" ></VocabularyCategory>

        <AddWord v-model="showAddWordDialog" :category-id="addWordCategoryId" @wordAdded="onWordAdded($event)"></AddWord>

    </div>

</template>

<script>
    import VocabularyCategory from "@/components/VocabularyCategory";
    import AddWord from "../components/AddWord";
    import {mapActions, mapGetters} from "vuex";
    import Vue from 'vue'

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
                'getCategories',
                'getCategory'
            ]),
            openAddWordDialog(event) {
                this.$data.addWordCategoryId = event;
                this.$data.showAddWordDialog = true
            },
            onWordAdded(categoryId) {
                this.getCategory(categoryId).then((x) => {
                    let categoryIndex = this.$data.categories.findIndex(x => x.id === categoryId);
                    this.$data.categories[categoryIndex] = x.data;
                    Vue.set(this.$data.categories, categoryIndex, x.data)
                });
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
