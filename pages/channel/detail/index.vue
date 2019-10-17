<template>
	<view :style="{height: isH5 ? 'calc(100vh - 44px)' : '100vh'}" class="flex flex-direction">
		<view class="bg-white nav">
			<view class="cu-item" :class="inx==selTab?'text-blue cur':''" v-for="(i,inx) in tabs" :key="inx" @click="handleNavChange(inx)">
				{{i.text}}
			</view>
		</view>
		<swiper style="flex: 1;height: 0;" @change="tabChange" :current="selTab">
			<swiper-item>
				<bean :c-id="cId" ref="list0"/>
			</swiper-item>
			<swiper-item>
				<data-list ref="list1" @data="handleList1" r-url="linkmen" :r-data="rData1">
					<person v-for="(i, inx) in list1" :key="inx" :bean="i" @default="$refs.list1.getData(true)" />
				</data-list>
			</swiper-item>
			<swiper-item>
				<data-list ref="list2" @data="handleList2" r-url="cooperation_followups" :r-data="rData2">
					<genjin v-for="(i, inx) in list2" :key="inx" :bean="i" />
				</data-list>
			</swiper-item>
		</swiper>
		<float-button @go="handleGo" b="25px" v-if="selTab != 0"/>
	</view>
</template>

<script>
	import Bean from './components/bean'
	import Genjin from './components/genjin'
	import Person from './components/person'
	import DataList from '@/components/data-list'
	import FloatButton from '@/components/float-button'
	import { mapState, mapMutations } from 'vuex'
	
	export default {
		onLoad(opt) {
			this.cId = opt.cId
			this.rData1 = {
				cooperation_type: 'channel',
				cooperation_id: this.cId
			}
			this.rData2 = {
				cooperation_type: 'channel',
				cooperation_id: this.cId,
				type: 1
			}
		},
		onShow() {
			this.$nextTick(_ => {
				this.$refs[`list${this.selTab}`].getData(true)
			})
			// this.$refs[`list${this.selTab}`] && this.$refs[`list${this.selTab}`].getData(true)
		},
		data() {
			return {
				keywords: '',
				type: '',
				tabs: [
					{
						text: '基本信息',
						url: 'customer',
						list: [],
						data: {
							type: '新房',
							demands: JSON.stringify({type: '全部'})
						}
					},
					{
						text: '联系人',
						url: 'customer',
						list: [],
						data: {
							type: '新房',
							customer_type: '有意向',
							demands: JSON.stringify({type: '全部'})
						}
					},
					{
						text: '跟进',
						url: 'customer',
						list: [],
						data: {
							type: '新房',
							customer_type: '已看房',
							demands: JSON.stringify({type: '全部'})
						}
					},
				],
				selTab: 0,
				
				sortType: '',
				descending: 'asc',
				
				list1: [],
				list2: [],
				cId: '',
				rData1: null,
				rData2: null
				
			}
		},
		methods: {
			...mapMutations('customer', ['setSelEmployee']),
			
			handleList1(l) {
				this.list1 = l
			},
			handleList2(l) {
				this.list2 = l
			},
			handleGo() {
				switch (this.selTab) {
					case 1:
						uni.navigateTo({
							url: `/pages/channel/link/index?cId=${this.cId}`
						})
						break
					case 2:
						uni.navigateTo({
							url: `/pages/common/followup/channel?cId=${this.cId}`
						})
						break
					
					
				}
			},
			
			handleNavChange(inx) {
				this.selTab = inx
			},
			tabChange(e) {
				this.selTab = e.detail.current
				this.$refs[`list${this.selTab}`].init()
			},
		},
		components: {
			DataList, FloatButton, Bean, Genjin, Person
		},
		computed: {
			...mapState(['isH5', 'userInfo'])
		},
		
	}
</script>
