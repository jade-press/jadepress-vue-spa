
<template lang="jade">
.loading(v-if='onloadPosts') loading...
.post(v-if='!post && !onloadPosts') post not found
div(v-if='post')
	h1.post-title
		a(v-link='{ path: postPath }', :title='post.desc') {{post.title}}
	hr
	p.time
		|by 
		span.text-muted {{post.createBy.name}}
		|, at 
		span.text-muted {{post.createTime}}
		|, in 
		span(v-for='cat in post.cats')
			cat-link(:cat='cat')

	.p-y-1
	.post-content {{{post.html}}}

</template>

<script>
import CatLink from '../components/CatLink.vue'
import { createUrl, publicRoute  } from '../glob'
import { post } from '../vuex/getters'
import { fetchItems } from '../vuex/actions'

export default {
	vuex: {
		getters: {
			post: post
		}
		,actions: {
			fetchItems
		}
	}
	,computed: {
		postPath: function() {
			return createUrl(this.post, '', publicRoute.post)
		}
	}
	,components: {
		CatLink
	}
	,created() {
		this.fetchItems('posts', {
			slug: this.$route.params.slug
		})
	}
}
</script>