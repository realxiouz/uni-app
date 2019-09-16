<template>
	<navigator class="bg-white margin-top-sm" :url="`/pages/baobei/detail/index?id=${bean.id}&type=${type}`">
			<view class="content flex align-center padding-tb-xs padding-lr-sm">
				<ava :name="bean.customer_name" class="margin-right-sm"></ava>
				<view class="flex-sub flex">
					<view class="flex-sub flex flex-direction justify-between">
						<view>{{bean.customer_name}}</view>
						<view>{{bean.baobei_project.project.name}}</view>
					</view>
					<view class="flex-sub flex flex-direction justify-between">
						<view>{{bean.customer_phone_display}}</view>
						<view>{{bean.status_name}}</view>
					</view>
				</view>
			</view>
	</navigator>
</template>

<script>
	import Ava from '@/components/avatar.vue'
	export default {
		props: {
			bean: {
				type: Object
			},
			type: {
				type: String
			}
		},
		components: {
			Ava
		},
		methods: {
		}
	}
</script>

<style>
</style>
