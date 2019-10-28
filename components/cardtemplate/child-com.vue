<template>
    <view :class="['template', 'shadow', 'tm_'+ num]" id="template">
        <slot name="cancel"></slot>
        <view class="user-img">
            <image :src="currentUserInfo.avatar"></image>
        </view>
        <view class="card-content">
            <view class="card-content-top">
                <text class="big-title" style="font-size: 16px;font-weight: bold;">
                    {{currentUserInfo.name || ''}}
                </text>
                <text class="small-font">
                    {{currentUserInfo.position || ''}}
                </text>
            </view>
            <view class="card-content-bottom">
                <view class="small-font">
                    <view>
                        <text class="iconfont icongongsi"></text>
                        <text class="text"> {{currentUserInfo.companyname || ''}}</text>
                    </view>
                </view>
                <view class="small-font">
                    <view>
                        <text class="cuIcon-mobilefill"></text>
                        <text class="text">{{currentUserInfo.phone || ''}}</text>
                    </view>
                </view>
            </view>
        </view>
        <image :src="imgSrcGetters('template_' + num + '.png')" style="border-radius: 10rpx;"></image>
    </view>
</template>

<script>
	import {mapGetters} from 'vuex';
    export default {
        props: {
            currentUserInfo: {
                type: Object,
                required: true
            },
            num: {
                type: [String, Number],
                default: 0
            }
        },
		data() {
			return {
				userImg: {}
			}
		},
		watch: {},
		computed: {
			...mapGetters('ucenter', ['imgSrcGetters'])
		},
		mounted() {

		}
    };
</script>
<style lang="scss">
    .template {
        flex: 1;
        position: relative;
        height: 370rpx;
        border-radius: 10rpx;
        image {
            display: block;
            width: 100%;
            height: 100%;
        }
        .user-img {
            position: absolute;
            width: 120rpx;
            height: 120rpx;
            border-radius: 50%;
            border: 5rpx solid rgba(133, 133, 133, .1);
            z-index: 15;
            image {
                display: block;
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background: #fff;
            }
        }
        .card-content {
            z-index: 15;
            position: absolute;
            padding-left: 45rpx;
            padding-top: 45rpx;
            .card-content-top {
                padding-bottom: 60rpx;
                > text {
                    display: block;
                }
            }
            .card-content-bottom {
                > .small-font {
                    padding-bottom: 3px;
                    color: #fff;
                }
            }

            text {
                color: #fff;
            }
        ;
        }
        &.tm_0 {
            .user-img {
                right: 7px;
                top: 15px;
            }

            .card-content {
                position: absolute;
                top: 25%;
                color: #fff;
            }
        }
        &.tm_1 {
            .user-img {
                position: absolute;
                left: 39%;
            }

            .card-content-top {
                padding-bottom: 30rpx;
            }

            .card-content {
                position: absolute;
                top: 34%;
                color: #fff;
                right: 0;
                padding-right: 50rpx;
            }
        }
        &.tm_2 {
            .user-img {
                position: absolute;
                top: 35%;
                left: 28%;
            }

            .card-content {
                position: absolute;
                top: 10%;
                left: 49%;
                color: #fff;
            }
        }
        &.tm_3 {
            .user-img {
                position: absolute;
                top: 27%;
                left: 40%;
            }

            .card-content {
                position: absolute;
                top: 19%;
                left: 0;
                padding-right: 50rpx;
                color: black;
                text {
                    color: #000;
                }
            }
        }
    }
</style>
