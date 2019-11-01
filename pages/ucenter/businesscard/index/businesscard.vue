<template>
	<view class="padding-25">
		<!-- cardtemplate 组件start -->
		<card-template :is-show-list="false" :is-preview="showMakeBtn" :relay-on="relayOn" :personal="personal"></card-template>
		<!-- cardtemplate 组件end -->

		<!-- 名片详情start -->
		<view class="isShowCard">
			<view @tap="clickShow" :class="['is-show-top', cardTop]">
				<view class="is-show-top-box">
					{{isShowCard}}
					<text class="down cuIcon-unfold" v-if="!cardTop"></text>
					<text class="up cuIcon-fold" v-else></text>
				</view>
			</view>
			<view class="is-show-content" v-if="isShowCardContent">
				<view class="card-details">
					<text>公司名称：{{currentInfo.companyname || ''}}</text>
					<text>电话：{{currentInfo.phone || ''}}</text>
					<text>微信号：{{currentInfo.weixin || ''}}</text>
					<text>邮箱：{{currentInfo.email || ''}}</text>
				</view>
			</view>
		</view>
		<!-- 名片详情 end -->

		<!-- 分享名片 satart -->
		<!-- #ifdef MP-WEIXIN || APP-PLUS -->
		<view class="card-share">
			<button @tap="generateCard" class="cu-btn block bg-cyan" data-target="bottomModal">分享名片</button>
			<view :class="['cu-modal', 'bottom-modal', modalName === 'bottomModal'? 'show': '']">
				<view class="cu-dialog">
					<view class="padding-xl">
						<view class="sharetoobj">
                            <!-- #ifdef MP-WEIXIN -->
							<view class="sharetoobj-list">
								<button open-type="share"></button>
								<!-- #ifdef APP-PLUS
								<button @tap="appShareFriend"></button>
								 #endif -->
								<view>
									<image :src="imgSrcGetters('weixin.png')"></image>
								</view>
								<text>分享给好友</text>
							</view>
                            <!-- #endif -->
							<view class="sharetoobj-list">
								<button @tap.stop="modalName = 'bottomModal-0'" data-target="bottomModal-0"></button>
								<view>
									<image :src="imgSrcGetters('pyq.png')"></image>
								</view>
								<view>分享到朋友圈</view>
							</view>
						</view>
					</view>
					<view class="padding-top-bottom bg-white btn-center" @tap="hideModal">
						取消
					</view>
				</view>
			</view>
			<view :class="['cu-modal', 'bottom-modal', modalName === 'bottomModal-0'? 'show': '']">
                    <view class="cu-dialog">
                        <view class="padding-right-left">
                            <view class="canvas-share" :style="{width:canvasWidth + 'px'}">
                                <canvas class="shadow" canvas-id="share-card" v-if="!showImage" :style="{'width': canvasWidth + 'px', 'height': canvasHeight + 'px'}"></canvas>
                                <image :src="saveImgSrc" v-else :style="{'width': canvasWidth + 'px', 'height': canvasHeight + 'px'}"></image>
                            </view>
                            <!-- 分享小图 这里不需要显示, 直接通过onShare函数分享, 需要处理在显示大图也显示小图的情况 start-->
                            <canvas v-if="!showSmallImage && isShowShare" canvas-id="share-sm" style="width: 157px;height: 140px"></canvas>
                            <!-- 分享小图 end-->
                            <view class="padding-top-bottom">
                                <button @tap="saveImage" class="btn-wd cu-btn block bg-cyan" :data-temp="shareImg">保存到相册</button>
                            </view>
                        </view>
                        <view class="padding-top-bottom bg-white btn-center" @tap="hideModal">
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
			<view class="browse-count-left">
				<view class="browse-count-text">阅览次数</view>
				<view class="browse-count-number">{{currentInfo.readNumber}}</view>
			</view>
			<view class="browse-count-right" id="browse-user">
				<view class="vertical-md">
					<view class="cu-avatar-group">
                        <view v-if="!browseUser.length" class="avatar-info" id="img_width"></view>
                        <view class="avatar-info" v-else  v-for="(item, index) of browseUser" :key="index">
							<image class="avatar-style" :src="item.avatar || defaultAvatar"></image>
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
			<view class="Module-title padding-top">
				推荐房源
			</view>
			<view>
                <view class="information-list" v-for="(item, index) of currentInfo.house" :key="index">
                    <view @tap="toDetail(item.id)">
                        <view>
                            <image class="img-auto radius-top" :src="item.img"></image>
                        </view>
                        <view class="house-source padding">
                            <view class="house-source-left">
                                <text class="block space-1">{{item.name}}</text>
                                <text class="block gray">{{item.address}}</text>
                            </view>
                            <view class="house-source-right">
                                <view class="house-price" >{{item.avg_price}}元/㎡</view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
		</view>
		<!-- 模块 end -->
        <view style="height: 90rpx;"></view>
		<!-- 底部 start-->
		<view class="obj-foot">
			<button class="cu-btn round bg-cyan" @tap="messageInformation">
				<view class="left cuIcon-comment"></view>
				<view>留言咨询</view>
			</button>
			<button @tap="tel"  class="cu-btn round bg-red">
				<view class="right cuIcon-dianhua"></view>
				<view>来电咨询</view>
			</button>
		</view>
		<!-- 底部 end -->

		<!--制作名片按钮 start-->
		<make-btn :on-event="onMyEvent" v-if="!showMakeBtn && hasCurrentId"></make-btn>
		<!--制作名片按钮 end-->
        <!--授权-->
        <!-- #ifdef MP-WEIXIN -->
        <view v-if="isShowAuth" :class="['cu-modal', modalName === 1? 'show': '']">
            <view class="cu-dialog">
                <view class="cu-bar bg-white justify-end">
                    <view class="content">使用微信登录</view>
                    <view class="action" @tap="modalName = null">
                        <text class="cuIcon-close text-red"></text>
                    </view>
                </view>
                <view class="padding-xl">
                    <button class="cu-btn bg-red margin-tb-sm lg button-hover" open-type="getUserInfo" @getuserinfo="getUserInfo" @tap="showLoading">
                        获取授权
                    </button>
                </view>
            </view>
        </view>
        <!-- #endif -->
	</view>
