<template>
	<view style="height:100vh;">
		<data-list ref="list" @data="handleList" r-url="secondHouse">
			<item v-for="(i, inx) in list" :key="inx" :bean="i" :type="rData.route_type"/>
		</data-list>
		<float-button @go="handleGo" b="25px"/>
	</view>
</template>

<script>
	import DataList from '@/components/data-list'
	import Item from './components/item'
	import FloatButton from '@/components/float-button'
	import { mapMutations, mapState } from 'vuex'
	
	export default {
		onLoad(opt) {
			uni.setNavigationBarTitle({
			    title: '二手房源'
			});
			this.setListType(opt.type);
			if (this.shopId) this.rData.shop_id = this.shopId;
			this.rData.route_type = opt.type;
            this.$nextTick(_ => {
				this.$refs.list.init()
			})
		},
		data() {
			return {
				list: [],
				rData: {
					route_type: '',
					
				}
			}
		},
		methods: {
			...mapMutations('project', ['setListType']),
			handleList(list) {
				this.list = list
			},
			handleGo() {
				uni.navigateTo({
					url: `/pages/second/bean/index`
				})
			}
		},
        computed: {
		    ...mapState('work', ['shopId'])
        },
		components: {
			DataList, Item, FloatButton
		}
	}
</script>

<style>
</style>
