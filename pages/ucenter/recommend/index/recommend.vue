<template>
    <view>
        <view class="recommend pd-left-right" :style="{'height': (style.height || recommendht) + 'px'}">
            <view class="prompt">提示：长按可删除楼盘,点击加号可添加楼盘</view>
            <view class="reclist pubpdtop">
                <view v-for="(item, index) of selectedhouse" @longpress="handleLongPress" :class="[item.istrue? 'on': '', list]" :data-touchindex="index" :key="index">
                    <view @tap.stop="deletitem" class="close iconshanchu iconfont" :data-deleteindex="index" :data-id="item.id"></view>
                    <view class="selectmask"></view>
                    <view :data-id="item.id" class="recoimg">
						<image :src="item.img" mode="widthFix" style="width: 100%; height: 100%;"></image>
					</view>
                    <view class="reco-txt">
                        {{item.name}}
                    </view>
                </view>
                <view @tap="openToChoose" class="cuIcon-add lg text-gray list">
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    import {header} from "../../../../utils/global-data";
    import {mapState} from 'vuex';
    import {BASE_URL} from "../../../../utils/const";

	export default {
        data() {
            return {
                style: {
                    height: 0
                },
                selectedhouse: []
            }
        },
        onLoad() {
            const self = this;
            uni.request({
                url: BASE_URL + '/api/geren/recommend',
                header: header(self.token),
                success(res) {
                    self.selectedhouse = res.data.data;
                }
            });
        },
        methods: {
            handleLongPress(e) {
                // 长按后350ms触发
                let touchIndex = e.currentTarget.dataset.touchindex;
				let index = this.selectedhouse.findIndex((ele, index) => {
					return touchIndex == index;
				})
                // 添加isTUR字段, true
                this.$set(this.selectedhouse[index], 'istrue', true);
            },
            openToChoose() {
                uni.navigateTo({
                    url: '../../choosehouse/index/choosehouse'
                })
            },
            deletitem(e) {
                const target = e.currentTarget.dataset;
                let deleteIndex = target.deleteindex;
                let id = target.id;
                // let temp = this.selectedhouse;
                const self = this;
                uni.showLoading({
                    title: '删除中...',
                    mask: true
                })
                uni.request({
                    url: BASE_URL + '/api/geren/deRecommend',
                    header: header(self.token),
                    method: 'POST',
                    data: {
                        houseid: id
                    },
                    success() {
                        self.selectedhouse.splice(deleteIndex, 1);
                        uni.hideLoading();
                        uni.showToast({
                            title: '删除成功',
                            icon: 'success',
                            duration: 1000,
                            position: 'center'
                        })
                    }
                })
                /*temp.forEach((ele, index) => {
                    if (deletindex == index) {
                    	// 删除项目, 但是不知道这里的交互怎么弄
                        uni.request({
                            url: BASE_URL + '/api/geren/deRecommend',
                            header: header(self.token),
                            method: "POST",
                            data: {
                                houseid: ele.id
                            },
                            success(res) {
                                console.log(res)
                            }
                        });
                        temp.splice(index, 1);
                    }
                });
                this.selectedhouse = temp;*/
            }
        },
        computed: {
            ...mapState(['token'])
        },
        mounted() {
            const self = this;
            uni.getSystemInfo({
                success(res) {
                    self.style.height = res.screenHeight
                }
            })
        }
    }
</script>

<style lang="scss">
    @import "recommend";
</style>
