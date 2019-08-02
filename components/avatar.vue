<template>
	<view>
		<view class="cu-avatar round lg" v-if="url">
			<img style="width: 100%;height:100%" class="round" :src="url" alt="">
		</view>
		<view class="cu-avatar round lg bg-blue" v-else-if="name">
			<text class="avatar-text">{{name.substring(0,2)}}</text>
			<view class="cu-tag badge bg-pink">30%</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			name: String,
			url: String
		},
		
	}
</script>

<style>
</style>
