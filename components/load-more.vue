<template>
    <view class="load-more">
        <slot></slot>
        <template v-if="upOrDown">
            <slot name="noData" v-if="hasLoaded && !arr.length">
                <view :style="{paddingTop:noDataTop + 'px'}" class="flex justify-around align-center">
                    <view>
                        <view class="text-xsl">
                            <text class="cuIcon-attentionforbidfill text-gray"></text>
                        </view>
                        <text class="text-gray">暂无数据</text>
                    </view>
                </view>
            </slot>
            <slot name="isEnd" v-else-if="isEnd && hasLoaded && arr.length">
                <view class="cu-load over"></view>
            </slot>
            <slot name="loading" v-else-if="hasLoaded || loading">
                <view class="cu-load loading"></view>
            </slot>
        </template>
    </view>
</template>

<script>
    // upOrDown (true)上拉 下拉(false), 默认上拉
    export default {
        name: 'load-more',
        data() {
            return {
                page: 1,
                isEnd: false,
                arr: [],
                searchBeforeList: '',
                hasLoaded: false,
                loading: false,
                upOrDown: true,
                searchPage: 0,
                per_page: 10,
                searchBeforeEnd: false
            }
        },
        props: {
            rData: {
                type: Object,
                required: true
            },
            isSearch: {
                type: Boolean,
                default: false
            },
            rUrl: {
                type: String,
                required: true
            },
            rMethod: {
                type: String,
                default: 'GET'
            },
            noDataTop: {
                type: Number,
                default: 200
            }
        },
        watch: {
            rData: {
                handler() {
                    if (this.hasLoaded && !this.isSearch) {
                        this.getData();
                    }
                },
                deep: true
            },
            isSearch(data) {
                if (data) {
                    this.searchBeforeList = JSON.stringify(this.arr);
                    this.searchPage = this.page;
                    this.searchBeforeEnd = this.isEnd;
                    this.getData(true);
                } else {
                    this.arr = JSON.parse(this.searchBeforeList);
                    this.$emit('data', this.arr);
                    this.page = this.searchPage;
                    this.isEnd = this.searchBeforeEnd;
                }
                uni.pageScrollTo({
                    scrollTop: 0,
                    duration: 400
                });
            }
        },
        methods: {
            clearEmptyProps(o) {
                let c = {...o};
                for(const [keys, val] of Object.entries(c)){
                    !val && Reflect.deleteProperty(c, keys);
                }
                return c;
            },
            getData(reload = false) {
                const self = this;
                self.hasLoaded = false;
                self.loading = true;
                self.page = reload? 1: self.page;
                let params = Object.assign({}, this.clearEmptyProps(this.rData), {page: this.page, per_page: this.per_page});
                self.$http(self.rUrl, params, self.rMethod).then(r => {
                    let data = r.data;
                    self.hasLoaded = true;
                    if (self.page === 1) {
                        self.arr = [];
                        self.isEnd = false;
                    }
                    self.arr[self.upOrDown? 'push': 'unshift'](...data);
                    self.$emit('data', self.arr);
                    if (data.length < this.per_page) {
                        self.isEnd = true;
                    }
                })
                    .catch(err => {})
                    .finally(_ => {
                        this.loading = false;
                        // #ifdef H5
                        uni.stopPullDownRefresh();
                        // #endif
                    })
            },
            handlerUp() {
                if (this.hasLoaded && !this.isEnd) {
                    this.page++;
                    this.getData();
                }
            },
            handlerDown() {
                if (this.hasLoaded && !this.isEnd) {
                    this.upOrDown = false;
                    this.page++;
                    this.getData();
                } else {
                    // #ifdef H5
                    uni.stopPullDownRefresh();
                    // #endif
                }
            }
        },
        mounted() {}
    };
</script>

<style lang="scss">
    .refresh-wrap{
        position: absolute;
        height: 50px;
        z-index: 1;
    }
    .load-more::-webkit-scrollbar {
        width: 0;
        height: 0;
        color: transparent;
    }
</style>
