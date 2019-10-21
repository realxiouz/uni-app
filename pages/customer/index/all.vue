<template>
	<view :style="{height: isH5 ? 'calc(100vh - 44px)' : '100vh'}" class="flex flex-direction">
		<view class="bg-white nav">
			<view class="cu-item" :class="inx==selTab?'text-blue cur':''" v-for="(i,inx) in tabs" :key="inx" @click="handleNavChange(inx)">
				{{i.text}}
			</view>
		</view>
		<view class="cu-bar bg-cyan search">
			<view class="search-form radius">
				<text class="cuIcon-search"></text>
				<input v-model="keywords" :adjust-position="false" type="text" placeholder="姓名 电话搜索" confirm-type="search" @confirm="handleSearch"></input>
			</view>
		</view>
		<view class="flex justify-around bg-white padding-tb-sm">
			<view @click="handleSort('star')">
				客户星级
				<text v-if="sortType=='star'" :class="descending == 'asc' ? 'cuIcon-triangleupfill' : 'cuIcon-triangledownfill'"></text>
			</view>
			<view @click="handleSort('owned_at')">
				添加时间
				<text v-if="sortType=='owned_at'" :class="descending == 'asc' ? 'cuIcon-triangleupfill' : 'cuIcon-triangledownfill'"></text>
			</view>
			<view @click="handleSort('last_genjin_time')">
				跟进时间
				<text v-if="sortType=='last_genjin_time'" :class="descending == 'asc' ? 'cuIcon-triangleupfill' : 'cuIcon-triangledownfill'"></text>
			</view>
		</view>
		<swiper style="flex: 1;height: 0;" @change="tabChange" :current="selTab">
			<swiper-item v-for="(i, inx) in tabs" :key="inx">
				<data-list :ref="'list'+inx" @data="handleList(inx, $event)" :r-url="i.url" :r-data="i.data">
					<item v-for="(item, index) in i.list" :key="`${inx}${index}`" :bean="item" />
				</data-list>
			</swiper-item>
		</swiper>
		<float-button @go="handleGo" b="25px"/>
	</view>
</template>

<script>
	import Item from './components/item'
	import DataList from '@/components/data-list'
	import FloatButton from '@/components/float-button'
	import { mapState, mapMutations } from 'vuex'
	
	export default {
		onLoad(opt) {
			this.$nextTick(_ => {
				this.$refs.list0[0].getData()
			})
			this.type = opt.type
			this.tabs = this.tabs.filter(i => i.data.type == this.type)
		},
		data() {
			return {
				keywords: '',
				type: '',
				tabs: [
					{
						text: '全部',
						url: 'customer',
						list: [],
						data: {
							type: '新房',
							demands: JSON.stringify({type: '全部'}),
                            descending: 'asc',
                            private: true
						}
					},
					{
						text: '有意向',
						url: 'customer',
						list: [],
						data: {
							type: '新房',
							customer_type: '有意向',
							demands: JSON.stringify({type: '全部'}),
                            descending: 'asc',
                            private: true
						}
					},
					{
						text: '已看房',
						url: 'customer',
						list: [],
						data: {
							type: '新房',
							customer_type: '已看房',
							demands: JSON.stringify({type: '全部'}),
                            descending: 'asc',
                            private: true
						}
					},
					{
						text: '已成交',
						url: 'customer',
						list: [],
						data: {
							type: '新房',
							customer_type: '已成交',
							demands: JSON.stringify({type: '全部'}),
                            descending: 'asc',
                            private: true
						}
					},
					{
						text: '已锁定',
						url: 'customer',
						list: [],
						data: {
							type: '新房',
							can_release: false,
							demands: JSON.stringify({type: '全部'}),
                            descending: 'asc',
                            private: true
						}
					},
					{
						text: '全部',
						url: 'customer',
						list: [],
						data: {
							type: '分销',
							demands: JSON.stringify({type: '全部'}),
					        descending: 'asc',
					        private: true
						}
					},
					{
						text: '新房',
						url: 'customer',
						list: [],
						data: {
							type: '分销',
							demands: JSON.stringify({type: '新房'}),
					        descending: 'asc',
					        private: true
						}
					},
					{
						text: '二手房',
						url: 'customer',
						list: [],
						data: {
							type: '分销',
							demands: JSON.stringify({type: '二手房'}),
					        descending: 'asc',
					        private: true
						}
					},
					{
						text: '租房',
						url: 'customer',
						list: [],
						data: {
							type: '分销',
							demands: JSON.stringify({type: '租房'}),
					        descending: 'asc',
					        private: true
						}
					},
				],
				selTab: 0,
				
				sortType: '',
				descending: 'asc'
			}
		},
		methods: {
			...mapMutations('customer', ['setSelEmployee']),
			handleList(inx, l) {
				this.tabs[inx].list = l
			},
			handleGo() {
				uni.navigateTo({
					url: `/pages/customer/bean/index?type=${this.type}`
				})
			},
			handleSearch() {
				this.tabs[this.selTab].data = {...this.tabs[this.selTab].data, keywords: this.keywords}
			},
			handleNavChange(inx) {
				this.reset()
				this.keywords = ''
				this.sortType = ''
				this.selTab = inx
			},
			tabChange(e) {
				this.reset()
				this.keywords = ''
				this.sortType = ''
				this.selTab = e.detail.current
				this.$refs[`list${this.selTab}`][0].init()
			},
			reset() {
				this.tabs[this.selTab].data = {...this.tabs[this.selTab].data, keywords: ''}
			},
			handleSort(sortBy) {
				if (this.sortType != sortBy) {
					this.sortType = sortBy
					this.descending = 'asc'
				} else {
					this.descending = this.descending == 'asc' ? 'desc' : 'asc'
				}
				this.tabs[this.selTab].data = {...this.tabs[this.selTab].data, sortBy, descending: this.descending}
			}
		},
		components: {
			Item, DataList, FloatButton
		},
		computed: {
			...mapState(['isH5', 'userInfo'])
		},
		watch: {
			keywords(val) {
				if (!val) {
					if (this.tabs[this.selTab].data.keywords) {
						this.reset()
					}
				}
			}
		}
	}
</script>
