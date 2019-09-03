<template>
	<view>
		<view class="cu-bar bg-cyan search fixed" :style="{top: isH5?'44px':'0px'}">
			<view class="search-form radius">
				<text class="cuIcon-search"></text>
				<input v-model="keywords" :adjust-position="false" type="text" placeholder="搜索楼盘" confirm-type="search" @confirm="handleSearch"></input>
			</view>
		</view>
		<checkbox-group @change="handleChange" class="for-select" :style="{top: isH5?44+uni.upx2px(100)+'px':uni.upx2px(100)+'px'}">
			<data-list r-url="baobeiProjects" ref="list" @data="handleList" :r-data="rData">
				<view class="bg-white padding-sm solid-bottom" v-for="(i, inx) in list" :key="inx">
					<label class="flex">
						<view class="margin-right-sm">
							<checkbox class='round blue' :class="i.checked?'checked':''" :checked="i.checked" :value="`${i.id} ${i.project.name}(${i.company.alias})`"></checkbox>
						</view>
						<view>
							<view class="text-black text-bold">{{i.project.name}}</view>
							<view class="text-gray text-sm">{{i.company.alias}}</view>
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
				keywords: '',
				uni
			}
		},
		computed: {
			...mapState('baobei', ['selProject']),
			...mapState(['isH5']),
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
				for (let i = 0, lenI = this.list.length; i < lenI; ++i) {
					this.list[i].checked = false
					for (let j = 0, lenJ = this.sels.length; j < lenJ; ++j) {
						if (this.list[i].id == this.sels[j].split(' ')[0]) {
							this.list[i].checked = true
							break
						}
					}
				}
				this.list = this.list.map(i => i)
			},
			handleSave() {
				if (!this.sels.length) {
					uni.showToast({
						title: '至少选择一个楼盘报备',
						icon: 'none'
					})
					return
				}
				let arr = [...this.selProject]
				for (let i of this.sels) {
					let [id, text] = i.split(' ')
					if (this.selProject.findIndex(item => item.id == id) === -1) {
						arr.push({
							id, text
						})
					}
				}
				this.setSelProject(arr)
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

<style lang="scss">
	.for-select{
		position: fixed;
		left: 0;
		right: 0;
		bottom: 104rpx;
	}
</style>

