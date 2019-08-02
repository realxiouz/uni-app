<template>
	<view>
		<view class="cardtemplate" v-if="one">
			<child-com :user="user"  style="width: 700rpx" :num="template_id"></child-com>
		</view>

		<form>
			<view class="cardtemplate" v-if="all">
				<radio-group class="block" @change="changed">
					<view @tap="changed" v-for="(item, index) of tem" :key="index" class="list-box" rol="radiogroup" :data-list="index">
						<label class="radiu">
							<radio class="rd" :checked="item.checked" :value="index"></radio>
						</label>
						<child-com :user="user" style="width: 650rpx;" :num="index"></child-com>
					</view>
				</radio-group>
			</view>
		</form>
	</view>
</template>

<script>
	import {BASE_URL} from '../../utils/const.js';
	import childCom from './child-com.vue';
	import {mapState} from 'vuex';
	export default {
		props: {
			templateIndex: {
				// 是否要显示多个(模板和显示共用)
				type: Boolean,
				default: false
			},
			template_id: {
				type: String,
				default: '0'
			},
			user: {
				type: Object,
				default() {
					return {};
				}
			}
		},
		components: {
			childCom
		},
		data() {
			return {
				// 名片显示
				num: 0,
				isShowOn: false,
				all: false,// default false
				one: true,
				tem: [],
				templateNum: 4,
				curr: [],
				index: 0
				// template_id: uni.getStorageSync('currnum')*1 || 0 // 获取模板的下标, 如果没有, 那么默认0, onLoad不会执行此事件
			}
		},
		onReady() {
			// let selectednum = '';
			//读取本地缓存信息
			/*app.userReadyCallback = res => {
				// console.info("userReadyCallback", res);
				this.setData({
					user: res,
					num: res.template_id
				});
				// console.info("this", this.data.user);
			}*/
			let currentuserinfo = uni.getStorageSync('userInfo');
			this.user = this.user.name? this.user: currentuserinfo;
			// this.user = currentuserinfo;
			/*if (this.data.isVisit) {
				if (app.globalData.visituserinfo) {
					// console.log(app.globalData.visituserinfo)
					this.setData({
						user: app.globalData.visituserinfo,
						num: app.globalData.visituserinfo.template_id
					}, () => {
						// console.log(this.data.user)
					});
				}
			} else {
				if (app.globalData.currentuserinfo) {
					this.setData({
						user: app.globalData.currentuserinfo,
						num: app.globalData.currentuserinfo.template_id
					});
				}
			}*/

			for (let i = 0; i < this.templateNum; i++) {
				this.curr.push({
					value: `模板${i}`,
					checked: false
				})
			}
			if (this.templateIndex) {// true  false不添加
				this.all = true;
				this.one = false;
				this.tem = this.curr;
			} else {
				this.all = false;
				this.one = true;
			}
			// 设置当前背景为已选中状态
			/*let currnum = uni.getStorageSync("currnum") | "0";
			this.setData({
				tem: this.data.tem.map(item => {
					if (item.value.slice(2) == currnum) {
						item.checked = true
					}
					return item
				})
			})*/
			//  console.log(this.data.tem)
		},
		methods: {
			changed(e) {
				let index = e.detail.value || e.currentTarget.dataset.list;
				const self = this;
				this.tem[index].checked  = true;
				uni.showLoading({
					title: '保存中',
					mask: true
				})
				uni.request({
					url: BASE_URL + '/api/geren/uptemplate',
					method: 'GET',
					data: {
						templateId: index
					},
					header: {
						"X-Requested-With": "XMLHttpRequest",
						"Authorization": "Bearer " + self.token
					},
					success: (res) => {
						uni.setStorageSync("currnum", index);
						// console.log(res);
						uni.navigateTo({
							url: "../../businesscard/index/businesscard"
						})
					},
					fail(res) {
						// res
						// debugger
					},
					complete() {
						uni.hideLoading();
					}
				});
			},
			choose(e){}
			/*choose(e) {
				const list = e.currentTarget.dataset.list;
				this.data.tem.forEach((ele, index) => {
					var ckd = "tem[" + index + "].checked";
					if (list === index) {

						uni.request({
							url: BASE_URL + 'api/geren/uptemplate',
							header: GLOBALDATA.header(),
							data: {
								templateId: index
							},
							success: (res) => {
								uni.setStorageSync("currnum", index)
								GLOBALDATA.currentuserinfo.template_id = index;
								uni.navigateTo({
									url: " "//////////////////////////////////////
								})
							},
							fail(res) {
								res
								// debugger
							}
						});

						this.setData({
							[ckd]: true
						});

					} else {
						this.setData({
							[ckd]: false
						})
					}
				})
			}*/
		},
		computed: {
			...mapState(['token', 'currentuserinfo'])
		}
	}
</script>

<style lang="scss">
	@import './index.scss';
</style>
