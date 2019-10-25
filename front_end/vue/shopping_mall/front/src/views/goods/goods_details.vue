<template>
	<div class="home">
		<div class="header_public">
			<div class="flex_center back">
				<svg class="icon" aria-hidden="true" @click='back'>
					<use xlink:href="#icon-arrow-right"></use>
				</svg>
			</div>
			<h3 class="flex_center">商品详情</h3>
		</div>
		<div class="article">
			<swiper_imgs :swiper_data='swiper_data'></swiper_imgs>
			<div class="goods_details">
				<h3>
					<i class="tag vip_span">会员</i>
					<span>WORLDTOUCH  移动wifi</span>
				</h3>
				<p class="goods_name">WORLDTOUCH  移动WiFi WORLDTOUCH WORLDTOUCH WORLDTOUCH</p>
				<p class="goods_price">￥<span>380</span></p>
				<p class="goods_discount">本级折扣价：￥<span>304</span></p>
			</div>
		</div>
		<div class="flex_between select_goods">
			<span>请选择规格 / 数量</span>
			<svg class="icon" aria-hidden="true" @click='back'>
				<use xlink:href="#icon-you"></use>
			</svg>
		</div>
		<div class="footer">
			<h3 class="flex_center">
				<i></i>
				<span>商品细节</span>
			</h3>
			<div class="goods_imgs_list">
				<img src="https://img.alicdn.com/imgextra/i4/2082003790/O1CN01EDMcmF1drremZlYqL_!!2082003790.jpg" alt="goods_imgs">
				<img src="https://img.alicdn.com/imgextra/i4/2082003790/O1CN01EDMcmF1drremZlYqL_!!2082003790.jpg" alt="goods_imgs">
			</div>
		</div>
		<div class="bottom_btn">
			<button class="fixed_bottom" @click='is_buy_dialog=true'>立即购买</button>
		</div>

		<!-- 选择商品 -->
		<transition name='fade'>
			<div class="fixed_top diy_dialog" v-if='is_buy_dialog' @click.self='is_buy_dialog=false'></div>
		</transition>
		<transition name='fold'>
			<div class="fixed_bottom diy_dialog_main" v-if='is_buy_dialog' style="z-index: 99;">
				<div class="goods_info">
					<div>
						<img src="../../assets/imgs/search_no_result.png" alt="goods">
					</div>
					<div class="dialog_title">
						<p class="dialog_name">
							<i class="tag vip_span">会员</i>
							<span>WORLDTOUCH  移动...</span>
						</p>
						<p class="dialog_price">￥268</p>
					</div>
					<svg class="icon" aria-hidden="true" @click='is_buy_dialog=false'>
						<use xlink:href="#icon-1"></use>
					</svg>
				</div>
				<div class="dialog_specs">
					<h3>规格</h3>
					<ul>
						<li>蓝色</li>
						<li class="select_li">蓝色</li>
						<li>蓝色</li>
						<li>蓝色</li>
						<li>蓝色</li>
						<li>蓝色</li>
					</ul>
				</div>
				<div class="flex_between dialog_num">
					<h3>数量</h3>
					<div class="flex_center add_reduce">
						<img src="../../assets/imgs/add_icon.png" alt="add">
						<span>1</span>
						<img src="../../assets/imgs/reduce_icon.png" alt="reduce">
					</div>
				</div>
				<div class="bottom_btn" @click='sure_buy'>
					<button>确定购买</button>
				</div>
			</div>
		</transition>

	</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import swiper_imgs from '@/components/swiper_imgs.vue';

@Component({
	components: {
		swiper_imgs
	}
})

export default class home extends Vue{
	private swiper_data: any = {
		options: {
			pagination: {
				el: '.swiper-pagination'
			},
			autoplay: {
				delay: 5000,
				disableOnInteraction: false
			},
			loop: true,
			slidesPerView: 'auto'
		},
		imgs: []
	};

	private is_buy_dialog: any = false;

	created () {

	};
	mounted () {
		var that = this;
		setTimeout(() => {
			that.swiper_data.imgs = [
				{ id: '1', src: 'https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i2/2082003790/O1CN015O2Wuw1drre7MfiMv_!!2082003790.jpg_430x430q90.jpg' },
				{ id: '2', src: 'https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i4/2082003790/O1CN013OdH4V1drre9Jt9fX_!!2082003790.jpg_430x430q90.jpg' },
			];
		}, 300);
	};

	back () {
		this.$router.back();
	};

	//确定购买
	sure_buy () {
		this.$router.push({ path: '/order_sure' });
	}

}
</script>

<style lang="scss" scoped>

	.article {
		margin-top: 1px;
		background-color: #fff;
		
		.goods_details {
			padding: 10px 20px 15px 20px;

			h3 {
				display: flex;
				align-items: center;
				font-size: 1.2rem;
				line-height: 1.4;
				margin-bottom: 8px;
			}

			.goods_name {
				color: #999999;
				line-height: 1.4;
				font-size: 0.95rem;
			}

			.goods_price {
				color: $price_color;
				font-size: 1.3rem;
				margin-top: 12px;
				line-height: 1.3;
			}

			.goods_discount {
				color: #31BFAD;
				font-size: 1rem;
			}
		}
	}

	.select_goods {
		margin: 15px 0;
		background-color: #fff;
		padding: 10px 20px;
		color: #666666;

		.icon {
			color: #ccc;
		}
	}

	.footer {
		padding-bottom: 65px;

		h3 {
			background-color: #fff;
			padding: 10px 20px;
			margin-bottom: 1px;
			font-size: 1rem;
			justify-content: unset;

			i {
				display: inline-block;
				width: 5px;
				height: 17px;
				background-color: $btn_color;
				margin-right: 8px;
			}
		}

		.goods_imgs_list {
			background-color: #fff;

			img {
				display: block;
			}
		}
	}

	.diy_dialog_main {
		padding-bottom: 50px;

		.goods_info {
			margin: 20px 15px;
			display: flex;
			align-items: center;
			position: relative;

			img {
				width: 80px;
				margin-right: 10px;
			}

			.dialog_title {
				max-width: 70%;
				
				.dialog_name {
					margin-bottom: 8px;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;

					span {
						font-weight: 900;
						margin-left: 5px;
					}
				}
			}

			.icon {
				position: absolute;
				top: -7px;
   	 			right: 0px;
				width: 1rem;
			}

			.dialog_price {
				color: $price_color;
				font-weight: 900;
				font-size: 1.1rem;
			}
		}

		.dialog_specs {
			display: flex;
			margin: 20px 15px;
			padding-bottom: 20px;
			color: #666666;
			border-top: 1px solid #E6E6E6;
			border-bottom: 1px solid #E6E6E6;

			h3 {
				margin: 14px 15px 0 0;
				white-space: nowrap;
			}

			ul {
				display: flex;
				flex-wrap: wrap;

				li {
					background-color: #F5F5F5;
					padding: 0 10px;
					border-radius: 5px;
					height: 35px;
					line-height: 35px;
					margin: 20px 6px 0 6px;
				}

				.select_li {
					background-color: transparent;
					border: 1px solid $btn_color;
					color: $btn_color;
					height: 33px;
					line-height: 33px;
				}
			}
		}
		
		.dialog_num {
			margin: -6px 15px 0 15px;

			.add_reduce {
				
				span {
					margin: 0 15px;
				}

				img {
					width: 30px;
				}
			}
		}

	}

</style>