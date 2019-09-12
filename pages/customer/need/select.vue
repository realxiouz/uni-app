<template>
	<view class="cu-list menu">
		<view class="cu-item arrow" @click="handleNav('zhuzhai')">
			<text>住宅</text>
		</view>
		<view class="cu-item arrow" @click="handleNav('gongyu')">
			<text>公寓</text>
		</view>
		<view class="cu-item arrow" @click="handleNav('bieshu')">
			<text>别墅</text>
		</view>
		<view class="cu-item arrow" @click="handleNav('shangpu')">
			<text>商铺</text>
		</view>
		<view class="cu-item arrow" @click="handleNav('xiezilou')">
			<text>写字楼</text>
		</view>
		<view class="cu-item arrow" @click="handleNav('chewei')">
			<text>车位</text>
		</view>
		<view class="cu-item arrow" @click="handleNav('qita')">
			<text>其他</text>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad(opt) {
			this.type = opt.type
			this.cId = opt.cId
		},
		data() {
			return {
				type: '',
				cId: ''
			}
		},
		methods: {
			handleNav(name) {
				let url = `/pages/customer/need/${name}2?type=${this.type}&cId=${this.cId}`
				uni.navigateTo({
					url
				})
			}
		}
	}
</script>

<style>
</style>
