<template>
	<view class="bg-white margin-top-sm">
			<view class="padding-tb-xs padding-lr-sm">
				<view class="margin-bottom-xs" style="word-wrap:break-word">
					<text class="cu-tag bg-cyan radius small">{{bean.action.value}}</text>
				</view>
				<view class="flex flex-wrap margin-bottom-xs">
					<text class="basis-df"><text class="text-gray">操作时间:&nbsp;</text>{{bean.created_at|moment('from')}}</text>
					<text class="basis-df"><text class="text-gray">操作人:&nbsp;</text>{{bean.user.name}}</text>
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
		}
	}
</script>
