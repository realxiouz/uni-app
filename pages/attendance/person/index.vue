<template>
	<view>
		<view class="cu-bar bg-white search">
			<view class="search-form">
				<text class="cuIcon-search"></text>
				<input type="text" placeholder="搜索" confirm-type="search" @input="handleSearch"></input>
			</view>
		</view>
		<view class="bg-white padding-sm">
			<text v-for="(i, inx) in breadcrumb" :key="inx" @tap="handleNav(i)">
				<text class="text-bold">{{i.name}}</text>
				<text class="text-gray margin-lr-xs" v-if="inx != breadcrumb.length-1">></text>
			</text>
		</view>
		<checkbox-group class="cu-list menu" @change="handleDChange">
			<view class="cu-item" v-for="(i, inx) in departments" :key="inx">
				<view class="content padding-tb-sm">
					<view class="flex">
						<checkbox class='round blue margin-right' :class="i.checked?'checked':''" :checked="i.checked" :value="i.id+''" />
						<view class="text-bold content">{{i.name}}</view>
						<view @tap="toSubPerson(i)" class="flex align-center" v-if="!i.checked">
							<text class="cuIcon-group_fill" style="font-size: 50upx;"></text>
							<text class="text-blue">下级</text>
						</view>
					</view>
				</view>
			</view>
		</checkbox-group>

		<checkbox-group class="cu-list menu" @change="handleEChange">
			<view class="cu-item" v-for="(i, inx) in employees" :key="inx">
				<view class="content padding-tb-sm">
					<view class="flex">
						<checkbox class='round blue margin-right' :class="i.checked?'checked':''" :checked="i.checked" :value="i.id+''"></checkbox>
						<ava :name="i.name" :url="i.avatar" />
						<view class="margin-lr-sm">{{i.name}}</view>
						<view class='cu-tag radius bg-blue'>{{i.role_name}}</view>
					</view>
				</view>
			</view>
		</checkbox-group>

		<view class="cu-bar foot padding-left-sm padding-right-sm padding-top-sm padding-bottom-sm bg-white">
			<view class="flex response justify-between align-center">
				<text>已选择:&nbsp;{{dL}}&nbsp;部门,&nbsp;{{eL}}&nbsp;员工</text>
				<button class="cu-btn radius bg-blue" @tap="handleSave">确定</button>
			</view>
		</view>
	</view>
</template>

<script>
	import Ava from '@/components/avatar.vue'
	import {
		mapMutations,
		mapState
	} from 'vuex'

	export default {
		onLoad(opt) {
			this.getDepartById('')
			
			this.type = opt.type
		},
		onShow() {},
		data: _ => ({
			departments: [],
			employees: [],

			selE: [],
			selD: [],
			allSel: {},
			allSelData: [],
			dId: '',
			breadcrumb: [],
			
			type: ''
		}),
		methods: {
			...mapMutations('attendance', ['setStaffs']),
			getDepartById(depid) {
				this.$http('department/subs', {
					depid
				}).then(r => {
					if (!depid) {
						this.getDepartById(r.departments[0].id)
						this.breadcrumb.push({
							name: r.departments[0].name,
							dId: r.departments[0].id
						})
						return
					}
					this.dId = depid

					let ds = r.departments,
						sD = this.allSel[this.dId] && this.allSel[this.dId].d || [];
					for (let i = 0, lenI = ds.length; i < lenI; ++i) {
						ds[i].checked = false;
						for (let j = 0, lenJ = sD.length; j < lenJ; ++j) {
							if (ds[i].id == sD[j]) {
								ds[i].checked = true;
								break
							}
						}
					}
					this.departments = ds

					let es = r.employees,
						sE = this.allSel[this.dId] && this.allSel[this.dId].e || [];
					for (let i = 0, lenI = es.length; i < lenI; ++i) {
						es[i].checked = false;
						for (let j = 0, lenJ = sE.length; j < lenJ; ++j) {
							if (es[i].id == sE[j]) {
								es[i].checked = true;
								break
							}
						}
					}
					this.employees = es
				})
			},
			handleEChange(e) {
				this.selE = e.detail.value
				let items = this.employees,
					values = e.detail.value;
				for (let i = 0, lenI = items.length; i < lenI; ++i) {
					items[i].checked = false;
					for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
						if (items[i].id == values[j]) {
							items[i].checked = true;
							break
						}
					}
				}
				this.eOrDChange(this.selE, true)
			},
			handleDChange(e) {
				this.selD = e.detail.value
				let items = this.departments,
					values = e.detail.value;
				for (let i = 0, lenI = items.length; i < lenI; ++i) {
					items[i].checked = false;
					for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
						if (items[i].id == values[j]) {
							items[i].checked = true;
							break
						}
					}
				}
				this.eOrDChange(this.selD)
			},
			toSubPerson(i) {
				this.breadcrumb.push({
					name: i.name,
					dId: i.id
				})
				this.getDepartById(i.id)
			},
			handleNav(i) {
				if (i.id != this.dId) {
					let inx = this.breadcrumb.findIndex(item => item.dId == i.dId)
					this.breadcrumb = this.breadcrumb.slice(0, inx + 1)
					this.getDepartById(i.dId)
				}
			},
			handleSave() {
				if (!this.allSelData.length) {
					uni.showToast({
						title: '还未选择部门或者员工',
						icon: 'none'
					})
					return
				}
				this.setStaffs(this.allSelData)
				uni.navigateTo({
					url: '/pages/attendance/staffs/index'
				})
			},
			eOrDChange(arr, isE = false) {
				if (!this.allSel[this.dId]) {
					this.allSel[this.dId] = {}
				}
				if (isE) {
					this.allSel[this.dId].e = arr
				} else {
					this.allSel[this.dId].d = arr
				}
				this.formatData()

			},
			handleSearch() {},
			formatData() {
				this.allSelData = []
				for (let pro in this.allSel) {
					let obj = this.allSel[pro]
					if (obj.e && obj.e.length) {
						for (let inx in obj.e) {
							if (this.allSelData.findIndex(i => i.related_type == 'staff' && i.related_staff == obj.e[inx]) === -1) {
								this.allSelData.push({
									related_type: 'staff',
									related_staff: obj.e[inx]
								})
							}
						}
					}
					if (obj.d && obj.d.length) {
						for (let inx in obj.d) {
							if (this.allSelData.findIndex(i => i.related_type == 'department' && i.related_staff == obj.d[inx]) === -1) {
								this.allSelData.push({
									related_type: 'department',
									related_staff: obj.d[inx]
								})
							}
						}
					}
				}
			}
		},
		computed: {
			eL() {
				return this.allSelData.filter(i => i.related_type === 'staff').length
			},
			dL() {
				return this.allSelData.filter(i => i.related_type === 'department').length
			}
		},
		components: {
			Ava
		}
	}
</script>

<style>
</style>
