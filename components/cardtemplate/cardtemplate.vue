<template>
	<view>
		<view class="cardtemplate" v-if="!isShowList">
			<child-com style="width: 700rpx" :current-user-info="currentInfo" :num="currentInfo.template_id || 0"></child-com>
		</view>

		<form v-else style="display: block;">
			<view class="cardtemplate">
				<radio-group class="block" @change="changed">
					<view @tap="changed" v-for="(item, index) of tem" :key="index" class="list-box" rol="radiogroup" :data-list="index">
						<label class="radiu">
							<radio class="rd" :checked="item.checked" value="index"></radio>
						</label>
						<child-com style="width: 650rpx;" :current-user-info="currentInfo" :num="index"></child-com>
					</view>
				</radio-group>
			</view>
		</form>
	</view>
</template>

<script>
	import childCom from '@/components/cardtemplate/child-com.vue';
	import {mapState, mapMutations} from 'vuex';
	export default {
		props: {
			isShowList: {
				type: Boolean,
				required: true
			},
            isPreview: {
			    type: Boolean,
                default: false
            },
            relayOn: {
			    type: Boolean
            },
            personal: {
			    type: [Number, String]
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
		watch: {
            relayOn() {
                if (this.isPreview) {
                    this.changeCurrentInfo(this.currentLoginUserInfo);
                } else {
                    let data = Reflect.has(this.currentUserInfo, 'id')? this.currentUserInfo: this.currentLoginUserInfo;
                    if (this.personal === 1) data = this.currentLoginUserInfo;
                    this.changeCurrentInfo(data);
                }
                this.changeImg({key: 'img_avatar', url: ''});
                this.changeImg({key: 'img_bg', url: ''});
            }
        },
		beforeMount() {
		    let route = this.getCurPage().route;
		    // 这里必须要有, 不然可能会当前用户赋值不上
            if (!/pages\/ucenter\/businesscard\/index\/businesscard/.test(route)) {
                this.changeCurrentInfo(this.currentLoginUserInfo);
                this.changeImg({key: 'img_bg', url: ''});
                this.changeImg({key: 'img_avatar', url: ''});
            }
			if (!this.isShowList) return false;
			for (let i = 0; i < this.templateNum; i++) {
				this.curr.push({
					value: `模板${i}`,
					checked: false
				})
			}
			let num = this.currentLoginUserInfo.template_id;
			this.tem = JSON.parse(JSON.stringify(this.curr));
			this.tem[num||0]['checked'] = true;
			// 设置当前背景为已选中状态
		},
		methods: {
			...mapMutations('ucenter', ['changeCurrentInfo', 'changeImg', 'changeCurrentLoginUserInfo']),
			changed(e) {
				let index = e.detail.value || e.currentTarget.dataset.list;
				this.tem[index].checked  = true;
				uni.showLoading({
					title: '保存中',
					mask: true
				});
				this.$http('geren/uptemplate', {templateId: index}).then(res => {
                    uni.hideLoading();
                    if (res.msg === '请先编辑名片') {
                        uni.showToast({
                            title: '修改失败, 请先编辑名片...',
                            duration: 2000,
                            icon: 'none',
                            mask: true
                        });
                        return false;
                    }
                    this.changeCurrentLoginUserInfo({template_id: index});
                    this.changeCurrentInfo(Object.assign({}, this.currentInfo, {template_id: index}));
					this.changeImg({key: 'img_bg', url: ''});
                    uni.showToast({
                        title: '修改成功...',
                        duration: 1000,
                        mask: true
                    });
                    setTimeout(() => {
                        uni.navigateBack({
                            delta: 1
                        });
                    }, 1200);
                }).catch(err => {
                    console.log(err);
                    uni.hideLoading();
				})
			},
            getCurPage() {
			    let pages = getCurrentPages();
			    return pages[pages.length -1];
            }
		},
		computed: {
			...mapState('ucenter', ['currentLoginUserInfo', 'currentUserInfo', 'currentInfo'])
		},
		mounted() {}
	}
</script>

<style lang="scss">
	@import './index.scss';
</style>
