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
		<view class="main">
			<view class="content shadow">
				<text>{{bean.message.data.content}}</text>
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
