import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './assets/css/common.css'
import http from './assets/js/http'
import VueCookies from 'vue-cookies'

Vue.config.productionTip = false
Vue.prototype.$http = http.http
Vue.use(VueCookies)

router.beforeEach((to, from, next) => {

  const token = Vue.$cookies.get("wnwtoken");
  if (token) {
    if (to.path === '/login' || to.path === '/') {
      next("/home");
    } else {
      next();
    }
  } else {
    if (to.path !== '/login') {
      next("/login")
    }
  }
  next();
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
