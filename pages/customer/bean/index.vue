<template>
	<view>
		<form>
			<view class="cu-form-group margin-top">
				<view class="title">姓名</view>
				<input placeholder="输入姓名" v-model="formBean.name"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">电话</view>
				<input placeholder="输入电话号码" v-model="formBean.phone"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">性别</view>
				<picker @change="sexChange" :value="sexInx" :range="sexs" range-key="text">
					<view class="picker">
						{{sexInx>-1?sexs[sexInx].text:'选择性别'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">微信</view>
				<input placeholder="输入微信" v-model="formBean.weixin"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">QQ</view>
				<input placeholder="输入QQ" v-model="formBean.qq"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">客户分类</view>
				<picker @change="typeChange" :value="typeInx" :range="types">
					<view class="picker">
						{{typeInx>-1?types[typeInx]:'选择分类'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">备用电话</view>
				<input placeholder="输入备用电话" v-model="formBean.phone_reserve"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">来源</view>
				<picker @change="sourceChange" :value="sourceInx" :range="sources" range-key="name">
					<view class="picker">
						{{sourceInx>-1?sources[sourceInx].name:'选择来源'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">职业</view>
				<picker @change="jobChange" :value="jobInx" :range="jobs" range-key="name">
					<view class="picker">
						{{jobInx>-1?jobs[jobInx].name:'选择职业'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">年纪</view>
				<picker @change="ageChange" :value="ageInx" :range="ages" range-key="name">
					<view class="picker">
						{{ageInx>-1?ages[ageInx].name:'选择年纪'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">现居地址</view>
				<addressd @changes="selAddress1"></addressd>
			</view>
			<view class="cu-form-group">
				<view class="title">现住址</view>
				<input placeholder="输入现住址" v-model="formBean.current_address"></input>
			</view>
			<!-- <view class="cu-form-group">
				<view class="title">户籍</view>
				<addressd @changes="selAddress2"></addressd>
			</view> -->
			<!-- <view class="cu-form-group">
				<view class="title">客户星级</view>
				<picker @change="starChange" :value="starInx" :range="stars" range-key="text">
					<view class="picker">
						{{starInx>-1?stars[starInx].text:'选择星级'}}
					</view>
				</picker>
			</view> -->
			<view class="cu-form-group">
				<view class="title">归属员工</view>
				<navigator class="show-arrow" url="/pages/customer/employee/index" hover-class="none">
					<ava v-if="selEmployee.id" :name="selEmployee.name" :url="selEmployee.avatar"/>
					<view v-else>未选择归属</view>
				</navigator>
			</view>
			<view class="cu-form-group">
				<view class="title">归属楼盘</view>
				<picker @change="peojectChange" :value="projectInx" :range="projects" range-key="name">
					<view class="picker">
						{{projectInx>-1?projects[projectInx].name:'选择楼盘'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">客户星级</view>
				<rate v-model="formBean.star" />
			</view>
			<navigator :url="`/pages/customer/need-list/index?id=${customerId}&type=${customerType}`">客户需求</navigator>
			<save @save="handleSave" />
		</form>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import addressd from "@/components/jm-address"
	import save from "@/components/buttom-button"
	import Ava from '@/components/avatar'
	import Rate from '@/components/rate'
	import {
		RULES as r
	} from '@/utils/const'

	export default {
		async onLoad(opt) {
			this.customerId = opt.id
			if (this.customerId) {
				let {
					data
				} = await this.getCustomerDetail()
				this.originData = data[0]
				this.formatData()
			} else {
				this.setSelEmployee({})
			}
			this.customerType = opt.type
			this.$http("attribute").then(r => {
				let t = this.customerType == 0 ? 'Customer sales' : 'Customer'
				let d = r.data[t]
				this.ages = d.age || []
				this.sources = d.source || []

				if (this.customerId) {
					this.sourceInx = this.sources.findIndex(i => i.id == this.originData.source)
					this.ageInx = this.ages.findIndex(i => i.id == this.originData.age)
				}
			})
			this.$http("customer_job").then(r => {
				this.jobs = r.data
				if (this.customerId) {
					this.jobInx = this.jobs.findIndex(i => i.id == this.originData.job)
				}
			})
			this.$http('path').then(r => {
				let field = this.customerType == 0 ? 'Customer sales' : 'Customer'
				this.rules = r.data.find(i => i.name == '客户' && i.field == field).values
			})
			this.$http('project?page=1&route_type=my&per_page=100').then(r => {
				this.projects = r.data.map(i => i.project)

				if (this.customerId) {
					this.projectInx = this.projects.findIndex(i => i.id == this.originData.project_id)
				}
			})
		},
		data: _ => ({
			originData: {},
			rules: [],
			customerType: 0,
			customerId: 0,
			formBean: {
				name: '',
				phone: '',
				star: 1,
			},
			sexs: [{
					text: '男',
					value: '1'
				},
				{
					text: '女',
					value: '2'
				},
			],
			sexInx: -1,

			types: ['初步接触', '有意向', '已看房', '已成交'],
			typeInx: -1,

			sources: [],
			sourceInx: -1,

			jobs: [],
			jobInx: -1,

			ages: [],
			ageInx: -1,

			stars: [{
					text: '一星',
					value: '1'
				},
				{
					text: '二星',
					value: '2'
				},
				{
					text: '三星',
					value: '3'
				},
				{
					text: '四星',
					value: '4'
				},
				{
					text: '五星',
					value: '5'
				},
			],
			starInx: -1,

			projects: [],
			projectInx: -1
		}),
		methods: {
			...mapMutations('customer', ['setSelEmployee']),
			sexChange(e) {
				this.sexInx = e.detail.value
				this.formBean.sex = this.sexs[this.sexInx].value
			},
			typeChange(e) {
				this.typeInx = e.detail.value
				this.formBean.customer_type = this.types[this.typeInx]
			},
			sourceChange(e) {
				this.sourceInx = e.detail.value
				this.formBean.source = this.sources[this.sourceInx].id
			},
			jobChange(e) {
				this.jobInx = e.detail.value
				this.formBean.job = this.jobs[this.jobInx].id
			},
			ageChange(e) {
				this.ageInx = e.detail.value
				this.formBean.age = this.ages[this.ageInx].id
			},
			starChange(e) {
				this.starInx = e.detail.value
				this.formBean.star = this.stars[this.starInx].value
			},
			peojectChange(e) {
				this.projectInx = e.detail.value
				this.formBean.project_id = this.projects[this.projectInx].id
			},
			selAddress1(e) {
				console.log(e)
				this.formBean.current_province_id = e.pId
				this.formBean.current_city_id = e.cId
				this.formBean.current_district_id = e.dId
			},
			handleSave() {
				// if (!r.phone(this.formBean.phone)) {
				// 	uni.showToast({
				// 		title: '电话不能为空',
				// 		icon: 'none'
				// 	})
				// 	return
				// }
				if (!this.validateForm()) {
					return
				}
				this.formBean.belongsto_id = this.selEmployee.id

				let data = Object.assign({}, this.formBean, {
					type: this.customerType == 0 ? '新房' : '分销'
				})
				
				if (!this.customerId) {
					this.$http('customer', data, 'post').then(r => {
						uni.showToast({
							title: r.message
						})
						this.customerId = r.data.id
					})
				} else {
					this.$http(`customer/${this.customerId}`, data, 'put').then(r => {
						uni.showToast({
							title: r.message
						})
					})
				}
				
			},
			async getCustomerDetail() {
				return this.$http('customer', {
					id: this.customerId
				})
			},
			formatData() {
				// this.formBean.name = this.originData.name
				// this.formBean.phone = this.originData.phone
				// this.formBean.qq = this.originData.qq
				// this.formBean.weixin = this.originData.weixin
				// this.formBean.phone_reserve = this.originData.phone_reserve
				this.formBean = this.originData

				this.sexInx = this.sexs.findIndex(i => i.value == this.originData.sex)
				this.typeInx = this.types.findIndex(i => i == this.originData.customer_type)
				this.starInx = this.stars.findIndex(i => i.value == this.originData.star)

				let employee = this.originData.belongsto_id ? this.originData.belongs_employee : {}
				this.setSelEmployee(employee)
			},
			validateForm() {
				let requires = this.rules.filter(i => i.required)
				for (let i of requires) {
					if (!this.formBean[i.field]) {
						uni.showToast({
							title: `${i.name}是必须的`,
							icon: 'none'
						})
						return false
					}
				}
				return true
			}
		},
		components: {
			addressd,
			save,
			Ava,
			Rate
		},
		computed: {
			...mapState('customer', ['selEmployee'])
		}
	}
</script>
