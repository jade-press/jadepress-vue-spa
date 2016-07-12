import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import createLogger from 'vuex/logger'
import { pageSize, maxLink } from '../glob'

Vue.use(Vuex)

export var state = {
  cats: []
  ,posts: []
  ,pageSize: pageSize
  ,total: 0
  ,maxLink: maxLink
  ,title: ''
  ,onloadCats: false
  ,onloadPosts: false
  ,query: {}
  ,querys: {}
  ,isSinglePost: false
}



var plugins = []

if(process.env.NODE_ENV !== 'production') {
  plugins = [createLogger()]
}

if (module.hot) {
  module.hot.accept(['./mutations'], () => {
    const mutations = require('./mutations').default
    store.hotUpdate({
      mutations
    })
  })
}

const store = new Vuex.Store({
  state
  ,mutations
  ,plugins
})

export default store