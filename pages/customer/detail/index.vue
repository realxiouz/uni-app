<template>
	<view>
		<scroll-view scroll-x class="fixed bg-white nav" :style="{top: isH5?'44px':'0'}"  :scroll-into-view="vId" scroll-with-animation>
			<view class="cu-item" :id="`nav-${inx}`" :class="inx==selTab?'text-blue cur':''" v-for="(i,inx) in tabs" :key="inx" @click="handleNavChange(inx)">
				{{i.text}}
			</view>
		</scroll-view>
		<swiper :style="[{position:'fixed',left:0,right:0,bottom:'0',top:top+'px',height:'auto'}]" @change="tabChange"
		 :current="selTab">
			<swiper-item>
				<data-list ref="list0" @data="handleList0" r-url="customer_genjin" :r-data="rData">
					<genjin v-for="(i, inx) in list0" :key="inx" :bean="i" />
				</data-list>
			</swiper-item>
			<swiper-item>
				<data-list ref="list1" @data="handleList1" r-url="daikan" :r-data="rData">
					<daofang v-for="(i, inx) in list1" :key="inx" :bean="i" />
				</data-list>
			</swiper-item>
			<swiper-item>
				<data-list ref="list2" @data="handleList2" r-url="baobei" :r-data="rData">
					<baobei v-for="(i, inx) in list2" :key="inx" :bean="i" />
				</data-list>
			</swiper-item>
			<swiper-item>
				<data-list ref="list3" @data="handleList3" r-url="customerDemand" :r-data="rData">
					<need v-for="(i, inx) in list3" :key="inx" :bean="i" />
				</data-list>
			</swiper-item>
			<swiper-item>
				<bean :c-id="id" ref="list4" />
			</swiper-item>
		</swiper>
		<float-button @go="handleGo" />
	</view>
</template>

<script>
	import DataList from '@/components/data-list'
	import Genjin from './components/genjin'
	import Daofang from './components/daofang'
	import Baobei from './components/baobei'
	import Need from './components/need'
	import Bean from './components/bean'
	import FloatButton from '@/components/float-button'
	import {
		mapMutations,
		mapState
	} from 'vuex'

	export default {
		onLoad(opt) {
			if (this.isH5) {
				this.top = 44 + uni.upx2px(90)
			}
			this.id = opt.id
			this.rData = {
				customer_id: this.id
			}
			this.$nextTick(_ => {
				this.$refs.list0.init()
			})
		},
		data() {
			return {
				vId: 'nav-0',
				top: uni.upx2px(90),
				id: '',
				bean: {},
				selTab: 0,
				tabs: [{
						text: '跟进记录'
					},
					{
						text: '到访记录'
					},
					{
						text: '报备记录'
					},
					{
						text: '客户需求'
					},
					{
						text: '客户详情'
					},
				],
				list0: [],
				list1: [],
				list2: [],
				list3: [],
				rData: null,
			}
		},
		methods: {
			...mapMutations('baobei', ['setDaikan', 'setSelProject', 'setSelCustomer']),
			handleList(inx, l) {
				console.log(inx)
				console.log(l)
				// this.tabs[inx].list = l
			},
			handleList0(l) {
				this.list0 = l
			},
			handleList1(l) {
				this.list1 = l
			},
			handleList2(l) {
				this.list2 = l
			},
			handleList3(l) {
				this.list3 = l
			},
			tabChange(e) {
				let temp = e.detail.current - 2 < 0 ? 0 : e.detail.current - 2
				this.vId = `nav-${temp}`
				this.selTab = e.detail.current
				this.$refs[`list${this.selTab}`].init()
			},
			handleNavChange(inx) {
				let temp = inx - 2 < 0 ? 0 : inx - 2
				this.vId = `nav-${temp}`
				this.selTab = inx
			},
			handleGo() {
				switch (this.selTab) {
					case 0:
						uni.navigateTo({
							url: `/pages/common/followup/index?customerId=${this.id}`
						})
						break
					case 1:
						uni.navigateTo({
							url: `/pages/common/daofang/index?customerId=${this.id}`
						})
						break
					case 2:
						this.setDaikan({
							name: this.userInfo.name,
							phone: this.userInfo.mobile
						})
						this.setSelCustomer([{
							name: this.bean.name,
							phone: this.bean.phone
						}])
						this.setSelProject([])
						uni.navigateTo({
							url: `/pages/baobei/bean/index`
						})
						break;
					case 3:

						let itemList = ['住宅', '新房', '租房', '二手房']
						uni.showActionSheet({
							itemList,
							success: r => {
								switch (itemList[r.tapIndex]) {
									case '住宅':
										uni.navigateTo({
											url: `/pages/customer/need/zhuzhai1?cId=${this.id}`
										})
										break
									case '公寓':
										uni.navigateTo({
											url: `/pages/customer/need/gongyu1?cId=${this.id}`
										})
										break
									case '商铺':
										uni.navigateTo({
											url: `/pages/customer/need/shangpu1?cId=${this.id}`
										})
										break
									case '写字楼':
										uni.navigateTo({
											url: `/pages/customer/need/xiezilou1?cId=${this.id}`
										})
										break
									case '新房':
									case '租房':
									case '二手房':
										uni.navigateTo({
											url: `/pages/customer/need/select?type=${itemList[r.tapIndex]}&cId=${this.id}`
										})
										break
									
								}

							}
						})
						break
					default:
						break;
				}
			}
		},
		components: {
			DataList,
			Genjin,
			FloatButton,
			Daofang,
			Baobei,
			Bean,
			Need
		},
		computed: {
			...mapState(['userInfo', 'isH5']),
		}
	}
</script>

<style>
</style>
