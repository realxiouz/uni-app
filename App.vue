<script>
	import {
		mapMutations
	} from 'vuex'
	export default {
		onLaunch: function() {
			this.$http('auth/user').then(r => {
				this.login(r)
				uni.connectSocket({
					url: 'wss://dev.km999.com:6001',
					header: {
                        Authorization: "Bearer " + uni.getStorageSync('apiToken')
                    },
					success: _ => {
						console.log('11111')
					},
					fail: e => {
						console.log(e)
					}
				})
			});
		},
		onShow: function() {

		},
		onHide: function() {

		},
		methods: {
			...mapMutations(['login'])
		},
	}
</script>

<style>
	@import "colorui/main.css";
	@import "colorui/icon.css";
</style>
