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
		<swiper style="flex: 1;height: 0;" @change="tabChange" :current="selTab">
			<swiper-item v-for="(i, inx) in tabs" :key="inx">
				<data-list :ref="'list'+inx" @data="handleList(inx, $event)" :r-url="i.url" :r-data="i.data">
					<item v-for="(item, index) in i.list" :key="`${inx}${index}`" :bean="item" />
				</data-list>
			</swiper-item>
		</swiper>
		<!-- <float-button @go="handleGo" b="25px"/> -->
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
			this.tabs = this.tabs.map(i => {
				i.data.type = this.type
				return i
			})
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
							private: true,
							is_share: 'all',
							demands: JSON.stringify({type: '全部'})
						}
					},
					{
						text: '我共享的',
						url: 'customer',
						list: [],
						data: {
							type: '新房',
							private: true,
							is_share: 'send',
							demands: JSON.stringify({type: '全部'})
						}
					},
					{
						text: '共享给我的',
						url: 'customer',
						list: [],
						data: {
							type: '新房',
							private: true,
							is_share: 'receive',
							demands: JSON.stringify({type: '全部'})
						}
					}
				],
				selTab: 0
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
				this.keywords = ''
				this.selTab = inx
			},
			tabChange(e) {
				this.keywords = ''
				this.selTab = e.detail.current
				this.$refs[`list${this.selTab}`][0].init()
			},
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
						this.tabs[this.selTab].data = {...this.tabs[this.selTab].data, keywords: ''}
					}
				}
			}
		}
	}
</script>
