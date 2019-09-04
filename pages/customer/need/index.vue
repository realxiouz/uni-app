<template>
	<view>
		<form >
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
				<rang-picker :list="[0, 30, 50, 100, 150, 200, 500]" unit="万" @change="priceChange"/>
			</view>
			<view class="cu-form-group">
				<view class="title">期望单价</view>
				<rang-picker :list="[0, 5000, 8000, 10000, 15000, 20000, 30000]" unit="元" @change="unitChange"/>
			</view>
			<view class="cu-form-group">
				<view class="title">期望面积</view>
				<rang-picker :list="[0, 50, 80, 100, 150, 200, 300, 500]" unit="㎡" @change="sizeChange"/>
			</view>
			
			<view class="cu-form-group">
				<view class="title">意向程度</view>
				<single-picker
					:range="intentions"
					v-model="selIntention"
				/>
			</view>
			<view class="cu-form-group">
				<view class="title">需求用途</view>
				<single-picker
					:range="transactions"
					v-model="selTransaction"
				/>
			</view>
			<view class="cu-form-group">
				<view class="title">关注重点</view>
				<multi-picker
					class="show-arrow"
					:range="guanzhus"
					v-model="selGuanzhu"
				/>
			</view>
			<view class="cu-form-group">
				<view class="title">抗性</view>
				<multi-picker
					class="show-arrow"
					:range="kangxings"
					v-model="selKangxing"
				/>
			</view>
			<view class="cu-form-group">
				<view class="title">付款方式</view>
				<single-picker
					:range="payment_types"
					v-model="selPay"
				/>
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
	
	export default {
		onLoad(opt) {
			this.type = opt.type
			this.subType = opt.subType
			this.customerId = opt.cId
			this.$http('attribute').then(r => {
				this.allSels = r.data[this.type]
				
				this.kangxings = this.allSels.kangxing.filter(i => i.mapping == this.subType)
				this.guanzhus = this.allSels.guanzhu.filter(i => i.mapping == this.subType)
				this.intentions = this.allSels.intention.filter(i => i.mapping == this.subType)
				this.transactions = this.allSels.transaction.filter(i => i.mapping == this.subType)
				this.payment_types = this.allSels.payment_type.filter(i => i.mapping == this.subType)
			})
			
		},
		data: _=> ({
			multiTypes: [
				[
					{text: '一室', value: 1},
					{text: '二室', value: 2},
					{text: '三室', value: 3},
					{text: '四室', value: 4},
					{text: '五室', value: 5},
				],
				[
					{text: '一厅', value: 1},
					{text: '二厅', value: 2},
					{text: '三厅', value: 3},
					{text: '四厅', value: 4},
					{text: '五厅', value: 5},
				],
				[
					{text: '一卫', value: 1},
					{text: '二卫', value: 2},
					{text: '三卫', value: 3},
					{text: '四卫', value: 4},
					{text: '五卫', value: 5},
				],
				[
					{text: '一台', value: 1},
					{text: '二台', value: 2},
					{text: '三台', value: 3},
					{text: '四台', value: 4},
				]
			],
			multiInx: [0,0,0,0],
			
			typeInx: 0,
			
			v: [],
			
			allSels: {},
			
			type: '',
			subType: '',
			
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
			
			customerId: '',
			
			price_start: '',
			price_end: '',
		}),
		methods: {
			multiChange(e) {
				this.multiInx =e.detail.value
			},
			priceChange(v) {
				this.price_start = v[0],
				this.price_end = v[1]
			},
			sizeChange(v) {
				this.area_start = v[0]
				this.area_end = v[1]
			},
			unitChange(v) {
				this.unit_price_start = v[0]
				this.unit_price_end = v[1]
			},
			handleSave() {
				let data = {
					type: this.subType,
					guanzhu: this.selGuanzhu,
					intention: this.selIntention,
					kangxing: this.selKangxing,
					payment_type: this.selPay,
					transaction: this.selTransaction,
					customer_id: this.customerId,
					
					price_start: this.price_start,
					price_end: this.price_end,
					area_start: this.area_start,
					area_end: this.area_end,
					unit_price_start: this.unit_price_start,
					unit_price_end: this.unit_price_end,
					
					shi: this.multiInx[0]+1,
					ting: this.multiInx[1]+1,
					wei: this.multiInx[2]+1,
					tai: this.multiInx[3]+1,
				}
				this.$http('customerDemand', data, 'post').then(r => {
					uni.showToast({
						title: r.message,
						icon: 'none'
					})
				})
			}
		},
		components: {
			RangPicker, Save, MultiPicker, SinglePicker
		}
	}
</script>

<style>
</style>
