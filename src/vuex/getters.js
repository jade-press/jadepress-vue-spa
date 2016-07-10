
import { state } from './store'

Object.keys(state).forEach(function(prop) {
	exports[prop] = state => state[prop]
})

exports.post = state => state.posts.length?state.posts[0]:null
