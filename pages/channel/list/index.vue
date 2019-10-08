<template>
	<view>
		<view class="cu-bar bg-cyan search fixed" :style="{top: isH5?'44px':'0px'}">
			<view class="search-form radius">
				<text class="cuIcon-search"></text>
				<input v-model="keywords" :adjust-position="false" type="text" placeholder="公司名 信用代码 联系人电话 公司编号" confirm-type="search" @confirm="handleSearch"></input>
			</view>
		</view>
		<view :style="[{position:'fixed',left:0,right:0,bottom:'0',top:top+'px'}]">
			<data-list ref="list" @data="handleList" r-url="channel" :r-data="data">
				<item v-for="(i, inx) in list" :key="inx" :bean="i" />
			</data-list>
		</view>
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
			if (this.isH5) {
				this.top = 44 + uni.upx2px(90)
			}
			this.$nextTick(_ => {
				this.$refs.list.getData()
			});
		},
		data() {
			return {
				list: [],
				top: uni.upx2px(90),
				keywords: '',
				data: null,
				type: '',
				
				needSetDefault: false
				
			}
		},
		methods: {
			...mapMutations('customer', ['setSelEmployee']),
			handleList(l) {
				this.list = l
			},
			handleGo() {
				uni.navigateTo({
					url: `/pages/channel/bean/index`
				})
			},
			handleSearch() {
				this.data = {...this.data, keywords: this.keywords}
			}
		},
		components: {
			Item, DataList, FloatButton
		},
		computed: {
			...mapState(['isH5', 'userInfo'])
		}
	}
</script>
