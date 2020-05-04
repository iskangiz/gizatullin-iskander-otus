<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener">babel</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener">eslint</a></li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li><a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a></li>
      <li><a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a></li>
    </ul>
    <h3>Ecosystem</h3>
    <ul>
      <li><a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a></li>
      <li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a></li>
      <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener">vue-devtools</a></li>
      <li><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a></li>
    </ul>
    <input type="range" />
    <Child @childClick="onChildClick" something-to-pass-to-child="fock you"></Child>
  </div>
</template>

<script>
import Child from './Child.vue'
export default {
  name: 'HelloWorld',
  components: {
    Child
  },
  methods: {
    onChildClick(value) {
      console.log(`here is what child sent ${value}`)
    }
  },
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 23px;
  height: 24px;
  border: 0;
  background: url('../assets/logo.png');
  cursor: pointer;
  /*  border-radius: 25px;*/
  /*  border: 0px solid #000101;*/
}


/*input[type=range]::-webkit-slider-runnable-track {*/
/*  width: 100%;*/
/*  /height: 12.8px;*/
/*  cursor: pointer;*/
/*  animate: 0.2s;*/
/*  box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;*/
/*  background: #ac5125;*/
/*  border-radius: 25px;*/
/*  border: 0px solid #000101;*/
/*}*/
/*!*Chrome*!*/
/*@media screen and (-webkit-min-device-pixel-ratio:0) {*/
/*  input[type='range'] {*/
/*    overflow: hidden;*/
/*    width: 1180px;*/
/*    -webkit-appearance: none;*/
/*    background-color: #9a905d;*/
/*  }*/

/*  input[type='range']::-webkit-slider-runnable-track {*/
/*    height: 50px;*/
/*    -webkit-appearance: none;*/
/*    color: #13bba4;*/
/*    margin-top: -1px;*/
/*  }*/

/*  input[type='range']::-webkit-slider-thumb {*/
/*    width: 10px;*/
/*    -webkit-appearance: none;*/
/*    height: 80px;*/
/*    cursor: ew-resize;*/
/*    box-shadow: -80px 0 0 80px #43e5f7;*/
/*    background: #434343 url('../assets/logo.png');*/
/*  }*/

/*}*/
/*!** FF*!*/
/*input[type="range"]::-moz-range-progress {*/
/*  background-color: #43e5f7;*/
/*}*/
/*input[type="range"]::-moz-range-track {*/
/*  background-color: #9a905d;*/
/*}*/
/*!* IE*!*/
/*input[type="range"]::-ms-fill-lower {*/
/*  background-color: #43e5f7;*/
/*}*/
/*input[type="range"]::-ms-fill-upper {*/
/*  background-color: #9a905d;*/
/*}*/
</style>
