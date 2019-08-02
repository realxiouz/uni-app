<script>
	import {
		mapMutations
	} from 'vuex'
	export default {
		onLaunch: function() {
			this.$http('auth/user').then(r => {
				this.login(r)
			})

			wx.getNetworkType({
				success(res) {
					const networkType = res.networkType
					console.log(res)
				}
			})
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
