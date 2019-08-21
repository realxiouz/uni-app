<template>
	<view>
		<checkbox-group class="cu-list menu" @change="handleSelAllChange">
			<view class="cu-item">
				<view class="content padding-tb-sm">
					<view class="flex">
						<view class="margin-right-sm">
							<checkbox class="blue round" value="_" :checked="isAll" :class="isAll?'checked':''" />
						</view>
						<view class="text-black text-bold">全选</view>
					</view>
				</view>
			</view>
		</checkbox-group>
		<checkbox-group class="cu-list menu" @change="handleChange">
			<view class="cu-item" v-for="(i, inx) in wifiList" :key="inx">
				<view class="content padding-tb-sm">
					<view class="flex">
						<view class="margin-right-sm">
							<checkbox class='round blue' :class="i.checked?'checked':''" :checked="i.checked" :value="i.BSSID"></checkbox>
						</view>
						<view>
							<view class="text-black text-bold">{{i.SSID}}</view>
							<view class="text-gray text-sm">{{i.BSSID}}</view>
						</view>
					</view>
				</view>
			</view>
		</checkbox-group>

		<view class="cu-bar foot padding-left-sm padding-right-sm padding-top-sm padding-bottom-sm bg-white">
			<button class="cu-btn lg bg-blue response" @click="handleSave">保存</button>
		</view>
	</view>
</template>

<script>
	import {
		mapMutations,
		mapState
	} from 'vuex'
	export default {
		onShow() {
			this.getWifi()
		},
		data: _ => ({
			wifiList: [{
				BSSID: "dc:ef:09:ac:ed:21",
				SSID: "KmNet1",
				secure: true,
				signalStrength: 99,
				checked: false
			}, {
				BSSID: "dc:ef:09:ac:ed:20",
				SSID: "KmNet2",
				secure: true,
				signalStrength: 99,
				checked: false
			}],
			isAll: false,
			selItems: []
		}),
		methods: {
			...mapMutations('attendance', ['setWifi']),
			handleChange(e) {
				this.selItems = e.detail.value
				let items = this.wifiList,
					values = e.detail.value;
				for (let i = 0, lenI = items.length; i < lenI; ++i) {
					items[i].checked = false;
					for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
						if (items[i].BSSID == values[j]) {
							items[i].checked = true;
							break
						}
					}
				}
			},
			handleSelAllChange(e) {
				this.isAll = !!e.detail.value.length
				this.wifiList = this.wifiList.map(i => {
					i.checked = this.isAll
					return i
				})
				this.selItems = this.wifiList.filter(i => i.checked).map(i => i.BSSID)
			},
			handleSave() {
				if (!this.selItems.length) {
					uni.showToast({
						title: '还未选择WiFi',
						icon: 'none'
					})
					return
				}
				let a = []
				let items = this.wifiList,
					values = this.selItems;
				for (let i = 0, lenI = items.length; i < lenI; ++i) {
					for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
						if (items[i].BSSID == values[j]) {
							a.push(items[i])
							break
						}
					}
				}
				this.setWifi(a)
				uni.showToast({
					title: 'WiFi已设置',
					icon: 'none'
				})
				setTimeout(_ => {
					uni.navigateBack()
				}, 1500);
			},
			getWifi() {
				//#ifdef MP-WEIXIN
				wx.startWifi({
					success(res) {
						console.log(res)
						wx.getWifiList({
							success(r) {
								console.log(r)
							},
							fail(e) {
								console.log(e)
								let code = e.errCode
								switch (code) {
									case 12006:
										uni.showModal({
											title: '提示',
											content: '必须打开手机GPS',
											confirmText: '打开GPS',
											showCancel: false,
											success: res => {
												if (res.confirm) {
													console.log('用户点击确定');
													this.getWifi()
												}}
											}
										)
										break;
									default:
										uni.showModal({
											title: '提示',
											content: e.errCode + e.errMsg,
											confirmText: '确定',
											showCancel: false,
											success: res => {
												if (res.confirm) {
													console.log('用户点击确定');
													this.getWifi()
												}}
											}
										)
										break;
								}
							}
						})
					},
					fail(e) {
						uni.showToast({
							title: e.errMsg,
							icon: 'none'
						})
					}
				})
				wx.onGetWifiList(r => {
					let items = r.wifiList
					for (let i = 0, lenI = items.length; i < lenI; ++i) {
						items[i].checked = false;
						for (let j = 0, lenJ = this.wifi.length; j < lenJ; ++j) {
							if (items[i].BSSID == this.wifi[j].BSSID) {
								this.selItems.push(items[i].BSSID)
								items[i].checked = true;
								break
							}
						}
					}
					this.wifiList = items
				})
				//#endif
				// #ifdef APP-PLUS
				// var Context = plus.android.importClass("android.content.Context");  
				// var WifiManager = plus.android.importClass("android.net.wifi.WifiManager")  
				// var wifiManager = plus.android.runtimeMainActivity().getSystemService(Context.WIFI_SERVICE);  
				// var List = plus.android.importClass("java.util.List");  
				// var ArrayList = plus.android.importClass("java.util.ArrayList");  
				// var ScanResult = plus.android.importClass("android.net.wifi.ScanResult");     
				// var wifis = new ArrayList();  
				// wifis = wifiManager.getScanResults();
				// console.log(wifis)
				// this.wifiList = wifis
				// uni.showModal({
				// 	title: 'WiFi',
				// 	content: wifis[0].toString()
				// })
				
				var MainActivity = plus.android.runtimeMainActivity()  
				// 上下文  
				var Context = plus.android.importClass('android.content.Context')  
				// 导入WIFI管理 和 WIFI 信息 的class  
				plus.android.importClass("android.net.wifi.WifiManager")  
				plus.android.importClass("android.net.wifi.WifiInfo")  
				plus.android.importClass("android.net.wifi.ScanResult")  
				plus.android.importClass("java.util.ArrayList")  
				// 获取 WIFI 管理实例  
				var wifiManager = MainActivity.getSystemService(Context.WIFI_SERVICE)  
				wifiManager.setWifiEnabled(true) 
				wifiManager.startScan()
				// 获取当前连接WIFI的信息  
				//var info = wifiManager.getConnectionInfo()  
				// 获取当前 WIFI 连接的 SSID (WIFI 名称)  
				//var ssid = info.getSSID()  
				// 这里的 获取到的名称 是 带 双引号的 如 "cmcc"    
				// 所以我们这里处理一下  
				//ssid = ssid.replace(/(^\"*)|(\"*$)/g, "")  

				var resultList = wifiManager.getScanResults(),  
					len = resultList.size()  
				console.log('w-length', len)
				for(var i = 0; i < len; i++) {  
					console.log(resultList.get(i).plusGetAttribute('SSID'))  
				}   
				
				 
				// #endif
			}
		},
		computed: {
			...mapState('attendance', ['wifi'])
		},
	}
</script>

<style>
</style>
