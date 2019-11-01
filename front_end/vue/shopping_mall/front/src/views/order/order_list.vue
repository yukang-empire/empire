<template>
	<div class="order_list">
		<div class="header_public">
			<div class="flex_center back">
				<svg class="icon" aria-hidden="true" @click='back'>
					<use xlink:href="#icon-arrow-right"></use>
				</svg>
			</div>
			<h3 class="flex_center">订单列表</h3>
		</div>
		<ul class="order_nav">
			<li :class="{select: nav_index == 0}" @click='switch_nav(0)'>全部</li>
			<li :class="{select: nav_index == 1}" @click='switch_nav(1)'>待支付</li>
			<li :class="{select: nav_index == 2}" @click='switch_nav(2)'>待发货</li>
			<li :class="{select: nav_index == 3}" @click='switch_nav(3)'>待收货</li>
		</ul>
		<div class="list_li" v-if='nav_index == 0'>
			<ul v-if='order_list.all.length > 0'>
				<li v-for='(item, index) in order_list.all' :key='item.order_id'>
					<h3 class="flex_between">
						<span class="left">
							<i>轻酷商城</i>
							<svg class="icon" aria-hidden="true">
								<use xlink:href="#icon-you"></use>
							</svg>
						</span>
						<span class="right" :class="{no_pay: item.order_status_detail == '待支付', no_sign: item.order_status_detail == '待收货', no_send: item.order_status_detail == '待发货', success: item.order_status_detail == '交易成功',fail: item.order_status_detail == '交易失败'}">{{ item.order_status_detail }}</span>
					</h3>
					<div class="flex_between middle">
						<div class="left">
							<div>
								<img v-if='item.order_goods[0].goods_img' :src="item.order_goods[0].goods_img" alt="">
								<img v-if='!item.order_goods[0].goods_img' src="../../assets/imgs/default_goods_img.png" alt="">
							</div>
							<p>
								<i class="tag vip_span" v-if='item.shop_type == 1'>会员</i>
								<i class="tag yx_span" v-if='item.shop_type == 2'>优选</i>
								<i class="tag motion_span" v-if='item.shop_type == 3'>运动</i>
								<span>{{ item.order_goods[0].goods_name }}</span>
							</p>
						</div>
						<div class='right'>
							<p class="price">¥{{ item.order_goods[0].goods_price }}</p>
							<p class="num">x{{ item.order_goods[0].goods_num }}</p>
						</div>
					</div>
					<p class="total">
						<span>共<i>{{ item.order_goods[0].goods_num }}</i>件商品</span>
						<span>合计¥<i>{{ item.order_goods[0].final_price }}</i></span>
					</p>
					<div class="btn" v-if="item.order_status_detail == '待支付'">
						<button class="cancel" @click='click_btn(0, "是否取消该订单？")'>取消订单</button>
						<button class="pay" @click='click_to_pay'>去支付</button>
					</div>
					<div class="btn" v-if="item.order_status_detail == '待发货'">
						<button class="fa_huo" @click='click_btn(2)'>联系客服</button>
					</div>
					<div class="btn" v-if="item.order_status_detail == '待收货'">
						<button class="look_log" @click='click_btn(1)'>查看物流</button>
						<button class="sure" @click='click_btn(0, "是否确认收货？")'>确认收货</button>
					</div>
					<div class="btn" v-if="item.order_status_detail == '交易关闭' || item.order_status_detail == '交易成功'">
						<button class="cancel" @click='click_btn(0, "是否删除该订单？")'>删除订单</button>
					</div>
				</li>
			</ul>
			<div class="flex_center no_order" v-if='order_list.all.length <= 0'>
				<img src="../../assets/imgs/search_no_result.png" alt="">
				<p>暂无购物订单~快去买买买~</p>
				<div @click='to_index'>前往商城</div>
			</div>
		</div>
		<div class="list_li" v-if='nav_index == 1'>
			<ul v-if='order_list.no_pay.length > 0'>
				<li v-for='(item, index) in order_list.no_pay' :key='item.order_id'>
					<h3 class="flex_between">
						<span class="left">
							<i>轻酷商城</i>
							<svg class="icon" aria-hidden="true">
								<use xlink:href="#icon-you"></use>
							</svg>
						</span>
						<span class="right" :class="{no_pay: item.order_status_detail == '待支付', no_sign: item.order_status_detail == '待收货', no_send: item.order_status_detail == '待发货', success: item.order_status_detail == '交易成功',fail: item.order_status_detail == '交易失败'}">{{ item.order_status_detail }}</span>
					</h3>
					<div class="flex_between middle">
						<div class="left">
							<div>
								<img v-if='item.order_goods[0].goods_img' :src="item.order_goods[0].goods_img" alt="">
								<img v-if='!item.order_goods[0].goods_img' src="../../assets/imgs/default_goods_img.png" alt="">
							</div>
							<p>
								<i class="tag vip_span" v-if='item.shop_type == 1'>会员</i>
								<i class="tag yx_span" v-if='item.shop_type == 2'>优选</i>
								<i class="tag motion_span" v-if='item.shop_type == 3'>运动</i>
								<span>{{ item.order_goods[0].goods_name }}</span>
							</p>
						</div>
						<div class='right'>
							<p class="price">¥{{ item.order_goods[0].goods_price }}</p>
							<p class="num">x{{ item.order_goods[0].goods_num }}</p>
						</div>
					</div>
					<p class="total">
						<span>共<i>{{ item.order_goods[0].goods_num }}</i>件商品</span>
						<span>合计¥<i>{{ item.order_goods[0].final_price }}</i></span>
					</p>
					<div class="btn" v-if="item.order_status_detail == '待支付'">
						<button class="cancel" @click='click_btn(0, "是否取消该订单？")'>取消订单</button>
						<button class="pay" @click='click_to_pay'>去支付</button>
					</div>
				</li>
			</ul>
			<div class="flex_center no_order" v-if='order_list.no_pay.length <= 0'>
				<img src="../../assets/imgs/search_no_result.png" alt="">
				<p>暂无购物订单~快去买买买~</p>
				<div @click='to_index'>前往商城</div>
			</div>
		</div>
		<div class="list_li" v-if='nav_index == 2'>
			<ul v-if='order_list.no_send.length > 0'>
				<li v-for='(item, index) in order_list.no_send' :key='item.order_id'>
					<h3 class="flex_between">
						<span class="left">
							<i>轻酷商城</i>
							<svg class="icon" aria-hidden="true">
								<use xlink:href="#icon-you"></use>
							</svg>
						</span>
						<span class="right" :class="{no_pay: item.order_status_detail == '待支付', no_sign: item.order_status_detail == '待收货', no_send: item.order_status_detail == '待发货', success: item.order_status_detail == '交易成功',fail: item.order_status_detail == '交易失败'}">{{ item.order_status_detail }}</span>
					</h3>
					<div class="flex_between middle">
						<div class="left">
							<div>
								<img v-if='item.order_goods[0].goods_img' :src="item.order_goods[0].goods_img" alt="">
								<img v-if='!item.order_goods[0].goods_img' src="../../assets/imgs/default_goods_img.png" alt="">
							</div>
							<p>
								<i class="tag vip_span" v-if='item.shop_type == 1'>会员</i>
								<i class="tag yx_span" v-if='item.shop_type == 2'>优选</i>
								<i class="tag motion_span" v-if='item.shop_type == 3'>运动</i>
								<span>{{ item.order_goods[0].goods_name }}</span>
							</p>
						</div>
						<div class='right'>
							<p class="price">¥{{ item.order_goods[0].goods_price }}</p>
							<p class="num">x{{ item.order_goods[0].goods_num }}</p>
						</div>
					</div>
					<p class="total">
						<span>共<i>{{ item.order_goods[0].goods_num }}</i>件商品</span>
						<span>合计¥<i>{{ item.order_goods[0].final_price }}</i></span>
					</p>
					<div class="btn" v-if="item.order_status_detail == '待发货'">
						<button class="fa_huo" @click='click_btn(2)'>联系客服</button>
					</div>
				</li>
			</ul>
			<div class="flex_center no_order" v-if='order_list.no_send.length <= 0'>
				<img src="../../assets/imgs/search_no_result.png" alt="">
				<p>暂无购物订单~快去买买买~</p>
				<div @click='to_index'>前往商城</div>
			</div>
		</div>
		<div class="list_li" v-if='nav_index == 3'>
			<ul v-if='order_list.no_sign.length > 0'>
				<li v-for='(item, index) in order_list.no_sign' :key='item.order_id'>
					<h3 class="flex_between">
						<span class="left">
							<i>轻酷商城</i>
							<svg class="icon" aria-hidden="true">
								<use xlink:href="#icon-you"></use>
							</svg>
						</span>
						<span class="right" :class="{no_pay: item.order_status_detail == '待支付', no_sign: item.order_status_detail == '待收货', no_send: item.order_status_detail == '待发货', success: item.order_status_detail == '交易成功',fail: item.order_status_detail == '交易失败'}">{{ item.order_status_detail }}</span>
					</h3>
					<div class="flex_between middle">
						<div class="left">
							<div>
								<img v-if='item.order_goods[0].goods_img' :src="item.order_goods[0].goods_img" alt="">
								<img v-if='!item.order_goods[0].goods_img' src="../../assets/imgs/default_goods_img.png" alt="">
							</div>
							<p>
								<i class="tag vip_span" v-if='item.shop_type == 1'>会员</i>
								<i class="tag yx_span" v-if='item.shop_type == 2'>优选</i>
								<i class="tag motion_span" v-if='item.shop_type == 3'>运动</i>
								<span>{{ item.order_goods[0].goods_name }}</span>
							</p>
						</div>
						<div class='right'>
							<p class="price">¥{{ item.order_goods[0].goods_price }}</p>
							<p class="num">x{{ item.order_goods[0].goods_num }}</p>
						</div>
					</div>
					<p class="total">
						<span>共<i>{{ item.order_goods[0].goods_num }}</i>件商品</span>
						<span>合计¥<i>{{ item.order_goods[0].final_price }}</i></span>
					</p>
					<div class="btn" v-if="item.order_status_detail == '待收货'">
						<button class="look_log" @click='click_btn(1)'>查看物流</button>
						<button class="sure" @click='click_btn(0, "是否确认收货？")'>确认收货</button>
					</div>
				</li>
			</ul>
			<div class="flex_center no_order" v-if='order_list.no_sign.length <= 0'>
				<img src="../../assets/imgs/search_no_result.png" alt="">
				<p>暂无购物订单~快去买买买~</p>
				<div @click='to_index'>前往商城</div>
			</div>
		</div>

		<transition name='fade'>
			<div class="fixed_top diy_dialog" v-if='is_dialog' @click.self='is_dialog=false'>
				<div class="ad_center diy_dialog_main order_dialog">
					<div class="cancel_order"  v-if='dialog_type == 0'>
						{{ dialog_msg }}
					</div>
					<div class="flex_center logistics" v-if='dialog_type == 1'>
						<h3>物流信息</h3>
						<p>
							<span>SF快递</span>
							<i>9745654236523</i>
						</p>
					</div>
					<div class="flex_center logistics customer" v-if='dialog_type == 2'>
						<h3>联系客服</h3>
						<p>
							<span>拨打：</span>
							<i>400-88888888</i>
						</p>
					</div>
					<div class="flex_center btn">
						<button class="left" @click='is_dialog=false'>取消</button>
						<div class="line"></div>
						<button class="right" v-if='dialog_type == 1'>复制</button>
						<button class="right" v-else>确定</button>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
	components: {

	}
})

