<template>
	<view class="bg-white margin-top-sm" style="height: 200upx;" @click="handleNav(bean)">
			<view class="padding-tb-xs padding-lr-sm">
				{{bean.type}}
			</view>
	</view>
</template>

<script>
	import Ava from '@/components/avatar'
	export default {
		
		props: {
			bean: {
				type: Object
			}
			
		},
		data: _ => ({
			map2: {
				'住宅': 'zhuzhai2'
			},
			map1: {
				'住宅': 'zhuzhai1',
				'公寓': 'gongyu1',
				'商铺': 'shangpu1',
				'写字楼': 'xiezilou1',
			}
		}),
		components: {
			Ava
		},
		methods: {
			handleNav(i) {
				let url = ''
				switch (i.type){
					case '租房':
					case '新房':
					case '二手房':
						url = `/pages/customer/need/${this.map2[i.house_using_type_name]}?id=${i.id}&type=${i.type}&cId=${i.customer_id}`
						break;
					case '住宅':
					case '公寓':
					case '商铺':
					case '写字楼':
						url = `/pages/customer/need/${this.map1[i.type]}?id=${i.id}&cId=${i.customer_id}`
						break;
					default:
						break;
				}
				uni.navigateTo({
					url
				})
			}
		}
	}
</script>

<style>
</style>
