import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import axios from "axios";

Vue.config.productionTip = false

const token = localStorage.getItem('token')
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

axios.interceptors.response.use(undefined, function (err) {
  return new Promise(function () {
    if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
      store.dispatch("logout");
      router.push('home')
    }
    throw err;
  });
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
