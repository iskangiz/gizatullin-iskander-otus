<template>

    <div>
        <h1>Vocabulary</h1>

        <VocabularyCategory v-for="category in categories" :key="category.id" :category="category" @wordAdding="openAddWordDialog($event)" @wordDeleted="onWordAdded($event)" @categoryDeleted="onCategoryDeleted($event)"/>

        <template v-if="getIsAdmin">
            <AddWord v-model="showAddWordDialog" :category-id="addWordCategoryId" @wordAdded="onWordAdded($event)"/>
            <AddCategory v-model="showAddCategoryDialog" @categoryAdded="onCategoryAdded($event)"/>
            <v-col align="center">
                <v-btn x-large color="primary" @click="openAddCategoryDialog">Add category</v-btn>
            </v-col>
        </template>
    </div>

</template>

<script>
    import VocabularyCategory from "@/components/VocabularyCategory";
    import AddWord from "../components/AddWord";
    import {mapActions, mapGetters} from "vuex";
    import Vue from 'vue'
    import AddCategory from "../components/AddCategory";

    export default {
        name: "Vocabulary",
        components: {AddCategory, VocabularyCategory, AddWord},
        created() {
            this.getCategories().then((x) => {
                this.$data.categories = x.data
            });
        },
        data: () => ({
            categories: [],
            showAddWordDialog: false,
            addWordCategoryId: 0,
            showAddCategoryDialog: false
        }),
        methods: {
            ...mapActions([
                'getCategories',
                'getCategory',
                'deleteCategory'
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
            },
            onCategoryAdded(categoryId) {
                this.getCategory(categoryId).then((x) => {
                    this.$data.categories.push(x.data);
                });
            },
            onCategoryDeleted(categoryId) {
                this.deleteCategory(categoryId).then(() => {
                    let categoryIndex = this.$data.categories.findIndex(x => x.id === categoryId);
                    this.$data.categories.splice(categoryIndex, 1);
                });
            },
            openAddCategoryDialog() {
                this.$data.showAddCategoryDialog = true
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
