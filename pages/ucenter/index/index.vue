<template>
	<view>
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title text-green "></text> 名片
			</view>
		</view>
		<!-- 列表图标 -->
		<view class="cu-list grid col-4 no-border">
			<view class="cu-item" v-for="(item,index) in cuIconList" :key="index" @tap="handleNav" :item="item">
				<view :class="['cuIcon-' + item.cuIcon,'text-' + item.color]">
					<view class="cu-tag badge" v-if="item.badge">
						<block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
					</view>
				</view>
				<text>{{item.name}}</text>
			</view>
		</view>
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
					name: '我的名片'
				}/* , {
					cuIcon: 'recordfill',
					color: 'orange',
					badge: 0,
					name: '设置'
				} */],

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
			uni.startWifi({
				success(res) {
					console.log(res)
					uni.getWifiList({
						success(r) {
							console.log(r);
						},
						fail(e) {
							console.log(e);
						}
					})
				},
				fail(e) {
					console.log(e);
				}
			})
			uni.onGetWifiList(function(r) {
				console.log(r.wifiList);
			})
			//#endif
			
		},
		onShow() {
			if (!this.hasLogin) {
				uni.navigateTo({url: '/pages/public/login/index'})
				return false;
			}
		},
		methods: {
			handleNav(url) {
				if (url) {
					uni.navigateTo({
						url: '/pages/ucenter/businesscard/index/businesscard'
					})
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
