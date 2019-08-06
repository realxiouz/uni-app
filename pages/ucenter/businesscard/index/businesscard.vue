<template>
	<view class="padding-25" v-cloak>
		<!-- cardtemplate 组件start -->
		<card-template :user="currentuserinfo" :is-show-list="false"></card-template>
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
					<text>公司名称：{{currentuserinfo.companyname || ''}}</text>
					<text>电话：{{currentuserinfo.phone || ''}}</text>
					<text>微信手机号：{{currentuserinfo.mobile || ''}}</text>
					<text>微信号：{{currentuserinfo.weixin || ''}}</text>
					<text>邮箱：{{currentuserinfo.email || ''}}</text>
				</view>
			</view>
		</view>
		<!-- 名片详情 end -->

		<!-- 分享名片 satart -->
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
									<image src="/static/images/img/weixin.png"></image>
								</view>
								<text>分享给好友</text>
							</view>
							<view class="sharetoobj-list">
								<button @tap="showcard" data-target="bottomModal-0"></button>
								<view>
									<image src="/static/images/img/pyq.png"></image>
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
			<view :class="['cu-modal', 'bottom-modal', modalName ==='bottomModal-0'? 'show': '']">
				<view class="cu-dialog">
					<view class="pd-left-right">
						<view class="canvas-share" :style="{width:canvasWidth + 'px'}">
							<canvas class="shadow" canvas-id="sharecard" :style="{'width': canvasWidth + 'px', 'height': canvasHeight + 'px'}">

							</canvas>
						</view>
						<!-- 分享小图 start-->
						<canvas v-if="isShowShare" canvas-id="sharesm" style="width: 157px;height: 140px">
						</canvas>
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
				{{currentuserinfo.signature || ''}}
			</view>
			<view class="Module-title pubpdtop">
				推荐房源
			</view>
			<view class="informationlist" v-for="(items, index) of house" :key="index">
				<view @tap="goUrl" :data-uri="'/#/shop/project/detail?id=' + items.id">
					<view class="topimg">
						<image class="imgauto radius-top" :src="items.img"></image>
					</view>
					<view class="housesource pd-left-right pubpdtop">
						<views class="housesource-left">
							<text class="block spece-1">{{items.name}}</text>
							<text class="block gray">{{items.address}}</text>
						</views>
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
			<button class="cu-btn round bg-cyan">
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
		<make-btn :on-event="onMyEvent" v-if="!showMakeBth"></make-btn>
		<!--制作名片按钮 end-->
	</view>
</template>

