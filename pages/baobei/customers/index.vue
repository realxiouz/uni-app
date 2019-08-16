<template>
	<view>
		<view class="cu-bar bg-cyan search">
			<view class="search-form radius">
				<text class="cuIcon-search"></text>
				<input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" placeholder="搜索姓名或者电话" confirm-type="search"></input>
			</view>
			<!-- <view class="action">
				<text class="cuIcon-close"></text>
				<text>取消</text>
			</view> -->
		</view>
		<data-list r-url="customer/baobei" r-data="" ref="list" @data="handleList">
			<view v-for="(i, inx) in list" :key="inx">customer</view>
			
		</data-list>
		<save />
	</view>
</template>

<script>
	import DataList from '@/components/data-list'
	import Save from '@/components/buttom-button'
	
	export default {
		onLoad(opt) {
			this.type = opt.type
			this.$refs.list.init()
		},
		components: {
			DataList, Save
		},
		data() {
			return {
				type: '', //history my
				list: [],
			}
		},
		methods: {
			handleList(list) {
				this.list = list 
			}
		}
	}
</script>

<style>
</style>
