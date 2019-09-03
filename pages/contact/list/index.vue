<template>
	<view>
		<view class="cu-bar bg-cyan search fixed" :style="{top: isH5?'44px':'0px'}">
			<view class="search-form radius">
				<text class="cuIcon-search"></text>
				<input v-model="keywords" :adjust-position="false" type="text" placeholder="搜索姓名 电话" confirm-type="search" @confirm="handleSearch"></input>
			</view>
		</view>
		<view class="for-select" :style="{top: isH5?44+uni.upx2px(100)+'px':uni.upx2px(100)+'px'}">
			<data-list :r-url="rUrl" ref="list" @data="handleList" :r-data="rData">
				<navigator 
					class="bg-white padding-sm solid-bottom"
					v-for="(i, inx) in list"
					:key="inx"
					:url="`/pages/contact/detail/index?id=${i.id}`"
				>
					<view class="flex align-center">
						<ava :name="i.name" :url="i.avatar" class="margin-right-sm"/>
						<view class="text-black text-bold margin-right-sm">{{i.name}}</view>
						<view class="cu-tag bg-blue radius small">{{i.role_name}}</view>
						<view class="flex-sub"></view>
						<view class="text-xxl text-cyan margin-right-sm" @click.stop="handleMessage(i)">
							<text class="cuIcon cuIcon-message"></text>
						</view>
						<view class="text-xxl text-blue" @click.stop="handlePhone(i.mobile)" v-if="i.mobile">
							<text class="cuIcon cuIcon-phone"></text>
						</view>
					</view>
				</navigator>
			</data-list>
		</view>
	</view>
</template>

<script>
	import DataList from '@/components/data-list'
	import Ava from '@/components/avatar'
	import { mapState, mapMutations } from 'vuex'
	
	export default {
		onLoad(opt) {
			this.type = opt.type
			if (this.type == 2) {
				this.rUrl ='common/contact'
				this.rData = {
					scene: 'outside' 
				}
				uni.setNavigationBarTitle({
					title: '外部联系人'
				})
			}
			this.$nextTick(_ => {
				this.$refs.list.init()
			})
		},
		components: {
			DataList, Ava
		},
		data() {
			return {
				list: [],
				keywords: '',
				uni,
				type: 1,
				rUrl: 'contacts',
				rData: {
					descending: 'asc'
				}
			}
		},
		computed: {
			...mapState('baobei', ['selProject']),
			...mapState(['isH5', 'userInfo']),
		},
		methods: {
			...mapMutations('baobei', ['setSelProject']),
			handleList(list) {
				this.list = this.type == 1? list.filter(i => i.id != this.userInfo.id) : list.map(i => i.lianxi)
			},
			handleSearch() {
				this.rData = this.type == 1 ? {
					keywords: this.keywords,
					descending: 'asc'
				} : {
					scene: 'outside',
					keywords: this.keywords,
				}
			},
			handlePhone(phoneNumber) {
				uni.makePhoneCall({
					phoneNumber
				})
			},
			handleMessage(i) {
				uni.navigateTo({
					url: `/pages/message/chat/index?id=${i.id}&type=App\\User`
				})
			}
		},
		watch: {
			keywords(val) {
				if (!val) {
					this.rData = this.type == 1 ? {
						descending: 'asc'
					} : {
						scene: 'outside',
					}
				}
			}
		}
	}
</script>

<style lang="scss">
	.for-select{
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
	}
</style>

