<template>
	<view>
		<view class="makecard" @tap="topMakeCard" :data-num="currentnum" :style="{left:left + 'px;',top:top +'px;'}">
			<image :src="onEvent.imgSrc" mode="bottom right" class="bg-img"></image>
			<text>
				{{onEvent.title}}
			</text>
		</view>
	</view>
</template>

<script>
	import {GLOBALDATA} from "../../../utils/const";

	export default {
		data() {
			return {
				left: '',
				right: '',
				newClass: ''
			}
		},
		props: {
			onEvent: {
				type: Object,
				default: function() {
					return {}
				}
			}
		},
		mounted() {
			// console.log(this.onEvent);
		},
		methods: {
			topMakeCard(e) {
				const {isRedirect, url} = this.onEvent;
				// 判断是否要回到首页
				uni[isRedirect? 'reLaunch': 'navigateTo']({
					url: url
				})
				GLOBALDATA.templatecurrnum = e.currentTarget.dataset;
			},
			viewTouchMove(e) {
				this.left = e.touches[0].clientX - 60;
				this.right = e.touches[0].clientY - 60;
				this.newClass = 'sotpscol';

			}
		}
	}
</script>

<style lang="scss">
	@import 'makebtn';
</style>
