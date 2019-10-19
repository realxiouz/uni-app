<template>
	<view>
		<form>
			<view class="cu-form-group margin-top" v-if="type==0">
				<view class="title">选择员工</view>
				<multi-picker v-model="ids" :range='es' range-key="name"/>
			</view>
			<view class="cu-form-group margin-top"  v-if="type==1">
				<view class="title">选择公司</view>
				<single-picker v-model="id" :range='cs' range-key="name"/>
			</view>
			
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
	import SinglePicker from "@/components/single-picker"
	import MultiPicker from "@/components/multi-picker"
	
	export default {
		onLoad(opt) {
		    this.type = opt.type
			this.cId = opt.cId
			if (this.type == 0) {
				uni.setNavigationBarTitle({
					title: '内部分享'
				})
				this.$http('contacts')
					.then(r => {
						this.es = r
					})
			}
			
			if (this.type == 1) {
				uni.setNavigationBarTitle({
					title: '外部分享'
				})
				this.$http('company/list?show_type=share_cooperation&per_page=100')
					.then(r => {
						this.cs = r.data
					})
			}
		},
		data: _ => ({
			type: '',
			cId: '',
			formLoading: false,
			ids: [],
			es: [],
			id: '',
			cs: []
		}),
		methods: {
			...mapMutations('customer', ['setSelEmployee']),
			handleSave() {
				this.formLoading = true
				let data = {
					customer_id: this.cId
				}
				if(this.type == 0) data.user_ids = this.ids
				if(this.type == 1) data.employee_id = this.id
				this.$http('customer-share', data, 'post').then(r => {
					uni.navigateBack()
				}).finally(_ => {
					this.formLoading = false
				})
			}
		},
		components: {
			save, SinglePicker, MultiPicker
		},
	}
</script>
