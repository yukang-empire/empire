<template>
	<div class="order_sure">
		<div class="header_public">
			<div class="flex_center back">
				<svg class="icon" aria-hidden="true" @click='back'>
					<use xlink:href="#icon-arrow-right"></use>
				</svg>
			</div>
			<h3 class="flex_center">订单确认</h3>
		</div>
		<div class="flex_between address" v-if='true' @click='select_address'>
			<div class="left">
				<svg class="icon" aria-hidden="true">
					<use xlink:href="#icon-dizhi"></use>
				</svg>
				<div class="address_info">
					<p>
						<span>张三</span>
						<i>13416816832</i>
					</p>
					<p class="address_details">广东省  深圳市  龙华新区  金銮国际大厦10...</p>
				</div>
			</div>
			<div>
				<svg class="icon" aria-hidden="true">
					<use xlink:href="#icon-you"></use>
				</svg>
			</div>
		</div>
		<div class="flex_between no_address" v-if='false' @click='select_address'>
			<div class="left">
				<svg class="icon" aria-hidden="true">
					<use xlink:href="#icon-dizhi"></use>
				</svg>
				<span>+ 新建收货地址</span>
			</div>
			<div>
				<svg class="icon" aria-hidden="true">
					<use xlink:href="#icon-you"></use>
				</svg>
			</div>
		</div>
		
		<h3 class="order_title">
			<svg class="icon" aria-hidden="true">
				<use xlink:href="#icon-shangjia"></use>
			</svg>
			<span>轻酷健身</span>
		</h3>
		<div class="goods_info">
			<div>
				<img src="../../assets/imgs/search_no_result.png" alt="goods">
			</div>
			<div class="goods_title">
				<p class="goods_name">
					<i class="tag vip_span">会员</i>
					<span>WORLDTOUCHWORLDTOUCHWORLDTOUCHWORLDTOUCH  移动...</span>
				</p>
				<p class="goods_price">￥268</p>
			</div>
			<div class="goods_num">x<span>1</span></div>
		</div>
		<ul class="other_info">
			<li>
				<span>商品金额</span>
				<span class="total_price">￥<i>560.00</i></span>
			</li>
			<li>
				<span>运费</span>
				<span class="freight">￥<i>0.00</i></span>
			</li>
			<li>
				<span>会员自购</span>
				<span class="discount">-112.00</span>
			</li>
			<li>
				<span>实付</span>
				<span class="actual_pay">￥<i>448.00</i></span>
			</li>
		</ul>
		<div class="fixed_bottom flex_center footer_btn">
			<div class="final_price">
				<span>应付金额：</span>
				<i>￥448.00</i>
			</div>
			<div class="pay_btn" @click='to_pay'>
				<button>去支付</button>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
	components: {

	}
})

export default class order_sure extends Vue{
	
	created () {

	};
	mounted () {

	};

	back () {
		this.$router.back();
	};

	to_pay() {
		this.$router.push({ path: '/order_pay' });
	};

	select_address () {
		this.$router.push({ path: '/all_address' });
	}

}
</script>

<style lang="scss" scoped>
	
	.address {
		color: $btn_color;
		padding: 10px 15px;
		background-color: #fff;

		.left {
			display: flex;
			align-items: center;
			max-width: 95%;
			
			.address_info {
				color: #333333;
				max-width: 90%;

				p {

					i {
						margin-left: 22px;
					}
				}

				.address_details {
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}

			.icon {
				width: 1.5rem;
				height: 1.5rem;
				margin-right: 8px;
			}
		}
	}

	.no_address {
		color: $btn_color;
		padding: 20px 15px;
		background-color: #fff;

		.left {
			display: flex;
			align-items: center;
			
			.icon {
				width: 1.5rem;
				height: 1.5rem;
				margin-right: 8px;
			}
		}
	}

	.order_title {
		padding: 10px 15px;
		margin: 15px 0 1px 0;
		background-color: #fff;
		font-size: 1rem;
		display: flex;
		align-items: center;

		.icon {
			width: 1.2rem;
			color: $btn_color;
			height: 1.2rem;
			margin-right: 8px;
		}
	}

	.goods_info {
		background-color: #fff;
		padding: 10px 15px;
		display: flex;
		align-items: center;

		img {
			width: 80px;
			margin-right: 10px;
		}

		.goods_title {
			max-width: 65%;

			.goods_name {
				margin-bottom: 8px;
				display: flex;
				align-items: center;

				span {
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}

			.goods_price {
				color: $price_color;
				font-size: 1.1rem;
			}
		}

		.goods_num {
			color: #999999;
			align-self: flex-end;
			line-height: 2.5;
		}
	}

	.other_info {
		padding: 0 15px 10px 15px;
		margin-top: 15px;
		background-color: #fff;
		margin-bottom: 60px;

		li {
			padding: 10px 0;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: 1px solid #E0E0E0;
		}

		li:last-of-type {
			border: none;
		}

		.total_price, .freight, .discount {
			color: $btn_color;
		}

		.actual_pay {
			color: $price_color;
		}
	}

</style>