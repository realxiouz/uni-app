<template>
	<view>
		<image :src="src"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: ''
			}
		},
		onLoad(opt) {
			this.src = opt;
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
