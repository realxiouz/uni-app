<template>
	<view class="detail">
		<!--<view class="title">{{bean.title}}</view>
        <view class="content">
            <view class="name">
                <text v-for="(item, index) of bean.tags" :keys="index" :class="classArray[index%3]">{{item.name}}</text>
            </view>
            <view class="time">更新: {{processTime(bean.updated_at)}}</view>
        </view>-->
        <view class="main-body" v-html="bean.content">
            <web-view :src="src" :style="{width: width+'px', height: height+'px'}"></web-view>
        </view>
	</view>
</template>

<script>
    import moment from 'moment';
    import {BASE_URL} from "@/utils/const";

    export default {
		data() {
			return {
				bean: {
				    title: ''
                },
                classArray: ['teal', 'cyan', 'light-blue'],
                id: '',
                src: null,
                width: 0,
                height: 0
			}
		},
        onLoad(opt) {
		    this.id = opt.id;
		    this.src = BASE_URL + `/#/shop/news-detail/${opt.id}?main=1`;
		    const self = this;
            uni.getSystemInfo({
                success(e) {
                    self.width = e.windowWidth;
                    self.height = e.windowHeight;
                }
            })
		    /*this.$http('news/'+ opt.id).then(res => {
                this.bean = res;
            })*/
        },
		methods: {
            processTime(time) {
                return moment(time).format('YYYY-MM-DD');
            }
		}
	}
</script>

<style lang="scss" scoped>
    .detail {
        padding: 10rpx 20rpx;
    }
    .title {
        font-weight: bold;
        font-size: 18px;
        text-align: center;
    }
    .content {
        display: flex;
        justify-content: space-between;
        padding: 10rpx 0;
        .name {
            text {
                color: #fff;
                padding:2px;
                margin-right:2px;
                border-radius:2px;
            }
            .cyan {
                background: cyan;
            }
            .light-blue {
                background: lightblue;
            }
            .teal {
                background: teal;
            }
        }
        .time {
            text-align: right;
            color:#d9d9d9
        }
    }
    .main-body {
        height: 94vh;
        font-size: 14px;
        text-align: left;
        image {

        }
    }
</style>
