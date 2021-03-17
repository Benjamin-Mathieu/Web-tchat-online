import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

window.api = axios.create({
  baseURL: "https://allweb.fun/coop/api",
  headers: { Authorization: "61745e9246220c11e174d36c7115ff8a5e102bd8" }
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
