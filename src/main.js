/*
*入口 main.js
*/
import Vue from 'vue'
import { Button } from 'mint-ui'
import App from './App'
import router from './router/index'
import store from './store'

// 注册全局组件标签
Vue.component(Button.name, Button) // mt-button

new Vue({
  render: h => h(App),
  router, // 使用 vue-router
  store // 使用上 vuex
}).$mount('#app')
