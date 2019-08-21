<template>
	<scroll-view scroll-y @scrolltolower="handleMore" style="height:100%;" :lower-threshold="50">
		<slot></slot>
		<slot name="loading" v-if="isLoading">
			<view class="cu-load loading"></view>
		</slot>
		<slot name="noData" v-if="hasLoaded && !list.length">
			<view style="height:100%;padding-bottom:100upx" class="flex justify-around align-center">
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
</template>

<script>
	export default {
		data: _ => ({
			hasLoaded: false,
			isLoading: false,
			isEnd: false,
			
			page: 1,
			per_page: 10,
			list: []
		}),
		props: {
			rUrl: String,
			rData: Object,
			rMethod: {
				type: String,
				default: 'get'
			}
		},
		methods: {
			getData(resetPage = false) {
				this.isLoading = true
				if (resetPage) {
					this.page = 1
				}
				let data = Object.assign({}, this.rData, {
					page: this.page,
					per_page: this.per_page
				})
				this.$http(this.rUrl, data, this.rMethod)
					.then(r => {
						this.hasLoaded = true
						if (this.page === 1) {
							this.list = []
							this.isEnd = false
						}
						this.list = this.list.concat(r.data)
						this.$emit('data', this.list)
						
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

<style>
</style>
