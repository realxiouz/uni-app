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
					<!-- <view>{{bean.desireRatio}}</view> -->
					<view>释放公池：{{bean.release_at?bean.release_at:''}}</view>
					<view>录入时间：{{bean.created_at}}</view>
				</view>
			</view>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
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
			...mapMutations('baobei', ['setSelCustomer']),
			handleGo() {
				uni.navigateTo({
					url: `/pages/channel/detail/index?cId=${this.bean.id}`
				})
			}
		}
	}
</script>

<style>
</style>
