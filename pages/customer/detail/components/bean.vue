<template>
	<scroll-view scroll-y style="height: 100%;">
		<view class="cu-list menu">
			<view class="cu-item">
				<view class="content padding-tb-sm flex align-center">
					<view class="flex flex-direction flex-sub" style="align-items: flex-start;">
						<view class="text-gray text-sm">姓名</view>
						<view class="text-black text-bold">{{bean.name}}</view>
					</view>
				</view>
			</view>
			<view class="cu-item">
				<view class="content padding-tb-sm flex align-center">
					<view class="flex flex-direction flex-sub" style="align-items: flex-start;">
						<view class="text-gray text-sm">手机</view>
						<view class="text-black text-bold">{{bean.phone}}</view>
					</view>
					<button
						class="cu-btn bg-cyan small radius shadow margin-right-xs" @click.stop="handleCopy">复制
					</button>
                    <button v-if="!/\*/.test(bean.phone) && bean.phone" class="cu-btn bg-blue small radius shadow margin-right-xs" @click.stop="callPhone" :data-number="bean.phone">呼叫</button>
                    <button
						v-if="bean.phone && bean.phone.indexOf('*') !== -1 && !usingMiddlePhone"
						class="cu-btn bg-blue radius shadow small"
						@click="getPhone"
					>取电</button>
				</view>
			</view>
			<view class="cu-item" v-if="bean.phone_reserve">
				<view class="content padding-tb-sm flex align-center">
					<view class="flex flex-direction flex-sub" style="align-items: flex-start;">
						<view class="text-gray text-sm">备用电话</view>
						<view class="text-black text-bold">{{bean.phone_reserve}}</view>
					</view>
				</view>
			</view>
			<view class="cu-item" v-if="bean.sex_name">
				<view class="content padding-tb-sm flex align-center">
					<view class="flex flex-direction flex-sub" style="align-items: flex-start;">
						<view class="text-gray text-sm">性别</view>
						<view class="text-black text-bold">{{bean.sex_name}}</view>
					</view>
				</view>
			</view>
			<view class="cu-item" v-if="bean.source">
				<view class="content padding-tb-sm flex align-center">
					<view class="flex flex-direction flex-sub" style="align-items: flex-start;">
						<view class="text-gray text-sm">来源</view>
						<view class="text-black text-bold">{{bean.source_attr.name}}</view>
					</view>
				</view>
			</view>
			<view class="cu-item" v-if="bean.weixin">
				<view class="content padding-tb-sm flex align-center">
					<view class="flex flex-direction flex-sub" style="align-items: flex-start;">
						<view class="text-gray text-sm">微信</view>
						<view class="text-black text-bold">{{bean.weixin}}</view>
					</view>
				</view>
			</view>
			<view class="cu-item" v-if="bean.qq">
				<view class="content padding-tb-sm flex align-center">
					<view class="flex flex-direction flex-sub" style="align-items: flex-start;">
						<view class="text-gray text-sm">QQ</view>
						<view class="text-black text-bold">{{bean.qq}}</view>
					</view>
				</view>
			</view>
			<view class="cu-item" v-if="bean.star">
				<view class="content padding-tb-sm flex align-center">
					<view class="flex flex-direction flex-sub" style="align-items: flex-start;">
						<view class="text-gray text-sm">星级</view>
						<view class="text-black text-bold">{{bean.star}}星</view>
					</view>
				</view>
			</view>
			<view class="cu-item" v-if="bean.status_name">
				<view class="content padding-tb-sm flex align-center">
					<view class="flex flex-direction flex-sub" style="align-items: flex-start;">
						<view class="text-gray text-sm">状态</view>
						<view class="text-black text-bold">{{bean.status_name}}</view>
					</view>
				</view>
			</view>
			<view class="cu-item" v-if="bean.belongs_employee">
				<view class="content padding-tb-sm flex align-center">
					<view class="flex flex-direction flex-sub" style="align-items: flex-start;">
						<view class="text-gray text-sm">归属人</view>
						<view class="text-black text-bold">{{bean.belongs_employee.name}}</view>
					</view>
				</view>
			</view>
			<view class="cu-item" v-if="bean.typing_employee">
				<view class="content padding-tb-sm flex align-center">
					<view class="flex flex-direction flex-sub" style="align-items: flex-start;">
						<view class="text-gray text-sm">首录人</view>
						<view class="text-black text-bold">{{bean.typing_employee.name}}</view>
					</view>
				</view>
			</view>
			<view class="cu-item" v-if="bean.typing_employee">
				<view class="content padding-tb-sm flex align-center">
					<view class="flex flex-direction flex-sub" style="align-items: flex-start;">
						<view class="text-gray text-sm">录入时间</view>
						<view class="text-black text-bold">{{bean.created_at|moment('from')}}</view>
					</view>
				</view>
			</view>
			<view class="cu-item" v-if="bean.release_time">
				<view class="content padding-tb-sm flex align-center">
					<view class="flex flex-direction flex-sub" style="align-items: flex-start;">
						<view class="text-gray text-sm">释放时间</view>
						<view class="text-black text-bold">{{bean.release_time|moment('from')}}</view>
					</view>
				</view>
			</view>
			<view class="cu-item" v-if="bean.release_time">
				<view class="content padding-tb-sm flex align-center">
					<view class="flex flex-direction flex-sub" style="align-items: flex-start;">
						<view class="text-gray text-sm">认领时间</view>
						<view class="text-black text-bold">{{bean.release_time|moment('from')}}</view>
					</view>
				</view>
			</view>
			<view class="cu-item" v-if="bean.next_genjin_at">
				<view class="content padding-tb-sm flex align-center">
					<view class="flex flex-direction flex-sub" style="align-items: flex-start;">
						<view class="text-gray text-sm">下次跟进</view>
						<view class="text-black text-bold">{{bean.next_genjin_at|moment('MM-DD HH:mm')}}</view>
					</view>
				</view>
			</view>
			<view class="cu-item" v-if="bean&&!bean.belongsto_id">
				<view class="content padding-tb-sm flex align-center">
					<button class="cu-btn bg-blue radius flex-sub" @click="rl(bean.id)">认领</button>
				</view>
			</view>
			<view class="cu-item" v-if="bean&&bean.belongsto_id">
				<view class="content padding-tb-sm flex align-center">
					<single-picker class="cu-btn bg-blue radius flex-sub" :range="types" range-key="name" v-model="eId" customer-title="转移客户" />
				</view>
			</view>
		</view>
	</scroll-view>
