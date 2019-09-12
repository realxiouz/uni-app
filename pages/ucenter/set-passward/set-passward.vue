<template>
	<view class="wrap">
        <form style="display: block">
            <view class="input">
                <!--#ifndef MP-WEIXIN-->
                <view class="input-box">
                    <view>
                        <input class="uni-input" :password="this.newPassWordIcon === 'attentionforbidfill'" type="text" placeholder="旧密码" v-model="oldPassWord"/>
                    </view>
                    <view :class="['cuIcon-' + newPassWordIcon, 'text-gray']" data-index="1"></view>
                </view>
                <view class="input-box">
                    <view>
                        <input class="uni-input" :password="this.oldPassWordIcon === 'attentionforbidfill'" type="text" placeholder="新密码" @blur="checkPassword" v-model="newPassWord"/>
                    </view>
                    <view :class="['cuIcon-' + oldPassWordIcon, 'text-gray']" data-index="2" @tap="showEndHide"></view>
                </view>
                <view class="input-box">
                    <view>
                        <input class="uni-input" :password="this.againPassWordIcon === 'attentionforbidfill'" type="text" placeholder="请再一次输入新密码" @blur="checkPassword" v-model="againPassWord"/>
                    </view>
                    <view :class="['cuIcon-' + againPassWordIcon, 'text-gray']" data-index="3" @tap="showEndHide"></view>
                </view>
                <!--#endif-->
                <!--#ifdef MP-WEIXIN-->
                <input class="uni-input" password type="text" placeholder="旧密码" v-model="oldPassWord" />
                <input class="uni-input" password type="text" placeholder="新密码" v-model="newPassWord" @blur="checkPassword" />
                <input class="uni-input" password type="text" placeholder="请在输入一次密码" v-model="againPassWord" @blur="checkPassword" />
                <!--#endif-->
            </view>
            <view class="message">
                {{msg}}
            </view>
            <view class="btn">
                <button type="warn" form-type="reset" @tap="msg = ''">重置</button>
                <button type="primary" @tap="setPassWord">修改</button>
            </view>
        </form>
	</view>
</template>

<script>
    import {mapState, mapMutations} from 'vuex';
	export default {
		data() {
			return {
                msg: '',
                newPassWord: '',
                againPassWord: '',
                oldPassWord: '',
                isTrue: false,
                newPassWordIcon: 'attentionforbidfill',
                againPassWordIcon: 'attentionforbidfill',
                oldPassWordIcon: 'attentionforbidfill'
			}
		},
		methods: {
		    ...mapMutations(['logout']),
            checkPassword() {
                let againPassWord = this.againPassWord;
                let newPassWord = this.newPassWord;
                if (againPassWord && newPassWord) {
                    if (againPassWord !== newPassWord) {
                        this.msg = '两次密码输入的不一致'
                    } else {
                        this.msg = '';
                        this.isTrue = true;
                    }
                }
            },
            showEndHide(e) {
                let currentIndex = e.currentTarget.dataset.index;
                switch (Number(currentIndex)) {
                    case 1: {
                        this.newPassWordIcon = this.newPassWordIcon === 'attentionforbidfill'? 'attentionfill': 'attentionforbidfill';
                    }
                    break;
                    case 2: {
                        this.oldPassWordIcon = this.oldPassWordIcon === 'attentionforbidfill'? 'attentionfill': 'attentionforbidfill';
                    }
                    break;
                    case 3: {
                        this.againPassWordIcon = this.againPassWordIcon === 'attentionforbidfill'? 'attentionfill': 'attentionforbidfill';
                    }
                }
            },
            setPassWord() {
                if (!this.oldPassWord) {
                    this.msg = '旧密码不可以为空';
                    return false;
                }
                this.msg = '';
                if (this.isTrue) {
                    this.$http(`employee/set-password/${this.userInfo.id}`, {
                        old_password: this.oldPassWord,
                        password: this.newPassWord,
                        password_confirmation: this.againPassWord
                    }, 'post').then(res => {
                        if (res.message) {
                            uni.showToast({
                                title: res.message,
                                duration: 1000,
                                mask: true
                            });
                            this.logout();
                            setTimeout(function() {
                                uni.navigateTo({
                                    url: '/pages/public/login/index'
                                })
                            }, 1200);
                        } else if (res.errors.password[0]) {
                            uni.showToast({
                                title: res.errors.password[0],
                                icon: 'none',
                                duration: 1000,
                                mask: true
                            });
                        }
                    })
                }
            }
		},
        computed: {
		    ...mapState(['userInfo'])
        }
	}
</script>

<style scoped lang="scss">
    .wrap {
        padding: 20rpx;
        input {
            height: 80rpx;
            padding-left: 10rpx;
            border-bottom: 1px solid #ccc;
            margin-bottom: 20rpx;
            font-size: 18px;
        }
        .input-box {
            display: flex;
            align-items: center;
            flex-wrap: nowrap;
            width: 100%;
            view:nth-child(1) {
                flex: 1;
                input {
                    width: 100%;
                }
            }
            view:nth-child(2) {
                width: 40rpx;
                font-size: 20px;
                text-align: center;
            }
        }
        .message {
            height: 90rpx;
            color: red;
        }
        .btn {
            width: 48%;
            padding: 0;
            margin: auto;
            font-size: 15px;
            button {
                display: inline-block;
                width: 150rpx;
                height: 60rpx;
                line-height: 1.8;
                margin-right: 20rpx;
            }
        }
    }
</style>
