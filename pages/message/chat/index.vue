<template>
	<view>
		<scroll-view scroll-y class="cu-chat" :scroll-into-view="sId" @scrolltoupper="handleMore"
			:style="{position: 'fixed', top: isH5?'44px':'0', left:0, right:0, bottom: bottom}">
			<item v-for="(i, inx) in list" :key="inx" :bean="i" :id="`message-${i.message_id}`"/>
		</scroll-view>
		<view class="cu-bar foot input" :style="[{bottom:20+'rpx'}]" v-if="bothType === 'App\\User'">
			<!-- <view class="action">
				<text class="cuIcon-sound text-grey"></text>
			</view> -->
			<input class="solid-bottom" :adjust-position="adjustPosition" :focus="false" maxlength="300" cursor-spacing="10"
			 @focus="InputFocus" @blur="InputBlur" v-model="content">
			<!-- <view class="action">
				<text class="cuIcon-emojifill text-grey"></text>
			</view> -->
			<button class="cu-btn bg-green shadow" @click="handleSend">发送</button>
		</view>

	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	import Item from './components/item'
	
	export default {
		onLoad(opt) {
			this.bothId = opt.id;
			this.bothType = opt.type;
			this.setCurrentBothId(opt.id);
			if (this.bothType == "App\\User") {
				this.bottom = uni.upx2px(100+25) + 'px';
			}
			this.getData();
            uni.setNavigationBarTitle({
                title: opt['send-name']
            })
		},
		data() {
			return {
				/*InputBottom: 10,*/
                adjustPosition: false,
				bothId: '',
				bothType: '',
				list: [],
				content: '',
				
				sId: '',
				loaded: false,
				isLoading: false,
				bottom: 0
			};
		},
		onUnload() {
			this.setCurrentBothId('');
		},
		onShow() {
			// #ifdef APP-PLUS
			let messageArr = plus.push.getAllMessage();
			let i = messageArr.findIndex(item => Number(item.payload) === Number(this.bothId));
			let pushMessage = messageArr[i];
			plus.push.remove(pushMessage);
			this.setSpliceMessageList(pushMessage.payload);
			// #endif
            // #ifndef APP-PLUS
            this.adjustPosition = true;
            // #endif
		},
		methods: {
			...mapMutations('message', ['setSpliceMessageList', 'setCurrentBothId']),
			InputFocus(e) {
				/*this.InputBottom = '0' || e.detail.height;
                console.log(e.detail.height, 'e.detail.height');*/
            },
			InputBlur(e) {
				/*this.InputBottom = 10*/
			},
			handleMore() {
				if (this.loaded && !this.isLoading) {
					this.getData(this.list[0].message_id)
				}
			},
			getData(message_id_start) {
			    uni.showLoading({
                    title: '加载中...',
                    mask: true
                });
				this.isLoading = true
				// user_id: this.userInfo.id,
				let data = {
					both_id: this.bothId,
					both_type: this.bothType
				};
				if (message_id_start) {
					data.message_id_start = message_id_start
				}
				this.$http('message-link', data).then(r => {
					if (!message_id_start) {
						this.list = r.data.reverse()
						this.loaded = true
						this.goTarget()
						return
					}
                    this.list = [...r.data.reverse(), ...this.list];
					this.goTarget(message_id_start)
				}).catch(err => {
                    uni.hideLoading();
                }).finally(_ => {
					this.isLoading = false;
				})
			},
			handleSend() {
				if (!this.content.trim()) {
					uni.showToast({
						title: '还没有输入内容',
						icon: 'none'
					})
					return
				}
				let data = {
					receive_id: this.bothId,
					receive_type: this.bothType,
					data: {
						type: 'text',
						content: this.content
					}
				}
				this.$http('message', data, 'post').then(r => {
					this.list.push(r.data)
					this.content = ''
					this.goTarget()
				})
			},
			goTarget(id) {
				// #ifndef H5
				if (id) {
					this.sId = `message-${id}`
					return
				}
				let lastId = this.list[this.list.length - 1].message.id
				this.sId = `message-${lastId}`
				// #endif
				// #ifdef H5
				this.$nextTick(_ => {
					if (id) {
						this.sId = `message-${id}`
						return
					}
					let lastId = this.list[this.list.length - 1].message.id
					this.sId = `message-${lastId}`
				})
				// #endif
			}
		},
		computed: {
			...mapState(['userInfo', 'isH5']),
			...mapState('message',['new'])
		},
		watch: {
			new(val) {
				if (val.id) {
					if (val.both_type === this.bothType && val.both_id == this.bothId) {
						this.list.push(val)
						this.goTarget()
					}
				}
			},
            list: {
			    handler(data) {
			        this.$nextTick(_ => {
                        uni.hideLoading();
                    })
                },
                deep: true
            }
		},
		components: {
			Item
		},
        onBackPress() {
            uni.switchTab({
                url: '/pages/message/index/index'
            });
            return true;
        },
        mounted() {}
	}
</script>

<style>
/* page{
  padding-bottom: 100upx;
} */
.cu-bar.input .solid-bottom {
    height: 110rpx !important;
}
.cu-bar.input button {
    align-self: flex-end;
    margin-bottom: 13rpx;
}
</style>
