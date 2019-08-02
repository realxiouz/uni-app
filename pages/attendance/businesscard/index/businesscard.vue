<template>
	<view class="padding-25">
		<!-- cardtemplate 组件start -->
		<!--添加'0'是为了解决这里先执行但是currentuserinfo.template为undefinde的问题-->
		<card-template :template_id="currentuserinfo.template_id || '0'" :user="currentuserinfo"></card-template>
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
								<button open-type="share"></button>
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
			<view :class="['cu-modal', 'bottom-modal', modalName=='bottomModal-0'? 'show': '']">
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
			<view class="browse-count-right">
				<view class="vertical-md">
					<view class="cu-avatar-group">
						<!--<view :class="['cu-avatar', 'round', 'lg', recordList.todayData+recordList.historyData >= 4? 'none': '']">
							<text></text>
						</view>-->
						<view class="avatar-info" v-for="(item, index) of BrowseUser" :key="index">
							<image class="avatar-style" :src="item.avatar"></image>
						</view>
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
			<!-- <button bindtap="tel" open-type="getPhoneNumber" bindgetphonenumber="getPhoneNumber" class="cu-btn round bg-red">
                       <i class="right iconfont icondianhua"></i>
                       来电咨询
                   </button> -->
		</view>
		<!-- 底部 end -->

		<!--制作名片按钮 start-->
		<make-btn :on-event="onMyEvent" ></make-btn>
		<!--制作名片按钮 end-->


		<!--    判断用户是否后期，如果未授权则弹出授权-->
		<view v-if="ifShowRZbt" :class="['cu-modal', modalName==1? 'show': '']">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">你还未认证，请认证通过</view>
					<!-- <view class="action" @tap="hideModal">
                        <text class="cuIcon-close text-red"></text>
                    </view> -->
				</view>
				<view class="padding-xl">
					<!--open-type="getUserInfo" 仅小程序支持 用来获取用户信息 从返回参数的detail中获取到的值同uni.getUserInfo-->
					<button class="cu-btn bg-red margin-tb-sm lg button-hover" open-type="getUserInfo" @getuserinfo="getUserInfo" @tap="hideModal" withCredentials="true">
						获取授权
					</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import cardTemplate from '../../../../component/cardtemplate/cardtemplate.vue';
	import makeBtn from '../../../../component/makebtn/index/makebtn.vue';
	import {BASE_URL} from '../../../../utils/const.js';
	import share from '../../../../utils/share.js';
	import {mapMutations, mapState} from 'vuex';
	import {header} from "../../../../utils/global-data";

	export default {
		data() {
			return {
				url: BASE_URL + "?wapp=1#wechat_redirect",
				companyId: "",
				redirect: "",
				userInfo: {},// 绘制图片时调用
				hasUserInfo: false,
				canIUse: uni.canIUse('button.open-type.getuserInfo'),
				//
				readNumber: 0, //阅读次数
				BrowseUser: [], // 浏览的人
				signature: '', // 名片签名
				isShowCard: '展开名片信息', //名片模板的标题
				cardIs: false, //名片详情
				cardTop: '',
				isShowCardContent: false, //名片内容的显隐
				templateStyle: false, //默认显示一个名片模板
				isExeCuteCanvas: false, //在还没点击的时候不执行子组件里的分享
				canvasWidth: '', //canvas宽
				canvasHeight: '', //canvas高
				currentBgNum: 0, //当前名片索引
				userInfo: {}, //名片上显示的内容
				temUrl: '',
				shareImg: '',
				modalName: '',// 用户授权时使用, 打开分享界面时也使用
				ifShowRZbt: false,// 用户授权使用
				browsTotal: '',
				isCircle: false,
				recordList: {
					todayData: 0,
					historyData: 0
				},
				componentPass: '',
				isShowShare: false,
				// currentuserinfo: {},
				testUserInfo: {},
				qrCode: '', // 图片的src
				bg_gradual_blue: 'bg-gradual-blue',
				house: {},
				onMyEvent: {
					url: '../../page_makecard/index/page_makecard',
					title: '制作名片',
					imgSrc: '/static/images/img/card.png'
				},
				waitTime: 500
			}
		},
		components: {
			cardTemplate,
			makeBtn
		},
		mounted() {

		},
		onLoad(options) {
			// 在这里的options时如何过来的, 又怎样的业务需求, 对应下面的251-255
			const self = this;
			//授权
			// #ifdef MP-WEIXIN
			uni.getSetting({
				success: res => {
					let authMap = res.authSetting;
					// let length = Object.keys(authMap).length;
					if (!(Object.values(authMap)[0])) {
						// 这个长度等于0时, 要向用户调用授权窗口
						// this.modalName = 1;
						// this.ifShowRZbt =  true;
					}
				}
			});
			// #endif
			// canvas
			let screenwd = uni.getSystemInfoSync().windowWidth;
			let canvaswd = this.canvasWidth = screenwd - 20 * 1.9;
			this.currentbgnum = this.currentuserinfo.template_id || 1;
			// 为画布设置宽高
			this.canvasWidth = canvaswd;
			// this.canvasHeight = canvasht; 
			//////////////////////////////////////这里不知道是干啥的
			let companyId = options.cid ? options.cid : '';
			let redirect = options.redirect ? options.redirect : '';
			this.companyId = companyId,
			this.redirect = redirect,
			this.url = BASE_URL + "?cid=" + companyId + "&redirect=" + redirect + "&wapp=1#wechat_redirect";
			//////////////////////////////////////
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
					// console.log(data.data);
				},
				fail() {
					// 在网络错误的情况下使用, 但信息显示的不全, 不过只要后台的登录时返回的和userinfo接口的数据一致, 就可以正常显示
					if (!self.currentuserinfo.id) {
						this.currentuserinfo = uni.getStorageSync('userInfo');
					}
				},
				complete() {
					self.testUserInfo = self.currentuserinfo;
				}
			});
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
				// var this.waitTime = 2000;
				// var that = this;
				// this.currentuserinfo.avatar = 'http://b-ssl.duitang.com/uploads/item/201502/10/20150210223250_5dJeC.jpeg';
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
			},
			/*隐藏已打开的分享界面*/
			canclesavepic() {
				this.modalName = null;
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
			// 请求授权
			/*getUserInfo(info) {
				// 不会执行
				// 拒绝授权
				if (!info.detail.userInfo) {
					this.ifshowrzbt = true;
					this.modalName = 1;
				}
				// 允许授权
				if (info.detail.userInfo) {
					// console.log(this.token);
				}
			},*/
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
			}
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
