<template>
    <view class="item-list" @tap="toDetail(bean.id, bean.title)">
        <view class="content">
            <view class="title">{{bean.title}}</view>
            <view class="name-time">
                <view class="name">
                    <text v-for="(item, index) of bean.tags" :key="index*19">{{item.name}}</text>
                </view>
            </view>
            <view class="create-time">{{processTime(bean.created_at)}}</view>
        </view>
        <view class="news-img" v-if="bean.cover_image">
            <image :src="bean.cover_image" mode="aspectFill"></image>
        </view>
    </view>
</template>

<script>
    import moment from 'moment';
    export default {
        data() {
            return {

            }
        },
        props: {
            bean: {
                type: Object,
                required: true
            }
        },
        methods: {
            processTime(time) {
                return moment(time).format('MM:DD');
            },
            toDetail(id, title) {
                uni.navigateTo({
                    url: '/pages/news/detail/index?id='+id + '&title='+ title
                })
            }
        },
        mounted() {}
    }
</script>

<style lang="scss" scoped>
    .item-list {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 10rpx 20rpx;
        margin-bottom: 30rpx;
        background: #fff;
        border-radius: 10rpx;
        .news-img {
            width: 100rpx;
            height: 100rpx;
            image {
                width: 100%;
                height: 100%;
                border-radius: 8rpx;
            }
        }
        .content {
            flex: 1;
            margin-left: 10rpx;
            font-size: 14px;
            text-align: left;
            .title {
                padding: 10rpx 0;
                font-size: 18px;
                font-weight: bold;
            }
            .name-time {
                display: flex;
                align-items: center;
                .name {
                    text {
                        padding: 2px;
                        margin-right: 8px;
                        border: 1px solid darkgrey;
                        border-radius: 1px;
                        color: darkgrey;
                    }
                }
            }
            .create-time {
                padding: 10rpx 0;
                color: grey;
                font-size: 12px;
                text-align: left;
            }
        }
        .name-time {
            .name {
                text {
                    font-size: 12px;
                }
            }
        }
    }
</style>
