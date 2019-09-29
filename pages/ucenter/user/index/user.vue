<template>
    <view>
        <form @submit="submitForm">
            <view class="cu-form-group margin-top">
                <view class="title">
                    <text class="text-red">*</text>
                    姓名
                </view>
                <input name="name" v-model="editUserInfo.name"></input>
            </view>
            <view class="cu-form-group">
                <view class="title">
                    <text class="text-red">*</text>
                    公司名称
                </view>
                <input name="companyname" v-model="editUserInfo.companyname"></input>
            </view>
            <view class="cu-form-group get-phone">
                <view class="title">
                    <text class="text-red">*</text>
                    手机
                </view>
                <input name="phone" v-model="editUserInfo.phone" maxlength="11"></input>
                <!--#ifdef MP-WEIXIN-->
                <get-phone @get-phone="getPhone" v-if="!currentLoginUserInfo.phone"/>
                <!--#endif-->
            </view>
            <view class="cu-form-group">
                <view class="title">
                    <text class="text-red">*</text>
                    职位
                </view>
                <input name="position" v-model="editUserInfo.position"></input>
            </view>
            <view class="cu-form-group">
                <view class="title">微信绑定手机号</view>
                <input name="mobile" v-model="editUserInfo.mobile"></input>
            </view>
            <view class="cu-form-group">
                <view class="title">邮箱</view>
                <input name="email" v-model="editUserInfo.email"></input>
            </view>
            <view class="cu-form-group">
                <view class="title">微信号</view>
                <input name="weixin" v-model="editUserInfo.weixin"></input>
            </view>
            <view class="cu-form-group">
                <view class="title">我的签名</view>
                <input name="signature" v-model="editUserInfo.signature"></input>
            </view>
            <view class="cu-form-group text-center">
                <button form-type="submit" class="cu-btn round bg-cyan subbtn">提交信息</button>
            </view>
        </form>
    </view>
</template>

<script>
    import {mapState, mapMutations} from 'vuex';
    import getPhone from '../../get-phone/get-phone';
    export default {
        data() {
            return {
                editUserInfo: {
                    name: '',
                    companyname: '',
                    phone: '',
                    position: '',
                    mobile: '',
                    email: '',
                    weixin: '',
                    signature: ''
                }
            }
        },
        onLoad() {
            let centerLet = JSON.stringify(this.currentLoginUserInfo);
            this.editUserInfo = JSON.parse(centerLet);
        },
        methods: {
            ...mapMutations('ucenter', ['changeCurrentLoginUserInfo']),
            submitForm() {
                const self = this;
                const editUserInfo = this.editUserInfo;
                let name = editUserInfo.name;
                let companyName = editUserInfo.companyname;
                let phone = editUserInfo.phone;
                let position = editUserInfo.position;
                // 必填判断
                if (!name) {
                    uni.showToast({
                        title: '用户名不能为空',
                        icon: 'none',
                        duration: 1000
                    });
                    return false;
                }
                if (!companyName) {
                    uni.showToast({
                        title: '公司名称不能为空',
                        icon: 'none',
                        duration: 1000
                    });
                    return false;
                }
                if (!phone) {
                    uni.showToast({
                        title: '手机号不能为空',
                        icon: 'none',
                        duration: 1000
                    });
                    return false;
                }
                if (!position) {
                    uni.showToast({
                        title: '职位不能为空',
                        icon: 'none',
                        duration: 1000
                    });
                    return false;
                }
				uni.showLoading({
					title: '提交中'
				});
				this.$http('geren/addcard', this.editUserInfo).then(res => {
                    uni.hideLoading();
					// 保存成功
					self.changeCurrentLoginUserInfo(res.data);
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
					uni.hideLoading();
				})
            },
            getPhone(res) {
                this.$set(this.editUserInfo, 'phone', res.purePhoneNumber);
            }
        },
        components: {
            getPhone
        },
        computed: {
			...mapState('ucenter', ['currentLoginUserInfo'])
        }
    }
</script>

<style lang="css">
    @import 'user.css';
</style>
