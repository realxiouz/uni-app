<template>
	<view class="cu-item self" v-if="bean.send_id == userInfo.id">
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
			
			<view style="width: 100%;" class="margin-top-xs" v-if="bean.message.data.contacts && bean.message.data.contacts.length">
				<text class="text-gray text-sm margin-right-xs">相关人员:</text>
				<navigator class="cu-tag bg-cyan radius small" v-for="(i, inx) in bean.message.data.contacts" :key="inx" :url="`/pages/contact/detail/index?id=${i.id}`">@ {{i.name}}</navigator>
			</view>
		</view>
		<view class="date">{{bean.message.created_at|moment('MM-DD HH:mm')}}</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	import Ava from '@/components/avatar'
	
	export default {
		data() {
			return {
				
			}
		},
		props: {
			bean: Object
		},
		computed: {
			...mapState(['userInfo'])
		},
		components: {
			Ava
		}
	}
</script>

<style>
</style>
