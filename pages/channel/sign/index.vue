<template>
	<view>
		<form>
			<view class="cu-form-group margin-top">
				<view class="title">选择引荐人</view>
				<single-picker :range="types" range-key="name" v-model="formBean.invitation_id" />
			</view>
			
			<view class="cu-form-group">
				<view class="title">合作截止日期</view>
				<picker mode="date" :value="date" @change="dateChange">
					<view class="picker">
						{{date?date:'选择日期'}}
					</view>
				</picker>
			</view>
		</form>
		
		<save @save="handleSave" :loading="formLoading" />
	</view>
	
</template>

<script>
	import save from "@/components/buttom-button"
	import UploadFiles from "@/components/upload-files"
	import SinglePicker from '@/components/single-picker'


	export default {
		onLoad(opt) {
			this.formBean.channel_id = opt.cId
			this.$http('contacts').then(r => {
				this.types = r
			})
		},
		data: _ => ({
			formBean: {
				channel_id:'',
				invitation_id: ''
			},
			formLoading: false,
			date: '',
			types: [],
		}),
		methods: {
			dateChange(e) {
				this.date = e.detail.value
				this.formBean.period = e.detail.value
			},
			handleSave() {
				this.formLoading = true
				this.$http('cooperation_log', this.formBean, 'post').then(r => {
					uni.navigateBack({
						delta: 1
					})
				}).finally(_ => {
					this.formLoading = false
				})
			},
			
		},
		components: {
			save, UploadFiles, SinglePicker
		},
	}
</script>

<style>
</style>
