<template>
	<view class="padding-25" v-cloak style="height: 3000px;">
		<!-- cardtemplate 组件start -->
		<!-- :user="currentUserInfo"  -->
		<card-template :is-show-list="false"></card-template>
		<!-- cardtemplate 组件end -->

		<!-- 名片详情start -->
		<view class="isShowCard">
			<view @tap="clickShow" :class="['isshow-top', cardTop]">
				<view class="isshow-top-box">
					{{isShowCard}}
					<text class="down cuIcon-unfold" v-if="!cardTop"></text>
					<text class="up cuIcon-fold" v-else></text>
				</view>
			</view>
			<view class="isshow-content" v-if="isShowCardContent">
				<view class="card-details">
					<text>公司名称：{{currentInfo.companyname || ''}}</text>
					<text>电话：{{currentInfo.phone || ''}}</text>
					<text>微信手机号：{{currentInfo.mobile || ''}}</text>
					<text>微信号：{{currentInfo.weixin || ''}}</text>
					<text>邮箱：{{currentInfo.email || ''}}</text>
				</view>
			</view>
		</view>
		<!-- 名片详情 end -->

		<!-- 分享名片 satart -->
		<!-- #ifdef MP-WEIXIN -->
		<view class="cardshare">
			<button @tap="generateCard" class="cu-btn block bg-cyan" data-target="bottomModal">分享名片</button>
			<view :class="['cu-modal', 'bottom-modal', modalName === 'bottomModal'? 'show': '']">
				<view class="cu-dialog">
					<view class="padding-xl">
						<view class="sharetoobj">
							<view class="sharetoobj-list">
								<!--open-type="share"-->
								<!-- #ifdef MP-WEIXIN -->
								<button open-type="share"></button>
								<!-- #endif -->
								<!-- #ifdef APP-PLUS -->
								<button @tap="appShareFriend"></button>
								<!-- #endif -->
								<view>
									<image :src="imgSrcGetters('weixin.png')"></image>
								</view>
								<text>分享给好友</text>
							</view>
							<view class="sharetoobj-list">
								<button @tap="showCard" data-target="bottomModal-0"></button>
								<view>
									<image :src="imgSrcGetters('pyq.png')"></image>
								</view>
								<view>分享到朋友圈</view>
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
                            <view class="canvas-share" :style="{width:canvasWidth + 'px'}">
                                <canvas class="shadow" canvas-id="share-card" v-if="!showImage" :style="{'width': canvasWidth + 'px', 'height': canvasHeight + 'px'}"></canvas>
                                <image :src="saveImgSrc" v-else :style="{'width': canvasWidth + 'px', 'height': canvasHeight + 'px'}"></image>
                            </view>
                            <!-- 分享小图 这里不需要显示, 直接通过onShare函数分享, 需要处理在显示大图也显示小图的情况 start-->
                            <canvas v-if="!showSmallImage && isShowShare" canvas-id="share-sm" style="width: 157px;height: 140px"></canvas>
                            <!-- 分享小图 end-->
                            <view class="pd-top-bottom">
                                <button @tap="saveImage" class="btnwd cu-btn block bg-cyan" :data-temp="shareImg">保存到相册</button>
                            </view>
                        </view>
                        <view class="pd-top-bottom bg-white btn-center" @tap="canclesavepic">
                            取消
                        </view>
                    </view>
			</view>
			<button @tap="addPhoneNumber" class="cu-btn round bg-blue">存入手机通讯录</button>
		</view>
		<!-- #endif -->
		<!-- 分享名片 end -->

		<!-- 浏览次数 start -->
		<view class="browse-count">
			<view class="browse-count-letf">
				<text class="browse-count-text">阅览次数</text>
				<text class="browse-count-nunber">{{readNumber}}</text>
			</view>
			<view class="browse-count-right" id="browse-user">
				<view class="vertical-md">
					<view class="cu-avatar-group">
						<view class="avatar-info" v-for="(item, index) of BrowseUser" :key="index" :id="[index === 0? 'img_width': '']">
							<image class="avatar-style" :src="item.avatar"></image>
						</view>
						<view class="avatar-info" v-if="showBrowseEllipsis" :class="[showBrowseEllipsis? 'show-browse-ellipsis': '']">···</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 浏览次数 end -->

		<!-- 模块 start -->
		<view class="Module">
			<view class="Module-title">
				我的签名
			</view>
			<view class="Module-content">
				{{currentInfo.signature || ''}}
			</view>
			<view class="Module-title pubpdtop">
				推荐房源
			</view>
			<!-- /#/shop/project/detail?id=' + items.id -->
			<view class="informationlist" v-for="(items, index) of house" :key="index">
				<view @tap="toDetail(items.id)">
					<view class="topimg">
						<image class="imgauto radius-top" :src="items.img"></image>
					</view>
					<view class="housesource pd-left-right pubpdtop">
						<view class="housesource-left">
							<text class="block spece-1">{{items.name}}</text>
							<text class="block gray">{{items.address}}</text>
						</view>
						<view class="housesource-right">
							<view class="houseprice" v-for="(item, i) of items.prices" :key="i">{{item.price}}元/㎡</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 模块 end -->

		<!-- 底部 start-->
		<view class="objfoot">
			<button class="cu-btn round bg-cyan" @tap="messageInformation">
				<i class="left iconfont iconxiaoxi"></i>
				留言咨询
			</button>
			<button @tap="tel"  class="cu-btn round bg-red">
				<i class="right iconfont icondianhua"></i>
				来电咨询
			</button>
		</view>
		<!-- 底部 end -->

		<!--制作名片按钮 start-->
		<make-btn :on-event="onMyEvent" v-if="!showMakeBtn"></make-btn>
		<!--制作名片按钮 end-->
	</view>
