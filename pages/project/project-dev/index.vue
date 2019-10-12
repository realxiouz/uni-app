<template>
	<view>
		<swiper class="" style="height: 400rpx;">
            <swiper-item v-if="!bean.banners.length">
                <view style="display: flex;justify-content: center;align-items: center; width: 100vw;height: 400rpx;">
                    <image :src="projectDefaultImg" mode="" style="width: 50%;height: 70%;"></image>
                </view>
            </swiper-item>
			<swiper-item v-else v-for="(i, inx) in bean.banners" :key="inx">
				<image :src="i" mode="" style="width: 100%;height: 100%;"></image>
			</swiper-item>
		</swiper>
		<view class="padding bg-white">
			<view class="flex justify-between">
				<view>
					<text class="text-bold text-black text-lg margin-right-xs">{{bean.name || ''}}</text>
					<text class="cu-tag bg-cyan radius sm">{{bean.status_name || ''}}</text>
				</view>
				<view class="text-red">
					<text class="text-bold text-xl margin-right-xs">{{bean.avg_price || ''}}</text>
					<text>元/㎡</text>
				</view>
			</view>
			<view class="text-gray margin-top-xs">
				<text class="cuIcon cuIcon-locationfill margin-right-xs"></text>
				<text>{{bean.address || ''}}</text>
			</view>
			<view class="flex margin-top-xs">
				<view class="cu-tag line-blue small margin-right-xs radius" v-for="(i, inx) in bean.c" :key="inx" v-if="i">{{i}}</view>
			</view>
			<view class="flex margin-top-xs">
				<view class="flex-sub">
					<text class="text-gray">开盘时间:</text>
					<text>{{bean.kaipan_date || ''}}</text>
				</view>
				<view class="flex-sub">
					<text class="text-gray">交房时间:</text>
					<text>{{bean.jiaofang_date || ''}}</text>
				</view>
			</view>
		</view>
		<view class="recommend">
				<view class="title">
					<text>详情</text>
				</view>
				<view class="detail">
					<view>
						<text class="text-gray">占地面积: </text>
						<text class="bg-white">{{bean.zhandi || ''}}</text>
					</view>
					<view>
						<text class="text-gray">建筑面积: </text>
						<text class="bg-white">{{bean.zongmianji || ''}}</text>
					</view>
					<view>	
						<text class="text-gray">产权年限: </text>
						<text class="bg-white">{{bean.chanquan || ''}}</text>
					</view>
					<view>
						<text class="text-gray">规划户数: </text>
						<text class="bg-white">{{bean.hushu || ''}}</text>
					</view>
					<view>
						<text class="text-gray">物业费: </text>
						<text class="bg-white">{{bean.wuyefei || ''}}</text>
					</view>
					<view>
						<text class="text-gray">容积率: </text>
						<text class="bg-white">{{bean.rongji || ''}}</text>
					</view>
					<view>
						<text class="text-gray">绿化率: </text>
						<text class="bg-white">{{bean.lvhua || ''}}</text>
					</view>
					<view>
						<text class="text-gray">停车位: </text>
						<text class="bg-white">{{bean.chewei || ''}}</text>
					</view>
					<view class="nowrap">
						<text class="text-gray">建筑类型: </text>
						<text class="bg-white">{{bean.jianzhu_type || ''}}</text>
					</view>
					<view class="nowrap">
						<text class="text-gray">物业公司: </text>
						<text class="bg-white">{{bean.wuye_company || ''}}</text>
					</view>
				</view>
				<view class="title" style="padding-top: 30rpx;">
					<text>户型</text>
				</view>
				<view class="house-types" style="justify-content: space-between;">
					<view v-for="(item, index) of houseTypes" :key="index">
						<image :src="item.img" class="img" mode="aspectFit"></image>
						<text>{{huose(item)}}</text>
					</view>
				</view>
				<view v-if="houseTypesLast.length" :class="['house-types', houseTypesLast.length === 2? 'house-types-last': '']">
					<view v-for="(item, index) of houseTypesLast" :key="index">
						<image :src="item.img" class="img" mode="aspectFit"></image>
						<text>{{huose(item)}}</text>
					</view>
				</view>
			</view>
		<view class="cu-bar bg-white tabbar border shop foot">
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
			this.id = opt.id;
			// recommend为1表示是从名片(推荐楼盘)这里跳转过去的, 因为在详情页里有些不显示户型图片, 地图, 详情
			this.recommend = Number(opt.recommend);
			this.$http(`project/${this.id}`).then(r => {
						const _data = r.data;
						this.bean = _data;
						let hx = [];
						for (let item of _data.house_types) {
							hx.push(item.img);
						}
						let albums = [];
						let img = _data.img;
						if (img) albums.push(img);
						for (let i of _data.albums) {
							albums = [...albums, ...i.photos.map(i => i.uri)];
						}
						this.bean.banners = [...new Set([...albums, ...hx])];
						// 户型详情列表, 有可能会出现多一两个的情况, 不让其使用space-between时候, 中间为空
						let houseTypes = _data.house_types;
						let len = houseTypes.length;
						let lastNum = len%3;
						this.houseTypesLast = houseTypes.splice(len - lastNum, lastNum);
						this.houseTypes = houseTypes;
						
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
						bean: {
                            banners: []
                        },
						houseTypesLast: [],
						houseTypes: []
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
					...mapState(['userInfo', 'projectDefaultImg']),
					...mapState('project', ['listType']),
					huose() {
						return item => {
							return (item.shi || '0') + '室' + (item.ting || '0') + '厅' + (item.wei || '0') + '卫' + (item.tai || '0') + '台' + (item.size || '0') + 'm²';
						}
					},
					styleLast() {
						if (this.houseTypesLast.length <= 1) return false;
						
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
			font-size: 16px;
			font-weight: bold;
		}

		.detail {
			display: flex;
			flex-wrap: wrap;
			padding: 0 5rpx;
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
			flex-wrap: wrap;

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
		.house-types-last {
			view:nth-child(2) {
				margin-left: 46rpx;
			}
		}
	}
</style>
