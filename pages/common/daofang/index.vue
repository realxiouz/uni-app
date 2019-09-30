<template>
	<view>
		<form>
			<view class="cu-form-group">
				<view class="title">实看人数</view>
				<input placeholder="填写是看人数" v-model="formBean.peoples"></input>
			</view>
            <view class="cu-form-group">
                <view class="title">到访日期</view>
                <picker mode="date" :value="date" start="2015-09-01" :end="endDate" @change="dateChange">
                    <view class="picker">
                        {{date?date:'选择日期'}}
                    </view>
                </picker>
            </view>
            <view class="cu-form-group">
                <view class="title">到访时间</view>
                <picker mode="time" :value="time" :end="endTime" @change="timeChange">
                    <view class="picker">
                        {{time?time:'选择时间'}}
                    </view>
                </picker>
            </view>
            <view class="cu-form-group" v-if="type === '分销'">
                <view class="title">关联类型</view>
                <picker mode="selector" :value="typeIndex" :range="relevanceRange" @change="relevanceChange">
                    <view class="picker">
                        {{relevanceRange[typeIndex]}}
                    </view>
                </picker>
            </view>
            <view class="cu-form-group" v-if="typeIndex && type === '分销'">
                <view class="title">{{currentTitle}}</view>
                <picker mode="selector" :value="chargeIndex" :range="currentRange" :range-key="currentKey" @change="chargeChange">
                    <view class="picker">
                        {{currentContent}}
                    </view>
                </picker>
            </view>
			<view class="cu-form-group">
				<textarea :maxlength="200" @input="textareaAInput" placeholder="到访说明"></textarea>
			</view>
			<upload-files @imgs="handleImgs" :max-count="6" :source="['album', 'camera']"/>
		</form>
		
		<save @save="handleSave" :loading="formLoading"/>
	</view>
	
</template>

<script>
	import save from "@/components/buttom-button"
	import UploadFiles from "@/components/upload-files"
    import moment from 'moment';

	export default {
		onLoad(opt) {
			this.customerId = opt.customerId;
			this.type = opt.type;
			if (this.type === '新房') {
			    uni.setNavigationBarTitle({
                    title: '写到访'
                })
            } else if (this.type === '分销') {
                uni.setNavigationBarTitle({
                    title: '写带看'
                });
                this.$http('project?route_type=memo&dataType=get').then(r => {
                    this.ProjectRange = r.data;
                });
                this.$http(`baobei?&dataType=get&customer_id=${this.customerId}`).then(r => {
                    this.baoBeiHistory = r.data;
                })
            }
		},
		data: _ => ({
			formBean: {
				peoples: '',
				remark: ''
			},
            date: '',
            time: '',
            endDate: moment().format('YYYY-MM-DD'),
            endTime: moment().format('HH:MM'),
            startTime: moment().add(1, 'm').format('hh:mm'),
			customerId: '',
			formLoading: false,
            type: '',
            typeIndex: 0,
            relevanceRange: ['不指定', '报备记录', '线下楼盘'],
            ProjectRange: [],
            chargeIndex: -1,
            baoBeiHistory: [],
            currentRange: [],
            currentTitle: '',
            currentKey: '',
            currentContent: '请选择(必选)'
		}),
		methods: {
			textareaAInput(e) {
				this.formBean.remark = e.detail.value
			},
			handleSave() {
				this.formBean.customer_id = this.customerId;
				this.formBean.kan_time = this.date + (this.time? ' ': '') + this.time;
				this.formLoading = true;
				if (this.type === '分销') {
                    if (this.typeIndex === 1) {
                        this.formBean.type = '报备';
                        this.formBean.baobei_id = this.baoBeiHistory[this.chargeIndex].id;
                        Reflect.deleteProperty(this.formBean, 'baobei_project_id')
                    } else if (this.typeIndex === 2) {
                        this.formBean.type = '楼盘';
                        this.formBean.baobei_project_id = this.ProjectRange[this.chargeIndex].id;
                        Reflect.deleteProperty(this.formBean, 'baobei_id')
                    }
                }
				if (this.type === '分销' && this.currentRange[this.chargeIndex] === undefined) {
				    uni.showToast({
                        title: `${this.currentTitle}未选择`,
                        duration: 2000,
                        icon: 'none'
                    });
                    this.formLoading = false;
				    return false;
                }
				this.$http('daikan', this.formBean, 'post').then(r => {
					if (this.type === '分销') {
					    uni.showToast({
                            title: `${r.message}`,
                            icon: 'none',
                            duration: 2000
                        })
                    } else {
                        uni.showToast({
                            title: '表单提交成功'
                        });
                    }
					
					// setTimeout(_ => {
					// 	let pages = getCurrentPages()
					// 	pages[pages.length - 2].setData({
					// 		needRefresh: true
					// 	})
					// 	uni.navigateBack()
					// }, 1500)
					uni.navigateBack()
				}).finally(_ => {
					this.formLoading = false
				})
			},
			handleImgs(e) {
				this.formBean.img = e
			},
            timeChange(e) {
                let chargeTime = e.detail.value;
			    // #ifdef APP-PLUS
                /*let now = moment().format('HH:MM');
                chargeTime = chargeTime.replace('-', ':');
                console.log(now, chargeTime);
                console.log(moment(chargeTime).from(now), '时间比较');*/
                // #endif
                this.time = chargeTime;
            },
            dateChange(e) {
                this.date = e.detail.value;
            },
            relevanceChange(e) {
                this.typeIndex = Number(e.detail.value);
            },
            chargeChange(e) {
			    let index = Number(e.detail.value);
                if (index === -1) {
                    this.currentContent = '请选择(必选)';
                } else {
                    this.currentContent = this.currentRange[index][this.currentKey];
                }
                this.chargeIndex = index;
            }
		},
        watch: {
		    typeIndex(index) {
                if (index === 1) {
                    this.currentRange = this.baoBeiHistory;
                    this.currentTitle = '关联报备';
                    this.currentKey = 'id'
                } else if (index === 2) {
                    this.currentRange = this.ProjectRange;
                    this.currentTitle = '关联楼盘';
                    this.currentKey = 'name'
                }
                this.chargeIndex = -1;
                this.currentContent = '请选择(必选)';
            }
        },
		components: {
			save, UploadFiles
		},
		computed: {
			dateTime() {
				return `${this.date} ${this.time}`
			}
		}
	}
</script>

<style>
</style>
