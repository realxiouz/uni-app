<template>
	<view>
		<view class="cu-list menu">
			<view class="cu-form-group">
				<view class="title">班次名称</view>
				<input placeholder="最多10个字符" v-model="name" :maxlength="10"></input>
			</view>
		</view>
		<view class="cu-list menu">
			<view class="cu-item">
				<view class="content padding-tb-sm">
					<view class="text-bold margin-bottom-sm">设置该班次一天上下班次数</view>
					<view class="grid col-2">
						<view class="padding-lr-xs">
							<button :class="['cu-btn', 'response', selType==='dayofonce'?'line-blue':'line-gray']" @click="selType='dayofonce'">1天1次上下班</button>
						</view>
						<view class="padding-lr-xs">
							<button :class="['cu-btn', 'response', selType==='dayoftwice'?'line-blue':'line-gray']" @click="selType='dayoftwice'">1天2次上下班</button>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-list menu">
			<view class="cu-form-group">
				<view class="title">上班</view>
				<picker mode="time" :value="t1" start="00:00" end="24:00" @change="handleT1Change">
					<view class="picker">
						{{t1}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">下班</view>
				<picker mode="time" :value="t2" start="00:00" end="24:00" @change="handleT2Change">
					<view class="picker">
						{{t2}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">下班不用打卡</view>
				<switch class="blue" @change="handleNo1Change" :class="no1?'checked':''" :checked="no1"></switch>
			</view>
		</view>
		<view class="cu-list menu">
			<view class="cu-form-group">
				<view class="title">开启午休</view>
				<switch class="blue" @change="handleIsRestChange" :class="isRest?'checked':''" :checked="isRest"></switch>
			</view>
			<template v-if="isRest">
				<view class="cu-form-group">
					<view class="title">午休开始</view>
					<picker mode="time" :value="rest1" start="00:00" end="24:00" @change="handleRest1Change">
						<view class="picker">
							{{rest1}}
						</view>
					</picker>
				</view>
				<view class="cu-form-group">
					<view class="title">午休结束</view>
					<picker mode="time" :value="rest2" start="00:00" end="24:00" @change="handleRest2Change">
						<view class="picker">
							{{rest2}}
						</view>
					</picker>
				</view>
			</template>
		</view>
		<view class="cu-list menu" v-if="selType==='dayoftwice'">
			<view class="cu-form-group">
				<view class="title">上班</view>
				<picker mode="time" :value="t3" start="00:00" end="24:00" @change="handleT3Change">
					<view class="picker">
						{{t3}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">下班</view>
				<picker mode="time" :value="t4" start="00:00" end="24:00" @change="handleT4Change">
					<view class="picker">
						{{t4}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">下班不用打卡</view>
				<switch class="blue" @change="handleNo2Change" :class="no2?'checked':''" :checked="no2"></switch>
			</view>
		</view>

		<view style="height: 60px;"></view>
		<view class="cu-bar foot padding-left-sm padding-right-sm padding-top-sm padding-bottom-sm bg-white">
			<button class="cu-btn bg-blue response" @click="handleSave">保存</button>
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		onLoad(opt) {
			this.tId = opt.id
			this.getTimeDetail()
		},
		data: _ => ({
			name: '',
			t1: '00:00',
			t2: '00:00',
			t3: '00:00',
			t4: '00:00',
			no1: false,
			no2: false,

			isRest: false,
			rest1: '00:00',
			rest2: '00:00',

			tId: 0,

			selType: 'dayofonce'
		}),
		methods: {
			handleT1Change(e) {
				this.t1 = e.detail.value
			},
			handleT2Change(e) {
				this.t2 = e.detail.value
			},
			handleNo1Change(e) {
				this.no1 = e.detail.value
			},
			handleT3Change(e) {
				this.t3 = e.detail.value
			},
			handleT4Change(e) {
				this.t4 = e.detail.value
			},
			handleNo2Change(e) {
				this.no2 = e.detail.value
			},
			handleIsRestChange(e) {
				this.isRest = e.detail.value
			},
			handleRest1Change(e) {
				this.rest1 = e.detail.value
			},
			handleRest2Change(e) {
				this.rest2 = e.detail.value
			},
			handleSave() {
				if (!this.name) {
					uni.showToast({
						title: '必须设置名称',
						icon: 'none'
					})
					return
				}
				let data = {
					name: this.name,
					is_rest: this.isRest,
					rest_starttime: this.isRest ? this.rest1 : null,
					rest_endtime: this.isRest ? this.rest2 : null,
					type: this.selType,
					grade_rules: [{
						startwork_time: this.t1,
						endwork_time: this.t2,
						is_clock: this.no1
					}]
				}
				if (this.selType === 'dayoftwice') {
					data.grade_rules.push({
						startwork_time: this.t3,
						endwork_time: this.t4,
						is_clock: this.no2
					})
				}
				if (this.tId) {
					this.$http(`attendance/grades/${this.tId}`, data, 'put').then(r => {
						uni.showToast({
							title: '班次编辑成功',
							icon: 'none'
						})
						setTimeout(_ => {
							uni.navigateBack()
						}, 1500);
					})
				} else {
					this.$http('attendance/grades', data, 'post').then(r => {
						uni.showToast({
							title: '班次添加成功',
							icon: 'none'
						})
						setTimeout(_ => {
							uni.navigateBack()
						}, 1500);
					})
				}
				
				
			},
			getTimeDetail() {
				if (this.tId) {
					this.$http(`attendance/grades/${this.tId}`).then(r => {
						this.name = r.data.name
						this.selType = r.data.type
						this.isRest = r.data.is_rest
						this.rest1 = r.data.is_rest ? r.data.rest_starttime : '00:00'
						this.rest2 = r.data.is_rest ? r.data.rest_endtime : '00:00'
						this.t1 = r.data.grade_rules[0].startwork_time
						this.t2 = r.data.grade_rules[0].endwork_time
						this.no1 = r.data.grade_rules[0].is_clock
						
						if (r.data.type === 'dayoftwice') {
							this.t3 = r.data.grade_rules[1].startwork_time
							this.t4 = r.data.grade_rules[1].endwork_time
							this.no2 = r.data.grade_rules[1].is_clock
						}
					})
				}
			}
		}
	}
</script>

<style>
</style>
