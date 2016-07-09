<template lang="jade">
.post.p-y-2(:key='post._id')
	h2.post-title
		a(v-link='{ name: 'post', params: { post_id: post._id }}', :title='post.desc') {{post.title}}
	hr
	p.time
		|by 
		span.text-muted {{post.createBy.name}}
		|, at 
		span.text-muted {{post.createTime}}
		|, in 
		span((v-for='cat in post.cats')
			cat-link(:cat='cat')

	.p-y-1
	.post-content {{{post.html}}}
</template>

<script>
import CatLink from './CatLink'
export default {
  props: ['post']
}
</script>