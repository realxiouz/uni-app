<template>
	<view>
		<form >
			<view class="cu-form-group">
				<view class="title">需求类型</view>
				<picker mode="selector" @change="typeChange" :value="typeInx" :range="types">
					<view class="picker">
						{{types[typeInx]}}
					</view>
				</picker>
			</view>
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
				<rang-picker :list="[0, 30, 50, 100, 150, 200, 500]" unit="万"/>
			</view>
			<view class="cu-form-group">
				<view class="title">期望单价</view>
				<rang-picker :list="[0, 5000, 8000, 10000, 15000, 20000, 30000]" unit="元"/>
			</view>
			<view class="cu-form-group">
				<view class="title">期望面积</view>
				<rang-picker :list="[0, 50, 80, 100, 150, 200, 300, 500]" unit="㎡"/>
			</view>
			
			<view class="cu-form-group">
				<view class="title">意向程度</view>
				<multi-picker class="show-arrow" :range="[{name: '1', value: 1}, {name: '2', value: 2}]" rang-key="name"/>
			</view>
		</form>
		
		<save @save="handleSave" />
	</view>
</template>

<script>
	import RangPicker from '@/components/rang-picker'
	import MultiPicker from '@/components/multi-picker'
	import Save from '@/components/buttom-button'
	
	export default {
		onLoad(opt) {
			this.$http('attribute').then(r => {
				this.allSels = r.data['CustomerDemand sales']
			})
			setTimeout(_ => {
				this.v = [30, 50]
			}, 3000);
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
			
			types: ['商铺', '住宅', '公寓', '写字楼'],
			typeInx: 0,
			
			v: [],
			
			allSels: {}
		}),
		methods: {
			typeChange(e) {
				this.typeInx = e.detail.value
			},
			multiChange(e) {
				this.multiInx =e.detail.value
			},
			handleSave() {
				
			}
		},
		components: {
			RangPicker, Save, MultiPicker
		}
	}
</script>

<style>
</style>