<script>
	import cardTemplate from '../../../../components/cardtemplate/cardtemplate.vue';
	import makeBtn from '../../../../components/makebtn/index/makebtn.vue';
	import {BASE_URL} from '../../../../utils/const.js';
	import share from '../../../../utils/share.js';
	import {mapMutations, mapState} from 'vuex';
	import {header, getElSize} from "../../../../utils/global-data";

	export default {
		data() {
			return {
				userInfo: {},// 绘制图片时调用
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
				userInfo: {}, //名片上显示的内容
				shareImg: '', // 分享img
				modalName: '',// 用户授权时使用, 打开分享界面时也使用
				ifShowRZbt: false,// 用户授权使用
				showBrowseEllipsis: false,// 显示浏览名片人的头像的省略号
				isShowShare: false,
				testUserInfo: {},// 分享是绘制canvas需要
				qrCode: '', // 图片的src(头像)
				bg_gradual_blue: 'bg-gradual-blue',
				house: {},
				onMyEvent: {
					url: '../../page_makecard/index/page_makecard',
					title: '制作名片',
					imgSrc: '/static/images/img/card.png'
				},
				showMakeBth: false // 这里true显示makebtn, false反之
			}
		},
		components: {
			cardTemplate,
			makeBtn
		},
		onLoad(options) {
			const self = this;
			self.showMakeBth = options.previewB === '1';
			// canvas
			let screenwd = uni.getSystemInfoSync().windowWidth;
			let canvaswd = this.canvasWidth = screenwd - 20 * 1.9;
			this.currentbgnum = this.currentuserinfo.template_id || 1;
			// 为画布设置宽高
			this.canvasWidth = canvaswd;
			// this.canvasHeight = canvasht;
            uni.showLoading({
                title: '加载中',
                mask: true
            })
			uni.request({
				url: BASE_URL + '/api/geren/userinfo',
				header: header(self.token),
				method: "GET",
				success(res) {
					const data = res.data;
					self.readNumber = data.readnumber;
					self.BrowseUser = data.Browseuser;
					// self.currentuserinfo = data.data;
					self.house = data.house.data;
					self.changeCurrentUserInfo(data.data);// 用户相关信息, 在vuex中
                    uni.hideLoading();
				},
				fail() {
					// 在网络错误的情况下使用, 但信息显示的不全, 不过只要后台的登录时返回的和userinfo接口的数据一致, 就可以正常显示
					if (!self.currentuserinfo.id) {
						self.changeCurrentUserInfo(uni.getStorageSync('userInfo'));
					}
				},
				complete() {
					self.testUserInfo = self.currentuserinfo;
				}
			});
		},
		onHide() {
			uni.hideLoading();
		},
		watch: {
			readNumber(data) {
				// 这里是因为数据都是一起修改的, 所以监听它可以省去无限调用的麻烦, 还有此时页面也已经挂载上去, 可以正常获取到宽度
				// 这个方法是获取宽高的, 目前只可以传id, 且不带#, 需要改成标签名或者是class的可以去global-data.js下修改
				const self = this;
				async function getSize() {
					let widthP = await getElSize('browse-user');
					let imgWidthP = await getElSize('img_width');
					let imgW = imgWidthP.width + 5;
					return Math.floor(widthP.width / imgW);
				}
				getSize().then(data => {
					if (self.BrowseUser.length <= data-1) return false;
					self.BrowseUser = self.BrowseUser.slice(0, data);
					self.showBrowseEllipsis = true;
				})
			}
		},
		methods: {
			...mapMutations(['login', 'changeCurrentUserInfo']),
			goUrl(event) {
				uni.navigateTo({
				  url: '/pages/out/index/out?url=' + BASE_URL + event.currentTarget.dataset.uri
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
			generateCard(e) {
				share.loading(this.currentuserinfo).then(data => {
					this.qrCode = data.tempFilePath;
					this.modalName = e.currentTarget.dataset.target;
					// 绘制canvas图片
					const ctx = uni.createCanvasContext('sharecard');
					const cardSm = uni.createCanvasContext('sharesm');
					let bgSm = [
						"/static/images/img/sm_0.png",
						"/static/images/img/sm_1.png",
						"/static/images/img/sm_2.png",
						"/static/images/img/sm_3.png"
					];
					this.currentbgnum = this.currentuserinfo.template_id;
					share.canvas.call(this, e, ctx, cardSm, bgSm, share.roundRect);
				}).catch(err => {
					console.log(err);
				})
			},
			/* 点击隐藏到分享图标 */
			hideModal() {
				this.modalName = null;
				this.userImg = '';
			},
			/*隐藏已打开的分享界面*/
			canclesavepic() {
				this.modalName = null;
				this.isShowShare = false;
				this.canvasWidth = 0;
				this.canvasHeight = 0;
				this.shareImg = '';
			},
			/*拨打电话*/
			tel() {
				uni.makePhoneCall({
					phoneNumber: this.currentuserinfo.mobile
				})
			},
			/* 新建联系人 */
			addPhoneNumber() {
				/*uni.navigateTo({
					url: '/pages/newcontact/index/newcontact'
				})*/
				uni.addPhoneContact({
					firstName: this.currentuserinfo.name,
					mobilePhoneNumber: this.currentuserinfo.mobile
				})
			},
			showcard(e) {
				// 分享到朋友圈
				this.modalName = e.currentTarget.dataset.target;
			},
			saveImage() {
				// 保存图片
				const self = this;
				if (this.shareImg) {
					uni.saveImageToPhotosAlbum({
						filePath: self.shareImg,
						success(res) {
							if (/saveImageToPhotosAlbum:ok/.test(res.errMsg)) {
								uni.navigateBack({
									delta: 1
								})
							}
						}
					})
				}
			},
			// ifdef APP-PLUS
			appShareFriend() {
				const self = this;
				console.log(222222222222222222222222222)
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
			}
			// endif
		},
		onShareAppMessage() {
			return {
				title: '房销客管理系统',
				desc: '房销客管理系统，管理您的客户，提高您的业绩！',
				path: '/pages/attendance/businesscard/index/businesscard',
			}
		},
		computed: {
			...mapState(['token', 'currentuserinfo'])
		}
	}
</script>

<style lang="scss">
	@import 'index';
</style>
