<template>
	<view>
		<view class="cu-card case">
			<form class="cu-item">
				<view class="cu-form-group">
					<view class="title">手机号码</view>
					<input placeholder="11位手机号码" type="number" :maxlength="11" v-model="formBean.mobile"/>
				</view>
				<view class="cu-form-group">
					<view class="title">密码</view>
					<input placeholder="密码" password v-model="formBean.password"/>
				</view>
				<button @tap="handleLogin">登录</button>
				<!-- <button @tap="wechatlogin">wechat</button>
				<button open-type="getUserInfo" @getuserinfo="getuserinfo" withCredentials>open_type</button> -->
			</form>
		</view>
		
		<!-- #ifndef H5 -->
		<view class="text-xsl text-green text-center q-fixed" style="bottom: 160upx;top: auto">
			<button open-type="getUserInfo" @getuserinfo="getUserInfo" class="cuIcon cuIcon-weixin border" style="background:#F1F1F1; border: 1px solid rgba(0, 0, 0, 0);color: #39B54A;" @tap="showLoading">
                <view style="position: absolute; bottom: 20rpx;width: 92%;font-size: 14px; text-align: center;">微信登录</view>
            </button>
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
	import { mapMutations, mapState} from 'vuex';
	export default {
		onLoad(opt) {
			// this.wechatlogin()
            this.shopId = opt.shop_id;
            if (this.shopId) {
                uni.switchTab({
                    url: '/pages/home/index/index'
                });
                return true;
            }
            uni.setNavigationBarTitle({
                title: '登录·注册'
            })
        },
		data: _ => ({
			formBean: {
				mobile: '',
				password: '',
			},
            modalName: 1,
            showDialog: true,
            shopId: ''
		}),
        onUnload() {
            if (!this.hasLogin && !this.shopId) {
                uni.removeStorage({key: 'apiToken'});
                this.changeToken('');
            }
        },
		methods: {
			...mapMutations(['login', 'changeToken']),
            ...mapMutations('ucenter', ['setInterceptUId', 'setUId']),
			handleLogin() {
				this.$http('auth/login', this.formBean, 'post').then(r => {
					// console.log(r);
					let res = r.user;
					this.showDialog = false;
					// console.log(userInfo);
					// uni.setStorageSync('userInfo', r.user);
					// 表示已经登录成功
					// this.hasLogin = true;
					this.changeToken(r.access_token);
                    uni.setStorageSync('apiToken', r.access_token);
                    if (!res.avatar) {
                        res.avatar = this.defaultAvatar;
                    }
                    this.login(res);
					if (!/(object|undefined)/.test(typeof this.interceptUId) && this.interceptUId !== '') {
					    this.setUId('');
					    uni.reLaunch({
                            url: '/pages/ucenter/businesscard/index/businesscard?uidx=' + this.interceptUId
                        });
                        this.setInterceptUId('');// 用完一定要清除掉
                    } else {
                        uni.switchTab({
                            url: '/pages/work/index/index'
                        })
                    }
				}).catch(e => {
                    console.log(e);
                    // console.log(e);
					uni.showToast({
						title: '用户名或者密码错误',
						icon: 'none'
					})
				})
			},
            getUserInfo(e) {
                this.modalName = null;
				/*let data = {
					// encryptedData: e.detail.encryptedData,
					// iv: e.detail.iv,
					code: this.code
				}*/
                if (e.detail.errMsg === 'getUserInfo:fail auth deny') {
                    uni.hideLoading();
                    uni.showToast({
                        title: '登录失败, 您拒绝了微信登录...',
                        icon: 'none',
                        duration: 2000,
                        mask: true
                    })
                } else {
                    this.wxLogin();
                }
			},
			wxLogin() {
				const self = this;
				uni.login({
					provider: 'weixin',
					success: (res) => {
                        uni.getUserInfo({
                            provider: 'weixin',
                            success(infoRes) {
                                uni.hideLoading();
                                let data = {
                                    encryptedData: infoRes.encryptedData,
                                    iv: infoRes.iv,
                                    code: res.code
                                };
                                self.$http('wxapp/login', data, 'post').then(r => {
                                    self.login(r.user);
                                    self.changeToken(r.access_token);
                                    uni.setStorageSync('apiToken', r.access_token);
                                    if (!r.user.wxbinded) {
                                        uni.showModal({
                                            title: '该微信还未绑定用户,是否绑定?',
                                            cancelText: '暂不绑定',
                                            confirmText: '去绑定',
                                            success: (r) => {
                                                if (r.confirm) {
                                                    uni.navigateTo({
                                                        url: '/pages/public/bind/index'
                                                    })
                                                } else if (r.cancel) {
                                                    uni.switchTab({
                                                        url: '/pages/work/index/index'
                                                    })
                                                }
                                            },
                                        })
                                    } else {
                                        uni.switchTab({
                                            url: '/pages/work/index/index'
                                        })
                                    }
                                })
                            },
                            fail() {
                                uni.hideLoading();
                                uni.showToast({
                                    title: '获取信息失败, 请重试...',
                                    icon: 'none',
                                    duration: 2000
                                })
                            }
                        });
					},
                    fail() {
                        uni.hideLoading();
                        uni.showToast({
                            title: '登录失败, 您拒绝了微信登录...',
                            icon: 'none',
                            duration: 2000,
                            mask: true
                        })
                    }
				})
			},
            showLoading() {
			    uni.showLoading({
                    title: '授权中...',
                    mask: true
                });
                // #ifndef MP-WEIXIN
                this.wxLogin();
                // #endif
            }
		},
		computed: {
			...mapState('ucenter', ['interceptUId']),
            ...mapState(['defaultAvatar', 'hasLogin']),
            ...mapState('project', {
                shop_id: state => state.shopId
            })
		}
	}
</script>

<style>
    .border:after {
        border: 1px solid rgba(0, 0, 0, 0) !important;
    }
</style>
