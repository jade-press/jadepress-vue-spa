import VueRouter from 'vue-router'
import Vue from 'vue'
import { publicRoute } from './glob'
import Home from './containers/Home.vue'
import Cat from './containers/Cat.vue'
import PostSingle from './containers/PostSingle.vue'
import Search from './containers/Search.vue'


Vue.component('cat', Cat)
Vue.component('post-single', PostSingle)
Vue.component('search', Search)
Vue.component('home', Home)

Vue.use(VueRouter)
var router = new VueRouter({
  history: true
})

router.map({
    [publicRoute.home]: {
      component: Home
    }
    ,[publicRoute.cat]: {
      component: Cat
    }
    ,[publicRoute.post]: {
      component: PostSingle
    }
    ,'/s': {
      component: Search
    }
})

export default router