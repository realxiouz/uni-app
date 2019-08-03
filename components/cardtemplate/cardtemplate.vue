<template>
	<view>
		<view class="cardtemplate" v-if="!isShowList">
			<child-com :user="currentuserinfo"  style="width: 700rpx" :num="currentuserinfo.template_id || 0"></child-com>
		</view>

		<form v-else style="display: block;">
			<view class="cardtemplate">
				<radio-group class="block" @change="changed">
					<view @tap="changed" v-for="(item, index) of tem" :key="index" class="list-box" rol="radiogroup" :data-list="index">
						<label class="radiu">
							<radio class="rd" :checked="item.checked" :value="index"></radio>
						</label>
						<child-com :user="currentuserinfo" style="width: 650rpx;" :num="index"></child-com>
					</view>
				</radio-group>
			</view>
		</form>
	</view>
</template>

<script>
	import {BASE_URL} from '../../utils/const.js';
	import childCom from './child-com.vue';
	import {header} from '../../utils/global-data';
	import {mapState, mapMutations} from 'vuex';
	export default {
		props: {
			user: {
				type: Object,
				default() {
					return {};
				}
			},
			isShowList: {
				type: Boolean,
				required: true
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
			}
		},
		onReady() {
			if (!this.isShowList) return false;
			for (let i = 0; i < this.templateNum; i++) {
				this.curr.push({
					value: `模板${i}`,
					checked: false
				})
			}
			let num = this.currentuserinfo.template_id;
			this.tem = JSON.parse(JSON.stringify(this.curr));
			this.tem[num]['checked'] = true;
			// 设置当前背景为已选中状态
		},
		methods: {
			...mapMutations(['changeCurrentUserInfo']),
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
					header: header(self.token),
					success: (res) => {
						this.changeCurrentUserInfo({template_id: index});
						uni.navigateBack({
							delta: 1
						})
					},
					fail(res) {

					},
					complete() {
						uni.hideLoading();
					}
				});
			}
		},
		computed: {
			...mapState(['token', 'currentuserinfo'])
		}
	}
</script>

<style lang="scss">
	@import './index.scss';
</style>
