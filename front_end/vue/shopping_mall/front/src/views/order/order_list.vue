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
			<ul v-if='order_list.all.length && order_list.all.length > 0'>
				<li v-for='(item, index) in order_list.all' :key='item.order_id' @click='jump_details(item)'>
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
								<img v-if='item.order_goods[0].img' :src="item.order_goods[0].img" alt="">
								<img v-if='!item.order_goods[0].img' src="../../assets/imgs/default_goods_img.png" alt="">
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
						<span>合计¥<i>{{ item.order_goods[0].final_price * item.order_goods[0].goods_num }}</i></span>
					</p>
					<div class="btn" v-if="item.order_status_detail == '待支付'">
						<button class="cancel" @click.stop='click_btn(0, "是否取消该订单？", item.order_goods[0].order_id, "取消")'>取消订单</button>
						<button class="pay" @click.stop='click_to_pay(item.order_sn, item.order_goods[0].final_price * item.order_goods[0].goods_num)'>去支付</button>
					</div>
					<div class="btn" v-if="item.order_status_detail == '待发货'">
						<button class="fa_huo" @click.stop='click_btn(2)'>联系客服</button>
					</div>
					<div class="btn" v-if="item.order_status_detail == '待收货'">
						<button class="look_log" @click.stop='click_btn(1, item.order_goods[0].shipping_name, item.order_goods[0].delivery_code)'>查看物流</button>
						<button class="sure" @click.stop='click_btn(0, "是否确认收货？", item.order_goods[0].order_id, "确认")'>确认收货</button>
					</div>
					<div class="btn" v-if="item.order_status_detail == '交易关闭' || item.order_status_detail == '交易成功'">
						<button class="cancel" @click.stop='click_btn(0, "是否删除该订单？")'>删除订单</button>
					</div>
				</li>
			</ul>
			<div class="flex_center no_order" v-else>
				<img src="../../assets/imgs/search_no_result.png" alt="">
				<p>暂无购物订单~快去买买买~</p>
				<div @click='to_index'>前往商城</div>
			</div>
		</div>
		<div class="list_li" v-if='nav_index == 1'>
			<ul v-if='order_list.no_pay.length > 0'>
				<li v-for='(item, index) in order_list.no_pay' :key='item.order_id' @click='jump_details(item)'>
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
								<img v-if='item.order_goods[0].img' :src="item.order_goods[0].img" alt="">
								<img v-if='!item.order_goods[0].img' src="../../assets/imgs/default_goods_img.png" alt="">
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
						<span>合计¥<i>{{ item.order_goods[0].final_price * item.order_goods[0].goods_num }}</i></span>
					</p>
					<div class="btn" v-if="item.order_status_detail == '待支付'">
						<button class="cancel" @click.stop='click_btn(0, "是否取消该订单？", item.order_goods[0].order_id, "取消")'>取消订单</button>
						<button class="pay" @click.stop='click_to_pay(item.order_sn, item.order_goods[0].final_price * item.order_goods[0].goods_num)'>去支付</button>
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
				<li v-for='(item, index) in order_list.no_send' :key='item.order_id' @click='jump_details(item)'>
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
								<img v-if='item.order_goods[0].img' :src="item.order_goods[0].img" alt="">
								<img v-if='!item.order_goods[0].img' src="../../assets/imgs/default_goods_img.png" alt="">
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
						<span>合计¥<i>{{ item.order_goods[0].final_price * item.order_goods[0].goods_num }}</i></span>
					</p>
					<div class="btn" v-if="item.order_status_detail == '待发货'">
						<button class="fa_huo" @click.stop='click_btn(2)'>联系客服</button>
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
			<ul v-if='order_list.no_sign.length && order_list.no_sign.length > 0'>
				<li v-for='(item, index) in order_list.no_sign' :key='item.order_id' @click='jump_details(item)'>
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
								<img v-if='item.order_goods[0].img' :src="item.order_goods[0].img" alt="">
								<img v-if='!item.order_goods[0].img' src="../../assets/imgs/default_goods_img.png" alt="">
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
						<span>合计¥<i>{{ item.order_goods[0].final_price * item.order_goods[0].goods_num }}</i></span>
					</p>
					<div class="btn" v-if="item.order_status_detail == '待收货'">
						<button class="look_log" @click.stop='click_btn(1, item.order_goods[0].shipping_name, item.order_goods[0].delivery_code)'>查看物流</button>
						<button class="sure" @click.stop='click_btn(0, "是否确认收货？", item.order_goods[0].order_id, "确认")'>确认收货</button>
					</div>
				</li>
			</ul>
			<div class="flex_center no_order" v-if='order_list.no_sign && order_list.no_sign.length <= 0'>
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
							<span>{{ shipping_name }}</span>
							<i>{{ delivery_code }}</i>
						</p>
					</div>
					<div class="flex_center logistics customer" v-if='dialog_type == 2'>
						<h3>联系客服</h3>
						<p>
							<span>拨打：</span>
							<a href="tel:18123861962" style="color: #666">18123861962</a>
						</p>
					</div>
					<div class="flex_center btn">
						<button class="left" @click='is_dialog=false'>取消</button>
						<div class="line"></div>
						<button class="right" v-if='dialog_type == 1' @click='copy' :data-clipboard-text="delivery_code">复制</button>
						<button class="right" v-else @click='dialog_sure'>确定</button>
					</div>
				</div>
			</div>
		</transition>

		
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
	private text_tip: any = {
		is_open: false,
		msg: '',
		can_click: true
	};
	private shipping_name: any = '';
	private delivery_code: any = '';
	
	private device: any = {
		is_android: null,
        is_ios: null
	};

	jump_details (item) {
		sessionStorage.setItem('order_details_data', JSON.stringify(item));
		this.$router.push({ path: '/order_details' });
	}

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

	click_btn (index, msg, order_id, text) {
		this.is_dialog = true;
		this.dialog_type = index;
		if (index == 1) {
			this.shipping_name = msg;
			this.delivery_code = order_id;
		}else {
			this.dialog_msg = msg;
			sessionStorage.setItem('order_id', order_id);
			sessionStorage.setItem('text', text);
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

	dialog_sure() {
		var that = this;
		var http_data = {
			order_id: sessionStorage.getItem('order_id') || ''
		};
		console.log(http_data);
		var text = sessionStorage.getItem('text');
		if (text == '确认') {
			this.$store.dispatch('sure_receive', http_data).then((res) => {
				console.log('确认收货', res);
				if (res.status == 1) {
					that.open_text_tip('操作成功！');
					that.switch_nav(3);
				}
			})
		}else if (text == '取消') {
			this.$store.dispatch('cancel_order', http_data).then((res) => {
				console.log('取消', res);
				if (res.status == 1) {
					that.open_text_tip('操作成功！');
					that.switch_nav(1);
				}
			})
		};
		that.is_dialog = false;
	}

	click_to_pay (order_sn, price) {
		console.log(order_sn, price)
		var that = this;
		var pay_data: any = {
			order: order_sn,
			price: price,
			type: 1
		};
		console.log('pay_data', pay_data);
		//ios终端
		if (this.device.is_ios) {
			this.setupWebViewJavascriptBridge( function(bridge: any) {
				//mall_pay为事先与ios开发人员约好的函数名 pay_data为发送过去的数据 response为ios那边返回的数据
				bridge.callHandler('mall_pay', pay_data, function(response: any) {
					
				});
			});
		}
		//android终端
		else if (this.device.is_android) {
			var pay_data_json = JSON.stringify(pay_data);
			//mall_pay为事先与android终端开发人员约好的函数名 pay_data_json为发送过去的数据(一般建议转成JSON.stringify字符串)
			//把安卓返回的数据装起来
			window.jsInterface.mall_pay(pay_data_json);
		};
	};

	// 与IOS原生APP交互相关 必须要有
    setupWebViewJavascriptBridge (callback: any) {
		console.log(window);
        if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); };
        if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); };
        window.WVJBCallbacks = [callback];
        var WVJBIframe = document.createElement('iframe');
        WVJBIframe.style.display = 'none';
        WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
        document.documentElement.appendChild(WVJBIframe);
        setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0);
    };

	to_index () {
		if (sessionStorage.getItem('token')) {
			var token = sessionStorage.getItem('token');
			// window.location.href = 'https://shop.technologyle.com/shoppingMall/index.html#/index?token=' + token;
			this.$router.push({ path: '/index', query: { token: token } });
		};
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
				this.order_list.all = res.result || [];
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
				this.order_list.no_pay = res.result || [];
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
				this.order_list.no_send = res.result || [];
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
				this.order_list.no_sign = res.result || [];
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
		var that = this;
		//判断浏览器终端类型
		var agent: any = navigator.userAgent;
		//Android终端
		this.device.is_android = agent.indexOf('Android') != -1 || agent.indexOf('Adr') != -1 || agent.indexOf('Linux') != -1;
		//IOS终端
		this.device.is_ios = !!agent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
		this.all_order();
		var index = this.$route.query.index;
		console.log(index);
		if (!index) {
			this.nav_index = 0;
		}else {
			this.nav_index = index;
			this.switch_nav(this.nav_index);
		}
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
				padding-bottom: 8px;

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