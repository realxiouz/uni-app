<template>
    <view>
        <view class="record-contentactive" :data-num="num">
            <view class="pd-left-right browse-content-title">
                共有 <text class="cordecunt">{{recording}}</text> 条{{num === 2? '浏览': '转发'}}记录
            </view>

            <view :class="classType">
                <view class="pd-left-right" v-for="(item, index) of userArr" :key="index">
                    <view class="brows-both">
                        <image class="cu-avatar lg round" :src="item.browseuser.avatar || defaultAvatar"></image>
                    </view>
                    <view class="brows-middle">
                        <view class="brows-content">
                            <view class="username">{{item.browseuser.name || ''}}</view>
                            <view class="browstime">{{item.ctime || ''}}</view>
                        </view>
                    </view>
                    <view class="brows-both">
                        <view class="brows-cunt">
                            {{item.count || '0'}}
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>
<script>
    import {mapState} from 'vuex';
    export default {
        data() {
            return {

            }
        },
        props: {
            classType: {
                type: String,
                default: 'transmit'
            },
            userArr: {
                type: Array,
                default() {
                    return []
                }
            },
            num: {
                type: Number,
                required: true,
                default: 2
            },
            recording: {
                type: [String, Number],
                default: 0
            }
        },
        computed: {
            ...mapState(['defaultAvatar'])
        },
        mounted() {
			
        }
    }
</script>
<style lang="scss">
    /* css样式在../index/browsercount.scss的末尾*/
	.browse-content-title {
		padding: 0 31.2rpx 26rpx 31.2rpx;
	}
	.brows-list, transmit {
		> view {
			display: flex;
			flex-wrap: nowrap;
			padding: 0 31.2rpx 26rpx 31.2rpx;
			margin-bottom: 26rpx;
			border-bottom: 1px solid #e3e3e3;
			.brows-middle {
				flex: 1;
				padding-left: 26rpx;
				view {
					padding-bottom: 10rpx;
				}
			}
		}	
	}
</style>