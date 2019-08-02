<template>
	<view>
		流程图正在制作当中, 谢谢您的使用
		<make-btn :onEvent="onMyEvent"></make-btn>
	</view>
</template>

<script>
	import makeBtn from "../../../../components/makebtn/index/makebtn";
	export default {
		data() {
			return {
				onMyEvent: {
					url: '../../businesscard/index/businesscard',
					title: '返回首页',
                    isRedirect: true
				}
			}
		},
		components: {
			makeBtn
		}
	}
</script>

<style>

</style>
