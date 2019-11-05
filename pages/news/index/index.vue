<template>
    <view :style="{'height': height}" class="wrap">
        <data-list r-url="news" @data="handlerList" ref="list" :r-data="rData">
            <item v-for="(i, inx) of newsList" :key="inx" :bean="i" />
        </data-list>
    </view>
</template>

<script>
    import dataList from '@/components/data-list';
    import item from '../components/item';
    import {mapState} from 'vuex';
	export default {
		data() {
			return {
				newsList: [],
                classArray: ['teal', 'cyan', 'light-blue'],
                height: '100vh',
                rData: {}
			}
		},
        components: {
		    item,
            dataList
        },
        onLoad() {
            const self = this;
            uni.getSystemInfo({
                success(e) {
                    self.height = e.windowHeight + 'px';
                }
            });
            self.$nextTick(_ => {
                self.rData = Object.assign(self.rData, {shop_id: self.shopId});
                self.$refs.list.getData(true);
            });
        },
		methods: {
            handlerList(list) {
			    this.newsList = list;
            },
            toDetail(id) {
                uni.navigateTo({
                    url: '/pages/news/detail/index?id='+id
                })
            }
		},
        computed: {
		    ...mapState('project', ['shopId'])
        }
	}
</script>

<style lang="scss" scoped>
    view.wrap {
        padding: 25rpx;
    }
</style>
