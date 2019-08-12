<template>
	<navigator class="bg-white margin-bottom-sm" :url="`/pages/customer/need/index?id=${bean.id}`">
			<view class="padding-tb-xs padding-lr-sm">
				<!-- <view class="margin-right-sm">
					<ava :name="bean.name"></ava>
				</view>
				<view class="content">
					<view>
						{{bean.name}}{{bean.belongsto_id ? `[${bean.belongsto_type}]`: ''}}
					</view>
					<view>{{bean.last_genjin_time | moment('from')}}</view>
					<view>{{bean.desireRatio}}</view>
					<view>客户星级：{{bean.star}}</view>
					<view>录入时间：{{bean.created_at}}</view>
				</view> -->
				
				<view>{{bean.type}}</view>
			</view>
	</navigator>
</template>

<script>
	import Ava from '@/components/avatar.vue'
	export default {
		props: {
			bean: {
				type: Object
			}
		},
		components: {
			Ava
		}
	}
</script>

<style>
</style>
