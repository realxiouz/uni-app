<template>
	<view class="wrap">
        <view class="avatar">
            <!--avatar-style="width: 200upx; height: 200upx; border-radius: 100%;"-->
            <!--sel-width="600upx" sel-height="600upx"-->
            <!--:avatar-src="userInfo.avatar"-->
            <image :src="urls[0]" @tap="chooseImage"></image>
            <yp-avatar @upload="myUpload" ref="avatar"/>
        </view>
        <view class="title" @tap="chooseImage">更改头像</view>
	</view>
</template>

<script>
    import {mapState, mapMutations} from 'vuex';
    import ypAvatar from '../../../components/yq-avatar';
    import {QINIU, QINIU_PUBLIC} from "../../../utils/const";
    import moment from 'moment';
    export default {
		data() {
			return {
                token: '',
                urls: []
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
                let key = `${self.userInfo.company_id}/company/${moment().format("YYYYMM")}/${new Date().getTime()}${r100}${fmt}`;
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
                            let data = JSON.parse(res.data);
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
                                        duration: 2000,
                                        mask: true,
                                        icon: 'none'
                                    })
                                }
							})
                        } else {
							uni.hideLoading();
							uni.showToast({
								title: '头像修改失败',
								duration: 2000,
                                mask: true,
								icon: 'none'
							})
						}
                    }
                })
            },
            chooseImage() {
                this.$refs.avatar.fChooseImg(0, {
                    selWidth: "600upx", selHeight: "600upx",
                    expWidth: '260upx', expHeight: '260upx'
                })
            }
		},
        computed: {
		    ...mapState(['userInfo'])
        },
        watch: {
		    'userInfo.avatar': {
		        handler(data) {
                    this.urls.splice(0, 1, data);
                },
                deep: true
            }
        },
        mounted() {
		    this.urls.push(this.userInfo.avatar);
            /*console.log(ypAvatar.fChooseImg(0, {
                selWidth: "300upx", selHeight: "300upx",
                expWidth: '260upx', expHeight: '260upx'
            }));*/
        }
	}
</script>

<style lang="scss">
    .wrap {
        position: relative;
        width: 100%;
        height: 100%;
        background: #F1F1F1;
        /*overflow: hidden;*/
        .avatar {
            display: flex;
            justify-content: center;
            width: 100%;
            height: 100%;
            padding-top: 100rpx;
            /*margin: 100rpx auto 0;*/
            image {
                width: 200rpx;
                height: 200rpx;
                border-radius: 50%;
                border: 2px solid #ccc;
            }
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
