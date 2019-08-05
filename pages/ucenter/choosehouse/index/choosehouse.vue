<template>
    <view>
        <form @submit="submitHouse">
            <view class='chooseseach'>
                <form action="">
                    <view class="search">
                        <text class="cuIcon-search"></text>
                        <input placeholder="请输入楼盘编号" value=""></input>
                    </view>
                </form>
            </view>
            <view v-if="isShowTem" class="showchoose">
                <view v-for="(item, i) of temarr" :key="i">
                    <image :src="item" mode="aspectFit"></image>
                </view>
            </view>
            <view class="choosehouse" :style="{'padding-top': isShowTem? '95rpx': ''}">
                <view class="chooselist">
                    <view @tap="pushToTem" v-for="(item, index) of houselist" :class="[item.istrue? 'on': '']"
                          :data-item="index" :key="index" :data-imgsrc="item.project.img" :data-id="item.id">
                        <view class="selectbox">
                            <text class="noselect iconfont iconxuanze"></text>
                            <text class="selected iconfont iconxianshi_xuanzetianchong" style="color: #15a2e0"></text>
                        </view>
                        <view class="selecimg">
                            <image :src="item.project.img" mode="aspectFit"></image>
                        </view>
                        <view class="selectxt">
                            <text>{{item.project.name}}</text>
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
    import {BASE_URL} from "../../../../utils/const";
    import {header} from "../../../../utils/global-data";
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
                ofIsShowTem: [],
                houselist: [],
                isShowTem: false,
                temarr: []
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
            })
            uni.request({
                url: BASE_URL + '/api/guestProjects',
                header: header(self.token),
                method: "GET",
                success(res) {
                    const data = res.data.data;
                    self.changeHouseArr(data);
                    self.houselist = data;
                    self.houselist.forEach((ele, index) => {
                        ele.istrue = false;
                        Object.defineProperty(ele, 'istrue', {
                            configurable: false,
                            writable: true,
                            enumerable: true,
                            value: false
                        });
                    });
                }
            })
        },
        computed: {
            ...mapState([
				'token',
                'housearr',
                'houseid'
            ])
        },
        methods: {
            ...mapMutations([
                'changeHouseArr',
                'changeHouseId'
            ]),
            submitHouse() {
                // this.onReady(),
                const self = this;
                uni.request({
                    url: BASE_URL + '/api/geren/recommendHouse',
                    header: header(self.token),
                    data: {
                        houseid: self.houseid
                    },
                    success(res) {
                        if (res.data.code === 100) {
                            //返回上一页面
                            uni.navigateBack({
                                delta: 1
                            });
                        } else {
                            uni.showToast({
                                title: '提交失败, 请检查网络重试',
                                mask: true,
                                duration: 2000
                            })
                        }
                    }
                });
                // wx.redirectTo({
                //     url:'../recommend/recommend'
                // });

                //刷新当前页面的数据
                /*if (getCurrentPages().length != 0) {
                    getCurrentPages()[getCurrentPages().length - 1].onLoad()
                }*/

            },
			pushToTem(e, i) {
				// const self = this;
				const target = e.currentTarget.dataset;
				const index = target.item;
                const isTrue = this.houselist[index]['istrue'];
                const imgSrc = target.imgsrc;
                if (this.temarr.length >= 10 && !isTrue) {
                    uni.showToast({
                        title: '最多只能选择10个楼盘！',
                        icon: 'none',
                        duration: 2000
                    });
                    return false;
                }
                this.houselist[index]['istrue'] = !isTrue;
                if (!isTrue) {
                    const id = target.id;
                    this.temarr.unshift(imgSrc);
                    this.changeHouseId({
                        id: id,
                        isAdd: true
                    });
                    console.log(id);
                    this.isShowTem = true;
                } else {
                    let i = this.temarr.findIndex(val => val === imgSrc);
                    this.temarr.splice(i, 1);
                    console.log(i);
                    this.changeHouseId({
                        index: i,
                        isAdd: false
                    });
                    this.isShowTem = Boolean(this.temarr.length >= 1);
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
			}
        }
    }
</script>

<style lang="scss">
    @import "choosehouse";
</style>
