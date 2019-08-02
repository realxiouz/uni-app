<template>
	<view>
		<view class="flex">
			<view class="cu-avatar lg round margin-left bg-red">
				{{userInfo.name}}
			</view>
			<view>
				<view>{{userInfo.name}}</view>
				<view>考勤组:</view>
			</view>
		</view>
		<view class="cu-timeline">
			<view class="cu-time">{{day}}</view>
			<view class="cu-item">
				<view class="content">
					<view class="cu-capsule radius">
						<view class="cu-tag bg-cyan">上午</view>
						<view class="cu-tag line-cyan">10:00</view>
					</view>
					<!-- <view class="margin-top">这是第一次，我家的铲屎官走了这么久。久到足足有三天！！ 在听到他的脚步声响在楼梯间的那一刻，我简直想要破门而出，对着他狠狠地吼上10分钟，然后再看心情要不要他进门。</view> -->
				</view>
			</view>
			<view class="cu-item text-blue">
				<view class="content">
					<view class="cu-capsule radius">
						<view class="cu-tag bg-cyan">下班</view>
						<view class="cu-tag line-cyan">18:00</view>
					</view>
				</view>
				<!-- <view class="bg-blue shadow-blur content">
					<view class="cu-list menu-avatar radius">
						<view class="cu-item">
							<view class="cu-avatar round lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg);"></view>
							<view class="content">
								<view class="text-grey">文晓港</view>
								<view class="text-gray text-sm">
									<text class="cuIcon-infofill text-red"></text> 消息未送达</view>
							</view>
							<view class="action">
								<view class="text-grey text-xs">22:20</view>
								<view class="cu-tag round bg-grey sm">5</view>
							</view>
						</view>
						<view class="cu-item">
							<view class="cu-avatar round lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg);">
								<view class="cu-tag badge">99+</view>
							</view>
							<view class="content">
								<view class="text-grey">文晓港
									<view class="cu-tag round orange sm">SVIP</view>
								</view>
								<view class="text-gray text-sm">
									<text class="cuIcon-redpacket_fill text-red"></text> 收到红包</view>
							</view>
							<view class="action">
								<view class="text-grey text-xs">22:20</view>
								<text class="cuIcon-notice_forbid_fill text-gray"></text>
							</view>
						</view>
					</view>
				</view> -->
			</view>
		</view>
		<view class="flex justify-around margin-top">
			<view class="clock round bg-blue flex align-center justify-around">
				<view>
					<view class="text-xl margin-bottom-xs text-bold">下班打卡</view>
					<view>{{timeString}}</view>
				</view>
			</view>
		</view>
		<view class="flex justify-around margin-top">
			<view>
				<text class="margin-right-xs" :class="[isWifiOK?'cuIcon-roundcheckfill':'cuIcon-roundclosefill', isWifiOK?'text-blue':'text-red']"></text>
				已进入wifi考勤范围: {{wifi.SSID}}
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	export default {
		onShow() {
			// #ifdef MP-WEIXIN
			wx.startWifi({
				success: _ => {
					wx.getConnectedWifi({
						success: r => {
							this.wifi = r.wifi
						},
						fail: e => {
							
						}
					})
				},
				fail: e => {
				}
			})
			// #endif
			this.day = `${new Date().getMonth()+1}-${new Date().getDate()}`
			
			this.timer = setInterval(_ => {
				let date = new Date()
				let h = date.getHours()
				let m = date.getMinutes()
				let s = date.getSeconds()
				
				let hString = h > 9 ? h : '0' + h
				let mString = m > 9 ? m : '0' + m
				let sString = s > 9 ? s : '0' + s
				this.timeString = `${hString}:${mString}:${sString}`
			}, 1000)
		},
		onHide() {
			clearInterval(this.timer)
		},
		data: _ => ({
			wifi: {
				BSSID: '获取中',
				SSID: '获取中'
			},
			day: '06-17',
			timeString: '12:00:00',
			timer: null,
			isWifiOK: true
		}),
		computed: {
			...mapState(['userInfo'])
		},
		
	}
</script>

<style>
	.clock{
		width: 250upx;
		height: 250upx;
		text-align: center;
	}
</style>