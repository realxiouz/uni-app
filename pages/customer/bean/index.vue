<template>
	<view>
		<form action="">
			<view class="cu-form-group margin-top">
				<view class="title">姓名</view>
				<input placeholder="输入姓名" v-model="formBean.name"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">电话</view>
				<input placeholder="输入电话号码" v-model="formBean.phone"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">性别</view>
				<picker @change="sexChange" :value="sexInx" :range="sexs" range-key="text">
					<view class="picker">
						{{sexInx>-1?sexs[sexInx].text:'选择性别'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">微信</view>
				<input placeholder="输入微信" v-model="formBean.weixin"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">QQ</view>
				<input placeholder="输入QQ" v-model="formBean.qq"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">客户分类</view>
				<picker @change="typeChange" :value="typeInx" :range="types">
					<view class="picker">
						{{typeInx>-1?types[typeInx]:'选择分类'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">备用电话</view>
				<input placeholder="输入备用电话" v-model="formBean.phone_reserve"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">来源</view>
				<picker @change="sourceChange" :value="sourceInx" :range="sources">
					<view class="picker">
						{{sourceInx>-1?sources[sourceInx]:'选择来源'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">状态</view>
				<picker @change="statusChange" :value="statusInx" :range="[{text: '有效', value: '0'}, {text: '无效', value: '8'}]" range-key="text">
					<view class="picker">
						{{statusInx>-1?[{text: '有效', value: '0'}, {text: '无效', value: '8'}][statusInx]:'选择状态'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">职业</view>
				<picker @change="jobChange" :value="jobInx" :range="jobs" range-key="text">
					<view class="picker">
						{{jobInx>-1?jobs[jobInx]:'选择职业'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">年纪</view>
				<picker @change="ageChange" :value="ageInx" :range="ages" range-key="text">
					<view class="picker">
						{{ageInx>-1?ages[jobInx]:'选择年纪'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">现居地址</view>
				<addressd @changes="selAddress1"></addressd>
			</view>
			<view class="cu-form-group">
				<view class="title">现住址</view>
				<input placeholder="输入现住址" v-model="formBean.current_address"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">户籍</view>
				<addressd @changes="selAddress2"></addressd>
			</view>
			<view class="cu-form-group">
				<view class="title">客户星级</view>
				<picker @change="starChange" :value="startInx" :range="startInx" range-key="text">
					<view class="picker">
						{{startInx>-1?startInx[startInx]:'选择年纪'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group"></view>
			<save @save="handleSave" />
		</form>
	</view>
</template>

<script>
	import addressd from "@/components/jm-address"
	import save from "@/components/buttom-button"
	import { RULES as r} from '@/utils/const'

	export default {
		data: _ => ({
			formBean: {
				name: '',
				phone: '',
				sex: '',
			},
			sexs: [
				{text: '男', value: '1'},
				{text: '女', value: '2'},
			],
			sexInx: -1,
			
			types: ['初步接触','有意向','已看房','已成交'],
			typeInx: -1,
			
			sources: [],
			sourceInx: -1,
			
			statusInx: -1,
			
			jobs: [],
			jobInx: -1,
			
			ages: [],
			ageInx: -1,
			
			stars: [],
			starInx: -1
		}),
		methods: {
			sexChange(e) {
				this.sexInx = e.detail.value
			},
			typeChange(e) {
				this.typeInx = e.detail.value
			},
			sourceChange(e) {
				this.sourceInx = e.detail.value
			},
			statusChange(e) {
				this.statusInx = e.detail.value
			},
			jobChange(e) {
				this.jobInx = e.detail.value
			},
			ageChange(e) {
				this.ageInx = e.detail.value
			},
			starChange(e) {
				this.starInx = e.detail.value
			},
			
			selAddress1(e) {
				console.log(e)
			},
			selAddress2(e) {
				console.log(e)
			},
			handleSave() {
				if (!r.phone(this.formBean.phone)){
					uni.showToast({
						title: '电话不能为空',
						icon: 'none'
					})
					return
				}
				
				let data = this.formBean
				this.$http('customer', data, 'post').then(r => {
					
				}).catch(e => {
					console.log(e)
				})
			}
		},
		components: {
			addressd, save
		}
	}
</script>

<style>
</style>
