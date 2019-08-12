<template>
	<view>
		<view @tap="showAddress">
			{{coname}} - {{ctname}} - {{csname}}
		</view>
		<view class="jm-modal" :class="showFlag==true?'show1':''">
			<view class="dialog">
				<view class="showBox">
					<view class="content">选择地址</view>
					<view class="action" @tap="hideAddress">
						x
					</view>
				</view>
				<view class="choice">
					已选： {{coname}} - {{ctname}} - {{csname}}
				</view>
				<!-- 省份列表 -->
				<view class="addList">
					<view v-for="(item,index) in addressd1" :key='index' :class="{check:item.id==co}" @tap="clickAddress(1,item.id,item.name)">
						{{item.name}}
					</view>
				</view>
				<!-- 城市列表 -->
				<view class="addList">
					<view v-for="(item,index) in addressd2" :key='index' :class="{check:item.id==ct}" @tap="clickAddress(2,item.id,item.name)">
						{{item.name}}
					</view>
				</view>
				<!-- 地区列表 -->
				<view class="addList">
					<view v-for="(item,index) in addressd3" :key='index' :class="{check:item.id==cs}" @tap="clickAddress(3,item.id,item.name)">
						{{item.name}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	var _self;
	export default {
		data() {
			return {
				showFlag: false,
				addressd1: [],
				addressd2: [],
				addressd3: [],
				co: '1',
				coname: '北京',
				ct: '64',
				ctname: '朝阳区',
				cs: '575',
				csname: '三环以内'
			};
		},
		props: {
			addressd: Array
		},
		mounted() {
			_self = this
			this.getadd(1, 0)
		},
		methods: {
			//呼出模态框
			showAddress() {
				// 呼出模态框
				this.showFlag = true
			},
			// 关闭模态框
			hideAddress() {
				this.showFlag = null;
			},
			// 声明默认地址,并传送给父组件
			emitData() {
				var data = {
					pId: _self.co,
					cId: _self.ct,
					dId: _self.cs
				}
				_self.$emit("changes", data);
			},
			clickAddress(flag, id, name) {
				//判断点击的状态
				switch (flag) {
					case 1:
						_self.coname = name;
						_self.co = id;
						_self.getadd(2, id);
						break;
					case 2:
						_self.ctname = name;
						_self.ct = id;
						_self.getadd(3, id);
						break;
					case 3:
						_self.csname = name;
						_self.cs = id;
						_self.emitData();
						// _self.hideAddress();
						break;
					default:
						return;
				}

			},
			// 模拟获取数据,真实场景可参考上面demo
			getadd(flag, id) {
				switch (flag) {
					case 1:
						this.$http('provinces').then(r => {
							this.addressd1 = r
							this.co = this.addressd1[0].id
							this.coname = this.addressd1[0].name
							this.getadd(2, this.co)
						})
						break;
					case 2:
						this.$http(`cities/${id}`).then(r => {
							this.addressd2 = r
							this.ctname = this.addressd2[0].name
							this.ct = this.addressd2[0].id
							this.getadd(3, this.ct)
						})
						break;
					case 3:
						this.$http(`districts/${id}`).then(r => {
							this.addressd3 = r
							this.clickAddress(3, this.addressd3[0].id, this.addressd3[0].name)
						})
						break;
					default:
						return;
				}
			}
		}
	}
</script>

<style>
	.choice {
		background-color: #fff;
		padding: 20upx;
		font-size: 28upx;
	}

	.addList {
		height: 570upx;
		box-sizing: border-box;
		overflow-y: scroll;
		width: 31%;
		float: left;
		margin-left: 1%;
		margin-right: 1%;
		padding: 200upx 0;
		font-size: 28upx;
	}

	.addList view {
		height: 70upx;
		line-height: 70upx;
	}

	.check {
		color: #fff;
		background-color: #bd1e2c;
	}

	.jm-modal {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 1110;
		opacity: 0;
		outline: 0;
		text-align: center;
		-ms-transform: scale(1.185);
		transform: scale(1.185);
		backface-visibility: hidden;
		perspective: 2000upx;
		background: rgba(0, 0, 0, 0.6);
		transition: all 0.3s ease-in-out 0s;
		pointer-events: none;
	}

	.jm-modal::before {
		content: "\200B";
		display: inline-block;
		height: 100%;
		vertical-align: middle;
	}

	.show1 {
		opacity: 1;
		transition-duration: 0.3s;
		-ms-transform: scale(1);
		transform: scale(1);
		overflow-x: hidden;
		overflow-y: auto;
		pointer-events: auto;
	}

	.dialog {
		position: relative;
		display: inline-block;
		vertical-align: middle;
		margin-left: auto;
		margin-right: auto;
		width: 680upx;
		max-width: 100%;
		height: 700upx;
		background-color: #f8f8f8;
		border-radius: 10upx;
		overflow: hidden;
	}

	.action {
		position: absolute;
		right: 30upx;
	}

	.content {
		position: absolute;
		text-align: center;
		width: calc(100% - 340upx);
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		margin: auto;
		height: 60upx;
		font-size: 32upx;
		line-height: 60upx;
		cursor: none;
		pointer-events: none;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}

	.showBox {
		background-color: #fff;
		display: flex;
		position: relative;
		align-items: center;
		min-height: 100upx;
		justify-content: space-between;
	}
</style>
