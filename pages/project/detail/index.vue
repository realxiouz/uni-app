<template>
	<view>
		<swiper class="" style="height: 400rpx;">
			<swiper-item v-for="(i, inx) in bean.banners" :key="inx">
				<image :src="i" mode="" style="width: 100%;height: 100%;"></image>
			</swiper-item>
		</swiper>
		<view class="padding bg-white">
			<view class="flex justify-between">
				<view>
					<text class="text-bold text-black text-lg margin-right-xs">{{bean.name}}</text>
					<text class="cu-tag bg-cyan radius sm">{{bean.status_name}}</text>
				</view>
				<view class="text-red">
					<text class="text-bold text-xl margin-right-xs">{{bean.avg_price}}</text>
					<text>元/㎡</text>
				</view>
			</view>
			<view class="text-gray margin-top-xs">
				<text class="cuIcon cuIcon-locationfill margin-right-xs"></text>
				<text>{{bean.address}}</text>
			</view>
			<view class="flex margin-top-xs">
				<view class="cu-tag line-blue small margin-right-xs radius" v-for="(i, inx) in bean.c" :key="inx">{{i}}</view>
			</view>
			<view class="flex margin-top-xs">
				<view class="flex-sub">
					<text class="text-gray">开盘时间:</text>
					<text>{{bean.kaipan_date}}</text>
				</view>
				<view class="flex-sub">
					<text class="text-gray">交房时间:</text>
					<text>{{bean.jiaofang_date}}</text>
				</view>
			</view>
		</view>
		<navigator class="padding bg-white solids-top" v-for="(i, inx) in bean.baobei_project" :key="inx" :url="`/pages/project/channel/index?id=${i.id}`">
			<view class="flex justify-between margin-bottom-sm">
				<text class="text-lg">{{i.company.name}}</text>
				<text class="text-red">
					<text>{{i.fee.fee}}{{i.fee.fee_type_name}}</text>
					<text v-if="i.sell_prize">&nbsp;+&nbsp;{{i.sell_prize}}元</text>
				</text>
			</view>
			<view class="margin-bottom-sm">
				<view class="cu-tag radius" :class="i.kan_prize?'line-yellow':'line-gray'">带看奖</view>
				<view class="cu-tag radius" :class="i.is_zhiding_jiedai_zhence?'line-yellow':'line-gray'">可指定接待</view>
				<view class="cu-tag radius" :class="i.is_dianzi_zhence?'line-yellow':'line-gray'">垫资结佣</view>
			</view>
			<view class="flex justify-between">
				<text class="text-cyan">{{i.baobei_remark}}</text>
				<button class="cu-btn radius bg-blue shadow" v-if="listType==='cooperation'" @click.stop="handleBaobei(i, bean)">报备</button>
				<button class="cu-btn radius bg-green shadow" v-else-if="listType==='public'" @click.stop="handleCooperation(i.company_id)">合作</button>
			</view>
		</navigator>

		<view class="cu-bar tabbar"></view>
		<view class="cu-bar bg-white tabbar border shop foot">
			<view class="action">
				<view class="cuIcon cuIcon-list"></view>
				详情
			</view>
			<!-- <view class="action text-orange">
				<view class="cuIcon-favorfill"></view> 已收藏
			</view> -->
			<navigator class="bg-cyan submit" :url="`/pages/project/zhiye/index?pId=${bean.id}`">
				<view class="margin-right-xs text-xxl">
					<view class="cuIcon cuIcon-phone "></view>
				</view>
				置业顾问
			</navigator>
		</view>
	</view>
</template>

<script>
	import {
		mapMutations,
		mapState
	} from 'vuex'

	export default {
		onNavigationBarButtonTap({
			index
		}) {
			switch (index) {
				case 0:
					console.log('menu')
					break;
				case 1:
					console.log('share')
					break
				default:
					break;
			}
		},
		onLoad(opt) {
			this.id = opt.id
			let data = null
			if (this.listType === 'cooperation') {
				data = {
					baobei_projects_sub: JSON.stringify({
						route_type: 'cooperation'
					})
				}
			}
			this.$http(`project/${this.id}`, data).then(r => {
				this.bean = r.data
				let banners = []
				for (let i of r.data.albums) {
					banners = [...banners, ...i.photos.map(i => i.uri)]
				}
				this.bean.banners = banners
				let c = new Set()
				for (let i of this.bean.house_types) {
					c.add(i.house_using_type.title)
				}
				this.bean.c = [...c]
			})
		},
		data() {
			return {
				id: '',
				bean: {}
			}
		},
		methods: {
			...mapMutations('baobei', ['setDaikan', 'setSelProject', 'setSelCustomer']),
			handleBaobei(i, bean) {
				this.setDaikan({
					name: this.userInfo.name,
					phone: this.userInfo.mobile
				})
				this.setSelCustomer([{
					name: '',
					phone: ''
				}])
				this.setSelProject([{
					id: i.id,
					text: `${bean.name}(${i.company.alias})`
				}])
				uni.navigateTo({
					url: `/pages/baobei/bean/index`
				})
			},
			handleCooperation(company_id) {
				let data = {
					company_id,
					invitation_id: this.userInfo.id
				}
				this.$http('cooperation_log', data, 'post').then(r => {

				})
			}
		},
		computed: {
			...mapState(['userInfo']),
			...mapState('project', ['listType']),
		}
	}
</script>

<style>
</style>
