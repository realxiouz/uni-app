<template>
	<view>
		<view>
			<view class="cu-avatar lg round margin-left bg-red">
				{{userInfo.name}}
			</view>
			<view>
				<text>{{userInfo.name}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	export default {
		computed: {
			...mapState(['userInfo'])
		}
	}
</script>
