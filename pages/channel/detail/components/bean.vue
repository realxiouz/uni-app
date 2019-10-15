<template>
	<view class="bg-white margin-top-sm">
			<view class="padding-tb-xs padding-lr-sm">
				<view class="flex flex-wrap margin-bottom-xs">
					<text><text class="text-gray">
						渠道名称:&nbsp;</text>{{bean.name}}
					</text>
				</view>
				<view class="flex flex-wrap margin-bottom-xs">
					<text><text class="text-gray">
						法人代表:&nbsp;</text>{{bean.user_id&&bean.user.name}}
					</text>
				</view>
				<view class="flex flex-wrap margin-bottom-xs">
					<text><text class="text-gray">
						信用代码:&nbsp;</text>{{bean.code}}
					</text>
				</view>
				<view class="flex flex-wrap margin-bottom-xs">
					<text><text class="text-gray">
						公司地址:&nbsp;</text>{{bean.address}}
					</text>
				</view>
				<view class="flex flex-wrap margin-bottom-xs">
					<text><text class="text-gray">
						联系人:&nbsp;</text>{{bean.linkmen&&bean.linkmen.name}}
					</text>
				</view>
				<view class="flex flex-wrap margin-bottom-xs">
					<text><text class="text-gray">
						渠道负责人:&nbsp;</text>{{bean.user && bean.user.name}}
					</text>
				</view>
				<view class="flex flex-wrap margin-bottom-xs">
					<text><text class="text-gray">
						公池释放时间:&nbsp;</text>{{bean.release_at}}
					</text>
				</view>
				<view class="">
					<button class="cu-btn bg-blue radius small margin-right-xs" @click="handleEdit(bean.id)">编辑</button>
					<!-- <button class="cu-btn bg-cyan radius small margin-right-xs" v-if="!bean.main" @click="handleDefault(bean.id)">签约</button>
					<button class="cu-btn bg-red radius small margin-right-xs" @click="handleDel(bean.id)">删除</button>
					<button class="cu-btn bg-red radius small margin-right-xs" @click="handlePool(bean.id)">放入公池</button> -->
				</view>
			</view>
	</view>
</template>

<script>
	import {mapState, mapActions, mapGetters} from 'vuex'
	export default {
		props: {
			cId: {
				type: [Number, String]
			}
		},
		data() {
			return {
				hasLoaded: false,
				bean: {}
			}
		},
		computed: {
			...mapState(['userInfo']),
			...mapGetters("company", ["usingMiddlePhone"]),
		},
		methods: {
			init() {
				if (!this.hasLoaded) {
					this.getData()
				}
			},
			getData() {
				uni.showLoading({
					title: '加载中...'
				})
				this.$http(`channel/${this.cId}`).then(r => {
					this.bean = r.data
					this.hasLoaded = true
				}).finally(_ => {
					uni.hideLoading()
				})
			},
			handleDel(id) {
				this.$http(`channel/${id}`, null, 'delete').then(r => {
					uni.navigateBack()
				})
			},
			handlePool(id) {
				this.$http(`channel/${id}`, null, 'put').then(r => {
					uni.showToast({
						title: r.message,
						icon: 'none'
					})
				})
			},
			handleEdit(id) {
				uni.navigateTo({
					url: `/pages/channel/bean/index?id=${id}`
				})
			}
		}
	}
</script>

<style>
</style>
