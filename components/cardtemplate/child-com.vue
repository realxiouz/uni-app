<template>
    <view :class="['template', 'shadow', 'tm_'+ num]" id="template">
        <slot name="cancel"></slot>
        <view class="user-img">
            <image :src="currentUserInfo.avatar"></image>
        </view>
        <view class="cardcontent">
            <view class="cardcontent-top">
                <text class="bigtitle" style="font-size: 16px;font-weight: bold;">
                    {{currentUserInfo.name || ''}}
                </text>
                <text class="smallfont">
                    {{currentUserInfo.position || ''}}
                </text>
            </view>
            <view class="cardcontent-bottom">
                <view class="smallfont">
                    <view>
                        <text class="iconfont icongongsi"></text>
                        <text class="text"> {{currentUserInfo.companyname || ''}}</text>
                    </view>
                </view>
                <view class="smallfont">
                    <view>
                        <text class="iconfont iconshouji"></text>
                        <text class="text">{{currentUserInfo.phone || ''}}</text>
                    </view>
                </view>
            </view>
        </view>
        <image :src="imgSrcGetters('template_' + num + '.png')"></image>
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
    @import "../../common/publicscss/scss/_link.scss";
    .template {
        @include flex-x(1);
        position: relative;
        height: 370rpx;
        @include img100;
        @include boderradius($radius);

        .user-img {
            position: absolute;
            width: rpx(120);
            height: rpx(120);
            @include boderradius(50%);
            border: solid rpx(5) rgba($gray, .1);
            @include imgauto;
            z-index: 15;

            image {
                @include boderradius(50%);
                background: #fff;
            }
        }

        .cardcontent {
            z-index: 15;
            position: absolute;
            padding-left: rpx(45);
            padding-top: rpx(45);

            .cardcontent-top {
                padding-bottom: rpx(60);

                > text {
                    display: block;
                }
            }

            .cardcontent-bottom {
                > .smallfont {
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

            .cardcontent {
                @include center(centerY, -40%);
                color: $white;
                left: 0;
            }
        }

        &.tm_1 {
            .user-img {
                @include center(centerX, -50%);
            }

            .cardcontent-top {
                padding-bottom: rpx(30);
            }

            .cardcontent {
                @include center(centerY, -20%);
                color: $white;
                right: 0;
                padding-right: rpx(50);
            }
        }

        &.tm_2 {
            .user-img {
                // @include center(centerY, -50%);
                // left: 220rpx;
				position: absolute;
				top: 35%;
				left: 28%;
            }

            .cardcontent {
                // @include center(centerY, -50%);
				position: absolute;
				top: 10%;
				left: 49%;
                color: $white;
                // right: 0;
                // padding-right: 60rpx;
            }
        }

        &.tm_3 {
            .user-img {
                @include center(centerY, -80%);
                right: rpx(270);
            }

            .cardcontent {
                @include center(centerY, -50%);
                color: $black;
                left: 0;
                padding-right: rpx(50);

                text {
                    color: #000;
                }
            }
        }
    }
</style>
