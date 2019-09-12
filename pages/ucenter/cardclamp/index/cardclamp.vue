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
                <view class="card-list" v-for="(item, index) of Object.values(users)" :key="index">
                    <child-com :currentUserInfo="item" :num="item.template_id">
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
    import {mapState, mapGetters} from 'vuex';
    import {BASE_URL} from '../../../../utils/const';
    import {childCom} from '../../../../components/cardtemplate/child-com';
    export default {
        data() {
            return {
                isCollEct: true, // 收藏模块显示
                users: [], // 用于vfor循环, 用户组
                currCollect: [],
                userData: {}, // userInfo
                isCollect: false,
                cardBox: [],
                /*cardBox: [
                    {
                        "username": "小明",
                        "zhiwei": "公务员",
                        "companyname": "机关单位",
                        "phone": 18314307888,
                        "userimg": "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3516274884,2016513193&fm=58",
                        "template_id": 3
                    },
                ]*/
                onMyEvent: {
                    title: '返回首页',
                    imgSrc: '',
                    url: '../../businesscard/index/businesscard',
                    isRedirect: true
                }
            }
        },
        components: {
            makeBtn,
            childCom
        },
        computed: {
            ...mapState('ucenter', ['currentuserinfo']),
			...mapGetters('ucenter', ['imgSrcGetters']),
			...mapState(['userInfo'])
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
                })
                this.cardBox.forEach((ele, index) => {
                    let itemID = e.currentTarget.dataset.btindex;
                    ele.isShow = false;
                    if (itemID === index) {
                        this.cardBox[index].isShow = true;
                    }
                })
            }
        },
        onLoad() {
            const self = this;
			this.$http('geren/cardlist').then(res => {
				self.users = res.data;
			});
            this.userData = this.userInfo;
            this.cardBox.forEach((item, index) => {
                Object.defineProperty(item, 'isShow', {
                    configurable: false,
                    writable: true,
                    enumerable: true,
                    value: false
                })
            });
			this.$set(this.onMyEvent, 'imgSrc', this.imgSrcGetters('card.png'));
        }
    }
</script>

<style lang="scss">
    @import 'cardclamp.scss';
</style>
