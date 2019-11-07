<template>
	<view :style="{height: height+'px'}">
        <view class="search">
            <view>
                <view class="area">
                    <pcd :level="3" v-model="pcd" :last="true" :clear-content="clearContent" :unlimited="true" :last-style="true"/>
                </view>
                <view class="input">
                    <input type="text" placeholder="输入地址/楼盘名称" v-model="keywords" placeholder-class="placeholder">
                    <text class="cuIcon-close" @tap="clearData"></text>
                </view>
                <view class="btn">
                    <view class="w23 text-center radius padding-tb-xs padding-lr-xs text-white" @tap="searchData" style="background: #2F85FC;">查询</view>
                </view>
            </view>
        </view>
		<view :style="{height: height - 40 +'px'}">
            <data-list ref="list" @data="handleList" :r-url="rUrl" :r-data="rData">
                <project v-for="(i, inx) in list" :key="inx" :bean="i" :type="rData.route_type"/>
            </data-list>
        </view>
	</view>
</template>

<script>
	import DataList from '@/components/data-list'
	import Project from './components/project'
	import { mapMutations, mapState } from 'vuex';
	import Pcd from '@/components/pcd';
	
	export default {
		onLoad(opt) {
		    const self = this;
            const isShop = opt.type === 'shop';
            self.rUrl = isShop? 'project/shop': 'project';
            let titleObj = {
				cooperation: '报备楼盘',
				public: '云端楼盘',
                shop: '所有楼盘'
			};
			uni.setNavigationBarTitle({
			    title: titleObj[opt.type]
			});
            self.setListType(opt.type);
            if (isShop) {
                self.rData = {
                    shop_id: self.shopId,
                    recommend: 0,
                };
            }
            self.rData.route_type = opt.type;
            self.$nextTick(_ => {
                self.$refs.list.init();
                uni.getSystemInfo({
                    success(e) {
                        self.height = e.windowHeight
                    }
                });
			});
		},
		data() {
			return {
				list: [],
				rData: {
					route_type: '',
				},
                keywords: '',
                currentPage: '',
                isEnd: false,
                pcd: [],
                clearContent: '选择地区',
                isFirstSearch: true,
                height: 0,
                shop: '',
                rUrl: ''
            }
		},
		methods: {
			...mapMutations('project', ['setListType']),
			handleList(list) {
				this.list = list;
            },
            searchData() {
                if (this.pcd.length || this.keywords) {
                    let obj = Object.assign(this.rData, {
                        province_id: this.pcd[0] !== undefined? this.pcd[0]:  '',
                        city_id: (this.pcd[1] !== undefined) && this.pcd[1] >= 0? this.pcd[1]:  '',
                        district_id: (this.pcd[2] !== undefined) && this.pcd[2] >= 0? this.pcd[2]:  '',
                        keywords: this.keywords
                    });
                    this.rData = JSON.parse(JSON.stringify(obj));
                    if (this.isFirstSearch) this.searchBeforeList = JSON.parse(JSON.stringify(this.list));
                    this.$refs.list.scrollTop = 1;
                    this.currentPage = this.$refs.list.page;
                    this.isEnd = this.$refs.list.isEnd;
                    this.isFirstSearch = false;
                } else {
                    uni.showToast({
                        title: '搜索关键词不可为空...',
                        icon: 'none',
                        duration: 2000
                    });
                }
            },
            clearData() {
                Reflect.deleteProperty(this.rData, 'province_id');
                Reflect.deleteProperty(this.rData, 'city_id');
                Reflect.deleteProperty(this.rData, 'district_id');
                this.pcd = [];
                this.keywords = '';
                Reflect.deleteProperty(this.rData, 'keywords');
                this.$refs.list.scrollTop = 0;
                this.list = this.searchBeforeList;
                if (!this.isEnd) {
                    this.$refs.list.list = this.list;
                    this.$refs.list.isEnd = this.isEnd;
                    this.$refs.list.page = this.currentPage;
                }
            }
		},
        computed: {
		    ...mapState('project', ['shopId']),
            ...mapState(['isH5'])
        },
		components: {
			DataList, Project, Pcd
		},
        watch: {
		    pcd(val) {
                this.clearContent = val.length> 0? '': '选择地区';
            }
        }
	}
</script>


<style lang="scss" scoped>
    view {
        .search {
            position: relative;
            width: 100vw;
            view:nth-child(1) {
                display: flex;
                flex-direction: row;
                align-items: flex-end;
                padding: 10rpx 20rpx;
                .area {
                    position: relative;
                    max-width: 164rpx;
                    min-width: 164rpx;
                    height: 58rpx;
                    padding: 6rpx 40rpx 6rpx 6rpx;
                    border: 1px solid #ccc;
                    margin-right: 10rpx;
                    line-height: 1.4;
                    overflow: hidden;
                }
                .area:after {
                    content: '';
                    position: absolute;
                    right: 12rpx;
                    top: 42%;
                    width: 0;
                    height: 0;
                    border: 12rpx solid;
                    border-color: #000 transparent transparent;
                }
                .input {
                    flex: 1;
                    display: inherit;
                    align-items: center;
                    height: 58rpx;
                    padding: 4rpx;
                    padding-right: 5rpx;
                    border: 1px solid #ccc;
                    input {
                        flex: 1;
                    }
                    .placeholder {
                        font-size: 14px;
                    }
                    text {
                        height: 30rpx;
                        background: #eee;
                        border-radius: 50%;
                        margin-right: 5rpx;
                    }
                }
                .btn {
                    view {
                        height: 58rpx;
                    }
                }
            }
        }
    }
</style>
