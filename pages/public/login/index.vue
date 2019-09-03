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
				
			</form>
		</view>
	</view>
</template>

<script>
	import { mapMutations} from 'vuex';
	export default {
		data: _ => ({
			formBean: {
				mobile: '10000000000',
				password: '000000'
			}
		}),
		methods: {
			...mapMutations(['login', 'changeToken']),
			handleLogin() {
				this.$http('auth/login', this.formBean, 'post').then(r => {
					// console.log(r);
					let res = r.user;
					const userInfo = {
						id: res.id,
						companyname: res.company.name,
						avatar: res.avatar,
						name: res.name,
						position: res.department.name,
						phone: res.mobile,
						weixin: res.weixin,
						email: res.email,
						mobile: res.mobile,
						signature: res.signature
					}
					// console.log(userInfo);
					// uni.setStorageSync('userInfo', userInfo);
					// 表示已经登录成功
					// this.hasLogin = true;
					this.changeToken(r.access_token);
					uni.setStorageSync('apiToken', r.access_token);
					this.login(res);
					uni.switchTab({
						url: '/pages/ucenter/index/index'
					})
				}).catch(e => {
					// console.log(e);
					uni.showToast({
						title: '用户名或者密码错误',
						icon: 'none'
					})
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
