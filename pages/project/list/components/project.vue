<template>
	<view class="bg-white padding solid-bottom" @tap="toDetail(bean.id)">
		<view class="flex">
			<view style="position:relative;width:280upx;height:210upx;" class="margin-right-sm">
				<image :src="bean.img" mode="" style="width: 100%;height: 100%;"></image>
				<view class="cu-tag bg-blue radius" style="position:absolute;right:0;top:0;">{{bean.status_name}}</view>
			</view>
			<view class="flex flex-direction justify-between flex-sub">
				<view>
					<view class="margin-bottom-xs">
						<text class="text-bold text-black text-lg margin-right-xs">{{bean.name}}</text>
						<text class="text-red">{{bean.city.name}}</text>
					</view>
					<view>
						<view>
							<text class="text-gray">报备渠道：</text>
							<text>{{bean.baobei_project_infos.join('、')}}</text>
						</view>
					</view>
				</view>
				<view class="text-red">
					<text class="text-xxl text-bold">{{bean.avg_price}}</text>
					<text>元/㎡</text>
				</view>
			</view>
		</view>
		<view class="margin-top-sm flex justify-between">
			<view class="w23 text-center bg-cyan radius padding-tb-xs padding-lr-xs text-cut">{{bean.fee_view}}</view>
			<view
				class="w23 text-center radius padding-tb-xs padding-lr-xs text-white"
				:class="bean.baobei_project.filter(i => i.sell_prize).length ? 'bg-cyan': 'bg-grey'"
			>成交奖</view>
			<view
				class="w23 text-center radius padding-tb-xs padding-lr-xs text-white"
				:class="bean.baobei_project.filter(i => i.kan_prize).length ? 'bg-cyan': 'bg-grey'"
			>
			带看奖金</view>
			<view class="w23 text-center bg-yellow radius padding-tb-xs padding-lr-xs text-white">马上报备</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			bean: {
				type: Object
			}
		},
		data: _ => ({}),
		methods: {
			toDetail(id){
				uni.navigateTo({
					url: `/pages/project/detail/index?id=${id}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.w23{
		width: 23%;
	}
</style>
