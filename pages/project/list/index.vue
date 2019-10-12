<template>
	<view style="height:100vh;background: #fff;">
        <view class="search" :style="{top: isH5?'44px':'0px'}">
            <view>
                <view class="area">
                    <pcd :level="3" v-model="pcd" :last="true" :clear-content="clearContent"/>
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
		<view :style="[{position: 'fixed', left: 0, right: 0, bottom: '0', top: top, height: isH5? '88vh': '93vh'}]">
            <data-list ref="list" @data="handleList" r-url="project" :r-data="rData">
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
			let titleObj = {
				cooperation: '报备楼盘',
				public: '云端楼盘',
                shop: '报备楼盘'
			};
			uni.setNavigationBarTitle({
			    title: titleObj[opt.type]
			});
			this.setListType(opt.type);
			if (this.shopId) this.rData.shop_id = this.shopId;
			this.rData.route_type = opt.type;
            this.$nextTick(_ => {
				this.$refs.list.init()
			});
            if (this.isH5) {
                this.top = 44 + 114+ 'rpx';
            } else {
                this.top = 72 + 'rpx';
            }
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
                isSearch: false,
                top: 0,
                pcd: '',
                clearContent: ''
            }
		},
		methods: {
			...mapMutations('project', ['setListType']),
			handleList(list) {
			    if (this.isSearch) {
			        this.list = [...this.list, ...list];
			        return false;
                }
				this.list = list;
            },
            searchData() {
                if (this.pcd.length || this.keywords) {
                    Object.assign(this.rData, {
                        province_id: this.pcd[0] !== undefined? this.pcd[0]:  '',
                        city_id: this.pcd[1] !== undefined? this.pcd[1]:  '',
                        district_id: this.pcd[2] !== undefined? this.pcd[2]:  '',
                        keywords: this.keywords
                    });
                    this.isSearch = false;
                    this.searchBeforeList = JSON.parse(JSON.stringify(this.list));
                    this.currentPage = this.$refs.list.page;
                    this.isEnd = this.$refs.list.isEnd;
                    // this.$refs.list.getData(true);
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
                // if (!this.keywords) return false;
                this.keywords = '';
                Reflect.deleteProperty(this.rData, 'keywords');
                this.list = this.searchBeforeList;
                if (!this.list.length) {
                    this.$refs.list.getData(true);
                    return false;
                }
                if (!this.isEnd) {
                    this.$refs.list.list = [];
                    this.isSearch = true;
                    this.$refs.list.isEnd = this.isEnd;
                    this.$refs.list.page = this.currentPage;
                }
            }
		},
        computed: {
		    ...mapState('work', ['shopId']),
            ...mapState(['isH5'])
        },
		components: {
			DataList, Project, Pcd
		},
        watch: {
		    pcd(val) {
                this.clearContent = val.length > 0 ? '': '选择地区';
            }
        }
	}
</script>


<style lang="scss" scoped>
    .search {
        position: fixed;
        left: 0;
        width: 100vw;
        view:nth-child(1) {
            display: flex;
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
                overflow: hidden;
            }
            .area:after {
                content: '';
                position: absolute;
                right: 12rpx;
                top: 47%;
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
</style>
