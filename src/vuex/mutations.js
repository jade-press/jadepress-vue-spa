import { afterReady, siteName } from '../glob'
import { nextTick } from 'vue'

export default {

		SET_POSTS (state, items) {
			state.posts = items
			nextTick(afterReady)
		} 

		,SET_CATS (state, items) {
			state.cats = items
		}

		,SET_ONLOAD_POSTS (state, status) {
			state.onloadPosts = status
		}

		,SET_ONLOAD_CATS (state, status) {
			state.onloadCats = status
		}

		,SET_TOTAL (state, total) {
			state.total = total
		}

		,SET_QUERY (state, query) {
			state.query = query
		}

		,SET_TITLE (state, title) {
			document.title = title?title + ' - ' + siteName:siteName
			state.title = title
		}

		,SET_SINGLE (state, single) {
			state.isSinglePost = single
		}
		
}