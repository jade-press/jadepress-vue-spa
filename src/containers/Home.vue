
<template lang="jade">
.posts
	.loading(v-if='onloadPosts') loading...
	.no-result(v-if='!onloadPosts && !posts.length') no post
	post(v-for='post in posts', :post='post')

pager(:page='page', :path='path', :total='total')
</template>

<script>
import { posts, query, total } from '../vuex/getters'
import { fetchItems } from '../vuex/actions'
import Post from '../components/Post.vue'
import Pager from '../components/Pager.vue'
import { maxLink, pageSize } from '../glob'

export default {
	vuex: {
		getters: {
			posts, query, total
		}
		,actions: {
			fetchItems
		}
	}
	,data: () => ({ maxLink, pageSize })
	,components: {
		Post, Pager
	}
	,computed: {
		page: function() {
			return this.$route.query.page || 1
		}
		,path: function() {
			this.$store.dispatch('SET_TITLE', '')
			return this.$route.path
		}
	}
	,created() {
		this.fetchItems('posts', {})
	}
}
</script>