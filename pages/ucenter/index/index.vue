<template>
	<view :style="{height: height}" class="wrap">
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
            <view class="title">
                <view class="avatar">
                    <image :src="userInfo.avatar"></image>
                </view>
                <view class="userInfo">
                        <view class="title-msg">
                            <text class="name">{{userInfo.name}}</text>
                            <text class="position">{{userInfo.role_name}}</text>
                        </view>
                        <view class="position">电话: {{userInfo.mobile}}</view>
                    </view>
            </view>
			<view class="menu">
                <view class="list">
                    <view class="content">公司信息</view>
                    <view :class="[show? 'cuIcon-fold': 'cuIcon-unfold',  'text-gray', 'icon']" @tap="show= !show"></view>
                </view>
                <view v-if="show" class="show">
                    <view>{{userInfo.company.name}}</view>
                    <view>公司ID: {{userInfo.company_id}}</view>
                    <view>报备邀请码: {{userInfo.invitation_code}}</view>
                    <view>渠道邀请码: {{userInfo.company_id}}-{{userInfo.invitation_code}}</view>
                </view>
                <view class="list" @tap="handleNav('/pages/ucenter/businesscard/index/businesscard')" style="border-width: 0">
                    <view class="content">个人名片</view>
                    <view class="cuIcon-right text-gray icon"></view>
                </view>
            </view>
            <view class="set-password" @tap="setPassword">
                <view class="content">修改密码</view>
                <view class="cuIcon-right text-gray icon"></view>
            </view>
            <view class="btn" @tap="btnSignOut">
                <view class="content">退出登录</view>
            </view>
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
                show: false,
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
				],
                height: 100,
                icon: 'unfold'
			};
		},
        watch: {
		    userInfo(data) {
		        const userInfo = data;
                this.info = [
                    {
                        subInfo: userInfo.phone,
                        supInfo: '所属公司: ' + userInfo.department.name,
                        icon: 'phone',
                    },
                    {
                        subInfo: userInfo.company.name,
                        supInfo: '公司ID:' + userInfo.company.id,
                        icon: 'radioboxfill',
                    },
                    {
                        subInfo: '报备邀请码:' + userInfo.invitation_code,
                        supInfo: '渠道邀请码:' +  userInfo.company_id + '-' + userInfo.invitation_code,
                        icon: 'deliver_fill',
                    }

                ];
            },
            info(data) {
		        this.info = data;
            }
        },
		onLoad() {
			//#ifdef MP-WEIXIN
			/*uni.startWifi({
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
			})*/
			//#endif
            const self = this;
            uni.getSystemInfo({
                success(res) {
                    self.height = res.windowHeight + 'px';
                }
            })
		},
		onShow() {
			
		},
		methods: {
			...mapMutations(['logout']),
            ...mapMutations('ucenter', ['clearEmpty']),
			handleNav(url) {
				uni.navigateTo({
					url: url
				})
			},
			btnSignOut() {
				let self = this;
				uni.showModal({
					title: '确定退出登录',
					cancelColor: "#085820",
					confirmColor: "#ff0000",
                    cancelText: "取消",
                    confirmText: "确定",
					success(res) {
						if (res.confirm) {
							self.logout();
							self.clearEmpty();
							uni.navigateTo({
								url: '/pages/public/login/index'
							})
						}
					}
				})
			},
            setPassword() {
			    uni.navigateTo({
                    url: '/pages/ucenter/set-passward/set-passward'
                })
            }
		},
		computed: {
			...mapState(['hasLogin', 'userInfo'])
		},
		mounted() {
            const userInfo = this.userInfo;
            this.info = [
                {
                    subInfo: userInfo.phone,
                    supInfo: '所属公司: ' + userInfo.department.name,
                    icon: 'phone',
                },
                {
                    subInfo: userInfo.company.name,
                    supInfo: '公司ID:' + userInfo.company.id,
                    icon: 'radioboxfill',
                },
                {
                    subInfo: userInfo.invitation_code,
                    supInfo: userInfo.company_id + '-' + userInfo.invitation_code,
                    icon: 'deliver_fill',
                }

            ];
        }
	}
</script>

<style lang="scss" scoped>
    .wrap {
        background: #EDEDED;
        .user {
            .title {
                background: #fff;
                display: flex;
                align-items: center;
                flex-wrap: nowrap;
                padding: 30rpx 0 30rpx 40rpx;
                border-bottom: 1px solid #ccc;
                .avatar {
                    width: 115rpx;
                    height: 115rpx;
                    margin-right: 50rpx;
                    image {
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                    }
                }
                .userInfo {
                    .title-msg {
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
            .menu {
                padding: 8rpx 20rpx;
                margin-top: 20rpx;
                background: #fff;
                border-bottom: 1px solid #ccc;
                border-top: 1px solid #ccc;
                .list {
                    display: flex;
                    justify-content: space-between;
                    padding: 30rpx 20rpx 30rpx 10rpx;
                    border-bottom: 1px solid #ccc;
                    font-size: 18px;
                    .icon {
                        font-size: 20px;
                    }
                }
                .show {
                    padding: 0 20rpx;
                    border-bottom: 1px solid #ccc;
                    background: #fff;
                    font-size: 15px;
                    view {
                        padding: 5rpx 0;
                    }
                }
            }
            .set-password {
                display: flex;
                justify-content: space-between;
                padding: 30rpx 20rpx 30rpx 40rpx;
                background: #fff;
                border-top: 1px solid #ccc;
                border-bottom: 1px solid #ccc;
                margin-top: 20rpx;
                font-size: 18px;
                .icon {
                    font-size: 20px;
                }
            }
            .btn {
                padding: 30rpx 20rpx 30rpx 10rpx;
                background: #fff;
                border-bottom: 1px solid #ccc;
                border-top: 1px solid #ccc;
                margin-top: 20rpx;
                color: red;
                font-size: 18px;
                text-align: center;
            }
        }
    }
</style>
