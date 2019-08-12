<template>
	<view>
		<!-- <view class="cu-bar bg-white search">
			<view class="search-form">
				<text class="cuIcon-search"></text>
				<input type="text" placeholder="搜索" confirm-type="search" @input="handleSearch"></input>
			</view>
		</view> -->
		<view class="bg-white padding-sm">
			<text v-for="(i, inx) in breadcrumb" :key="inx" @tap="handleNav(i)">
				<text class="text-bold">{{i.name}}</text>
				<text class="text-gray margin-lr-xs" v-if="inx != breadcrumb.length-1">></text>
			</text>
		</view>
		<view class="cu-list menu">
			<view class="cu-item" v-for="(i, inx) in departments" :key="inx">
				<view class="content padding-tb-sm">
					<view class="flex">
						<view class="text-bold content">{{i.name}}</view>
						<view @tap="toSubPerson(i)" class="flex align-center" v-if="!i.checked">
							<text class="cuIcon-group_fill" style="font-size: 50upx;"></text>
							<text class="text-blue">下级</text>
						</view>
					</view>
				</view>
			</view>
		</view>

		<radio-group class="cu-list menu" @change="handleEChange">
			<view class="cu-item" v-for="(i, inx) in employees" :key="inx">
				<view class="content padding-tb-sm">
					<view class="flex">
						<radio class='blue margin-right' :class="i.checked?'checked':''" :checked="i.checked" :value="i.id+''"></radio>
						<ava :name="i.name" :url="i.avatar" />
						<view class="margin-lr-sm">{{i.name}}</view>
						<view class='cu-tag radius bg-blue'>{{i.role_name}}</view>
					</view>
				</view>
			</view>
		</radio-group>

		<save @save="handleSave" />
	</view>
</template>

<script>
	import Ava from '@/components/avatar.vue'
	import Save from "@/components/buttom-button"
	import {
		mapMutations,
		mapState
	} from 'vuex'

	export default {
		onLoad(opt) {
			this.getDepartById('')
		},
		onShow() {},
		data: _ => ({
			departments: [],
			employees: [],
			selE: '',
			dId: '',
			breadcrumb: []
		}),
		methods: {
			...mapMutations('customer', ['setSelEmployee']),
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
					
					this.departments = r.departments
					
					let items = r.employees
					for (let i = 0, lenI = items.length; i < lenI; ++i) {
						items[i].checked = false;
						if (items[i].id == this.selEmployee.id) {
							items[i].checked = true
						}
					}
					this.employees = items
				})
			},
			handleEChange(e) {
				this.selE = e.detail.value
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
				let e = this.selE ? this.employees.find(i => i.id == this.selE) : {}
				this.setSelEmployee(e)
				uni.navigateBack()
			}
		},
		computed: {
			...mapState('customer', ['selEmployee']),
		},
		components: {
			Ava, Save
		}
	}
</script>
