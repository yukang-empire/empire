<template>
  <div class="home">
	<div class="header" :style="{paddingTop: nav_height02 + 'px'}">
		<img class="home_bg" src="../../../../static/imgs/home_bg.jpg" alt="" mode="widthFix">
		<div class="flex_center home_kd">
			<img class="home_kd_img" src="../../../../static/imgs/home_kd.png" alt="" mode="widthFix">
			<span class="flex_center" style='height: 30px;'>酷点：<i>100.00</i></span>
		</div>
		<div class="flex_center rule" :style="{top: nav_height02 + 'px'}">
			<span>步数兑换规则</span>
		</div>
		<div class="home_notice">
			<img src="../../../../static/imgs/home_voice_icon.png" alt="" mode="widthFix" style="width: 13px;margin-right: 10px;">
			<span>24小时未领取会消失</span>
		</div>
		<div class="header_middle">
			<div class="flex_center ball">
				<p class="ball_time"><span>20:22</span> 消失</p>
				<img src="../../../../static/imgs/home_circle.png" alt="" style="width: 55px;height: 55px;position: absolute;top: 0;left: 0;z-index: -98;">
				<p>500.5</p>
			</div>
			<!-- <div class="flex_center ball">
				<p class="ball_time"><span>20:22</span> 消失</p>
				<img src="../../../../static/imgs/home_circle.png" alt="" mode="widthFix" style="width: 55px;">
			</div> -->
		</div>
	</div>
  </div>
</template>

<script>
	

export default {
  data () {
    return {
		nav_height: '',
		nav_height02: ''
    }
  },

  components: {
	
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
    
  },

  created () {
    //检测系统
	wx.getSystemInfo({
		success: (res) => {
			this.nav_height = res.statusBarHeight + 6.5;
			this.nav_height02 = res.statusBarHeight + 45;
		}
	});
  }
}
</script>

<style scoped>
	@import url("../../../styles/home.css");
</style>
