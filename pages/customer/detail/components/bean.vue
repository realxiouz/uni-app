<template>
	<scroll-view scroll-y style="height: 100%;">
		<view class="cu-list menu">
			<view class="cu-item">
				<view class="content padding-tb-sm flex align-center">
					<view class="flex flex-direction flex-sub" style="align-items: flex-start;">
						<view class="text-gray text-sm">姓名</view>
						<view class="text-black text-bold">{{bean.name}}</view>
					</view>
				</view>
			</view>
			<view class="cu-item">
				<view class="content padding-tb-sm flex align-center">
					<view class="flex flex-direction flex-sub" style="align-items: flex-start;">
						<view class="text-gray text-sm">手机</view>
						<view class="text-black text-bold">{{bean.phone}}</view>
					</view>
				</view>
			</view>
			<view class="cu-item" v-if="bean.phone_reserve">
				<view class="content padding-tb-sm flex align-center">
					<view class="flex flex-direction flex-sub" style="align-items: flex-start;">
						<view class="text-gray text-sm">备用电话</view>
						<view class="text-black text-bold">{{bean.phone_reserve}}</view>
					</view>
				</view>
			</view>
			<view class="cu-item" v-if="bean.sex_name">
				<view class="content padding-tb-sm flex align-center">
					<view class="flex flex-direction flex-sub" style="align-items: flex-start;">
						<view class="text-gray text-sm">性别</view>
						<view class="text-black text-bold">{{bean.sex_name}}</view>
					</view>
				</view>
			</view>
			<view class="cu-item" v-if="bean.source">
				<view class="content padding-tb-sm flex align-center">
					<view class="flex flex-direction flex-sub" style="align-items: flex-start;">
						<view class="text-gray text-sm">来源</view>
						<view class="text-black text-bold">{{bean.source_attr.name}}</view>
					</view>
				</view>
			</view>
			<view class="cu-item" v-if="bean.weixin">
				<view class="content padding-tb-sm flex align-center">
					<view class="flex flex-direction flex-sub" style="align-items: flex-start;">
						<view class="text-gray text-sm">微信</view>
						<view class="text-black text-bold">{{bean.weixin}}</view>
					</view>
				</view>
			</view>
			<view class="cu-item" v-if="bean.qq">
				<view class="content padding-tb-sm flex align-center">
					<view class="flex flex-direction flex-sub" style="align-items: flex-start;">
						<view class="text-gray text-sm">QQ</view>
						<view class="text-black text-bold">{{bean.qq}}</view>
					</view>
				</view>
			</view>
			<view class="cu-item" v-if="bean.star">
				<view class="content padding-tb-sm flex align-center">
					<view class="flex flex-direction flex-sub" style="align-items: flex-start;">
						<view class="text-gray text-sm">星级</view>
						<view class="text-black text-bold">{{bean.star}}星</view>
					</view>
				</view>
			</view>
			<view class="cu-item" v-if="bean.status_name">
				<view class="content padding-tb-sm flex align-center">
					<view class="flex flex-direction flex-sub" style="align-items: flex-start;">
						<view class="text-gray text-sm">状态</view>
						<view class="text-black text-bold">{{bean.status_name}}</view>
					</view>
				</view>
			</view>
			<view class="cu-item" v-if="bean.belongs_employee">
				<view class="content padding-tb-sm flex align-center">
					<view class="flex flex-direction flex-sub" style="align-items: flex-start;">
						<view class="text-gray text-sm">归属人</view>
						<view class="text-black text-bold">{{bean.belongs_employee.name}}</view>
					</view>
				</view>
			</view>
			<view class="cu-item" v-if="bean.typing_employee">
				<view class="content padding-tb-sm flex align-center">
					<view class="flex flex-direction flex-sub" style="align-items: flex-start;">
						<view class="text-gray text-sm">首录人</view>
						<view class="text-black text-bold">{{bean.typing_employee.name}}</view>
					</view>
				</view>
			</view>
			<view class="cu-item" v-if="bean.typing_employee">
				<view class="content padding-tb-sm flex align-center">
					<view class="flex flex-direction flex-sub" style="align-items: flex-start;">
						<view class="text-gray text-sm">录入时间</view>
						<view class="text-black text-bold">{{bean.created_at|moment('from')}}</view>
					</view>
				</view>
			</view>
			<view class="cu-item" v-if="bean.release_time">
				<view class="content padding-tb-sm flex align-center">
					<view class="flex flex-direction flex-sub" style="align-items: flex-start;">
						<view class="text-gray text-sm">释放时间</view>
						<view class="text-black text-bold">{{bean.release_time|moment('from')}}</view>
					</view>
				</view>
			</view>
			<view class="cu-item" v-if="bean.release_time">
				<view class="content padding-tb-sm flex align-center">
					<view class="flex flex-direction flex-sub" style="align-items: flex-start;">
						<view class="text-gray text-sm">认领时间</view>
						<view class="text-black text-bold">{{bean.release_time|moment('from')}}</view>
					</view>
				</view>
			</view>
		</view>
	</scroll-view>
</template>

<script>
	export default {
		props: {
			cId: {
				type: [Number, String]
			}
		},
		data() {
			return {
				hasLoaded: false,
				bean: {}
			}
		},
		methods: {
			init() {
				if (!this.hasLoaded) {
					this.getData()
				}
			},
			getData() {
				this.$http(`customer/${this.cId}`).then(r => {
					this.bean = r.data
					this.hasLoaded = true
				})
			}
		}
	}
</script>

<style>
</style>
