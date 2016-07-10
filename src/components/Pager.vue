
<template lang="jade">
nav.btn-group
	a.btn.btn-secondary(v-link='{ path: path, query: { page: page - 1 } }', v-show='page > 1') Prev
	a.btn.btn-secondary(v-link='{ path: path, query: { page: page + 1 } }', v-show='page < lastPage') Next
</template>

<script>
import { pageSize } from '../glob'
export default {
	props: ['page', 'path', 'total']
	,computed: {
		lastPage: function() {
			console.log(this.page, 'this.page')
			console.log(this.total, 'this.total')
			Math.floor(this.total / pageSize)
		}
	}
}
</script>