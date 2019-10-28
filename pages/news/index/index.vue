<template>
	<view :style="{'height': height}">
        <data-list r-url="news" @data="handlerList" ref="list">
            <item v-for="(i, inx) of newsList" :key="inx" :bean="i" />
        </data-list>
    </view>
</template>

<script>
    import dataList from '@/components/data-list';
    import item from '../components/item';
	export default {
		data() {
			return {
				newsList: [],
                classArray: ['teal', 'cyan', 'light-blue'],
                height: '100vh'
			}
		},
        components: {
		    item,
            dataList
        },
        onLoad() {
            const self = this;
            uni.getSystemInfo({
                success(e) {
                    self.height = e.windowHeight + 'px';
                }
            });
            self.$nextTick(_ => {
                self.$refs.list.getData(true);
            });
        },
		methods: {
            handlerList(list) {
			    this.newsList = list;
            },
            toDetail(id) {
                uni.navigateTo({
                    url: '/pages/news/detail/index?id='+id
                })
            }
		},
        computed: {}
	}
</script>

<style lang="scss" scoped>
    .item-list {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 10rpx 20rpx;
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
                display: inherit;
                .cyan {
                    color: cyan;
                }
                .light-blue {
                    color: lightblue;
                }
                .teal {
                    color: teal;
                }
                .name {
                    text {
                        color: #fff;
                        padding:2px;
                        margin-right:2px;
                        border-radius:2px;
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
