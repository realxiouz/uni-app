<template>
    <view class="padding-25">
        <card-template :is-show-list="false"></card-template>
        <!--导航栏列表 start-->
        <view class="radiusbox pubmgtop cardlist">
            <view @tap="toPages" v-for="(item, i) of list" :data-page="item.path" v-if="item.isShow" :key="i">
                <view>
                    <text :class="item.icon"></text>
                </view>
                <text>{{item.name}}</text>
            </view>
        </view>
        <!--导航栏列表 end-->
        <!--回到首页按钮 start-->
        <make-btn :on-event="onMyEvent"></make-btn>
        <!--回到首页按钮 end-->
    </view>
</template>

<script>
    import cardTemplate from "@/components/cardtemplate/cardtemplate";
    import makeBtn from "@/components/makebtn/index/makebtn";
    import {mapState, mapMutations} from 'vuex';
    export default {
        data() {
            return {
                onMyEvent: {
                    title: '返回首页',
                    url: '/pages/ucenter/businesscard/index/businesscard',
                    isRedirect: true
                },
                list : [
                    {
                        name: '编辑名片',
                        path: '/pages/ucenter/user/index/user',
                        isShow: true,
                        icon: 'cuIcon-edit'
                    },
                    {
                        name: '模板',
                        path: '/pages/ucenter/cardtemplate_list/index/cardtemplate_list',
                        isShow: true,
                        icon: 'cuIcon-list'
                    },
                    {
                        name: '预览名片',
                        path: '/pages/ucenter/businesscard/index/businesscard?previewB=1',
                        isShow: true,
                        icon: 'cuIcon-card'
                    },
                    {
                        name: '浏览记录',
                        path: '/pages/ucenter/browsecount/index/browsecount',
                        isShow: true,
                        icon: 'cuIcon-text'
                    },
                    {
                        name: '推荐楼盘',
                        path: '/pages/ucenter/recommend/index/recommend',
                        isShow: true,
                        icon: 'iconfont icongongsi'
                    },
                    {
                        name: '分享名片',
                        path: '/pages/ucenter/share/index/share',
                        // #ifdef MP-WEIXIN
                        isShow: true,
                        // #endif
                        icon: 'cuIcon-evaluate_fill'
                    },
                    {
                        name: '名片夹',
                        path: '/pages/ucenter/cardclamp/index/cardclamp',
                        isShow: true,
                        icon: 'cuIcon-file'
                    },
                    {
                        name: '操作指南',
                        path: '/pages/ucenter/explain/index/explain',
                        isShow: true,
                        icon: 'cuIcon-forward'
                    }
                ]
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
        computed: {}
    }
</script>

<style lang="scss">
    @import 'page_makecard';
</style>
