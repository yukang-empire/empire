<template>
	<div class="my">
		<p>my</p>
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
			title: '正在刷新...',
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

<style lang="scss" scoped>

</style>