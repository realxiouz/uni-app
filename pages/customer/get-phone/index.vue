<template>
	<view>
		<form>
			<view class="cu-form-group margin-top" v-if="!phone">
				<textarea :maxlength="200" @input="handleInput" placeholder="填写理由"></textarea>
			</view>
			<view class="cu-form-group margin-top" v-else @click="makePhone">
				<view class="title">客户电话</view>
				<input v-model="phone" disabled></input>
				<view class="text-xxl text-cyan">
					<text class="cuIcon cuIcon-phone"></text>
				</view>
			</view>
		</form>
		<save @save="handleSave" :loading="formLoading" v-if="!phone" title="取电"/>
		<save @save="gj" v-else title="去跟进"/>
	</view>
	
</template>

<script>
	import Save from "@/components/buttom-button"

	export default {
		onLoad(opt) {
			this.cId = opt.cId
		},
		data: _ => ({
			formLoading: false,
			reason: '',
			cId: '',
			
			phone: ''
		}),
		methods: {
			handleInput(e) {
				this.reason = e.detail.value
			},
			gj() {
				uni.navigateTo({
					url: `/pages/common/followup/index?customerId=${this.cId}`
				})
			},
			handleSave() {
				if (!this.reason) {
					uni.showToast({
						title: '填写取电原因',
						icon: 'none'
					})
				} else {
					this.formLoading = true
					this.$http(`customer_phone_view_logs`, {
						reason: this.reason,
						customer_id: this.cId
					} , 'post').then(r => {
						this.phone = r.phone
						// uni.navigateBack()
					}).finally(_ => {
						this.formLoading = false
					})
				}
			},
			makePhone() {
				uni.makePhoneCall({
				    phoneNumber: this.phone
				})
			}
		},
		components: {
			Save
		}
	}
</script>

<style>
</style>
