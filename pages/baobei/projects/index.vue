<template>
	<view>
		<view class="cu-bar bg-cyan search">
			<view class="search-form radius">
				<text class="cuIcon-search"></text>
				<input v-model="keywords" :adjust-position="false" type="text" placeholder="搜索楼盘" confirm-type="search" @confirm="handleSearch"></input>
			</view>
		</view>
		<checkbox-group @change="handleChange">
			<data-list r-url="baobeiProjects" ref="list" @data="handleList" :r-data="rData">
				<view class="bg-white padding-sm solid-bottom" v-for="(i, inx) in list" :key="inx">
					<view class="flex">
						<view class="margin-right-sm">
							<checkbox class='round blue' :class="i.checked?'checked':''" :checked="i.checked" :value="`${i.id} ${i.project.name}(${i.company.alias})`"></checkbox>
						</view>
						<view>
							<view class="text-black text-bold">{{i.project.name}}</view>
							<view class="text-gray text-sm">{{i.company.alias}}</view>
						</view>
					</view>
				</view>
			</data-list>
		</checkbox-group>
		<save @save="handleSave" />
	</view>
</template>

<script>
	import DataList from '@/components/data-list'
	import Save from '@/components/buttom-button'
	import { mapState, mapMutations } from 'vuex'
	
	export default {
		onLoad(opt) {
			this.$nextTick(_ => {
				this.$refs.list.init()
			})
		},
		components: {
			DataList, Save
		},
		data() {
			return {
				list: [],
				sels: [],
				rData: {
					keywords: ''
				},
				keywords: ''
			}
		},
		computed: {
			...mapState('baobei', ['selProject'])
		},
		methods: {
			...mapMutations('baobei', ['setSelProject']),
			handleList(list) {
				this.list = list.map(i => {
					i.checked = false
					return i
				})
			},
			handleChange(e) {
				this.sels = e.detail.value
			},
			handleSave() {
				if (!this.sels.length) {
					uni.showToast({
						title: '至少选择一个楼盘报备',
						icon: 'none'
					})
					return
				}
				let arr = []
				for (let i of this.sels) {
					let [id, text] = i.split(' ')
					arr.push({
						id, text
					})
				}
				this.setSelProject(arr)
				uni.showToast({
					title: `重新选择了${arr.length}个楼盘`,
					icon: 'none'
				})
				setTimeout(_ => {
					uni.navigateBack()
				}, 1500);
			},
			handleSearch() {
				this.rData = {
					keywords: this.keywords
				}
			}
		},
		watch: {
			keywords(val) {
				if (!val) {
					this.rData = {keywords: null}
				}
			}
		}
	}
</script>

<style>
</style>

