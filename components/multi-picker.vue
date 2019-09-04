<template>
	<view>
		<view class="text-cut" @tap="show=true">{{title}}</view>
		<view class="mp-mask" :class="{show}" @tap="show=false"></view>
		<view class="mp-wrap" :class="{show}">
			<view class="mp-bar">
				<view @tap="handleCancel">取消</view>
				<view></view>
				<view @tap="handleComfirm">确定</view>
			</view>
			<view class="bg-white text-left padding flex flex-wrap">
				<view
					v-for="(i, inx) in rangeAsync"
					:key="inx"
					class="cu-tag radius margin-bottom-xs"
					:class="{'bg-blue': i.checked}"
					@click="toggle(i, inx)"
				>{{i[rangeKey]}}</view>
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
			range: {
				type: Array,
				default: _ => []
			},
			rangeKey: {
				type: String,
				default: 'name'
			},
			value: {
				type: Array,
				default: _ => []
			},
			valuekey: {
				type: String,
				default: 'id'
			},
			placeholder: {
				type: String,
				default: '还未选择'
			}
		},
		methods: {
			handleCancel() {
				this.show = false
				this.$emit('cancel')
			},
			toggle(i, inx) {
				// this.rangeAsync[inx].checked = !this.rangeAsync[inx].checked
				// i.checked = !i.checked
				let temp = [...this.rangeAsync]
				temp[inx].checked = !temp[inx].checked
				this.rangeAsync = temp
				// console.log(this.rangeAsync);
			},
			handleComfirm() {
				this.show = false
				this.$emit('input', this.rangeAsync.filter(i => i.checked).map(i => i[this.valuekey]))
			},
			asyncRange() {
				if (this.range.length) {
					this.rangeAsync = this.range.map(i => {
						i.checked = false
						return i
					})
					for (let i = 0, lenI = this.rangeAsync.length; i < lenI; ++i) {
						for (let j = 0, lenJ = this.value.length; j < lenJ; ++j) {
							if (this.rangeAsync[i][this.valuekey] == this.value[j]) {
								this.rangeAsync[i].checked = true;
								break
							}
						}
					}
				}
			}
		},
		computed: {
			title() {
				if (this.value.length) {
					let temp = []
					for (let i of this.range) {
						for (let j of this.value) {
							if (i[this.valuekey] == j) {
								temp.push(i[this.rangeKey])
							}
						}
					}
					return temp.join(',')
				} else {
					return this.placeholder
				}
			}
		},
		watch: {
			range: {
				handler(val) {
					if(val.length) {
						this.asyncRange()
					}
				},
				immediate: true
			},
			value: {
				handler(val) {
					if(val.length) {
						this.asyncRange()
					}
				},
				immediate: true
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
	}
</style>
