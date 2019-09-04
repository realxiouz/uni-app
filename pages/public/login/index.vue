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
			<text class="cuIcon cuIcon-weixin" @click="wxLogin"></text>
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
	import { mapMutations} from 'vuex';
	export default {
		onLoad() {
			this.wechatlogin()
		},
		data: _ => ({
			formBean: {
				mobile: '10000000000',
				password: '000000',
			}
		}),
		methods: {
			...mapMutations(['login', 'changeToken']),
			handleLogin() {
				this.$http('auth/login', this.formBean, 'post').then(r => {
					// console.log(r);
					let res = r.user;
					// console.log(userInfo);
					// uni.setStorageSync('userInfo', r.user);
					// 表示已经登录成功
					// this.hasLogin = true;
					this.changeToken(r.access_token);
					uni.setStorageSync('apiToken', r.access_token);
					this.login(r.user);
					uni.switchTab({
						url: '/pages/work/index/index'
					})
				}).catch(e => {
					// console.log(e);
					uni.showToast({
						title: '用户名或者密码错误',
						icon: 'none'
					})
				})
			},
			wechatlogin() {
				uni.login({
				  provider: 'weixin',
				  success: (loginRes) => {
				    console.log(loginRes);
					this.code = loginRes.code
					console.log(this.code);
					// this.$http('wxapp/login', {code: loginRes.code}, 'post').then(r => {
					// 	
					// })
				    // 获取用户信息
				    uni.getUserInfo({
				      provider: 'weixin',
				      success: function (infoRes) {
				        console.log(infoRes.userInfo);
				      },
					  fail: (err) => {
					  	console.log(err);
					  }
				    });
				  },
				  fail: (err) => {
				  	console.log(err);
				  }
				})
			},
			getuserinfo(e) {
				let data = {
					// encryptedData: e.detail.encryptedData,
					// iv: e.detail.iv,
					code: this.code
				}
				this.$http('wxapp/login', data, 'post').then(r => {
					
				})
			},
			wxLogin() {
				uni.login({
					provider: 'weixin',
					success: (res) => {
						this.$http('wxapp/login', {code: res.code}, 'post').then(r => {
							this.login(r.user)
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
				})
			}
		},
		computed: {
			// ...MapState(['hasLogin'])
		}
	}
</script>

<style>
</style>
