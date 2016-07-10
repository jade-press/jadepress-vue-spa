
<template lang="jade">
#content.container
	.row
		left-nav(:cats='cats', :search='search', :query='query')
		.main.col-sm-8.col-md-8.col-lg-9.p-y-2.p-x-3
			router-view
			footer
				hr
				p
					|&copy; 2016 
					a(href='https://github.com/jade-press/jadepress-vue-spa', target='_blank') jadepress-vue-spa
					|  powered by 
					a(href='http://jade-press.org', target='_blank') jade-press.org
</template>

<script>
import Home from './containers/Home.vue'
import Cat from './containers/Cat.vue'
import PostSingle from './containers/PostSingle.vue'
import Search from './containers/Search.vue'
import LeftNav from './containers/LeftNav.vue'
import store from './vuex/store'
import { cats, query } from './vuex/getters'
import { fetchItems } from './vuex/actions'
import { afterCreated } from './glob'

export default {
	store
	,vuex: {
		actions: {
			fetchItems
		}
	}
	,created() {
		this.fetchItems('cats', {})
	}
	,ready() {
		afterCreated()
	}
	,components: {
		Home
		,Cat
		,PostSingle
		,Search
		,LeftNav
	}
}
</script>