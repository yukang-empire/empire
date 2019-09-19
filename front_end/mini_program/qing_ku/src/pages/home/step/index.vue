<template>
  <div class="step">
	<img class="step_bg" src="../../../../static/imgs/step_bg.jpg" alt="">
	<div class="flex_center step_top">
		<img class="sync" src="../../../../static/imgs/sync.png" alt="" mode="widthFix">
		<p style='color: #FFFFFF;font-size: 16px;'>同步步数到轻酷</p>
		<p>同步成功后，步数更精准</p>
	</div>
	<div class="step_btn">
		<div class="flex_center back_app">返回APP</div>
		<div class="flex_center back_app">授权登录</div>
	</div>
	<div class="flex_center step_bottom">
		<img class="info_ico" src="../../../../static/imgs/info_ico.png" alt="">
		<span style="margin-left: 8px;">同步方法</span>
	</div>
  </div>
</template>

<script>
// import WXBizDataCrypt from "../../../utils/RdWXBizDataCrypt";

export default {
  data () {
    return {
	  openid: '',
	  session_key: ''
    }
  },

  components: {
	
  },

  methods: {
	//解密微信步数
    getData: function (appid, session_key) {
		var that = this;
		wx.getSetting({
			success: function (res) {
				console.log('授权列表', res);
				if (!res.authSetting['scope.werun']) {
					wx.authorize({
						scope: 'scope.werun',
						success () {
							wx.getWeRunData({
								success: function (res) {
									console.log('解密前', res);
									console.log("appid:" + appid + "session_key:" + session_key + "encryptedData:" + res.encryptedData + "iv:" + res.iv);
									var encryptedData = res.encryptedData;
									var iv = res.iv;
									//使用解密工具，链接地址：
									//https://codeload.github.com/gwjjeff/cryptojs/zip/master
									var pc = WXBizDataCrypt(appid, session_key);
									console.log('pc', pc);
									var data = pc.decryptData(encryptedData, iv);
									console.log('步数数据', data);
								},
								fail: function (res) {
									wx.showModal({
										title: '提示',
										content: '您未开通微信运动，请关注“微信运动”公众号后重试！',
										showCancel: false,
										confirmText: '好的'
									})
								}
							})
						},
						fail () {
							wx.showModal({
								title: '提示',
								content: '需要您授权开启获取微信运动步数权限哦！',
								success: function (res) {
									if (res.confirm) {
										//跳转去设置
										wx.openSetting({
											success: function (res) {

											}
										})
									} else {
										
									}
								}
							})
						}
					});
				} else {
					wx.getWeRunData({
						success: function (res) {
							console.log('解密前', res);
							var encryptedData = res.encryptedData;
							var iv = res.iv;

							// console.log('appid1', appid);
							// console.log('session_key2', session_key);
							// //使用解密工具，链接地址：
							// //https://codeload.github.com/gwjjeff/cryptojs/zip/master
							// var pc = WXBizDataCrypt(appid, session_key);
							// console.log('pc', pc);
							// var data = pc.decryptData(encryptedData, iv);
							// console.log('步数数据', data);

							var send_data = {
								encryptedData: res.encryptedData,
								iv: res.iv,
								appid: 'wx1d82e53fb116dda1',
								sessionKey: session_key

							};
							that.$store.dispatch("get_step", send_data).then( (res) => {
								console.log("get_step", res);
								if (res.data.status == 1) {
									
								};
							});
						},
						fail: function (res) {
							wx.showModal({
								title: '提示',
								content: '您未开通微信运动，请关注“微信运动”公众号后重试！',
								showCancel: false,
								confirmText: '好的'
							})
						}
					})
				}
			}
		})
	},
  },

  mounted () {
	//获取微信步数
	var that = this;
	wx.login({
		success: function(res){
			console.log("微信用户信息", res);
			var send_data = {
				code: res.code
			};
			that.$store.dispatch("get_session_key", send_data).then( (res) => {
				console.log("获取session_key", res);
				if (res.data.status == 1) {
					that.openid = res.data.result.openid;
					that.session_key = res.data.result.session_key;
					wx.setStorageSync('openid', res.data.result.openid);
					wx.setStorageSync('session_key', res.data.result.session_key);
					that.getData(that.openid, that.session_key);
				};
			});
		}
	});
  }
}
</script>

<style scoped>
	.step_top {
		flex-direction: column;
		color: #8A869F;
		font-size: 13px;
		margin-top: 30px;
	}
	.step_bg {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -9;
	}
	.step_btn {
		width: 90%;
		margin-left: 5%;
		margin-top: 35px;
	}
	.sync {
		width: 80%;
	}
	.info_ico {
		width: 20px;
		height: 20px;
	}
	.back_app {
		background-color: #31BFAD;
		color: #fff;
		height: 45px;
		font-size: 16px;
		border-radius: 5px;
		margin: 20px 0;
	}
	.step_bottom {
		font-size: 13px;
		color: #8A869F;
		margin-top: 10px;
	}
</style>
