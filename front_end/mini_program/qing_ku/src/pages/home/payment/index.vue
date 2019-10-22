<template>
  <div class="payment">
	<div class="pay_main">
		<div class="flex_between title_line" style="padding-bottom: 0;">
			<div class="title">
				<div class="line"></div>
				<div style="display: flex;align-items: center;">
					<span>报名契约金（</span>
					<span>{{ query.phase ? query.phase : '0001' }}</span>
					<span>期）</span>
				</div>
			</div>
			<img style="width: 15px;height: 15px;" src="../../../../static/imgs/close.png" alt="">
		</div>
		<div class="price">
			<span style="font-size: 40px;margin-right: 5px;">{{ query.one_price ? query.one_price : '2.00' }}</span>元
		</div>
		<div class="title_line" style="border-bottom: 1px solid #CCCCCC;display: flex;align-items: center;">
			<div class="line"></div>
			<span style="white-space: nowrap;">选择支付方式</span>
		</div>
		<div class="flex_between pay_item">
			<div style="display: flex;align-items: center;">
				<img style="width: 25px;height: 25px;margin-right: 8px;" src="../../../../static/imgs/wx_pay.png" alt="">
				<span>微信支付</span>
			</div>
			<img style="width: 25px;height: 25px;" src="../../../../static/imgs/choose.png" alt="">
		</div>
		<div class="pay_btn" @click='pay_sign_up'>支付并报名</div>
	</div>
	<van-toast id="van-toast" />
  </div>
</template>

<script>
import Toast from "../../../../static/vant/toast/toast";

export default {
  data () {
    return {
		query: ''
    }
  },

  components: {
	
  },
  onLoad (options) {
	console.log('url参数', options);
	this.query = options;
  },
  methods: {
	//支付打卡契约金
	pay_sign_up () {
		var that = this;
		wx.getStorage({
			key: 'token',
			success (res) {
				var token = res.data;
				wx.login({
					success: function (res) {
						console.log("微信用户信息", res);
						if (res.code) {
							var sign_order = {
								code: res.code,
								order_sn: '',
								is_pay: 0,
								account: that.query.one_price,
								paypwd: '',
								token: token
							};
							//订单签名
							that.$store.dispatch("pay_sign_up", sign_order).then( (res) => {
								console.log("支付打卡契约金", res);
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
											setTimeout(() => {
												mpvue.navigateTo({ url: "../clock_in_com/main?phase=" + that.query.phase + "&one_price=" + that.query.one_price });
											}, 500);
										},
										fail (res) {
											console.log("支付失败", res);
											Toast('支付失败！');
											setTimeout(() => {
												mpvue.navigateTo({ url: "../clock_in/main" });
											}, 500);
										}
									});
								};
							});
						}
					}
				});
			},
			fail (res) {
				Toast('请先登录！');
				setTimeout(() => {
					mpvue.navigateTo({ url: "../../my/login/main" });
				}, 500);
			}
		});
	}
  },

  mounted () {
	  
  }
}
</script>

<style scoped>
	.payment {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.6);
	}
	.pay_main {
		background-color: #fff;
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		padding-bottom: 120px;
	}
	.title_line {
		color: #31BFAD;
		margin: 15px 20px;
		padding: 0 0 6px 0;
	}
	.title {
		display: flex;
		align-items: center;
	}
	.line {
		height: 15px;
		width: 5px;
		background-color: #31BFAD;
		margin-right: 5px;
	}
	.price {
		color: #333333;
		text-align: center;
	}
	.pay_item {
		margin: 15px 20px;
		color: #333333;
	}
	.pay_btn {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 55px;
		line-height: 55px;
		background-color: #31BFAD;
		color: #FFFFFF;
		font-size: 17px;
		letter-spacing: 1px;
		border-radius: 0;
		margin-top: 40px;
		text-align: center;
	}
</style>
