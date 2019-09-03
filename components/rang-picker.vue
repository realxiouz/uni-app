<template>
	<picker mode="multiSelector" :value="value" :range="range" range-key="text" @columnchange="handleColumnChange" @change="handleChange">
		<view class="picker">
			<!-- {{`${value[0]}-${value[1]}${unit}`}} -->
			{{range[0][value[0]].text}}-{{range[1][value[1]].text}}
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
				value: [0,1]
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
			}
		},
		computed: {
			range() {
				let temp = this.list.map(i => ({
					text: `${i}${this.unit}`,
					value: i
				}))
				
				console.log([
					temp,
					temp.slice(this.firstColumnInx)
				])
				
				return [
					temp,
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
				console.log(this.value)
			}
		}
	}
</script>

<style>
</style>
