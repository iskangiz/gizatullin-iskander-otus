<template>
  <v-container>
    <v-row>
      <v-text-field v-for="word in words"
                    v-model="word.title"
                    :key="word.id"
                    :append-icon="word.hidden ? 'mdi-eye-off' : 'mdi-eye'"
                    :append-outer-icon="'mdi-delete'"
                    @click:append="word.hidden=!word.hidden"
                    @click:append-outer="deleteClick(word.id)"/>
    </v-row>
    <v-row>
      <v-btn @click="addClick"/>
      <v-btn @click="log()"/>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
  },
  data: () => ({
    index: 0,
    words: []
  }),
  methods: {
    addClick() {
      let newWord = {id: this.index, title: "", hidden: false};
      this.words.push(newWord);
      this.index++;
    },
    deleteClick(id) {
      let index = this.words.findIndex(x => x.id === id);
      this.words.splice(index, 1);
    },
    log(){
      console.log(this.words)
    }
  }
}
</script>
