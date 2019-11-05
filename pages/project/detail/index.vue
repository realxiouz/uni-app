<template>
	<view>
		<swiper class="" style="height: 400rpx;">
            <swiper-item v-if="!bean.banners.length">
                <view style="display: flex;justify-content: center;align-items: center; width: 100vw;height: 400rpx;">
                    <image :src="projectDefaultImg" mode="" style="width: 50%;height: 70%;"></image>
                </view>
            </swiper-item>
			<swiper-item v-for="(i, inx) in bean.banners" :key="inx" v-else>
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
					<text class="text-bold text-xl margin-right-xs">{{bean.avg_price || '0'}}</text>
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
			<view class="flex justify-between">
				<text class="text-cyan" style="flex: 1">{{i.baobei_remark || ''}}</text>
				<button class="cu-btn radius bg-blue shadow" v-if="cooperation === 'cooperation'" @click.stop="handleBaobei(i, bean)">立即报备</button>
                <!--:disabled="true"-->
				<button class="cu-btn radius bg-blue shadow" v-else-if="i.cooperationed" @tap.stop="handleBaobei(i, bean)">立即报备</button>
				<button class="cu-btn radius bg-green shadow" v-else-if="cooperation === 'public' && i.company.id !== userInfo.company.id" @click.stop="handleCooperation(i.company_id)">申请合作</button>
				<button class="cu-btn radius bg-green shadow" v-else-if="cooperation === 'shop' || cooperation === ''" @click.stop="applyCooperation(i.company_id)">申请合作</button>
			</view>
		</navigator>

		<view class="cu-bar tabbar"></view>
		<view class="cu-bar bg-white tabbar border shop foot">
			<view class="action" @tap="toDetail">
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
		mapState,
        mapActions
	} from 'vuex'
	// v-if="!(listType === 'public' && i.company.id === userInfo.company.id)"
	export default {
		onNavigationBarButtonTap({
			index
		}) {
			switch (index) {
				case 0:
					console.log('menu');
					break;
				case 1:
					console.log('share');
					break
				default:
					break;
			}
		},
        watch: {},
		onLoad(opt) {
			this.id = opt.id;
			this.cooperation = opt.type;
            let data = null;
			// listType已被我换成cooperation
            if (/shop/.test(opt.type)) {
                data = {
                    baobei_projects_sub: JSON.stringify({
                        company_id: opt.company_id
                    })
                }
            } else if (/(cooperation|public)/.test(opt.type)) {
				data = {
					baobei_projects_sub: JSON.stringify({
						route_type: opt.type
					})
				}
			}
			this.$http(`project/${this.id}`, data).then(r => {
				this.bean = r.data;
				let banners = [];
				let hx = [];
				uni.setNavigationBarTitle({
                    title: r.data.name
                });
				for (let item of r.data.house_types) {
					if (item.img) hx.push(item.img);
				}
				let albums = [];
				let img = r.data.img;
				if (img) albums.push(img);
				for (let i of r.data.albums) {
					albums = [...albums,  ...i.photos.map(i => i.uri)];
				}
				banners = [...banners, ...albums, ...hx];
                this.bean.banners = banners;
				let c = new Set();
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
				recommend: 0,
				cooperation: ''
			}
		},
		methods: {
			...mapMutations('baobei', ['setDaikan', 'setSelProject', 'setSelCustomer']),
            ...mapActions(['getUserInfo']),
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
					invitation_id: this.userInfo.id,
                    is_master: 0
				};
				this.$http('cooperation_log', data, 'post').then(r => {
                    if (r.status === 'success') {
                        uni.showToast({
                            title: r.message,
                            duration: 2500,
                            icon: 'none',
                            mask: true
                        })
                    }
                }).catch(err => {})
			},
            async applyCooperation(company_id) {
			    const self = this;
			    if (!Reflect.has(this.userInfo, 'id')) {
                   this.getUserInfo(this.$http).then(data => {
                       setTimeout(() => {
                           self.handleCooperation(company_id)
                       }, 1000)
                   });
                   return false;
                }
				self.handleCooperation(company_id);
			},
			toDetail() {
				uni.navigateTo({
					url: '/pages/project/project-dev/index?id='+this.id
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
