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
	import { mapMutations } from 'vuex'

	export default {
		data: _ => ({
			formBean: {
				mobile: '',
				password: ''
			}
		}),
		methods: {
			...mapMutations(['login']),
			handleLogin() {
				this.$http('auth/login', this.formBean, 'post').then(r => {
					uni.setStorageSync('apiToken', r.access_token)
					this.login(r.user)
					uni.switchTab({
						url: '/pages/ucenter/index/index'
					})
				}).catch(e => {
					uni.showToast({
						title: '用户名或者密码错误',
						icon: 'none'
					})
				})
			}
		}
	}
</script>

<style>
</style>