export default class order_list extends Vue{
	private nav_index: any = 0;
	private dialog_type: any = 0;
	private dialog_msg: any = '';
	private is_dialog: any = false;
	private order_list: any = {
		all: [],
		no_pay: [],
		no_send: [],
		no_sign: []
	};

	click_btn (index, msg) {
		this.is_dialog = true;
		this.dialog_type = index;
		this.dialog_msg = msg;
	};

	click_to_pay () {

	}

	to_index () {
		this.$router.push({ path: '/index' });
	};

	back () {
		this.$router.back()
	};
	
	created () {

	};
	//所有订单
	all_order () {
		var that = this;
		var http_data = {
			type: 0
		};
		this.$store.dispatch('get_all_orders', http_data).then((res) => {
			console.log('全部订单', res);
			if(res.status == 1){
				this.order_list.all = res.result;
			}
		})
	};
	//待支付
	no_pay () {
		var that = this;
		var http_data = {
			type: 1
		};
		this.$store.dispatch('get_all_orders', http_data).then((res) => {
			console.log('待支付订单', res);
			if(res.status == 1){
				this.order_list.no_pay = res.result;
			}
		})
	};
	//待发货
	no_send () {
		var that = this;
		var http_data = {
			type: 2
		};
		this.$store.dispatch('get_all_orders', http_data).then((res) => {
			console.log('待发货订单', res);
			if(res.status == 1){
				this.order_list.no_send = res.result;
			}
		})
	};
	//待收货
	no_sign () {
		var that = this;
		var http_data = {
			type: 3
		};
		this.$store.dispatch('get_all_orders', http_data).then((res) => {
			console.log('待收货订单', res);
			if(res.status == 1){
				this.order_list.no_sign = res.result;
			}
		})
	};
	switch_nav (index) {
		if (index == 0) {
			this.nav_index = index;
			this.all_order();
		}else if (index == 1) {
			this.nav_index = index;
			this.no_pay();
		}else if (index == 2) {
			this.nav_index = index;
			this.no_send();
		}else if (index == 3) {
			this.nav_index = index;
			this.no_sign();
		};
	};
	mounted () {
		this.all_order();
	};

	
}
</script>

