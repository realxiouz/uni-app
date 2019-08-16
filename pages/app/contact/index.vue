<template>
	<view>
		<!-- #ifndef APP-PLUS -->
		<view>
			仅限app支持此功能
		</view>
		<!-- #endif -->
		<!-- #ifdef APP-PLUS -->
		<!-- <view v-for="(i,index) in list1" :key="index">
			<view>姓名:{{i.name}}</view>
			<view>电话:{{i.phone}}</view>
		</view> -->
		<checkbox-group class="cu-list menu" @change="handleChange">
			<view class="cu-item" v-for="(i, inx) in list1" :key="inx">
				<view class="content padding-tb-sm">
					<view class="flex">
						<view class="margin-right-sm">
							<checkbox class='round blue' :class="i.checked?'checked':''" :checked="i.checked" :value="`${i.name}-${i.phone}`"></checkbox>
						</view>
						<view>
							<view class="text-black text-bold">{{i.name}}</view>
							<view class="text-gray text-sm">{{i.phone}}</view>
						</view>
					</view>
				</view>
			</view>
		</checkbox-group>
		<save @save="handleSave" />
		<!-- #endif -->
	</view>
</template>

<script>
	import { mapMutations } from 'vuex'
	import Save from '@/components/buttom-button'
	
	export default {
		onLoad() {
			// #ifdef APP-PLUS
			this.getContacts()
			// #endif
		},
		data() {
			return {
				list1: [],
				selItems: []
			}
		},
		methods: {
			...mapMutations('baobei', ['setSelCustomer']),
			getContacts() {
				plus.contacts.getAddressBook(plus.contacts.ADDRESSBOOK_PHONE, addressbook => {
					addressbook.find(["displayName", "phoneNumbers"], contacts => {
						// "displayName":"qiqi","phoneNumbers":[{"id":"1","pref":false,"value":"1 591-251-0617","type":"mobile"},{"id":"2","pref":false,"value":"1 828-867-2076","type":"home"}]
						for (let i of contacts) {
							for (let j of i.phoneNumbers) {
								this.list1.push({
									name: this.formatStr(i.displayName),
									phone: this.formatStr(j.value),
									checked: false
								})
							}
						}
					}, function() {
						uni.showToast({
							title: '获取联系人失败',
							duration: 2000
						})
					}, {
						multiple: true
					});
				}, function(e) {
					uni.showToast({
						title: '获取通讯录对象失败:' + e.message,
						duration: 2000
					})
				});
			},
			handleChange(e) {
				this.selItems = e.detail.value
			},
			formatStr(str) {
				return str.replace(/-/g, '').replace(/ /g, '')
			},
			handleSave() {
				if (!this.selItems.length) {
					uni.showToast({
						title: '还未选择客户',
						icon: 'none'
					})
					return
				}
				let arr = []
				for (let i of this.selItems) {
					let [name, phone] = i.split('-')
					arr.push({name, phone})
				}
				this.setSelCustomer(arr)
				uni.showToast({
					title: `共选择了${arr.length}个客户`,
					icon: 'none'
				})
				setTimeout(_ => {
					uni.navigateBack()
				}, 1500)
			}
		},
		components: {
			Save
		}
	}
</script>

<style>
</style>
