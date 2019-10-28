<template>
	<view :style="{height: isH5 ? 'calc(100vh - 44px)' : '100vh'}" class="flex flex-direction">
		<scroll-view scroll-x class="bg-white nav" :scroll-into-view="vId" scroll-with-animation>
			<view class="cu-item" :id="`nav-${inx}`" :class="inx==selTab?'text-blue cur':''" v-for="(i,inx) in tabs" :key="inx" @click="handleNavChange(inx)">
				{{i.text}}
			</view>
		</scroll-view>
		<view class="cu-bar bg-cyan search">
			<view class="search-form radius">
				<text class="cuIcon-search"></text>
				<input v-model="keywords" :adjust-position="false" type="text" placeholder="客户名称 手机号码" confirm-type="search" @confirm="handleSearch"></input>
			</view>
			<view class="action">
				<single-picker show-t :range="ps" v-model="pId" range-key="project_name" placeholder="全部"/>
			</view>
		</view>
		<swiper style="flex: 1;height: 0;" @change="tabChange" :current="selTab">
			<swiper-item v-for="(i, inx) in tabs" :key="inx">
				<data-list :ref="'list'+inx" @data="handleList(inx, $event)" :r-url="i.url" :r-data="i.data">
					<item v-for="item in i.list" :key="item.id" :bean="item" :type="type"/>
				</data-list>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import Item from './components/item'
	import DataList from '@/components/data-list'
	import SinglePicker from '@/components/single-picker'
	import { mapState } from 'vuex'
	
	export default {
		onLoad(opt) {
			if (this.isH5) {
				this.top = 44 + uni.upx2px(90)
			}
			this.type = opt.type
			this.tabs = this.tabs.map(i => {
				i.data.route_type = opt.type
				return i
			})
			this.$nextTick(_ => {
				this.$refs.list0[0].getData()
			})
			
			this.$http('baobeiProjects', {
				forSelect: true,
				company_id: this.userInfo.company_id
			}).then(r => {
				this.ps = [...this.ps, ...r.data]
			})
		},
		data() {
			return {
				pId: '',
				ps: [{'project_name': '全部', id: ''}],
				selTab: 0,
				type: 'up',
				top: uni.upx2px(90),
				vId: 'nav-0',
				keywords: '',
				tabs: [
					{
						text: '全部',
						url: 'baobei',
						data: {
							route_type: 'up',
							status_code: 'all'
						},
						component: 'item',
						list: []
					},
					{
						text: '待确认',
						url: 'baobei',
						data: {
							route_type: 'up',
							status_code: 'pending'
						},
						component: 'item',
						list: []
					},
					{
						text: '初步确认',
						url: 'baobei',
						data: {
							route_type: 'up',
							status_code: 'passed'
						},
						component: 'item',
						list: []
					},
					{
						text: '已带看',
						url: 'baobei',
						data: {
							route_type: 'up',
							status_code: 'saw'
						},
						component: 'item',
						list: []
					},
					{
						text: '已成交',
						url: 'baobei',
						data: {
							route_type: 'up',
							status_code: 'deal'
						},
						component: 'item',
						list: []
					},
					{
						text: '无效',
						url: 'baobei',
						data: {
							route_type: 'up',
							status_code: 'invalid'
						},
						component: 'item',
						list: []
					}
				]
			}
		},
		methods: {
			handleList(inx, list) {
				this.tabs[inx].list = list
			},
			tabChange(e) {
				let temp = e.detail.current - 2 < 0 ? 0 : e.detail.current - 2
				this.vId = `nav-${temp}`
				this.selTab = e.detail.current
				this.$refs[`list${this.selTab}`][0].init()
				
				this.reset()
				this.keywords = ''
				this.pId = ''
			},
			handleNavChange(inx) {
				let temp = inx - 2 < 0 ? 0 : inx - 2
				this.vId = `nav-${temp}`
				this.selTab = inx
				
				this.reset()
				this.keywords = ''
				this.pId = ''
			},
			handleSearch() {
				this.tabs[this.selTab].data = {...this.tabs[this.selTab].data, keywords: this.keywords}
			},
			reset() {
				this.tabs[this.selTab].data = {...this.tabs[this.selTab].data, keywords: ''}
			},
		},
		components: {
			Item, DataList, SinglePicker
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
			},
			'pId': {
				handler(val) {
					this.tabs[this.selTab].data = {...this.tabs[this.selTab].data, baobei_project_id: val}
				}
			}
		}
	}
</script>