<template>
    <button :class="['cu-btn', 'bg-cyan', 'small', 'radius', 'shadow', 'margin-right-xs', myStyle? 'my-button': '']" open-type="getPhoneNumber" @getphonenumber="getPhone" :style="myStyle">获取手机号</button>
</template>

<script>
	export default {
	    props: {
	        myStyle: Boolean,
            default: false
        },
        watch: {},
		methods: {
            getPhone(e) {
                if (e.detail.errMsg === 'getPhoneNumber:fail user deny') {
                    uni.showToast({
                        title: '获取失败, 您拒绝了授权...',
                        icon: 'none',
                        duration: 2000,
                        mask: true
                    });
                } else {
                    let data = {
                        encryptedData: e.detail.encryptedData,
                        iv: e.detail.iv
                    };
                    this.$http('wxapp/phone', data, 'POST').then(res => {
                        if (res.status === 'success') {
                            uni.showToast({
                                title: '获取成功...',
                                duration: 1000
                            });
                            this.$emit('get-Phone', {purePhoneNumber: res.data.purePhoneNumber});
                        } else {
                            uni.showToast({
                                title: '获取失败, 请保证您已微信登录',
                                duration: 2000,
                                icon: 'none'
                            })
                        }
                    }).catch(err => {})
                }
            }
		},
        mounted() { }
	}
</script>

<style scoped>
    .my-button {
        height: 50rpx !important;
        padding: 5rpx 7rpx !important;
        margin-left: 10rpx !important;
        font-size: 13px !important;
    }
</style>
