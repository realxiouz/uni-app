<template>
	<view>
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

		<checkbox-group class="cu-list menu" @change="handleEChange">
			<label class="cu-item" v-for="(i, inx) in employees" :key="i.id">
				<view class="content padding-tb-sm">
					<view class="flex">
						<checkbox class='blue margin-right' :class="i.checked?'checked':''" :checked="i.checked" :value="i.id+''"></checkbox>
						<ava :name="i.name" :url="i.avatar" />
						<view class="margin-lr-sm">{{i.name}}</view>
						<view class='cu-tag radius bg-blue'>{{i.role_name}}</view>
					</view>
				</view>
			</label>
		</checkbox-group>

		<save @save="handleSave" :loading="formLoading"/>
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
			this.cId = opt.cId
			this.getDepartById('')
		},
		onShow() {},
		data: _ => ({
			departments: [],
			employees: [],
			dId: '',
			breadcrumb: [],
			
			s:{},
			formLoading: false
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
						if (this.s[this.dId] && this.s[this.dId].findIndex(j => j == items[i].id) >= 0) {
							items[i].checked = true
						}
					}
					this.employees = items
				})
			},
			handleEChange(e) {
				this.s[this.dId] = e.detail.value
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
				let temp = []
				for (let k in this.s) {
					if(this.s[k].length){
						temp= [...temp, ...this.s[k]]
					}
				}
				if (!temp.length) {
					uni.showToast({
						title: '还未选择',
						icon: 'none'
					})
					return
				}
				let data = {
					customer_id: this.cId,
					user_ids: temp
				}
				this.formLoading = true
				this.$http('customer-share', data, 'post').then(r => {
					uni.navigateBack()
				}).finally(_ => {
					this.formLoading = false
				})
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
