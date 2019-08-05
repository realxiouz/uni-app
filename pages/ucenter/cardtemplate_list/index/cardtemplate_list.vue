<template>
	<view class="padding-25">
		<view class="pubpdtop pd-left-right">
			<card-template :is-show-list="true"></card-template>
		</view>
	</view>
</template>

<script>
	import cardTemplate from '../../../../components/cardtemplate/cardtemplate.vue';
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

<style>
	.cardtemplate .tm_2 .user-img {
		left: 190upx !important;
	}
	.cardtemplate .tm_2 .cardcontent {
		padding-right: 80upx !important;
	}
</style>
