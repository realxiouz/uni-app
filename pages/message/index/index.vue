<template>
	<view style="height: 100vh;">
		<data-list r-url="message_window" ref="list" @data="handleList" :r-data="rData">
			<item :bean="i"  v-for="(i, inx) in list" :key="inx"/>
		</data-list>
	</view>
</template>

<script>
	import DataList from '@/components/data-list'
	import Item from './components/item'
	import { mapState, mapMutations } from 'vuex'
	
	export default {
		onLoad(opt) {
			this.rData.user_id = this.userInfo.id
		},
		onShow() {
			this.$nextTick(_ => {
				this.$refs.list.getData(true)
			})
			uni.hideTabBarRedDot({
				index: 1
			})
		},
		components: {
			DataList, Item
		},
		data() {
			return {
				list: [],
				rData: {
					user_id: ''
				}
			}
		},
		computed: {
			...mapState(['userInfo']),
			...mapState('message', ['chats'])
		},
		methods: {
			...mapMutations('message', ['setChats']),
			handleList(list) {
				// this.setChats(list)
				this.list = list
			},
			handleSearch() {
				this.rData = {
					keywords: this.keywords
				}
			}
		},
		watch: {}
	}
</script>