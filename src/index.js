
import Vue from 'vue'
import App from './App.vue'
import store from './vuex/store'
import VueRouter from 'vue-router'
import { sync } from 'vuex-router-sync'

import router from './router'

Vue.config.debug = true

sync(store, router)

router.start(App, '#app')
