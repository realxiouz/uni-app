let _app = {
	shareTypeListSheetArray: {
		array: [0, 5]
	}, // 分享类型 0-图文链接 1-纯文字 2-纯图片 3-音乐 4-视频 5-小程序
	showToast(msg) {
		uni.showToast({
			title: msg,
			icon: 'none'
		})
	},
	getProvider(type, cb, sheet) {
		let _this = this;
		uni.getProvider({
			service: type,
			success: function(res) {
				if (sheet) {
					let obj = {};
					obj.array = res.provider;
					_this.actionSheet(obj, function(index) {
						if (cb && typeof(cb) == "function") cb(res.provider[index]);
					});
				} else {
					if(type == 'payment') {
						let providers = res.provider;
						let payTypeArray = [];
						for (let i = 0; i < providers.length; i++) {
							if (providers[i] == 'wxpay') {
								payTypeArray[i] = {
									name: '微信支付',
									value: providers[i],
									img: '../../static/image/wei.png'
								};
							} else if (providers[i] == 'alipay') {
								payTypeArray[i] = {
									name: "支付宝支付",
									value: providers[i],
									img: '../../static/image/ali.png'
								};
							}
						}
						if (cb && typeof(cb) == "function") cb(payTypeArray);
					}else{
						if (cb && typeof(cb) == "function") cb(res);
					}
				}
			},
		})
	},
	actionSheet(obj, cb) {
		let sheetArray = [];
		for (let i = 0; i < obj.array.length; i++) {
			switch (obj.array[i]) {
				case 'sinaweibo':
					sheetArray[i] = '新浪微博';
					break;
				case 'qq':
					sheetArray[i] = 'QQ';
					break;
				case 'weixin':
					sheetArray[i] = '微信';
					break;
				case 'WXSceneSession':
					sheetArray[i] = '微信好友';
					break;
				case 'WXSenceTimeline':
					sheetArray[i] = '微信朋友圈';
					break;
				case 'WXSceneFavorite':
					sheetArray[i] = '微信收藏';
					break;
				case 0:
					sheetArray[i] = '图文链接';
					break;
				case 1:
					sheetArray[i] = '纯文字';
					break;
				case 2:
					sheetArray[i] = '纯图片';
					break;
				case 3:
					sheetArray[i] = '音乐';
					break;
				case 4:
					sheetArray[i] = '视频';
					break;
				case 5:
					sheetArray[i] = '小程序';
					break;
				default:
					break;
			}
		}
		this.showActionSheet(sheetArray, cb);
	},
	showActionSheet(sheetArray, cb) {
		uni.showActionSheet({
			itemList: sheetArray,
			success: (e) => {
				if (cb && typeof(cb) == 'function') cb(e.tapIndex);
			}
		})
	},
	// #ifdef APP-PLUS
	getShare(providerName, WXScene, shareType, title, summary, href, imageUrl, miniProgramObj, mediaUrl, scb, fcb) { //miniProgram: {path: '', type: 0, webUrl: ''}
		let _this = this;
		if (typeof(shareType) == 'number' && !isNaN(shareType) && shareType >= 0) {
			_this.readyShare(providerName, WXScene, shareType, title, summary, href, imageUrl, miniProgramObj, mediaUrl, scb,
				fcb);
		} else {
			_this.actionSheet(_this.shareTypeListSheetArray, function(index) {
				_this.readyShare(providerName, WXScene, _this.shareTypeListSheetArray.array[index], title, summary, href,
					imageUrl, miniProgramObj, mediaUrl, scb, fcb);
			});
		}
	},
	readyShare(providerName, WXScene, shareType, title, summary, href, imageUrl, miniProgramObj, mediaUrl, scb, fcb) {
		let _this = this;
		let shareObjData = {};
		switch (shareType) {
			case 0:
				shareObjData = {
					href: href,
					summary: summary,
					imageUrl: imageUrl
				};
				break;
			case 1:
				shareObjData = {
					summary: summary,
					href: href
				};
				break;
			case 2:
				shareObjData = {
					imageUrl: imageUrl
				};
				break;
			case 3:
				if (mediaUrl) {
					_this.showToast('暂不支持此分享类型');
					return;
				};
				shareObjData = {
					mediaUrl: mediaUrl
				};
				break;
			case 4:
				if (mediaUrl) {
					_this.showToast('暂不支持此分享类型');
					return;
				};
				shareObjData = {
					mediaUrl: mediaUrl
				};
				break;
			case 5:
				shareObjData = {
					miniProgram: miniProgramObj,
					imageUrl: imageUrl
				};
				providerName = 'weixin';
				break;
			default:
				_this.showToast('分享参数-shareType错误');
				return;
				break;
		}
		shareObjData.title = title;
		_this.share(providerName, WXScene, shareType, shareObjData, function(res) {
			if (scb && typeof(scb) == 'function') scb(res);
		}, function(err) {
			if (fcb && typeof(fcb) == 'function') fcb(err);
		});
	},
	share(providerName, WXScene, shareType, data, scb, fcb) {
		let _this = this;
		let shareObj = {
			provider: '',
			success: Function,
			fail: Function
		};
		if (providerName && providerName != '') {
			shareObj.provider = providerName;
			if (providerName == 'weixin') {
				_this.readyShareWXScene(WXScene, function(Scene) {
					shareObj.scene = Scene;
					_this.doingShare(shareObj, shareType, data, scb, fcb);
				});
			} else {
				_this.doingShare(shareObj, shareType, data, scb, fcb);
			}
		} else {
			_this.getProvider('share', function(name) {
				shareObj.provider = name;
				if (name == 'weixin') {
					_this.readyShareWXScene(WXScene, function(Scene) {
						shareObj.scene = Scene;
						_this.doingShare(shareObj, shareType, data, scb, fcb);
					});
				} else {
					_this.doingShare(shareObj, shareType, data, scb, fcb);
				}
			}, true);
		}
	},
	readyShareWXScene(WXScene, cb) {
		let _this = this;
		let WXScenetypelist = {
			array: ['WXSceneSession', 'WXSenceTimeline', 'WXSceneFavorite']
		};
		if (WXScene && WXScene != "") {
			if (cb && typeof(cb) == 'function') cb(WXScene);
		} else {
			_this.actionSheet(WXScenetypelist, function(index) {
				if (cb && typeof(cb) == 'function') cb(WXScenetypelist.array[index]);
			});
		}
	},
	doingShare(shareObj, shareType, data, scb, fcb) {
		shareObj.type = shareType;
		if (data && data.title) shareObj.title = data.title;
		switch (shareType) {
			case 0: //图文链接
				shareObj.href = data.href;
				shareObj.summary = data.summary;
				shareObj.imageUrl = data.imageUrl;
				break;
			case 1: //纯文字
				shareObj.summary = data.summary;
				shareObj.href = data.href;
				break;
			case 2: //纯图片
				shareObj.imageUrl = data.imageUrl;
				break;
			case 3: //音乐
				if (!data.mediaUrl) {
					_this.showToast('暂不支持此分享类型');
					return;
				};
				shareObj.mediaUrl = data.mediaUrl;
				break;
			case 4: //视频
				if (!data.mediaUrl) {
					_this.showToast('暂不支持此分享类型');
					return;
				};
				shareObj.mediaUrl = data.mediaUrl;
				break;
			case 5: //小程序
				if (miniProgramId == '') {
					uni.showToast('未设置小程序ID, 请使用其他方式分享');
					return;
				}
				let mp = {
					id: miniProgramId
				};
				mp.path = data.miniProgram.path;
				mp.type = data.miniProgram.type;
				if (data.miniProgram.webUrl) mp.webUrl = data.miniProgram.webUrl;
				shareObj.miniProgram = mp;
				shareObj.imageUrl = data.imageUrl;
				break;
			default:
				_app.showToast('分享参数-shareType错误');
				break;
		}
		shareObj.success = function(res) {
			if (scb && typeof(scb) == 'function') scb(res);
		}
		shareObj.fail = function(err) {
			if (fcb && typeof(fcb) == 'function') fcb(err);
		}
		console.log(JSON.stringify(shareObj));
		uni.share(shareObj);
	},
	// #endif
}
export default _app;