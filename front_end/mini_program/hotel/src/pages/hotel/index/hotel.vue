<template>
	<div class="hotel">
		<div class="swiper">
			<swiper :autoplay="swiper_option.autoplay" :interval="swiper_option.interval" :duration="swiper_option.duration" :circular='swiper_option.circular'>
				<swiper-item v-for="(item, index) in swiper_option.imgs" :key='item.id'>
					<img :src="'https://shop.technologyle.com/userReg/imgs/tem' + item.src" alt="swiper" style="height: 100%;">
				</swiper-item>
			</swiper>
		</div>
		<div class="flex_between hotel_nav">
			<div class="nav_left" @click='expect'>
				<p class="nav_title">我的订单</p>
				<img class="nav_img" src="../../../../static/imgs/hotel/hotel_nav_01.png" alt="nav">
			</div>
			<div class="nav_right" @click='expect'>
				<p class="nav_title">房券交易</p>
				<img class="nav_img" src="../../../../static/imgs/hotel/hotel_nav_02.png" alt="nav">
			</div>
		</div>
		<div class="flex_between b_title" style="margin-bottom: 5px;">
			<div class="flex b_title_left">
				<div class="border"></div>
				<span>酒店列表</span>
			</div>
		</div>
		<ul class="hotel_list">
			<li class="list_item" v-for='(item, index) in hotel_list' :key='item.id' @click='expect'>
				<img class="item_img" :src="'https://shop.technologyle.com/userReg/imgs/tem' + item.src" alt="hotel">
				<h2 class="item_h2">{{ item.h2 }}</h2>
				<p class="mul_text_ellipsis item_p">{{ item.p }}</p>
			</li>
		</ul>
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
				imgs: [
					{ id: 1, src: '/hotel_banner.png' },
					{ id: 2, src: '/hotel_banner.png' },
				]
			},
			hotel_list: [
				{ id: 1, src: '/hotel_lists.png', h2: '张家界水木潇湘度假民宿', p: '坐落于武陵源核心景区国家森林公园，地势高挑，视野开阔 位于张家界·武陵源区·协合乡插旗峪村胜天水库边' }
			]
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

<style lang='scss' scoped>

	.hotel_nav {
		background-color: transparent;
		margin: 15px 15px;

		.nav_left, .nav_right {
			width: 48%;
			background-color: #fff;
			position: relative;
			height: 75px;
			line-height: 75px;
		}

		.nav_img {
			position: absolute;
			bottom: 0;
			right: 0;
			width: 83px;
			height: 66px;
		}

		.nav_title {
			margin-left: 15px;
		}
	}

	
	.hotel_list {
		margin: 5px 15px 12px 15px;

		.list_item {
			background-color: #fff;
			margin-bottom: 12px;
			border-radius: 8px;
			padding: 12px;

			.item_h2 {
				font-size: 1.2em;
				margin-top: 5px;
				font-weight: 900;
			}

			.item_p {
				color: #999999;
				font-size: 0.9em;
			}
		}
	}

</style>