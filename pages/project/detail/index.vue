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
		<template v-if="recommend !== 1">
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
					<button class="cu-btn radius bg-green shadow" v-else-if="listType==='public'" @click.stop="handleCooperation(i.id)">合作</button>
				</view>
			</navigator>

			<view class="cu-bar tabbar"></view>
		</template>
		<template v-else>
			<view class="recommend">
				<view class="title">
					<text>详情</text>
				</view>
				<view class="detail">
					<view>
						<text>占地面积: </text>
						<text>{{bean.zhandi}}</text>
					</view>
					<view>
						<text>建筑面积: </text>
						<text>{{bean.zongmianji}}</text>
					</view>
					<view>
						<text>产权年限: </text>
						<text>{{bean.chanquan}}</text>
					</view>
					<view>
						<text>规划户数: </text>
						<text>{{bean.hushu}}</text>
					</view>
					<view>
						<text>物业费: </text>
						<text>{{bean.wuyefei}}</text>
					</view>
					<view>
						<text>容积率: </text>
						<text>{{bean.rongji}}</text>
					</view>
					<view>
						<text>绿化率: </text>
						<text>{{bean.lvhua}}</text>
					</view>
					<view>
						<text>停车位: </text>
						<text>{{bean.chewei}}</text>
					</view>
					<view class="nowrap">
						<text>建筑类型: </text>
						<text>{{bean.jianzhu_type}}</text>
					</view>
					<view class="nowrap">
						<text>物业公司: </text>
						<text>{{bean.wuye_company}}</text>
					</view>
				</view>
				<view class="title">
					<text>户型</text>
				</view>
				<view class="house-types">
					<view v-for="(item, index) of bean.house_types" :key="index">
						<image :src="item.img" class="img" mode="aspectFit"></image>
						<text>{{huose(item)}}</text>
					</view>
				</view>
			</view>
		</template>
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
		onLoad(opt) {
			this.id = opt.id;
			// recommend为1表示是从名片(推荐楼盘)这里跳转过去的, 因为在详情页里有些不显示户型图片, 地图, 详情
			this.recommend = Number(opt.recommend);
			this.$http(`project/${this.id}`).then(r => {
				this.bean = r.data
				this.bean.banners = [
					'http://st.fangxiaoke.com/1/company/project/fm/201908/156585356573826.jpg',
					'http://st.fangxiaoke.com/1/company/project/huxing/201908/156585365660132.jpg',
					'http://st.fangxiaoke.com/1/company/project/fm/201908/156585356573826.jpg',
				]
				this.bean.c = ['商铺', '写字楼'];
			})
		},
		data() {
			return {
				id: '',
				bean: {},
				recommend: 0
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
			huose() {
				return item => {
					return item.shi + '室' + item.ting + '厅' + item.wei + '卫' + item.tai + '台' + item.size + 'm²';
				}
			}
		},
		mounted() {}
	}
</script>

<style lang="scss">
	.recommend {
		background: #fff;
		padding: 0 30rpx 100rpx 30rpx;

		.title {
			font-size: 40rpx;
			font-weight: bold;
		}

		.detail {
			display: flex;
			flex-wrap: wrap;

			view {
				width: 50%;
				margin: 5rpx 0;
				font-size: 28rpx;
			}

			.nowrap {
				width: 100%;

			}
		}

		.house-types {
			display: flex;
			justify-content: space-around;
			flex-wrap: wrap;
			margin-top: 10rpx;
			view {
				width: 200rpx;
				margin: 15rpx 0 10rpx 0;
			}

			.img {
				width: 100%;
				height: 100rpx;
			}

			text {
				display: block;
				background: #ccc;
				padding: 0 5rpx;
				border-radius: 10px;
				font-size: 19rpx;
				text-align: center;
			}
		}
	}
</style>
