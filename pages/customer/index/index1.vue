<template>
	<view>
		<view class="fixed bg-white nav" :style="{top: isH5?'44px':'0'}">
			<view class="cu-item" :class="inx==selTab?'text-blue cur':''" v-for="(i,inx) in tabs" :key="inx" @click="handleNavChange(inx)">
				{{i.text}}
			</view>
		</view>
		<swiper :style="[{position:'fixed',left:0,right:0,bottom:isH5?'50px':'0',top:top+'px',height:'auto'}]" @change="tabChange" :current="selTab">
			<swiper-item>
				<data-list ref="list1" @data="handleList1" r-url="customer" :r-data="data0">
					<item v-for="(i, inx) in list1" :key="inx" :bean="i" />
				</data-list>
			</swiper-item>
			<swiper-item>
				<data-list ref="list2" @data="handleList2" r-url="customer" :r-data="data1">
					<item v-for="(i, inx) in list2" :key="inx" :bean="i" />
				</data-list>
			</swiper-item>
			
			<!-- <swiper-item v-for="(i, inx) in tabs" :key="inx">
				<data-list :ref="'list'+inx" @data="handleList(inx, $event)" :r-url="i.url" :r-data="i.data">
					<component :is="i.component" v-for="(item, index) in i.list" :key="`${inx}${index}`" :bean="item" />
				</data-list>
			</swiper-item> -->
		</swiper>
		
		<float-button @go="handleGo" :b="isH5?'75px':'25px'"/>
	</view>
</template>

<script>
	import Item from './components/item'
	import DataList from '@/components/data-list'
	import FloatButton from '@/components/float-button'
	import { mapState } from 'vuex'
	
	export default {
		onLoad() {
			if (this.isH5) {
				this.top = 44 + uni.upx2px(90)
			}
			setTimeout(_ => {
				this.$refs.list1.getData()
			}, 1000)
		},
		data() {
			return {
				selTab: 0,
				// tabs: [
				// 	{text: '新房客户'},
				// 	{text: '分销客户'}
				// ],
				list1: [],
				list2: [],
				top: uni.upx2px(90),
				
				data0: {type: '新房'},
				data1: {type: '分销'},
				tabs: [
					{
						text: '新房客户',
						url: 'customer',
						data: {
							type: '新房'
						},
						component: 'item',
						list: []
					},
					{
						text: '分销客户',
						url: 'customer',
						data: {
							type: '分销'
						},
						component: 'item',
						list: []
					}
				]
			}
		},
		methods: {
			handleList1(l) {
				this.list1 = l
			},
			handleList2(l) {
				this.list2 = l 
			},
			handleList(inx, list) {
				this.tabs[inx].list = list
			},
			tabChange(e) {
				this.selTab = e.detail.current
				this.$refs[`list${this.selTab+1}`].init()
			},
			handleNavChange(inx) {
				this.selTab = inx
			},
			handleGo() {
				uni.navigateTo({
					url: `/pages/customer/bean/index?type=${this.selTab}`
				})
			}
		},
		components: {
			Item, DataList, FloatButton
		},
		computed: {
			...mapState(['isH5'])
		}
	}
</script>

<style>

</style>
