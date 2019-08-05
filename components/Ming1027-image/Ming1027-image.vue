<template>
	<view class="container" v-bind:style="{height:height1 + 'px'}">
		<top v-bind:navigator="navigator"></top>
		<swiper class="swiperBox" @change="swiperChange" :current="indexs">
			<swiper-item class="swiperBox-item" v-for="(item,index) in list" :key="item" @click="preImg(index)">
				<image :src="item" mode="widthFix"></image>
			</swiper-item>
		</swiper>
		<scroll-view class="scrollBoxs" scroll-x="true" :scroll-left="scrollLeft">
			<block v-for="(itm,i) in list" :key="i">
				<view class="scrollBox" :class="{'active': indexs == i }" @tap="scroll(i)"><image :src="itm" mode="scaleToFill"></image></view>
			</block>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				navigator: {
					title: '',
				},
				height1: 0,
				list: [],
				imgLength:0,
				index: 0,
				indexs: 0,
				imgShow: false,
				scrollLeft: 0
			}
		},
		onLoad(e) {
			this.height1 = this.$common.getUserPhoneInfo().screenHeight
			console.log(e.index)
			let data = JSON.parse(decodeURIComponent(e.data))
			this.list = data.imgs
			this.imgLength = data.imgs.length
			this.navigator.title = (++e.index) + '/' + this.imgLength
			this.index = e.index
			this.indexs = e.index - 1
		},
		methods: {
			swiperChange(e) {
				this.index = e.detail.current
				this.navigator.title =  this.index + 1 + '/' + this.imgLength
				this.indexs = e.detail.current
				this.scrollLeft = e.detail.current * 80
			},
			preImg(index) {
				if (this.imgShow) { //防止点击过快导致重复调用 
					return;
				}
				this.imgShow = true;
				setTimeout(() => {
					this.imgShow = false;
				}, 1000)
				setTimeout(() => {
					uni.previewImage({
						current: this.list[index],
						urls: this.list
					})
				}, 150)
			},
			scroll(e) {
				this.indexs = e
				this.index = e - 1
				this.scrollLeft = e * 80
			}
		}
	}
</script>

<style scoped>
	.swiperBox {
		display: flex;
		flex-direction: column;
		flex: 1;
		height: 75%;
		background-color: #222;
		padding-top: 130upx;
	}
	.swiperBox-item {
		display: flex;
		align-items: center;
	}
	.scrollBoxs {
		display: flex;
		white-space: nowrap;
		width: 100%;
		height: 205upx;
		background-color: #222;
		padding: 0 20upx;
	}
	.scrollBox {
		display: inline-block;
		white-space: nowrap;
		width: 200upx;
		height: 192upx;
		margin-right: 10upx;
	}
	.scrollBox image {
		width: 181upx;
		height: 171upx;
	}
	.active {
		border: 10rpx solid #CCCCCC;
		margin-right: 30upx;
	}
</style>
