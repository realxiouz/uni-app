<template>
	<div>
		<form>
			<upload-files title="云端图片" :max-count="1" @imgs="handleImgs" :source="['album', 'camera']"/>
			<upload-files title="客厅图片" :max-count="1" @imgs="handleImgs" :source="['album', 'camera']"/>
			<upload-files title="卧室图片" :max-count="1" @imgs="handleImgs" :source="['album', 'camera']"/>
			<upload-files title="阳台图片" :max-count="1" @imgs="handleImgs" :source="['album', 'camera']"/>
		</form>
		<save @save="handleSave" :loading="formLoading" />
	</div>
</template>

<script>
	import UploadFiles from '@/components/upload-files'
	import Save from "@/components/buttom-button"
	export default {
		data() {
			return {
				formLoading: false
			}
		},
		components: {
			UploadFiles,
			Save,
		},
		methods: {
			handleImgs(a) {
				console.log(a)
			},
			handleSave() {},
		}
	}
</script>

<style>
</style>
