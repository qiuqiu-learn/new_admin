// 路由文件
import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/Login.vue'
import Index from './components/index.vue'

Vue.use(Router)
//  用router实例管理路由,方便守卫调用router路由
const router = new Router({
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
export default router

router.beforeEach((to, from, next) => {
  // to: Route: 即将要进入的目标 路由对象
  // from: Route: 当前导航正要离开的路由
  // next: Function: 一定要调用该方法来 resolve 这个钩子
  // next() 进行管道中的下一个钩子 放行
  // next('/index') 当前的导航被中断，然后进行一个新的导航
  // console.log(to)
  const token = localStorage.getItem('token')
  if (to.path === '/login' || token) {
    next()
  } else {
    next('/login')
  }
})
