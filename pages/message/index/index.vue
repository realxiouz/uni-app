<template>
	<view class="q-fixed" :style="{top: isH5?'44px':'0', bottom: isH5?'50px':'0'}">
		<!-- :r-data="rData" message_window下有可能不需要了, 用组件传参往下传-->
		<data-list r-url="message_window" ref="list" @data="handleList">
			<item :bean="i"  v-for="(i, inx) in list" :key="inx"/>
		</data-list>
	</view>
</template>

<script>
	import DataList from '@/components/data-list'
	import Item from './components/item'
	import { mapState, mapMutations, mapActions } from 'vuex'
	
	export default {
		onLoad(opt) {
            this.getUserInfo(this.$http);
            this.rData.user_id = this.userInfo.id;
		},
		onShow() {
		    if (!this.token) return false;
			this.$nextTick(_ => {
				this.$refs.list.getData(true)
			});
			uni.hideTabBarRedDot({
				index: 1
			});
		},
		onHide() {},
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
			...mapState(['userInfo', 'isH5', 'token']),
			...mapState('message', ['new'])
		},
		methods: {
		    ...mapActions(['getUserInfo']),
			...mapMutations('message', ['setChats']),
			handleList(list) {
				this.list = list
			},
			handleSearch() {
				this.rData = {
					keywords: this.keywords
				}
			}
		},
		watch: {
			new(val) {
				if (val.id) {
					this.$refs.list.getData(true)
				}
			}
		}
	}
</script>