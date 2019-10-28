<script>
	import {
		BASE_URL
	} from '@/utils/const'
	import Echo from '@/utils/echo.common'
	import client from '@/utils/weapp.socket.io'
	import { mapState, mapMutations } from 'vuex'
	export default {
	    data() {
	        return {
                id: '',
                echo: {}
            }
        },
		created() {
            // #ifdef APP-PLUS
			const self = this;
			plus.push.addEventListener('click', function(msg){
				let i = self.messageList.findIndex(item => Number(item.id) === Number(msg.payload));
				let data = self.messageList[i];
				uni.hideTabBarRedDot({
					index: 1
				});
				uni.navigateTo({
					url: `/pages/message/chat/index?id=${data.both_id}&type=${data.both_type}&send-name=${data.name}`
				})
				self.setSpliceMessageList(msg.payload);
			}, false);
			// #endif
		},
		onLaunch: function(e) {
            let shopId = e.query.shop_id;
            let token = uni.getStorageSync('apiToken');
            this.changeToken(token);
            // #ifdef H5
			this.setH5();
			// #endif
			/*uni.getSystemInfo({
				success: e => {
					console.log(e)
				}
			});*/
            if (!/(object|undefined)/.test(typeof shopId)) {
			    this.setShopId(shopId);
            } else {
                this.setShopId('');
            }
            // this.getUserInfo(token, !shopId);
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
		onShow(){
            if (this.shopId) return false;
            this.getUserInfo(this.token, !this.shopId);
        },
		onHide(){
            this.setShopId('');
        },
        watch: {
		    hasLogin(data) {
		        // let e = this.socket();
                if (data) {
                    this.noticeMessage();
                } else {
                    // private("App.User." + this.userInfo.id)
                    this.echo.leave("App.User." + this.id);
                    this.echo.disconnect();
                }
            }
        },
		methods: {
			...mapMutations(['login', 'setH5', 'changeToken']),
			...mapMutations('message', ['setNew', 'setPushMessageList', 'setSpliceMessageList']),
            ...mapMutations('project', ['setShopId']),
            socket() {
			    const token = this.token;
                return new Echo({
                    client: client,
                    broadcaster: "socket.io",
                    // #ifdef H5
                    host: BASE_URL + ":6001",
                    // #endif
                    // #ifndef H5
                    protocol: 'wss',
                    host: `${BASE_URL.split('//')[1]}:6001`,
                    // #endif
                    auth: {
                        headers: {
                            Authorization: "Bearer " + token
                        }
                    }
                });
            },
            noticeMessage() {
			    this.id = this.userInfo.id;
                this.echo = this.socket();
                this.echo.private("App.User." + this.userInfo.id).notification(r => {
                    let data = r.data;
                    this.setNew(data);
                    uni.showTabBarRedDot({
                        index: 1
                    });
                    // #ifdef APP-PLUS
                    if (Number(this.currentBothId) === Number(data.both.id) ) return false;
                    let i = this.messageList.findIndex(item => Number(item.id) === Number(data.both.id));
                    let opt = {
                        cover: false,
                        title: data.both.name
                    };
                    let content = data.message.data.content;
                    if (i === -1) {
                        let param = {
                            id: data.both.id,
                            both_id: data.both.id,
                            both_type: data.window.both_type,
                            name: data.send.name
                        };
                        this.setPushMessageList(param);
                    } else {
                        let messageArr = plus.push.getAllMessage();
                        let index = messageArr.findIndex(item => Number(item.payload) === Number(data.both.id));
                        let pushMessage = messageArr[index];
                        plus.push.remove(pushMessage);
                    }
                    plus.push.createMessage(content, data.both.id.toString(), opt);
                    // #endif
                })
            },
            getUserInfo(token, isNeedLogin) {
                const self = this;
                if (token) {
                    this.$http('auth/user').then(r => {
                        let res = r;
                        if (!res.avatar) {
                            res.avatar = self.defaultAvatar;
                        }
                        this.login(res);
                    })
                } else if (isNeedLogin) {
                    uni.reLaunch({
                        url: '/pages/public/login/index'
                    })
                }
            }
		},
		computed: {
			...mapState(['userInfo', 'hasLogin', 'defaultAvatar', 'token']),
			...mapState('message', ['new', 'messageList', 'currentBothId']),
            ...mapState('project', ['shopId'])
		},
        mounted() {}
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
	
	.padding-25 {
	    padding: 25rpx;
	}
</style>
