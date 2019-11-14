<template>
	<div class="my">
		<div class="flex_center head">
			<img class="portrait" src="../../../../static/imgs/my/default_portrait.png" alt="portrait">
			<p>18617109552</p>
		</div>
		<ul class="menu_list">
			<li class="flex_between item_li" @click='expect'>
				<div class="flex">
					<img class="item_img" src="../../../../static/imgs/my/wallet.png" alt="icon">
					<span>我的钱包</span>
				</div>
				<div>
					<i class="iconfont">&#xe618;</i>
				</div>
			</li>
			<li class="flex_between item_li" @click='expect'>
				<div class="flex">
					<img class="item_img" src="../../../../static/imgs/my/order.png" alt="icon">
					<span>住宿订单</span>
				</div>
				<div>
					<i class="iconfont">&#xe618;</i>
				</div>
			</li>
			<li class="flex_between item_li" @click='expect'>
				<div class="flex">
					<img class="item_img" src="../../../../static/imgs/my/coupon.png" alt="icon">
					<span>我的房券</span>
				</div>
				<div>
					<i class="iconfont">&#xe618;</i>
				</div>
			</li>
			<li class="flex_between item_li" @click='expect'>
				<div class="flex">
					<img class="item_img" src="../../../../static/imgs/my/record.png" alt="icon">
					<span>交易记录</span>
				</div>
				<div>
					<i class="iconfont">&#xe618;</i>
				</div>
			</li>
			<li class="flex_between item_li" @click='expect'>
				<div class="flex">
					<img class="item_img" src="../../../../static/imgs/my/set.png" alt="icon">
					<span>设置</span>
				</div>
				<div>
					<i class="iconfont">&#xe618;</i>
				</div>
			</li>
		</ul>
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
		expect () {
			wx.showToast({
				title: '敬请期待!',
				icon: 'none',
				duration: 1500
			});
		}
	}
}
</script>

<style lang="scss" scoped>
	
	.head {
		background-color: #333333;
		color: #fff;
		height: 130px;
		flex-direction: column;

		.portrait {
			width: 50px;
			height: 50px;
			border-radius: 50%;
			margin-bottom: 5px;
		}
	}
</style>