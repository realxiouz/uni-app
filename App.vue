<script>
	import {
		BASE_URL
	} from '@/utils/const'
	
	import Echo from '@/utils/echo.common'
	import client from '@/utils/weapp.socket.io'
	
	import { mapState, mapMutations } from 'vuex'
	export default {
		onLaunch: function() {
			this.$http('auth/user').then(r => {
				this.login(r)			
				let e = new Echo({
					client: client,
					broadcaster: "socket.io",
					// host: BASE_URL + ":6001",
					protocol:'wss',
					host:'dev.km999.com:6001',
					auth: {
						headers: {
							Authorization: "Bearer " + uni.getStorageSync('apiToken')
						}
					}
				})
				e.private("App.User." + this.userInfo.id).notification(r => {
					console.log(r.data)
					this.setNew(r.data)
					uni.setTabBarBadge({
						index: 1,
						text: ''
					})
				})
			});
		},
		onShow: function() {

		},
		onHide: function() {

		},
		methods: {
			...mapMutations(['login']),
			...mapMutations('message', ['setNew'])
		},
		computed: {
			...mapState(['userInfo'])
		}
	}
</script>

<style>
	@import "colorui/main.css";
	@import "colorui/icon.css";
	
	.show-arrow {
		flex: 1;
		padding-right: 40upx;
		overflow: hidden;
		position: relative;
		text-align: right;
		line-height: 100upx;
	}
	.show-arrow::after{
		font-family: cuIcon;
		display: block;
		content: "\E6A3";
		position: absolute;
		font-size: 17px;
		color: #8799a3;
		line-height: 100upx;
		width: 60upx;
		text-align: center;
		top: 0;
		bottom: 0;
		right: -20upx;
		margin: auto;
	}
</style>
