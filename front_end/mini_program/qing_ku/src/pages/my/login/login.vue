<template>
	<div class="login">
		<img class="login_bg" src="../../../../static/imgs/login_bg.jpg" alt="login_bg">
		<div class="flex_center login_header">
			<img class="logo" src="../../../../static/imgs/logo.png" alt="logo">
			<p class="qing_ku">轻酷</p>
		</div>
		<div class="input">
			<div class="flex_center input_item">
				<img class="img_account" src="../../../../static/imgs/account.png" alt="account">
				<div class="border_right"></div>
				<input class="input_account" type="text" placeholder="请输入账户/手机号" v-model='input_data.account'>
			</div>
			<div class="flex_center input_item">
				<img class="img_password" src="../../../../static/imgs/password.png" alt="password">
				<div class="border_right"></div>
				<input class="input_password" type="text" placeholder="请输入密码" password v-model='input_data.password'>
			</div>
		</div>
		<div class="btn">
			<button class="flex_center login_btn" @click='login'>立即登录</button>
			<button class="flex_center register_btn" @click='register'>注册账户</button>
		</div>
		<van-notify id="van-notify" />
		<van-toast id="van-toast" />
	</div>
</template>

<script>

import $md5 from 'js-md5';
import Notify from "../../../../static/vant/notify/notify";
import Toast from "../../../../static/vant/toast/toast";

export default {
	data () {
		return {
			input_data: {
				account: '',
				password: ''
			},
			query: {}
		}
	},
	components: {

	},
	onLoad (options) {
		console.log(options);
		this.query = options;
	},
	methods: {
		//注册
		register () {
			mpvue.navigateTo({ url: "../register/main" });
		},
		//登录
		login () {
			var that = this;
			if (!this.input_data.account) {
				Notify('请输入账户！');
			}else if (!this.input_data.password) {
				Notify('请输入密码！');
			}else {
				var userid = null;
				var get_userid_time = Math.round(new Date() / 1000);
				var get_userid_sign_before = 'phoneSign201903' + this.input_data.account + 'APPUSER' + get_userid_time + 'phoneSign201903';
				var get_userid_sign = $md5(get_userid_sign_before);
				var get_userid_data = {
					mobile: this.input_data.account,
					type: 'APPUSER',
					time: get_userid_time,
					sign: get_userid_sign
				};
				// 获取用户id(登陆必备参数之一)
				this.$store.dispatch("login", get_userid_data).then( (res) => {
					console.log("获取用户id", res);
					if (res.data.data) {
						userid = res.data.data.userid;
						//登录
						var now_time = Math.round(new Date() / 1000);
						var password_md5 = $md5(that.input_data.password);
						var sign_before = 'phoneSign201903' + that.input_data.account + 'APPLOG' + now_time + 'phoneSign201903';
						var sign = $md5(sign_before);
						var send_data = {
							mobile: that.input_data.account,
							type: 'APPLOG',
							time: now_time,
							sign: sign,
							userid: userid,
							password: password_md5,
						};
						that.$store.dispatch("login", send_data).then( (res) => {
							console.log("登录", res);
							if (res.data.data) {
								wx.setStorageSync('token', res.data.data.userid);
								Toast('登陆成功！');
								setTimeout(() => {
									if (that.query.src == "order") {
										mpvue.navigateTo({ url: "../../gym/submit_order/main?goods_id=" + that.query.goods_id });
									}else if (that.query.src == "my") {
										mpvue.switchTab({ url: "../index/main" });
									}else if (that.query.src == "step") {
										mpvue.navigateTo({ url: "../../home/step/main" });
									}else if (that.query.src == "home") {
										mpvue.switchTab({ url: "../../home/index/main" });
									};
								}, 500);
							}else {
								Notify(res.data.start);
								// wx.setEnableDebug({
								// 	enableDebug: true
								// });
							};
						});
					};
				});
			};
		}
	},
	mounted () {

	}
}
</script>

<style scoped>
	@import url("../../../styles/login.css");
	
</style>