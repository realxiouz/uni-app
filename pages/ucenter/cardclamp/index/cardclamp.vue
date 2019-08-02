<template>
    <view>
        <view class="pd-left-right pubpdtop">
            <form @submit="formSbumit">
                <view class="seach">
                    <text class="cuIcon-search"></text>
                    <input placeholder="请输入姓名或手机号" value=""></input>
                </view>
            </form>
            <!--收藏模块
            <view v-if="isCollEct" class="collectcard">
                <view class="nearest pubpdtop">
                    <view class="nearest-top">
                        <text>最近收藏名片</text>
                    </view>
                </view>
                <view class="card-box pubpdtop">card-list
                    <view class="card-list" v-for="(item, index) of users" :key="index">li
                        <child-com :user="item" :num="item.template_id">
                            <button type="warn" @tap.stop="showCancel" :class="['cancel-collection', 'cancel-collection-' + item.template_id]" slot="cancel">取消收藏</button>
                        </child-com>
                    </view>
                </view>
            </view>
            收藏模块end-->

            <!--最近访问模块 start-->
            <view class="nearest pubpdtop">
                <view class="nearest-top">
                    <text>最近访问名片</text>
                </view>
            </view>
            <view class="card-box pubpdtop"><!--card-list-->
                <view class="card-list" v-for="(item, index) of users" :key="index">
                    <child-com :user="item" :num="item.template_id">
                        <button type="primary" @tap.stop="showCollect" :class="['cancel-collection', 'cancel-collection-' + item.template_id]" slot="cancel">收藏名片</button>
                    </child-com>
                </view>
            </view>
            <!--最近访问模块 end-->
        </view>
        <make-btn :onEvent="onMyEvent"></make-btn>
    </view>
</template>

<script>
    import makeBtn from "../../../../components/makebtn/index/makebtn";
    import {mapState} from 'vuex';
    import {BASE_URL} from '../../../../utils/const';
    import {header} from '../../../../utils/global-data';
    import {childCom} from '../../../../components/cardtemplate/child-com';
    export default {
        data() {
            return {
                isCollEct: true, // 收藏模块显示
                users: [], // 用于vfor循环, 用户组
                currCollect: [],
                userData: {}, // userInfo
                isCollect: false,
                /*cardBox: [
                    {
                        "username": "小明",
                        "zhiwei": "公务员",
                        "companyname": "机关单位",
                        "phone": 18314307888,
                        "userimg": "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3516274884,2016513193&fm=58",
                        "template_id": 3
                    },
                    {
                        "username": "温家宝",
                        "zhiwei": "公务员",
                        "companyname": "机关单位",
                        "phone": 18314307882,
                        "userimg": "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3516274884,2016513193&fm=58",
                        "template_id": 2
                    },
                    {
                        "username": "温家宝",
                        "zhiwei": "公务员",
                        "companyname": "机关单位",
                        "phone": 18314307882,
                        "userimg": "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3516274884,2016513193&fm=58",
                        "template_id": 1
                    }
                ],*/
                onMyEvent: {
                    title: '返回首页',
                    imgSrc: '/static/images/img/card.png',
                    url: '../../businesscard/index/businesscard'
                }
            }
        },
        components: {
            makeBtn,
            childCom
        },
        computed: {
            ...mapState(['userInfo', 'token', 'currentuserinfo'])
        },
        methods: {
            formSubmit() {
                // form提交
            },
            showCancel(e) {
                // 取消收藏
                this.cardBox.forEach((ele, index) => {
                    // let isShowBt = "cardBox[" + index + "].isShow";
                    this.cardBox[index].isShow = false;
                    /*this.setData({
                        [isshowbt]:false
                    })*/
                })

                let colletData = this.currCollect;
                colletData.forEach((ele, index) => {
                    let itemID = e.currentTarget.dataset.cancelbt;
                    if (itemID == index) {
                        /*var isshowbt= "currcollect[" + index + "].isshow";
                        this.setData({
                            [isshowbt]:true
                        })*/
                        this.currCollect[index].isShow = false;
                    }
                })
            },
            showCollect(e) {
                // 收藏
                this.currCollect.forEach((ele, index) => {
                    // let isShowBt = "currCollect[" + index + "].isShow";
                    this.currCollect[index].isShow = false;
                })
                this.cardBox.forEach((ele, index) => {
                    let itemID = e.currentTarget.dataset.btindex;
                    ele.isShow = false;
                    if (itemID == index) {
                        // let isShowBt= "cardBox[" + index + "].isShow";
                        this.cardBox[index].isShow = true;
                    }
                })
            }/*,
            cancel(e) {
                // 取消收藏, 阻止冒泡
                let time = 1000;
                // let colletData = GLOBALDATA.colletelist;
                colletData.forEach((ele, index) => {
                    // let isshowbt= "currcollect[" + index + "].isshow";
                    let itemID = e.currentTarget.dataset.deletindex;
                    if (itemID == index) {
                        this.currCollect[index] = false;
                        /!*this.setData({
                            [isshowbt]:false
                        })*!/
                        colletData.splice(index, 1);
                        uni.showToast({
                            title: '已取消',
                            icon: 'none',
                            duration: time
                        });
                        setTimeout(() => {
                            // 重定向
                            uni.redirectTo({
                                url: './cardclamp'
                            })
                        }, time);

                    }
                })
            },
            collect(e) {
                // 收藏阻止冒泡
                let time = 1000;
                let list = e.currentTarget.dataset.list;
                let curr = GLOBALDATA.colletelist;
                for (let i = 0; i < this.cardBox.length; i++) {
                    // let isshowbt = "cardbox[" + list + "].isshow";
                    if (list == i) {
                        let isTrue = false;
                        let _arr = this.cardBox[i];
                        for (let j = 0; j < curr.length; j++) {
                            if (curr[j].phone == _arr.phone) {
                                isTrue = true;
                                break;
                            }
                        }
                        if (!isTrue) {
                            curr.push(_arr);
                            uni.showToast({
                                title: '收藏成功',
                                icon: 'success',
                                duration: time
                            });
                            this.cardBox[list].isShow = false;
                            /!*this.setData({
                                [isshowbt]: false
                            });*!/
                            setTimeout(() => {
                                uni.redirectTo({
                                    url: './cardclamp'
                                })
                            }, time)
                        } else {
                            uni.showToast({
                                title: '不许重复收藏哦',
                                icon: 'none',
                                duration: time
                            });
                            this.cardBox[list].isShow = false;
                            /!*this.setData({
                                [isshowbt]: false
                            });*!/
                            return false;
                        }
                    }
                }
            }*/
        },
        onLoad() {
            const self = this;
            uni.request({
                data: {},
                url: BASE_URL + '/api/geren/cardlist',
                method: "GET",
                dataType: 'json',
                header: header(self.token),
                success(res) {
                    console.log(res);
                    self.users = res.data.data;
                }
            });
            this.userData = this.userInfo;
            /*if (GLOBALDATA.colletelist.length > 0) {
                this.currCollect = GLOBALDATA.colletelist,
                this.isCollect = true;
            } else {
                this.isCollect = false;
            }*/
            this.cardBox.forEach((item, index) => {
                Object.defineProperty(item, 'isShow', {
                    configurable: false,
                    writable: true,
                    enumerable: true,
                    value: false
                })
            })
        }
    }
</script>

<style lang="scss">
    @import 'cardclamp.scss';
</style>
