<template>
  <div id="app">
    <FirstPage></FirstPage>
    <SecondPage></SecondPage>
  </div>
</template>

<script>
import FirstPage from './components/FirstPage.vue'
import SecondPage from "./components/SecondPage";

export default {
  name: 'App',
  components: {
      FirstPage,
      SecondPage
  }
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    color: #2c3e50;
    margin-top: 60px;
    width: 500px;
    padding-left: 100px;
}

</style>
