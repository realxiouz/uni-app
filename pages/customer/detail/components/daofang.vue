<template>
	<view class="bg-white margin-top-sm">
			<view class="padding-tb-xs padding-lr-sm">
				<!-- <view class="margin-bottom-xs" style="word-wrap:break-word" v-if="bean.baobei_id !== null && bean.baobei_id !== undefined">
					<text class="cu-tag bg-blue radius">{{bean.status_name}}</text>
				</view> -->
				<view class="flex flex-wrap margin-bottom-xs">
					<text class="basis-df"><text class="text-gray">看房时间:&nbsp;</text>{{(bean.kan_time|moment('MM-DD HH:mm')) || ''}}</text>
					<text class="basis-df"><text class="text-gray">实看人数:&nbsp;</text>{{bean.peoples}}</text>
				</view>
				<view class="margin-bottom-xs">
					<text class="basis-df"><text class="text-gray">备注:&nbsp;</text>{{bean.remark||''}}</text>
				</view>
				<view class="margin-bottom-xs" v-if="bean.baobei_project_id">
					<text class="basis-df"><text class="text-gray">楼盘名称:&nbsp;</text>{{bean.baobei_project.name}}</text>
				</view>
				<view class="grid col-4 grid-square flex-sub">
					<view class="bg-img" v-for="(i,inx) in bean.img" :key="inx" @tap="viewImage(bean.img, inx)">
						<image :src="i" mode="aspectFill"></image>
					</view>
				</view>
			</view>
	</view>
</template>

<script>
	import Ava from '@/components/avatar'
	export default {
		
		props: {
			bean: {
				type: Object
			}
		},
		data: _ => ({
			bean1: {
			}
		}),
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
