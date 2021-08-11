import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/Login.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../components/home.vue'),
    redirect: "/homeTap",
    children: [
      {
        path: '/homeTap',
        components: {
          homeDashboard: () => import('../views/home/homeDashboard.vue'), // 首页工作台
          permissionRoles: () => import('../views/permission/permissionRoles.vue'), // 角色管理
          permissionManager: () => import('../views/permission/permissionManager.vue'), // 用户添加
          permissionMenusAdmin: () => import('../views/permission/permissionMenusAdmin.vue') // 菜单管理
        }
      }
    ]
    
  }
]

const router = new VueRouter({
  routes
})

export default router
