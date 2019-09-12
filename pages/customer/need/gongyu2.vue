<template>
	<view>
		<form>
			<view class="cu-form-group">
				<view class="title">户型</view>
				<picker mode="multiSelector" @change="multiChange" :value="multiInx" :range="multiTypes" range-key="text">
					<view class="picker">
						{{multiTypes[0][multiInx[0]].text}},{{multiTypes[1][multiInx[1]].text}},{{multiTypes[2][multiInx[2]].text}},{{multiTypes[3][multiInx[3]].text}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">期望价格</view>
				<rang-picker :list="priceMap[type]" :unit="priceUnitMap[type]" v-model="vRange" />
			</view>
			<view class="cu-form-group">
				<view class="title">期望单价</view>
				<rang-picker :list="unitMap[type]" unit="元" v-model="uRange" />
			</view>
			<view class="cu-form-group">
				<view class="title">期望面积</view>
				<rang-picker :list="[0, 50, 80, 100, 150, 200, 300, 500]" unit="㎡" v-model="sRange" />
			</view>
			<view class="cu-form-group">
				<view class="title">需求省市</view>
				<pcd v-model="pcd" />
			</view>
			<view class="cu-form-group">
				<view class="title">{{showStar('intention')}}意向程度</view>
				<single-picker :range="intentions" v-model="selIntention" />
			</view>
			<view class="cu-form-group">
				<view class="title">{{showStar('transaction')}}置业目的</view>
				<single-picker :range="transactions" v-model="selTransaction" />
			</view>
			<view class="cu-form-group">
				<view class="title">{{showStar('guanzhu')}}关注重点</view>
				<multi-picker class="show-arrow" :range="guanzhus" v-model="selGuanzhu" />
			</view>
			<view class="cu-form-group">
				<view class="title">{{showStar('kangxing')}}抗性</view>
				<multi-picker class="show-arrow" :range="kangxings" v-model="selKangxing" />
			</view>
			<view class="cu-form-group">
				<view class="title">{{showStar('payment_type')}}付款方式</view>
				<single-picker :range="payment_types" v-model="selPay" />
			</view>
			<view class="cu-form-group">
				<view class="title">{{showStar('term')}}期限</view>
				<single-picker value-key="value" range-key="text" :range="terms" v-model="selTerm" />
			</view>
			<view class="cu-form-group">
				<view class="title">{{showStar('renovation')}}装修</view>
				<single-picker range-key="title" :range="renovations" v-model="selRenovation" />
			</view>
			<view class="cu-form-group">
				<view class="title">{{showStar('orientation')}}朝向</view>
				<single-picker range-key="title" :range="orientations" v-model="selOrientation" />
			</view>
			<view class="cu-form-group">
				<view class="title">{{showStar('floor')}}楼层</view>
				<single-picker range-key="title" :range="floors" v-model="selFloor" />
			</view>
			<view class="cu-form-group">
				<textarea :maxlength="200" @input="textareaInput" placeholder="备注" :value="remark"></textarea>
			</view>
		</form>

		<save @save="handleSave" />
	</view>
</template>

<script>
	import RangPicker from '@/components/rang-picker'
	import MultiPicker from '@/components/multi-picker'
	import SinglePicker from '@/components/single-picker'
	import Save from '@/components/buttom-button'
	import Pcd from '@/components/pcd'
	import {priceMap, priceUnitMap, unitMap} from '@/utils/const'

	export default {
		onLoad(opt) {
			if (opt.id) {
				this.id = opt.id
				this.getNeed()
			}
			this.type = opt.type
			this.customerId = opt.cId
			this.$http('path').then(r => {
				this.rules = r.data.find(i => i.field == 'CustomerDemand').values.filter(i => i.mapping == this.type).filter(i => i.required)
			})
			this.$http('attribute').then(r => {
				this.allSels = r.data['CustomerDemand']
				this.kangxings = this.allSels.kangxing.filter(i => i.mapping == this.type)
				this.guanzhus = this.allSels.guanzhu.filter(i => i.mapping == this.type)
				this.intentions = this.allSels.intention.filter(i => i.mapping == this.type)
				this.transactions = this.allSels.transaction.filter(i => i.mapping == this.type)
				this.payment_types = this.allSels.payment_type.filter(i => i.mapping == this.type)
			})
		},
		data: _ => ({
			id: '',
			type: '',
			
			rules: [],
			multiTypes: [
				[{
						text: '一室',
						value: 1
					},
					{
						text: '二室',
						value: 2
					},
					{
						text: '三室',
						value: 3
					},
					{
						text: '四室',
						value: 4
					},
					{
						text: '五室',
						value: 5
					},
				],
				[{
						text: '一厅',
						value: 1
					},
					{
						text: '二厅',
						value: 2
					},
					{
						text: '三厅',
						value: 3
					},
					{
						text: '四厅',
						value: 4
					},
					{
						text: '五厅',
						value: 5
					},
				],
				[{
						text: '一卫',
						value: 1
					},
					{
						text: '二卫',
						value: 2
					},
					{
						text: '三卫',
						value: 3
					},
					{
						text: '四卫',
						value: 4
					},
					{
						text: '五卫',
						value: 5
					},
				],
				[{
						text: '一台',
						value: 1
					},
					{
						text: '二台',
						value: 2
					},
					{
						text: '三台',
						value: 3
					},
					{
						text: '四台',
						value: 4
					},
				]
			],
			multiInx: [0, 0, 0, 0],
			
			priceMap,
			priceUnitMap,
			unitMap,
			
			vRange: [],
			uRange: [],
			sRange: [],

			allSels: {},

			kangxings: [],
			selKangxing: [],

			guanzhus: [],
			selGuanzhu: [],

			intentions: [],
			selIntention: '',

			transactions: [],
			selTransaction: '',

			payment_types: [],
			selPay: '',

			terms: [{
				text: '2天内',
				value: 100
			}, {
				text: '3天内',
				value: 1
			}, {
				text: '5天内',
				value: 2
			}, {
				text: '1周内',
				value: 3
			}, {
				text: '2周内',
				value: 4
			}, {
				text: '3周内',
				value: 5
			}, {
				text: '1月内',
				value: 6
			}, {
				text: '2月内',
				value: 7
			}, {
				text: '3月内',
				value: 8
			}],
			selTerm: '',

			renovations: [{
					title: "毛坯",
					id: 100
				},
				{
					title: "精装",
					id: 1
				},
				{
					title: "简装",
					id: 2
				},
				{
					title: "清水",
					id: 3
				},
				{
					title: "中装",
					id: 4
				},
				{
					title: "高装",
					id: 5
				},
				{
					title: "豪装",
					id: 6
				},
				{
					title: "新装修",
					id: 7
				}
			],
			selRenovation: '',

			orientations: [{
					title: "正东",
					id: 100
				},
				{
					title: "正南",
					id: 1
				},
				{
					title: "正北",
					id: 2
				},
				{
					title: "正西",
					id: 3
				},
				{
					title: "东西",
					id: 4
				},
				{
					title: "东南",
					id: 5
				},
				{
					title: "东北",
					id: 6
				},
				{
					title: "西南",
					id: 7
				},
				{
					title: "西北",
					id: 8
				},
				{
					title: "南北",
					id: 9
				}
			],
			selOrientation: '',

			floors: [{
					title: "1-5楼",
					id: 100
				},
				{
					title: "6-10楼",
					id: 1
				},
				{
					title: "11-15楼",
					id: 2
				},
				{
					title: "16-20楼",
					id: 3
				},
				{
					title: "21-25楼",
					id: 4
				},
				{
					title: "26-30楼",
					id: 5
				},
				{
					title: "31-35楼",
					id: 6
				},
				{
					title: "36-40楼",
					id: 7
				},
				{
					title: "41-45楼",
					id: 8
				},
				{
					title: "46-50楼",
					id: 9
				},
				{
					title: "51-55楼",
					id: 10
				},
				{
					title: "56-60楼",
					id: 11
				},
				{
					title: "61-65楼",
					id: 12
				},
				{
					title: "66-70楼",
					id: 13
				},
				{
					title: "71-75楼",
					id: 14
				},
				{
					title: "76-80楼",
					id: 15
				},
				{
					title: "81-85楼",
					id: 16
				},
				{
					title: "86-90楼",
					id: 17
				},
				{
					title: "91-95楼",
					id: 18
				},
				{
					title: "96-100楼",
					id: 19
				}
			],
			selFloor: '',

			customerId: '',

			remark: '',
			
			pcd: []
		}),
		methods: {
			textareaInput(e) {
				this.remark = e.detail.value
			},
			multiChange(e) {
				this.multiInx = e.detail.value
			},
			handleSave() {
				let data = {
					house_using_type_name: "公寓",
					type: this.type,
					guanzhu: this.selGuanzhu,
					intention: this.selIntention,
					kangxing: this.selKangxing,
					payment_type: this.selPay,
					transaction: this.selTransaction,
					customer_id: this.customerId,

					price_start: this.vRange[0],
					price_end: this.vRange[1],
					area_start: this.sRange[0],
					area_end: this.sRange[1],
					unit_price_start: this.uRange[0],
					unit_price_end: this.uRange[1],

					shi: this.multiInx[0] + 1,
					ting: this.multiInx[1] + 1,
					wei: this.multiInx[2] + 1,
					tai: this.multiInx[3] + 1,

					remark: this.remark,
					
					term: this.selTerm,
					floor: this.selFloor,
					renovation: this.selRenovation,
					orientation: this.selOrientation,
					
					province_id : this.pcd.length ? this.pcd[0] : null,
					city_id : this.pcd.length ? this.pcd[1] : null,
					district_id : this.pcd.length ? this.pcd[2] : null,
					area_id : this.pcd.length ? this.pcd[3] : null
				}
				if (!this.validateForm(data)) {
					return
				}
				if (this.id) {
					this.$http(`customerDemand/${this.id}`, data, 'put').then(r => {
						uni.showToast({
							title: r.message,
							icon: 'none'
						})
					})
				} else {
					this.$http('customerDemand', data, 'post').then(r => {
						uni.showToast({
							title: r.message,
							icon: 'none'
						})
					})
				}
			},
			validateForm(data) {
				for (let i of this.rules) {
					if (!data[i.field]) {
						uni.showToast({
							title: `${i.name}是必须的`,
							icon: 'none'
						})
						return false
					}
				}
				return true
			},
			showStar(field) {
				return this.rules.findIndex(i => i.field == field) > -1 ? '*' : ''
			},
			getNeed() {
				this.$http(`customerDemand/${this.id}`).then(r => {
					let d = r.data
					this.selKangxing = d.kangxing
					this.selGuanzhu = d.guanzhu
					this.selIntention = d.intention
					this.selOrientation = d.orientation
					this.selPay = d.payment_type
					this.selTerm = d.term
					this.selFloor = d.floor
					this.selRenovation = d.renovation
					this.selTransaction = d.transaction
					this.remark = d.remark
					
					this.multiInx = [
						d.shi ? d.shi - 1 : 0,
						d.ting ? d.ting - 1 : 0,
						d.wei ? d.wei - 1 : 0,
						d.tai ? d.tai - 1 : 0
					]
					
					this.vRange = [
						d.price_start ? d.price_start : 0,
						d.price_end ? d.price_end : 0
					]
					
					this.uRange = [
						d.unit_price_start ? d.unit_price_start : 0,
						d.unit_price_end ? d.unit_price_end : 0
					]
					
					this.sRange = [
						d.area_start ? d.area_start : 0,
						d.area_end ? d.area_end : 0
					]
					
					this.pcd = [
						d.province_id, d.city_id, d.district_id, d.area_id
					]
				})
			}
		},
		components: {
			RangPicker,
			Save,
			MultiPicker,
			SinglePicker,
			Pcd
		}
	}
</script>
