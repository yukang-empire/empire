<template>
  <div class="step">
	<img class="step_bg" src="../../../../static/imgs/step_bg.jpg" alt="">
	<div class="flex_center step_top">
		<img class="sync" src="../../../../static/imgs/sync.png" alt="" mode="widthFix">
		<p style='color: #FFFFFF;font-size: 16px;'>同步步数到轻酷</p>
		<p>同步成功后，步数更精准</p>
	</div>
	<div class="step_btn">
		<button class="flex_center back_app" open-type="launchApp" :app-parameter="step_data" binderror="launchAppError">返回APP</button>
		<div class="flex_center back_app" @click='empower' v-if='is_empower'>授权登录</div>
	</div>
	<div class="flex_center step_bottom" @click='asyn_way'>
		<img class="info_ico" src="../../../../static/imgs/info_ico.png" alt="">
		<span style="margin-left: 8px;">同步方法</span>
	</div>
	<!-- 弹窗 -->
	<div class="QR_code_dialog" v-if='is_dialog' @click.stop='is_dialog = false'>
		<div class="dialog_main" @click.stop='is_dialog = true' style="">
			<div class="flex_center overflow_div">
				<h3 class="title">同步微信运动方法</h3>
				<div class="step_item">
					<span class="num">1</span>
					<span class="content">请先在轻酷APP首页点击“同步步数”按钮，进入轻酷小程序。</span>
				</div>
				<div class="step_item">
					<span class="num">2</span>
					<span class="content">请确定已启用微信运动。</span>
				</div>
				<div class="step_item">
					<span class="num">3</span>
					<span class="content">获取微信步数后，点击“立即同步”，返回轻酷，即可成功同步。</span>
				</div>
			</div>
			<img class="circle_close" src="../../../../static/imgs/circle_close.png" alt="" @click='is_dialog = false'>
		</div>
	</div>
	<van-toast id="van-toast" />
	<div v-if='dialog_loading' class="flex_center QR_code_dialog" style="color: #999;flex-direction: column;">
		<van-loading type="spinner" color="#ccc" />
		<span style="margin-top: 5px;">同步中...</span>
	</div>
  </div>
</template>

<script>
import Toast from "../../../../static/vant/toast/toast";

export default {
  data () {
    return {
	  openid: '',
	  session_key: '',
	  step_data: '',
	  is_empower: true,
	  token: '',
	  tem_code: '',
	  is_dialog: false,
	  dialog_loading: false
    }
  },

  components: {
	
  },
  onLoad (options) {
	var that = this;
	this.token = options.token;
	if (this.token) {
		wx.setStorageSync('token', this.token);
	};
  },
  launchAppError (e) {
	Toast(e.detail.errMsg);
  },
  methods: {
	//同步方法
	asyn_way () {
		this.is_dialog = true;
	},
	//点击授权
	empower () {
		var that = this;
		wx.login({
			success: function(res){
				console.log("微信用户信息", res);
				var send_data = {
					code: res.code
				};
				that.dialog_loading = true;
				that.$store.dispatch("get_session_key", send_data).then( (res) => {
					console.log("获取session_key", res);
					if (res.data.status == 1) {
						that.openid = res.data.result.openid;
						that.session_key = res.data.result.session_key;
						wx.setStorageSync('openid', res.data.result.openid);
						wx.setStorageSync('session_key', res.data.result.session_key);
						that.getData(that.session_key);
					};
				});
			}
		});
	},
	//解密微信步数
    getData: function (session_key) {
		var that = this;
		wx.getSetting({
			success: function (res) {
				console.log('授权列表', res);
				if (!res.authSetting['scope.werun']) {
					wx.authorize({
						scope: 'scope.werun',
						success () {
							that.get_step(session_key);
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
					that.get_step(session_key);
				}
			}
		})
	},
	//获取步数
	get_step (session_key) {
		var that = this;
		wx.getWeRunData({
			success: function (res) {
				console.log('解密前', res);
				var encryptedData = res.encryptedData;
				var iv = res.iv;
				var send_data = {
					encryptedData: res.encryptedData,
					iv: res.iv,
					appid: 'wx1d82e53fb116dda1',
					sessionKey: session_key
				};
				that.$store.dispatch("get_step", send_data).then( (res) => {
					if (res.data.status == 1) {
						console.log("步数数据", res.data.result.stepInfoList);
						that.step_data = JSON.stringify(res.data.result.stepInfoList);
						that.upload_step(that.step_data);
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
		});
	},
	//上传步数
	upload_step (step_data) {
		var that = this;
		var openid = wx.getStorageSync('openid');
		var final_step_data = JSON.parse(step_data);
		var length = final_step_data.length - 1;
		var step_data_ = final_step_data[length].step;
		var time = that.$moment(final_step_data[length].timestamp * 1000).format('YYYY年MM月DD日');
		wx.getStorage({
			key: 'token',
			success (res) {
				var send_data = {
					up_date: time,
					steps: step_data_,
					token: res.data,
					openid: openid
				};
				that.$store.dispatch("upload_step", send_data).then( (res) => {
					console.log("上传步数", res);
					if (res.data.status == 1) {
						that.dialog_loading = false;
						Toast('同步步数成功！请点击按钮返回APP！');
						that.is_empower = false;
					}else {
						that.dialog_loading = false;
						Toast(res.data.msg);
					};
				});
			}, 
			fail () {
				Toast('请先登录');
				mpvue.navigateTo({ url: "../../my/login/main?src=" + 'step' });
			}
		});
	}
  },

  mounted () {
	// wx.setEnableDebug({
	// 	enableDebug: true
	// });
	var that = this;
	wx.getStorage({
		key: 'token',
		success (res) {
			wx.getStorage({
				key: 'session_key',
				success (res) {
					that.dialog_loading = true;
					that.getData(res.data);
				}
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
		width: 17px;
		height: 17px;
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
	
	.QR_code_dialog {
		position: fixed;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		background-color: rgba(0, 0, 0, 0.9);
		z-index: 99;
	}
	.dialog_main {
		background-color: #31BFAD;
		position: absolute;
		top: 250rpx;
		left: 10%;
		width: 80%;
		border-radius: 20rpx;
		color: #fff;
		font-size: 14px;
	}
	.circle_close {
		width: 45px;
		height: 45px;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		bottom: -80px;
	}
	.overflow_div {
		flex-direction: column;
		padding-bottom: 30px;
	}
	.title {
		margin: 25px auto;
		background-color: #fff;
		color: #31BFAD;
		height: 40px;
		line-height: 40px;
		border-radius: 20px;
		padding: 0 30px;
		font-weight: 900;
		font-size: 15px;
	}
	.num {
		min-width: 18px;
		height: 18px;
		border-radius: 50%;
		color: #31BFAD;
		background-color: #fff;
		margin-right: 5px;
		text-align: center;
		line-height: 18px;
		font-size: 12px;
		margin-top: 4px;
	}
	.step_item {
		width: 80%;
		display: flex;
		margin: 0 0 15px 0;
	}
</style>
