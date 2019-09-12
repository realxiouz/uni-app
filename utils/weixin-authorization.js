export default {
    saveImg(err) {
        // 在小程序保存图片有可能需要用户授权, 传入fail信息即可
        if (err.errMsg === "saveImageToPhotosAlbum:fail:auth denied" || err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
            uni.showModal({
                title: '提示',
                content: '需要您授权保存相册',
                showCancel: false,
                success: modalSuccess => {
                    uni.openSetting({
                        success(settingData) {
                            if (settingData.authSetting['scope.writePhotosAlbum']) {
                                uni.showModal({
                                    title: '提示',
                                    content: '获取权限成功,再次点击图片即可保存',
                                    showCancel: false,
                                })
                            } else {
                                uni.showModal({
                                    title: '提示',
                                    content: '获取权限失败，将无法保存到相册哦~',
                                    showCancel: false,
                                })
                            }
                        }
                    })
                }
            })
        }
    }
}