// 路由文件
import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/Login.vue'
import Index from './components/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'index',
      component: Index
    },
    {
      path: '/login',
      component: Login
    }

  ]
})
