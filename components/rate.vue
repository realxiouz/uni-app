<template>
	<view class="flex">
		<view :class="small?'text-xl':'text-xxl'" v-for="n in max" :key="n" :style="{marginLeft:margin+'px'}" @click="onClick(n)">
			<text class="text-yellow" :class="n<=valueSync?'cuIcon-favorfill':'cuIcon-favor'"></text>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			value: {
				type: Number,
				default: 1
			},
			max: {
				type: Number,
				default: 5
			},
			margin: {
				type: Number,
				default: 0
			},
			disabled: {
				type: Boolean,
				default: false
			},
			small: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			valueSync() {
				return this.value
			}
		},
		methods: {
			onClick(n) {
				if (this.disabled) {
					return
				}
				this.$emit('input', n)
			}
		}
	}
</script>
