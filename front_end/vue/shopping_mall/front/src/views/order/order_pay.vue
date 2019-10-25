<template>
	<div class="order_pay">
		<div class="header_public">
			<div class="flex_center back">
				<svg class="icon" aria-hidden="true" @click='back'>
					<use xlink:href="#icon-arrow-right"></use>
				</svg>
			</div>
			<h3 class="flex_center">支付订单</h3>
		</div>
		<div class="order_num">
			<p class="flex_between">
				<span>订单号</span>
				<i>201906151754138641</i>
			</p>
			<p class="flex_between">
				<span>支付金额</span>
				<i class="order_price">￥432.60</i>
			</p>
		</div>
		<div class="pay_way">
			<h3>
				<i></i>
				<span>选择支付方式</span>
			</h3>
			<ul>
				<li class="flex_between">
					<div class="wx">
						<img src="../../assets/imgs/pay_wx.png" alt="wechat">
						<span>微信支付</span>
					</div>
					<img src="../../assets/imgs/pay_yes_choose.png" alt="choose">
				</li>
				<li class="flex_between">
					<div class="zfb">
						<img src="../../assets/imgs/pay_zfb.png" alt="zfb">
						<span>支付宝支付</span>
					</div>
					<img src="../../assets/imgs/pay_no_choose.png" alt="choose">
				</li>
			</ul>
		</div>
		
		<div class="fixed_bottom flex_center footer_btn">
			<div class="final_price">
				<span>应付金额：</span>
				<i>￥448.00</i>
			</div>
			<div class="pay_btn" @click='to_pay'>
				<button>确认支付</button>
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

export default class order_pay extends Vue{
	
	created () {

	};
	mounted () {

	};

	back () {
		this.$router.back();
	};

	to_pay () {
		
	}
}
</script>

<style lang="scss" scoped>

	.order_num {
		margin: 15px 0;
		padding: 0 15px;
		background-color: #fff;

		p {
			padding: 12px 0;
			border-bottom: 1px solid #E0E0E0;

			span {
				color: #666;
			}

			.order_price {
				color: $price_color;
				font-size: 1.1rem;
			}
		}

		p:last-of-type {
			border: none;
		}
	}
	
	.pay_way {
		background-color: #fff;
		margin-bottom: 60px;
		padding-bottom: 5px;

		h3 {
			padding: 15px 15px;
			display: flex;
			align-items: center;
			color: $btn_color;
			font-weight: 400;
			font-size: 1.05rem;

			i {
				width: 5px;
				height: 17px;
				background-color: $btn_color;
				margin-right: 8px;
			}
		}

		li {
			padding: 20px 0;
			margin: 0 15px;
			border-top: 1px solid #CCCCCC;

			img {
				width: 25px;
			}

			div {
				display: flex;
				align-items: center;

				img {
					margin-right: 10px;
					width: 28px;
				}

			}
		}
	}
</style>