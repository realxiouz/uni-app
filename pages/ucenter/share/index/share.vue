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
					<button form-type="reset" class="cu-btn  bg-red button-hover">一键清空</button>
					<button @tap="generateCard" :disabled="isDisabled" form-type="submit" class="cu-btn bg-cyan" data-target="bottomModal">
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
						<canvas class="shadow change-position" canvas-id="sharecard" :style="{'width': canvasWidth + 'px', 'height': canvasHeight + 'px'}">
						</canvas>
					</view>
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
	import {
		BASE_URL
	} from "../../../../utils/const";
	import share from '../../../../utils/share.js';
	import {
		header
	} from "../../../../utils/global-data";
	import {
		mapState,
		mapGetters
	} from 'vuex';

	export default {
		data() {
			return {
				cNames: '', // textarea 输入的内容, 用了v-model
				shareImg: '',
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
				canvasHt: 0
			}
		},
		watch: {},
		onLoad() {
			const self = this;
			this.$http('geren/qrcode', {
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
			})
			// canvas
			let screenwd = uni.getSystemInfoSync().windowWidth;
			let screenht = uni.getSystemInfoSync().windowHeight;
			this.canvasWd = this.canvasWidth = screenwd - 20 * 1.9;
			this.canvasHt = this.canvasHeight = screenht * .23;
			this.currentBgNum = this.currentUserInfo.template_id || 1;
			// 为画布设置宽高
			this.canvasWidth = this.canvasWd;
			this.canvasHeight = this.canvasHt;
			//获取当前显示的名片背景索引
			// console.log(this.canvasWidth, this.canvasHeight, this.currentBgNum);
		},
		methods: {
			generateCard(e) {
				const self = this;
				// 规则, 限定字符长度
				if (this.currentUserInfo.companyname.length > 10) {
					this.currentUserInfo.companyname = this.currentUserInfo.companyname.substring(0, 9) + '...'; //控制显示9个字符+....；
				}
				if (this.currentUserInfo.name.length > 10) {
					this.currentUserInfo.name = this.currentUserInfo.name.substring(0, 9) + '...'; //控制显示9个字符+....；
				}
				// 小图标地址
				///static/images/publicimg/companyicon_white.png
				let icon = {
					companyIconWhite: this.imgSrcGetters('companyicon_white.png'),
					companyIconBlack: this.imgSrcGetters('companyicon_black.png'),
					phoneWhite: this.imgSrcGetters('phone_white.png'),
					phoneBlack: this.imgSrcGetters('phone_black.png')
				};
				// 小图标地址end
				let bgPath = [
					this.imgSrcGetters('template_0.png'),
					this.imgSrcGetters('template_1.png'),
					this.imgSrcGetters('template_2.png'),
					this.imgSrcGetters('template_3.png')
				];
				// 绘制canvas图片 end
				let ctx = uni.createCanvasContext('sharecard');
				this.canvasWidth = this.canvasWd;
				this.canvasHeight = this.canvasHt;
				this.canvasWidth = this.canvasWidth / 1.3;
				this.canvasHeight = (4 * this.canvasWidth) / 5;
				let actualCanvasWidth = this.canvasWidth * 0.9;
				let actualCanvasHeight = actualCanvasWidth * 0.6;
				let x = (this.canvasWidth - actualCanvasWidth) / 2;
				let y = (this.canvasHeight - actualCanvasHeight) / 2;
				let y1 = y + actualCanvasHeight;
				share.loading(this.userInfo, e, false).then(data => {
					self.userImg = data.tempFilePath;
					share.roundRect(ctx, 0, 0, this.canvasWidth, this.canvasHeight, 5);
					// 绘制文本
					// this.currentBgNum = 2;
					switch (Number(this.currentBgNum)) {
						case 0:
							{
								ctx.fill('#fff');
								ctx.drawImage(bgPath[0], x, y, actualCanvasWidth, actualCanvasHeight);
								ctx.drawImage(this.userImg, actualCanvasWidth - 20, y1 - 40, 30, 30);
								// ctx.drawImage(this.qrcode, actualCanvasWidth - 20, actualCanvasHeight - 40, 30, 30);
								ctx.setFontSize(15);
								ctx.fillText(this.currentUserInfo.name, 27, y1 / 2.3);
								ctx.setFontSize(13);
								ctx.fillText(this.currentUserInfo.position, 30, y1 / 1.8);
								ctx.setFontSize(10);
								ctx.fillText(this.currentUserInfo.companyname, 50, y1 / 1.3);
								ctx.drawImage(icon.companyIconWhite, 30, y1 / 1.45, 14, 14);
								ctx.drawImage(icon.phoneWhite, 30, y1 / 1.22, 15, 15);
								ctx.fillText(this.currentUserInfo.mobile, 50, y1 / 1.12); 
								// ctx.draw() 不可以在这里写这行, 如果写了会出现不会显示的问题
							}
							break;
						case 1:
							{
								ctx.fill('#fff');
								ctx.drawImage(bgPath[1], x, y, actualCanvasWidth, actualCanvasHeight);
								ctx.drawImage(this.userImg, actualCanvasWidth - 65, 34, 30, 30);
								ctx.setFontSize(15);
								ctx.fillText(this.currentUserInfo.name, actualCanvasWidth * .58, actualCanvasHeight / 1.4);
								ctx.setFontSize(13);
								ctx.fillText(this.currentUserInfo.position, actualCanvasWidth * .58, actualCanvasHeight / 1.2);
								ctx.setFontSize(10);
								ctx.drawImage(icon.companyIconWhite, actualCanvasWidth * .56, actualCanvasHeight / 1.02, 12, 12);
								ctx.fillText(this.currentUserInfo.companyname, actualCanvasWidth * .62, actualCanvasHeight / 0.945);
								ctx.drawImage(icon.phoneWhite, actualCanvasWidth * .56, actualCanvasHeight / 0.9, 12, 12);
								ctx.fillText(this.currentUserInfo.mobile, actualCanvasWidth * .61, actualCanvasHeight / 0.84);
							}
							break;
						case 2:
							{
								console.log(this.currentUserInfo.name, this.currentUserInfo);
								ctx.fill('#fff');
								ctx.drawImage(bgPath[2], x, y, actualCanvasWidth, actualCanvasHeight);
								ctx.drawImage(this.userImg, actualCanvasWidth * .35, actualCanvasHeight - 50, 30, 30);
								// ctx.drawImage(this.qrcode, actualCanvasWidth * .1, y1 - 40, 30, 30);
								ctx.setFontSize(15);
								ctx.fillText(this.currentUserInfo.name, actualCanvasWidth * .60, actualCanvasHeight / 2.2);
								ctx.setFontSize(13);
								ctx.fillText(this.currentUserInfo.position, actualCanvasWidth * .60, actualCanvasHeight / 1.7);
								ctx.setFontSize(10);
								ctx.fillText(this.currentUserInfo.companyname, actualCanvasWidth * .67, actualCanvasHeight / 1.215)
								ctx.drawImage(icon.companyIconWhite, actualCanvasWidth * .60, actualCanvasHeight / 1.35, 12, 12);
								ctx.drawImage(icon.phoneWhite, actualCanvasWidth * .60, actualCanvasHeight / 1.1, 12, 12);
								ctx.fillText(this.currentUserInfo.mobile, actualCanvasWidth * .67, actualCanvasHeight / 1.015);
							}
							break;
						case 3:
							{
								ctx.fill('#fff');
								ctx.drawImage(bgPath[3], x, y, actualCanvasWidth, actualCanvasHeight);
								ctx.drawImage(this.userImg, actualCanvasWidth - 20, y1 - 40, 30, 30);
								ctx.fillRect(actualCanvasWidth - 10,  actualCanvasHeight - 40, 30, 30);
								ctx.setFillStyle('#fff');
								// ctx.drawImage(this.qrcode, actualCanvasWidth - 20, actualCanvasHeight - 40, 30, 30);
								ctx.setFontSize(15);
								ctx.fillStyle = 'black';
								ctx.fillText(this.currentUserInfo.name, 27, y1 / 1.95);
								ctx.setFontSize(13);
								ctx.fillStyle = 'black';
								ctx.fillText(this.currentUserInfo.position, 27, y1 / 1.65);
								ctx.setFontSize(10);
								ctx.fillStyle = 'black';
								ctx.fillText(this.currentUserInfo.companyname, 40, y1 / 1.34);
								ctx.drawImage(icon.companyIconBlack, 27, y1 / 1.47, 12, 12);
								ctx.drawImage(icon.phoneBlack, 27, y1 / 1.24, 12, 12);
								ctx.fillText(this.currentUserInfo.mobile, 40, y1 / 1.14);
								ctx.fillStyle = 'black';
							}
					}
					// 绘制文本 end
					// 统一处理switch里的ctx
					ctx.draw(true, setTimeout(function() {
						uni.canvasToTempFilePath({
							x: 0,
							y: 0,
							width: self.canvasWidth,
							height: self.canvasHeight,
							canvasId: 'sharecard',
							success(res) {
								self.shareImg = res.tempFilePath;
								self.modalName = e.currentTarget.dataset.target;
							},
							fail(err) {
								console.log(err);
							}
						})
					}, 500))

				})
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
				if (this.shareImg) {
					uni.saveImageToPhotosAlbum({
						filePath: this.shareImg,
						success(res) {
							if (/saveImageToPhotosAlbum:ok/.test(res.errMsg)) {
								uni.navigateBack({
									delta: 1
								})
							}
						},
						fail(err) {
							if (err.errMsg === "saveImageToPhotosAlbum:fail:auth denied" || err.errMsg ===
								"saveImageToPhotosAlbum:fail auth deny") {
								// 这边微信做过调整，必须要在按钮中触发，因此需要在弹框回调中进行调用
								wx.showModal({
									title: '提示',
									content: '需要您授权保存相册',
									showCancel: false,
									success: modalSuccess => {
										wx.openSetting({
											success(settingdata) {
												console.log("settingdata", settingdata)
												if (settingdata.authSetting['scope.writePhotosAlbum']) {
													wx.showModal({
														title: '提示',
														content: '获取权限成功,再次点击图片即可保存',
														showCancel: false,
													})
												} else {
													wx.showModal({
														title: '提示',
														content: '获取权限失败，将无法保存到相册哦~',
														showCancel: false,
													})
												}
											},
											fail(failData) {
												console.log("failData", failData)
											},
											complete(finishData) {
												console.log("finishData", finishData)
											}
										})
									}
								})
							}
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
				this.canvasWidth = 0;
				this.canvasHeight = 0;
			}
		},
		computed: {
			...mapState('ucenter', ['currentUserInfo']),
			...mapState(['userInfo']),
			...mapGetters('ucenter', ['imgSrcGetters'])
		},
		onShareAppMessage(res) {
			// 分享
			return {
				title: '分享',
				path: 'pages/businesscard/index/businssecard',
				desc: this.cNames,
				imageUrl: this.shareImg,
				success(res) {
					console.log('成功', res);
				}
			}
			// 'http://img2.imgtn.bdimg.com/it/u=571610305,1553276443&fm=26&gp=0.jpg' ||
		}
	}
</script>

<style lang="scss">
	@import 'share';
</style>
