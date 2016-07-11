
<template lang="jade">
.loading-bar(v-show='onload', transition='loading')
</template>

<script>
export default {
	props: ['onload']
}
</script>