</template>

<script>
	import {mapState, mapActions, mapGetters} from 'vuex'
	import SinglePicker from '@/components/single-picker'
	
	export default {
		mounted() {
			this.getCompany()
			this.$http('contacts').then(r => {
				this.types = [{name: '转移至公池', id: -1}, ...r]
			})
		},
		props: {
			cId: {
				type: [Number, String]
			}
		},
		data() {
			return {
				hasLoaded: false,
				bean: {
                    phone: ''
                },
				types: [],
				eId: ''
			}
		},
		computed: {
			...mapState(['userInfo']),
			...mapGetters("company", ["usingMiddlePhone"]),
		},
		components: {
			SinglePicker
		},
		watch: {
			eId(val) {
				this.$http('customer-belongsto-log', {
					customer_ids: [this.bean.id],
					belongsto_id: val
				}, 'post').then(r => {
					this.eId = ''
					uni.showToast({
						title: r.message,
						icon: 'none'
					})
					setTimeout(_ => {
						this.getData()
					}, 1000)
				})
			}
		},
		methods: {
			...mapActions('company', ['getCompany']),
			getPhone() {
				uni.navigateTo({
					url: `/pages/customer/get-phone/index?cId=${this.bean.id}`
				});
			},
			init() {
				if (!this.hasLoaded) {
					this.getData()
				}
			},
			getData() {
				uni.showLoading({
					title: '加载中...'
				})
				this.$http(`customer/${this.cId}`).then(r => {
					this.bean = r.data
					this.hasLoaded = true
				}).finally(_ => {
					uni.hideLoading()
				})
			},
			rl(id) {
				this.$http('customer-belongsto-log',{
					belongsto_id: this.userInfo.id,
					customer_ids: [id]
				}, 'post').then(r => {
					uni.showToast({
						title: r.message,
						icon: 'none'
					})
					this.getData()
				})
			},
			handleCopy() {
				uni.setClipboardData({
				    data: this.bean.phone,
				    success: _ => {
						uni.showToast({
							title: '电话已复制',
							icon: 'none'
						});
					}
				});
			},
            callPhone(e) {
			    let number = e.currentTarget.dataset.number;
                uni.makePhoneCall({
                    phoneNumber: number
                })
            }
		}
	}
</script>

<style>
</style>
