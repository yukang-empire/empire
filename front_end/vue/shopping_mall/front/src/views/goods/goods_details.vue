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
					<span v-if='goods_info.shop_type == 1' class="tag vip_span">会员</span>
					<span v-if='goods_info.shop_type == 2' class="tag yx_span">优选</span>
					<span v-if='goods_info.shop_type == 3' class="tag motion_span">运动</span>
					<i>{{ goods_info.goods_name }}</i>
				</h3>
				<p class="goods_name">{{ goods_info.goods_remark }}</p>
				<p class="goods_price">￥<span>{{ goods_info.shop_price }}</span></p>
				<p class="goods_discount">本级折扣价：￥<span>{{ total_account }}</span></p>
			</div>
		</div>
		<div class="flex_between select_goods" @click='is_buy_dialog=true'>
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
			<div class="goods_imgs_list" v-html='goods_info.goods_content'>
				
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
						<img v-if='goods_info.original_img' :src="'https://shop.technologyle.com' + goods_info.original_img" alt="goods">
						<img v-if='!goods_info.original_img' src="../../assets/imgs/search_no_result.png" alt="goods">
					</div>
					<div class="dialog_title">
						<p class="dialog_name">
							<span v-if='goods_info.shop_type == 1' class="tag vip_span">会员</span>
							<span v-if='goods_info.shop_type == 2' class="tag yx_span">优选</span>
							<span v-if='goods_info.shop_type == 3' class="tag motion_span">运动</span>
							<i>{{ goods_info.goods_name }}</i>
						</p>
						<p class="dialog_price">￥{{ goods_info.shop_price }}</p>
					</div>
					<svg class="icon" aria-hidden="true" @click='is_buy_dialog=false'>
						<use xlink:href="#icon-1"></use>
					</svg>
				</div>
				<div class="dialog_specs" v-if='filter_spec["尺寸"]'>
					<h3>尺寸</h3>
					<ul>
						<li v-for='(item, index) in filter_spec["尺寸"]' :key='item.item_id' :class="{select_li: size_index == index}" @click='select_size(index)'>{{ item.item }}</li>
					</ul>
				</div>
				<div class="dialog_specs" v-if='filter_spec["颜色"]'>
					<h3>颜色</h3>
					<ul>
						<li v-for='(item, index) in filter_spec["颜色"]' :key='item.item_id' :class="{select_li: color_index == index}" @click='select_color(index)'>{{ item.item }}</li>
					</ul>
				</div>
				<div class="flex_between dialog_num">
					<h3>数量</h3>
					<div class="flex_center add_reduce">
						<img src="../../assets/imgs/reduce_icon.png" alt="reduce">
							<span>{{ goods_num }}</span>
						<img src="../../assets/imgs/add_icon.png" alt="add">
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
	private is_buy_dialog: any = true;
	private goods_info: any = {};
	private total_account: any = null;
	private filter_spec: any = {};
	private size_index: any = 0;
	private color_index: any = 0;
	private goods_num: any = 0;

	created () {

	};
	mounted () {
		var that = this;
		var query = this.$route.query;
		//请求数据
		var http_data = {
			goods_id: query.goods_id
		};
		this.$store.dispatch('get_goods_details', http_data).then((res) => {
			console.log('商品详情', res);
			if (res.status == 1) {
				this.total_account = res.result.total_account;
				this.goods_info = res.result.goods;
				if (this.goods_info.goods_content) {
					this.goods_info.goods_content = this.goods_info.goods_content.replace(/&(?!#?\w+;)/g, '&amp;').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, "\"").replace(/&#39;/g, "\'");
				}else {
					this.goods_info.goods_content = '';
				};
				if (res.result.goods.goods_images && res.result.goods.goods_images.length > 0) {
					this.swiper_data.imgs = res.result.goods.goods_images;
				};
				this.filter_spec = res.result.filter_spec;
			};
		});
	};

	back () {
		this.$router.back();
	};

	//确定购买
	sure_buy () {
		this.$router.push({ path: '/order_sure' });
	};

	//选择尺寸
	select_size(index) {
		this.size_index = index;
	};

	//选择颜色
	select_color(index) {
		this.color_index = index;
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

				i {
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
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
			padding-bottom: 15px;
			border-bottom: 1px solid #E6E6E6;

			img {
				width: 70px;
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
			border-bottom: 1px solid #E6E6E6;

			h3 {
				margin: 0 15px 0 0;
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
					margin: 0 6px 0 6px;
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