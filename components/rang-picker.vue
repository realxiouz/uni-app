<template>
	<picker mode="multiSelector" :value="valueSync" :range="range" range-key="text" @change="handleChange">
		<view class="picker">
			{{ valueSync.length == 2 ?  `${range[0][valueSync[0]].text}-${range[1][valueSync[1]].text}` : '还未选择'}}
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
			value: {
				type: Array
			}
		},
		data() {
			return {
				valueSync: []
			}
		},
		methods: {
			handleChange(e) {
				let val = e.detail.value
				this.$emit('input', [this.range[0][val[0]].value, this.range[1][val[1]].value])
			}
		},
		computed: {
			range() {
				let temp = this.list.map(i => ({
					text: `${i}${this.unit}`,
					value: i
				}))
				return [
					temp,
					temp
				]
			}
		},
		watch: {
			value(val) {
				if (val.length == 2) {
					this.valueSync = [
						this.range[0].findIndex(i => i.value == val[0]),
						this.range[1].findIndex(i => i.value == val[1])
					]
				}
				
			}
		}
	}
</script>

<style>
</style>
