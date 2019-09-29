<template>
	<navigator class="bg-white padding-sm solids-bottom" :url="`/pages/message/chat/index?id=${bean.both_id}&type=${bean.both_type}&send-name=${bean.both.name}`">
		<view class="flex">
			<ava :name="bean.both.name" class="margin-right-sm" is-square/>
			<view class="flex-sub flex flex-direction justify-between margin-right-sm" style="max-width: calc(100vw - 240upx);">
				<view class="text-black text-bold">{{bean.both.name}}</view>
				<view class="text-gray text-sm" v-if="bean.message.data">
					<view v-if="bean.message.data.type==='text'" class="text-cut">{{bean.message.data.content}}</view>
				</view>
			</view>
			<view class="flex flex-direction justify-between">
				<view class="text-grey text-xs">{{bean.message.created_at|moment('chat')}}</view>
				<view class="text-center"><text class="cu-tag round bg-red sm" v-if="bean.unread_count">{{bean.unread_count}}</text></view>
			</view>
		</view>
	</navigator>
</template>

<script>
	import Ava from '@/components/avatar'
	import { mapState } from 'vuex'
	export default {
		
		props: {
			bean: {
				type: Object
			}
		},
		components: {
			Ava
		},
		computed: {
			...mapState(['userInfo'])
		}
	}
</script>

<style>
</style>
