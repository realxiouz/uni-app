<template>
	<view class="padding-25">
		<view class="pubpdtop pd-left-right">
			<card-template :templateIndex="templateStyle"></card-template>
		</view>
	</view>
</template>

<script>
	import cardTemplate from '../../../../components/cardtemplate/cardtemplate.vue';

	export default {
		data() {
			return {
				templateStyle: true
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

</style>
