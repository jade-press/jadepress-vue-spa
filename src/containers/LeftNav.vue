
<template lang="jade">
#nav.col-sm-4.col-md-4.col-lg-3
	.hidden-sm-up.clearfix.p-y-1
		a(v-link='{ path: "/" }') {{siteName}}
		button.navbar-toggler.pull-xs-right(type='button', data-toggle='collapse', data-target='#menus') &#9776;
	nav#menus.collapse
		.p-y-1
		.lists.text-sm-right
			.hidden-sm-down
				a.font-weight-bold.form-control-lg(v-link='{ path: "/" }') {{siteName}}
				hr
			form(action='', @submit.prevent='search')
				.form-group
					.input-group
						input.form-control(name='title', type='search', v-model='queryTitle')
						span.input-group-btn
							button.btn.btn-secondary(type='submit') search

			div(v-for='cat in cats')
				cat-link(:cat='cat')
			div(v-if='!logined')
				a(:href='host + "/login"') login
		.p-y-1.hidden-sm-up

</template>

<script>
import { siteName, logined, host } from '../glob'
import CatLink from '../components/CatLink.vue'
import { query } from '../vuex/getters'
import router from '../router'
import { fetchItems } from '../vuex/actions'

export default {
	props: {
		cats: Array
	}
	,data: function() {
		return { siteName, logined, host }
	}
	,components: {
		CatLink
	}
	,vuex: {
		getters: {
			query
		}
		,actions: {
			updateTitle: ({ dispatch }, value) => {
				dispatch('SET_QUERY', {
					title: value
				})
			}
			,fetchItems
		}
	}
	,methods: {
		search: function() {
			var title = this.query.title
			router.go({
				path: '/s?title=' + title
			})
			this.$store.dispatch('SET_TITLE', 'search ' + title)
			this.fetchItems('posts', {
				title: title
			})
		}
	}
	,computed: {
		queryTitle: {
			get () {
				return this.$route.query.title
			}
			,set (val) {
				this.updateTitle(val)
			}
		}
	}
}
</script>