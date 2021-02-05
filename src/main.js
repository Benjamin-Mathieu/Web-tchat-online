import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

window.api = axios.create({
  baseURL: "https://tools.sopress.net/iut/coop/api/",
  headers: { Authorization: "f0405cfc6dd77a18a4427ac603e855c0ed152b96" }
});

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue();

new Vue({
  router,
  store,
  beforeCreate() {
    window.api.interceptors.request.use(config => {
      if (this.$store.state.token) {
        config.url +='?token='+this.$store.state.token
      }
      return config;
    })
  },
  render: h => h(App)
}).$mount('#app')
