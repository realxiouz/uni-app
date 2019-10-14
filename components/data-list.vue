<template>
	<view
		style="height:100%;position: relative;"
		@touchstart="tStart"
		@touchmove="tMove"
		@touchend="tEnd"
	>
		<scroll-view scroll-y
			@scrolltolower="handleMore" style="height:100%;" :lower-threshold="50" :scroll-top="scrollTop"
		>	
			<!-- <view class="refresh-wrap" :style="{top: delta-50+'px'}">
				<view v-if="rStatus===1">下拉刷新</view>
				<view v-if="rStatus===2">松开刷新</view>
				<view v-if="rStatus===3">刷新中</view>
				<view v-if="rStatus===4">数据已刷新</view>
			</view> -->
			<slot></slot>
			<slot name="loading" v-if="isLoading">
				<view class="cu-load loading"></view>
			</slot>
			<slot name="noData" v-if="hasLoaded && !list.length">
				<view :style="{paddingTop:noDataTop}" class="flex justify-around align-center">
					<view>
						<view class="text-xsl">
							<text class="cuIcon-attentionforbidfill text-gray"></text>
						</view>
						<text class="text-gray">暂无数据</text>
					</view>
				</view>
			</slot>
			<slot name="isEnd" v-if="isEnd && !isLoading && list.length">
				<view class="cu-load over"></view>
			</slot>
		</scroll-view>
	</view>
	
</template>

<script>
	export default {
		data: _ => ({
			hasLoaded: false,
			isLoading: false,
			isEnd: false,
			
			page: 1,
			per_page: 10,
			list: [],
			scrollTop: 0,
			start: 0,
			delta: 0,
			rStatus: 0, // 0->未下拉;1->下拉刷新;2->松开刷新;3->刷新中;4->刷新完毕 
		}),
		props: {
			rUrl: String,
			rData: Object,
			rMethod: {
				type: String,
				default: 'get'
			},
			noDataTop: {
				type: String,
				default: '300rpx'
			}
		},
		methods: {
			getData(resetPage = false) {
				this.isLoading = true;
				if (resetPage) {
					this.page = 1
				}
				let data = Object.assign({}, this.rData, {
					page: this.page,
					per_page: this.per_page
				});
				this.$http(this.rUrl, data, this.rMethod)
					.then(r => {
						this.hasLoaded = true;
						if (this.page === 1) {
							this.list = [];
							this.isEnd = false
						}
						this.list = r.push ? this.list.concat(r) : this.list.concat(r.data);
						this.$emit('data', this.list);
						
						if (r.data.length < this.per_page) {
							this.isEnd = true
						}
					})
					.catch(e => {})
					.finally(_ => {
						this.isLoading = false
					})
			},
			handleMore() {
                if (!this.isEnd && !this.isLoading) {
					this.page++
					this.getData()
				}
			},
			init() {
				if (!this.hasLoaded) {
					this.getData()
				}
			},
			handleScroll(e) {
				console.log(e.detail);
			},
			tStart(e) {
				this.start = e.touches[0].pageY
			},
			tMove(e) {
				let move = e.touches[0].pageY
				let _d = move - this.start
				if (_d >= 0) {
					this.delta = _d >= 150 ? 150 : _d
					if (this.delta > 100) {
						this.rStatus = 2
					} else {
						this.rStatus = 1
					}
				}
			},
			tEnd(e) {
				switch (this.rStatus){
					case 0:
						break;
					case 1:
						this.delta = 0
						this.rStatus = 0
						break;
					case 2:
						// this.getData(true)
						break;
				}
			}
		},
		watch: {
			rData: {
				handler() {
					if (this.hasLoaded) {
						this.getData(true)
					}
				}
			}
		}
	}
</script>

<style lang="scss">
	.refresh-wrap{
		position: absolute;
		height: 50px;
		z-index: 1;
	}
</style>
