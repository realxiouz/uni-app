<template>
	<picker @change="handleChange" :value="valueAsync" :range="range" :range-key="rangeKey">
		<view class="picker">
			{{customerTitle?customerTitle:title}}
		</view>
	</picker>
</template>

<script>
	export default {
		props: {
			rangeKey: {
				type: String,
				default: 'name'
			},
			range: {
				type: Array,
				default: _ => []
			},
			value: {
				type: [String, Number]
			},
			valueKey: {
				type: String,
				default: 'id'
			},
			placeholder: {
				type: String,
				default: '还未选择'
			},
			customerTitle: {
				type: String,
			}
		},
		methods: {
			handleChange(e) {
				let inx = e.detail.value
				this.$emit('input', this.range[inx][this.valueKey])
			}
		},
		computed: {
			title() {
				return this.value && this.range.length ? this.range.find(i => i[this.valueKey] == this.value)[this.rangeKey] : this.placeholder
			},
			valueAsync() {
				return this.range.findIndex(i => i[this.valueKey] == this.value)
			}
		}
	}
</script>

<style>
</style>
