<template>
	<view class="bg-white margin-bottom-sm">
			<view class="padding-tb-xs padding-lr-sm">
				<view style="word-wrap:break-word">
					<text>{{bean.content}}</text>
				</view>
				<view>
					<text class="cu-tag bg-blue radius">{{bean.type_name}}</text>
					<text class="cu-tag radius" :class="bean.desire<=2?'bg-red':bean.desire==2?'bg-yellow':'bg-green'">{{desireObj[bean.desire]}}</text>
				</view>
				<view class="flex flex-wrap">
					<text class="basis-df"><text class="text-gray">时间:&nbsp;</text>{{bean.created_at|moment('from')}}</text>
					<text class="basis-df"><text class="text-gray">跟进人:&nbsp;</text>{{bean.user.name}}</text>
				</view>
				<view class="grid col-4 grid-square flex-sub">
					<view class="bg-img" v-for="(i,inx) in bean.imgs" :key="inx" @tap="viewImage(bean.imgs, inx)">
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
			},
			desireObj: {
				'1': '厌恶',
				'2': '不感兴趣',
				'3': '一般',
				'4': '感兴趣',
				'5': '非常感兴趣',
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
