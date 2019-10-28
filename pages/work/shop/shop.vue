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
            <view class="tabs">
                <view v-for="(item, index) of tabs" :key="index" class="w24">
                    <view class="cu-btn radius shadow grey text-white" style="width: 100%;background: #1976D2;" @tap="jump(item.path, item.isLogin)">{{item.text}}</view>
                </view>
            </view>
            <view class="news">
                <view class=" text-center radius text-white news-title bg-cyan">资讯:</view>
                <view class="news-content">
                    <swiper :autoplay="true" :duration="1000" :disable-touch="true" :vertical="true" :circular="true" :style="{height: '40rpx', 'font-size': '15px'}">
                        <swiper-item v-for="(item, index) of newsList" @tap="toDetail(item.id)" :key="index">{{item.title}}</swiper-item>
                    </swiper>
                </view>
            </view>
            <item v-for="(item, index) of list" :bean="item" :key="index"></item>
        </data-list>
    </view>
</template>

<script>
    import dataList from '@/components/data-list';
    import item from '@/pages/project/list/components/project';
    import {mapState} from 'vuex';

    export default {
        name: 'shop-id',
        data() {
            return {
                list: [],
                rUrl: 'project/shop',
                bannerList: [],
                rData: {},
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
                recommend: 1,
                newsList: [],
                windowHeight: 0,
                isFirst: true
            }
        },
        components: {
            dataList,
            item
        },
        watch: {
            list(data) {
                let len = data.length;
                let ifMoreThen = (this.scrollHeight / len) < 170;
                this.scrollHeight = ifMoreThen? 170*len: this.scrollHeight;
            }
        },
        methods: {
            handlerList(list) {
                this.list = list;
                if (this.isFirst) {
                    this.searchBeforeList = JSON.stringify(list);
                    this.page = this.$refs.list.page;
                    this.isEnd = this.$refs.list.isEnd;
                }
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
            }
        },
        computed: {
            ...mapState('project', ['shopId']),
            ...mapState(['isH5', 'projectDefaultImg', 'token']),
        },
        mounted() {
            this.$http('carousels', {per_page: 4, company_id: this.shopId}).then(res => {
                this.bannerList = res.data;
            });
            this.$http('news', {per_page: 10, company_id: this.shopId}).then(res => {
                this.newsList = res.data;
            });
            this.rData = {
                recommend: 1,
                shop_id: this.shopId
            };
            this.$nextTick(_ => {
                this.$refs.list.getData(true);
            })
            const self = this;
            uni.getSystemInfo({
                success(e) {
                    self.windowHeight = e.windowHeight;
                }
            })
        }
    };
</script>

<style scoped lang="scss">
    .tabs {
        display: flex;
        justify-content: space-between;
        margin-top: 10rpx;
    }
    .w24 {
        width: 24%;
    }
    .news {
        margin: 10rpx 0;
        background: #fff;
        .news-title {
            padding: 10rpx 20rpx;
        }
        display: flex;
        align-items: center;
        height: 60rpx;
        .news-content {
            flex: 1;
            height: 40rpx;
            padding-left: 20rpx;
            overflow: hidden;
        }
    }
</style>
