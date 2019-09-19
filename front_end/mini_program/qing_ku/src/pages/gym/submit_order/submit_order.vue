<template>
	<div class="submit_order">
		<div class="flex_between card">
			<div>
				<p class="name">{{ order_data.goods_name }}健身</p>
				<p style="font-size: 14px;">有效期：{{ order_data.use_end_time }}</p>
			</div>
			<div class="price">{{ order_data.shop_price }}元</div>
		</div>
		<div class="address">
			<div class="title">
				<i class="iconfont">&#xe645;</i>
				<span class="club_name">{{ order_data.club_name }}</span>
			</div>
			<div class="address_detail_div">
				<i class="iconfont">&#xe78e;</i>
				<span>{{ order_data.address }}</span>
			</div>
		</div>
		<!-- <div class="flex_between coupon">
			<div class="flex_center left">
				<span class="border"></span>
				<span>优惠券</span>
			</div>
			<div class="flex_center right">
				<span>{{ order_data.coupon_num }} 张可用劵</span>
				<i class="iconfont">&#xe600;</i>
			</div>
		</div>
		<div class="flex_between coupon">
			<div class="flex_center left">
				<span class="border"></span>
				<span>健身卡</span>
			</div>
			<div class="flex_center right">
				<span>{{ order_data.gym_num }} 张可用劵</span>
				<i class="iconfont">&#xe600;</i>
			</div>
		</div> -->
		<div class="coupon notice">
			<div class="left">
				<span class="border"></span>
				<span>购买须知</span>
			</div>
			<div class="content">{{ order_data.goods_remark }}</div>
		</div>
		<div class="coupon notice pay">
			<div class="left">
				<span class="border"></span>
				<span>选择支付方式</span>
			</div>
			<ul>
				<!-- <li class="flex_between pay_li" @click='pay_li_index = 0'>
					<div class="flex_center li_left">
						<img class="li_img" style="width: 30px;height: 30px;" src="../../../../static/imgs/coin_pay.png" alt="">
						<span>酷卡</span>
					</div>
					<div class="flex_center li_right">
						<span>15.00</span>
						<img v-if='pay_li_index == 0' class="li_img" src="../../../../static/imgs/choose.png" alt="">
						<img v-if='pay_li_index != 0' class="li_img" src="../../../../static/imgs/no_choose.png" alt="">
					</div>
				</li> -->
				<li class="flex_between pay_li" @click='pay_li_index = 1'>
					<div class="flex_center li_left">
						<img class="li_img" src="../../../../static/imgs/wx_pay.png" alt="">
						<span>微信支付</span>
					</div>
					<div class="flex_center li_right">
						<img v-if='pay_li_index == 1' class="li_img" src="../../../../static/imgs/choose.png" alt="">
						<img v-if='pay_li_index != 1' class="li_img" src="../../../../static/imgs/no_choose.png" alt="">
					</div>
				</li>
			</ul>
		</div>
		<div class="flex_between sure_pay">
			<div class="final_price">
				<span>实付款：</span>
				<span class="price_span">¥{{ order_data.total_amount }}</span>
			</div>
			<div class="pay_btn">
				<button class="btn" @click='add_order'>确认支付</button>
			</div>
		</div>
		<!-- 支付提示 -->
		<van-toast id="van-toast" />
		<!-- <div class="mask">
			<van-notify id="van-notify" />
		</div> -->
	</div>
</template>

<script>
import Toast from "../../../../static/vant/toast/toast";
// import Notify from "../../../static/vant/notify/notify";

export default {
	data () {
		return {
			pay_li_index: 1,
			order_data: {},
			query: {}
		}
	},
	components: {

	},
	onLoad (options) {
		console.log('url参数', options);
		this.query = options;
	},
	methods: {
		//下单
		add_order () {
			var that = this;
			wx.getStorage({
				key: 'token',
				success (res) {
					var send_data = {
						goods_id: that.query.goods_id,
						coupon_id: '',
						gym_id: '',
						id_user_money: 0,
						token: res.data
					};
					that.$store.dispatch("add_order", send_data).then( (res) => {
						if (res.data.status == 1) {
							console.log("下单", res);
							var order_sn = res.data.result;
							//获取到订单号 发起支付
							wx.login({
								success: function (res) {
									console.log("微信用户信息", res);
									if (res.code) {
										var sign_order = {
											code: res.code,
											order_sn: order_sn
										};
										//订单签名
										that.$store.dispatch("order_sign", sign_order).then( (res) => {
											console.log("订单签名", res);
											if (res.data.status == 1) {
												wx.requestPayment({
													'timeStamp': res.data.data.timeStamp,
													'nonceStr': res.data.data.nonceStr,
													'package': res.data.data.package,
													'signType': 'MD5',
													'paySign': res.data.data.paySign,
													success (res) {
														console.log("支付成功", res);
														Toast('支付成功！');
													},
													fail (res) {
														console.log("支付失败", res);
														Toast('支付失败！');
													}
												});
											};
										});
									}
								}
							});
						};
					});
				},
				fail (res) {
					Toast('请先登录！');
					setTimeout(() => {
						mpvue.navigateTo({ url: "../../my/login/main?src=" + 'order' + "&goods_id=" + that.query.goods_id });
					}, 500);
				}
			});
		}
	},
	mounted () {
		var that = this;
		var pages = getCurrentPages();
		const send_data = pages[pages.length - 1].options;
		// const send_data = {goods_id: 125};
		//获取订单信息
		that.$store.dispatch("submit_order", send_data).then( (res) => {
			if (res.data.status == 1) {
				console.log("订单信息", res.data.result);
				that.order_data = res.data.result;
				that.order_data.use_end_time = that.order_data.use_end_time ? that.$moment(that.order_data.use_end_time * 1000).format('YYYY-MM-DD HH:mm:ss') : '';
			};
		});
	}
}
</script>

<style scoped>
	@import url("../../../styles/submit_order.css");
	
</style>