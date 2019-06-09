/*
入口 main.js
*/
import Vue from 'vue'
import App from './App'
import router from './router/index'
import store from './store'

new Vue({
  render: h => h(App),
  router, // 使用 vue-router
  store // 使用上 vuex
}).$mount('#app')
