<template>
	<navigator class="bg-white padding-sm solids-bottom" :url="`/pages/message/chat/index?id=${bean.both_id}&type=${bean.both_type}`">
		<view class="flex">
			<ava :name="bean.both.name" class="margin-right-sm" is-square/>
			<view class="flex-sub flex">
				<view class="flex-sub flex flex-direction justify-between">
					<view class="text-black text-bold">{{bean.both.name}}</view>
					<view class="text-gray text-sm" v-if="bean.message.data">
						<text v-if="bean.message.data.type==='text'">{{bean.message.data.content}}</text>
					</view>
				</view>
				<view>
					<view>{{bean.message.created_at|moment('MM-DD HH:mm')}}</view>
				</view>
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
		methods: {
			viewImage(urls, current) {
				uni.previewImage({
					urls,
					current
				})
			}
		},
		computed: {
			...mapState(['userInfo'])
		}
	}
</script>

<style>
</style>
