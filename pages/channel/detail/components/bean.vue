<template>
	<view class="bg-white margin-top-sm">
			<view class="padding-tb-xs padding-lr-sm">
				<view class="flex flex-wrap margin-bottom-xs">
					<text><text class="text-gray">
						渠道名称:&nbsp;</text>{{bean.name||''}}
					</text>
				</view>
				<view class="flex flex-wrap margin-bottom-xs">
					<text><text class="text-gray">
						法人代表:&nbsp;</text>{{(bean.company_b&&bean.company_b.legal_person_name)||''}}
					</text>
				</view>
				<view class="flex flex-wrap margin-bottom-xs">
					<text><text class="text-gray">
						信用代码:&nbsp;</text>{{bean.code||''}}
					</text>
				</view>
				<view class="flex flex-wrap margin-bottom-xs">
					<text>
						<text class="text-gray">
							公司地址:&nbsp;
						</text>
						{{bean.city&&bean.city.province ? `${bean.city.name}-${bean.city.province.name}-${bean.address||''}` : `${bean.address||''}`}}
					</text>
				</view>
				<view class="flex flex-wrap margin-bottom-xs">
					<text><text class="text-gray">
						联系人:&nbsp;</text>{{(bean.linkman&&bean.linkman.name)||''}}
					</text>
				</view>
				<view class="flex flex-wrap margin-bottom-xs">
					<text><text class="text-gray">
						渠道负责人:&nbsp;</text>{{(bean.user && bean.user.name)||''}}
					</text>
				</view>
				<view class="flex flex-wrap margin-bottom-xs">
					<text><text class="text-gray">
						公池释放时间:&nbsp;</text>{{bean.release_at||''}}
					</text>
				</view>
				<view class="">
					<button class="cu-btn bg-blue radius small margin-right-xs" @click="handleEdit(bean.id)">编辑</button>
					<button class="cu-btn bg-blue radius small margin-right-xs" v-if="!bean.user_id" @click="changeUser(bean.id)">认领</button>
					<template v-if="bean.status.key == '未签约'">
						<button class="cu-btn bg-blue radius small margin-right-xs" @click="sign">签约</button>
						<button class="cu-btn bg-red radius small margin-right-xs" @click="handleDel(bean.id)">删除</button>
					</template>
					<template v-if="bean.status.key == '合作中'">
						<picker
							class="cu-btn bg-blue radius small margin-right-xs"
							mode="date" start="2015-09-01" @change="dateChange">
						    <view class="picker">续约</view>
						</picker>
						<button class="cu-btn bg-red radius small margin-right-xs" @click="cancel(bean.company_b_id)">解约</button>
					</template>
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
				uni.showModal({
				    title: '请注意',
				    content: '确定删除此渠道么?',
				    success: res => {
				        if (res.confirm) {
				            this.$http(`channel/${id}`, null, 'delete').then(r => {
				            	uni.navigateBack()
				            })
				        }
				    }
				});
				
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
			},
			changeUser(id) {
				this.$http(`channel/change-user/${id}`, {
					user_id: this.userInfo.id
				}, 'post').then(r => {
					this.getData()
					uni.showToast({
						title: r.message,
						icon: 'none'
					})
				})
			},
			cancel(company_id) {
				uni.showModal({
				    title: '请注意',
				    content: '确定于此渠道解约么?',
				    success: res => {
				        if (res.confirm) {
				            this.$http(`cooperation_log/cooperation_cancel`, {
				            	company_id,
				            	cooperation_type: "channel"
				            }, 'post').then(r => {
				            	this.getData()
				            	uni.showToast({
				            		title: r.message,
				            		icon: 'none'
				            	})
				            })
				        }
				    }
				})
			},
			dateChange(e) {
				this.$http(`cooperation_log/renewal`, {
					company_id: this.bean.company_b_id,
					cooperation_type: "channel",
					period: e.detail.value
				}, 'post').then(r => {
					this.getData()
					uni.showToast({
						title: r.message,
						icon: 'none'
					})
				})
			},
			sign() {
				uni.navigateTo({
					url: `/pages/channel/sign/index?cId=${this.cId}`
				})
			}
		}
	}
</script>

<style>
</style>
