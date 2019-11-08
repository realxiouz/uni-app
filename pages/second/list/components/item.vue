<template>
	<view class="bg-white padding solid-bottom" @tap="toDetail(bean.id)">
		<view class="flex">
			<view style="position:relative;width:280upx;height:210upx;" class="margin-right-sm">
				<image :src="bean.imgs[0]" mode="" style="width: 100%;height: 100%;"></image>
			</view>
			<view class="flex flex-direction justify-between flex-sub">
				<view>
					<view class="margin-bottom-xs">
						<text class="text-bold text-black text-lg margin-right-xs">{{bean.project_name}}</text>
						<!-- <text class="text-red">{{bean.city.name}}</text> -->
					</view>
					<view class="flex margin-top-xs">
						<view class="cu-tag line-blue small margin-right-xs radius" v-for="(i, inx) in bean.jiaju" :key="inx">{{i}}</view>
					</view>
					<view class="text-gray margin-top-xs">
						<text class="cuIcon cuIcon-locationfill margin-right-xs"></text>
						<text>{{bean.address}}</text>
					</view>
				</view>
				<view class="flex">
					<span>{{bean.shi}}室{{bean.ting}}厅</span>
					<span>{{bean.size}}㎡</span>
				</view>
			</view>
		</view>
		<!-- <view class="margin-top-sm flex justify-between">
			<view class="w23 text-center bg-cyan radius padding-tb-xs padding-lr-xs text-cut">{{bean.fee_view}}</view>
			<view class="w23 text-center radius padding-tb-xs padding-lr-xs text-white" :class="bean.baobei_project.filter(i => i.sell_prize).length ? 'bg-cyan': 'bg-grey'">成交奖</view>
			<view class="w23 text-center radius padding-tb-xs padding-lr-xs text-white" :class="bean.baobei_project.filter(i => i.kan_prize).length ? 'bg-cyan': 'bg-grey'">
				带看奖金</view>
			<view v-if="type === 'public'"class="w23 text-center bg-yellow radius padding-tb-xs padding-lr-xs text-white" @tap="nowChannel">马上报备</view>
			<view v-else class="w23 text-center bg-yellow radius padding-tb-xs padding-lr-xs text-white" @tap.stop="nowChannel">马上报备</view>
		</view> -->
	</view>
</template>

<script>
	import {
		mapMutations,
		mapState
	} from 'vuex';
	export default {
		props: {
			bean: {
				type: Object
			},
			type: {
				type: String
			}
		},
		data: _ => ({}),
		methods: {
			...mapMutations('baobei', ['setDaikan', 'setSelProject', 'setSelCustomer']),
			toDetail(id) {
				uni.navigateTo({
					url: `/pages/second/detail/index?id=${id}`
				})
			},
			nowChannel(e) {
				if (this.type === 'public'){
					return false;
				}
				let baobei_project = this.bean.baobei_project;
				const self = this;
				if (!baobei_project.length) return false;
				if (baobei_project.length === 1) {
					self.handleJump(0);
					return false;
				}
				let itemList = [];
				for (let item of baobei_project) {
					itemList.push(item.company.name);
				}
				uni.showActionSheet({
					itemList: itemList,
					success(res) {
						let index = res.tapIndex;
						self.handleJump(index);
					}
				})
			},
			handleJump(index) {
				let item = this.bean.baobei_project[index];
				this.setDaikan({
					name: this.userInfo.name,
					phone: this.userInfo.mobile
				});
				this.setSelCustomer([{
					name: '',
					phone: ''
				}]);
				this.setSelProject([{
					id: item.id,
					text: `${this.bean.name}(${item.company.alias})`
				}]);
				uni.navigateTo({
					url: `/pages/baobei/bean/index`
				})
			}
		},
		computed: {
			...mapState(['userInfo']),
            ...mapState('project', ['shopId']),
			label() {
				let c = new Set();
				for (let i of this.bean.house_types) {
					c.add(i.house_using_type.title)
				}
				return [...c].slice(0, 3);
			}
		},
		mounted() {

		}
	}
</script>

<style lang="scss" scoped>
	.w23 {
		width: 23%;
	}
    .bg-grey {
        background-color: #ddd;
    }
</style>
