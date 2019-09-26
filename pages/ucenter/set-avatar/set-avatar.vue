<template>
	<view class="wrap">
        <view class="avatar">
            <yp-avatar sel-width="600upx" sel-height="600upx" @upload="myUpload" :avatar-src="userInfo.avatar" avatar-style="width: 200upx; height: 200upx; border-radius: 100%;" />
        </view>
        <view class="title">更改头像</view>
	</view>
</template>

<script>
    import {mapState, mapMutations} from 'vuex';
    import ypAvatar from '../cropper/yq-avatar';
    import {QINIU, QINIU_PUBLIC} from "../../../utils/const";
    import moment from 'moment';
    export default {
		data() {
			return {
                token: ''
			}
		},
        components: {
		    ypAvatar
        },
        created() {
            this.$http('image/token?public=true').then(r => {
                this.token = r.token
            })
        },
		methods: {
			...mapMutations(['login']),
            myUpload(res) {
				const self = this;
				let src = res.path;
                let fmt = "";
				uni.showLoading({
					title: '头像修改中...',
                    mask: true
				});
                if (src.lastIndexOf(".") > -1) {
                    fmt = src.slice(src.lastIndexOf("."));
                }
                let r100 = Math.floor(Math.random() * 100);
                let key = `${self.userInfo.company_id}/company/${moment().format("YYYYMM")}/${new Date().getTime()}${r100}${fmt}`
                uni.uploadFile({
                    url: QINIU,
                    name: 'file',
                    filePath: src,
                    header: {
                        'content-type': 'multipart/form-data'
                    },
                    formData: {
                        token: self.token,
                        key
                    },
                    success(res) {
                        if (res.statusCode === 200) {
                            let data = JSON.parse(res.data)
                            let _src = `${QINIU_PUBLIC}${data.key}`;
							self.$http('v2/employee/update', {avatar: _src}, 'PUT').then(r => {
								uni.hideLoading();
								if (r.code === 200) {
									uni.showToast({
										title: '头像修改成功',
										duration: 1000,
										icon: 'success',
                                        mask: true
									});
									let userInfo = JSON.parse(JSON.stringify(self.userInfo));
									userInfo.avatar = _src;
									self.login(userInfo);
								} else {
                                    uni.showToast({
                                        title: '头像修改失败',
                                        duration: 1000,
                                        mask: true,
                                        icon: 'none'
                                    })
                                }
							})
                        } else {
							uni.hideLoading();
							uni.showToast({
								title: '头像修改失败',
								duration: 1000,
                                mask: true,
								icon: 'none'
							})
						}
                    }
                })
            }
		},
        computed: {
		    ...mapState(['userInfo'])
        },
        watch: {},
        mounted() {}
	}
</script>

<style lang="scss">
    .wrap {
        width: 100%;
        height: 100%;
        background: #F1F1F1;
        overflow: hidden;
        .avatar {
            width: 200upx;
            margin: 100rpx auto 0;
        }
        .title {
            width: 200upx;
            padding: 30rpx 0;
            margin: auto;
            color: red;
            font-size: 15px;
            text-align: center;
        }
    }
</style>
