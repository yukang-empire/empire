<template>
	<div class="order_details">
		<div class="header_public">
			<div class="flex_center back">
				<svg class="icon" aria-hidden="true" @click='back'>
					<use xlink:href="#icon-arrow-right"></use>
				</svg>
			</div>
			<h3 class="flex_center">订单详情</h3>
		</div>
		<div class="flex_between header" v-if='details_data.order_status_detail == "待发货"'>
			<div class="left">等待发货</div>
			<div>
				<img src="../../assets/imgs/details_no_send.png" alt="">
			</div>
		</div>
		<div class="flex_between header" v-else-if='details_data.order_status_detail == "待收货"'>
			<div class="left">卖家已发货</div>
			<div>
				<img src="../../assets/imgs/details_no_sign.png" alt="">
			</div>
		</div>
		<div class="flex_between header" v-else-if='details_data.order_status_detail == "待支付" || details_data.order_status_detail == "已取消"'>
			<div class="left">交易失败</div>
			<div>
				<img src="../../assets/imgs/details_fail.png" alt="">
			</div>
		</div>
		<div class="flex_between header" v-else>
			<div class="left">交易完成</div>
			<div>
				<img src="../../assets/imgs/details_success.png" alt="">
			</div>
		</div>
		<div class="flex_between logistics_info" v-if='details_data.order_goods[0].is_send == 1'>
			<div class="left">
				<svg class="icon" aria-hidden="true">
					<use xlink:href="#icon-wuliu"></use>
				</svg>
				<span>{{ details_data.order_goods[0].shipping_name || '暂无快递公司' }}</span>
				<i>{{ details_data.order_goods[0].delivery_code }}</i>
			</div>
			<div class="right" @click='copy'>
				<span class="order_sn" :data-clipboard-text="details_data.order_goods[0].delivery_code">复制</span>
			</div>
		</div>
		<div class="address">
			<div class="left">
				<svg class="icon" aria-hidden="true">
					<use xlink:href="#icon-dizhi"></use>
				</svg>
				<div class="address_info">
					<p>
						<span>{{ details_data.consignee }}</span>
						<i>{{ details_data.mobile }}</i>
					</p>
					<p class="address_details">{{ details_data.province + details_data.city + details_data.district + details_data.address }}</p>
				</div>
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
					<span>{{ details_data.order_goods[0].goods_name }}</span>
				</p>
				<p class="goods_price">￥{{ details_data.order_goods[0].goods_price }}</p>
			</div>
			<div class="goods_num">x<span>{{ details_data.order_goods[0].goods_num }}</span></div>
		</div>
		<!-- <div class="details_btn">
			<button>联系客服</button>
		</div> -->
		<ul class="other_info">
			<li>
				<span>商品金额</span>
				<span class="total_price">￥<i>{{ details_data.order_goods[0].goods_price * details_data.order_goods[0].goods_num }}</i></span>
			</li>
			<li>
				<span>运费</span>
				<span class="freight">￥<i>0.00</i></span>
			</li>
			<li>
				<span>会员自购</span>
				<span class="discount">{{ '-' + ((details_data.order_goods[0].goods_price - details_data.order_goods[0].final_price)  * details_data.order_goods[0].goods_num).toFixed(2) }}</span>
			</li>
			<li>
				<span>实付</span>
				<span class="actual_pay">￥<i>{{ details_data.order_goods[0].final_price * details_data.order_goods[0].goods_num }}</i></span>
			</li>
		</ul>
		<h3 class="order_title">
			<svg class="icon" aria-hidden="true">
				<use xlink:href="#icon-dingdan1"></use>
			</svg>
			<span>订单信息</span>
		</h3>
		<ul class="other_info" style="margin-top: 1px;margin-bottom: 60px;">
			<li>
				<span>订单编号</span>
				<span class="total_price"><i>{{ details_data.order_sn }}</i></span>
			</li>
			<li>
				<span>支付方式</span>
				<span class="discount">{{ details_data.pay_name }}</span>
			</li>
			<li>
				<span>创建时间</span>
				<span class="discount">{{ details_data.add_time }}</span>
			</li>
			<li>
				<span>付款时间</span>
				<span class="discount"><i>{{ details_data.pay_time }}</i></span>
			</li>
		</ul>
		<div class="bottom_btn" v-if='details_data.order_status_detail == "待收货"'>
			<button @click="sure_receive">确定收货</button>
		</div>
		<!-- 文字提示 -->
		<transition name='fade'>
			<div class="text_tip" v-if='text_tip.is_open'>{{ text_tip.msg }}</div>
		</transition>
	</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Clipboard from 'clipboard';

@Component({
	components: {

	}
})

export default class order_details extends Vue{
	private details_data: any = {};

	private text_tip: any = {
		is_open: false,
		msg: '',
		can_click: true
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

	sure_receive () {
		var that = this;
		var http_data = {
			order_id: this.details_data.order_id || ''
		};
		this.$store.dispatch('sure_receive', http_data).then((res) => {
			console.log('确认收货', res);
			if (res.status == 1) {
				that.open_text_tip('操作成功!');
				that.$router.push({ path: '/order_list', query: { index: 3 } });
			}
		})
	};

	back () {
		this.$router.back()
	};
	copy () {
		var that = this;
		var clipboard = new Clipboard('.order_sn');
		clipboard.on('success', e => {
			console.log('复制成功')
			that.open_text_tip('复制成功!');
			// 释放内存  
			clipboard.destroy()  
		});
		clipboard.on('error', e => {  
			// 不支持复制  
			that.open_text_tip('该浏览器不支持自动复制!');
			console.log('该浏览器不支持自动复制')  
			// 释放内存  
			clipboard.destroy()  
		})
	}
	created () {

	};
	mounted () {
		this.details_data = JSON.parse(sessionStorage.getItem('order_details_data')) || {};
		this.details_data.add_time = this.details_data.add_time == 0 ? "暂无" : this.$moment(this.details_data.add_time * 1000).format('YYYY-MM-DD hh:mm');
		this.details_data.pay_time = this.details_data.pay_time == 0 ? "未付款" : this.$moment(this.details_data.pay_time * 1000).format('YYYY-MM-DD hh:mm');
	};

	
}
</script>

<style lang="scss" scoped>

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
	
	.header {
		background: url('../../assets/imgs/order_details_bg.png') 0 0 no-repeat;
		background-size: cover;
		padding: 5px 40px;
		color: #fff;
		font-size: 1.2rem;
		font-weight: 900;
		letter-spacing: 2px;

		img {
			width: 80px;
		}
		.left {
			margin-top: -15px;
		}
	}
	
	.logistics_info {
		color: #333;
		padding: 10px 15px;
		margin-bottom: 10px;
		background-color: #fff;

		.left {
			display: flex;
			align-items: center;

			span {
				margin: 0 10px;
				font-weight: 900;
			}

			i {
				color: #666;
				font-size: 0.9rem;
			}
			.icon {
				width: 1.2rem;
				height: 1.2rem;
			}
		}
		.right {
			color: #B3B3B3;

			span {
				border: 1px solid #CCCCCC;
				height: 25px;
				line-height: 25px;
				border-radius: 5px;
				font-size: 0.8rem;
				padding: 0 12px;
				display: inline-block;
			}
		}
	}

	.address {
		color: #333;
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
				margin-left: -3px;
			}
		}
	}

</style>