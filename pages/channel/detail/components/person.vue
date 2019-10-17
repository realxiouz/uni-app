<template>
	<view class="bg-white margin-top-sm">
			<view class="padding-tb-xs padding-lr-sm">
				<view class="flex flex-wrap margin-bottom-xs">
					<text class="basis-df"><text class="text-gray">
						姓名:&nbsp;</text>{{bean.name||''}}
						<text class="cu-tag small radius bg-blue margin-left-sm" v-if="bean.main">默认</text>
					</text>
					<text class="basis-df"><text class="text-gray">电话:&nbsp;</text>{{bean.phone||''}}</text>
				</view>
				<view class="flex flex-wrap margin-bottom-xs">
					<text class="basis-df"><text class="text-gray">
						职位:&nbsp;</text>{{bean.title||''}}
					</text>
					<text class="basis-df"><text class="text-gray">性别:&nbsp;</text>{{bean.sex||''}}</text>
				</view>
				<view class="flex flex-wrap margin-bottom-xs">
					<text class="basis-df"><text class="text-gray">
						qq:&nbsp;</text>{{bean.qq||''}}
					</text>
					<text class="basis-df"><text class="text-gray">微信:&nbsp;</text>{{bean.weixin||''}}</text>
				</view>
				<view class="flex flex-wrap margin-bottom-xs">
					<text><text class="text-gray">
						备注:&nbsp;</text>{{bean.remark||''}}
					</text>
				</view>
				<view class="">
					<button class="cu-btn bg-blue radius small margin-right-xs" @click="handleEdit(bean.id)">编辑</button>
					<button class="cu-btn bg-cyan radius small margin-right-xs" v-if="!bean.main" @click="handleDefault(bean.id)">设为默认</button>
					<button class="cu-btn bg-red radius small margin-right-xs" v-if="!bean.main" @click="handleDel(bean.id)">删除</button>
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
		components: {
			Ava
		},
		methods: {
			handleEdit(id) {
				uni.navigateTo({
					url: `/pages/channel/link/index?id=${id}`
				})
			},
			handleDefault (id) {
				this.$http(`linkmen/${id}`, {main: true}, 'put').then(r => {
					uni.showToast({
						icon: 'none',
						title: r.message
					})
					this.$emit('default')
				})
			},
			handleDel(id) {
				this.$http(`linkmen/${id}`, null, 'delete').then(r => {
					uni.showToast({
						icon: 'none',
						title: r.message
					})
					this.$emit('default')
				})
			}
		}
	}
</script>

<style>
</style>
