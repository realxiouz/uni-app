<template>
	<view>
		<view class="cu-bar bg-white search fixed">
			<view class="search-form">
				<text class="cuIcon-search"></text>
				<input type="text" placeholder="请输入班次名称" confirm-type="search" @input="handleSearch"></input>
			</view>
		</view>
		<view class="cu-list menu">
			<navigator class="cu-item arrow" url="/pages/attendance/time/index">
				<view class="content padding-tb-sm">
					<text class="cuIcon-roundaddfill text-green margin-right-xs"></text><text class="text-black text-bold">新增全局班次</text>
				</view>
			</navigator>
		</view>
		
		<radio-group class="cu-list menu" @change="handleSelChange">
			<view class="cu-item" v-for="(i, inx) in list" :key="inx">
				<view class="content padding-tb-sm">
					<view class="flex">
						<view class="margin-right-sm">
							<radio class='round blue' :class="selId==i.id?'checked':''" :checked="i.checked" :value="i.id+''"></radio>
						</view>
						<view class="flex-sub">
							<view class="text-black text-bold">{{i.name}}</view>
							<view class="text-gray text-sm">{{i.type}}</view>
						</view>
						<navigator :url="`/pages/attendance/time/index?id=${i.id}`">
							<text class="cuIcon-edit" style="font-size: 50upx;"></text>
						</navigator>
					</view>
				</view>
			</view>
		</radio-group>
		<!-- <view :style="`height: ${$refs.bar.style.height}px`"></view> -->
		<view class="cu-bar foot padding-left-sm padding-right-sm padding-top-sm padding-bottom-sm bg-white">
			<button class="cu-btn bg-blue response" @click="handleSave">保存</button>
		</view>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	
	export default {
		onLoad(opt) {
			if (opt.day) {
				this.selDay = opt.day
				this.isSetAll = false
				this.selId = opt.id
			}
		},
		onShow() {
			this.getData(true)
		},
		data: _ => ({
			list: [],
			page: 1,
			selId: '',
			isSetAll: true,
			selDay: ''
		}),
		computed: {
			...mapState({
				week: state => state.attendance.week
			})
		},
		methods: {
			...mapMutations('attendance', ['setWeek']),
			handleSearch() {
				
			},
			getData(resetPage=false) {
				if (resetPage) {
					this.page = 1
				}
				let data = {
					page: this.page
				}
				this.$http('attendance/grades', data).then(r => {
					if (this.page === 1) {
						this.list = []
					}
					this.list = this.list.concat(r.data)
				})
			},
			handleSave() {
				if (!this.selId) {
					uni.showToast({
						title: '请选择一个班次',
						icon: 'none'
					})
					return
				}
				
				let name = this.list.find(i => i.id == this.selId).name
				
				if (this.isSetAll) {
					this.setWeek(this.week.map(i => {
						i.gradeName = name,
						i.gradeId = this.selId
						return i
					}))
				} else {
					let weekTemp = JSON.parse(JSON.stringify(this.week))
					let day = weekTemp.find(i => i.value === this.selDay)
					day.gradeName = name
					day.gradeId = this.selId
					this.setWeek(weekTemp)
				}
				
				uni.showToast({
					title: '考勤班次设置成功',
					icon: 'none'
				})
				setTimeout(_ => {
					uni.navigateBack()
				}, 1500);
			},
			handleSelChange(e) {
				this.selId = e.detail.value
			}
			
		}
	}
</script>

<style>
	/* page{
		padding-top: 50px;
	} */
</style>
