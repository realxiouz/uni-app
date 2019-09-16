<template>
	<view>
		<scroll-view scroll-x class="fixed bg-white nav" :style="{top: isH5?'44px':'0'}" :scroll-into-view="vId" scroll-with-animation>
			<view class="cu-item" :id="`nav-${inx}`" :class="inx==selTab?'text-blue cur':''" v-for="(i,inx) in tabs" :key="inx" @click="handleNavChange(inx)">
				{{i.text}}
			</view>
		</scroll-view>
		<swiper :style="[{position:'fixed',left:0,right:0,bottom:'0',top:top+'px',height:'auto'}]" @change="tabChange" :current="selTab">
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
		},
		data() {
			return {
				selTab: 0,
				type: 'up',
				top: uni.upx2px(90),
				vId: 'nav-0',
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
			},
			handleNavChange(inx) {
				let temp = inx - 2 < 0 ? 0 : inx - 2
				this.vId = `nav-${temp}`
				this.selTab = inx
			}
		},
		components: {
			Item, DataList,
		},
		computed: {
			...mapState(['isH5'])
		}
	}
</script>