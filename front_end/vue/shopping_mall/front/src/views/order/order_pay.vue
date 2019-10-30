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
				<i>{{ order_info.num }}</i>
			</p>
			<p class="flex_between">
				<span>支付金额</span>
				<i class="order_price">￥{{ order_info.price }}</i>
			</p>
		</div>
		<div class="pay_way">
			<h3>
				<i></i>
				<span>选择支付方式</span>
			</h3>
			<ul>
				<li class="flex_between" @click='pay_type = 1'>
					<div class="wx">
						<img src="../../assets/imgs/pay_wx.png" alt="wechat">
						<span>微信支付</span>
					</div>
					<img src="../../assets/imgs/pay_yes_choose.png" alt="choose" v-if='pay_type == 1'>
					<img src="../../assets/imgs/pay_no_choose.png" alt="choose" v-if='pay_type != 1'>
				</li>
				<li class="flex_between" @click='pay_type = 2'>
					<div class="zfb">
						<img src="../../assets/imgs/pay_zfb.png" alt="zfb">
						<span>支付宝支付</span>
					</div>
					<img src="../../assets/imgs/pay_yes_choose.png" alt="choose" v-if='pay_type == 2'>
					<img src="../../assets/imgs/pay_no_choose.png" alt="choose"  v-if='pay_type != 2'>
				</li>
			</ul>
		</div>
		
		<div class="fixed_bottom flex_center footer_btn">
			<div class="final_price">
				<span>应付金额：</span>
				<i>￥{{ order_info.price }}</i>
			</div>
			<div class="pay_btn">
				<button @click='mall_pay'>确认支付</button>
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
	private order_info: any = {
		num: '',
		price: ''
	};
	private device: any = {
		is_android: null,
        is_ios: null
	};
	private pay_type: any = 1;
	
	created () {

	};
	mounted () {
		var that = this;
		//判断浏览器终端类型
		var agent: any = navigator.userAgent;
		//Android终端
		this.device.is_android = agent.indexOf('Android') != -1 || agent.indexOf('Adr') != -1 || agent.indexOf('Linux') != -1;
		//IOS终端
		this.device.is_ios = !!agent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
		console.log('device', this.device);
		if (sessionStorage.getItem('order_info')) {
			var order_info: any = sessionStorage.getItem('order_info');
			this.order_info = JSON.parse(order_info);
		};
	};

	back () {
		this.$router.back();
	};

	mall_pay () {
		var that = this;
		var pay_data: any = {
			order: this.order_info.num,
			price: this.order_info.price,
			type: this.pay_type
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