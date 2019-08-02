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
				<data-list ref="list1" @data="handleList1" r-url="customer" :r-data="{type: '新房'}">
					<view class="cu-bar"></view>
					<item v-for="(i, inx) in list1" :key="inx" :bean="i" />
				</data-list>
			</swiper-item>
			<swiper-item>
				<data-list ref="list2" @data="handleList2" r-url="customer" :r-data="{type: '分销'}">
					<view class="cu-bar"></view>
					<item v-for="(i, inx) in list2" :key="inx" :bean="i" />
				</data-list>
			</swiper-item>
		</swiper>
		<navigator :url="`/pages/customer/bean/index?type=${selTab}`" class="bg-blue round flex justify-around align-center" style="width:100upx;height:100upx;position: fixed; bottom: 50upx;right: 50upx;">
			<text class="cuIcon-add xl"></text>
		</navigator>
	</view>
</template>

<script>
	import Item from './components/item.vue'
	import DataList from '@/components/data-list.vue'
	
	export default {
		onLoad() {
			setTimeout(_ => {
				this.$refs.list1.getData()
			}, 1000)
		},
		data() {
			return {
				selTab: 0,
				tabs: [
					{text: '新房客户'},
					{text: '分销客户'}
				],
				list1: [],
				list2: [],
			}
		},
		methods: {
			handleList1(l) {
				this.list1 = l
			},
			handleList2(l) {
				this.list2 = l 
			},
			tabChange(e) {
				this.selTab = e.detail.current
				this.$refs[`list${this.selTab+1}`].init()
			},
			handleNavChange(inx) {
				this.selTab = inx
			}
		},
		components: {
			Item, DataList
		}
	}
</script>

<style>

</style>
