<template>
    <view :style="{height: windowHeight + 'px'}">
        <data-list :r-url="rUrl" :r-data="rData" @data="handlerList" ref="list">
            <swiper v-if="bannerList.length" style="height: 200px;" :duration="1000" :disable-touch="false" :vertical="false" :circular="true" :autoplay="true">
                <swiper-item v-for="(i, inx) in bannerList" :key="inx">
                    <image :src="i.photo_url" mode="" style="width: 100%;height: 100%;"></image>
                </swiper-item>
            </swiper>
            <swiper v-else style="height: 200px;" :duration="1000" :disable-touch="false" :vertical="false" :circular="true" :autoplay="true">
                <swiper-item>
                    <view style="display: flex;justify-content: center;align-items: center; width: 100vw;height: 400rpx;">
                        <image :src="projectDefaultImg" mode="" style="width: 50%;height: 70%;"></image>
                    </view>
                </swiper-item>
            </swiper>
            <view class="tabs" v-if="shopId.toString()">
                <view v-for="(item, index) of tabs" :key="index" class="w20">
                    <view style="width: 100%;" @tap="jump(item.path, item.isLogin)" class="text-white text-center radius news-title bg-blue">{{item.text}}</view>
                </view>
            </view>
            <view class="news">
                <view class="text-center radius text-white news-title bg-cyan" @tap="toNewsList">资讯</view>
                <view class="news-content">
                    <swiper :autoplay="true" :duration="1000" :disable-touch="true" :vertical="true" :circular="true" :style="{height: '40rpx', 'font-size': '15px'}">
                        <swiper-item v-for="(item, index) of newsList" @tap="toDetail(item.id)" :key="index">{{item.title}}</swiper-item>
                    </swiper>
                </view>
            </view>
            <view>
                <item v-for="(item, index) of list" :bean="item" :key="index"></item>
            </view>
            <view slot="noData"></view>
            <view class="clear" v-if="shopId">
                <image src="/static/images/tablist/home.png" @tap="clearShopId"></image>
            </view>
        </data-list>
    </view>
</template>

<script>
    import { mapState, mapMutations, mapActions } from 'vuex';
    import item from '@/pages/project/list/components/project';
    import dataList from '@/components/data-list';
	export default {
		data() {
			return {
                list: [],
                rUrl: 'project/shop',
                tabs: [
                    {
                        path: '/pages/project/list/index?type=shop',
                        text: '所有楼盘',
                        isLogin: false
                    },
                    {
                        path: '/pages/baobei/list/index?type=up',
                        text: '我的报备',
                        isLogin: true
                    },
                    {
                        path: '/pages/news/index/index',
                        text: '资讯',
                        isLogin: false
                    },
                    {
                        path: '/pages/customer/index/all?type=分销',
                        text: '客户',
                        isLogin: true
                    }
                ],
                bannerList: [],
                newsList: [],
                windowHeight: 0,
                rData: {}
			}
		},
        components: {
            dataList,
            item
        },
        async onLoad() {
            const self = this;
            if (this.shopId.toString()) {
                this.$http(`company/${this.shopId}`).then(r => {
                    let res = r.data || r;
                    uni.setNavigationBarTitle({
                        title: res.software_name || '首页'
                    });
                    self.getData();
                }).catch(err => {});
            } else if (!self.token || !Reflect.has(self.userInfo, 'id')) {
                await self.getUserInfo(self.$http);
                if (!self.token) return false;
            }
            this.$nextTick(_ => {
                uni.getSystemInfo({
                    success(e) {
                        self.windowHeight = e.windowHeight;
                    }
                });
                if (this.shopId.toString()) this.$refs.list.init();
            });
        },
        computed: {
            ...mapState(['userInfo', 'token', 'projectDefaultImg']),
            ...mapState('project', ['shopId'])
        },
        methods: {
		    ...mapMutations('project', ['setShopId']),
            ...mapActions(['getUserInfo']),
            handlerList(list) {
                this.list = list;
                this.$refs.list.hasLoaded = false;
            },
            jump(url, isLogin) {
                if (!this.token && isLogin) {
                    uni.navigateTo({
                        url: '/pages/public/login/index'
                    });
                    return false;
                }
                uni.navigateTo({
                    url: url
                });
            },
            toDetail(id) {
                uni.navigateTo({
                    url: '/pages/news/detail/index?id=' + id
                })
            },
            clearShopId() {
                this.setShopId('');
		        if (!Reflect.has(this.userInfo, 'id') || !this.token) {
		            this.getUserInfo(this.$http).then(data => {
                        if (!data) return false;
                        this.$refs.list.scrollTop = 1;
                        this.getData();
                        uni.setNavigationBarTitle({
                            title: '首页'
                        });
                    }).catch(err => {})
                }
            },
            getData() {
                let param = {};
                if (this.shopId.toString()) {
                    this.rData = {
                        recommend: 1,
                        shop_id: this.shopId
                    };
                    param = {
                        company_id: this.shopId
                    }
                } else {this.requestParams();}
                this.$http('carousels', Object.assign({per_page: 4}, param)).then(res => {
                    this.bannerList = res.data;
                });
                this.$http('news', Object.assign({per_page: 10}, param)).then(res => {
                    this.newsList = res.data;
                });
            },
            toNewsList() {
		        uni.navigateTo({
                    url: '/pages/news/index/index'
                })
            },
            requestParams() {
                this.rUrl = 'project';
                switch (this.userInfo.company.type_name) {
                    case '中介':
                        this.rData = Object.assign({}, {
                            type: 'all',
                            route_type: 'cooperation'
                        });
                        break;
                    case '开发商':
                        this.rData = Object.assign({}, {
                            type: 'all',
                            route_type: 'my'
                        });
                        break;
                    case '代理商':
                        this.rData = Object.assign({}, {
                            type: 'all',
                            route_type: 'cooperation'
                        });
                        break;
                }
            }
		},
        watch: {
		    'userInfo.company.type_name': {
		        handler() {
                    this.getData();
                    setTimeout(() => {
                        this.$refs.list.getData(true);
                    }, 1000);
                    const self = this;
                    uni.setNavigationBarTitle({
                        title: self.userInfo.company.software_name || '首页'
                    });
                    this.rUrl = 'project';
                }
            }
        }
	}
</script>

<style lang="scss" scoped>
    .tabs {
        display: flex;
        flex-wrap: nowrap;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 20rpx;
        margin-top: 10rpx;
        background: #fff;
        > view  {
            > view {
                height: 58rpx;
                padding: 10rpx 0;
                background: #0081FF;
                line-height: 1.5;
            }
        }
        .w20 {
            width: 20%;
        }
    }
    .news {
        display: flex;
        align-items: center;
        padding: 20rpx;
        margin: 10rpx 0;
        background: #fff;
        .news-title {
            height: 50rpx;
            padding: 0 20rpx;
            line-height: 1.9;
        }
        .news-content {
            flex: 1;
            height: 40rpx;
            padding-left: 20rpx;
            white-space: nowrap;
            text-overflow: ellipsis;
            -o-text-overflow: ellipsis;
            overflow: hidden;
        }
    }
    .clear {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10rpx 0 0 0;
        > image {
            width: 60rpx;
            height: 60rpx;
        }
    }
</style>