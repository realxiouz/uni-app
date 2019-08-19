<template>
	<view>
		<view class="cu-avatar lg" :class="isSquare?'radius':'round'" v-if="url">
			<img style="width: 100%;height:100%" class="round" :src="url" alt="">
		</view>
		<view class="cu-avatar lg bg-blue" :class="isSquare?'radius':'round'" v-else-if="name">
			<text class="avatar-text">{{name.substring(0,2)}}</text>
			<!-- <view class="cu-tag badge bg-pink">30%</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			name: String,
			url: String,
			isSquare: {
				type: Boolean,
				default: false
			}
		},
		
	}
</script>

<style>
</style>
