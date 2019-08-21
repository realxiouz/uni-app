<template>
	<view>
		<view class="cu-bar bg-white">
			<view class="action">
				{{title}}
			</view>
			<view class="action">
				{{imgList.length}}/{{maxCount}}
			</view>
		</view>
		<view class="cu-form-group">
			<view class="grid col-4 grid-square flex-sub">
				<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="viewImage" :data-url="imgList[index]">
					<image :src="imgList[index]" mode="aspectFill"></image>
					<view class="cu-tag bg-red" @tap.stop="delImg" :data-index="index">
						<text class='cuIcon-close'></text>
					</view>
				</view>
				<view class="solids" @tap="chooseImage" v-if="imgList.length<maxCount">
					<text class="cuIcon-cameraadd" v-if="!loading"></text>
					<view class="cu-load load-cuIcon loading" v-else></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		QINIU,
		QINIU_PUBLIC
	} from '@/utils/const'
	import moment from 'moment'
	import {
		mapState
	} from 'vuex'

	export default {
		created() {
			this.$http('image/token?public=true').then(r => {
				this.token = r.token
			})
		},
		data: _ => ({
			imgList: [],
			loading: false,
			token: ''
		}),
		props: {
			title: {
				type: String,
				default: '图片上传'
			},
			maxCount: {
				type: Number,
				default: 3
			},
			source: {
				type: Array,
				default: _ => (['camera'])
			}
		},
		methods: {
			chooseImage() {
				uni.chooseImage({
					count: this.maxCount - this.imgList.length,
					sizeType: ['original', 'compressed'],
					sourceType: this.source,
					success: (res) => {
						this.upLoad(res.tempFilePaths)
					}
				})
			},
			viewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				})
			},
			delImg(e) {
				uni.showModal({
					title: '请注意',
					content: '确定要删除该图片？',
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1)
							this.$emit('imgs', this.imgList)
						}
					}
				})
			},
			upLoad(arr) {
				this.loading = true
				let pAll = []
				for (let i of arr) {
					let r100 = Math.floor(Math.random() * 100)
					let fmt = ""
					if (i.lastIndexOf(".") > -1) {
						fmt = i.slice(i.lastIndexOf("."));
					}
					let key = `${this.userInfo.company_id}/company/${moment().format("YYYYMM")}/${new Date().getTime()}${r100}${fmt}`
					pAll.push(uni.uploadFile({
						url: QINIU,
						name: 'file',
						filePath: i,
						header: {
							'content-type': 'multipart/form-data'
						},
						formData: {
							token: this.token,
							key
						}
					}))
				}
				Promise.all(pAll).then(r => {
					for (let i of r) {
						let [err, res] = i
						if (res.statusCode === 200) {
							let data = JSON.parse(res.data)
							this.imgList.push(`${QINIU_PUBLIC}${data.key}`)
						}
					}
					this.loading = false
					this.$emit('imgs', this.imgList)
				})
			}
		},
		computed: {
			...mapState(['userInfo'])
		}
	}
</script>

<style>
</style>
