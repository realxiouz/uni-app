<template>
	<view>
		<form>
			<view class="cu-form-group">
				<view class="title">实看人数</view>
				<input placeholder="填写是看人数" v-model="formBean.peoples"></input>
			</view>
			<view class="cu-form-group">
				<textarea :maxlength="200" @input="textareaAInput" placeholder="到访说明"></textarea>
			</view>
			<upload-files @imgs="handleImgs" :max-count="6"/>
		</form>
		
		<save @save="handleSave" :loading="formLoading"/>
	</view>
	
</template>

<script>
	import save from "@/components/buttom-button"
	import UploadFiles from "@/components/upload-files"


	export default {
		onLoad(opt) {
			this.customerId = opt.customerId
		},
		data: _ => ({
			formBean: {
				peoples: '',
				remark: ''
			},
			customerId: '',
			formLoading: false
		}),
		methods: {
			textareaAInput(e) {
				this.formBean.remark = e.detail.value
			},
			handleSave() {
				this.formBean.customer_id = this.customerId
				this.formBean.kan_time = new Date()
				this.formLoading = true
				this.$http('daikan', this.formBean, 'post').then(r => {
					uni.showToast({
						title: '表单提交成功'
					})
					
					// setTimeout(_ => {
					// 	let pages = getCurrentPages()
					// 	pages[pages.length - 2].setData({
					// 		needRefresh: true
					// 	})
					// 	uni.navigateBack()
					// }, 1500)
					uni.navigateBack()
				}).finally(_ => {
					this.formLoading = false
				})
			},
			handleImgs(e) {
				this.formBean.img = e
			}
		},
		components: {
			save, UploadFiles
		},
		computed: {
			dateTime() {
				return `${this.date} ${this.time}`
			}
		}
	}
</script>

<style>
</style>
