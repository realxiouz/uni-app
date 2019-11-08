<template>
    <view>
        <form @submit="submitHouse">
            <view class="selected-wrap">
                <view class='choose-search'>
                    <form style="display:block;">
                        <view class="search">
                            <text class="cuIcon-search"></text>
                            <input type="text" placeholder="请输入楼盘编号" v-model="keywords" confirm-type="search" @confirm="searchKeywords">
                            <button type="primary" size="mini" v-if="!!keywords.toString()" @tap="searchKeywords">搜索</button>
                        </view>
                    </form>
                </view>
                <view v-if="recommendHouse.length" class="show-choose">
                    <view v-for="(item, i) of recommendHouse" :key="i">
                        <image :src="item.img" mode="aspectFit"></image>
                    </view>
                </view>
                <view v-else class="show-choose" style="font-size: 18px;">请选择楼盘...</view>
            </view>
            <view style="padding: 180rpx 0 80rpx 0" class="choose-house">
                <data-list :r-data="rData" r-url="guestProjects" @data="handlerList" ref="list" :is-search="isSearch">
                    <view @tap="pushToTem" class="item" v-for="(item, index) of houseList" :data-item="index" :key="index" :data-imgsrc="item.img" :data-id="item.id">
                        <view class="select-box">
                            <text class="selected iconfont iconxianshi_xuanzetianchong" v-if="item.isTrue" style="color: #15a2e0"></text>
                            <text class="no-select iconfont iconxuanze" v-else></text>
                        </view>
                        <view class="select-img">
                            <image :src="item.img" mode="aspectFit"></image>
                        </view>
                        <view class="select-txt">
                            <text>{{item.name}}</text>
                        </view>
                    </view>
                </data-list>
            </view>
            <view class="choose-affirm">
                <button form-type="submit">
                    确认
                </button>
            </view>
        </form>
    </view>
</template>

<script>
    import {mapState, mapMutations} from 'vuex';
    import dataList from '@/components/load-more';

    export default {
        data() {
            return {
                recommendHt: '',
                houseList: [],
				keywords: '',
                rData: {},
                height: '100vh',
                isSearch: false
            }
        },
        onLoad() {
            const self = this;
            uni.getSystemInfo({
                success(res) {
                    self.height = res.windowHeight - 30 + 'px';
                }
            });
            this.$nextTick(_ => {
                this.$refs.list.getData(true);
            })
        },
		watch: {
            keywords(val) {
                if (!val) {
                    Reflect.deleteProperty(this.rData, 'keywords');
                    setTimeout(() => {
                        this.isSearch = false;
                    }, 100)
                }
            }
        },
        computed: {
            ...mapState('ucenter', ['recommendHouse'])
        },
        methods: {
            ...mapMutations('ucenter', ['changeRecommendHouse']),
            handlerList(list) {
                let self = this;
                if (!self.keywords) {
                    self.beforeSearchList = JSON.stringify(list);
                    self.page = self.$refs.list.page;
                    self.isEnd = self.$refs.list.isEnd;
                }
                let set = new Set(self.temArr);
                list.forEach((ele, index) => {
                    let i = self.recommendHouse.findIndex(id => Number(id.id) === Number(ele.id));
                    let boolean = i !== -1;
                    ele.isTrue = boolean;
                    boolean && set.add(ele.img);
                    Object.defineProperty(ele, 'isTrue', {
                        configurable: false,
                        writable: true,
                        enumerable: true,
                        value: boolean
                    });
                });
                self.houseList = list;
                self.temArr = [...set];
            },
            submitHouse() {
                uni.showLoading({
                    title: '提交中...',
                    duration: 1000,
                    mask: true
                });
                const self = this;
				let params = '';
				let len = self.recommendHouse.length-1;
				for (let i=0; i<=len; i++) {
					let until = i === len? '': ',';
					params += self.recommendHouse[i].id + until;
				}
				if (!params) {
				    uni.showToast({
                        title: '提交不能为空',
                        duration: 2500,
                        icon: 'none',
                        mask: true
                    });
				    return false;
                }
				this.$http('geren/recommendHouse', {houseid: params}).then(res => {
					if (res.code === 100) {
					    uni.hideLoading();
                        uni.showToast({
                            title: '提交成功...',
                            mask: true,
                            duration: 1000
                        });
					    //返回上一页面
					    setTimeout(() => {
                            uni.navigateBack({
                                delta: 1
                            });
                        }, 1200);
					} else {
					    uni.showToast({
					        title: '提交失败, 请检查网络重试',
					        mask: true,
					        duration: 2000
					    })
					}
				})
            },
			pushToTem(e) {
				const target = e.currentTarget.dataset;
				const index = target.item;
                const isTrue = this.houseList[index]['isTrue'];
                const imgSrc = target.imgsrc;
                if (this.recommendHouse.length >= 10 && !isTrue) {
                    uni.showToast({
                        title: '最多只能选择10个楼盘！',
                        icon: 'none',
                        duration: 2000
                    });
                    return false;
                }
                this.houseList[index]['isTrue'] = !isTrue;
                if (!isTrue) {
                    const id = target.id;
                    this.changeRecommendHouse({
                        id: id,
                        img: imgSrc,
                        isAdd: true
                    });
                } else {
                    let i = this.recommendHouse.findIndex(val => val.img === imgSrc);
                    this.changeRecommendHouse({
                        index: i,
                        isAdd: false
                    });
                }
			},
			searchKeywords() {
                this.isSearch = true;
                this.rData = {
				    keywords: this.keywords
                };
			}
        },
        components: {
            dataList
        },
        onReachBottom() {
            this.$refs.list.handlerUp();
        }
    }
</script>

<style lang="scss">
    @import "choosehouse";
	.selected-wrap {
        position: fixed;
        left: 0;
		// #ifndef H5
		top: 0;
		// #endif
		// #ifdef H5
		top: 88rpx;
		// #endif
        width: 100%;
        z-index: 1000;
	}
</style>
