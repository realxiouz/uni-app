<template>
	<view style="height: 100vh;">
		<data-list ref="list" @data="handleList" r-url="common/adviser" :r-data="{project_id: pId}">
			<view v-for="(i, inx) in list" :key="inx" :bean="i" >{{i.name}}</view>
		</data-list>
	</view>
</template>

<script>
	import DataList from '@/components/data-list'
	
	export default {
		onLoad(opt) {
			this.pId = opt.pId
			this.$nextTick(_ => {
				this.$refs.list.init()
			})
		},
		data () {
			return {
				pId: '',
				list: []
			}
		},
		components: {
			DataList
		},
		methods: {
			handleList(list) {
				this.list = list
			}
		}
	}
</script>

<style>
</style>
