<template>
	<view>
		<form>
			<view class="cu-form-group">
				<view class="title">看房日期</view>
				<picker mode="date" :value="date" start="2015-09-01" end="2020-09-01" @change="dateChange">
					<view class="picker">
						{{date}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">看房时间</view>
				<picker mode="time" :value="time" start="09:01" end="21:01" @change="timeChange">
					<view class="picker">
						{{time}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">到场人数</view>
				<input placeholder="填写实看人数" v-model="formBean.peoples"></input>
			</view>
			<upload-files @imgs="handleImgs" :max-count="1" title="现场照片"/>
			<upload-files @imgs="handleImgs" :max-count="1" title="带看确认单"/>
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
			formLoading: false,
			date: '2019-08-03',
			time: '12:00',
		}),
		methods: {
			timeChange(e) {
				this.time = e.detail.value
			},
			dateChange(e) {
				this.date = e.detail.value
			},
			handleSave() {
				this.formBean.customer_id = this.customerId
				this.formBean.kan_time = new Date()
				// this.$http('daikan', this.formBean, 'post').then(r => {
				// }).finally(_ => {
				// 	this.formLoading = false
				// })
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
