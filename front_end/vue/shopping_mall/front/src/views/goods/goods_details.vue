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
					<i class="tag">会员</i>
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
		<div class="buy_btn">
			<button class="fixed_bottom" @click='is_select_goods=true'>立即购买</button>
		</div>

		<!-- 选择商品 -->
		<div class="fixed_top diy_dialog">
			<div class="fixed_bottom main">
				<div class="goods_info">
					<div>
						<img src="https://img.alicdn.com/imgextra/i4/2082003790/O1CN01EDMcmF1drremZlYqL_!!2082003790.jpg" alt="goods">
					</div>
					<div>
						<p>
							<i class="tag">会员</i>
							<span>WORLDTOUCH  移动...</span>
						</p>
						<p class="dialog_price"></p>
					</div>
				</div>
			</div>
		</div>
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

	.buy_btn button {
		height: 55px;
		line-height: 55px;
		color: #fff;
		border-radius: 0;
		background-color: $btn_color;
	}

</style>