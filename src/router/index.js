import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    meta: {
      authRequired: true,
    },
    component: () => import('../components/Login.vue')
  },
  {
    path: '/home',
    name: 'home',
    meta: {
      authRequired: true,
    },
    component: () => import('../components/home.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
