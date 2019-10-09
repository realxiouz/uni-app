<template>
	<view>
		<!-- #ifndef H5  -->
		<template v-if="hasFeature('attendance')">
			<view class="cu-bar bg-white solid-bottom margin-top">
				<view class="action">
					<text class="cuIcon-title text-orange "></text> 智能考勤
				</view>
				<!-- <view class="action">
					<button class="cu-btn bg-green shadow" @tap="showModal" data-target="gridModal">设置</button>
				</view> -->
			</view>
			<view class="cu-list grid col-4 no-border">
				<view class="cu-item" v-for="(item,index) in attendanceList" :key="index">
					<view :class="['cuIcon-' + item.cuIcon,'text-' + item.color]" @click="handleNav(item.path)">
						<view class="cu-tag badge" v-if="item.badge">
							<block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
						</view>
					</view>
					<text>{{item.name}}</text>
				</view>
			</view>
		</template>
		<!-- #endif -->
		<template>
            <view class="cu-bar bg-white solid-bottom margin-top">
                <view class="action">
                    <text class="cuIcon-title text-orange "></text> 楼盘
                </view>
            </view>
            <view class="cu-list grid col-4 no-border">
                <view class="cu-item" v-for="(item,index) in projectList" :key="index" v-if="hasFeature(item.hasFeatures) || (item.name === '云端楼盘' && userInfo.company_id === null)">
                    <view :class="['cuIcon-' + item.cuIcon,'text-' + item.color]" @click="handleNav(item.path)">
                        <view class="cu-tag badge" v-if="item.badge">
                            <block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
                        </view>
                    </view>
                    <text>{{item.name}}</text>
                </view>
            </view>
        </template>
		
		<template v-if="hasFeature('customer sales')">
			<view class="cu-bar bg-white solid-bottom margin-top">
				<view class="action">
					<text class="cuIcon-title text-orange "></text>客户管理
				</view>
			</view>
			<view class="cu-list grid col-4 no-border">
				<view class="cu-item" v-for="(i, inx) in customer1" :key="inx" @click="handleNav(i.path)">
					<view :class="['cuIcon-' + i.cuIcon,'text-' + i.color]">
					</view>
					<text>{{i.name}}</text>
				</view>
			</view>
		</template>
		
		<template v-if="hasFeature('baobei up') || hasFeature('customer distribution')">
			<view class="cu-bar bg-white solid-bottom margin-top">
				<view class="action">
					<text class="cuIcon-title text-orange "></text>客户管理
				</view>
			</view>
			<view class="cu-list grid col-4 no-border">
				<view class="cu-item" v-for="(i, inx) in customer2" :key="inx" @click="handleNav(i.path)">
					<view :class="['cuIcon-' + i.cuIcon,'text-' + i.color]">
					</view>
					<text>{{i.name}}</text>
				</view>
			</view>
		</template>
        <template v-if="hasFeature('second house')">
            <view class="cu-bar bg-white solid-bottom margin-top">
                <view class="action">
                    <text class="cuIcon-title text-orange "></text>二手房管理
                </view>
            </view>
            <view class="cu-list grid col-4 no-border">
                <view class="cu-item" v-for="(i, inx) in secondHouseList" :key="inx" @click="handleNav(i.path)">
                    <view :class="['cuIcon-' + i.cuIcon,'text-' + i.color]">
                    </view>
                    <text>{{i.name}}</text>
                </view>
            </view>
        </template>
		<template v-if="hasFeature('channel')">
		    <view class="cu-bar bg-white solid-bottom margin-top">
		        <view class="action">
		            <text class="cuIcon-title text-orange "></text>渠道管理
		        </view>
		    </view>
		    <view class="cu-list grid col-4 no-border">
		        <view class="cu-item" v-for="(i, inx) in channel" :key="inx" @click="handleNav(i.path)">
		            <view :class="['cuIcon-' + i.cuIcon,'text-' + i.color]">
		            </view>
		            <text>{{i.name}}</text>
		        </view>
		    </view>
		</template>
		<!-- <template v-if="">
			<view class="cu-bar bg-white solid-bottom margin-top">
				<view class="action">
					<text class="cuIcon-title text-orange "></text>客户列表
				</view>
			</view>
			<view class="cu-list grid col-4 no-border">
				<view class="cu-item" v-for="(item,index) in projectList" :key="index">
					<view :class="['cuIcon-' + item.cuIcon,'text-' + item.color]" @click="handleNav(item.path)">
					</view>
					<text>{{item.name}}</text>
				</view>
			</view>
		</template> -->
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		
		data() {
			return {
				cuIconList: [{
					cuIcon: 'vipcard',
					color: 'red',
					badge: 0,
					name: '打卡'
				}, {
					cuIcon: 'settingsfill',
					color: 'orange',
					badge: 0,
					name: '设置',
					path: '/pages/test/index/index'
				}],
				attendanceList: [
					{
						cuIcon: 'vipcard',
						color: 'green',
						badge: 0,
						name: '打卡',
						path: '/pages/attendance/signin/index'
					},
					{
						cuIcon: 'settingsfill',
						color: 'blue',
						badge: 0,
						name: '设置',
						path: '/pages/attendance/setting/index'
					}
				],
				projectList: [
					{
						cuIcon: 'read',
						color: 'green',
						badge: 0,
						name: '报备楼盘',
						path: '/pages/project/list/index?type=cooperation',
						hasFeatures: 'baobei up'
					},
					{
						cuIcon: 'list',
						color: 'green',
						badge: 0,
						name: '报备列表',
						path: `/pages/baobei/list/index?type=up`,
						hasFeatures: 'baobei up'
					},
					{
						cuIcon: 'list',
						color: 'green',
						badge: 0,
						name: '报备列表',
						path: `/pages/baobei/list/index?type=in`,
						hasFeatures: 'baobei in'
					},
					{
						cuIcon: 'circlefill',
						color: 'green',
						badge: 0,
						name: '云端楼盘',
						path: '/pages/project/list/index?type=public',
                        hasFeatures: 'baobei up'
					}
				],
				customer1: [
					{
						cuIcon: 'peoplelist',
						color: 'green',
						name: '客户列表',
						path: '/pages/customer/index/all?type=新房'
					},
					{
						cuIcon: 'share',
						color: 'green',
						name: '共享客户',
						path: '/pages/customer/index/index?type=新房&is_share=true'
					},
					{
						cuIcon: 'profile',
						color: 'green',
						name: '客户公池',
						path: '/pages/customer/index/index?type=新房&private=false'
					},
				],
				customer2: [
					{
						cuIcon: 'peoplelist',
						color: 'green',
						name: '客户列表',
						path: '/pages/customer/index/all?type=分销'
					},
					{
						cuIcon: 'share',
						color: 'green',
						name: '共享客户',
						path: '/pages/customer/index/index?type=分销&is_share=true'
					},
					{
						cuIcon: 'profile',
						color: 'green',
						name: '客户公池',
						path: '/pages/customer/index/index?type=分销&private=false'
					}
				],
                secondHouseList: [
                    {
                        cuIcon: 'goods',
                        color: 'green',
                        name: '房源管理',
                        path: `/pages/second/list/index`
                    },
                    {
                        cuIcon: 'shop',
                        color: 'green',
                        name: '合同管理',
                        path: ''
                    }

                ],
				channel: [
					{
						cuIcon: 'goods',
						color: 'green',
						name: '渠道列表',
						path: `/pages/channel/list/index`
					}
				]
			};
		},
		onShow() {},
        onLoad() {

        },
		methods: {
			handleNav(url) {
                if (this.shopId && /type=cooperation/.test(url)) {
                    uni.navigateTo({
                        url: `/pages/project/list/index?type=shop&shop_id=${this.shopId}`
                    });
                } else if (url) {
					uni.navigateTo({ url })
				}
			},
			hasFeature(f) {
				return this.userInfo.company.features.findIndex(i => i == f) > -1
			}
		},
		computed: {
			...mapState(['hasLogin', 'userInfo']),
            ...mapState('work', ['shopId'])
		},
        mounted() {}
	}
</script>

<style>
</style>
