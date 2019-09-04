<template>
	<view>
		<scroll-view scroll-y class="cu-chat" :scroll-into-view="sId" @scrolltoupper="handleMore"
			:style="{position: 'fixed', top: isH5?'44px':'0', left:0, right:0, bottom: bottom}">
			<item v-for="(i, inx) in list" :key="inx" :bean="i" :id="`message-${i.message_id}`"/>
		</scroll-view>
		<view class="cu-bar foot input" :style="[{bottom:InputBottom+'px'}]" v-if="bothType == 'App\\User'">
			<!-- <view class="action">
				<text class="cuIcon-sound text-grey"></text>
			</view> -->
			<input class="solid-bottom" :adjust-position="false" :focus="false" maxlength="300" cursor-spacing="10"
			 @focus="InputFocus" @blur="InputBlur" v-model="content"></input>
			<!-- <view class="action">
				<text class="cuIcon-emojifill text-grey"></text>
			</view> -->
			<button class="cu-btn bg-green shadow" @click="handleSend">发送</button>
		</view>

	</view>
</template>

<script>
	import { mapState } from 'vuex'
	import Item from './components/item'
	
	export default {
		onLoad(opt) {
			this.bothId = opt.id
			this.bothType = opt.type
			if (this.bothType == "App\\User") {
				this.bottom = uni.upx2px(100) + 'px'
			}
			this.getData()
		},
		data() {
			return {
				InputBottom: 0,
				
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
		methods: {
			InputFocus(e) {
				this.InputBottom = e.detail.height
			},
			InputBlur(e) {
				this.InputBottom = 0
			},
			handleMore() {
				if (this.loaded && !this.isLoading) {
					this.getData(this.list[0].message_id)
				}
			},
			getData(message_id_start) {
				this.isLoading = true
				// user_id: this.userInfo.id,
				let data = {
					both_id: this.bothId,
					both_type: this.bothType
				}
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
					this.list = [...r.data.reverse(), ...this.list]
					this.goTarget(message_id_start)
				}).finally(_ => {
					this.isLoading = false
				})
			},
			handleSend() {
				if (!this.content) {
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
			}
		},
		components: {
			Item
		}
	}
</script>

<style>
/* page{
  padding-bottom: 100upx;
} */
</style>
