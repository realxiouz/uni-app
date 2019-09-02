<template>
	<view>
		<view class="cu-bar bg-cyan search">
			<view class="search-form radius">
				<text class="cuIcon-search"></text>
				<input :adjust-position="false" type="text" placeholder="搜索姓名或者电话" confirm-type="search"></input>
			</view>
		</view>
		<checkbox-group @change="handleChange">
			<data-list r-url="customer/baobei" :r-data="rData" ref="list" @data="handleList">
				<view class="bg-white padding-sm solid-bottom" v-for="(i, inx) in list" :key="inx">
					<label class="flex">
						<view class="margin-right-sm">
							<checkbox 
								class='round blue'
								:class="i.checked?'checked':''"
								:checked="i.checked"
								:value="`${i.name} ${i.phone} ${i.id}`"
							/>
						</view>
						<view>
							<view class="text-black text-bold">{{i.name}}</view>
							<view class="text-gray text-sm">{{i.phone}}</view>
						</view>
					</label>
				</view>
			</data-list>
		</checkbox-group>
		<save @save="handleSave" />
	</view>
</template>

<script>
	import DataList from '@/components/data-list'
	import Save from '@/components/buttom-button'
	import { mapMutations, mapState } from 'vuex'
	
	export default {
		onLoad(opt) {
			this.type = opt.type
			if (this.type === 'history') {
				this.rData = { baobeis_sub: [] }
			}
			this.$nextTick(_ => {
				this.$refs.list.init()
			})
		},
		components: {
			DataList, Save
		},
		data() {
			return {
				type: '', //history my
				list: [],
				sels: [],
				
				rData: null
			}
		},
		methods: {
			...mapMutations('baobei', ['setSelCustomer']),
			handleList(list) {
				this.list = list.map(i =>{
					i.checked = false
					return i
				})
			},
			handleChange(e) {
				this.sels = e.detail.value
				for (let i = 0, lenI = this.list.length; i < lenI; ++i) {
					this.list[i].checked = false
					for (let j = 0, lenJ = this.sels.length; j < lenJ; ++j) {
						if (this.list[i].id == this.sels[j].split(' ')[2]) {
							this.list[i].checked = true
							break
						}
					}
				}
				this.list = this.list.map(i => i)
			},
			handleSave() {
				let arr = [...this.selCustomer]
				for (let i of this.sels) {
					let [name, phone, id] = i.split(' ')
					arr.push({
						name, phone, id
					})
				}
				this.setSelCustomer(arr)
				setTimeout(_ => {
					uni.navigateBack()
				}, 1500);
			},
		},
		computed: {
			...mapState('baobei', ['selCustomer'])
		}
	}
</script>

<style>
</style>
