<template>
	<view>
		<swiper class="" style="height: 600rpx;">
			<swiper-item v-for="(i, inx) in bean.imgs" :key="inx">
				<image :src="i" mode="" style="width: 100%;height: 100%;"></image>
			</swiper-item>
		</swiper>
		<view class="padding bg-white">
			<view class="flex justify-between">
				<view>
					<text class="text-bold text-black text-lg margin-right-xs">{{bean.project_name || ''}}</text>
					<text class="cu-tag bg-cyan radius sm">{{bean.leixing || ''}}</text>
				</view>
				<view class="text-red">
					<text class="text-bold text-xl margin-right-xs">{{bean.avg_price || '0'}}</text>
					<text>元/㎡</text>
				</view>
			</view>
			<view class="text-gray margin-top-xs">
				<text class="cuIcon cuIcon-locationfill margin-right-xs"></text>
				<text>{{bean.address || ''}}</text>
			</view>
			<view
				class="flex margin-top-xs"
			>
				<view class="flex-sub text-center">
					<view class="text-bold text-xl">{{bean.shi}}室{{bean.ting}}厅{{bean.wei}}卫</view>
					<view class="text-gray">房型</view>
				</view>
				<view class="flex-sub text-center">
					<view class="text-bold text-xl">{{bean.size}}㎡</view>
					<view class="text-gray">面积</view>
				</view>
				<view class="flex-sub text-center">
					<view class="text-bold text-xl">{{bean.floor}}</view>
					<view class="text-gray">楼层</view>
				</view>
				<view class="flex-sub text-center">
					<view class="text-bold text-xl">{{bean.chaoxiang}}</view>
					<view class="text-gray">朝向</view>
				</view>
			</view>
			<view
				class="flex margin-top-xs"
			>
				<view class="cu-tag line-blue small margin-right-xs radius" v-for="(i, inx) in bean.jiaju" :key="inx">{{i}}</view>
			</view>
		</view>
		<navigator class="padding bg-white solids-top" v-for="(i, inx) in bean.baobei_project" :key="inx" :url="`/pages/project/channel/index?id=${i.id}`">
			<view class="flex justify-between margin-bottom-sm">
				<text class="text-lg">{{i.company.name}}</text>
				<text class="text-red">
					<text>{{(i.fee.fee + i.fee.fee_type_name) || '0'}}</text>
					<text v-if="i.sell_prize">&nbsp;+{{i.sell_prize}}元</text>
				</text>
			</view>
			<view class="margin-bottom-sm">
				<view class="cu-tag radius" :class="i.kan_prize?'line-yellow':'line-gray'">带看奖</view>
				<view class="cu-tag radius" :class="i.is_zhiding_jiedai_zhence?'line-yellow':'line-gray'">可指定接待</view>
				<view class="cu-tag radius" :class="i.is_dianzi_zhence?'line-yellow':'line-gray'">垫资结佣</view>
			</view>
		</navigator>

		<view class="cu-bar tabbar"></view>
		<view class="cu-bar bg-white tabbar border shop foot">
			<!-- <view class="action" @tap="toDetail">
				<view class="cuIcon cuIcon-list"></view>
				详情
			</view> -->
			<view class="bg-cyan submit" @click="chat">
				<view class="margin-right-xs text-xxl">
					<view class="cuIcon cuIcon-message"></view>
				</view>
				聊天
			</view>
			<view class="bg-blue submit" @click="phone">
				<view class="margin-right-xs text-xxl">
					<view class="cuIcon cuIcon-phone"></view>
				</view>
				电话
			</view>
			<view class="bg-yellow submit" @click="showMenus">
				<view class="margin-right-xs text-xxl"> 
					<view class="cuIcon cuIcon-magic"></view>
				</view>
				管理
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapMutations,
		mapState,
        mapActions
	} from 'vuex'
	export default {
        watch: {},
		onLoad(opt) {
			this.id = opt.id;
			this.$http(`secondHouse/secondHouse/${this.id}`).then(r => {
				this.bean = r.data;
			})
		},
		data() {
			return {
				id: '',
				bean: {},
				recommend: 0,
				cooperation: ''
			}
		},
		methods: {
			...mapMutations('baobei', ['setDaikan', 'setSelProject', 'setSelCustomer']),
            ...mapActions(['getUserInfo']),
			chat() {
				uni.navigateTo({
					url: `/pages/message/chat/index?id=${this.bean.guishu.id}&type=App\\User&send-name=${this.bean.guishu.name}`
				})
			},
			phone() {
				
			},
			showMenus() {
				uni.showActionSheet({
					itemList:['填写首堪', '上传照片', '添加钥匙', '预约自看', '预约带看'],
					success: (res) => {
						
					}
				})
			}
		},
		computed: {
			...mapState(['userInfo', 'projectDefaultImg'])
		},
		mounted() {}
	}
</script>

<style>
	
</style>
