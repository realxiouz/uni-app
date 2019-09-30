<template>
	<view>
		<view @tap="show=true">
			<slot></slot>
		</view>
		<view class="mp-mask" :class="{show}" @tap="show=false"></view>
		<view class="mp-wrap" :class="{show}">
			<view class="mp-bar">
				<view @tap="handleCancel">取消</view>
				<view></view>
				<view @tap="handleComfirm">确定</view>
			</view>
			<slot name="content"></slot>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
			}
		},
		props: {
			comfirmCallback: {
				type: Function
			},
			cancelCallback: {
				type: Function
			}
		},
		methods: {
			handleComfirm() {
				this.comfirmCallback()
			},
			handleCancel() {
				if(!this.cancelCallback) {
					this.show = false
				} else {
					this.cancelCallback()
				}
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
