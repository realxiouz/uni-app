<template>
    <view :style="{height: windowHeight + 'px'}">
        <data-list :r-url="rUrl" :r-data="rData" @data="handlerList" ref="list">
            <swiper class="" style="height: 200px;">
                <swiper-item v-if="!bannerList.length">
                    <view style="display: flex;justify-content: center;align-items: center; width: 100vw;height: 400rpx;">
                        <image :src="projectDefaultImg" mode="" style="width: 50%;height: 70%;"></image>
                    </view>
                </swiper-item>
                <swiper-item v-for="(i, inx) in bannerList" :key="inx" v-else>
                    <image :src="i.photo_url" mode="" style="width: 100%;height: 100%;"></image>
                </swiper-item>
            </swiper>
            <view class="tabs" v-if="tabs.length">
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
            <item v-for="(item, index) of list" :bean="item" :key="index"></item>
            <view slot="isEnd"></view>
            <view slot="noData"></view>
            <view class="clear" v-if="shopId">
                <image src="/static/images/tablist/home.png" @tap="clearShopId"></image>
            </view>
        </data-list>
    </view>
</template>

<script>
    import { mapState, mapMutations } from 'vuex';
    import item from '@/pages/project/list/components/project';
    import dataList from '@/components/data-list';
	export default {
		data() {
			return {
                list: [],
                rUrl: 'project/shop',
                /*tabs: [
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
                ],*/
                bannerList: [],
                recommend: 1,
                newsList: [],
                windowHeight: 0,
                rData: {}
			}
		},
        components: {
            dataList,
            item
        },
        onLoad() {
            const self = this;
            self.getData();
            this.$nextTick(_ => {
                uni.getSystemInfo({
                    success(e) {
                        self.windowHeight = e.windowHeight;
                    }
                });
                self.$refs.list.getData(true);
            })
        },
        computed: {
            ...mapState(['userInfo', 'token', 'projectDefaultImg']),
            ...mapState('project', ['shopId'])
        },
        methods: {
		    ...mapMutations('project', ['setShopId']),
            handlerList(list) {
                this.list = list;
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
		        this.$refs.list.scrollTop = 1;
		        this.setShopId('');
                this.getData();
                this.rData = {};
            },
            getData() {
                let param = {};
                if (this.shopId && this.shopId.toString()) {
                    this.rData = {
                        recommend: 1,
                        shop_id: this.shopId
                    };
                    param = {
                        company_id: this.shopId
                    }
                }
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
        align-items: ceter;
        justify-content: center;
        > image {
            width: 60rpx;
            height: 60rpx;
        }
    }
</style>