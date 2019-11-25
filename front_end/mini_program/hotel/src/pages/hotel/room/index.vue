<template>
	<div class="hotel">
		<div class="swiper">
			<swiper :indicator-dots='swiper_option.dots' :indicator-active-color="swiper_option.active_color" :indicator-color="swiper_option.color" :autoplay="swiper_option.autoplay" :interval="swiper_option.interval" :duration="swiper_option.duration" :circular='swiper_option.circular'>
				<swiper-item v-for="(item, index) in swiper_option.imgs" :key='item.id'>
					<img :src="'https://shop.technologyle.com/userReg/imgs/tem' + item.src" alt="swiper" style="height: 100%;">
				</swiper-item>
			</swiper>
		</div>
		<div class="main_info">
			
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
					{ id: 1, src: '/room_swiper.png' },
					{ id: 2, src: '/room_swiper.png' },
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


	.room_list {
		margin: 0 15px 30px 15px;

		.room_item {
			border-radius: 5px;
			margin-bottom: 5px;
			padding: 10px;
			background-color: #fff;

			.room_img {
				width: 100px;
				height: 100px;
				margin-right: 5px;
			}
			.middle {

				.middle_h3 {
					font-size: 1.15em;
					font-weight: 900;
					margin-top: -8px;
				}

				.info_tag {
					margin: 0 5px 0 0;
					color: #999;
				}

				.item_price {
					margin-top: 3px;

					.price {
						color: #FEA416;
						font-size: 1.2em;
					}
					.num {
						color: #999;
					}
				}
				.item_stars {

					.stars_li {
						margin-right: 3px;

						.stars_yes, .stars_no {
							width: 18px;
							height: 18px;
						}
					}
					
					.item_reco {
						color: #CCCCCC;
						font-size: 0.9em;
						margin-left: 5px;
						margin-bottom: 3px;
					}
				}

			}
			.right {
				height: 35px;
				line-height: 35px;
				padding: 0 18px;
				color: #fff;
				border-radius: 8px;
				font-size: 1em;
				background-color: #FCC53A;
				text-align: center;
				align-self: flex-end;
				margin-bottom: 10px;
			}
		}
	}
	
	.details_info {
		background-color: #fff;
		color: #999;
		margin: 0 15px;
		text-align: center;
		
		.info_share {
			position: absolute;
			top: 15px;
			right: 15px;
			width: 20px;
			height: 20px;
		}

		.info_h2 {
			padding: 15px 0 5px 0;
			font-size: 1.3em;
			font-weight: 900;
			color: #333;
		}
		
		.info_btn {
			margin: 15px 0 25px 0;
			font-size: 1em;
			
			&>div {
				border: 1px solid #FCC53A;
				border-radius: 5px;
				padding: 0 20px;
				height: 32px;
				line-height: 32px;
				color: #FCC53A;
			}
			.navigate {
				margin-right: 25px;
			}
			.navigate_ico, .call_ico {
				margin-right: 10px;
				width: 18px;
				height: 18px;
			}
		}

		.info_time {
			position: relative;
			padding: 15px 0 20px 0;
			overflow: hidden;
			color: #999999;
			font-size: 0.9em;

			.left, .middle, .right {
				flex-direction: column;
			}

			.middle {
				margin: -10px 20px 0 20px;

				.flex_center {
					color: #333;
					font-size: 1.2em;
				}
			}

			.start_time, .end_time {
				color: #FCAC3A;
				font-size: 1.3em;
			}

			.to_right_icon {
				width: 80px;
				height: 10px;
			}
		}
	}
	
	.dotted_line {
		position: relative;
		height: 30px;

		.hemisphere_left, .hemisphere_right {
			width: 30px;
			height: 30px;
			background-color: #F0F0F0;
			border-radius: 50%;
			position: absolute;
			top: 0;
		}
		.dotted_line_img {
			height: 16px;
		}
		.hemisphere_left {
			left: -16px;
		}
		.hemisphere_right {
			right: -15px;
		}
	}

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