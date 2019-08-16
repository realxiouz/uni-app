<template>
	<view style="height:100vh;">
		<data-list ref="list" @data="handleList" r-url="project" :r-data="{route_type: 'public'}">
			<!-- <view class="cu-bar"></view> -->
			<project v-for="(i, inx) in list" :key="inx" :bean="i" />
		</data-list>
	</view>
</template>

<script>
	import DataList from '@/components/data-list'
	import Project from './components/project'
	
	export default {
		onLoad(opt) {
			this.$nextTick(_ => {
				this.$refs.list.init()
			})
		},
		data() {
			return {
				list: []
			}
		},
		methods: {
			handleList(list) {
				this.list = list
			}
		},
		components: {
			DataList, Project
		}
	}
</script>

<style>
</style>
