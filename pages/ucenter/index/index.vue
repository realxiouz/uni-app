<template>
	<view>
		wod

	</view>
</template>

<script>
import { mapState } from 'vuex'
	export default {
		data() {
			return {
				cuIconList: [{
					cuIcon: 'cardboardfill',
					color: 'red',
					badge: 0,
					name: '打卡'
				}, {
					cuIcon: 'recordfill',
					color: 'orange',
					badge: 0,
					name: '设置'
				}],

				attendanceList: [
					{
						cuIcon: 'locationfill',
						color: 'green',
						badge: 0,
						name: '打卡',
						path: '/pages/attendance/signin/index'
					},
					{
						cuIcon: 'settingsfill',
						color: 'blue',
						badge: 0,
						name: '设置'
					}
				]
			};
		},
		onLoad() {
			//#ifdef MP-WEIXIN
			wx.startWifi({
				success(res) {
					console.log(res)
					wx.getWifiList({
						success(r) {
							console.log(r)
						},
						fail(e) {
							console.log(e)
						}
					})
				},
				fail(e) {
					console.log(e)
				}
			})
			wx.onGetWifiList(function(r) {
				console.log(r.wifiList);
			})
			//#endif
			
		},
		onShow() {
			if (!this.hasLogin) {
				uni.navigateTo({url: '/pages/public/login/index'})
				return
			}
		},
		methods: {
			handleNav(url) {
				if (url) {
					uni.navigateTo({ url })
				}
			}
		},
		computed: {
			...mapState(['hasLogin'])
		},
	}
</script>

<style>
</style>
