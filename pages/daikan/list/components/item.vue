<template>
	<view class="bg-white margin-top-sm">
			<view class="content flex flex-direction align-center padding-tb-xs padding-lr-sm">
				<view style="word-wrap:break-word">
					<text class="cu-tag bg-blue radius">{{bean.status_name}}</text>
				</view>
				<view class="flex flex-wrap">
					<text class="basis-df"><text class="text-gray">看房时间:&nbsp;</text>{{bean.created_at|moment('from')}}</text>
					<text class="basis-df"><text class="text-gray">实看人数:&nbsp;</text>{{bean.peoples}}</text>
				</view>
				<view class="grid col-4 grid-square flex-sub">
					<view class="bg-img" v-for="(i,inx) in bean.img" :key="inx" @tap="viewImage(bean.img, inx)">
						<image :src="i" mode="aspectFill"></image>
					</view>
				</view><strong></strong>
			</view>
	</view>
</template>

<script>
	import Ava from '@/components/avatar.vue'
	export default {
		props: {
			bean: {
				type: Object
			}
		},
		data: _ => ({}),
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
		}
	}
</script>

<style>
</style>
