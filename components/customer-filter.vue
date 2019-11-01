<template>
	<view>
		<view class="mp-mask" :class="{show}" @tap="close"></view>
		<view class="mp-wrap" :class="{show}">
			<view class="bg-white text-left flex flex-wrap" style="width:100%;height:100%">
				<form>
					<view class="cu-form-group margin-top">
						<view class="title">客户名称:</view>
						<input placeholder="输入姓名" v-model="formBean.name"></input>
					</view>
					<view class="cu-form-group">
						<view class="title">手机号码:</view>
						<input placeholder="输入手机号码" v-model="formBean.phone"></input>
					</view>
					<view class="cu-form-group">
						<view class="title">客户来源:</view>
						<single-picker :range="sources" v-model="formBean.source" />
					</view>
					<view class="cu-form-group">
						<view class="title">客户渠道:</view>
						<single-picker :range="qudaos" v-model="formBean.qudao" />
					</view>
					<view class="cu-form-group">
						<view class="title">所在省份:</view>
						<single-picker :range="ps" v-model="formBean.fromProvince" />
					</view>
					<view class="cu-form-group">
						<view class="title">客户星级:</view>
						<single-picker :range="stars" v-model="formBean.star" />
					</view>
					<view class="cu-bar btn-group">
						<button class="cu-btn text-blue line-blue shadow" @click="handleReset">清空</button>
						<button class="cu-btn bg-blue shadow-blur" @click="handleSearch">搜索</button>
					</view>
				</form>
			</view>
		</view>
	</view>
</template>

<script>
	import SinglePicker from './single-picker'
	const ps = [{
			name: "北京",
			id: 1
		},
		{
			name: "上海",
			id: 2
		},
		{
			name: "天津",
			id: 3
		},
		{
			name: "重庆",
			id: 4
		},
		{
			name: "安徽",
			id: 5
		},
		{
			name: "福建",
			id: 7
		},
		{
			name: "广东",
			id: 8
		},
		{
			name: "云南",
			id: 9
		},
		{
			name: "广西",
			id: 10
		},
		{
			name: "贵州",
			id: 11
		},
		{
			name: "甘肃",
			id: 12
		},
		{
			name: "海南",
			id: 13
		},
		{
			name: "河南",
			id: 14
		},
		{
			name: "黑龙江",
			id: 15
		},
		{
			name: "湖北",
			id: 16
		},
		{
			name: "湖南",
			id: 17
		},
		{
			name: "河北",
			id: 18
		},
		{
			name: "江苏",
			id: 19
		},
		{
			name: "江西",
			id: 20
		},
		{
			name: "吉林",
			id: 21
		},
		{
			name: "辽宁",
			id: 22
		},
		{
			name: "宁夏",
			id: 23
		},
		{
			name: "内蒙古",
			id: 24
		},
		{
			name: "青海",
			id: 25
		},
		{
			name: "山东",
			id: 26
		},
		{
			name: "山西",
			id: 27
		},
		{
			name: "陕西",
			id: 28
		},
		{
			name: "四川",
			id: 29
		},
		{
			name: "新疆",
			id: 30
		},
		{
			name: "西藏",
			id: 31
		},
		{
			name: "浙江",
			id: 32
		},
		{
			name: "香港",
			id: 33
		},
		{
			name: "澳门",
			id: 34
		},
		{
			name: "台湾",
			id: 35
		},
	]
	export default {
		mounted() {
			this.$http('attribute').then(r => {
				if(this.type == '分销'){
					this.sources = r.data['Customer sales'].source
					this.qudaos = r.data['Customer sales'].qudao
				} else if(this.type == '新房') {
					this.sources = r.data['Customer'].source
					this.qudaos = r.data['Customer'].qudao
				}
			})
		},
		data() {
			return {
				show: false,
				formBean: {
					name: '',
					phone: '',
					source: '',
					qudao: '',
					fromProvince: '',
					star: '',
				},
				
				sources: [],
				qudaos: [],
				ps,
				stars: [
					{name: '一星', id: 1},
					{name: '二星', id: 2},
					{name: '三星', id: 3},
					{name: '四星', id: 4},
					{name: '五星', id: 5},
				]
			}
		},
		props: {
			value: {
				type: Boolean
			},
			type: {
				type: String
			}
		},
		methods: {
			close() {
				this.$emit('input', false)
			},
			handleSearch() {
				this.close()
				this.$emit('s', this.formBean)
			},
			handleReset() {
				this.formBean = {
					name: '',
					phone: '',
					source: '',
					qudao: '',
					fromProvince: '',
					star: '',
				}
				this.close()
				this.$emit('s', this.formBean)
			}
		},
		computed: {
			
		},
		watch: {
			value(val) {
				this.show = val
			}
		},
		components: {
			SinglePicker
		}
	}
</script>

<style lang="scss" scoped>
	.mp-mask{
		position: fixed;
		top: 0upx;
		left: 0upx;
		right: 0upx;
		bottom: 0upx;
		z-index: 9998;
		background-color: rgba(0, 0, 0, 0.6);
		opacity: 0;
		transition: all 0.3s ease;
		visibility: hidden;
		&.show{
			visibility: visible;
			opacity: 1;
		}
	}
	
	.mp-wrap{
		position: fixed;
		width: 500upx;
		right: 0upx;
		top: 0upx;
		bottom: 0upx;
		z-index: 9999;
		transition: all 0.3s ease;
		transform: translateX(100%);
		&.show{
			transform: translateX(0);
		}
	}
</style>
