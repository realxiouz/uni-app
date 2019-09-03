<template>
	<view style="height: 100vh;">
		<data-list ref="list" @data="handleList" r-url="common/adviser" :r-data="rData">
			<view class="bg-white padding-sm solid-bottom" v-for="(i, inx) in list" :key="inx" @click="makePhone(i.mobile)">
				<view class="flex align-center">
					<ava :name="i.name" class="margin-right-sm"></ava>
					<view class="flex-sub">
						<view class="text-black text-bold">{{i.name}}</view>
						<view class="text-gray text-sm margin-top-xs">{{i.mobile}}</view>
					</view>
					<view class="text-xxl text-cyan">
						<text class="cuIcon cuIcon-phone"></text>
					</view>
				</view>
			</view>
		</data-list>
	</view>
</template>

<script>
	import DataList from '@/components/data-list'
	import Ava from '@/components/avatar'
	
	export default {
		onLoad(opt) {
			this.pId = opt.pId
			this.rData = {project_id: this.pId}
			this.$nextTick(_ => {
				this.$refs.list.init()
			})
		},
		data () {
			return {
				pId: '',
				list: [],
				rData: null
			}
		},
		components: {
			DataList, Ava
		},
		methods: {
			handleList(list) {
				this.list = list
			},
			makePhone(phoneNumber) {
				uni.makePhoneCall({
				    phoneNumber
				})
			}
		}
	}
</script>

<style>
</style>
