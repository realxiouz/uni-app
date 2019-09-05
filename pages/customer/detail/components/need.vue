<template>
	<view class="bg-white margin-top-sm" style="height: 200upx;">
			<view class="padding-tb-xs padding-lr-sm">
				{{bean.type}}
			</view>
	</view>
</template>

<script>
	import Ava from '@/components/avatar'
	export default {
		
		props: {
			bean: {
				type: Object
			}
		},
		data: _ => ({
		}),
		components: {
			Ava
		},
		methods: {
		}
	}
</script>

<style>
</style>
