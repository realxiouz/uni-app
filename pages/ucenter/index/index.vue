<template>
	<view :style="{height: height}" class="wrap">
		<view class="user">
            <view class="title" :data-avatar="userInfo.avatar">
                <view class="avatar" @tap="toAvatar">
                    <image :src="userInfo.avatar"></image>
                </view>
                <view class="userInfo">
					<view class="title-msg">
						<text class="name">{{userInfo.name || ''}}</text>
						<text class="position" v-if="userInfo.role_name">{{userInfo.role_name}}</text>
					</view>
					<view class="position get-phone">
                        <view>电话: </view>
                        <!--#ifndef MP-WEIXIN-->
                        <view >{{userInfo.mobile || ''}}</view>
                        <!--#endif-->
                        <!--#ifdef MP-WEIXIN-->
                        <view v-if="userInfo.mobile">{{userInfo.mobile}}</view>
                        <get-phone @get-phone="getPhone" v-else :my-style="true"/>
                        <!--#endif-->
                    </view>
				</view>
				<view class="next-icon" @tap="toAvatar">
					<view class="cu-item arrow"></view>
				</view>
            </view>
			<view class="menu">
                <view class="list" @tap="show = !show" v-if="userInfo.company_id !== '' && userInfo.company_id !== null">
                    <view class="content">公司信息</view>
                    <view :class="[show? 'pull-up': 'down',  'text-gray', 'icon', 'weight']"></view>
                </view>
                <view v-if="show" class="show">
                    <view>{{userInfo.company.name}}</view>
                    <view>公司ID: {{userInfo.company_id}}</view>
                    <view>报备邀请码: {{userInfo.invitation_code}}</view>
                    <view>渠道邀请码: {{userInfo.company_id}}-{{userInfo.invitation_code}}</view>
                </view>
                <view class="list" @tap="handleNav('/pages/ucenter/businesscard/index/businesscard?personal=1')" style="border-width: 0">
                    <view class="content">个人名片</view>
                    <view class="cu-item arrow icon"></view>
                </view>
            </view>
            <view class="set-password" @tap="setPassword">
                <view class="content">修改密码</view>
                <view class="cu-item arrow icon"></view>
            </view>
            <view class="btn" @tap="btnSignOut">
                <view class="content">退出登录</view>
            </view>
		</view>
	</view>
</template>

<script>
    import { mapState, mapMutations, mapActions } from 'vuex';
    import getPhone from '../get-phone/get-phone';
	export default {
		data() {
			return {
                show: false,
                height: 100,
                icon: 'unfold'
			};
		},
        watch: {},
		onLoad() {
            const self = this;
            self.getUserInfo(self.$http);
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
            self.$nextTick(_ => {
                uni.getSystemInfo({
                    success(res) {
                        self.height = res.windowHeight + 'px';
                    }
                })
            })
		},
		onShow() {},
		methods: {
		    ...mapActions(['getUserInfo']),
			...mapMutations(['logout', 'login']),
            ...mapMutations('ucenter', ['clearEmpty']),
			handleNav(url) {
				uni.navigateTo({
					url: url
				})
			},
			btnSignOut() {
				let self = this;
                uni.showModal({
					title: '退出登录',
                    content: '确定退出当前账号?',
					cancelColor: "#085820",
					confirmColor: "#ff0000",
                    cancelText: "取消",
                    confirmText: "确定",
					success(res) {
						if (res.confirm) {
							self.logout();
							self.clearEmpty();
							uni.reLaunch({
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
            },
			toAvatar() {
				uni.navigateTo({
					url: '/pages/ucenter/set-avatar/set-avatar'
				})
			},
            getPhone(res) {
                let purePhoneNumber = res.purePhoneNumber;
			    let userInfo = JSON.parse(JSON.stringify(this.userInfo));
			    userInfo.mobile = purePhoneNumber;
			    this.login(userInfo);
            }
		},
		computed: {
			...mapState(['token', 'userInfo', 'defaultAvatar']),
            ...mapState('ucenter', ['interceptUId'])
		},
		mounted() {},
        components: {
            getPhone
        }
	}
</script>

<style lang="scss" scoped>
    .wrap {
        background: #EDEDED;
        .user {
            .title {
                display: flex;
                align-items: center;
                flex-wrap: nowrap;
                padding: 30rpx 0 30rpx 40rpx;
                border-bottom: 1rpx solid #ddd;
				background: #fff;
                .avatar {
                    width: 115rpx;
                    height: 115rpx;
                    margin-right: 50rpx;
                    image {
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                        background: #fff;
                    }
                }
                .userInfo {
                    flex: 1;
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
                    .get-phone {
                        display: flex;
                        flex-wrap: nowrap;
                        align-items: center;
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
				.next-icon {
					padding-right: 20rpx;
					align-self: flex-end;
					.icon {
						font-size: 20px;
					}
				}
            }
            .menu {
                /*padding: 8rpx 0 8px 30rpx;*/
                margin-top: 20rpx;
                background: #fff;
                border-bottom: 1rpx solid #eee;
                border-top: 1rpx solid #eee;
                .list {
                    display: flex;
                    justify-content: space-between;
                    padding: 30rpx 20rpx 38rpx 40rpx;
                    border-bottom: 1rpx solid #eee;
                    font-size: 15px;
					.content {
						font-weight: bold;
					}
                    .icon {
                        font-size: 20px;
                    }
                    .weight {
                        font-weight: bold;
                    }
                }
                .show {
                    padding: 10rpx 20rpx 10rpx 60rpx;
                    border-bottom: 1rpx solid #eee;
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
                border-top: 1rpx solid #eee;
                border-bottom: 1rpx solid #eee;
                margin-top: 20rpx;
                font-size: 15px;
				.content {
					font-weight: bold;
				}
                .icon {
                    font-size: 20px;
                }
            }
            .btn {
                padding: 30rpx 20rpx 30rpx 10rpx;
                background: #fff;
                border-bottom: 1rpx solid #eee;
                border-top: 1rpx solid #eee;
                margin-top: 20rpx;
                color: red;
                font-size: 18px;
                text-align: center;
            }
        }
    },
    .arrow:after {
        display: block;
        margin: auto;
        padding-right: 6rpx;
        color: #8799a3;
        content: "\E6A3";
        text-align: center;
        font-size: 17px;
        font-family: cuIcon;
        line-height: 1.5;
    }
    .down:after {
        content: '\e661';
        display: block;
        margin: auto;
        padding-right: 6rpx;
        color: #8799a3;
        text-align: center;
        font-size: 17px;
        font-family: cuIcon;
        font-weight: bold;
        line-height: 1.5;
    }
    .pull-up:after {
        display: block;
        margin: auto;
        padding-right: 6rpx;
        color: #8799a3;
        content: "\e6de";
        text-align: center;
        font-size: 17px;
        font-family: cuIcon;
        font-weight: bold;
        line-height: 1.5;
    }
</style>
