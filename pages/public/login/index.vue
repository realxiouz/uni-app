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
			<button open-type="getUserInfo" @getuserinfo="getuserinfo" class="cuIcon cuIcon-weixin border" style="background:#F1F1F1; border: 1px solid rgba(0, 0, 0, 0);color: #39B54A;"></button>

		</view>
		<!-- #endif -->
	</view>
</template>

<script>
	import { mapMutations, mapState} from 'vuex';
	export default {
		onLoad(opt) {
			// this.wechatlogin()
            this.setShopId(opt.shop_id);
        },
		data: _ => ({
			formBean: {
				mobile: '',
				password: '',
			}
		}),
		methods: {
			...mapMutations(['login', 'changeToken']),
            ...mapMutations('ucenter', ['setInterceptUId', 'setUId']),
            ...mapMutations('work', ['setShopId']),
            ...mapMutations('message', ['setFirstTimes']),
			handleLogin() {
				this.$http('auth/login', this.formBean, 'post').then(r => {
					// console.log(r);
					let res = r.user;
					// console.log(userInfo);
					// uni.setStorageSync('userInfo', r.user);
					// 表示已经登录成功
					// this.hasLogin = true;
					this.setFirstTimes(false);
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
					// console.log(e);
					uni.showToast({
						title: '用户名或者密码错误',
						icon: 'none'
					})
				})
			},
			wechatlogin(data) {
				uni.login({
				  provider: 'weixin',
				  success: (loginRes) => {
				    console.log(loginRes);
					this.code = loginRes.code;
					console.log(this.code);
					// this.$http('wxapp/login', {code: loginRes.code}, 'post').then(r => {
					//
					// })
				    // 获取用户信息
				    uni.getUserInfo({
				      provider: 'weixin',
				      success: function (infoRes) {
				        console.log(infoRes.userInfo);
				      }
				    });
				  },
				  fail: (err) => {
				  	console.log(err);
				  }
				})
			},
			getuserinfo(e) {
				/*let data = {
					// encryptedData: e.detail.encryptedData,
					// iv: e.detail.iv,
					code: this.code
				}*/
                if (e.detail.errMsg === 'getUserInfo:fail auth deny') {
                    uni.showToast({
                        title: '您拒绝了微信登录...',
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
                                let data = {
                                    encryptedData: infoRes.encryptedData,
                                    iv: infoRes.iv,
                                    code: res.code
                                };
                                self.$http('wxapp/login', data, 'post').then(r => {
                                    self.login(r.user);
                                    uni.setStorageSync('apiToken', r.access_token)
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
                            }
                        });
					}
				})
			}
		},
		computed: {
			...mapState('ucenter', ['interceptUId']),
            ...mapState(['defaultAvatar'])
		}
	}
</script>

<style>
    .border:after {
        border: 1px solid rgba(0, 0, 0, 0) !important;
    }
</style>
