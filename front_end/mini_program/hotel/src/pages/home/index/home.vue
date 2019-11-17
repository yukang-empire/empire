<template>
	<div class="home">
		<div class="swiper">
			<swiper :indicator-dots='swiper_option.dots' :indicator-active-color="swiper_option.active_color" :indicator-color="swiper_option.color" :autoplay="swiper_option.autoplay" :interval="swiper_option.interval" :duration="swiper_option.duration" :circular='swiper_option.circular'>
				<swiper-item v-for="(item, index) in swiper_option.imgs" :key='item.id'>
					<img :src="'https://shop.technologyle.com/userReg/imgs/tem' + item.src" alt="swiper" style="height: 100%;">
				</swiper-item>
			</swiper>
		</div>
		<ul class="flex_between nav">
			<li class="nav_item" @click='expect'>
				<img class="nav_img" src="../../../../static/imgs/home/index_nav_01.png" alt="nav">
				<p>房券预售</p>
			</li>
			<li class="nav_item" @click='expect'>
				<img class="nav_img" src="../../../../static/imgs/home/index_nav_02.png" alt="nav">
				<p>交易市场</p>
			</li>
			<li class="nav_item" @click='expect'>
				<img class="nav_img" src="../../../../static/imgs/home/index_nav_03.png" alt="nav">
				<p>我的房券</p>
			</li>
		</ul>
		<div class="flex_between b_title" @click='expect'>
			<div class="flex b_title_left">
				<div class="border"></div>
				<span>预售</span>
			</div>
			<div class="flex b_title_right">
				<span>更多</span>
				<i class="iconfont">&#xe618;</i>
			</div>
		</div>
		<div class="flex_center coupon_info">
			<h2 class="coupon_info_h2">水木潇湘房券系列-<span>002</span>期预售</h2>
			<p class="coupon_info_p">预售价格：<span>150</span>/张</p>
			<div class="flex_between coupon_info_div">
				<span class="flex">推出房券：<i>100</i>元/张</span>
				<span class="flex">有效期：<i>365</i>天</span>
			</div>
			<div class="coupon_info_btn">
				<span>10</span>月
				<span>10:00</span>开售
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data () {
		return {
			//轮播参数
			swiper_option: {
				autoplay: true,
				interval: 4000,
				duration: 1000,
				circular: true,
				dots: true,
				color: '#fff',
				active_color: '#FCC53A',
				imgs: [
					{ id: 1, src: '/index_banner.png' },
					{ id: 2, src: '/index_banner.png' },
				]
			}
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
		var that = this;
		// this.$store.dispatch('home_swipers').then((res) => {
		// 	console.log('首页swipers', res);
		// 	if (res.data.status == 1) {
		// 		that.swiper_option.imgs = res.data.result || [];
		// 	};
		// });
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
	
	.coupon_info {
		margin: 10px 15px;
		border-radius: 10px;
		background-color: #fff;
		padding: 15px;
		text-align: center;
		flex-direction: column;
		margin-bottom: 60px;

		.coupon_info_h2 {
			font-size: 1.3em;
			font-weight: 900;
		}

		.coupon_info_p {
			color: #FCC53A;
			margin: 5px 10px;
			font-weight: 900;
		}

		.coupon_info_div {
			width: 70%;
			color: #666;
			margin: 10px 15px;
			width: 90%;
		}

		.coupon_info_btn {
			border: 1px solid #FCC53A;
			color: #FCC53A;
			border-radius: 5px;
			height: 40px;
			line-height: 40px;
			font-size: 1.1em;
			width: 100%;
			font-weight: 900;
		}
	}
</style>