<style lang="scss" scoped>
	.order_nav {
		background-color: #fff;
		color: #666;
		font-size: 0.95rem;
		display: flex;
		align-items: center;
		justify-content: space-around;

		li {
			
			padding: 8px 0;
		}
		li.select {
			border-bottom: 3px solid #31BFAD;
			color: #31BFAD;
		}
	}

	
	.no_order {
		flex-direction: column;
		margin-top: 100px;

		img {
			width: 150px;
		}
		p {
			color: #B3B3B3;
			margin: 10px 0 25px 0;
			font-size: 0.9rem;
		}
		div {
			text-align: center;
			border: 1px solid #31BFAD;
			height: 40px;
			line-height: 40px;
			color: #31BFAD;
			font-size: 0.95rem;
			border-radius: 5px;
			background-color: transparent;
			width: 80%;
		}
	}

	
	.list_li {
		
		li {
			background-color: #fff;
			margin: 10px 20px;
			border-radius: 8px;

			h3 {
				padding: 10px 15px;
				border-bottom: 1px solid #E0E0E0;
				color: #666666;
				font-size: 0.9rem;

				.icon {
					color: #999;
					margin-left: 5px;
				}
				.no_pay {
					color: #FF6C00;
				}
				.no_sign, .no_send {
					color: #31BFAD;
				}
				.success, .fail {
					color: #333;
				}
			}

			.middle {
				margin: 15px 15px;
				font-size: 0.9rem;
				.left {
					display: flex;
					color: #333333;

					div {
						width: 70px;
						margin-right: 8px;
					}

					p {
						width: 60%;
					}
				}
				.right {
					min-width: 20%;
					color: #999999;
					font-size: 0.8rem;
					text-align: right;
    				align-self: flex-end;
					.price {
						color: $price_color;
						font-size: 0.95rem;
					}
				}
			}
			.total {
				color: #666666;
				text-align: right;
				font-size: 0.9rem;
				margin: 10px 15px;

				span {
					margin-left: 10px;
				}
			}
			.btn {
				margin: 15px 15px;
				padding-bottom: 20px;
				text-align: right;
				button {
					border-radius: 20px;
					padding: 0 15px;
					height: 30px;
					line-height: 30px;
					color: #fff;
					font-size: 0.8rem;
					background-color: #FF8E3B;
					margin-left: 15px;
				}
				.cancel, .fa_huo,.look_log {
					background-color: transparent;
					border: 1px solid #CCCCCC;
					color: #999999;
				}
				.fa_huo {
					color: #31BFAD;
				}
				.sure {
					background-color: #31BFAD;
					color: #fff;

				}
			}
		}
	}
</style>