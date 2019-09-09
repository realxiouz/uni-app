<template>
	<view style="height:100vh;">
		<data-list ref="list" @data="handleList" r-url="project" :r-data="rData">
			<project v-for="(i, inx) in list" :key="inx" :bean="i" :type="rData.route_type"/>
		</data-list>
	</view>
</template>

<script>
	import DataList from '@/components/data-list'
	import Project from './components/project'
	import { mapMutations, mapState } from 'vuex'
	
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
			})
		},
		data() {
			return {
				list: [],
				rData: {
					route_type: '',
					
				}
			}
		},
		methods: {
			...mapMutations('project', ['setListType']),
			handleList(list) {
				this.list = list
			}
		},
        computed: {
		    ...mapState('work', ['shopId'])
        },
		components: {
			DataList, Project
		}
	}
</script>

<style>
</style>