</template>

<script>
	import cardTemplate from '@/components/cardtemplate/cardtemplate.vue';
	import makeBtn from '@/components/makebtn/index/makebtn.vue';
	import share from '@/common/share.js';
	import {mapMutations, mapState, mapGetters} from 'vuex';
	import weiXinAuthorization from '@/utils/weixin-authorization';

	export default {
		data() {
			return {
				isShowCard: '展开名片信息', //名片模板的标题
				cardIs: false, //名片详情, 点击打开和隐藏, 在事件内触发
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
				bg_gradual_blue: 'bg-gradual-blue',
				onMyEvent: {
					url: '/pages/ucenter/page_makecard/index/page_makecard',
					title: '制作名片'
				},
				showMakeBtn: false, // 这里true显示make-btn, false反之
				cardTop: '',// 名片信息
                smallImg : '', // 小图src
                showImage: false,
                showSmallImage: false,
                isRepeatDraw: true,// 是否需要重新绘制canvas图片
                isShowShare: true,
                relayOn: false,// 依赖, 只要是onShow都要变化, 以引起currentInfo的变化
                showNumber: '',// 浏览记录显示的个数, 保存使用, 而且只获取一次
                personal: 0,
                isShowAuth: false,
                uidx: '',
                hasCurrentId: false
			}
		},
		components: {
			cardTemplate,
			makeBtn
		},
        beforeMount() {},
		onLoad(options){
            const self = this;
            self.personal = Number(options.personal);
            self.showMakeBtn = options.previewB === '1';
            self.uidx = options.uidx;
            // #ifdef MP-WEIXIN
            if (!this.token) {
                self.isShowAuth = true;
                self.modalName = 1;
            } else {
                self.requestBefore();
            }
            // #endif
            // #ifndef MP-WEIXIN
            self.requestBefore();
            // #endif
		},
		watch: {
            saveImgSrc(data) {
                this.showImage = Boolean(data);
            },
            shareImg(data) {
                this.showSmallImage = Boolean(data);
            },
            currentInfo(data) {
                // 这里是因为数据都是一起修改的, 所以监听它可以省去无限调用的麻烦, 还有此时页面也已经挂载上去, 可以正常获取到宽度
                // 这个方法是获取宽高的, 目前只可以传id, 且不带#, 需要改成标签名或者是class的可以去global-data.js下修改
                /*let route = this.getCurPage().route;
                if (!/pages\/ucenter\/businesscard\/index\/businesscard/.test(route)) return false;*/
                if (!data.BrowseUser)  return false;
                const self = this;
                let browseUser = data.BrowseUser;
                if (self.showNumber !== '') {
                    browseUser = browseUser.slice(0, self.sowhNumber);
                } else {
                    async function getSize() {
                        let widthP = await self.getElSize('browse-user');
                        let imgWidthP = await self.getElSize('img_width');
                        let imgW = imgWidthP.width + 5;
                        return Math.floor(widthP.width / imgW);
                    }
                    getSize().then(index => {
                        self.showNumber = index;
                        if (browseUser.length >= index-1) {
                            browseUser = browseUser.slice(0, index);
                            self.showBrowseEllipsis = true;
                        }
                    }).catch(err => {})
                }
                self.setBrowseUser(browseUser);
            }
		},
		methods: {
			...mapMutations(['login', 'changeToken']),
			...mapMutations('ucenter', ['changeCurrentLoginUserInfo', 'changeImg', 'changeCurrentUserInfo', 'changeCurrentInfo', 'setUId', 'setBrowseUser', 'setInterceptUId']),
			toDetail(id) {
			    if (id === null || id === undefined) return false;
				uni.navigateTo({
				  url: `/pages/project/project-dev/index?id=${id}`
				})
		    },
            getCurPage() {
                let pages = getCurrentPages();
                return pages[pages.length -1];
            },
			// 点击展开用户信息
			clickShow() {
				this.cardIs = !this.cardIs;
				if (this.cardIs) {
					this.isShowCard = '收起名片信息';
					this.cardTop = 'on';
					this.isShowCardContent = true;
				} else {
					this.isShowCard = '展开名片信息';
					this.cardTop = '';
					this.isShowCardContent = false;
				}
            },
			/* 名片分享到朋友圈*/
            async generateCard(e) {
                if (!Reflect.has(this.currentInfo, 'uid')) return false;
                uni.showLoading({
                    title: '生成中...',
                    mask: true
                });
                let avatar = this.currentInfo.avatar;
                avatar = avatar.replace('http://', 'https://');
                // avatar || this.defaultAvatar
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
                    }/*,
                    {
                        key: 'img_large_bg',
                        src: this.imgSrcGetters('card-mask.png')
                    }*/
                ];
                this.isRepeatDraw = false;
                let trouble = false;
                for (let item of Object.values(imgDownload)) {
                    let _key = item.key;
                    if (!this.downLoadImg[_key]) {
                        await share.loading(item.src).then(res => {
                            this.isRepeatDraw = true;
                            this.changeImg({key: _key, url: res.tempFilePath});
                        }).catch(err => {})
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
                this.canvasWidth = this.canvasWd;
                if (!this.isRepeatDraw) {
                    uni.hideLoading();
                    this.modalName = e.currentTarget.dataset.target;
                    this.showImage = true;
                    this.showSmallImage = true;
                    this.isShowShare = false;
                    return false;
                }
                this.showImage = false;
                this.showSmallImage = false;
                this.isShowShare = true;
                // 绘制canvas图片
                setTimeout(() => {
                    const ctx = uni.createCanvasContext('share-card');
                    const cardSm = uni.createCanvasContext('share-sm');
                    this.currentBgNum = this.currentInfo.template_id;
                    share.canvas.call(this, e, ctx, cardSm);
                    uni.hideLoading();
                }, 500);
			},
			/* 点击隐藏到分享图标 */
			hideModal() {
				this.modalName = null;
				this.isShowShare = false;
                this.showImage = true;
                this.showSmallImage = false;
			},
			/*拨打电话*/
			tel() {
			    if (!this.currentInfo.phone) return false;
				uni.makePhoneCall({
					phoneNumber: this.currentInfo.phone
				})
			},
            getUserInfo(e) {
                this.modalName = null;
                uni.hideLoading();
                if (e.detail.errMsg === 'getUserInfo:fail auth deny') {
                    uni.showToast({
                        title: '登录失败, 您拒绝了了微信登录...',
                        icon: 'none',
                        duration: 2000,
                        mask: true
                    });
                } else {
                    const self = this;
                    uni.login({
                        provider: 'weixin',
                        success: (res) => {
                            uni.getUserInfo({
                                provider: 'weixin',
                                success(infoRes) {
                                    let data = {
                                        encryptedData: infoRes.encryptedData,
                                        iv: infoRes.iv,
                                        code: res.code
                                    };
                                    self.$http('wxapp/login', data, 'post').then(r => {
                                        self.login(r.user);
                                        self.changeToken(r.access_token);
                                        uni.setStorageSync('apiToken', r.access_token);
                                        uni.showToast({
                                            title: '授权成功',
                                            icon: 'success',
                                            duration: 3000,
                                            mask: true
                                        });
                                        self.isShowAuth = false;
                                        self.requestBefore();
                                    })
                                }
                            });
                        }
                    })
                }
            },
			/* 新建联系人 */
			addPhoneNumber() {
			    if (!this.currentInfo.phone) return false;
				uni.addPhoneContact(
				    {
					    firstName: this.currentInfo.name,
					    mobilePhoneNumber: this.currentInfo.phone,
                        organization: this.currentInfo.companyname,
                        title: this.currentInfo.position,
                        // #ifdef APP-PLUS
                        success(res) {
                            if (res.errMsg ===  "addPhoneContact:ok") {
                                uni.showToast({
                                    title: '保存成功',
                                    duration: 1000
                                })
                            }
                        },
                        fail(err) {
                            uni.showToast({
                                title: '保存失败, 请确保您授权了通讯录权限',
                                duration: 3000,
                                icon: 'none'
                            })
                        }
                        // #endif
				    }
				)
			},
			showCard(e) {
				// 分享到朋友圈
                this.modalName = e.currentTarget.dataset.target;
			},
            requestBefore() {
			    let uidx = this.uidx;
                if (this.personal === 1) {
                    this.getUserMsg();
                } else if (Reflect.has(this.currentLoginUserInfo, 'uid')) {// 在已经获取了就不要再去请求了
                    this.changeCurrentInfo(this.currentLoginUserInfo);
                } else {
                    this.getUserMsg();
                }
                if (uidx !== undefined) { // 在uidx为undefined时就不需要去请求了, 如果还发, 那么后端会报个错
                    if (uidx !== this.uId) {// 这个是被分享人的名片信息
                        this.setUId(uidx);
                        this.setInterceptUId(uidx);
                        this.getUserMsg(uidx);
                    } else {
                        this.changeCurrentInfo(this.currentUserInfo);
                        this.setInterceptUId('');
                    }
                }
                // canvas
                let screenWd = uni.getSystemInfoSync().windowWidth;
                this.canvasWd = this.canvasWidth = screenWd - 20 * 1.9;
                this.currentBgNum = this.currentInfo.template_id || 0;
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
                            weiXinAuthorization.saveImg(err);
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
					title: `您好，我是${this.currentInfo.name}。这是我的名片，请惠存`,
					href: '/pages/ucenter/businesscard/index/businesscard?uidx='+ this.currentInfo.uid,
					summary: "房销客管理系统，管理您的客户，提高您的业绩！",
                    imageUrl: self.shareImg,
					success(res) {
                        console.log("success:" + JSON.stringify(res));
					},
					fail(error) {
                        console.log("fail:" + JSON.stringify(err));
					}
				});
			},
			// #endif
			messageInformation() {
			    if (!Reflect.has(this.currentInfo, 'uid')) return false;
				// 留言咨询
				uni.navigateTo({
					url: `/pages/message/chat/index?id=${this.currentInfo.uid}&type=App\\User&send-name=${this.currentInfo.name}`
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
                if (!uidx) {
                    uni.hideLoading();
                    return false;
                }
                this.$http('geren/userinfo', {uidx: uidx}).then(res => {
                    let houseArr = res.house.data;
                    let r = res.data;
                    if (!r.avatar) r.avatar = this.defaultAvatar;
                    const data = Object.assign({}, {readNumber: res.readnumber}, {BrowseUser: res.Browseuser}, {house: houseArr}, r);
                    self[boo? 'changeCurrentUserInfo': 'changeCurrentLoginUserInfo'](data);
                    if (!boo) self.hasCurrentId = Reflect.has(data, 'uid');
                    this.relayOn = !this.relayOn;
                    if (!boo) this.setInterceptUId('');
                }).catch(err => {
                    console.log(err);
                }).finally(_ => {
                    uni.hideLoading();
                });
            },
            showLoading() {
                uni.showLoading({
                    title: '授权中...',
                    mask: true
                })
            }
		},
		onShareAppMessage() {
            return {
			    title: `您好，我是${this.currentInfo.name}。这是我的名片，请惠存`,
                imageUrl: this.shareImg,
                path: '/pages/ucenter/businesscard/index/businesscard?uidx='+ this.currentInfo.uid
            }
		},
		computed: {
			...mapState('ucenter', ['currentUserInfo', 'downLoadImg', 'currentLoginUserInfo', 'currentInfo', 'uId', 'browseUser']),
			...mapState(['userInfo', 'defaultAvatar', 'token']),
			...mapGetters('ucenter', ['imgSrcGetters'])
		},
        onShow() {
            const self = this;
            self.relayOn = !self.relayOn;
        },
		mounted() {}
	}
</script>

<style lang="scss">
	@import 'index';
</style>
