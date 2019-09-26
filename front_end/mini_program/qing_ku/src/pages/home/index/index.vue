<template>
  <div class="home">
	<div class="header" :style="{paddingTop: nav_height02 + 'px', height: nav_height03 + 'px'}">
		<img class="home_bg" src="../../../../static/imgs/home_bg.jpg" alt="" mode="widthFix">
		<div class="flex_center home_kd">
			<img class="home_kd_img" src="../../../../static/imgs/home_kd.png" alt="" mode="widthFix">
			<span class="flex_center" style='height: 30px;'>酷点：<i>{{ home_data.user_points }}</i></span>
		</div>
		<div class="flex_center rule" :style="{top: nav_height02 + 'px'}" @click='jump_rule'>
			<span>步数兑换规则</span>
		</div>
		<div class="home_notice">
			<img @click='animate01 = true' src="../../../../static/imgs/home_voice_icon.png" alt="" mode="widthFix" style="width: 13px;margin-right: 10px;">
			<div class="animate_text">
				<van-transition :show="animate_text01" name="fade-up" custom-class="block" duration='1000'>
					<p>{{ home_data.notices[0] }}</p>
				</van-transition>
				<van-transition :show="animate_text02" name="fade-up" custom-class="block" duration='1000'>
					<p>{{ home_data.notices[1] }}</p>
				</van-transition>
			</div>
		</div>
		<div class="header_middle">
			<div class="flex_center ball" v-if='(home_data.list.length > 0) && (home_data.list[0].id != fade_id)' @click='collect(home_data.list[0].id, home_data.list[0].steps, home_data.list[0].give_points)'>
				<p class="ball_time"><span>{{ deadline01 }}</span> 消失</p>
				<img src="../../../../static/imgs/home_circle.png" alt="" style="width: 55px;height: 55px;position: absolute;top: 0;left: 0;z-index: -98;" >
				<p>{{ home_data.list[0].give_points }}</p>
			</div>
			<div class="flex_center ball ball02" v-if='(home_data.list.length > 1) && (home_data.list[1].id != fade_id)' @click='collect(home_data.list[1].id, home_data.list[1].steps, home_data.list[1].give_points)'>
				<p class="ball_time"><span>{{ deadline02 }}</span> 消失</p>
				<img src="../../../../static/imgs/home_circle.png" alt="" style="width: 55px;height: 55px;position: absolute;top: 0;left: 0;z-index: -98;">
				<p>{{ home_data.list[1].give_points }}</p>
			</div>
			
			<div class="home_wx_sign">
				<img src="../../../../static/imgs/home_wx.png" @click='sync_steps' alt="" class="home_wx" mode='widthFix'>
				<img src="../../../../static/imgs/home_sign.png" @click='sign_in' alt="" class="home_sign" mode='widthFix'>
			</div>
		</div>
		
		<div class="flex_center home_steps">
			<div class="flex_center home_step_person" style="margin-right: 15px;">
				<img class="home_step_icon" style="width: 17px;height: 17px;" src="../../../../static/imgs/home_step_icon.png" alt="">
				<div class="border_right"></div>
				<span class="steps_num">{{ home_data.steps }}</span>
				<span>步</span>
			</div> 
			<div class="flex_center home_step_person">
				<img class="home_step_icon" mode='widthFix' src="../../../../static/imgs/home_team_icon.png" alt="">
				<div class="border_right"></div>
				<span class="steps_num">{{ home_data.prom_steps }}</span>
				<span>步</span>  
			</div>
		</div>
	</div>
	<div style="margin-top: 10px;" @click='jump_walk'>
		<img src="../../../../static/imgs/home_zlzq.jpg" alt="" mode='widthFix' style="width: 100%;">
	</div>
	<div class="flex_center" style='margin: 5px 15px;'>
		<div class="flex_center game" style="margin-right: 10px;">
			<img style="width: 60px;" mode='widthFix' src="../../../../static/imgs/home_get_up.png" alt="">
			<div class="game01">
				<h3 style="font-weight: 900;">早起打卡</h3>
				<p style="color: #999;font-size: 13px;">早起瓜分奖励	</p>
			</div>
		</div>
		<div class="flex_center game">
			<img style="width: 75px;" mode='widthFix' src="../../../../static/imgs/home_box.png" alt="">
			<div class="game01">
				<h3 style="font-weight: 900;">酷点夺宝</h3>
				<p style="color: #999;font-size: 13px;">酷点赢大奖</p>
			</div>
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

import Toast from '../../../../static/vant/toast/toast';

