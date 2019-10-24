<template>
	<view>
		<view class="makecard" @tap="topMakeCard">
			<view></view>
			<text>
				{{onEvent.title}}
			</text>
		</view>
	</view>
</template>

<script>

	export default {
		props: {
			onEvent: {
				type: Object,
				default: function() {
					return {}
				}
			}
		},
		methods: {
			topMakeCard(e) {
                const {isRedirect, url} = this.onEvent;
				if (!isRedirect) {
					uni.navigateTo({
						url: url
					})
				} else {
					let pages = getCurrentPages().reverse();
					let len = 0;
					for (let i=0; i<=pages.length-1; i++) {
						if (pages[i]['route'] === 'pages/ucenter/businesscard/index/businesscard') {
							len = i;
							break;
						}
						
					}
					len = Math.max(1, len);
					// 判断是否要回到首页
					uni.navigateBack({
						delta: len
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	@import 'makebtn';
</style>
