<template>
    <view>
        <view class="recommend pd-left-right" :style="{'height': (style.height || recommendht) + 'px'}">
            <view class="prompt">提示：长按可删除楼盘,点击加号可添加楼盘</view>
            <view class="reclist pubpdtop">
                <view v-for="(item, index) of selectedHouse" @longpress="handleLongPress" :class="[item.istrue? 'on': '', list]" :data-touchindex="index" :key="index">
                    <view @tap.stop="deleteItem" class="close iconshanchu iconfont" :data-deleteindex="index" :data-id="item.id"></view>
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
    import {mapState, mapMutations} from 'vuex';

	export default {
        data() {
            return {
                style: {
                    height: 0
                },
                selectedHouse: [],
				recommendht: '',
				list: ''
            }
        },
		onShow() {
            console.log('111');
            const self = this;
			this.$http('geren/recommend').then(res => {
				self.selectedHouse = res.data;
			})
		},
        onLoad() {},
        onUnload() {
            let arr = JSON.parse(JSON.stringify(this.selectedHouse));
            this.changeCurrentLoginUserInfo({house: arr});
        },
        methods: {
            ...mapMutations('ucenter', ['changeCurrentLoginUserInfo']),
            handleLongPress(e) {
                // 长按后350ms触发
                let touchIndex = e.currentTarget.dataset.touchindex;
				let index = this.selectedHouse.findIndex((ele, index) => {
					return touchIndex == index;
				});
                // 添加isTUR字段, true
                this.$set(this.selectedHouse[index], 'istrue', true);
            },
            openToChoose() {
                uni.navigateTo({
                    url: '../../choosehouse/index/choosehouse'
                })
            },
            deleteItem(e) {
                const target = e.currentTarget.dataset;
                let deleteIndex = target.deleteindex;
                let id = target.id;
                // let temp = this.selectedHouse;
                const self = this;
                uni.showLoading({
                    title: '删除中...',
                    mask: true
                });
				this.$http('geren/deRecommend', {houseid: id}, 'post').then(res => {
                    self.selectedHouse.splice(deleteIndex, 1);
                    uni.hideLoading();
                    uni.showToast({
					    title: '删除成功',
					    icon: 'success',
					    duration: 1000,
					    position: 'center'
					})
				}).catch(err => {
					uni.hideLoading();
				})
            }
        },
        computed: {
            ...mapState('ucenter', ['currentLoginUserInfo'])
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
