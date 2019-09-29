<template>
	<view>
		<view class="text-cut" @tap="show=true">
			<view v-if="!img">手写签名</view>
			<image v-else :src="img" style="width:48px;height:36px" />
		</view>
		<view class="mp-mask" :class="{show}" @tap="show=false"></view>
		<view class="mp-wrap" :class="{show}">
			<view class="mp-bar">
				<view @tap="handleCancel">重写</view>
				<view></view>
				<view @tap="handleComfirm">确定</view>
			</view>
			<view class="bg-white">
				<canvas
					class="canvas-sign"
					canvas-id="canvas-sign"
					@touchmove='move'
					@touchstart='start'
					@touchend='end'
					disable-scroll='true'
				/>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		QINIU,
		QINIU_PUBLIC
	} from '@/utils/const'
	import moment from 'moment'
	import {mapState} from 'vuex'
	
	let width = 375
	uni.getSystemInfo({
		success: e => {
			width = e.screenWidth
		}
	});
	
	export default {
		mounted() {
			this.touchs = []
			this.content = uni.createCanvasContext('canvas-sign', this)
			this.content.fillStyle = "#fff";   
			this.content.fillRect(0, 0, width, uni.upx2px(400))
			this.content.setLineWidth(5)
			this.content.setLineCap('round')
			this.content.setLineJoin('round')
			this.$http('image/token?public=true').then(r => {
				this.token = r.token
			})
		},
		data() {
			return {
				show: false,
				rangeAsync: [],
				token: '',
				img: '',
				signed: false
			}
		},
		methods: {
			handleCancel() {
				this.touchs = []
				this.content.clearRect(0, 0, width, uni.upx2px(400))
				this.content.fillStyle = "#fff"
				this.content.fillRect(0, 0, width, uni.upx2px(400))
				this.content.setLineWidth(5)
				this.content.setLineCap('round')
				this.content.setLineJoin('round')
				this.content.draw(true)
				this.signed = false
			},
			handleComfirm() {
				if (!this.signed) {
					uni.showToast({
						title: '还未书写签名',
						icon: 'none'
					})
					return
				}
				let r100 = Math.floor(Math.random() * 100)
				let key = `${this.userInfo.company_id}/company/${moment().format("YYYYMM")}/${new Date().getTime()}${r100}.jpg`
				uni.canvasToTempFilePath({
					canvasId: 'canvas-sign',
					success: res => {
						uni.uploadFile({
							url: QINIU,
							name: 'file',
							filePath: res.tempFilePath,
							header: {
								'content-type': 'multipart/form-data'
							},
							formData: {
								token: this.token,
								key
							},
							success: res => {
								if (res.statusCode === 200) {
									let data = JSON.parse(res.data)
									this.img = `${QINIU_PUBLIC}${data.key}`
									this.handleCancel()
									this.show = false
									this.signed = false
									this.$emit('signed', this.img)
								}
							},
							fail: e => {
								console.log(e);
							}
						})
					},
					fail: e => {
						console.log(e)
					}
				}, this)
			},
			draw() {
				let point1 = this.touchs[0]
				let point2 = this.touchs[1]
				this.touchs.shift()
				this.content.moveTo(point1.x, point1.y)
				this.content.lineTo(point2.x, point2.y)
				this.content.stroke()
				this.content.draw(true)
			},
			move(e) {
				let point = {
					x: e.touches[0].x,
					y: e.touches[0].y
				}
				this.touchs.push(point)
				if (this.touchs.length >= 2) {
					this.draw()
				}
			},
			start(e) {
				let point = {
					x: e.touches[0].x,
					y: e.touches[0].y,
				}
				this.touchs.push(point);
			},
			end() {
				this.touchs = []
				this.signed = true
			},
		},
		computed: {
			...mapState(['userInfo']),
			title() {
				return '签名'
			}
		}
	}
</script>

<style lang="scss" scoped>
	.mp-mask{
		position: fixed;
		top: 0upx;
		left: 0upx;
		right: 0upx;
		bottom: 0upx;
		z-index: 9998;
		background-color: rgba(0, 0, 0, 0.6);
		opacity: 0;
		transition: all 0.3s ease;
		visibility: hidden;
		&.show{
			visibility: visible;
			opacity: 1;
		}
	}
	
	.mp-wrap{
		position: fixed;
		left: 0upx;
		right: 0upx;
		bottom: 0upx;
		z-index: 9999;
		transition: all 0.3s ease;
		transform: translateY(100%);
		&.show{
			transform: translateY(0);
		}
		.mp-bar{
			background-color: #fff;
			height: 72upx;
			padding-left: 20upx;
			padding-right: 20upx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			box-sizing: border-box;
			border-bottom-width: 1upx !important;
			border-bottom-style: solid;
			border-bottom-color: #f5f5f5;
			font-size: 32upx;
			color: #757575;
			line-height: 1;
		}
		.canvas-sign{
			width: 100%;
			height: 400rpx;
		}
	}
</style>
