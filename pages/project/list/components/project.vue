<template>
	<view class="bg-white padding solid-bottom" @tap="toDetail(bean.id)">
		<view class="flex">
			<view style="display:flex;position:relative;justify-content:center; align-items:center;width:280upx;height:210upx;" class="margin-right-sm">
				<image :src="bean.img" v-if="bean.img" mode="" style="width: 100%;height: 100%;"></image>
				<image :src="projectDefaultImg" v-else mode="" style="width: 50%;height: 50%;"></image>
				<view class="cu-tag bg-blue radius" style="position:absolute;right:0;top:0;" v-if="bean.status_name">{{bean.status_name}}</view>
				<view v-if="bean.type === 'normal'" class="cu-tag bg-blue radius" style="position:absolute;left:0;top:0;background: #FF0000;margin-left: 0;">备</view>
			</view>
			<view class="flex flex-direction justify-between flex-sub">
				<view>
					<view class="margin-bottom-xs">
						<text class="text-bold text-black text-lg margin-right-xs">{{bean.name || ''}}</text>
						<text class="text-red">{{bean.city.name || '未知'}}</text>
					</view>
					<!-- <view>
							<view>
								<text class="text-gray">报备渠道：</text>
								<text>{{bean.baobei_project_infos.join('、')}}</text>
							</view>
						</view> -->
					<view class="flex margin-top-xs">
						<view class="cu-tag line-blue small margin-right-xs radius" v-for="(i, inx) in label" :key="inx" v-if="i">{{i}}</view>
					</view>
					<view class="text-gray margin-top-xs">
						<text class="cuIcon cuIcon-locationfill margin-right-xs"></text>
						<text>{{bean.address || ''}}</text>
					</view>
				</view>
				<view class="text-red">
					<text class="text-xxl text-bold">{{bean.avg_price || ''}}</text>
					<text>元/㎡</text>
				</view>
			</view>
		</view>
		<view class="margin-top-sm flex justify-between">
			<view class="w23 text-center bg-cyan radius padding-tb-xs padding-lr-xs text-cut" v-if="bean.fee_view">{{bean.fee_view}}</view>
			<view class="w23 text-center bg-cyan radius padding-tb-xs padding-lr-xs text-cut bg-grey" v-else>佣金0</view>
			<view class="w23 text-center radius padding-tb-xs padding-lr-xs text-white" :class="bean.baobei_project.filter(i => i.sell_prize).length ? 'bg-cyan': 'bg-grey'">成交奖</view>
			<view class="w23 text-center radius padding-tb-xs padding-lr-xs text-white" :class="bean.baobei_project.filter(i => i.kan_prize).length ? 'bg-cyan': 'bg-grey'">
				带看奖金</view>
			<view class="w23 text-center bg-yellow radius padding-tb-xs padding-lr-xs text-white" @tap.stop="nowChannel">{{btnContent()}}</view>
			<!--<view v-else class="w23 text-center bg-yellow radius padding-tb-xs padding-lr-xs text-white" @tap.stop="nowChannel">{{bean.type === 'normal'? '马上报备': '查看详情'}}</view>-->
		</view>
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
			    let until = this.shopId? `&company_id=${this.shopId}`: '';
				uni.navigateTo({
					url: `/pages/project/detail/index?id=${id}&type=${this.type}` + until
				})
			},
			nowChannel(e) {
				if (this.type === 'public'){
                    if (this.bean.type === 'template') {
				        this.$http(`project/copy/${this.bean.id}`).then(res => {
                            uni.showToast({
                                title: '该楼盘已添加至公司线下楼盘...',
                                icon: 'none',
                                duration: 2500
                            })
                        })
                    }
                    this.toDetail(this.bean.id);
					return false;
				}
				if (this.bean.type === 'template') {
                    this.toDetail(this.bean.id);
                    return false;
                }
				let baobei_project = this.bean.baobei_project;
                const self = this;
				if (!baobei_project.length) {
				    this.toDetail(this.bean.id);
				    return false;
                }
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
				let bracket = `(${item.company.alias})`;
				let alias = item.company.alias? bracket: '';
				this.setSelProject([{
					id: item.id,
					text: `${this.bean.name}${alias}`
				}]);
				uni.navigateTo({
					url: `/pages/baobei/bean/index`
				})
			},
            btnContent() {
			    let content = '';
			    let type = this.bean.type;
			    content = this.type !== 'public'?
                    (type === 'normal'? '马上报备': '查看详情'):
                    (type === 'template'? '加载楼盘': '申请合作');
			    return content;
            }
		},
		computed: {
			...mapState(['userInfo', 'projectDefaultImg']),
            ...mapState('work', ['shopId']),
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
