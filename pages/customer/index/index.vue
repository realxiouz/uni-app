<template>
	<view>
		<view class="cu-bar bg-cyan search fixed" :style="{top: isH5?'44px':'0px'}">
			<view class="search-form radius">
				<text class="cuIcon-search"></text>
				<input v-model="keywords" :adjust-position="false" type="text" placeholder="姓名 电话搜索" confirm-type="search" @confirm="handleSearch"></input>
			</view>
		</view>
		<view :style="[{position:'fixed',left:0,right:0,bottom:'0',top:top+'px'}]">
			<data-list ref="list" @data="handleList" r-url="customer" :r-data="data">
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
			this.type = opt.type;
			
			this.data = {
				type: this.type,
			};
			if(opt.is_share) {
				this.data.is_share = opt.is_share
			}
			if(opt.private) {
				this.data.private = opt.private
			}
			
			let title = '';
			if (!opt.is_share && !opt.private) {
				title = '客户列表';
				this.needSetDefault = true
			} else if (opt.is_share) {
				title = '共享客户';
			} else if (opt.private) {
				title = '客户公池';
				this.pools = true;
			}
			uni.setNavigationBarTitle({
				title
			})
		},
		onShow() {
			this.$nextTick(_ => {
				this.$refs.list.getData(true)
			});
		},
		data() {
			return {
				list: [],
				top: uni.upx2px(90),
				keywords: '',
				data: null,
				type: '',
                pools: false,
				needSetDefault: false
				
			}
		},
		methods: {
			...mapMutations('customer', ['setSelEmployee']),
			handleList(l) {
				this.list = l
			},
			handleGo() {
				if (this.needSetDefault) {
					this.setSelEmployee({
						id: this.userInfo.id,
						name: this.userInfo.name,
						avatar: this.userInfo.avatar
					})
				}
                let until = this.pools? '&pools=true': '';
				uni.navigateTo({
					url: `/pages/customer/bean/index?type=${this.type}${until}`
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
