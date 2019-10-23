<template>
	<view>
		<view class="mp-mask" :class="{show}" @tap="close"></view>
		<view class="mp-wrap" :class="{show}">
			<view class="bg-white text-left padding flex flex-wrap" style="width:100%;height:100%">
				
			</view>
		</view>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				rangeAsync: [],
			}
		},
		props: {
			value: {
				type: Boolean
			}
		},
		methods: {
			// handleCancel() {
			// 	this.show = false
			// 	this.$emit('cancel')
			// },
			close() {
				this.$emit('input', false)
			}
			
		},
		computed: {
			
		},
		watch: {
			value(val) {
				this.show = val
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
		width: 500upx;
		right: 0upx;
		top: 0upx;
		bottom: 0upx;
		z-index: 9999;
		transition: all 0.3s ease;
		transform: translateX(100%);
		&.show{
			transform: translateX(0);
		}
	}
</style>
