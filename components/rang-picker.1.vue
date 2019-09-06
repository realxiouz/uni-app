<template>
	<picker mode="multiSelector" :value="value" :range="range" range-key="text" @columnchange="handleColumnChange" @change="handleChange">
		<view class="picker">
			{{ value.length == 2 ?  `${range[0][value[0]].text}-${range[1][value[1]].text}` : '还未选择'}}
		</view>
	</picker>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array
			},
			unit: {
				type: String,
				default: '元'
			},
			v: {
				type: Array
			}
		},
		data() {
			return {
				firstColumnInx: 0,
				value: []
			}
		},
		methods: {
			handleColumnChange(e) {
				let {column, value} = e.detail
				if (column === 0) {
					this.firstColumnInx = value
				}
			},
			handleChange(e) {
				this.value = e.detail.value
				this.$emit('change', [this.range[0][this.value[0]].value, this.range[1][this.value[1]].value])
			}
		},
		computed: {
			range() {
				let temp = this.list.map(i => ({
					text: `${i}${this.unit}`,
					value: i
				}))
				return [
					temp.slice(0, temp.length-1),
					temp.slice(this.firstColumnInx)
				]
			}
		},
		watch: {
			v(val) {
				this.value = [
					this.range[0].findIndex(i => i.value == val[0]),
					this.range[1].findIndex(i => i.value == val[1])
				]
				this.firstColumnInx = this.range[0].findIndex(i => i.value == val[0])
			}
		}
	}
</script>

<style>
</style>
