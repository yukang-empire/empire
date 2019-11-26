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
		<div class="flex_between address" v-if='address_info' @click='select_address'>
			<div class="left">
				<svg class="icon" aria-hidden="true">
					<use xlink:href="#icon-dizhi"></use>
				</svg>
				<div class="address_info">
					<p>
						<span>{{ address_info.consignee }}</span>
						<i>{{ address_info.mobile }}</i>
					</p>
					<p class="address_details">{{ address_info.total_address }}</p>
				</div>
			</div>
			<div>
				<svg class="icon" aria-hidden="true">
					<use xlink:href="#icon-you"></use>
				</svg>
			</div>
		</div>
		<div class="flex_between no_address" v-if='!address_info' @click='select_address'>
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
					<span>{{ goods_info.goods_name }}</span>
				</p>
				<p class="goods_price">￥{{ goods_info.shop_price }}</p>
			</div>
			<div class="goods_num">x<span>{{ goods_info.goods_num }}</span></div>
		</div>
		<ul class="other_info">
			<li>
				<span>商品金额</span>
				<span class="total_price">￥<i>{{ goods_info.shop_price * goods_info.goods_num }}</i></span>
			</li>
			<li>
				<span>运费</span>
				<span class="freight">￥<i>{{ shipping_price || '0.00' }}</i></span>
			</li>
			<li @click='choose_zi_ti'>
				<span>是否自提</span>
				<img src="../../assets/imgs/pay_yes_choose.png" alt="choose" style="width: 25px;" v-if='zi_ti'>
				<img src="../../assets/imgs/pay_no_choose.png" alt="choose" style="width: 25px;" v-if='!zi_ti'>
			</li>
			<li>
				<span>会员自购</span>
				<span class="discount">{{ goods_info.deduction_account ? '-' + goods_info.deduction_account : '￥0.00' }}</span>
			</li>
			<li>
				<span>实付</span>
				<span class="actual_pay">￥<i>{{ total_account || '0.00' }}</i></span>
			</li>
		</ul>
		<div style="width: 100%;height: 80px;background-color: transparent;"></div>
		<div class="fixed_bottom flex_center footer_btn">
			<div class="final_price">
				<span>应付金额：</span>
				<i>￥{{ total_account }}</i>
			</div>
			<div class="pay_btn">
				<button @click='to_pay'>去支付</button>
			</div>
		</div>
		<!-- 文字提示 -->
		<transition name='fade'>
			<div class="text_tip" v-if='text_tip.is_open'>{{ text_tip.msg }}</div>
		</transition>
	</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
	components: {

	}
})

export default class order_sure extends Vue{
	private address_info: any = {};
	private goods_info: any = {};
	private shipping_price: any = {};
	private shipping_price_02: any = {};
	private total_account: any = {};
	private total_account_02: any = {};
	private zi_ti: any = false;
	private text_tip: any = {
		is_open: false,
		msg: '',
		can_click: true
	};
	
	created () {

	};
	mounted () {
		var that = this;
		//请求数据
		if (sessionStorage.getItem('goods_parameter')) {
			var goods_parameter: any = sessionStorage.getItem('goods_parameter');
			var http_data: any = JSON.parse(goods_parameter);
		};
		this.$store.dispatch('get_order_details', http_data).then((res) => {
			console.log('订单详情', res);
			if (res.status == 1) {
				this.address_info = res.result.address;
				this.goods_info = res.result.goods;
				this.goods_info.deduction_account = res.result.deduction_account;
				this.goods_info.total_account = res.result.total_account;
				if (sessionStorage.getItem('goods_parameter')) {
					var goods_parameter: any = sessionStorage.getItem('goods_parameter');
					var goods_num: any = parseFloat(JSON.parse(goods_parameter).goods_num);
					this.goods_info.goods_num = goods_num;
				}else {
					this.goods_info.goods_num = 1;
				};
				
				this.shipping_price_02 = res.result.shipping_price;
				if (parseFloat(this.goods_info.goods_num) >= 3) {
					this.shipping_price = '0.00';
				}else {
					this.shipping_price = res.result.shipping_price;
				};
				this.total_account_02 = res.result.total_account;
				
				if (this.shipping_price) {

					this.total_account = parseFloat(this.total_account_02) + parseFloat(this.shipping_price);
				}else {
					this.total_account = parseFloat(this.total_account_02);
				};
				this.goods_info.shop_price = parseFloat(this.goods_info.shop_price);
			};
		});
	};

	choose_zi_ti () {
		this.zi_ti = !this.zi_ti;
		if (this.zi_ti) {
			this.shipping_price = '0.00';
		}else {
			
			if (this.goods_info.goods_num >= 3) {
				this.shipping_price = 0;
			}else {
				this.shipping_price = this.shipping_price_02;
			}
		};
		if (this.shipping_price) {

			this.total_account = parseFloat(this.total_account_02) + parseFloat(this.shipping_price);
		}
	};

	//打开轻提示
	open_text_tip (text: any) {
		if (this.text_tip.can_click) {
			this.text_tip.can_click = false;
			this.text_tip.is_open = true;
			this.text_tip.msg = text;
			setTimeout(() => {
				this.text_tip.can_click = true;
				this.text_tip.is_open = false;
				this.text_tip.msg = '';
			}, 1500);
		}else {
			return false;
		};
	};

	back () {
		if (sessionStorage.getItem('goods_id')) {
			var goods_id = sessionStorage.getItem('goods_id');
			this.$router.push({ path: '/goods_details', query: { goods_id: goods_id } });
		}else {
			this.$router.push({ path: '/goods_details' });
		}
	};

	select_address () {
		this.$router.push({ path: '/all_address' });
	};

	to_pay () {
		var that = this;
		//请求数据
		if (sessionStorage.getItem('goods_parameter')) {
			var goods_parameter: any = sessionStorage.getItem('goods_parameter');
			var http_data: any = JSON.parse(goods_parameter);
			http_data.auto_goods = that.zi_ti ? 1 : 0;
		};
		this.$store.dispatch('get_order_num', http_data).then((res) => {
			console.log('订单号', res);
			if (res.status == 1) {
				var order_info = {
					num: res.result,
					price: that.total_account,
					auto_goods: that.zi_ti ? 1 : 0
				};
				var order_info_ = JSON.stringify(order_info);
				sessionStorage.setItem('order_info', order_info_);
				that.$router.push({ path: '/order_pay' });
			}else {
				that.open_text_tip(res.msg);
			}
		});
		
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
		padding: 0 15px 0 15px;
		margin-top: 15px;
		background-color: #fff;
		/* margin-bottom: 60px; */

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