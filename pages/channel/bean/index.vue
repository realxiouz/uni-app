<template>
	<view>
		<form>
			<view class="cu-form-group margin-top">
				<view class="title">渠道公司名称</view>
				<input placeholder="输入渠道公司名称" v-model="formBean.name"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">渠道公司社会信用码</view>
				<input placeholder="输入渠道公司社会信用码" v-model="formBean.code"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">类型</view>
				<single-picker :range="types" v-model="formBean.type" value-key="type"/>
			</view>
			
			<view class="cu-form-group">
				<view class="title">
					选择省市
				</view>
				<pcd :level="2" v-model="pcd"/>
			</view>
			<view class="cu-form-group">
				<view class="title">公司地址</view>
				<input placeholder="输入公司地址" v-model="formBean.address"></input>
			</view>
			<template v-if="formBean.linkman">
				<view class="cu-form-group">
					<view class="title">联系人</view>
					<input placeholder="输入联系人名称" v-model="formBean.linkman.name" :maxlength="11"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">联系人电话</view>
					<input placeholder="输入联系人电话" v-model="formBean.linkman.phone" :maxlength="11"></input>
				</view>
			</template>
			<save @save="handleSave" :loading="formLoading"/>
		</form>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import save from "@/components/buttom-button"
	import Ava from '@/components/avatar'
	import Rate from '@/components/rate'
	import Pcd from '@/components/pcd'
	import SinglePicker from '@/components/single-picker'
	
	import {
		RULES as r
	} from '@/utils/const'

	export default {
		onLoad(opt) {
			this.$http('company/canCreateCompanyTypes').then(r => {
				this.types = r
			})
			
			opt.id && this.$http(`channel/${opt.id}`).then(r => {
				this.formBean = {
					id: opt.id,
					name: r.data.name || '',
					code: r.data.code || '',
					type: r.data.type.key || '',
					address: r.data.address || '',
				}
				this.pcd = [r.data.city.province_id, r.data.city.id]
			})
		},
		data: _ => ({
			formLoading: false,
			formBean: {
				name: '',
				code: '',
				type: '',
				province_id: '',
				city_id: '',
				address: '',
				invitation_id: '',
				linkman: {
					name: '',
					phone: ''
				},
				is_master: true
			},
			types: [],
			pcd: [],
		}),
		methods: {
			...mapMutations('customer', ['setSelEmployee']),
			handleSave() {
				this.formBean.invitation_id = this.userInfo.id
				this.formLoading = true
				
				let url = this.formBean.id ? `channel/${this.formBean.id}` : 'channel'
				let method = this.formBean.id ? `put` : 'post'
				this.$http(url, this.formBean, method).then(r => {
					uni.navigateBack()
				}).finally(_ => {
					this.formLoading = false
				})
			},
		},
		components: {
			save,
			Ava,
			Rate,
			Pcd,
			SinglePicker
		},
		computed: {
			...mapState('customer', ['selEmployee']),
			...mapState(['userInfo'])
		},
		watch: {
			pcd: {
				handler(val) {
					if(val.length === 2) {
						this.formBean.province_id = val[0]
						this.formBean.city_id = val[1]
					}
				}
			}
		}
	}
</script>