</template>

<script>
	import cardTemplate from '../../../../components/cardtemplate/cardtemplate.vue';
	import makeBtn from '../../../../components/makebtn/index/makebtn.vue';
	import share from '../../../../common/share.js';
	import {mapMutations, mapState, mapGetters} from 'vuex';

	export default {
		data() {
			return {
				// userInfo: {},// 绘制图片时调用
				readNumber: 0, //阅读次数
				BrowseUser: [], // 浏览的人
				signature: '', // 名片签名
				isShowCard: '展开名片信息', //名片模板的标题
				cardIs: false, //名片详情
				isShowCardContent: false, //名片内容的显隐
				isExeCuteCanvas: false, //在还没点击的时候不执行子组件里的分享(v-if)
				canvasWidth: '', //canvas宽
				canvasHeight: '', //canvas高
				currentBgNum: 0, //当前名片索引
				shareImg: '', // 分享img
                saveImgSrc: '', // 保存img
				modalName: '',// 用户授权时使用, 打开分享界面时也使用
				ifShowRZbt: false,// 用户授权使用
				showBrowseEllipsis: false,// 显示浏览名片人的头像的省略号
				testUserInfo: {},// 分享是绘制canvas需要
				qrCode: '', // 图片的src(头像)
				bg_gradual_blue: 'bg-gradual-blue',
				house: {},
				onMyEvent: {
					url: '../../page_makecard/index/page_makecard',
					title: '制作名片',
					imgSrc: ''
				},
				showMakeBtn: false, // 这里true显示make-btn, false反之
				cardTop: '',// 名片信息
                smallImg : '', // 小图src
                showImage: false,
                showSmallImage: false,
                isRepeatDraw: true,
                isShowShare: true
			}
		},
		components: {
			cardTemplate,
			makeBtn
		},
		onLoad(options) {
			const self = this;
            self.showMakeBtn = options.previewB === '1';
			let uidx = options.uidx;
            if (this.currentUserInfo.name) {// 这个是被分享人的名片信息
                this.changeCurrentInfo(this.currentUserInfo);
            } else if (uidx){
                this.getUserMsg(uidx);
            }
            if (this.currentLoginUserInfo.name) {// 在已经获取了就不要再去请求了
                this.changeCurrentInfo(this.currentLoginUserInfo);
            } else {
                this.getUserMsg();
            }
			// canvas
			let screenWd = uni.getSystemInfoSync().windowWidth;
			this.canvasWd = this.canvasWidth = screenWd - 20 * 1.9;
			this.currentBgNum = this.currentInfo.template_id || 1;
			this.onMyEvent.imgSrc = this.imgSrcGetters('card.png');
		},
		onHide() {
			uni.hideLoading();
		},
		watch: {
			readNumber() {
				const self = this;
				// 这里是因为数据都是一起修改的, 所以监听它可以省去无限调用的麻烦, 还有此时页面也已经挂载上去, 可以正常获取到宽度
				// 这个方法是获取宽高的, 目前只可以传id, 且不带#, 需要改成标签名或者是class的可以去global-data.js下修改
				async function getSize() {
					let widthP = await self.getElSize('browse-user');
					let imgWidthP = await self.getElSize('img_width');
					let imgW = imgWidthP.width + 5;
					return Math.floor(widthP.width / imgW);
				}
				getSize().then(data => {
					if (self.BrowseUser.length <= data-1) return false;
					self.BrowseUser = self.BrowseUser.slice(0, data);
					self.showBrowseEllipsis = true;
				})
			},
            saveImgSrc(data) {
                this.showImage = Boolean(data);
            },
            shareImg(data) {
                this.showSmallImage = Boolean(data);
            }
		},
		methods: {
			...mapMutations(['login']),
			...mapMutations('ucenter', ['changeCurrentLoginUserInfo', 'changeImg', 'changeCurrentUserInfo', 'changeCurrentInfo']),
			toDetail(id) {
				// recommend为1表示是从名片推荐楼盘这里跳转过去的, 因为在详情页里有些不显示户型图片, 地图, 详情
				uni.navigateTo({
				  url: `/pages/project/project-dev/index?id=${id}`
				})
		    },
			bindViewTap: function() {
				//事件处理函数
				uni.navigateTo({
					url: '../logs/logs'
				})
			},
			// 点击展开用户信息
			clickShow() {
				this.cardIs = !this.cardIs;
				if (this.cardIs) {
					this.isShowCard = '展开名片信息';
					this.cardTop = 'on';
					this.isShowCardContent = true;
				} else {
					this.isShowCard = '收起名片信息';
					this.cardTop = '';
					this.isShowCardContent = false;
				}
			},
			/* 名片分享到朋友圈*/
            async generateCard(e) {
                uni.showLoading({
                    title: '生成中...',
                    mask: true
                });
                let avatar = this.currentInfo.avatar;
                avatar = avatar.replace('http:', 'https:');
                let imgDownload = [
                    {
                        key: 'img_avatar',
                        src: avatar
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
                        src: this.imgSrcGetters(`template_${this.currentInfo.template_id}.png`)
                    },
                    {
                        key: 'img_company_black',
                        src: this.imgSrcGetters(`companyicon_black.png`)
                    },
                    {
                        key: 'img_phone_black',
                        src: this.imgSrcGetters('phone_back.png')
                    },
                    {
                        key: 'img_large_bg',
                        src: this.imgSrcGetters('card-mask.png')
                    }
                ];
                for (let item of Object.values(imgDownload)) {
                    let _key = item.key;
                    if (!this.downLoadImg[_key]) {
                        await share.loading(item.src).then(res => {
                            this.isRepeatDraw = true;
                            this.changeImg({key: _key, url: res.tempFilePath});
                        })
                    }
                }
                uni.hideLoading();
                // 为画布设置宽高, 在点击取消的时候会清除
                this.canvasWidth = this.canvasWd;
                this.modalName = e.currentTarget.dataset.target;
                if (!this.isRepeatDraw) {
                    this.saveImgSrc = true;
                    this.showSmallImage = true;
                    this.isShowShare = true;
                    return false;
                }
                // 绘制canvas图片
                const ctx = uni.createCanvasContext('share-card');
                const cardSm = uni.createCanvasContext('share-sm');
                this.currentBgNum = this.currentInfo.template_id;
                share.canvas.call(this, e, ctx, cardSm);
			},
			/* 点击隐藏到分享图标 */
			hideModal() {
				this.modalName = null;
				this.isShowShare = false;
                this.saveImgSrc = false;
                this.showSmallImage = false;
			},
			/*隐藏已打开的分享界面*/
			canclesavepic() {
				this.modalName = null;
				this.canvasWidth = 0;
				this.canvasHeight = 0;
				this.shareImg = '';
			},
			/*拨打电话*/
			tel() {
				uni.makePhoneCall({
					phoneNumber: this.currentInfo.mobile
				})
			},
			/* 新建联系人 */
			addPhoneNumber() {
				uni.addPhoneContact({
					firstName: this.currentInfo.name,
					mobilePhoneNumber: this.currentInfo.mobile
				})
			},
			showCard(e) {
				// 分享到朋友圈
				this.modalName = e.currentTarget.dataset.target;
			},
			saveImage() {
				// 保存图片
				const self = this;
				if (this.saveImgSrc) {
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
                            if (err.errMsg === "saveImageToPhotosAlbum:fail:auth denied" || err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
                                // 这边微信做过调整，必须要在按钮中触发，因此需要在弹框回调中进行调用
                                uni.showModal({
                                    title: '提示',
                                    content: '需要您授权保存相册',
                                    showCancel: false,
                                    success: modalSuccess => {
                                        uni.openSetting({
                                            success(settingdata) {
                                                console.log("settingdata", settingdata);
                                                if (settingdata.authSetting['scope.writePhotosAlbum']) {
                                                    uni.showModal({
                                                        title: '提示',
                                                        content: '获取权限成功,再次点击图片即可保存',
                                                        showCancel: false,
                                                    })
                                                } else {
                                                    uni.showModal({
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
			// #ifdef APP-PLUS
			appShareFriend() {
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
						console.log(error);
					}
				});
			},
			// #endif
			messageInformation() {
				// 留言咨询
				uni.navigateTo({
					url: `/pages/message/chat/index?id=${this.currentInfo.uid}&type=App\\User`
				});
			},
			getElSize(id) { //得到元素的size
			    return new Promise((res, rej) => {
			        uni.createSelectorQuery().select('#' + id).fields({
			            size: true,
			            scrollOffset: true
			        }, (data) => {
			            res(data);
			        }).exec();
			    });
			},
            getUserMsg(uidx) {
			    const self = this;
                uni.showLoading({
                    title: '加载中',
                    mask: true
                });
                let boo = !!uidx;
                uidx = uidx || this.userInfo.id;
                this.$http('geren/userinfo', {uidx: uidx}).then(res => {
                    self.readNumber = res.readnumber;
                    self.BrowseUser = res.Browseuser;
                    self.house = res.house.data;
                    this.changeCurrentInfo(res.data);
                    self[boo? 'changeCurrentUserInfo': 'changeCurrentLoginUserInfo'](res.data);
                    console.log(this.currentUserInfo, 'c');
                    console.log(this.currentLoginUserInfo, 'nc');
                    uni.hideLoading();
                }).catch(err => {
                    console.log(err);
                    uni.hideLoading();
                });
            }
		},
		onShareAppMessage() {
            return {
			    title: `您好，我是${this.currentInfo.name}。这是我的名片，请惠存`,
                imageUrl: this.shareImg,
                path: '/pages/ucenter/businesscard/index/businesscard?uidx='+ this.userInfo.id
            }
		},
		computed: {
			...mapState('ucenter', ['currentUserInfo', 'downLoadImg', 'currentLoginUserInfo', 'currentInfo']),
			...mapState(['userInfo']),
			...mapGetters('ucenter', ['imgSrcGetters'])
		},
		mounted() {

        }
	}
</script>

<style lang="scss">
	@import 'index';
</style>
