<template>
	<view class="cu-item self" v-if="bean.send_id == userInfo.id && bean.send_type==='App\\User'">
		<view class="main">
			<view class="content bg-green shadow">
				<text>{{bean.message.data.content}}</text>
			</view>
		</view>
		<ava :name="userInfo.name" is-square/>
		<view class="date">{{bean.message.created_at|moment('MM-DD HH:mm')}}</view>
	</view>
	<view class="cu-item" v-else>
		<ava :name="bean.send.name" is-square/>
		<view class="main" style="flex-direction: column;">
			<view class="content shadow">
				<text>{{bean.message.data.content}}</text>
			</view>
			
			<view style="width: 100%;" class="margin-top-xs">
				<!-- <text class="text-gray text-sm margin-right-xs">相关人员:</text> -->
				<navigator class="cu-tag bg-cyan radius small margin" v-for="(i, inx) in bean.message.data.contacts" :key="inx" :url="`/pages/contact/detail/index?id=${i.id}`">@ {{i.name}}</navigator>
				<navigator
					class="cu-tag bg-cyan radius small margin"
					v-for="(i, inx) in bean.message.data.meta"
					:key="inx"
					:url="calcUrl(i)">
					{{i.title}}
				</navigator>
			</view>
		</view>
		<view class="date">{{bean.message.created_at|moment('MM-DD HH:mm')}}</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	import Ava from '@/components/avatar'
	
	export default {
		props: {
			bean: Object
		},
		computed: {
			...mapState(['userInfo'])
		},
		components: {
			Ava
		},
		methods: {
			calcUrl(i) {
				switch(i.type) {
					case 'customer_sales_pool':
					case 'customer_sales':
						return `/pages/customer/detail/index?id=${i.id}&type=新房`
					case 'customer_distribution_pool':
					case 'customer_distribution':
						return `/pages/customer/detail/index?id=${i.id}&type=新房`
					case 'baobei_in':
						return `/pages/baobei/detail/index?id=${i.id}&type=in`
					case 'baobei_my':
						return `/pages/baobei/detail/index?id=${i.id}&type=up`
					case 'project_cooperation':
						return `/pages/project/detail/index?id=${i.id}&type=cooperation`
				}
			}
		}
	}
</script>

<style scoped>
    .margin {
        margin: 0 10rpx 5rpx 0;
    }
</style>
