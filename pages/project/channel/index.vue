<template>
	<view>
		<view class="bg-white padding solids-bottom">
			<view>
				<text class="text-bold margin-right-sm">佣金</text>
				<text class="text-red">{{bean.fee.fee||''}}{{bean.fee.fee_type_name||''}}</text>
			</view>
			<view class="margin-top-sm">
				<text>{{bean.fee_remark||''}}</text>
			</view>
		</view>
		<view class="bg-white padding solids-bottom">
			<view>
				<text class="text-bold margin-right-sm">成交奖</text>
				<text class="text-red">{{bean.sell_prize||''}}</text>
			</view>
			<view class="margin-top-sm">
				<text>{{bean.sell_prize_remark||''}}</text>
			</view>
		</view>
		<view class="bg-white padding solids-bottom">
			<view>
				<text class="text-bold margin-right-sm">带看奖</text>
				<text class="text-red">{{bean.kan_prize||''}}</text>
			</view>
			<view class="margin-top-sm">
				<text>{{bean.kan_prize_remark||''}}</text>
			</view>
		</view>
		<view class="bg-white padding solids-bottom">
			<view>
				<text class="text-bold margin-right-sm">渠道商说明</text>
			</view>
			<view class="margin-top-sm">
				<text>{{bean.remark||''}}</text>
			</view>
		</view>
		<view class="bg-white padding solids-bottom">
			<view>
				<text class="text-bold margin-right-sm">其他规则</text>
			</view>
			<view class="margin-top-sm">
				<text>{{bean.baobei_remark||''}}</text>
			</view>
		</view>
		<view class="bg-white padding solids-bottom">
			<view>
				<text class="text-bold margin-right-sm">电话</text>
			</view>
			<view class="margin-top-sm">
				<view class="flex align-center" @tap="tel">
					<text>{{bean.qudao_manager.name||''}}</text>
					<text class="text-gray margin-left-sm flex-sub">渠道经理</text>
					<text class="text-cyan text-xl">
						<text class="cuIcon cuIcon-phone"></text>
					</text>
				</view>
				<view class="flex align-center" @tap="tel">
					<text>{{bean.qudao_attache.name||''}}</text>
					<text class="text-gray margin-left-sm flex-sub">渠道专员</text>
					<text class="text-cyan text-xl">
						<text class="cuIcon cuIcon-phone"></text>
					</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad(opt) {
			this.id = opt.id
			this.getData()
		},
		data() {
			return {
				id: '',
				bean: {}
			}
		},
		methods: {
			getData() {
				this.$http(`baobeiProject/${this.id}`).then(r => {
					this.bean = r.data
				})
			},
			tel() {
				uni.makePhoneCall({
					phoneNumber: '10086'
				})
			}
		}
	}
</script>

<style>
</style>
