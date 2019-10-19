// 此文件为入口文件,读取文件从这里开始
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'

Vue.config.productionTip = false

// 绑定到 vue 的原型
// 组件是可复用的vue实例 将来通过this.$axios 发送请求
Vue.prototype.$axios = axios

// 基于VUE的插件,use以后才能使用
Vue.use(ElementUI)

// 配置全局的基准地址, 后面的axios请求路径, 会自动在前面加上基准路径
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
// 需求: 每次请求都要带上token, 利用请求拦截器
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么  config是请求相关的信息
  // console.log(config)
  // 让每次请求在真正发送前, 都带上 token
  config.headers.Authorization = localStorage.getItem('token')
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器 在响应被 .then 或者 .catch 处理之前处理
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  // console.log(response)
  // response 相当于res的数据, 将res.data赋值给了 res 将来 res就代表res.data
  response = response.data
  // 在响应拦截器中, 直接判断status是否是401, 如果是401, 说明无效的token (伪造的, 过期的)
  if (response.meta.status === 401) {
    // 修改返回的msg 的提示信息
    response.meta.msg = '尊敬的用户, 您的登陆状态已过期, 请重新登陆'
    // 删除无效的token
    localStorage.removeItem('token')
    // 拦截到登陆
    router.push('/login') // (不能用this.$router.push(this指向不对) 但是这里有router实例
  }
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
