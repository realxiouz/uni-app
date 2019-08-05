<template>
	<view>
		<view class="cu-bar fixed bg-blue nav text-center">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="inx==selTab?'text-white cur':''" v-for="(i,inx) in tabs" :key="inx" @click="handleNavChange(inx)">
					{{i.text}}
				</view>
			</view>
		</view>
		<swiper style="height:100vh;" @change="tabChange" :current="selTab">
			<swiper-item>
				<data-list ref="list0" @data="handleList0" r-url="customer_genjin" :r-data="{customer_id: id}">
					<view class="cu-bar"></view>
					<genjin v-for="(i, inx) in list0" :key="inx" :bean="i" />
				</data-list>
			</swiper-item>
			<swiper-item>
				<data-list ref="list1" @data="handleList1" r-url="daikan" :r-data="{customer_id: id}">
					<view class="cu-bar"></view>
					<!-- <item v-for="(i, inx) in list1" :key="inx" :bean="i" /> -->
				</data-list>
			</swiper-item>
			<swiper-item>
				<data-list ref="list2" @data="handleList2" r-url="baobei" :r-data="{customer_id: id}">
					<view class="cu-bar"></view>
					<!-- <item v-for="(i, inx) in list2" :key="inx" :bean="i" /> -->
				</data-list>
			</swiper-item>
		</swiper>
		
		<float-button @go="handleGo" />
	</view>
</template>

<script>
	import DataList from '@/components/data-list'
	import Genjin from './components/genjin'
	import FloatButton from '@/components/float-button'
	
	export default {
		onLoad(opt) {
			this.id = opt.id
			this.customerDetail()
			
			this.$nextTick(_ => {
				this.$refs.list0.init()
			})
		},
		data: _ => ({
			id: '',
			bean: {},
			selTab: 0,
			tabs: [
				{text: '跟进记录'},
				{text: '到访记录'},
				{text: '报备记录'},
			],
			list0: [],
			list1: [],
			list2: [],
		}),
		methods: {
			customerDetail() {
				this.$http('customer', {id: this.id}).then(r => {
					this.bean = r.data[0]
				})
			},
			handleList0(l) {
				this.list0 = l
			},
			handleList1(l) {
				this.list1 = l
			},
			handleList2(l) {
				this.list2 = l 
			},
			tabChange(e) {
				this.selTab = e.detail.current
				this.$refs[`list${this.selTab}`].init()
			},
			handleNavChange(inx) {
				this.selTab = inx
			},
			handleGo() {
				let path = {
					'0': `/pages/common/followup/index?customerId=${this.id}`
				}
				uni.navigateTo({
					url: path[this.selTab]
				})
			}
		},
		components: {
			DataList, Genjin, FloatButton
		}
	}
</script>

<style>
</style>
