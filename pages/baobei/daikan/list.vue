<template>
	<view class="">
		<view class="bg-white margin-top-sm padding-tb-xs padding-lr-sm">
			<view class="flex align-center">
				<view class="cu-tag bg-blue small radius">开发商带看</view>
			</view>

			<template v-if="beanUp">
				<view class="flex margin-top-xs">
					<view class="flex-sub">
						<text class="text-gray">看房时间:</text>
						<text>{{beanUp.kan_time|moment('MM-DD HH:mm')}}</text>
					</view>
					<view class="flex-sub">
						<text class="text-gray">看房人数:</text>
						<text>{{beanUp.peoples}}</text>
					</view>
				</view>
				<view class="flex margin-top-xs">
					<view class="flex-sub">
						<text class="text-gray">带看情况:</text>
						<text>{{beanUp.remark}}</text>
					</view>
				</view>
				<view class="margin-top-xs" v-if="beanUp.img">
					<view class="flex-sub">
						<text class="text-gray">现场照片:</text>
					</view>
					<view class="grid col-4 grid-square flex-sub" style="width: 100%;">
						<view class="bg-img" v-for="(i,inx) in beanUp.img" :key="inx" @tap="viewImage(beanUp.img, inx)">
							<image :src="i" mode="aspectFill"></image>
						</view>
					</view>
				</view>
				<view class="margin-top-xs" v-if="beanUp.confirm_img">
					<view class="flex-sub">
						<text class="text-gray">确认单:</text>
					</view>
					<view class="grid col-4 grid-square flex-sub" style="width: 100%;">
						<view class="bg-img" @tap="viewImage([beanUp.confirm_img], 0)">
							<image :src="beanUp.confirm_img" mode="aspectFill"></image>
						</view>
					</view>
				</view>
				<view class="margin-top-xs" v-if="beanUp.sign_img">
					<view class="flex-sub">
						<text class="text-gray">签名:</text>
					</view>
					<view class="grid col-4 grid-square flex-sub" style="width: 100%;">
						<view class="bg-img" @tap="viewImage([beanUp.sign_img], 0)">
							<image :src="beanUp.sign_img" mode="aspectFill"></image>
						</view>
					</view>
				</view>
			</template>

			<view v-else class="flex padding justify-center">
				<button class="cu-btn radius bg-blue" @click="toDaikan" v-if="canTianXieDaiKan">写带看</button>
				<text v-else>暂无记录</text>
			</view>

		</view>

		<view class="bg-white margin-top-sm padding-tb-xs padding-lr-sm">
			<view class="flex align-center">
				<view class="cu-tag bg-cyan small radius">中介带看</view>
			</view>
			<template v-if="beanDown">
				<view class="flex margin-top-xs">
					<view class="flex-sub">
						<text class="text-gray">看房时间:</text>
						<text>{{beanDown.kan_time|moment('MM-DD HH:mm')}}</text>
					</view>
					<view class="flex-sub">
						<text class="text-gray">看房人数:</text>
						<text>{{beanDown.peoples}}</text>
					</view>
				</view>
				<view class="flex margin-top-xs">
					<view class="flex-sub">
						<text class="text-gray">带看情况:</text>
						<text>{{beanDown.remark}}</text>
					</view>
				</view>
				<view class="margin-top-xs" v-if="beanDown.img">
					<view class="flex-sub">
						<text class="text-gray">现场照片:</text>
					</view>
					<view class="grid col-4 grid-square flex-sub" style="width: 100%;">
						<view class="bg-img" v-for="(i,inx) in beanDown.img" :key="inx" @tap="viewImage(beanDown.img, inx)">
							<image :src="i" mode="aspectFill"></image>
						</view>
					</view>
				</view>
				<view class="margin-top-xs" v-if="beanDown.confirm_img">
					<view class="flex-sub">
						<text class="text-gray">确认单:</text>
					</view>
					<view class="grid col-4 grid-square flex-sub" style="width: 100%;">
						<view class="bg-img" @tap="viewImage([beanDown.confirm_img], 0)">
							<image :src="beanDown.confirm_img" mode="aspectFill"></image>
						</view>
					</view>
				</view>
				<view class="margin-top-xs" v-if="beanDown.sign_img">
					<view class="flex-sub">
						<text class="text-gray">签名:</text>
					</view>
					<view class="grid col-4 grid-square flex-sub" style="width: 100%;">
						<view class="bg-img" @tap="viewImage([beanDown.sign_img], 0)">
							<image :src="beanDown.sign_img" mode="aspectFill"></image>
						</view>
					</view>
				</view>
			</template>
			<view v-else class="flex padding justify-center">
				<button class="cu-btn radius bg-blue" @click="toDaikan" v-if="canTianXieDaiKan">写带看</button>
				<text v-else>暂无记录</text>
			</view>
		</view>

		<!-- <view class="padding bg-white margin-top-sm" v-if="!beanUp && !beanDown">暂无带看记录</view> -->
	</view>

</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		onLoad(opt) {
			this.bId = opt.bId
			// this.getList()
		},
		onShow() {
			this.getList()
			// this.$http(`baobei/${this.bId}`).then(r => {
			// 	this.DaiKanItem = r.data
			// })
		},
		data() {
			return {
				beanUp: null,
				beanDown: null,
				contentArr: [],
				DaiKanItem: {}
			}
		},
		computed: {
			...mapState(['userInfo']),
			canTianXieDaiKan() {
				let cArr = this.contentArr;
				let item = this.DaiKanItem;

				if (cArr.length === 2) {
					return false;
				} else {
					if (
						(item.status === 1 || item.status === 4) && (
							item.daikan_id === this.userInfo.id || item.salesman_id === this.userInfo.id
						)
					) {
						if (cArr.length === 1) {
							if (cArr[0].salesman_id === this.userInfo.id) {
								return false;
							} else {
								return true;
							}
						} else {
							return true;
						}
					} else {
						return false;
					}
				}
			}
		},
		methods: {
			getList() {
				this.$http(`baobei/${this.bId}`).then(r => {
					this.DaiKanItem = r.data
					this.$http(`daikan?baobei_id=${this.bId}`).then(r => {
						this.contentArr = r.data
						this.beanUp = r.data.find(i => i.version == '审核方')
						this.beanDown = r.data.find(i => i.version == '中介')
					})
				})
			},
			toDaikan() {
				uni.navigateTo({
					url: `/pages/baobei/daikan/index?bId=${this.bId}`
				})
			},
			viewImage(urls, current) {
				uni.previewImage({
					urls,
					current
				})
			}
		}
	}
</script>

<style>
</style>
