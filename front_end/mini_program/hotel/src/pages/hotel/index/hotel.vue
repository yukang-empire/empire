<template>
	<div class="hotel">
		<p>hotel</p>
	</div>
</template>

<script>
export default {
	data () {
		return {

		}
	},
	components: {

	},
	//下拉刷新
	onPullDownRefresh () {
		wx.showToast({
			title: '正在更新数据...',
			icon: 'loading',
			duration: 1500
		});

		wx.stopPullDownRefresh();
	},
	created () {

	},
	mounted () {

	},
	methods: {

	}
}
</script>

<style scoped>

</style>