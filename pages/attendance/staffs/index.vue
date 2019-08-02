<template>
	<view>
		<view class="cu-list menu">
			<navigator class="cu-item arrow" open-type="navigateBack">
				<view class="content padding-tb-sm">
					<text class="cuIcon-roundaddfill text-green margin-right-xs"></text><text class="text-black text-bold">添加</text>
				</view>
			</navigator>
		</view>
		<view class="cu-list menu">
			<view class="cu-item" v-for="(i, inx) in ds" :key="inx">
				<view class="content padding-tb-sm">
					<view class="flex">
						<ava :name="i.related_type"/>
						<view class="margin-lr-sm">{{i.related_type}}</view>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	import Ava from '@/components/avatar.vue'

	export default {
		computed: {
			...mapState('attendance', ['staffs']),
			es() {
				return this.staffs.filter(i => i.related_type === 'staff')
			},
			ds() {
				return this.staffs.filter(i => i.related_type === 'department')
			}
		},
		components: {
			Ava
		}
	}
</script>

<style>
</style>
