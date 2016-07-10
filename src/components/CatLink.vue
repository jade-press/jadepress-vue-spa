
<template lang="jade">
a(v-link='{ path: catPath }', :key='cat._id', :title='cat.desc') {{cat.name}}
</template>

<script>
import { createUrl, host, publicRoute  } from '../glob'
export default {
	props: ['cat']
	,computed: {
		catPath: function() {
			return createUrl(this.cat, '', publicRoute.cat)
		}
	}
}
</script>