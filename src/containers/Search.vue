
<template lang="jade">
h1 search "{{$route.query.title}}"
.p-y-2
.posts
	.loading(v-if='onloadPosts') loading...
	.no-result(v-if='!onloadPosts && !posts.length') find no posts
	post(v-for='post in posts', :post='post')
pager(:page='page', :path='path', :total='total')
</template>

<script>
import { posts, title, total } from '../vuex/getters'
import Post from '../components/Post.vue'
import { fetchItems } from '../vuex/actions'
import Pager from '../components/Pager.vue'

export default {
	vuex: {
		getters: {
			posts
			,title
			,total
		}
		,actions: {
			fetchItems
		}	
	}
	,components: {
		Post, Pager
	}
	,computed: {
		page: function() {
			return this.$route.query.page || 1
		}
		,path: function() {
			return this.$route.path
		}
	}
	,created() {
		this.fetchItems('posts', {
			title: this.$route.query.title
		})
		this.$store.dispatch('SET_TITLE', 'search ' + this.$route.query.title)
	}
}
</script>