<template>
	<view>
		<!-- #ifndef H5  -->
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title text-orange "></text> 智能考勤
			</view>
			<!-- <view class="action">
				<button class="cu-btn bg-green shadow" @tap="showModal" data-target="gridModal">设置</button>
			</view> -->
		</view>
		<view class="cu-list grid col-4 no-border">
			<view class="cu-item" v-for="(item,index) in attendanceList" :key="index">
				<view :class="['cuIcon-' + item.cuIcon,'text-' + item.color]" @click="handleNav(item.path)">
					<view class="cu-tag badge" v-if="item.badge">
						<block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
					</view>
				</view>
				<text>{{item.name}}</text>
			</view>
		</view>
		<!-- #endif -->
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title text-orange "></text> 楼盘
			</view>
		</view>
		<view class="cu-list grid col-4 no-border">
			<view class="cu-item" v-for="(item,index) in projectList" :key="index">
				<view :class="['cuIcon-' + item.cuIcon,'text-' + item.color]" @click="handleNav(item.path)">
					<view class="cu-tag badge" v-if="item.badge">
						<block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
					</view>
				</view>
				<text>{{item.name}}</text>
			</view>
		</view>

	</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		
		data() {
			return {
				cuIconList: [{
					cuIcon: 'cardboardfill',
					color: 'red',
					badge: 0,
					name: '打卡'
				}, {
					cuIcon: 'recordfill',
					color: 'orange',
					badge: 0,
					name: '设置',
					path: '/pages/test/index/index'
				}],

				attendanceList: [
					{
						cuIcon: 'locationfill',
						color: 'green',
						badge: 0,
						name: '打卡',
						path: '/pages/attendance/signin/index'
					},
					{
						cuIcon: 'settingsfill',
						color: 'blue',
						badge: 0,
						name: '设置',
						path: '/pages/attendance/setting/index'
					}
				],
				
				projectList: [
					{
						cuIcon: 'locationfill',
						color: 'green',
						badge: 0,
						name: '报备楼盘',
						path: '/pages/project/list/index?type=cooperation'
					},
					{
						cuIcon: 'locationfill',
						color: 'green',
						badge: 0,
						name: '报备列表',
						path: '/pages/baobei/list/index'
					},
					{
						cuIcon: 'locationfill',
						color: 'green',
						badge: 0,
						name: '云端楼盘',
						path: '/pages/project/list/index?type=public'
					}
				]
			};
		},
		onShow() {
			if (!this.hasLogin) {
				uni.navigateTo({url: '/pages/public/login/index'})
				return
			}
		},
		methods: {
			handleNav(url) {
				if (url) {
					uni.navigateTo({ url })
				}
			}
		},
		computed: {
			...mapState(['hasLogin'])
		},
	}
</script>

<style>
</style>
