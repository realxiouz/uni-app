<template>
	<navigator class="bg-white margin-top-sm" :url="`/pages/customer/detail/index?id=${bean.id}&type=${bean.type}`">
			<view class="content flex align-center padding-tb-xs padding-lr-sm">
				<view class="margin-right-sm">
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
					<view>
						<view @click.stop="editCustomer(bean)">编辑</view>
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
			}
		},
		data: _ => ({}),
		components: {
			Ava
		},
		methods: {
			editCustomer(bean) {
				uni.navigateTo({
					url: `/pages/customer/bean/index?id=${bean.id}&type=${bean.type}`
				})
			}
		}
	}
</script>

<style>
</style>
