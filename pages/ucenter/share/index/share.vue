<template>
	<view>
		<view class="pubpdtop pd-left-right">
			<form>
				<view class="share-title">

				</view>
				<view class="share-content pubpdtop">
					<textarea v-model='cNames' class="radiusbox share-textarea" rows="3">

					</textarea>
				</view>
				<view class="btngrp">
					<button @tap="cNames = ''" class="cu-btn  bg-red button-hover">一键清空</button>
					<button @tap="generateCard" form-type="submit" class="cu-btn bg-cyan" data-target="bottomModal">
						分享名片
					</button>
				</view>
			</form>
		</view>
		<view :class="['cu-modal', 'bottom-modal', modalName === 'bottomModal'? 'show': '']">
			<view class="cu-dialog">
				<view class="padding-xl">
					<view class="sharetoobj">
						<view class="sharetoobj-list">
							<!--open-type="share"-->
							<!-- #ifdef MP-WEIXIN-->
							<button open-type="share"></button>
							<!-- #endif -->
							<!-- #ifdef APP-PLUS -->
							<button @tap="appShareFriend"></button>
							<!-- #endif -->
							<view>
								<image :src="imgSrcGetters('weixin.png')"></image>
							</view>
							<!--///////////////////////////////////////////////-->
							<text>分享给好友</text>
						</view>
						<view class="sharetoobj-list">
							<button @tap="showCard" data-target="bottomModal-0"></button>
							<view>
								<image :src="imgSrcGetters('pyq.png')"></image>
							</view>
							<text>分享到朋友圈</text>
						</view>
					</view>
				</view>
				<view class="pd-top-bottom bg-white btn-center" @tap="hideModal">
					取消
				</view>
			</view>
		</view>
		<view :class="['cu-modal', 'bottom-modal', modalName === 'bottomModal-0'? 'show': '']">
            <view class="cu-dialog">
                <view class="pd-left-right">
                    <view class="canvas-share" :style="{'width': canvasWidth + 'px'}">
                        <canvas class="shadow change-position" v-if="!showImage" canvas-id="share-card" :style="{'width': canvasWidth + 'px', 'height': canvasHeight + 'px'}"></canvas>
                        <image :src="saveImgSrc" v-else :style="{'width': canvasWidth + 'px', 'height': canvasHeight + 'px'}"></image>
                    </view>
                    <canvas v-if="!showSmallImage && isShowShare" canvas-id="share-sm" style="width: 157px;height: 140px"></canvas>
                    <view class="pd-top-bottom">
                        <button @tap="saveImage" class="btnwd cu-btn block bg-cyan" :data-temp="shareImg">保存到相册</button>
                    </view>
                </view>
                <view class="pd-top-bottom bg-white btn-center" @tap="hideModal">
                    取消
                </view>
            </view>
		</view>
	</view>
</template>