export default {
  data () {
    return {
		nav_height: '',
		nav_height02: '',
		nav_height03: '',
		animate_text01: true,
		animate_text02: false,
		home_data: {
			user_points: '0.00',
			steps: 0,
			prom_steps: 0,
			list: [],
			notices: [],
			ad: []
		},
		deadline01: '00:00',
		deadline02: '00:00',
		fade_id: 0,
		dialog_loading: false
    }
  },

  components: {
	
  },
  onReady: function (e) {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio')
  },
  //下拉刷新
  onPullDownRefresh () {
	wx.showToast({
      title: '正在刷新...',
      icon: 'loading',
      duration: 1500
	});
	
	wx.stopPullDownRefresh();
  },
  methods: {
	sign_in () {
		mpvue.navigateTo({ url: "../index//main" });
	},
	//同步步数
	sync_steps () {
		var that = this;
		wx.getStorage({
			key: 'token',
			success (res) {
				wx.getStorage({
					key: 'session_key',
					success (res) {
						that.dialog_loading = true;
						that.getData(res.data);
					},
					fail () {
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
					}
				});
			},
			fail () {
				Toast('请先登录');
				mpvue.navigateTo({ url: "../../my/login/main?src=" + 'home' });
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
												console.log('success', res)
											},
											fail (res) {
												console.log('fail', res)
												that.dialog_loading = false;
												Toast("同步失败！需要您同意授权！");
											},
											complete (res) {
												console.log('complete', res)
												if (!res.authSetting['scope.werun']) {
													that.dialog_loading = false;
													Toast("同步失败！需要您同意授权！");
												}else {
													that.get_step(session_key);
												};
											}
										})
									} else {
										that.dialog_loading = false;
										Toast("同步失败！需要您同意授权！");
									}
								},
								cancel () {
									that.dialog_loading = false;
									Toast("同步失败！需要您同意授权！");
								}
							})
						}
					});
				} else {
					that.get_step(session_key);
				}
			},
			fail () {
				that.dialog_loading = false;
				Toast("同步失败！需要您同意授权！");
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
						Toast('同步步数成功！');
						that.get_home_data();
					}else {
						that.dialog_loading = false;
						Toast(res.data.msg);
					};
				});
			}, 
			fail () {
				Toast('请先登录');
				mpvue.navigateTo({ url: "../../my/login/main?src=" + 'home' });
			}
		});
	},
    jump_rule () {
		mpvue.navigateTo({ url: "../rule/main" });
	},
	jump_walk () {
		mpvue.navigateTo({ url: "../walk_money/main" });
	},
	// 文字轮播
	animate_text () {
		var that = this;
		var timer = setInterval(() => {
			if (that.animate_text01) {
				that.animate_text01 = false;
				that.animate_text02 = true;
			}else {
				that.animate_text01 = true;
				that.animate_text02 = false;
			}
		}, 5000);
	},
	//收取泡泡
	collect (id, steps, give_points) {
		var that = this;

		wx.getStorage({
			key: 'token',
			success (res) {
				that.$store.dispatch("collect_kd", {id: id, steps: steps, token: res.data}).then( (res) => {
					console.log('collect_kd', res);
					if (res.data.status == 1) {
						// 播放音效
						const innerAudioContext = wx.createInnerAudioContext();
						innerAudioContext.autoplay = true;
						innerAudioContext.src = 'https://shop.technologyle.com/userReg/imgs/click_voice.mp3';
						innerAudioContext.onPlay(() => {
							console.log('开始播放')
						});
						innerAudioContext.onError((res) => {
							// Toast(res.errMsg);
						}); 
						Toast('收取成功！');
						that.home_data.user_points = parseInt(that.home_data.user_points) + parseInt(give_points);
						that.fade_id = id;
					}else {
						Toast(res.data.msg);
					}
				});
			},
			fail (res) {
				mpvue.navigateTo({ url: "../../my/login/main?src=" + 'home' });
				setTimeout(() => {
					Toast('请先登录！');
				}, 300);
			}
		});
	},
	// 获取首页数据
	get_home_data () {
		var that = this;
		wx.getStorage({
			key: 'token',
			success (res) {
				that.$store.dispatch("get_home_data", { token: res.data }).then( (res) => {
					console.log("首页数据", res);
					if (res.data.status == 1) {
						that.home_data = res.data.result;
						var timer01 = null;
						var timer02 = null;
						if (that.home_data.list && that.home_data.list.length > 0) {
							
							if (that.home_data.list.length == 1 && that.home_data.list[0].end_time > 86400) {
								that.deadline01 = '大于24小时';
							}else {
								var num01 = parseInt(that.home_data.list[0].end_time);
								timer01 = setInterval(() => {
									num01 --;
									that.deadline01 = that.$moment(num01 * 1000).format('HH:mm');
									if (num01 <= 0) {
										timer01 = null;
										clearInterval(timer01);
										that.fade_id = that.home_data.list[0].id;
									};
								}, 1000);
							};

							if (that.home_data.list.length == 2 && that.home_data.list[1].end_time > 86400) {
								that.deadline02 = '大于24小时';
							}else {
								var num02 = parseInt(that.home_data.list[1].end_time);
								timer02 = setInterval(() => {
									num02 --;
									that.deadline02 = that.$moment(num02 * 1000).format('HH:mm');
									if (num02 <= 0) {
										timer02 = null;
										clearInterval(timer02);
										that.fade_id = that.home_data.list[1].id;
									};
								}, 1000);
							};
						};
						wx.setStorageSync('ad_link', res.data.result.ad[0].ad_link)
					};
				});
			},
			fail (res) {
				
			}
		});
	}
  },
  onShow () {
	this.get_home_data();
  },
  created () {
	var that = this;
    //检测系统
	wx.getSystemInfo({
		success: (res) => {
			this.nav_height = res.statusBarHeight + 6.5;
			this.nav_height02 = res.statusBarHeight + 45;
			this.nav_height03 = res.screenWidth * 390 / 375 - this.nav_height02;
			console.log('nav_height03', this.nav_height03);
		}
	});
	this.animate_text();
  }
}
</script>

<style scoped>
	@import url("../../../styles/home.css");
</style>
