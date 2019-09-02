<script>
	import {
		BASE_URL
	} from '@/utils/const'
	import Echo from '@/utils/echo.common'
	import client from '@/utils/weapp.socket.io'
	import { mapState, mapMutations } from 'vuex'
	
	export default {
		onLaunch: function() {
			// #ifdef H5
			this.setH5()
			// #endif
			uni.getSystemInfo({
				success: e => {
					console.log(e)
				}
			})
			let token = uni.getStorageSync('apiToken')
			if (token) {
				this.$http('auth/user').then(r => {
					this.login(r)			
					let e = new Echo({
						client: client,
						broadcaster: "socket.io",
						// #ifdef H5
						host: BASE_URL + ":6001",
						// #endif
						// #ifndef H5
						protocol:'wss',
						host:'dev.km999.com:6001',
						// #endif
						auth: {
							headers: {
								Authorization: "Bearer " + uni.getStorageSync('apiToken')
							}
						}
					})
					e.private("App.User." + this.userInfo.id).notification(r => {
						this.setNew(r.data)
						uni.showTabBarRedDot({
							index: 1
						})
					})
				})
			} else {
				uni.navigateTo({
					url: '/pages/public/login/index',
				})
			}
			
			// uni.getLocation({
			// 	type: 'gcj02',
			// 	success: ({longitude, latitude, address}) => {
			// 		console.log(longitude)
			// 		console.log(latitude)
			// 		console.log(address)
			// 	},
			// 	fail: (err) => {
			// 		console.log(err);
			// 	}
			// })
		},
		onShow: function() {

		},
		onHide: function() {

		},
		methods: {
			...mapMutations(['login', 'setH5']),
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
	
	.q-fixed {
		position: fixed;
		z-index: 1;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
	}
	
	.uni-input-form{
		height: 100%;
	}
</style>
