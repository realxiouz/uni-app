<template>
	<view>
		<view class="cu-list menu">
			<view class="cu-form-group">
				<view class="title">考勤组名称</view>
				<input placeholder="最多10个字符" v-model="name" :maxlength="10"></input>
			</view>
		</view>
		<view class="cu-list menu">
			<navigator class="cu-item arrow" url="/pages/attendance/person/index?type='staff'">
				<view class="content padding-tb-sm">
					<view class="text-black text-bold">参与考勤人员</view>
				</view>
			</navigator>
			<!-- <navigator class="cu-item arrow" url="/pages/attendance/group/index">
				<view class="content padding-tb-sm">
					<view class="text-black text-bold">无需参与考勤人员</view>
				</view>
			</navigator> -->
			<navigator class="cu-item arrow" url="/pages/attendance/group/index?type='manage'">
				<view class="content padding-tb-sm">
					<view class="text-black text-bold">考勤组负责人</view>
				</view>
			</navigator>
			<navigator class="cu-item arrow" url="/pages/attendance/group/index">
				<view class="content padding-tb-sm">
					<view class="text-black text-bold">扣款规则</view>
				</view>
			</navigator>
		</view>

		<view class="cu-list menu">
			<navigator url="/pages/attendance/time-list/index" class="cu-item arrow">
				<view class="content padding-tb-sm">
					<view class="text-black text-bold">上下班时间</view>
					<view class="text-gray text-sm">工作日可单独设置上下班时间</view>
				</view>
			</navigator>
			<navigator url="/pages/attendance/date/index" class="cu-item arrow">
				<view class="content padding-tb-sm">
					<view class="text-gray text-sm">考勤日期</view>
					<view class="text-black text-bold">{{weekString}}</view>
				</view>
			</navigator>
		</view>

		<view class="cu-list menu">
			<navigator class="cu-item arrow" url="/pages/attendance/wifi/index">
				<view class="content padding-tb-sm">
					<view class="text-blue">添加办公Wi-Fi</view>
					<view class="text-gray text-sm">连接上指定wifi即可打卡</view>
				</view>
			</navigator>
			<view class="cu-item" v-for="(i, inx) in wifi" :key="inx">
				<view class="content padding-tb-sm">
					<view class="text-black text-bold">{{i.SSID}}</view>
					<view class="text-gray text-sm">{{i.BSSID}}</view>
				</view>
			</view>
		</view>
		
		<view class="cu-bar foot padding-left-sm padding-right-sm padding-top-sm padding-bottom-sm bg-white">
			<button class="cu-btn bg-blue response" @click="handleSave">保存</button>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapState
	} from 'vuex'
	export default {
		data: _ => ({
			name: ''
		}),
		methods: {
			handleSave() {
				if (!this.name) {
					uni.showToast({
						title: '必须填写考勤组名称',
						icon: 'none'
					})
					return
				}
				if (!this.staffs.length) {
					uni.showToast({
						title: '还未选择考勤人员',
						icon: 'none'
					})
					return
				}
				if (!this.wifi.length) {
					uni.showToast({
						title: '还未选择考勤WiFi',
						icon: 'none'
					})
					return
				}
				let data = {
					group_name: this.name,
					pattern: 'wifi',
					type: 'fixed',
					staffs: this.staffs,
					workdays: this.week.filter(i => i.checked).map(i => ({
						title: i.value,
						grade_id: i.gradeId
					})),
					wifis: this.wifi.map(i => ({
						name: i.SSID,
						mac_address: i.BSSID
					})),
					punishment_rule: 1
				}
				this.$http('attendance/groups', data, 'post').then(r => {

				})
			}
		},
		computed: {
			...mapGetters('attendance', ['weekString']),
			...mapState('attendance', ['wifi', 'staffs', 'week'])
		}
	}
</script>

<style>
</style>
