<template>
	<view>test
	<view>
		{{provider.join(',')}}
	</view>
	<button @click="wxLogin">wx_login</button>
	<button @click="wxShareText">wx_share_text</button>
	</view>
</template>

<script>
	export default {
		onLoad() {
			this.getProvider()
		},
		data() {
			return {
				provider: []
			}
		},
		methods: {
			getProvider() {
				uni.getProvider({
					service: 'share',
					success: r => {

						let {provider} = r
						this.provider = provider
					}
				})
			},
			wxLogin() {
				uni.login({
				  provider: 'weixin',
				  success: function (loginRes) {
				    console.log(loginRes);
				  }
				});
			},
			wxShareText() {
				uni.share({
				    provider: "weixin",
				    scene: "WXSceneSession",
				    type: 1,
				    summary: "我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",
				    success: function (res) {
				        console.log("success:" + JSON.stringify(res))
						uni.showToast({
							title: JSON.stringify(res)
						})
				    },
				    fail: function (err) {
				        console.log("fail:" + JSON.stringify(err))
						uni.showToast({
							icon: 'none',
							title: JSON.stringify(err)
						})
				    }
				});
			}
		}
	}
</script>

<style>
</style>
