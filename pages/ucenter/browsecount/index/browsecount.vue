<template>
    <view>
        <!--导航栏列表 start-->
        <view class="pd-left-right pubmgtop">
            <view class="grid col-2">
                <view class="browse-list">
                    <view class="browse-box"><!--span-->
                        <view class="browse-count-left">
                            今日浏览量：
                        </view>
                        <view class="browse-count-right">
                            {{recordlist.todayBrowse}}
                        </view>
                    </view>
                </view>
                <view class="browse-list">
                    <view class="browse-box"><!--span-->
                        <view class="browse-count-left">
                            今日转发量：
                        </view>
                        <view class="browse-count-right">
                            {{recordlist.todazf}}
                        </view>
                    </view>
                </view>
                <view class="browse-list">
                    <view class="browse-box"><!--span-->
                        <view class="browse-count-left">
                            历史浏览量：
                        </view>
                        <view class="browse-count-right">
                            {{recordlist.historybs}}
                        </view>
                    </view>
                </view>
                <view class="browse-list">
                    <view class="browse-box"><!--span-->
                        <view class="browse-count-left">
                            历史转发量：
                        </view>
                        <view class="browse-count-right">
                            {{recordlist.historyzf}}
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <!--导航栏列表 end-->
        <!--        浏览和转发记录-->
        <view class="record pubmgtop">
            <view class="num-box">
                <view :class="[num === 1? 'on': '']" data-num="1" @tap="recordClick">
                    浏览记录
                </view>
                <view :class="[num === 2? 'on': '']" data-num="2" @tap="recordClick">
                    转发记录
                </view>
            </view>
            <view class="pubpdtop">
                <!-- 这里不是互斥判断, 因为在一开始请求没有浏览器的加载速度快, 所以要先判断是否加载完成, 才可以加载该html-->
                <child-com v-if="isLoaded && num === 1" :recording="countbs" :userArr="Browse" classType="brows-list"></child-com>
                <child-com v-if="isLoaded && num === 2" :recording="countzf" :userArr="zfuser"></child-com>
            </view>
        </view>
    </view>
</template>

<script>
    import {BASE_URL} from "../../../../utils/const";
    import {header} from "../../../../utils/global-data";
    import {mapState} from 'vuex';
    import childCom from '../child-com/child-com.vue';

    export default {
        data() {
            return {
                recordlist: {

				},
                num: 1,
                countbs: 0,// 浏览合计
                Browse: [],// 浏览的人
                countzf: 0,// 转发记录
                zfuser: []// 转发的人
			}
        },
        components: {
            childCom
        },
        onLoad() {
            const self = this;
            console.log(self.token);
            uni.request({
                url: BASE_URL+ '/api/browse/fwbrowse',
                header: header(self.token),
                method: 'GET',
                success(res) {
                    self.recordlist = res.data;
                    console.log(res.data);
                    self.countbs = res.data.countbs; // 浏览合计
                    self.Browse = res.data.Browseuser;// 浏览的人
                    self.countzf = res.data.countzf;// 转发记录
                    self.zfuser = res.data.zfuser;// 转发的人
                }
            });
        },
        methods: {
            recordClick() {
                this.num = this.num === 1? 2: 1;
            }
        },
        computed: {
            ...mapState(['token']),
            isLoaded() {
                return this.Browse.length >= 1 || this.zfuser.length >= 1;
            }
        }
    }
</script>

<style lang="scss">
	@import "browsecount";
</style>
