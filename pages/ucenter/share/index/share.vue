<template>
    <view>
        <view class="pubpdtop pd-left-right">
            <form @submit="formSubmit">
                <view class="share-title">

                </view>
                <view class="share-content pubpdtop">
					<textarea v-model='cNames' class="radiusbox share-textarea" rows="3">

					</textarea>
                </view>
                <view class="btngrp">
                    <button @tap='clearInputEvent' form-type="reset" class="cu-btn  bg-red button-hover">一键清空</button>
                    <button @tap="generateCard" :disabled="isDisabled" form-type="submit" class="cu-btn bg-cyan" data-target="bottomModal">
                        分享名片
                    </button>
                </view>
            </form>
        </view>
        <view :class="['cu-modal', 'bottom-modal', modalName === 'bottomModal'? 'show': '']">
            <view class="cu-dialog">
                <view class="padding-xl">
                    <view class="sharetoobj">
                        <view class="sharetoobj-list">
                            <!--open-type="share"-->
                            <button open-type="share"></button>
                            <view>
                                <image src="/static/images/img/weixin.png"></image>
                            </view>
                            <!--///////////////////////////////////////////////-->
                            <text>分享给好友</text>
                        </view>
                        <view class="sharetoobj-list">
                            <button @tap="showCard" data-target="bottomModal-0"></button>
                            <view>
                                <image src="/static/images/img/pyq.png"></image>
                            </view>
                            <text>分享到朋友圈</text>
                        </view>
                    </view>
                </view>
                <view class="pd-top-bottom bg-white btn-center" @tap="hideModal">
                    取消
                </view>
            </view>
        </view>
        <view :class="['cu-modal', 'bottom-modal', modalName === 'bottomModal-0'? 'show': '']">
            <view class="cu-dialog">
                <view class="pd-left-right">
                    <view class="canvas-share" :style="{'width': canvasWidth + 'px'}">
                        <canvas class="shadow change-position" canvas-id="sharecard"
                                :style="{'width': canvasWidth + 'px', 'height': canvasHeight + 'px'}">
                        </canvas>
                    </view>
                    <view class="pd-top-bottom">
                        <button @tap="saveImage" class="btnwd cu-btn block bg-cyan" :data-temp="shareImg">保存到相册</button>
                    </view>
                </view>
                <view class="pd-top-bottom bg-white btn-center" @tap="hideModal">
                    取消
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    import {BASE_URL} from "../../../../utils/const";
    import share from '../../../../utils/share.js';
    import {header} from "../../../../utils/global-data";
    import {mapState} from 'vuex';

    export default {
        data() {
            return {
                cNames: '', // textarea 输入的内容, 用了v-model
                shareImg: '',
                waitTime: 2000,
                userImg: 'http://tmp/wxf4cb3f3f8140375b.o6zAJs9tFfgiDkgC14Cwqafvkpro.qrMdvH8GyKfC5d5ce01576d6a35828f6c6767a5656c2.jpeg',
                canvasWidth: '', //canvas宽
                canvasHeight: '', //canvas高
                currentBgNum: 0,
                modalName: '',
                templateStyle: false,// 默认显示一个名片模板
                isShowCardContent: false, //名片内容的显隐
                isExeCuteCanvas: false, //在还没点击的时候不执行子组件里的分享
                temUrl: '',
                qrcode: '',
                isDisabled: true
            }
            //
        },
        onLaunch() {
            // console.log(this.currentBgNum);
        },
        onLoad() {
            const self = this;
            uni.request({
                url: BASE_URL + 'api/geren/qrcode',
                method: "GET",
                dataType: 'json',
                data: {
                    fuid: self.userInfo.id
                },
                header: header(self.token),
                success(res) {
                    console.log(res.data);
                    self.isDisabled = false;// 恢复按钮的功能
                    self.cNames = res.data.cname;
                    let array = uni.base64ToArrayBuffer(res.data.data);
                    let base64 = uni.arrayBufferToBase64(array);
                    if (res.statusCode == 200) {
                        self.qrcode = 'data:image/jpeg;base64,' + base64 // data 为接口返回的base64字符串
                    }
                }
            });
            // canvas
            let screenwd = uni.getSystemInfoSync().windowWidth;
            let screenht = uni.getSystemInfoSync().windowHeight;
            let canvaswd = this.canvasWidth = screenwd - 20 * 1.9;
            let canvasht = this.canvasHeight = screenht * .23;
            this.currentBgNum = this.currentuserinfo.template_id || 1;
            // 为画布设置宽高
            this.canvasWidth = canvaswd;
            this.canvasHeight = canvasht;
            //获取当前显示的名片背景索引
            // console.log(this.canvasWidth, this.canvasHeight, this.currentBgNum);
        },
        mounted() {
            // console.log();
        },
        methods: {
            generateCard(e) {
                const self = this;
                // 规则, 限定字符长度
                if (this.currentuserinfo.companyname.length > 10) {
                    this.currentuserinfo.companyname = this.currentuserinfo.companyname.substring(0, 9) + '...'; //控制显示9个字符+....；
                }
                if (this.currentuserinfo.name.length > 10) {
                    this.currentuserinfo.name = this.currentuserinfo.name.substring(0, 9) + '...'; //控制显示9个字符+....；
                }
                // 小图标地址
                let icon = {
                    companyiconwite: '/static/images/publicimg/companyicon_white.png',
                    companyiconblack: '/static/images/publicimg/companyicon_black.png',
                    phonewhite: '/static/images/publicimg/phone_white.png',
                    phoneblack: '/static/images/publicimg/phone_black.png'
                };
                // 小图标地址end
                let bgPath = [
                    "/static/images/img/template_0.png",
                    "/static/images/img/template_1.png",
                    "/static/images/img/template_2.png",
                    "/static/images/img/template_3.png"
                ];
                // 绘制canvas图片 end
                let ctx = uni.createCanvasContext('sharecard');
                this.canvasWidth = this.canvasWidth / 1.3;
                this.canvasHeight = (4*this.canvasWidth) / 5;
                let actualCanvasWidth = this.canvasWidth* 0.9;
                let actualCanvasHeight = actualCanvasWidth*0.6;
                let x = (this.canvasWidth - actualCanvasWidth)/2;
                let y = (this.canvasHeight - actualCanvasHeight)/2;
                let y1 = y + actualCanvasHeight;
                share.loading(this.userInfo, e, false).then(data => {
                    self.userImg = data.tempFilePath;
                    share.roundRect(ctx, 0, 0, this.canvasWidth, this.canvasHeight, 5);
                    // 绘制文本
                    this.currentBgNum = 2;
                    switch (Number(this.currentBgNum)) {
                        case 0: {
                            ctx.fill('#fff');
                            ctx.drawImage(bgPath[0], x, y, actualCanvasWidth, actualCanvasHeight);
                            ctx.drawImage(this.userImg, actualCanvasWidth - 20, y1 - 40, 30, 30);
                            ctx.drawImage(this.qrcode, actualCanvasWidth - 20, actualCanvasHeight - 40, 30, 30);
                            ctx.setFontSize(15);
                            ctx.fillText(this.currentuserinfo.name, 27, y1 / 2.3);
                            ctx.setFontSize(13);
                            ctx.fillText(this.currentuserinfo.position, 30, y1 / 1.8);
                            ctx.setFontSize(10);
                            ctx.fillText(this.currentuserinfo.companyname, 50, y1 / 1.3);
                            ctx.drawImage(icon.companyiconwite, 30, y1 / 1.45, 14, 14);
                            ctx.drawImage(icon.phonewhite, 30, y1 / 1.22, 15, 15);
                            ctx.fillText(this.currentuserinfo.mobile, 50, y1 / 1.12);
                            // ctx.draw() 不可以在这里写这行, 如果写了会出现不会显示的问题
                        }
                            break;
                        case 1: {
                            ctx.fill('#fff');
                            ctx.drawImage(bgPath[1], x, y, actualCanvasWidth, actualCanvasHeight);
                            ctx.drawImage(this.userImg, actualCanvasWidth - 65, 34, 30, 30);
                            ctx.setFontSize(15);
                            ctx.fillText(this.currentuserinfo.name, actualCanvasWidth * .58, actualCanvasHeight / 1.4);
                            ctx.setFontSize(13);
                            ctx.fillText(this.currentuserinfo.position, actualCanvasWidth * .58, actualCanvasHeight / 1.2);
                            ctx.setFontSize(10);
                            ctx.drawImage(icon.companyiconwite, actualCanvasWidth * .56, actualCanvasHeight / 1.1, 12, 12);
                            ctx.fillText(this.currentuserinfo.companyname, actualCanvasWidth * .62, actualCanvasHeight / 1.02);
                            ctx.drawImage(icon.phonewhite, actualCanvasWidth * .56, actualCanvasHeight / 0.9, 12, 12);
                            ctx.fillText(this.currentuserinfo.mobile, actualCanvasWidth * .61, actualCanvasHeight / 0.85);
                        }
                            break;
                        case 2: {
                            ctx.fill('#fff');
                            ctx.drawImage(bgPath[2], x, y, actualCanvasWidth, actualCanvasHeight);
                            ctx.drawImage(this.userImg, actualCanvasWidth * .35, actualCanvasHeight -50, 30, 30);
                            ctx.drawImage(this.qrcode, actualCanvasWidth * .1, y1 - 40, 30, 30);
                            ctx.setFontSize(18);
                            ctx.fillText(this.currentuserinfo.name, actualCanvasWidth * .60, actualCanvasHeight / 2.2);
                            ctx.setFontSize(15);
                            ctx.fillText(this.currentuserinfo.position, actualCanvasWidth * .60, actualCanvasHeight / 1.7);
                            ctx.setFontSize(12);
                            ctx.fillText(this.currentuserinfo.companyname, actualCanvasWidth * .67, actualCanvasHeight / 1.2);
                            ctx.drawImage(icon.companyiconwite, actualCanvasWidth * .60, actualCanvasHeight / 1.35, 14, 14);
                            ctx.drawImage(icon.phonewhite, actualCanvasWidth * .60, actualCanvasHeight / 1.1, 15, 15);
                            ctx.fillText(this.currentuserinfo.mobile, actualCanvasWidth * .67, actualCanvasHeight / 1);
                        }
                            break;
                        case 3: {
                            ctx.fill('#fff');
                            ctx.drawImage(bgPath[3], x, y, actualCanvasWidth, actualCanvasHeight);
                            ctx.drawImage(this.userImg, actualCanvasWidth - 20,  y1 - 40, 30, 30);
                            // ctx.fillRect(actualCanvasWidth - 10,  actualCanvasHeight - 40, 30, 30);
                            // ctx.setFillStyle('#fff');
                            ctx.drawImage(this.qrcode, actualCanvasWidth - 20, actualCanvasHeight - 40, 30, 30);
                            ctx.setFontSize(15);
                            ctx.fillStyle = 'black';
                            ctx.fillText(this.currentuserinfo.name, 27, y1 / 1.95);
                            ctx.setFontSize(13);
                            ctx.fillStyle = 'black';
                            ctx.fillText(this.currentuserinfo.position, 27, y1 / 1.65);
                            ctx.setFontSize(10);
                            ctx.fillStyle = 'black';
                            ctx.fillText(this.currentuserinfo.companyname, 45, y1 / 1.32);
                            ctx.drawImage(icon.companyiconblack, 27, y1 / 1.47, 14, 14);
                            ctx.drawImage(icon.phoneblack, 27, y1 / 1.24, 15, 15);
                            ctx.fillText(this.currentuserinfo.mobile, 45, y1 / 1.138);
                            ctx.fillStyle = 'black';
                        }
                    }
                    // 绘制文本 end
                    // 统一处理switch里的ctx
                    ctx.draw(true, setTimeout(function () {
                        uni.canvasToTempFilePath({
                            x: 0,
                            y: 0,
                            width: self.canvasWidth,
                            height: self.canvasHeight,
                            canvasId: 'sharecard',
                            success(res) {
                                console.log(res);
                                self.shareImg = res.tempFilePath;
                                self.modalName = e.currentTarget.dataset.target;
                            }
                        })
                    }, 500))
                })
            },
            formSubmit() {
                // 表单提交
            },
            saveImage() {
                // 保存图片
                if (this.shareImg) {
                    uni.saveImageToPhotosAlbum({
                        filePath: this.shareImg,
                        success(res) {
                            if (/saveImageToPhotosAlbum:ok/.test(res.errMsg)) {
                                uni.navigateBack({
                                    delta: 1
                                })
                            }
                        }
                    })
                }
            },
            showCard(e) {
                // 分享卡片
                this.modalName = e.currentTarget.dataset.target;
            },
            hideModal() {
                this.modalName = null;
                this.canvasWidth = 0;
                this.canvasHeight = 0;
            }
        },
        computed: {
            ...mapState([
                'token',
                'userInfo',
                'currentuserinfo'
            ])
        },
        onShareAppMessage(res) {
            // 分享
            return {
                title: '分享',
                path: 'pages/businesscard/index/businssecard',
                desc: this.cNames,
                imageUrl: this.shareImg,
                success(res) {
                    console.log('成功', res);
                }
            }
            // 'http://img2.imgtn.bdimg.com/it/u=571610305,1553276443&fm=26&gp=0.jpg' ||
        }
    }
</script>

<style lang="scss">
    @import 'share';
</style>
