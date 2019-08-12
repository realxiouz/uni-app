export default {
    loading(userInfo) {
        // 这里调用注意this指向, 需要call或apply亦或是bind
        // 分享触发
        uni.showLoading({
            title: '生成中...',
            mask: true
        });
        return new Promise ((response, reject) => {
            uni.downloadFile({
                url: userInfo.avatar,// 网络路径
                success(res) {
                    // 这里拿到临时路径, 存到本地
                    response(res);
                    uni.hideLoading();
                },
                fail(err) {
                    reject(err);
                }
            });
        })
    },
    // 绘制canvas图片 end
    roundRect(ctx, x, y, w, h, r) {
        ctx.beginPath();
        ctx.setFillStyle('#fff');
        // ctx.setStrokeStyle('transparent')
        // 左上角
        ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5);
        // border-top
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.lineTo(x + w, y + r);
        // 右上角
        ctx.arc(x + w - r, y + r, r, Math.PI * 1.5, Math.PI * 2);

        // border-right
        ctx.lineTo(x + w, y + h - r);
        ctx.lineTo(x + w - r, y + h);
        // 右下角
        ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * 0.5);

        // border-bottom
        ctx.lineTo(x + r, y + h);
        ctx.lineTo(x, y + h - r);
        // 左下角
        ctx.arc(x + r, y + h - r, r, Math.PI * 0.5, Math.PI);

        // border-left
        ctx.lineTo(x, y + r);
        ctx.lineTo(x + r, y);

        // 这里是使用 fill 还是 stroke都可以，二选一即可，但是需要与上面对应
        ctx.fill();
        // ctx.stroke()
        ctx.closePath();
        // 剪切
        ctx.clip();
    },
    canvas(e, ctx, cardSm, bgSm, roundRect) {
        const self = this;
        // 小图标地址
        let icon = {
            companyIconWhite: '/static/images/publicimg/companyicon_white.png',
            companyIconBlack: '/static/images/publicimg/companyicon_black.png',
            phoneWhite: '/static/images/publicimg/phone_white.png',
            phoneBlack: '/static/images/publicimg/phone_black.png',
            ewm: '/static/images/publicimg/ewm.jpg',
            ewmUrl: "http://www.t.com/storage/qrCode/156144383447.png"
        }
        // 背景路径
        let bgPath = [
            "/static/images/img/template_0.png",
            "/static/images/img/template_1.png",
            "/static/images/img/template_2.png",
            "/static/images/img/template_3.png"
        ];
        let userInfo = this.currentuserinfo;
        let cardInfo = {
            "userImg": this.testUserInfo.avatar,// 头像
            "name": this.testUserInfo.name,// 名称
            "companyname": this.testUserInfo.companyname,// 公司
            "phone": this.testUserInfo.phone,// 电话
            "position": this.testUserInfo.position,// 职位
            "ewm": icon.ewm // 二维码
        };
        // 分享缩略名片
        let smCardInfo = {
            "userImg": userInfo.avatar,// 头像
            "name": userInfo.name,// 名称
            "companyname": userInfo.companyname,// 公司
            "phone": userInfo.phone,// 电话
            "position": userInfo.position,// 职位
            "ewm": icon.ewm// 二维码
        };
        // 规则, 限定字符长度
        if (cardInfo.companyname.length > 10) {
            cardInfo.companyname = cardInfo.companyname.substring(0, 9) + '...'; //控制显示9个字符+....；
        }
        if (cardInfo.name.length > 10) {
            cardInfo.name = cardInfo.name.substring(0, 9) + '...'; //控制显示9个字符+....；
        }
        if (smCardInfo.companyname.length > 8) {
            smCardInfo.companyname = cardInfo.companyname.substring(0, 6) + '...'; //控制显示6个字符+....；
        }
        if (smCardInfo.name.length > 8) {
            smCardInfo.name = cardInfo.name.substring(0, 6) + '...'; //控制显示6个字符+....；
        }
        this.canvasWidth = this.canvasWidth;
        this.canvasHeight = (3*this.canvasWidth) / 5;
        cardInfo.userImg = this.qrCode;
        roundRect(ctx, 0, 0, this.canvasWidth, this.canvasHeight, 5);
        // 绘制文本
        switch (Number(this.currentbgnum)) {
            case 0:
            {
                ctx.drawImage(bgPath[0], 0, 0, this.canvasWidth, this.canvasHeight);
                ctx.drawImage(cardInfo.ewm, this.canvasWidth * .85, this.canvasHeight * .66, 50, 50);
                ctx.drawImage(cardInfo.userImg, this.canvasWidth - 80, 30, 50, 50);
                ctx.setFontSize(17);
                ctx.fillText(cardInfo.name, 30, this.canvasHeight / 2.3);
                ctx.setFontSize(13);
                ctx.fillText(cardInfo.position, 30, this.canvasHeight / 1.8);
                ctx.setFontSize(13);
                ctx.fillText(cardInfo.companyname, 50, this.canvasHeight / 1.3);
                ctx.drawImage(icon.companyIconWhite, 30, this.canvasHeight / 1.45, 14, 14);
                ctx.drawImage(icon.phoneWhite, 30, this.canvasHeight / 1.22, 15, 15);
                ctx.fillText(cardInfo.phone, 50, this.canvasHeight / 1.12);

                // 绘制头像
                ctx.save(); // 先保存状态 已便于画完圆再用
                ctx.beginPath(); //开始绘制
                //先画个圆
                ctx.arc(this.canvasWidth - 100 + 25, 30 + 25, 25, 0, 2 * Math.PI, false)
                ctx.clip(); //画了圆 再剪切 原始画布中剪切任意形状和尺寸。一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内
                // ctx.drawImage(smCardInfo.userImg, 15, 46, 30, 30); // 推进去图片
                ctx.drawImage(cardInfo.userImg, this.canvasWidth - 100, 30, 50, 50);
                ctx.restore(); //恢复之前保存的绘图上下文

            }
                break;
            case 1:
            {
                ctx.drawImage(bgPath[1], 0, 0, this.canvasWidth, this.canvasHeight);
                ctx.drawImage(cardInfo.ewm, 2, this.canvasWidth / 1.3, this.canvasHeight - 60, 50);
                ctx.drawImage(cardInfo.userImg, this.canvasWidth / 1.3, 10, 50, 50);
                ctx.setFontSize(17);
                ctx.fillText(cardInfo.name, this.canvasWidth / 1.6, this.canvasHeight / 1.9);
                ctx.setFontSize(13);
                ctx.fillText(cardInfo.position, this.canvasWidth / 1.6, this.canvasHeight / 1.57);
                ctx.setFontSize(13);
                ctx.fillText(cardInfo.companyname, this.canvasWidth / 1.48  , this.canvasHeight / 1.28);
                ctx.drawImage(icon.companyIconWhite, this.canvasWidth / 1.6, this.canvasHeight / 1.38, 14, 14);
                ctx.drawImage(icon.phoneWhite, this.canvasWidth / 1.6, this.canvasHeight / 1.18, 15, 15);
                ctx.fillText(cardInfo.phone, this.canvasWidth / 1.5, this.canvasHeight / 1.09);
            }
                break;
            case 2:
            {
                ctx.drawImage(bgPath[2], 0, 0, this.canvasWidth, this.canvasHeight);
                ctx.drawImage(cardInfo.ewm, this.canvasWidth * .005, this.canvasHeight * .66, 50, 50);
                ctx.drawImage(cardInfo.userImg, this.canvasWidth * .33, this.canvasHeight / 2 - 20, 50, 50);
                console.log(cardInfo.userImg);
                ctx.setFontSize(17);
                ctx.fillText(cardInfo.name, this.canvasWidth * .58, this.canvasHeight / 2.8);
                ctx.setFontSize(13);
                ctx.fillText(cardInfo.position, this.canvasWidth * .58, this.canvasHeight / 2.1);
                ctx.setFontSize(13);
                ctx.fillText(cardInfo.companyname, this.canvasWidth * .63, this.canvasHeight / 1.39);
                ctx.drawImage(icon.companyIconWhite, this.canvasWidth * .58, this.canvasHeight / 1.5, 14, 14);
                ctx.drawImage(icon.phoneWhite, this.canvasWidth * .58, this.canvasHeight / 1.24, 15, 15);
                ctx.fillText(cardInfo.phone, this.canvasWidth * .63, this.canvasHeight / 1.16);
                // ctx.draw()
            }
                break;
            case 3:
            {
                ctx.drawImage(bgPath[3], 0, 0, this.canvasWidth, this.canvasHeight);
                ctx.drawImage(cardInfo.ewm, this.canvasWidth * .85, this.canvasHeight * .10, 50, 50);
                ctx.drawImage(cardInfo.userImg, this.canvasWidth * .45, this.canvasHeight / 2 - 30, 50, 50);
                ctx.setFontSize(17);
                ctx.fillStyle = 'black';
                ctx.fillText(cardInfo.name, 27, this.canvasHeight / 3.4);
                ctx.setFontSize(13);
                ctx.fillStyle = 'black';
                ctx.fillText(cardInfo.position, 27, this.canvasHeight / 2.5);
                ctx.setFontSize(13);
                ctx.fillStyle = 'black';
                ctx.fillText(cardInfo.companyname, 45, this.canvasHeight / 1.32);
                ctx.drawImage(icon.companyIconBlack, 27, this.canvasHeight / 1.47, 14, 14);
                ctx.drawImage(icon.phoneBlack, 27, this.canvasHeight / 1.24, 15, 15);
                ctx.fillText(cardInfo.phone, 45, this.canvasHeight / 1.138);
                ctx.fillStyle = 'black'
                // ctx.draw()
            }
        }
        // 绘制文本 end
        ctx.draw(true, setTimeout(function() {
            uni.canvasToTempFilePath({
                x: 0,
                y: 0,
                width: self.canvasWidth,
                height: self.canvasHeight,
                canvasId: 'sharecard',
                success(res) {
                    self.shareImg = res.tempFilePath;
                    self.modalName = e.currentTarget.dataset.target;
                },
                fail(err) {
                    console.log(err);
                }
            })
        }, 500));
        if (!this.isShowShare) return false;
        // 绘制小图片
        let smWd = 157;
        let	smHt = 140;
        // console.log(typeof this.currentbgnum)
        switch (this.currentbgnum) {
            case 0:
            {
                cardSm.drawImage(bgSm[0], 0, 0, smWd, smHt);
                cardSm.drawImage(smCardInfo.ewm, 130, 26, 25, 25);
                cardSm.fillStyle = 'white';
                cardSm.setFontSize(10);
                cardSm.fillText(smCardInfo.name, 15, 50);
                cardSm.setFontSize(8);
                cardSm.fillText(smCardInfo.position, 15, 63)
                cardSm.drawImage(icon.companyIconWhite, 10, 70, 8, 8);
                cardSm.drawImage(icon.phoneWhite, 10, 86, 8, 8);
                cardSm.setFontSize(8);
                cardSm.fillText(smCardInfo.phone, 25, 80)
                cardSm.fillText(smCardInfo.companyname, 25, 95);
                // 绘制头像
                cardSm.save(); // 先保存状态 已便于画完圆再用
                cardSm.beginPath(); //开始绘制
                //先画个圆
                cardSm.arc(90 + 15, 30 + 15, 15, 0, 2 * Math.PI, false)
                cardSm.clip(); //画了圆 再剪切 原始画布中剪切任意形状和尺寸。一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内
                cardSm.drawImage(smCardInfo.userImg, 90, 30, 30, 30); // 推进去图片
                cardSm.restore(); //恢复之前保存的绘图上下文
            }
                break;
            case 1:
            {
                cardSm.drawImage(bgSm[1], 0, 0, smWd, smHt);
                cardSm.drawImage(smCardInfo.ewm, 130, 26, 24, 24);
                cardSm.fillStyle = 'white';
                cardSm.setFontSize(10);
                cardSm.fillText(smCardInfo.name, 90, 62);
                cardSm.setFontSize(8);
                cardSm.fillText(smCardInfo.position, 90, 72)
                cardSm.drawImage(icon.companyIconWhite, 80, 82, 8, 8);
                cardSm.drawImage(icon.phoneWhite, 80, 96, 8, 8);
                cardSm.setFontSize(8);
                cardSm.fillText(smCardInfo.phone, 95, 92)
                cardSm.fillText(smCardInfo.companyname, 95, 102);
                // 绘制头像
                cardSm.save(); // 先保存状态 已便于画完圆再用
                cardSm.beginPath(); //开始绘制
                //先画个圆
                cardSm.arc(15 + 15, 46 + 15, 15, 0, 2 * Math.PI, false)
                cardSm.clip(); //画了圆 再剪切 原始画布中剪切任意形状和尺寸。一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内
                cardSm.drawImage(smCardInfo.userImg, 15, 46, 30, 30); // 推进去图片
                cardSm.restore(); //恢复之前保存的绘图上下文

            }
                break;
            case 2:
            {
                cardSm.drawImage(bgSm[2], 0, 0, smWd, smHt);
                cardSm.drawImage(smCardInfo.ewm, 2, 87, 24, 24);
                cardSm.fillStyle = 'white';
                cardSm.setFontSize(10);
                cardSm.fillText(smCardInfo.name, 90, 52);
                cardSm.setFontSize(8);
                cardSm.fillText(smCardInfo.position, 90, 65)
                cardSm.drawImage(icon.companyIconWhite, 90, 82, 8, 8);
                cardSm.drawImage(icon.phoneWhite, 90, 96, 8, 8);
                cardSm.setFontSize(7);
                cardSm.fillText(smCardInfo.companyname, 100, 89)
                cardSm.fillText(smCardInfo.phone, 100, 103);
                // 绘制头像
                cardSm.save(); // 先保存状态 已便于画完圆再用
                cardSm.beginPath(); //开始绘制
                //先画个圆
                cardSm.arc(48 + 15, 50 + 15, 15, 0, 2 * Math.PI, false)
                cardSm.clip(); //画了圆 再剪切 原始画布中剪切任意形状和尺寸。一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内
                cardSm.drawImage(smCardInfo.userImg, 48, 50, 30, 30); // 推进去图片
                cardSm.restore(); //恢复之前保存的绘图上下文

            }
                break;
            case 3:
            {
                cardSm.drawImage(bgSm[3], 0, 0, smWd, smHt);
                cardSm.drawImage(smCardInfo.ewm, 130, 26, 25, 25);

                cardSm.setFontSize(10);
                cardSm.fillText(smCardInfo.name, 5, 50);
                cardSm.setFontSize(7);
                cardSm.fillText(smCardInfo.position, 5, 63)
                cardSm.drawImage(icon.companyIconBlack, 5, 75, 8, 8);
                cardSm.drawImage(icon.phoneBlack, 5, 86, 8, 8);
                cardSm.setFontSize(7);
                cardSm.fillText(smCardInfo.phone, 15, 83)
                cardSm.fillText(smCardInfo.companyname, 15, 95);
                // 绘制头像
                cardSm.save(); // 先保存状态 已便于画完圆再用
                cardSm.beginPath(); //开始绘制
                //先画个圆
                cardSm.arc(65 + 15, 40 + 15, 15, 0, 2 * Math.PI, false)
                cardSm.clip(); //画了圆 再剪切 原始画布中剪切任意形状和尺寸。一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内
                cardSm.drawImage(smCardInfo.userImg, 65, 40, 30, 30); // 推进去图片
                cardSm.restore(); //恢复之前保存的绘图上下文
            }
                break;
        }

        cardSm.draw(true, setTimeout(function() {
            uni.canvasToTempFilePath({
                x: 0,
                y: 0,
                width: smWd,
                height: smHt,
                canvasId: 'sharesm',
                success(res) {
                    this.shareimg = res.tempFilePath;
                }
            })
        }, 400))
        // 绘制小图片end
    },
}