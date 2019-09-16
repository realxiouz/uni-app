<template>
	<view>
		<form>
			<view class="cu-form-group margin-top">
				<textarea :maxlength="200" @input="handleInput" placeholder="填写驳回理由"></textarea>
			</view>
		</form>
		<save @save="handleSave" :loading="formLoading"/>
	</view>
	
</template>

<script>
	import Save from "@/components/buttom-button"

	export default {
		onLoad(opt) {
			this.bId = opt.id
		},
		data: _ => ({
			formLoading: false,
			reason: '',
			bId: ''
		}),
		methods: {
			handleInput(e) {
				this.reason = e.detail.value
			},
			handleSave() {
				if (!this.reason) {
					uni.showToast({
						title: '填写驳回原因',
						icon: 'none'
					})
				} else {
					this.formLoading = true
					this.$http(`baobei/reject/${this.bId}`, {
						reject_reason: this.reason
					} , 'put').then(r => {
						uni.navigateBack()
					}).finally(_ => {
						this.formLoading = false
					})
				}
			},
			
		},
		components: {
			Save
		}
	}
</script>

<style>
</style>