<script>
	import share from '../../../../common/share.js';
	import weiXinAuthorization from '../../../../utils/weixin-authorization'
	import {
		mapState,
		mapGetters,
        mapMutations
	} from 'vuex';

	export default {
		data() {
			return {
				cNames: '', // textarea 输入的内容, 用了v-model
				shareImg: '',
                saveImgSrc: '',
				waitTime: 2000,
				userImg: 'http://tmp/wxf4cb3f3f8140375b.o6zAJs9tFfgiDkgC14Cwqafvkpro.qrMdvH8GyKfC5d5ce01576d6a35828f6c6767a5656c2.jpeg',
				canvasWidth: '', //canvas宽
				canvasHeight: '', //canvas高
				currentBgNum: 0,
				modalName: '',
				templateStyle: false, // 默认显示一个名片模板
				isShowCardContent: false, //名片内容的显隐
				isExeCuteCanvas: false, //在还没点击的时候不执行子组件里的分享
				temUrl: '',
				qrcode: '',
				isDisabled: true,
				canvasWd: 0,
				canvasHt: 0,
                showImage: false,
                showSmallImage: false,
                isRepeatDraw: true,
                isShowShare: true
			}
		},
		watch: {
            saveImgSrc(data) {
                this.showImage = Boolean(data);
            },
            shareImg(data) {
                this.showSmallImage = Boolean(data);
            }
        },
		onLoad() {
			/*const self = this;*/
			/*this.$http('geren/qrcode', {
				fuid: self.userInfo.id
			}).then(res => {
				self.isDisabled = false; // 恢复按钮的功能
				self.cNames = res.cname;
				// #ifndef H5 
				let array = uni.base64ToArrayBuffer(res.data);
				let base64 = uni.arrayBufferToBase64(array);
				if (res.statusCode == 200) {
					self.qrcode = 'data:image/jpeg;base64,' + base64 // data 为接口返回的base64字符串
				}
				// #endif
			});*/
			// canvas
			let screenwd = uni.getSystemInfoSync().windowWidth;
			let screenht = uni.getSystemInfoSync().windowHeight;
			this.canvasWd = this.canvasWidth = screenwd - 20 * 1.9;
			this.canvasHt = this.canvasHeight = screenht * .23;
			this.currentBgNum = this.currentInfo.template_id || 1;
			// 为画布设置宽高
			this.canvasWidth = this.canvasWd;
			this.canvasHeight = this.canvasHt;
			//获取当前显示的名片背景索引
			// console.log(this.canvasWidth, this.canvasHeight, this.currentBgNum);
		},
		methods: {
		    ...mapMutations('ucenter', ['changeImg']),
            async generateCard(e) {
                if (!Reflect.has(this.currentInfo, 'id')) return false;
                uni.showLoading({
                    title: '生成中...'
                });
                let avatar = this.currentInfo.avatar;
                avatar = avatar.replace('http://', 'https://');
                let imgDownload = [
                    {
                        key: 'img_avatar',
                        src: avatar || this.defaultAvatar
                    },
                    {
                        key: 'img_phone',
                        src: this.imgSrcGetters('phone_white.png')
                    },
                    {
                        key: 'img_company',
                        src: this.imgSrcGetters('companyicon_white.png')
                    },
                    {
                        key: 'img_bg',
                        src: this.imgSrcGetters(`template_${this.currentInfo.template_id || 0}.png`)
                    },
                    {
                        key: 'img_company_black',
                        src: this.imgSrcGetters(`companyicon_black.png`)
                    },
                    {
                        key: 'img_phone_black',
                        src: this.imgSrcGetters('phone_back.png')
                    }
                    /*{
                        key: 'img_large_bg',
                        src: this.imgSrcGetters('card-mask.png')
                    }*/
                ];
                let trouble = false;
                for (let item of Object.values(imgDownload)) {
                    let _key = item.key;
                    if (!this.downLoadImg[_key]) {
                        await share.loading(item.src).then(res => {
                            this.isRepeatDraw = true;
                            this.changeImg({key: _key, url: res.tempFilePath});
                        }).catch(err => {});
                    }
                    if (_key === 'img_bg' && !this.downLoadImg['img_bg']) {
                        trouble = true;
                        uni.hideLoading();
                        uni.showToast({
                            title: '网络连接失败, 请检查网络后重试...',
                            duration: 2500,
                            icon: 'none',
                            mask: true
                        })
                    }
                }
                if (trouble) return false;
                // 为画布设置宽高, 在点击取消的时候会清除
                this.canvasWidth = this.canvasWd;
                this.modalName = e.currentTarget.dataset.target;
                if (!this.isRepeatDraw) {
                    this.showSmallImage = true;
                    this.showImage = true;
                    this.isShowShare = true;
                    return false;
                }
                // 绘制canvas图片
                const ctx = uni.createCanvasContext('share-card');
                const cardSm = uni.createCanvasContext('share-sm');
                this.currentBgNum = this.currentInfo.template_id;
                share.canvas.call(this, e, ctx, cardSm);
                uni.hideLoading();
            },
			appShareFriend() {
				// #ifdef APP-PLUS
				const self = this;
				uni.share({
					provider: "weixin",
					scene: "WXSceneSession",
					type: 0,
					title: '11111',
					href: "http://uniapp.dcloud.io/",
					summary: "房销客管理系统，管理您的客户，提高您的业绩！",
					imgUrl: self.shareImg,
					success(res) {
						console.log(res);
					},
					fail(error) {
						console.log(erros)
					}
				});
				// #endif
			},
			saveImage() {
				// 保存图片
                const self = this;
				if (self.saveImgSrc) {
					uni.saveImageToPhotosAlbum({
						filePath: self.saveImgSrc,
						success(res) {
							if (/saveImageToPhotosAlbum:ok/.test(res.errMsg)) {
								uni.showToast({
                                    title: '保存成功',
                                    duration: 1000
                                });
								self.hideModal();
							}
						},
						fail(err) {
                            weiXinAuthorization.saveImg(err);
						}
					})
				}
			},
			showCard(e) {
				// 分享卡片
				this.modalName = e.currentTarget.dataset.target;
			},
			hideModal() {
				this.modalName = null;
				this.isShowShare = false;
                this.showImage = false;
                this.showSmallImage = false;
			}
		},
		computed: {
			...mapState('ucenter', ['currentLoginUserInfo', "downLoadImg", 'currentInfo']),
			...mapState(['userInfo', 'defaultAvatar']),
			...mapGetters('ucenter', ['imgSrcGetters'])
		},
		onShareAppMessage(res) {
			// 分享
            return {
				title: this.cNames,
				path: '/pages/ucenter/businesscard/index/businesscard?uidx='+ this.userInfo.id,
				imageUrl: this.shareImg
			}
		},
        mounted() {
            this.cNames = `您好，我是${this.currentInfo.name}。这是我的名片，请惠存`;
        }
	}
</script>

<style lang="scss">
	@import 'share';
</style>
