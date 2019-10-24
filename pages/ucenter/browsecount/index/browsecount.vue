<template>
    <view>
        <!--导航栏列表 start-->
        <view class="pd-left-right pubmgtop">
            <view class="grid col-2">
                <view class="browse-list" v-for="(item, index) of itemList" :key="index">
                    <view class="browse-box">
                        <view class="browse-count-left">
                            {{itemType[index]}}
                        </view>
                        <view class="browse-count-right">
                            {{item}}
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <!--导航栏列表 end-->
        <!--浏览和转发记录-->
        <view class="record pubmgtop">
            <view class="num-box">
                <view :class="[num === 1? 'on': '']" @tap="recordClick">
                    浏览记录
                </view>
                <view :class="[num === 2? 'on': '']" @tap="recordClick">
                    转发记录
                </view>
            </view>
            <view class="pubpdtop">
                <child-com v-if="num === 1" :recording="countBs" :userArr="browseUser" classType="brows-list" :num="num"></child-com>
                <child-com v-else :recording="countZf" :userArr="zFUser" :num="num"></child-com>
            </view>
        </view>
    </view>
</template>

<script>
    import childCom from 'pages/ucenter/browsecount/child-com';
    export default {
        data() {
            return {
                recordList: {},
                num: 1,
                countBs: 0,// 浏览合计
                itemList: [],
                browseUser: [{
                    browseuser: ''
                }],// 浏览的人
                countZf: 0,// 转发记录
                zFUser: [],// 转发的人
                itemType: ['今日浏览量：', '今日转发量：', '历史浏览量：', '历史转发量：']
			}
        },
        components: {
            childCom
        },
        onLoad() {
            const self = this;
			this.$http('browse/fwbrowse').then(res => {
                let data = res;
                self.recordList = data;
                self.itemList = [data.todayBrowse, data.todazf, data.historybs, data.historyzf];
				self.countBs = data.countbs; // 浏览合计
				self.browseUser = data.Browseuser;// 浏览的人
				self.countZf = data.countzf;// 转发记录
				self.zFUser = data.zfuser;// 转发的人
			})
        },
        methods: {
            recordClick() {
                this.num = this.num === 1? 2: 1;
            }
        },
        computed: {}
    }
</script>

<style lang="scss">
	@import "./browsecount.scss";
</style>
