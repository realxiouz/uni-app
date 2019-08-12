<template>
	<view>
		<form>
			<view class="cu-form-group">
				<view class="title">带看姓名</view>
				<input placeholder="填写姓名" v-model="formBean.peoples"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">带看电话</view>
				<input placeholder="填写电话" v-model="formBean.peoples"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">预计看房日期</view>
				<picker mode="date" :value="date" start="2015-09-01" end="2020-09-01" @change="dateChange">
					<view class="picker">
						{{date}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">预计看房时间</view>
				<picker mode="time" :value="time" start="09:01" end="21:01" @change="timeChange">
					<view class="picker">
						{{time}}
					</view>
				</picker>
			</view>
			<view>
				<view class="cu-form-group margin-top">
					<view class="title">客户名称</view>
					<input type="text" placeholder="填写客户名称" />
					<button class='cu-btn bg-blue shadow'>导入</button>
				</view>
				<view class="cu-form-group">
					<view class="title">客户电话</view>
					<input type="text" placeholder="填写客户电话" />
					<switch @change="SwitchA" :class="switchA?'checked':''" :checked="switchA?true:false"></switch>
				</view>
				<view class="cu-form-group">
					<view class="title">客户性别</view>
					<switch @change="SwitchA" :class="switchA?'checked':''" :checked="switchA?true:false"></switch>
				</view>
			</view>
			
			<view class="cu-form-group margin-top">
				<textarea :maxlength="200" @input="textareaAInput" placeholder="备注"></textarea>
			</view>
		</form>
		
		<save @save="handleSave"/>
	</view>
	
</template>

<script>
	import save from "@/components/buttom-button"
	import UploadFiles from "@/components/upload-files"
	import moment from 'moment'


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
			date: moment().format('YYYY-MM-DD'),
			time: moment().format('hh:mm')
		}),
		methods: {
			textareaAInput(e) {
				this.formBean.remark = e.detail.value
			},
			handleSave() {
				this.formBean.customer_id = this.customerId
				this.formBean.kan_time = new Date()
				this.$http('daikan', this.formBean, 'post').then(r => {
					uni.showToast({
						title: '表单提交成功'
					})
					
					setTimeout(_ => {
						let pages = getCurrentPages()
						pages[pages.length - 2].setData({
							needRefresh: true
						})
						uni.navigateBack()
					}, 1500)
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
