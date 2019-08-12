<template>
	<view>
		<!-- <view class="cu-list menu">
			<navigator class="cu-item arrow" url="/pages/customer/need/index">
				<view class="content padding-tb-sm">
					<text class="cuIcon-roundaddfill text-green margin-right-xs"></text><text class="text-black text-bold">添加需求</text>
				</view>
			</navigator>
		</view> -->
		
		<!-- <view class="cu-list menu">
			<view class="cu-item" v-for="(i, inx) in list" :key="inx">
				<view class="content padding-tb-sm">
					<view class="flex">
						<view class="flex-sub">
							<view class="text-black text-bold">{{i.name}}</view>
							<view class="text-gray text-sm">{{i.type}}</view>
						</view>
						<navigator :url="`/pages/attendance/time/index?id=${i.id}`">
							<text class="cuIcon-edit" style="font-size: 50upx;"></text>
						</navigator>
					</view>
				</view>
			</view>
		</view> -->
		<data-list :rData="{customer_id: customerId}" rUrl="customerDemand" @data="handleData" ref="list">
			<item :bean='i' v-for="i in list" :key="i.id"/>
		</data-list>
		
		<float-button @go="handleGo" />
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	import DataList from '@/components/data-list'
	import Item from './components/item'
	import FloatButton from '@/components/float-button'

	export default {
		onLoad(opt) {
			this.customerId = opt.id
			this.customerType = opt.type
			this.$nextTick(_ => {
				this.$refs.list.init()
			})
		},
		data: _ => ({
			list: [],
			customerId: '',
			customerType: 0
		}),
		computed: {
			...mapState({
				week: state => state.attendance.week
			})
		},
		methods: {
			...mapMutations('attendance', ['setWeek']),
			handleData(l) {
				this.list = l 
			},
			handleGo() {
				let url = '/pages/customer/need/index'
				uni.navigateTo({
					url
				})
			}
		},
		components: {
			DataList, Item, FloatButton
		}
	}
</script>
