<template>
	<div class="hotel">
		<div class="swiper">
			<swiper :indicator-dots='swiper_option.dots' :indicator-active-color="swiper_option.active_color" :indicator-color="swiper_option.color" :autoplay="swiper_option.autoplay" :interval="swiper_option.interval" :duration="swiper_option.duration" :circular='swiper_option.circular'>
				<swiper-item v-for="(item, index) in swiper_option.imgs" :key='item.id'>
					<img :src="'https://shop.technologyle.com/userReg/imgs/tem' + item.src" alt="swiper" style="height: 100%;">
				</swiper-item>
			</swiper>
		</div>
		<div class="details_info">
			<img class="info_share" src="../../../../static/imgs/hotel/details_share.png" alt="share">
			<h2 class="info_h2">水木潇湘民宿</h2>
			<ul class="flex_center info_ul">
				<li class="info_tag">舒适</li>
				<li class="info_tag">森林院子</li>
				<li class="info_tag">独栋</li>
				<li class="info_tag">私密</li>
				<li class="info_tag">山水之间</li>
			</ul>
			<div class="flex_center info_btn">
				<div class="flex_center navigate">
					<img class="navigate_ico" src="../../../../static/imgs/hotel/details_navigate.png" alt="navigate">
					<span>一键导航</span>
				</div>
				<div class="flex_center call">
					<img class="call_ico" src="../../../../static/imgs/hotel/details_call.png" alt="call">
					<span>联系电话</span>
				</div>
			</div>
			<div class="flex_center info_time">
				<div class="hemisphere_left"></div>
				<div class="hemisphere_right"></div>
				<div class="flex_center left">
					<p>入住时间</p>
					<span class="start_time">10月28日</span>
				</div>
				<div class="flex_center middle">
					<span class="flex_center"><i>1</i>晚</span>
					<img class="to_right_icon" src="../../../../static/imgs/hotel/details_to_right.png" alt="to_right">
				</div>
				<div class="flex_center right">
					<p>离店时间</p>
					<span class="end_time">10月29日</span>
				</div>
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
					{ id: 1, src: '/hotel_details.png' },
					{ id: 2, src: '/hotel_details.png' },
				]
			},
			
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