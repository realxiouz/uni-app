<template>
	<view>
		<form>
			<view class="cu-form-group">
				<view class="title">姓名</view>
				<input placeholder="输入姓名" v-model="formBean.name" />
			</view>
			<view class="cu-form-group">
				<view class="title">电话</view>
				<input placeholder="输入电话" v-model="formBean.phone" />
			</view>
			<view class="cu-form-group">
				<view class="title">QQ</view>
				<input placeholder="输入QQ" v-model="formBean.qq" />
			</view>
			<view class="cu-form-group">
				<view class="title">微信</view>
				<input placeholder="输入微信" v-model="formBean.weixin" />
			</view>
			<view class="cu-form-group">
				<view class="title">职位</view>
				<input placeholder="输入职位" v-model="formBean.title" />
			</view>
			<view class="cu-form-group">
				<view class="title">邮箱</view>
				<input placeholder="输入邮箱" v-model="formBean.email" />
			</view>
			<view class="cu-form-group">
				<textarea :maxlength="200" @input="textareaAInput" placeholder="填写备注"></textarea>
			</view>
		</form>
		<save @save="handleSave" :loading="formLoading" />
	</view>
	
</template>

<script>
	import save from "@/components/buttom-button"

	export default {
		onLoad(opt) {
			this.formBean.cooperation_id = opt.cId
			if (opt.id) {
				this.$http(`linkmen/${opt.id}`).then(r => {
					
				})
			}
		},
		data: _ => ({
			formBean: {
				name: '',
				phone: '',
				qq: '',
				weixin: '',
				title: '',
				email: '',
				remark: '',
				cooperation_type: 'channel',
				cooperation_id: ''
			},
			formLoading: false,
			cooperation_id: ''
		}),
		methods: {
			textareaAInput(e) {
				this.formBean.remark = e.detail.value
			},
			handleSave() {
				this.formLoading = true
				this.$http('linkmen', this.formBean, 'post').then(r => {
					uni.navigateBack({
						delta: 1
					})
				}).finally(_ => {
					this.formLoading = false
				})
			},
		},
		components: {
			save,
		},
		
	}
</script>

<style>
</style>
