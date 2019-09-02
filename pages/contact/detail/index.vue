<template>
	<view class="cu-list menu">
		<navigator class="cu-item" :url="`/pages/message/chat/index?id=${id}&type=App\\User`">
			<view class="content padding-tb-sm flex align-center">
				<view class="flex flex-direction flex-sub" style="align-items: flex-start;">
					<view class="text-gray text-sm">姓名</view>
					<view class="text-black text-bold">{{bean.name}}</view>
				</view>
				<text class="cuIcon-message text-blue" style="font-size: 50upx;"></text>
			</view>
		</navigator>
		<view class="cu-item" @click="handlePhone(bean.mobile)">
			<view class="content padding-tb-sm flex align-center">
				<view class="flex flex-direction flex-sub" style="align-items: flex-start;">
					<view class="text-gray text-sm">电话</view>
					<view class="text-black text-bold">{{bean.mobile}}</view>
				</view>
				<text class="cuIcon-phone text-cyan" style="font-size: 50upx;"></text>
			</view>
		</view>
		<view class="cu-item">
			<view class="content padding-tb-sm flex align-center">
				<view class="flex flex-direction flex-sub" style="align-items: flex-start;">
					<view class="text-gray text-sm">企业</view>
					<view class="text-black text-bold">{{bean.company.name}}</view>
				</view>
			</view>
		</view>
		<view class="cu-item">
			<view class="content padding-tb-sm flex align-center">
				<view class="flex flex-direction flex-sub" style="align-items: flex-start;">
					<view class="text-gray text-sm">角色</view>
					<view class="text-black text-bold">{{bean.role_name}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad(opt) {
			this.id = opt.id
			this.$http(`v2/employee/${this.id}`).then(r => {
				this.bean = r.data
			})
		},
		data() {
			return {
				id: '',
				bean: {
					company: {}
				}
			}
		},
		methods: {
			handlePhone(phoneNumber) {
				uni.makePhoneCall({
					phoneNumber
				})
			}
		}
	}
</script>

<style>
</style>
