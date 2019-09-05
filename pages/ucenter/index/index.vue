<template>
	<view>
		<!-- <view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title text-green "></text> 名片
			</view>
		</view>
		<!-- 列表图标 -->
		<!-- <view class="cu-list grid col-4 no-border">
			<view class="cu-item" v-for="(item,index) in cuIconList" :key="index" @tap="handleNav" :item="item">
				<view :class="['cuIcon-' + item.cuIcon,'text-' + item.color]">
					<view class="cu-tag badge" v-if="item.badge">
						<block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
					</view>
				</view>
				<text>{{item.name}}</text>
			</view>
		</view> -->
		<view class="user">
			<view class="avatar">
				<image :src="userInfo.avatar" mode="aspectFit"></image>
			</view>
			<view class="userInfo">
				<view class="title">
					<text class="name">{{userInfo.name}}</text>
					<text class="position">{{userInfo.role_name}}</text>
				</view>
				<view class="phone">{{userInfo.mobile}}</view>
				<view class="public">所属部门: {{userInfo.department.name}}</view>
				<view class="public">报备邀请码: {{userInfo.invitation_code}}</view>
				<view class="public">渠道邀请码: {{userInfo.company_id}}-{{userInfo.invitation_code}}</view>
				<view class="public">{{userInfo.company.name}}</view>
				<view class="public">公司ID: {{userInfo.company_id}}</view>
			</view>
		</view>
		<view class="business-card">
			<button type="primary" class="btn" @tap="handleNav">个人名片</button>
		</view>
		<view class="login-out">
			<button type="warn" class="btn" @tap="btnLognout">退出登录</button>
		</view>
	</view>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
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
			
		},
		methods: {
			...mapMutations(['logout']),
			handleNav() {
				uni.navigateTo({
					url: '/pages/ucenter/businesscard/index/businesscard'
				})
			},
			btnLognout() {
				let self = this;
				uni.showModal({
					title: '确定退出登录',
					cancelColor: "green",
					confirmColor: "red",
					success(res) {
						if (res.confirm) {
							self.logout();
							uni.navigateTo({
								url: '/pages/public/login/index'
							})
						}
					}
				})
			}
		},
		computed: {
			...mapState(['hasLogin', 'userInfo'])
		},
		mounted() {}
	}
</script>

<style lang="scss">
	.user {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: nowrap;
		padding: 20rpx 0;
		.avatar {
			width: 115rpx;
			height: 115rpx;
			margin-right: 100rpx;
			image {
				width: 100%;
				height: 100%;
				border-radius: 50%;
			}
		}
		.userInfo {
			.title {
				.name {
					font-size: 25px;
					font-weight: bold;
				}
				.position {
					padding: 3rpx 10rpx;
					background: #C6F3EA;
					border-radius: 20rpx;
				}
			}
			.phone {
				font-size: 18px;
				font-weight: bold;
			}
			.public {
				font-size: 15px;
				color: darkgray;
			}
		} 
	}
	.business-card {
		margin-bottom: 15rpx;
	}
	button {
		width: 500rpx;
		height: 70rpx;
		padding: 0;
		line-height: 2;
	}
	
</style>
