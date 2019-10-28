<template>
    <view class="item-list" @tap="toDetail(bean.id)">
        <view class="news-img" v-if="bean.cover_image">
            <image :src="bean.cover_image" mode="aspectFill"></image>
        </view>
        <view class="content">
            <view class="title">{{bean.title}}</view>
            <view class="name-time">
                <view class="name">
                    <text v-for="(item, index) of bean.tags" :key="index*19" :class="classArray[index%3]">{{item.name}}</text>
                </view>
                <view class="create-time">{{processTime(bean.created_at)}}</view>
            </view>
            <view class="description">{{bean.description}}</view>
        </view>
    </view>
</template>

<script>
    import moment from 'moment';
    export default {
        data() {
            return {
                classArray: ['teal', 'cyan', 'light-blue']
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
            toDetail(id) {
                uni.navigateTo({
                    url: '/pages/news/detail/index?id='+id
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
        margin-bottom: 10rpx;
        background: #fff;
        .news-img {
            width: 100rpx;
            height: 100rpx;
            image {
                width: 100%;
                height: 100%;
            }
        }
        .content {
            flex: 1;
            margin-left: 10rpx;
            font-size: 14px;
            text-align: left;
            .title {
                font-weight: bold;
            }
            .name-time {
                display: flex;
                align-items: center;
                .cyan {
                    background: cyan;
                }
                .light-blue {
                    background: lightblue;
                }
                .teal {
                    background: teal;
                }
                .name {
                    text {
                        padding:2px;
                        margin-right:2px;
                        border-radius:2px;
                        color: #fff;
                    }
                }
                .create-time {
                    margin-left: 10rpx;
                    color: grey;
                    font-size: 12px;
                }
            }
            .description {

            }
        }
    }
</style>
