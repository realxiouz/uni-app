<template>
	<view class="bg-white margin-top-sm" @click="handleGo">
			<view class="content flex align-center padding-tb-xs padding-lr-sm">
				<view class="margin-right-sm">
					<ava :name="bean.name"></ava>
				</view>
				<view class="content">
					<view>
						{{bean.name}}{{bean.belongsto_id ? `[${bean.belongsto_type}]`: ''}}
					</view>
					<view>上次跟进：{{bean.last_genjin_time?bean.last_genjin_time:''}}</view>
					<view class="flex align-center">客户星级：<rate :value="bean.star" :disabled="true" small/></view>
					<view>录入时间：{{bean.created_at}}</view>
				</view>
			</view>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	import Ava from '@/components/avatar'
	import Rate from '@/components/rate'
	
	export default {
		props: {
			bean: {
				type: Object
			}
		},
		data: _ => ({}),
		components: {
			Ava,
			Rate
		},
		methods: {
			...mapMutations('baobei', ['setSelCustomer']),
			handleGo(bean) {
				this.setSelCustomer([
					{
						name: this.bean.name,
						phone: this.bean.phone,
						id: this.bean.id
					}
				]);
				uni.navigateTo({
					url: `/pages/customer/detail/index?id=${this.bean.id}&type=${this.bean.type}`
				})
			}
		}
	}
</script>

<style>
</style>
