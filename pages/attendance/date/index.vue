<template>
	<view>
		<view class="padding-left padding-right padding-top padding-bottom-sm text-gray text-sm">你可以点击编辑对某一天进行单独编辑</view>
		<checkbox-group @change="handleChange" class="cu-list menu">
			<view class="cu-item" v-for="(i, inx) in weekTemp" :key="inx">
				<view class="content padding-tb-sm flex">
					<checkbox class="round blue margin-right-sm" :value="i.value" :checked="i.checked" :class="i.checked?'checked':''"/>
					<text class="text-bold">{{i.text}}</text>
					<text class="text-gray content text-center">{{i.checked ? i.gradeName : ''}}</text>
					<navigator :url="`/pages/attendance/time-list/index?id=${i.gradeId}&day=${i.value}`">
						<text class="text-gray margin-right-sm" v-if="!i.checked">休息</text>
						<text class="cuIcon-edit" style="font-size: 50upx;"></text>
					</navigator>
				</view>
			</view>
		</checkbox-group>
		
		<view class="cu-list menu">
			<view class="cu-form-group text-bold">
				<view class="title">法定借节日自动排休</view>
				<switch class="blue" @change="autoRestChange" :class="autoRest?'checked':''" :checked="autoRest"/>
			</view>
		</view>
		
		<view class="cu-bar foot padding-left-sm padding-right-sm padding-top-sm padding-bottom-sm">
			<button class="bg-blue" style="width: 100%;" @click="handleSave">保存</button>
		</view>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	
	export default {
		onLoad(opt) {
			
		},
		onShow() {
			this.weekTemp = JSON.parse(JSON.stringify(this.week))
		},
		data: _ => ({
			autoRest: false,
			weekTemp: []
		}),
		computed: {
			...mapState({
				week: state => state.attendance.week
			})
		},
		methods: {
			...mapMutations('attendance', ['setWeek']),
			handleChange(e) {
				let items = this.weekTemp,
					values = e.detail.value;
				for (let i = 0, lenI = items.length; i < lenI; ++i) {
					items[i].checked = false;
					for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
						if (items[i].value == values[j]) {
							items[i].checked = true;
							break
						}
					}
				}
				// this.setWeek(items)
			},
			autoRestChange(e) {
				this.autoRest = e.detail.value
			},
			handleSave() {
				if (!this.weekTemp.filter(i => i.checked && i.gradeId).length) {
					uni.showToast({
						title: '还未选择考勤天数或者设置考勤班次',
						icon: 'none'
					})
					return
				}
				this.setWeek(this.weekTemp)
				uni.showToast({
					title: '考勤日期已设置',
					icon: 'none'
				})
				setTimeout(_ => {
					uni.navigateBack()
				}, 1500);
			}
		},
	}
</script>

<style>
</style>
