<template>
	<view>
		<!-- #ifndef H5  -->
		<template v-if="hasFeature(attendanceList.feature, attendanceList.perm)">
			<view class="cu-bar bg-white solid-bottom margin-top">
				<view class="action">
					<text class="cuIcon-title text-orange "></text> {{attendanceList.text}}
				</view>
			</view>
			<view class="cu-list grid col-4 no-border">
				<view class="cu-item" v-for="(item,index) in attendanceList.list" :key="index" @click="handleNav(item.path)">
					<view :class="['cuIcon-' + item.cuIcon,'text-' + item.color]">
						<view class="cu-tag badge" v-if="item.badge">
							<block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
						</view>
					</view>
					<text>{{item.name}}</text>
				</view>
			</view>
		</template>
		<!-- #endif -->
		<template v-if="hasFeature(projectList.feature, projectList.perm)">
            <view class="cu-bar bg-white solid-bottom margin-top">
                <view class="action">
                    <text class="cuIcon-title text-orange "></text> {{projectList.text}}
                </view>
            </view>
            <view class="cu-list grid col-4 no-border">
                <view class="cu-item" v-for="(item,index) in projectList.list" v-if="hasPerm(item.perm)" :key="index" @click="handleNav(item.path)">
                    <view :class="['cuIcon-' + item.cuIcon,'text-' + item.color]">
                        <view class="cu-tag badge" v-if="item.badge">
                            <block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
                        </view>
                    </view>
                    <text>{{item.name}}</text>
                </view>
            </view>
        </template>

		<template v-if="hasFeature(customer1.feature, customer1.perm)">
			<view class="cu-bar bg-white solid-bottom margin-top">
				<view class="action">
					<text class="cuIcon-title text-orange"></text>{{customer1.text}}
				</view>
			</view>
			<view class="cu-list grid col-4 no-border">
				<view class="cu-item" v-for="(i, inx) in customer1.list" :key="inx" @click="handleNav(i.path)">
					<view :class="['cuIcon-' + i.cuIcon,'text-' + i.color]">
					</view>
					<text>{{i.name}}</text>
				</view>
			</view>
		</template>

		<template v-if="hasFeature(customer2.feature, customer2.perm)">
			<view class="cu-bar bg-white solid-bottom margin-top">
				<view class="action">
					<text class="cuIcon-title text-orange "></text>{{customer2.text}}
				</view>
			</view>
			<view class="cu-list grid col-4 no-border">
				<view class="cu-item" v-for="(i, inx) in customer2.list" :key="inx" @click="handleNav(i.path)">
					<view :class="['cuIcon-' + i.cuIcon,'text-' + i.color]">
					</view>
					<text>{{i.name}}</text>
				</view>
			</view>
		</template>
        <template v-if="hasFeature(secondHouseList.feature, secondHouseList.perm)">
            <view class="cu-bar bg-white solid-bottom margin-top">
                <view class="action">
                    <text class="cuIcon-title text-orange "></text>{{secondHouseList.text}}
                </view>
            </view>
            <view class="cu-list grid col-4 no-border">
                <view class="cu-item" v-for="(i, inx) in secondHouseList.list" :key="inx" @click="handleNav(i.path)">
                    <view :class="['cuIcon-' + i.cuIcon,'text-' + i.color]">
                    </view>
                    <text>{{i.name}}</text>
                </view>
            </view>
        </template>
		<template v-if="hasFeature(channel.feature, channel.perm)">
		    <view class="cu-bar bg-white solid-bottom margin-top">
		        <view class="action">
		            <text class="cuIcon-title text-orange "></text>{{channel.text}}
		        </view>
		    </view>
		    <view class="cu-list grid col-4 no-border">
                <!--v-if="hasFeature(i.hasFeatures)"-->
		        <view class="cu-item" v-for="(i, inx) in channel.list" :key="inx" @click="handleNav(i.path)" v-if="hasFeature(i.features) && hasPerm(i.perm)">
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
	import { mapState, mapMutations, mapActions } from 'vuex';
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
				attendanceList: {
                    feature: "attendance",
                    text: "智能考勤",
				    list: [
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
                    ]
                },
				projectList: {
                    text: "分销楼盘",
                    feature: "baobei up",
                    perm: ["project sign", "create project", "view baobei list distribution"],
				    list: [
                        {
                            cuIcon: 'read',
                            color: 'green',
                            badge: 0,
                            name: '报备楼盘',
                            path: '/pages/project/list/index?type=cooperation',
                            perm: ["create project", "view baobei list distribution"]
                        },
                        {
                            cuIcon: 'list',
                            color: 'green',
                            name: '报备列表',
                            path: `/pages/baobei/list/index?type=up`,
                            perm: ["view baobei list distribution"]
                        },
                        {
                            cuIcon: 'circlefill',
                            color: 'green',
                            badge: 0,
                            name: '云端楼盘',
                            path: '/pages/project/list/index?type=public',
                            perm: ["project sign", "create project"]
                        }
                    ]
                },
				customer1: {
                    text: '客户管理',
                    feature: "customer sales",
                    perm: ["view customer list", "view customer list sub", "view customer list personal"],
				    list: [
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
                            path: '/pages/customer/index/share?type=新房&share=true'
                        },
                        {
                            cuIcon: 'profile',
                            color: 'green',
                            name: '客户公池',
                            path: '/pages/customer/index/index?type=新房&private=false'
                        },
                    ]
                },
				customer2: {
                    text: '客户管理',
                    feature: ["baobei up", "customer distribution"],
                    perm: ["view customer list", "view customer list sub", "view customer list personal"],
				    list: [
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
                            path: '/pages/customer/index/share?type=分销&share=true'
                        },
                        {
                            cuIcon: 'profile',
                            color: 'green',
                            name: '客户公池',
                            path: '/pages/customer/index/index?type=分销&private=false'
                        }
                    ]
                },
                secondHouseList: {
                    text: '二手房管理',
                    feature: "second house",
				    list: [
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

                    ]
                },
				channel: {
                    text: '渠道管理',
                    feature: ["channel", "baobei in"],
                    perm: [
                        "Channel view",
                        "Channel view sub",
                        "Channel view personal",
                        "Channel sign",
                        "Channel sign sub",
                        "Channel sign personal",
                        "create project",
                        "view baobei list",
                        "view house deal logs",
                        "create baobei phone"
                    ],
				    list: [
                        {
                            cuIcon: 'goods',
                            color: 'green',
                            name: '渠道列表',
                            path: `/pages/channel/list/index`,
                            features: 'channel'
                        },
                        {
                            cuIcon: 'goods',
                            color: 'green',
                            name: '渠道公池',
                            path: `/pages/channel/list/pool`,
                            features: 'channel'
                        },
                        {
                            cuIcon: 'list',
                            color: 'green',
                            name: '报备列表',
                            path: `/pages/baobei/list/index?type=in`,
                            features: 'baobei in',
                            perm: ['view baobei list']
                        }
                    ]
                },
			};
		},
        watch: {
		    userInfo: {
		        handler(data) {
                    uni.setNavigationBarTitle({
                        title: data.company.software_name || '工作'
                    });
                },
                deep: true
            }
        },
        onHide() {},
        onLoad() {
            this.getUserInfo(this.$http);
            uni.setNavigationBarTitle({
                title: this.userInfo.company.software_name || '工作'
            });
        },
        onShow() {},
		methods: {
		    ...mapActions(['getUserInfo']),
		    ...mapMutations(['login']),
			handleNav(url) {
                if (this.shopId && /type=cooperation/.test(url)) {
                    uni.navigateTo({
                        url: `/pages/project/list/index?shop_id=${this.shopId}`
                    });
                } else if (url) {
					uni.navigateTo({ url })
				}
			},
            hasFeature(feature, perm) {
                if (!this.userInfo.company) this.userInfo.company = {features: []};
                let isFeature = this.hasValue(feature, this.userInfo.company.features);
                if (!isFeature || !perm) return isFeature;
                if (!this.userInfo.allPermissions) this.userInfo.allPermissions = [];
                let isPerm = this.hasValue(perm, this.userInfo.allPermissions);
                return perm? (isFeature && isPerm): isFeature;
            },
            hasPerm(perm) {
                if (!perm) return true;
                if (!this.userInfo.allPermissions) this.userInfo.allPermissions = [];
                return this.hasValue(perm, this.userInfo.allPermissions);
            },
            hasValue(val, contrastObj) {
			    if (!contrastObj.length) return false;
			    let isTrue = false;
			    let arr = val instanceof Array? val: [val];
                for (let item of arr) {
                    isTrue = contrastObj.some(i => (typeof i === 'string'? i === item: i.name === item));
                    if (isTrue) break;
                }
                return isTrue;
            },
			/*hasFeature(f) {
			    let boolean = false;
                if (f instanceof Array) {
                    let index = this.userInfo.company.features.findIndex(i => i === f[0]) > -1;
                    let seeMenu = this.seeMenu(f[1]);
                    boolean = index && seeMenu;
                } else {
                    boolean = this.userInfo.company.features.findIndex(i => i === f) > -1;
                }
				return boolean;
			},
            seeMenu(permissions) {
			    if (!this.userInfo.allPermissions) return false;
                return this.userInfo.allPermissions.findIndex(i => i.name === permissions) > -1;
            },
            hasFeatureSome(f) {
			    let boolean = false;
			    if (f instanceof Array) {
			        let boo = false;
			        for (let item of f) {
			            boo = this.userInfo.company.features.some(i => item === i);
			            if (boo) break;
                    }
			        boolean = boo;
                }
			    return boolean;
            }*/
		},
		computed: {
			...mapState(['userInfo', 'token', 'defaultAvatar'])
		}
	}
</script>

<style>

</style>
