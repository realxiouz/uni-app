<template>
  <view>
    <view class="cu-list menu">
		<navigator class="cu-item arrow" url="/pages/contact/list/index?type=1" v-if="userInfo.company_id !== null && userInfo.company_id !== ''">
			<view class="content padding-tb-sm">
				<view class="text-black text-bold">{{userInfo.company.name}}</view>
				<view class="text-gray text-sm">本公司联系人</view>
			</view>
		</navigator>
		<navigator class="cu-item arrow" url="/pages/contact/list/index?type=2">
			<view class="content padding-tb-sm">
				<view class="text-black text-bold">外部联系人</view>
				<view class="text-gray text-sm">其他公司联系人</view>
			</view>
		</navigator>
	</view>
	<view class="cu-list menu">
		<view class="cu-item">
			<view class="text-black text-bold margin-right-sm">常用联系人</view>
			<view class="text-gray text-sm">最近10个联系人</view>
		</view>
		<view class="cu-item solid-bottom" v-for="(i, inx) in list" :key="inx">
			<navigator class="flex align-center bg-white padding-tb-sm content" :url="`/pages/contact/detail/index?id=${i.lianxi.id}`">
				<ava :name="i.lianxi.name" class="margin-right-sm"/>
				<view class="text-black text-bold margin-right-sm">{{i.lianxi.name}}</view>
				<view class="cu-tag bg-blue radius small" v-if="i.lianxi.role_name !== '' && i.lianxi.role_name !== null">{{i.lianxi.role_name}}</view>
				<view class="flex-sub"></view>
				<view class="text-xxl text-cyan" @click.stop="handleMessage(i.lianxi)">
					<text class="cuIcon cuIcon-message"></text>
				</view>
			</navigator>
		</view>
	</view>
  </view>
</template>

<script>
	import Ava from '@/components/avatar'
	import { mapState, mapActions } from 'vuex'
	export default {
		onLoad() {
		    this.getUserInfo().then(data => {
                if (data.isLoad) {
                    this.$http('common/contact').then(r => {
                        this.list = r.data
                    })
                }
            })
		},
        onShow() {},
		data() {
			return {
				list: []
			}
		},
		methods: {
		    ...mapActions(['getUserInfo']),
			handleMessage(i) {
				uni.navigateTo({
					url: `/pages/message/chat/index?id=${i.id}&type=App\\User&send-name=${i.name}`
				})
			}
		},
		components: {
			Ava
		},
		computed: {
			...mapState(['userInfo'])
		},
        mounted() {}
	}
</script>