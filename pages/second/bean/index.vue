<template>
	<view>
		<form>
			<view class="cu-form-group">
				<view class="title">
					需求省市
				</view>
				<pcd :level="2" v-model="pcd" />
			</view>
			<view class="cu-form-group">
				<view class="title">
					楼盘字典
				</view>
				<single-picker :range="zidians" v-model="formBean.zidian"/>
			</view>
			<view class="cu-form-group">
				<view class="title">
					楼栋单元
				</view>
				<single-picker :range="danyuans" v-model="formBean.danyuan"/>
			</view>
			<view class="cu-form-group">
				<view class="title">
					房号
				</view>
				<single-picker :range="rooms" v-model="formBean.room" rangeKey='room_id'/>
			</view>
			<view class="cu-form-group">
				<view class="title">
					楼层
				</view>
				<input placeholder="填写楼层" v-model="formBean.floor" />
			</view>
			<view class="cu-form-group">
				<view class="title">
					总层
				</view>
				<input placeholder="填写总层" v-model="formBean.total_floors" />
			</view>
			<view class="cu-form-group">
				<view class="title">{{showStar('transaction')}}状态</view>
				<single-picker :range="jiaoyi2s" v-model="formBean.jiaoyi_status" />
			</view>
			<view class="cu-form-group">
				<view class="title">{{showStar('transaction')}}公私盘</view>
				<single-picker :range="jiaoyi3s" v-model="formBean.jiaoyi_pan" />
			</view>
			<view class="cu-form-group">
				<view class="title">
					房源编号
				</view>
				<input placeholder="填写房源编号" v-model="formBean.sn" />
			</view>
			<view class="cu-form-group">
				<view class="title">{{showStar('transaction')}}类型</view>
				<single-picker :range="yongtu2s" v-model="formBean.leixing" />
			</view>
			<view class="cu-form-group">
				<view class="title">{{showStar('transaction')}}建筑</view>
				<single-picker :range="yongtu3s" v-model="formBean.yongtu3" />
			</view>
			<view class="cu-form-group">
				<view class="title">{{showStar('transaction')}}结构</view>
				<single-picker :range="yongtu4s" v-model="formBean.jiegou" />
			</view>

			<view class="cu-form-group">
				<view class="title">户型</view>
				<picker mode="multiSelector" @change="multiChange" :value="multiInx" :range="multiTypes" range-key="text">
					<view class="picker">
						{{multiTypes[0][multiInx[0]].text}},{{multiTypes[1][multiInx[1]].text}},{{multiTypes[2][multiInx[2]].text}},{{multiTypes[3][multiInx[3]].text}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">
					售价
				</view>
				<input placeholder="填写售价" v-model="formBean.sell_price" />
				<text>万元</text>
			</view>
			<view class="cu-form-group">
				<view class="title">
					单价
				</view>
				<input placeholder="填写单价" v-model="formBean.sell_price_per_unit" />
				<text>元/㎡</text>
			</view>
			<view class="cu-form-group">
				<view class="title">
					底价
				</view>
				<input placeholder="填写底价" v-model="formBean.sell_price_limit" />
				<text>万元</text>
			</view>
			<view class="cu-form-group">
				<view class="title">
					租价
				</view>
				<input placeholder="填写租价" v-model="formBean.rent_price" />
				<text>元/月</text>
			</view>
			<view class="cu-form-group">
				<view class="title">
					租金
				</view>
				<input placeholder="填写租金" v-model="formBean.rent_price_per_unit" />
				<text>元/㎡</text>
			</view>
			<view class="cu-form-group">
				<view class="title">
					底价
				</view>
				<input placeholder="填写底价" v-model="formBean.rent_price_limit" />
				<text>万元</text>
			</view>
			<view class="cu-form-group">
				<view class="title">
					面积
				</view>
				<input placeholder="填写面积" v-model="formBean.size" />
				<text>㎡</text>
			</view>
			<view class="cu-form-group">
				<view class="title">
					套内
				</view>
				<input placeholder="填写套内" v-model="formBean.taonei" />
				<text>㎡</text>
			</view>
			<view class="cu-form-group">
				<view class="title">{{showStar('transaction')}}装修</view>
				<single-picker :range="zhuangxius" v-model="formBean.zhuangxiu" />
			</view>
			<view class="cu-form-group">
				<view class="title">{{showStar('transaction')}}朝向</view>
				<single-picker :range="chaoxiangs" v-model="formBean.chaoxiang" />
			</view>
			<view class="cu-form-group">
				<view class="title">
					建房年代
				</view>
				<input placeholder="填写建房年代" v-model="formBean.year" />
			</view>

			<!-- <view class="cu-form-group">
				<view class="title">需求省市</view>
				<pcd v-model="pcd" />
			</view> -->

			<view class="cu-form-group">
				<view class="title">{{showStar('transaction')}}看房</view>
				<single-picker :range="kanfangs" v-model="formBean.kanfang" />
			</view>
			<!-- <view class="cu-form-group">
				<view class="title">{{showStar('transaction')}}钥匙</view>
				<single-picker :range="yaoshis" v-model="formBean.yaoshi" />
			</view> -->
			<view class="cu-form-group">
				<view class="title">
					钥匙说明
				</view>
				<input placeholder="填写钥匙说明" />
			</view>
			<view class="cu-form-group">
				<view class="title">{{showStar('transaction')}}来源</view>
				<single-picker :range="laiyuans" v-model="formBean.laiyuan" />
			</view>
			<view class="cu-form-group">
				<view class="title">{{showStar('transaction')}}现状</view>
				<single-picker :range="xianzhuangs" v-model="formBean.xianzhuang" />
			</view>
			<view class="cu-form-group">
				<view class="title">{{showStar('guanzhu')}}家具</view>
				<multi-picker class="show-arrow" :range="jiajus" v-model="formBean.jiaju" rangeKey="text" />
			</view>
			<view class="cu-form-group">
				<view class="title">{{showStar('guanzhu')}}标签</view>
				<multi-picker class="show-arrow" :range="biaoqians" v-model="formBean.biaoqian" rangeKey="text" />
			</view>
			<view class="cu-form-group">
				<view class="title">{{showStar('guanzhu')}}配套</view>
				<multi-picker class="show-arrow" :range="peitaos" v-model="formBean.peitao" rangeKey="text" />
			</view>

			<view class="cu-form-group">
				<textarea :maxlength="200" @input="textareaInput" placeholder="备注" :value="remark"></textarea>
			</view>

			<view class="cu-form-group">
				<view class="title">
					产证人
				</view>
				<input placeholder="填写产证人" />
			</view>
			<view class="cu-form-group">
				<view class="title">
					手机
				</view>
				<input placeholder="手机" />
			</view>
			<view class="cu-form-group">
				<view class="title">
					看房人
				</view>
				<input placeholder="填写看房人" />
			</view>
			<view class="cu-form-group">
				<view class="title">
					手机
				</view>
				<input placeholder="手机" />
			</view>
			<view class="cu-form-group">
				<view class="title">
					产证号
				</view>
				<input placeholder="填写产证号" />
			</view>
			<view class="cu-form-group">
				<view class="title">
					核实码
				</view>
				<input placeholder="填写核实码" />
			</view>
			<view class="cu-form-group">
				<view class="title">挂牌日期</view>
				<picker mode="date" :value="formBean.gp_date" start="2015-09-01" end="2020-09-01" @change="dateChange">
					<view class="picker">
						{{formBean.gp_date?formBean.gp_date:'选择日期'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">
					操作码
				</view>
				<input placeholder="填写操作码" />
			</view>
			<view class="cu-form-group">
				<view class="title">归属员工1</view>
				<navigator class="show-arrow" url="/pages/customer/employee/index" hover-class="none">
					<ava v-if="selEmployee.id" :name="selEmployee.name" :url="selEmployee.avatar" />
					<view v-else>未选择归属</view>
				</navigator>
			</view>
			<view class="cu-form-group">
				<view class="title">归属员工2</view>
				<navigator class="show-arrow" url="/pages/customer/employee/index" hover-class="none">
					<ava v-if="selEmployee.id" :name="selEmployee.name" :url="selEmployee.avatar" />
					<view v-else>未选择归属</view>
				</navigator>
			</view>
			<view class="cu-form-group">
				<view class="title">首录人</view>
				<navigator class="show-arrow" url="/pages/customer/employee/index" hover-class="none">
					<ava v-if="selEmployee.id" :name="selEmployee.name" :url="selEmployee.avatar" />
					<view v-else>未选择归属</view>
				</navigator>
			</view>
		</form>

		<save @save="handleSave" :loading="formLoading" />
	</view>
</template>

<script>
	import RangPicker from '@/components/rang-picker'
	import MultiPicker from '@/components/multi-picker'
	import SinglePicker from '@/components/single-picker'
	import Save from '@/components/buttom-button'
	import Pcd from '@/components/pcd'
	import {
		priceMap,
		priceUnitMap,
		unitMap
	} from '@/utils/const'
	import Ava from '@/components/avatar'

	export default {
		onLoad(opt) {
			if (opt.id) {
				this.id = opt.id
				this.getNeed()
			}
			this.type = opt.type
			this.customerId = opt.cId
			this.$http('path').then(r => {
				this.rules = r.data.find(i => i.field == 'CustomerDemand').values.filter(i => i.mapping == this.type).filter(i =>
					i.required)
			})
			this.$http('attribute').then(r => {
				this.allSels = r.data['CustomerDemand']
				this.kangxings = this.allSels.kangxing.filter(i => i.mapping == this.type)
				this.guanzhus = this.allSels.guanzhu.filter(i => i.mapping == this.type)
				this.intentions = this.allSels.intention.filter(i => i.mapping == this.type)
				this.transactions = this.allSels.transaction.filter(i => i.mapping == this.type)
				this.payment_types = this.allSels.payment_type.filter(i => i.mapping == this.type)
			})
		},
		data: _ => ({
			formLoading: false,
			id: '',
			type: '',
			zidians: [],
			danyuans: [],
			rooms: [],
			rules: [],
			multiTypes: [
				[{
						text: '一室',
						value: 1
					},
					{
						text: '二室',
						value: 2
					},
					{
						text: '三室',
						value: 3
					},
					{
						text: '四室',
						value: 4
					},
					{
						text: '五室',
						value: 5
					},
				],
				[{
						text: '一厅',
						value: 1
					},
					{
						text: '二厅',
						value: 2
					},
					{
						text: '三厅',
						value: 3
					},
					{
						text: '四厅',
						value: 4
					},
					{
						text: '五厅',
						value: 5
					},
				],
				[{
						text: '一卫',
						value: 1
					},
					{
						text: '二卫',
						value: 2
					},
					{
						text: '三卫',
						value: 3
					},
					{
						text: '四卫',
						value: 4
					},
					{
						text: '五卫',
						value: 5
					},
				],
				[{
						text: '一台',
						value: 1
					},
					{
						text: '二台',
						value: 2
					},
					{
						text: '三台',
						value: 3
					},
					{
						text: '四台',
						value: 4
					},
				]
			],
			multiInx: [0, 0, 0, 0],

			priceMap,
			priceUnitMap,
			unitMap,

			vRange: [],
			uRange: [],
			sRange: [],

			allSels: {},

			kangxings: [],
			selKangxing: [],

			guanzhus: [],
			selGuanzhu: [],

			intentions: [],
			selIntention: '',

			transactions: [],
			selTransaction: '',

			payment_types: [],
			selPay: '',

			terms: [{
				text: '2天内',
				value: 100
			}, {
				text: '3天内',
				value: 1
			}, {
				text: '5天内',
				value: 2
			}, {
				text: '1周内',
				value: 3
			}, {
				text: '2周内',
				value: 4
			}, {
				text: '3周内',
				value: 5
			}, {
				text: '1月内',
				value: 6
			}, {
				text: '2月内',
				value: 7
			}, {
				text: '3月内',
				value: 8
			}],
			selTerm: '',

			renovations: [{
					title: "毛坯",
					id: 100
				},
				{
					title: "精装",
					id: 1
				},
				{
					title: "简装",
					id: 2
				},
				{
					title: "清水",
					id: 3
				},
				{
					title: "中装",
					id: 4
				},
				{
					title: "高装",
					id: 5
				},
				{
					title: "豪装",
					id: 6
				},
				{
					title: "新装修",
					id: 7
				}
			],
			selRenovation: '',

			orientations: [{
					title: "正东",
					id: 100
				},
				{
					title: "正南",
					id: 1
				},
				{
					title: "正北",
					id: 2
				},
				{
					title: "正西",
					id: 3
				},
				{
					title: "东西",
					id: 4
				},
				{
					title: "东南",
					id: 5
				},
				{
					title: "东北",
					id: 6
				},
				{
					title: "西南",
					id: 7
				},
				{
					title: "西北",
					id: 8
				},
				{
					title: "南北",
					id: 9
				}
			],
			selOrientation: '',

			floors: [{
					title: "1-5楼",
					id: 100
				},
				{
					title: "6-10楼",
					id: 1
				},
				{
					title: "11-15楼",
					id: 2
				},
				{
					title: "16-20楼",
					id: 3
				},
				{
					title: "21-25楼",
					id: 4
				},
				{
					title: "26-30楼",
					id: 5
				},
				{
					title: "31-35楼",
					id: 6
				},
				{
					title: "36-40楼",
					id: 7
				},
				{
					title: "41-45楼",
					id: 8
				},
				{
					title: "46-50楼",
					id: 9
				},
				{
					title: "51-55楼",
					id: 10
				},
				{
					title: "56-60楼",
					id: 11
				},
				{
					title: "61-65楼",
					id: 12
				},
				{
					title: "66-70楼",
					id: 13
				},
				{
					title: "71-75楼",
					id: 14
				},
				{
					title: "76-80楼",
					id: 15
				},
				{
					title: "81-85楼",
					id: 16
				},
				{
					title: "86-90楼",
					id: 17
				},
				{
					title: "91-95楼",
					id: 18
				},
				{
					title: "96-100楼",
					id: 19
				}
			],
			selFloor: '',

			customerId: '',

			remark: '',

			pcd: [],


			jiaoyi2s: [{
					id: 1,
					name: "有效"
				},
				{
					id: 2,
					name: "预定"
				},
				{
					id: 3,
					name: "暂缓"
				},
				{
					id: 4,
					name: "已售"
				},
				{
					id: 5,
					name: "已租"
				},
				{
					id: 6,
					name: "无效"
				},
				{
					id: 7,
					name: "未知"
				}
			],
			jiaoyi3s: [{
				id: 1,
				name: "私盘"
			}, {
				id: 2,
				name: "公盘"
			}],
			yongtu2s: [{
					id: 1,
					name: "普通住宅"
				},
				{
					id: 2,
					name: "商住两用"
				},
				{
					id: 3,
					name: "公寓"
				},
				{
					id: 4,
					name: "酒店公寓"
				},
				{
					id: 5,
					name: "别墅"
				}
			],
			yongtu3s: [{
					id: 1,
					name: "板式楼"
				},
				{
					id: 2,
					name: "典式楼"
				},
				{
					id: 3,
					name: "板典结合"
				}
			],
			yongtu4s: [{
					id: 1,
					name: "平层"
				},
				{
					id: 2,
					name: "跃层"
				},
				{
					id: 3,
					name: "复式"
				},
				{
					id: 4,
					name: "错间"
				},
				{
					id: 5,
					name: "开间"
				},
				{
					id: 6,
					name: "挑高"
				}
			],
			zhuangxius: [{
					id: 1,
					name: "毛坯"
				},
				{
					id: 2,
					name: "简装"
				},
				{
					id: 3,
					name: "精装"
				},
				{
					id: 4,
					name: "清水"
				},
				{
					id: 5,
					name: "中装"
				},
				{
					id: 6,
					name: "豪装"
				},
				{
					id: 7,
					name: "高装"
				},
				{
					id: 8,
					name: "新装修"
				}
			],
			chaoxiangs: [{
					id: 1,
					name: "南北"
				},
				{
					id: 2,
					name: "东西"
				},
				{
					id: 3,
					name: "正东"
				},
				{
					id: 4,
					name: "正南"
				},
				{
					id: 5,
					name: "正北"
				},
				{
					id: 6,
					name: "正西"
				},
				{
					id: 7,
					name: "东北"
				},
				{
					id: 8,
					name: "东南"
				},
				{
					id: 9,
					name: "西南"
				},
				{
					id: 10,
					name: "西北"
				}
			],
			kanfangs: ["", "早晨", "中午", "晚上", "周末", "工作日", "随时", "预约"],
			yaohsis: ["", "借钥匙", "无钥匙"],
			laiyuans: [{
					text: "公司官网",
					id: 1
				},
				{
					text: "赶集网",
					id: 2
				},
				{
					text: "58同城",
					id: 3
				},
				{
					text: "搜房",
					id: 4
				},
				{
					text: "安居客",
					id: 5
				},
				{
					text: "其他网",
					id: 6
				},
				{
					text: "派单/驻守",
					id: 7
				},
				{
					text: "来访",
					id: 8
				},
				{
					text: "朋友介绍",
					id: 9
				},
				{
					text: "洗客/盘",
					id: 10
				}
			],
			xianzhuangs: [{
					text: "租客住",
					id: 1
				},
				{
					text: "业主住",
					id: 2
				},
				{
					text: "空房",
					id: 3
				}
			],
			jiajus: [{
					text: "床",
					id: 1
				},
				{
					text: "宽带",
					id: 2
				},
				{
					text: "电视",
					id: 3
				},
				{
					text: "冰箱",
					id: 4
				},
				{
					text: "洗衣机",
					id: 5
				},
				{
					text: "空调",
					id: 6
				},
				{
					text: "热水器",
					id: 7
				},
				{
					text: "暖气",
					id: 8
				},
				{
					text: "沙发",
					id: 9
				},
				{
					text: "家具",
					id: 10
				},
				{
					text: "家具",
					id: 11
				},
				{
					text: "厨具",
					id: 12
				},
				{
					text: "地板",
					id: 13
				},
				{
					text: "地砖",
					id: 14
				}
			],
			biaoqians: [
				"交通便利",
				"随时看房",
				"家电齐全",
				"紧急租售",
				"免中介费",
				"学校周边",
				"小户型",
				"端头房"
			],
			peitaos: [{
					text: "煤气/天然气",
					id: 1
				},
				{
					text: "暖气",
					id: 2
				},
				{
					text: "电梯",
					id: 3
				},
				{
					text: "车位/车库",
					id: 4
				},
				{
					text: "储藏室/地下室",
					id: 5
				},
				{
					text: "花园/小院",
					id: 6
				},
				{
					text: "露台",
					id: 7
				},
				{
					text: "阁楼",
					id: 8
				},
				{
					text: "宽带",
					id: 9
				},
				{
					text: "游泳池",
					id: 10
				},
				{
					text: "阳光房",
					id: 11
				}
			],
			formBean: {
				jiaoyi_status: '',
				jiaoyi_pan: '',
				leixing: '',
				yongtu3: '',
				jiegou: '',
				zhuangxiu: '',
				chaoxiang: '',
				kanfang: '',
				laiyuan: '',
				jiaju: [],
				biaoqian: [],
				peitao: [],
				gp_date: ''
			},

			selEmployee: {}
		}),
		methods: {
			dateChange(e) {
				this.formBean.gp_date = e.detail.value
			},
			textareaInput(e) {
				this.remark = e.detail.value
			},
			multiChange(e) {
				this.multiInx = e.detail.value
			},
			handleSave() {
				let data = {
					house_using_type_name: "住宅",
					type: this.type,
					guanzhu: this.selGuanzhu,
					intention: this.selIntention,
					kangxing: this.selKangxing,
					payment_type: this.selPay,
					transaction: this.selTransaction,
					customer_id: this.customerId,

					price_start: this.vRange[0],
					price_end: this.vRange[1],
					area_start: this.sRange[0],
					area_end: this.sRange[1],
					unit_price_start: this.uRange[0],
					unit_price_end: this.uRange[1],

					shi: this.multiInx[0] + 1,
					ting: this.multiInx[1] + 1,
					wei: this.multiInx[2] + 1,
					tai: this.multiInx[3] + 1,

					remark: this.remark,

					term: this.selTerm,
					floor: this.selFloor,
					renovation: this.selRenovation,
					orientation: this.selOrientation,

					province_id: this.pcd.length ? this.pcd[0] : null,
					city_id: this.pcd.length ? this.pcd[1] : null,
					district_id: this.pcd.length ? this.pcd[2] : null,
					area_id: this.pcd.length ? this.pcd[3] : null
				}
				if (!this.validateForm(data)) {
					return
				}
				if (this.id) {
					this.formLoading = true
					this.$http(`customerDemand/${this.id}`, data, 'put').then(r => {
						uni.navigateBack()
					}).finally(_ => {
						this.formLoading = false
					})
				} else {
					this.formLoading = true
					this.$http('customerDemand', data, 'post').then(r => {
						uni.navigateBack({
							delta: 2
						})
					}).finally(_ => {
						this.formLoading = false
					})
				}
			},
			validateForm(data) {
				for (let i of this.rules) {
					if (!data[i.field]) {
						uni.showToast({
							title: `${i.name}是必须的`,
							icon: 'none'
						})
						return false
					}
				}
				return true
			},
			showStar(field) {
				return this.rules.findIndex(i => i.field == field) > -1 ? '*' : ''
			},
			getNeed() {
				this.$http(`customerDemand/${this.id}`).then(r => {
					let d = r.data
					this.selKangxing = d.kangxing
					this.selGuanzhu = d.guanzhu
					this.selIntention = d.intention
					this.selOrientation = d.orientation
					this.selPay = d.payment_type
					this.selTerm = d.term
					this.selFloor = d.floor
					this.selRenovation = d.renovation
					this.selTransaction = d.transaction
					this.remark = d.remark

					this.multiInx = [
						d.shi ? d.shi - 1 : 0,
						d.ting ? d.ting - 1 : 0,
						d.wei ? d.wei - 1 : 0,
						d.tai ? d.tai - 1 : 0
					]

					this.vRange = [
						d.price_start ? d.price_start : 0,
						d.price_end ? d.price_end : 0
					]

					this.uRange = [
						d.unit_price_start ? d.unit_price_start : 0,
						d.unit_price_end ? d.unit_price_end : 0
					]

					this.sRange = [
						d.area_start ? d.area_start : 0,
						d.area_end ? d.area_end : 0
					]

					this.pcd = [
						d.province_id, d.city_id, d.district_id, d.area_id
					]
				})
			}
		},
		components: {
			RangPicker,
			Save,
			MultiPicker,
			SinglePicker,
			Pcd,
			Ava
		},
		watch: {
			'pcd': {
				handler(v) {
					if(v[1]) {
						this.$http('second-project', {
							'data_type': 'get',
							'city_id': v[1]
						}).then(r => {
							this.zidians = r.data
						})
					}
				}
			},
			'formBean.zidian': {
				handler(v) {
					if(v) {
						this.$http('secondHouse/secondBuilding', {
							'data_type': 'get',
							'second_project_id': v,
							'type': '栋'
						}).then(r => {
							this.danyuans = r.data
						})
					}
				}
			},
			'formBean.danyuan': {
				handler(v) {
					if(v) {
						this.$http('secondHouse/secondHouseDictionary', {
							'building_id': v,
						}).then(r => {
							this.rooms = r.data
						})
					}
				}
			}
		}
	}
</script>
