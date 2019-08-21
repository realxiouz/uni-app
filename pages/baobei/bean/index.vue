<template>
	<view>
		<form>
			<view class="cu-form-group">
				<view class="title">报备楼盘</view>
				<navigator class="show-arrow" url="/pages/baobei/projects/index" hover-class="none">
					<view>选择楼盘</view>
				</navigator>
			</view>
			<view class="bg-white padding-lr padding-tb-sm solid-bottom solid-top flex flex-wrap">
				<view class="cu-capsule radius margin-bottom-xs" v-for="(i, inx) in selProject" :key="inx" @click="delProject(i.id)">
					<view class="cu-tag line-grey">{{i.text}}</view>
					<view class='cu-tag bg-red '>
						<text class='cuIcon-delete'></text>
					</view>
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">带看姓名</view>
				<input placeholder="填写姓名" v-model="daikan.name"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">带看电话</view>
				<input placeholder="填写电话" v-model="daikan.phone"></input>
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
			<view class="cu-form-group">
				<view class="title">隐号报备</view>
				<switch @change="handleHidePhone" :class="formBean.yinghao?'checked':''" :checked="formBean.yinghao"></switch>
			</view>
			
			<view class="cu-form-group margin-top">
				<button class="cu-btn radius bg-blue" @click="adddCustomer">添加客户</button>
				<button class="cu-btn radius bg-green" @click="importCustomer">导入客户</button>
			</view>
			
			<view v-for="(i, inx) in selCustomer" :key="inx">
				<view class="cu-form-group margin-top">
					<view class="title">客户名称</view>
					<input type="text" placeholder="填写客户名称" v-model="i.name" />
					<switch class='switch-sex' @change="handleSex($event, i)" :class="i.sex==1?'checked':''" :checked="i.sex==1"></switch>
				</view>
				<view class="cu-form-group">
					<view class="title">客户电话</view>
					<input type="text" placeholder="填写客户电话" v-model="i.phone"/>
					<button class="cu-btn bg-red radius small" @click="delCustomer(inx)">
						<view class="bg-red">
							<text class="cuIcon cuIcon-delete"></text>
						</view>
					</button>
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
	import Save from "@/components/buttom-button"
	import moment from 'moment'
	import { mapState, mapMutations } from 'vuex'

	export default {
		onLoad(opt) {
			this.customerId = opt.customerId
		},
		data: _ => ({
			formBean: {
				daikan_name: '',
				daikan_phone: '',
				ordered_time: '',
				project_ids: [],
				customers: [],
				yinghao: false,
				remark: ''
			},
			customerId: '',
			date: moment().format('YYYY-MM-DD'),
			time: moment().format('HH:mm')
		}),
		methods: {
			...mapMutations('baobei', ['setSelProject', 'setSelCustomer']),
			textareaAInput(e) {
				this.formBean.remark = e.detail.value
			},
			handleSave() {
				this.formBean.daikan_name = this.daikan.name
				this.formBean.daikan_phone = this.daikan.phone
				this.formBean.ordered_time = this.dateTime
				this.formBean.customers = this.selCustomer.map(i => ({
					customer_name: i.name,
					customer_phone: i.phone,
					customer_sex: i.sex,
					customer_id: i.id
				}))
				this.formBean.project_ids = this.selProject.map(i => i.id)
				this.$http('baobei', this.formBean, 'post').then(r => {
					uni.showToast({
						title: '表单提交成功'
					})
					setTimeout(_ => {
						uni.navigateBack()
					}, 1500)
				})
			},
			importCustomer() {
				let itemList = ['历史记录', '客户列表']
				// #ifdef APP-PLUS
				itemList.push('通讯录')
				// #endif
				uni.showActionSheet({
					itemList,
					success: r => {
						switch (itemList[r.tapIndex]){
							case '历史记录':
								uni.navigateTo({
									url: `/pages/baobei/customers/index?type=history`
								})
								break;
							case '客户列表':
								uni.navigateTo({
									url: `/pages/baobei/customers/index?type=my`
								})
								break;
							case '通讯录':
								uni.navigateTo({
									url: `/pages/app/contact/index`
								})
								break;
							default:
								break;
						}
					}
				})
			},
			handleHidePhone(e) {
				this.formBean.yinghao = e.detail.value
			},
			delProject(id) {
				let arr = this.selProject.filter(i => i.id != id)
				this.setSelProject(arr)
			},
			handleSex(e, i) {
				e.detail.value ? i.sex = 1 : i.sex = 0
			},
			dateChange(e) {
				this.date = e.detail.value
			},
			timeChange(e) {
				this.time = e.detail.value
			},
			adddCustomer() {
				this.setSelCustomer([...this.selCustomer, {name: '', phone: ''}])
			},
			delCustomer(inx) {
				this.selCustomer.splice(inx, 1)
			}
		},
		components: {
			Save
		},
		computed: {
			...mapState('baobei', ['selCustomer', 'daikan', 'selProject']),
			dateTime() {
				return `${this.date} ${this.time}`
			}
		}
	}
</script>

<style>
</style>
