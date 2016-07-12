import Vue from 'vue'
import App from './App.vue'
import store from './vuex/store'
import VueRouter from 'vue-router'
import { sync } from 'vuex-router-sync'

import router from './router'

if(process.env.NODE_ENV !== 'production') {
  Vue.config.debug = true
}

sync(store, router)

router.start(App, '#app')
