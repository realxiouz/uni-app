<template>
	<view class="bg-white margin-top-sm padding-tb-xs padding-lr-sm" @click="handleNav(bean)">
		<view class="flex align-center">
			<view class="cu-tag bg-cyan small radius">{{bean.type}}</view>
			<text class="margin-left-xs">{{bean.brief}}</text>
		</view>
		<view class="flex margin-top-xs">
			<view class="flex-sub">
				<text class="text-gray">价格:</text>
				<text>{{bean.price_start}}-{{bean.price_end}}</text>
			</view>
			<view class="flex-sub">
				<text class="text-gray">单价:</text>
				<text>{{bean.unit_price_start}}-{{bean.unit_price_end}}</text>
			</view>
		</view>
		<view class="flex margin-top-xs">
			<view class="flex-sub">
				<text class="text-gray">面积:</text>
				<text>{{bean.area_start}}-{{bean.area_end}}</text>
			</view>
			<view class="flex-sub">
				<text class="text-gray">期限:</text>
				<text>{{bean.term}}</text>
			</view>
		</view>
		<view class="flex margin-top-xs">
			<view class="flex-sub">
				<text class="text-gray">意向:</text>
				<text v-if="bean.intention_attr">{{bean.intention_attr.name}}</text>
			</view>
			<view class="flex-sub">
				<text class="text-gray">楼层:</text>
				<text>{{bean.floor}}</text>
			</view>
		</view>
		<view class="flex margin-top-xs">
			<view class="flex-sub">
				<text class="text-gray">装修:</text>
				<text>{{bean.renovation}}</text>
			</view>
			<view class="flex-sub">
				<text class="text-gray">付款方式:</text>
				<text v-if="bean.payment_type_attr">{{bean.payment_type_attr.anme}}</text>
			</view>
		</view>
		<view class="flex margin-top-xs">
			<view class="flex-sub">
				<text class="text-gray">关注重点:</text>
				<text>{{bean.guanzhu_attr.map(i => i.attribute.name).join(',')}}</text>
			</view>
		</view>
		<view class="flex margin-top-xs">
			<view class="flex-sub">
				<text class="text-gray">抗性:</text>
				<text>{{bean.kangxing_attr.map(i => i.attribute.name).join(',')}}</text>
			</view>
		</view>
		<view class="flex margin-top-xs">
			<view class="flex-sub">
				<text class="text-gray">备注:</text>
				<text>{{bean.remark}}</text>
			</view>
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
				'住宅': 'zhuzhai2',
				'商铺': 'shangpu2',
				'公寓': 'gongyu2',
				'别墅': 'bieshu2',
				'写字楼': 'xiezilou2',
				'车位': 'chewei2',
				'其他': 'qita2'
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
