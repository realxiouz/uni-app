<template>
	<view>
		<form>
			<view class="cu-form-group margin-top">
				<view class="title">跟进方式</view>
				<picker @change="typeChange" :value="typeInx" :range="types" range-key="text">
					<view class="picker">
						{{typeInx>-1?types[typeInx].text:'选择跟进方式'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<textarea :maxlength="200" @input="textareaAInput" placeholder="跟进详情,最少10个字符,最多200个字符"></textarea>
			</view>
			<view class="cu-form-group">
				<view class="title">意愿度</view>
				<picker @change="desireChange" :value="desireInx" :range="desires" range-key="text">
					<view class="picker">
						{{desireInx>-1?desires[desireInx].text:'选择意愿度'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">下次跟进日期</view>
				<picker mode="date" :value="date" start="2015-09-01" end="2020-09-01" @change="dateChange">
					<view class="picker">
						{{date?date:'选择日期'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">下次跟进时间</view>
				<picker mode="time" :value="time" start="09:01" end="21:01" @change="timeChange">
					<view class="picker">
						{{time?time:'选择时间'}}
					</view>
				</picker>
			</view>
			
			<upload-files v-if="typeInx==1||typeInx==2" @imgs="handleImgs"/>
		</form>
		
		<save @save="handleSave" :loading="formLoading" />
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
				content: ''
			},
			formLoading: false,
			date: '',
			time: '',
			types: [
				{text: '电话', value: '1'},
				{text: '微信', value: '2'},
				{text: '现场', value: '3'},
				{text: '短信', value: '4'},
				{text: '邮件', value: '5'},
				{text: '其他', value: '6'},
			],
			typeInx: -1,
			
			desires: [
				{text: '厌恶', value: '1'},
				{text: '不感兴趣', value: '2'},
				{text: '一般', value: '3'},
				{text: '感兴趣', value: '4'},
				{text: '非常感兴趣', value: '5'},
			],
			desireInx: -1,
			
			customerId: ''
		}),
		methods: {
			textareaAInput(e) {
				this.formBean.content = e.detail.value
			},
			timeChange(e) {
				this.time = e.detail.value
			},
			dateChange(e) {
				this.date = e.detail.value
			},
			handleSave() {
				this.formBean.customer_id = this.customerId
				this.formBean.next_genjin_at = this.dateTime
				this.formLoading = true
				this.$http('customer_genjin', this.formBean, 'post').then(r => {
					uni.navigateBack({
						delta: 1
					})
				}).finally(_ => {
					this.formLoading = false
				})
			},
			typeChange(e) {
				this.typeInx = e.detail.value
				this.formBean.type_id = this.types[this.typeInx].value
			},
			desireChange(e) {
				this.desireInx = e.detail.value
				this.formBean.desire = this.desires[this.desireInx].value
			},
			handleImgs(e) {
				this.formBean.imgs = e
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
