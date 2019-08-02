<template>
    <view class="padding-25">
        <card-template :template_id="currentuserinfo.template_id || '0'" :user="currentuserinfo"></card-template>
        <!--导航栏列表 start-->
        <view class="radiusbox pubmgtop cardlist">
            <view @tap="toPages" data-page="../../user/index/user">
                <view>
                    <text class="cuIcon-edit"></text>
                </view>
                <text>编辑名片</text>
            </view>
            <view @tap="toPages" data-page="../../cardtemplate_list/index/cardtemplate_list">
                <view>
                    <text class="cuIcon-list"></text>
                </view>
                <text>模板</text>
            </view>
            <view @tap="toPages" data-page="../../businesscard/index/businesscard">
                <view>
                    <text class="cuIcon-card"></text>
                </view>
                <text>预览名片</text>
            </view>
            <view @tap="toPages" data-page="../../browsecount/index/browsecount">
                <view>
                    <text class="cuIcon-text"></text>
                </view>
                <text>浏览记录</text>
            </view>
            <view @tap="toPages" data-page="../../recommend/index/recommend">
                <view>
                    <text class="iconfont icongongsi"></text>
                </view>
                <text>推荐楼盘</text>
            </view>
            <view @tap="toPages" data-page="../../share/index/share">
                <view>
                    <text class="cuIcon-evaluate_fill"></text>
                </view>
                <text>分享名片</text>
            </view>
            <view @tap="toPages" data-page="../../cardclamp/index/cardclamp">
                <view>
                    <text class="cuIcon-file"></text>
                </view>
                <span>名片夹</span>
            </view>
            <view @tap="toPages" data-page="../../explain/index/explain">
                <view>
                    <text class="cuIcon-forward"></text>
                </view>
                <span>操作指南</span>
            </view>
        </view>
        <!--导航栏列表 end-->
        <!--回到首页按钮 start-->
        <make-btn :on-event="onMyEvent"></make-btn>
        <!--回到首页按钮 end-->
    </view>
</template>

<script>
    import cardTemplate from "../../../../component/cardtemplate/cardtemplate";
    import makeBtn from "../../../../component/makebtn/index/makebtn";
    import {globalData} from "../../../../utils/global-data";
    import {mapState} from 'vuex';
    export default {
        data() {
            return {
                onMyEvent: {
                    title: '返回首页',
                    url: '../../businesscard/index/businesscard',
                    isRedirect: true
                }
            }
        },
        methods: {
            toPages(e) {
                const url = e.currentTarget.dataset.page;
                uni.navigateTo({
                    url: url
                })
            }
        },
        components: {
            cardTemplate,
            makeBtn
        },
        mounted() {
            console.log(this.currentuserinfo);
        },
        computed: {
            ...mapState(['currentuserinfo'])
        }
    }
</script>

<style lang="scss">
    @import 'page_makecard';
</style>
