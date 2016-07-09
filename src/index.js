
import Vue from 'vue'
import App from './App.vue'
import store from './store'


Vue.config.debug = true

new Vue({
  el: '#wrapper',
  store,
  render: h => h(App)
})