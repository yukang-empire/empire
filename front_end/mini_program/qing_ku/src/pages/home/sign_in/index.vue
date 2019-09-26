<template>
  <div class="sign_in">
	<div class="flex_center header">
		<img class="sign_in_bg" src="../../../../static/imgs/sign_in_bg.png" alt="" mode="widthFix">
		<p class='sign_title'>已连续签到(天)</p>
		<div class="flex_center num_div">
			<div class="num hundred">0</div>
			<div class="num ten">0</div>
			<div class="num bit">2</div>
		</div>
		<div class="header_bottom">
			<div class="flex_center sign_in_date">
				<img class="line" src="../../../../static/imgs/sign_line.png" alt="" mode="widthFix">
				<div class="common_class before_no">
					<span class="time">09-07</span>
					<img class="before_no_circle" src="../../../../static/imgs/before_no_circle.png" alt="">
					<img class="hook" src="../../../../static/imgs/hook.png" alt="" mode="widthFix">
				</div>
				<div class="common_class before_yes">
					<span class="time">09-08</span>
					<img class="before_yes_circle" src="../../../../static/imgs/before_yes_circle.png" alt="">
					<img class="hook" src="../../../../static/imgs/hook.png" alt="" mode="widthFix">
				</div>
				<div class="common_class today_no">
					<span class="time">今日</span>
					<img class="today_circle" src="../../../../static/imgs/today_circle.png" alt="">
					<img class="hook" src="../../../../static/imgs/hook.png" alt="" mode="widthFix">
				</div>
				<div class="common_class flex_center today_yes">
					<span class="time">今日</span>
					<img class="today_circle" src="../../../../static/imgs/today_circle.png" alt="">
					<span class="today_text">+1</span>
				</div>
				<div class="common_class flex_center future">
					<span class="time">09-10</span>
					<img class="future_circle" src="../../../../static/imgs/future_circle.png" alt="">
					<span class="future_text">+2</span>
				</div>
			</div>
			<div class="sign_in_btn">已签到</div> 
		</div>
	</div>
  </div>
</template>

<script>
import Toast from "../../../../static/vant/toast/toast";

export default {
  data () {
    return {
	  
    }
  },

  components: {
	
  },
  onLoad (options) {
	
  },
  launchAppError (e) {
	
  },
  methods: {
	
  },

  mounted () {
	var that = this;
	wx.getStorage({
		key: 'token',
		success (res) {
			//获取签到数据
			// this.$store.dispatch('sign_data', {})
		},
		fail (res) {
			mpvue.navigateTo({ url: "../login/main?src=" + 'my' });
			setTimeout(() => {
				Toast('请先登录！');
			}, 1000);
		}
	})
  }
}
</script>

<style scoped>
	
	@import url("../../../styles/sign_in.css");
</style>
