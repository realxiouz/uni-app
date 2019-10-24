<template>
	<view class="bg-white margin-top-sm">
			<view class="padding-tb-xs padding-lr-sm">
				<view class="flex flex-wrap margin-bottom-xs">
					<text class="basis-df"><text class="text-gray">客户姓名:&nbsp;</text>{{bean.customer.name}}</text>
					<text class="basis-df"><text class="text-gray">共享员工:&nbsp;</text>{{bean.employee.name}}</text>
				</view>
				<view class="flex flex-wrap margin-bottom-xs">
					<text class="basis-df"><text class="text-gray">分享时间:&nbsp;</text>{{bean.created_at|moment('from')}}</text>
					<text class="basis-df"><text class="text-gray">状态:&nbsp;</text>{{bean.status.value}}</text>
				</view>
				<view class="flex flex-wrap margin-bottom-xs">
					<button class="cu-btn small radius bg-red" @click="cancel" v-if="bean.status.value!='已失效'">取消分享</button>
				</view>
			</view>
	</view>
</template>

<script>
	export default {
		props: {
			bean: {
				type: Object
			}
		},
		methods: {
			cancel() {
				uni.showModal({
					title: '注意',
					content: '确认取消此分享么?',
					success: r => {
						if (r.confirm) {
							this.$http(`customer-share/${this.bean.id}`, null, 'delete').then(res => {
								uni.showToast({
									title: res.message,
									icon: 'none'
								})
								this.$emit('refresh')
							})
						}
					}
				})
			}
		}
	}
</script>
