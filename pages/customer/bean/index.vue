<template>
	<view>
		<form>
			<view class="cu-form-group margin-top">
				<view class="title">{{showStar('name')}}姓名</view>
				<input placeholder="输入姓名" v-model="formBean.name"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">{{showStar('phone')}}电话</view>
				<input placeholder="输入电话号码" v-model="formBean.phone" :maxlength="11"></input>
				<button class="cu-btn bg-green shadow" :disabled="formBean.phone.length<11" @click="checkPhone">检测</button>
			</view>
			<view class="cu-form-group">
				<view class="title">{{showStar('sex')}}性别</view>
				<picker @change="sexChange" :value="sexInx" :range="sexs" range-key="text">
					<view class="picker">
						{{sexInx>-1?sexs[sexInx].text:'选择性别'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">{{showStar('weixin')}}微信</view>
				<input placeholder="输入微信" v-model="formBean.weixin"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">{{showStar('qq')}}QQ</view>
				<input placeholder="输入QQ" v-model="formBean.qq"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">{{showStar('customer_type')}}客户分类</view>
				<picker @change="typeChange" :value="typeInx" :range="types">
					<view class="picker">
						{{typeInx>-1?types[typeInx]:'选择分类'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">{{showStar('phone_reserve')}}备用电话</view>
				<input placeholder="输入备用电话" v-model="formBean.phone_reserve"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">{{showStar('source')}}来源</view>
				<picker @change="sourceChange" :value="sourceInx" :range="sources" range-key="name">
					<view class="picker">
						{{sourceInx>-1?sources[sourceInx].name:'选择来源'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">{{showStar('job')}}职业</view>
				<picker @change="jobChange" :value="jobInx" :range="jobs" range-key="name">
					<view class="picker">
						{{jobInx>-1?jobs[jobInx].name:'选择职业'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">{{showStar('age')}}年纪</view>
				<picker @change="ageChange" :value="ageInx" :range="ages" range-key="name">
					<view class="picker">
						{{ageInx>-1?ages[ageInx].name:'选择年纪'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">{{showStar('qudao')}}渠道</view>
				<picker @change="qudaoChange" :value="qudaoInx" :range="qudaos" range-key="name">
					<view class="picker">
						{{qudaoInx>-1?qudaos[qudaoInx].name:'选择渠道'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">
					{{showStar('current_province_id')||showStar('current_city_id')||showStar('current_district_id')}}现居地址
				</view>
				<pcd :level="4" v-model="pcd"/>
			</view>
			<view class="cu-form-group">
				<view class="title">详细住址</view>
				<input placeholder="输入详细住址" v-model="formBean.current_address"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">
					{{showStar('city_id')||showStar('district_id')}}户籍地址
				</view>
				<pcd :level="3" v-model="pcd1"/>
			</view>
			<view class="cu-form-group">
				<view class="title">归属员工</view>
				<navigator class="show-arrow" url="/pages/customer/employee/index" hover-class="none">
					<ava v-if="selEmployee.id" :name="selEmployee.name" :url="selEmployee.avatar"/>
					<view v-else>未选择归属</view>
				</navigator>
			</view>
			<view class="cu-form-group" v-if="customerType==='新房'">
				<view class="title">归属楼盘</view>
				<picker @change="peojectChange" :value="projectInx" :range="projects" range-key="name">
					<view class="picker">
						{{projectInx>-1?projects[projectInx].name:'选择楼盘'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">{{showStar('star')}}客户星级</view>
				<rate v-model="formBean.star" />
			</view>
			<view class="cu-form-group">
				<view class="title">{{showStar('remark')}}备注</view>
				<input placeholder="输入备注" v-model="formBean.remark"></input>
			</view>
            <save @save="handleSave" :loading="formLoading"/>
		</form>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import save from "@/components/buttom-button"
	import Ava from '@/components/avatar'
	import Rate from '@/components/rate'
	import Pcd from '@/components/pcd'
	
	import {
		RULES as r
	} from '@/utils/const'

	export default {
		async onLoad(opt) {
		    if (!Boolean(opt.pools) && !Reflect.has(this.selEmployee, 'id')) {
                let userInfo = this.userInfo;
                this.setSelEmployee({
                    id: userInfo.id,
                    name: userInfo.name,
                    avatar: userInfo.avatar.replace(this.defaultAvatar, ''),
                    defaultSelected: true
                })
            } else {
                this.selEmployee.defaultSelected && this.setSelEmployee({});
            }
			this.customerId = opt.id
			if (this.customerId) {
				uni.setNavigationBarTitle({
					title: '编辑客户'
				})
				let {
					data
				} = await this.getCustomerDetail()
				this.originData = data
				this.formatData()
			}
			this.customerType = opt.type
			this.$http("attribute").then(r => {
				let t = this.customerType == '新房' ? 'Customer sales' : 'Customer'
				let d = r.data[t]
				this.ages = d.age || []
				this.sources = d.source || []
				this.qudaos = d.qudao || []

				if (this.customerId) {
					this.sourceInx = this.sources.findIndex(i => i.id == this.originData.source)
					this.ageInx = this.ages.findIndex(i => i.id == this.originData.age)
					this.qudaoInx = this.qudaos.findIndex(i => i.id == this.originData.qudao)
				}
			})
			this.$http("customer_job").then(r => {
				this.jobs = r.data
				if (this.customerId) {
					this.jobInx = this.jobs.findIndex(i => i.id == this.originData.job)
				}
			})
			this.$http('path').then(r => {
				let field = this.customerType == '新房' ? 'Customer sales' : 'Customer'
				this.rules = r.data.find(i => i.name == '客户' && i.field == field).values.filter(i => i.required)
			})
			this.$http('project/list').then(r => {
				this.projects = r
				if (this.customerId) {
					this.projectInx = this.projects.findIndex(i => i.id == this.originData.project_id)
				}
			})
		},
		data: _ => ({
			formLoading: false,
			originData: {},
			rules: [],
			customerType: '',
			customerId: null,
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
			
			qudaos: [],
			qudaoInx: -1,

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
			projectInx: -1,
			
			pcd: [],
			pcd1: []
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
			qudaoChange(e) {
				this.qudaoInx = e.detail.value
				this.formBean.qudao = this.qudaos[this.qudaoInx].id
			},
			starChange(e) {
				this.starInx = e.detail.value
				this.formBean.star = this.stars[this.starInx].value
			},
			peojectChange(e) {
				this.projectInx = e.detail.value
				this.formBean.project_id = this.projects[this.projectInx].id
			},
			handleSave() {
				if (!this.validateForm()) {
					return
				}
				this.formBean.belongsto_id = this.selEmployee.id
				
				// this.formBean.current_province_id = this.pcd[0]
				// this.formBean.current_city_id = this.pcd[1]
				// this.formBean.current_district_id = this.pcd[2]

				let data = Object.assign({}, this.formBean, {
					type: this.customerType
				})
				
				if (!this.customerId) {
					this.formLoading = true
					this.$http('customer', data, 'post').then(r => {
						uni.redirectTo({
							url: `/pages/customer/detail/index?id=${r.data.id}&type=${r.data.type}`
						});
					}).finally(_ => {
						this.formLoading = false
					})
				} else {
					this.formLoading = true
					this.$http(`customer/${this.customerId}`, data, 'put').then(r => {
						uni.redirectTo({
							url: `/pages/customer/detail/index?id=${r.data.id}&type=${r.data.type}`
						});
					}).finally(_ => {
						this.formLoading = false
					})
				}
				
			},
			async getCustomerDetail() {
				return this.$http(`customer/${this.customerId}`)
			},
			formatData() {
				this.formBean = this.originData
				this.sexInx = this.sexs.findIndex(i => i.value == this.originData.sex)
				this.typeInx = this.types.findIndex(i => i == this.originData.customer_type)
				this.starInx = this.stars.findIndex(i => i.value == this.originData.star)
				this.qudaoInx = this.qudaos.findIndex(i => i.value == this.originData.qudao)

				let employee = this.originData.belongsto_id ? this.originData.belongs_employee : {}
				this.setSelEmployee(employee)
				
				this.pcd = [
					this.originData.current_province_id,
					this.originData.current_city_id,
					this.originData.current_district_id,
					this.originData.current_area_id
				]
				this.pcd1 = [
					this.originData.city.province_id,
					this.originData.city.id,
					this.originData.district_id
				]
			},
			validateForm() {
				for (let i of this.rules) {
					if (!this.formBean[i.field]) {
						uni.showToast({
							title: `${i.name}是必须的`,
							icon: 'none'
						})
						return false
					}
				}
				return true
			},
			checkPhone() {
				this.$http('customer/validate', {
					type: this.customerType,
					phone: this.formBean.phone,
					customer_id: this.customerId ? this.customerId : 0
				}).then(r => {
					uni.showToast({
						icon: 'none',
						title: r.message
					})
				})
			},
			showStar(field) {
				return this.rules.findIndex(i => i.field == field) > -1 ? '*' : ''
			},
		},
		components: {
			save,
			Ava,
			Rate,
			Pcd
		},
		computed: {
			...mapState('customer', ['selEmployee']),
			...mapState(['userInfo', 'defaultAvatar'])
		},
		watch: {
			pcd: {
				handler(val) {
					if(val.length === 4) {
						this.formBean.current_province_id = val[0]
						this.formBean.current_city_id = val[1]
						this.formBean.current_district_id = val[2]
						this.formBean.current_area_id = val[3]
					}
				}
			},
			pcd1: {
				handler(val) {
					if(val.length === 3) {
						this.formBean.province_id = val[0]
						this.formBean.city_id = val[1]
						this.formBean.district_id = val[2]
					}
				}
			}
		},
        mounted() {

        }
	}
</script>
