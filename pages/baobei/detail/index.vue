<template>
	<view class="q-fixed" :style="{top: isH5?'44px':'0', bottom: 0}">
		<data-list ref="list" @data="handleList" :r-url="rUrl" :r-data="rData">
			<view class="cu-steps bg-white padding-sm">
				<view class="cu-item" :class="inx>stepInx?'':'text-blue'" v-for="(i, inx) in steps" :key="inx">
					<text class="num">{{inx+1}}</text> {{i}}
				</view>
			</view>
			
			<view class="cu-card">
				<view class="cu-item shadow padding-sm">
					<view class="margin-bottom-sm">
						<text class="text-gray baobei-label">楼盘名称:</text>
						<text v-if="bean.baobei_project">{{bean.baobei_project.project.name}}</text>
					</view>
					<view class="margin-bottom-sm">
						<text class="text-gray baobei-label">客户姓名:</text>
						<text>{{bean.customer_name}}({{bean.customer_sex}})</text>
					</view>
					<view class="margin-bottom-sm">
						<text class="text-gray baobei-label">客户电话:</text>
						<text>{{bean.customer_phone_display}}</text>
					</view>
					<view class="margin-bottom-sm">
						<text class="text-gray baobei-label">带看姓名:</text>
						<text>{{bean.daikan_name}}</text>
					</view>
					<view class="margin-bottom-sm">
						<text class="text-gray baobei-label">带看电话:</text>
						<text>{{bean.daikan_phone}}</text>
					</view>
					<view class="margin-bottom-sm">
						<text class="text-gray baobei-label">报备时间:</text>
						<text>{{bean.created_at|moment('from')}}</text>
					</view>
					<view class="margin-bottom-sm">
						<text class="text-gray baobei-label">带看时间:</text>
						<text>{{bean.ordered_time|moment('from')}}</text>
					</view>
					
					<view>
						<button class="cu-btn bg-cyan small shadow" @click="handleConfirm">带看确认</button>
					</view>
				</view>
			</view>
			
			<view
				class="padding-sm bg-white solid-bottom"
				v-for="(i, inx) in list"
				:key="inx"
			>
				<view>
					<text class="text-gray baobei-label">操作人:</text>
					<text>{{i.user.name}}</text>
				</view>
				<view class="margin-tb-sm">
					<text class="text-gray baobei-label">类型:</text>
					<text>{{i.action}}</text>
				</view>
				<view>
					<text class="text-gray baobei-label">时间:</text>
					<text>{{i.created_at|moment('from')}}</text>
				</view>
			</view>
		</data-list>
	</view>
</template>

<script>
	import DataList from '@/components/data-list'
	import { mapState } from 'vuex'
	
	export default {
		onLoad(opt) {
			this.id = opt.id
			this.rData = {baobei_id: this.id},
			this.$http(`baobei/${this.id}`).then(r => {
				this.bean = r.data
				this.calcStep(this.bean.status)
			})
			this.$nextTick(_ => {
				this.$refs.list.getData()
			})
		},
		data() {
			return {
				id: '',
				bean: {},
				rData: null,
				rUrl: 'baobei-status-log',
				list: [],
				steps: ['待确认', '初步确认', '带看', '成交'],
				stepInx: -1
			}
		},
		methods: {
			handleList(l) {
				this.list = l
			},
			calcStep(status) {
				switch (status){
					case 0:
					case 8:
					case 10:
					case 11:
						this.stepInx = 0 
						break;
					case 1:
						this.stepInx = 1 
						break;
					case 4:
						this.stepInx = 2 
						break;
					case 6:
					case 7:
						this.stepInx = 3 
						break;
					case 2:
					case 3:
					case 5:
					case 9:
						this.stepInx = -1 
						break;
					default:
						break;
				}
			},
			handleConfirm() {
				uni.navigateTo({
					url: `/pages/baobei/daikan/index`
				})
			}
		},
		components: {
			DataList
		},
		computed: {
			...mapState(['isH5'])
		}
	}
</script>

<style>
	.baobei-label{
		width: 5em;
		display: inline-block;
	}
</style>
