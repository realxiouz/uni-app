<template>
	<view>
		<view style="height: 104upx;"></view>
		<view class="cu-bar foot padding-left-sm padding-right-sm padding-top-sm padding-bottom-sm bg-white">
			<button class="cu-btn bg-blue response" @click="handleSave">保存</button>
		</view>
	</view>
</template>

<script>
	export default {
		methods: {
			handleSave() {
				this.$emit('save')
			}
		}
	}
</script>

<style>
</style>
