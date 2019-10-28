<template>
    <view class="padding-y">
        <view class="pd-left-right padding-top">
            <form style="display: block;">
                <view class="search">
                    <text class="cuIcon-search"></text>
                    <input placeholder="请输入姓名或手机号" v-model="search">
                    <button type="primary" v-if="!!search.toString()" @tap="searchData">搜索</button>
                </view>
            </form>
            <!--收藏模块
            <view v-if="isCollEct" class="collectcard">
                <view class="nearest padding-top">
                    <view class="nearest-top">
                        <text>最近收藏名片</text>
                    </view>
                </view>
                <view class="card-box padding-top">card-list
                    <view class="card-list" v-for="(item, index) of users" :key="index">li
                        <child-com :user="item" :num="item.template_id">
                            <button type="warn" @tap.stop="showCancel" :class="['cancel-collection', 'cancel-collection-' + item.template_id]" slot="cancel">取消收藏</button>
                        </child-com>
                    </view>
                </view>
            </view>
            收藏模块end-->

            <!--最近访问模块 start-->
            <view class="nearest padding-top">
                <view class="nearest-top">
                    <text>最近访问名片</text>
                </view>
            </view>
            <view class="card-box padding-top">
                <view v-if="!users.length" style="width: 130rpx; margin: 100rpx auto 0;">
                    <view class="text-xsl">
                        <text class="cuIcon-attentionforbidfill text-gray"></text>
                    </view>
                    <text class="text-gray">暂无数据</text>
                </view>
                <view class="card-list" v-else v-for="(item, index) of users" :key="index">
                    <child-com :current-user-info="item" :num="item.template_id">
                        <!--<button type="primary" @tap.stop="showCollect" :class="['cancel-collection', 'cancel-collection-' + item.template_id]" slot="cancel">收藏名片</button>-->
                    </child-com>
                </view>

            </view>
            <!--最近访问模块 end-->
        </view>
        <make-btn :onEvent="onMyEvent"></make-btn>
    </view>
</template>

<script>
    import makeBtn from "@/components/makebtn/index/makebtn";
    import {mapState} from 'vuex';
    import childCom from '@/components/cardtemplate/child-com';
    export default {
        data() {
            return {
                isCollEct: true, // 收藏模块显示
                users: [], // 用于vfor循环, 用户组
                currCollect: [],
                cardBox: [],
                search: '',
                onMyEvent: {
                    title: '返回首页',
                    url: '/pages/ucenter/businesscard/index/businesscard',
                    isRedirect: true
                }
            }
        },
        components: {
            makeBtn,
            childCom
        },
        computed: {
			...mapState(['defaultAvatar'])
        },
        methods: {
            formSubmit() {
                // form提交
            },
            showCancel(e) {
                // 取消收藏
                this.cardBox.forEach((ele, index) => {
                    this.cardBox[index].isShow = false;
                });

                let colletData = this.currCollect;
                colletData.forEach((ele, index) => {
                    let itemID = e.currentTarget.dataset.cancelbt;
                    if (itemID === index) {
                        this.currCollect[index].isShow = false;
                    }
                })
            },
            showCollect(e) {
                // 收藏
                this.currCollect.forEach((ele, index) => {
                    this.currCollect[index].isShow = false;
                });
                this.cardBox.forEach((ele, index) => {
                    let itemID = e.currentTarget.dataset.btindex;
                    ele.isShow = false;
                    if (Number(itemID) === index) {
                        this.cardBox[index].isShow = true;
                    }
                })
            },
            getData() {
                uni.showLoading({
                    title: '加载中',
                    mask: true
                });
                const url = this.search.toString()? `?search=${this.search}`: '';
                this.$http('geren/cardlist'+ url).then(res => {
                    let data = res.data;
                    if (data instanceof Array) {
                        for (let item of data) {
                            data.img = this.defaultAvatar;
                        }
                    } else {
                        data = [];
                    }
                    this.users = data;
                    uni.hideLoading();
                }).catch(e => {
                    uni.hideLoading();
                });
            },
            searchData() {
                this.getData();
            }
        },
        onLoad() {
            const self = this;
            this.getData();
            this.cardBox.forEach((item, index) => {
                Object.defineProperty(item, 'isShow', {
                    configurable: false,
                    writable: true,
                    enumerable: true,
                    value: false
                })
            });
        }
    }
</script>

<style lang="scss">
    @import 'cardclamp.scss';
</style>
