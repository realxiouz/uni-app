<template>
    <view>
        <form @submit="submitHouse">
            <view class='chooseseach'>
                <form>
                    <view class="search">
                        <text class="cuIcon-search"></text>
                        <input placeholder="请输入楼盘编号" v-model="keywords" @blur="inputBlur">
						<button type="primary" size="mini" v-if="!!keywords.toString()" @tap="searchKeywords">搜索</button>
                    </view>
                </form>
            </view>
            <view v-if="temArr.length" class="showchoose">
                <view v-for="(item, i) of temArr" :key="i">
                    <image :src="item" mode="aspectFit"></image>
                </view>
            </view>
			<view v-else class="showchoose" style="font-size: 18px;">请选择楼盘...</view>
            <view class="choosehouse" style="padding-top: 95rpx">
                <view class="chooselist">
                    <view v-if="!houseList.length" style="display: block; width: 180rpx; margin: 100rpx auto 0;">
                        <view class="text-xsl">
                            <text class="cuIcon-attentionforbidfill text-gray"></text>
                        </view>
                        <text class="text-gray">暂无数据</text>
                    </view>
                    <view @tap="pushToTem" v-else v-for="(item, index) of houseList"
                          :data-item="index" :key="index" :data-imgsrc="item.img" :data-id="item.id">
                        <view class="selectbox">
                            <text class="noselect iconfont iconxuanze" v-if="!item.isTrue"></text>
                            <text class="selected iconfont iconxianshi_xuanzetianchong" v-else style="color: #15a2e0"></text>
                        </view>
                        <view class="selecimg">
                            <image :src="item.img" mode="aspectFit"></image>
                        </view>
                        <view class="selectxt">
                            <text>{{item.name}}</text>
                        </view>
                    </view>
                </view>
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
    //操作数组
    Array.prototype.remove = function (val) {
        // this指向调用者数组;
        let Index = this.indexOf(val);
        if (Index > -1) {
            this.splice(Index, 1);
        }
    };
    export default {
        data() {
            return {
                recommendHt: '',
                houseList: [],
                temArr: [],
				page: 1,
				per_page: 10,
				total: '',
				last_page: '',
				keywords: '',
				isSearch: false,
                selectedHouse: [],
                beforeSearchList: []
            }
        },
        onLoad() {
            const self = this;
            uni.getSystemInfo({
                success(res) {
                    // self.statusBarHeight = res.statusBarHeight;
                    // 获取按钮的相关位置信息
                    /*let custom = wx.getMenuButtonBoundingClientRect();
                    app.globalData.Custom = custom;
                    app.globalData.CustomBar = custom.bottom + custom.top - res.statusBarHeight;*/
                }
            });
			this.getDate();
			
        },
		watch: {},
        computed: {
            ...mapState('ucenter', [
                'houseArr',
                'houseId',
                'currentInfo'
            ])
        },
		onReachBottom() {
			if (this.page < this.last_page) {
				++this.page;
				this.getDate();
			} else {
				uni.showToast({
					title: '数据已加载完毕',
					duration: 2000
				})
			}
		},
        methods: {
            ...mapMutations('ucenter', ['changeHouseId']),
            submitHouse() {
                uni.showLoading({
                    title: '提交中...',
                    duration: 1000,
                    mask: true
                });
                const self = this;
				let params = '';
				let len = self.houseId.length-1;
				for (let i=0; i<=len; i++) {
					let until = i === len? '': ',';
					params += self.houseId[i] + until;
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
			pushToTem(e, i) {
				// const self = this;
				const target = e.currentTarget.dataset;
				const index = target.item;
                const isTrue = this.houseList[index]['isTrue'];
                const imgSrc = target.imgsrc;
                if (this.temArr.length >= 10 && !isTrue) {
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
                    this.temArr.unshift(imgSrc);
                    this.selectedHouse.push(this.houseList[index]);
                    this.changeHouseId({
                        id: id,
                        isAdd: true
                    });
                } else {
                    let i = this.temArr.findIndex(val => val === imgSrc);
                    this.temArr.splice(i, 1);
                    this.selectedHouse.splice(i, 1);
                    this.changeHouseId({
                        index: i,
                        isAdd: false
                    });
                }
                /*this.houselist.forEach((ele, index) => {
                    if (e.currentTarget.dataset.item == index) {
                        self.houselist[index]['istrue'] = !ele.istrue;
                        if (ele.istrue) {
                            self.temarr.push(ele.id);
                            self.temarr = self.unique(self.temarr);
                        } else {
                            this.temarr.remove(ele.id);
                        }
                        if (this.temarr.length > 0) {
                            self.isshowtem = true;
                        } else {
                            self.isshowtem = false;
                        }
                        if (self.temarr.length > 10) {
                            self.temarr.remove(ele.id);
                            uni.showToast({
                                title: '最多只能选择10个楼盘！',
                                icon: 'none',
                                duration: 2000
                            });
                            self.houselist[index]['istrue'] = false;
                        }
                    }
                    this.temarr.sort();
                    this.changeHouseId(this.temarr);
                });*/
			},
			//去掉重复项
			unique(array) {
				let n = {}, r = [], Length = array.length, val, type;
				for (let i = 0; i < array.length; i++) {
					val = array[i];
					type = typeof val;
					if (!n[val]) {
						n[val] = [type];
						r.push(val);
					} else if (n[val].indexOf(type) < 0) {
						n[val].push(type);
						r.push(val);
					}
				}
				return r;
			},
			getDate() {
				const self = this;
				uni.showLoading({
                    title: '加载中...',
                    mask: true
                });
				let url =  `guestProjects?page=${this.page}&per_page=${this.per_page}`;
				url = this.isSearch? url+ `&keywords=${this.keywords}`: url;
				this.$http(url).then(res => {
				    uni.hideLoading();
					const data = res.data;
					self.total = res.total;
					self.last_page = res.last_page;
					let set = new Set(self.temArr);
                    data.forEach((ele, index) => {
                        let i = self.houseId.findIndex(id => Number(id) === Number(ele.id));
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
                    self.temArr = [...set];
					if (this.isSearch && this.page === 1) {
                        self.houseList = [...data];
					} else {
					    let list = [...self.houseList, ...data];
						self.houseList = list;
						if (!self.isSearch) {
                            self.beforeSearchList = JSON.parse(JSON.stringify(list));
                        }
					}
				}).catch(e => {
                    uni.hideLoading();
                })
			},
			searchKeywords() {
				this.isSearch = true;
				this.page = 1;
				this.getDate();
			},
            inputBlur() {
                if (this.keywords === '') {
                    this.isSearch = false;
                    this.houseList = this.beforeSearchList;
                }
            }
        }
    }
</script>

<style lang="scss">
    @import "choosehouse";
	.chooseseach {
		// #ifndef H5
		top: 0,
		// #endif
		// #ifdef H5
		top: 88rpx;
		// #endif
	}
	.showchoose {
		// #ifndef H5
		top: 90rpx;
		// #endif
		// #ifdef H5
		top: 179rpx;
		// #endif
	}
</style>
