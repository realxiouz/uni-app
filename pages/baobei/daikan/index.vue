<template>
	<view>
		<form>
			<view class="cu-form-group">
				<view class="title">看房日期</view>
				<picker mode="date" :value="date" start="2015-09-01" end="2020-09-01" @change="dateChange">
					<view class="picker">
						{{date?date:'选择日期'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">看房时间</view>
				<picker mode="time" :value="time" start="09:01" end="21:01" @change="timeChange">
					<view class="picker">
						{{time?time:'选择时间'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">到场人数</view>
				<input placeholder="填写实看人数" v-model="formBean.peoples"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">带看情况</view>
				<input placeholder="填写带看情况" v-model="formBean.remark"></input>
			</view>
			<upload-files @imgs="handleImgs1" :max-count="1" title="现场照片"/>
			<upload-files @imgs="handleImgs2" :max-count="1" title="带看确认单"/>
			<view class="cu-form-group">
				<view class="title">签名</view>
				<sign @signed="formBean.sign_img = $event"/>
			</view>
		</form>
		
		<save @save="handleSave" :loading="formLoading"/>
	</view>
	
</template>

<script>
	import save from "@/components/buttom-button"
	import UploadFiles from "@/components/upload-files"
	import Sign from "@/components/sign"

	export default {
		onLoad(opt) {
			this.formBean.baobei_id = opt.bId
		},
		data: _ => ({
			formBean: {
				peoples: 1,
				remark: ''
			},
			formLoading: false,
			date: '',
			time: '',
		}),
		methods: {
			timeChange(e) {
				this.time = e.detail.value
			},
			dateChange(e) {
				this.date = e.detail.value
			},
			handleSave() {
				this.formBean.kan_time = this.date && this.time ? `${this.date} ${this.time}` : null
				this.formLoading = true
				this.$http('daikan', this.formBean, 'post').then(r => {
					uni.navigateBack();
				}).finally(_ => {
					this.formLoading = false
				})
			},
			handleImgs1(e) {
				this.formBean.img = e
			},
			handleImgs2(e) {
				this.formBean.confirm_img = e.length ? e[0] : null
			}
		},
		components: {
			save, UploadFiles, Sign
		}
	}
</script>

<style>
</style>
