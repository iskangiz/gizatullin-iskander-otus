<template>
  <div id="app">
<!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <FirstPage></FirstPage>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import FirstPage from './components/FirstPage.vue'

export default {
  name: 'App',
  components: {
    FirstPage
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
}
</style>
