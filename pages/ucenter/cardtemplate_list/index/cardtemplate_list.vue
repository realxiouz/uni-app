<template>
	<view class="padding-25">
		<view>
			<card-template :is-show-list="true"></card-template>
		</view>
	</view>
</template>

<script>
	import cardTemplate from '@/components/cardtemplate/cardtemplate.vue';
	export default {
		data() {
			return {

			}
		},
		onReady() {
			
		},
		components: {
			cardTemplate
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	.padding-top {
        padding-top: 26rpx;
    }
    .pd-left-right {
        padding: 0 26rpx;
    }
</style>
