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

					<view v-if="type==='in'">
						<button v-if="canDaikanQueren(bean)" class="cu-btn bg-cyan small shadow margin-right-xs" @click="handleConfirm">带看确认</button>
						<button class="cu-btn bg-cyan small shadow margin-right-xs" v-if="!canDaikanQueren(bean)&&showDaikanList(bean.status)"
						 @click="navDaikan">带看记录</button>
						<template v-if="isShowDoneNot(bean)">
							<picker class="cu-btn bg-cyan small shadow margin-right-xs" range-key="name" :range="employees" @change="handlePass"
							 v-if="canApprove(bean)">
								<view>报备通过</view>
							</picker>
							<button class="cu-btn bg-red small shadow margin-right-xs" v-if="bean.status==2||bean.status==3||bean.status==5||bean.status==9"
							 @click="navReject(bean.id)">驳回</button>
						</template>
					</view>
					<view v-else-if="type==='up'">
						<button class="cu-btn bg-cyan small shadow margin-right-xs" v-if="bean.status ==1 ||bean.status ==3 ||bean.status ==4 ||bean.status ==6 ||bean.status ==7" @click="navDaikan">带看单</button>
					</view>
				</view>
			</view>

			<view class="padding-sm bg-white solid-bottom" v-for="(i, inx) in list" :key="inx">
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
	import {
		mapState
	} from 'vuex'

	export default {
		onLoad(opt) {
			this.id = opt.id
			this.rData = {
					baobei_id: this.id
				}
			this.type = opt.type
			this.$nextTick(_ => {
				this.$refs.list.getData()
			})
		},
		onShow() {
			this.getDetail()
		},
		data() {
			return {
				id: '',
				bean: {},
				rData: null,
				rUrl: 'baobei-status-log',
				list: [],
				steps: ['待确认', '初步确认', '带看', '成交'],
				stepInx: -1,

				type: '',
				employees: [],

				isBaoBeiShenHeRen: false
			}
		},
		methods: {
			handleList(l) {
				this.list = l
			},
			getDetail() {
				this.$http(`baobei/${this.id}`).then(r => {
					this.bean = r.data
					this.calcStep(this.bean.status)

					return this.$http(`employee/receptionEmployees/${r.data.developer_project_id}`)
				}).then(r => {
					r && (this.employees = r)
				})
			},
			calcStep(status) {
				switch (status) {
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
					url: `/pages/baobei/daikan/index?bId=${this.id}`
				})
			},
			navReject(id) {
				uni.navigateTo({
					url: `/pages/baobei/reject/index?id=${id}`
				})
			},
			handlePass(e) {
				let inx = e.detail.value
				let employee_id = this.employees[inx].id
				employee_id && this.$http(`baobei/approve/${this.id}`, {
					employee_id
				}, 'put').then(r => {
					uni.showToast({
						title: r.message,
						icon: 'none'
					})
					this.getDetail()
				})
			},
			navDaikan() {
				uni.navigateTo({
					url: `/pages/baobei/daikan/list?bId=${this.id}`
				})
			},

			canDaikanQueren(item) {

				if (
					item.agent_id === this.userInfo.company_id &&
					item.baobei_project.project.is_agent_can_confirm_daikan === false
				) {
					return false;
				} else {
					if (
						item.status === 1 &&
						item.baobei_project_my.daikan_audit_id === this.userInfo.id
					) {
						return true;
					} else {
						return false;
					}
				}
			},
			canApprove(baobei) {
				let isKaiFaShang = true;
				if (baobei.agent_id === this.userInfo.company_id) {
					isKaiFaShang = false;
				}
				if (baobei.status === 0 || baobei.status === 10) {
					if (isKaiFaShang && this.isBaoBeiShenHeRen) {
						return true;
					} else {
						if (baobei.baobei_project.project.baobei_approve_type === 1) {
							return false;
						} else if (this.isBaoBeiShenHeRen) {
							return true;
						}
					}
				} else if (
					isKaiFaShang &&
					baobei.status === 8 &&
					this.isBaoBeiShenHeRen
				) {
					return true;
				} else {
					return false;
				}
				return false;
			},
			isShowDoneNot(item) {
				let obj = {};
				let find = 0;
				let userId = this.userInfo.id;

				if (item.agent_id === this.userInfo.company_id) {
					obj = item.agent_project || {};
				} else {
					obj = item.developer_project || {};
				}
				if (
					obj.charger_id === userId ||
					obj.qudao_manager_id === userId ||
					obj.qudao_attache_id === userId
				) {
					find++;
				}

				if (obj.audit_user_id != null) {
					for (let i = 0; i < obj.audit_user_id.length; i++) {
						if (userId === parseInt(obj.audit_user_id[i])) {
							find++;
							this.isBaoBeiShenHeRen = true;
							break;
						}
					}
				}

				if (find > 0) {
					return true;
				} else {
					return false;
				}
			},
			showDaikanList(status) {
				if (status === 1 || status === 4 || status === 6 || status === 7) {
					return true;
				} else {
					return false;
				}
			}
		},
		components: {
			DataList
		},
		computed: {
			...mapState(['isH5', 'userInfo'])
		}
	}
</script>

<style>
	.baobei-label {
		width: 5em;
		display: inline-block;
	}
</style>
