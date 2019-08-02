<template>
	<scroll-view scroll-y @scrolltolower="handleMore" style="height:100%;" :lower-threshold="0">
		<slot></slot>
		<slot name="loading" v-if="isLoading">
			<view class="cu-load load-cuIcon loading"></view>
		</slot>
		<slot name="noData" v-if="hasLoaded && !list.length">
			列表数据空
		</slot>
		<slot name="isEnd" v-if="isEnd && !isLoading && list.length">
			数据全部加载完毕
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
			getData() {
				this.isLoading = true
				let data = Object.assign({}, this.rData, {
					page: this.page,
					per_page: this.per_page
				})
				this.$http(this.rUrl, data, this.rMethod)
					.then(r => {
						this.hasLoaded = true
						if (this.page === 1) {
							this.list = []
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
		}
	}
</script>

<style>
</style>
