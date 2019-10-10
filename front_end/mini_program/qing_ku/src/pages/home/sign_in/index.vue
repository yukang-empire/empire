<template>
  <div class="sign_in">
	<div class="flex_center header">
		<img class="sign_in_bg" src="../../../../static/imgs/sign_in_bg.png" alt="" mode="widthFix">
		<p class='sign_title'>已连续签到(天)</p>
		<div class="flex_center num_div">
			<div class="num hundred">{{ hundred }}</div>
			<div class="num ten">{{ ten }}</div>
			<div class="num bit">{{ bit }}</div>
		</div>
		<div class="header_bottom">
			<div class="flex_center sign_in_date">
				<img class="line" src="../../../../static/imgs/sign_line.png" alt="" mode="widthFix">
				<div v-for='(item, index) in time_line' class="common_class"
					:key='index'
					:class="{
						'before_no': ((index < time_line.length - 1) && !item.user_points),
						'before_yes': ((index < time_line.length - 1) && item.user_points),
						'today_no': ((index == time_line.length - 1) && !item.user_points),
						'flex_center': ((index == time_line.length - 1) && item.user_points),
						'today_yes': ((index == time_line.length - 1) && item.user_points)
					}"
				>
					<span class="time">{{ item.reistertime }}</span>
					<img v-if='((index < time_line.length - 1) && !item.user_points)' class="before_no_circle" src="../../../../static/imgs/before_no_circle.png" alt="">
					<img v-if='((index < time_line.length - 1) && item.user_points)' class="before_yes_circle" src="../../../../static/imgs/before_yes_circle.png" alt="">
					<img v-if='(index == time_line.length - 1)' class="today_circle" src="../../../../static/imgs/today_circle.png" alt="">
					<img v-if='(index != time_line.length - 1) || item.user_points' class="hook" src="../../../../static/imgs/hook.png" alt="" mode="widthFix">
					<span v-if='(index == time_line.length - 1 && !item.user_points)' class="today_text">+<span>{{ item.user_points ? item.user_points : 1 }}</span></span>
				</div>
				<!-- <div class="common_class before_yes">
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
				</div> -->
			</div>
			<div class="sign_in_btn" @click="to_sign_in" v-if='!is_sign'>签到</div>
			<div class="sign_in_btn sign_in_btn_02" v-if='is_sign'>已签到</div>
		</div>
		<div class="footer">
			<h3 class="footer_h3" @click="sign_in_success">获得酷点</h3>
			<ul class="footer_ul">
				<li class="flex_between footer_li">
					<div class="footer_li_left" @click='dialog_info(1)'> 
						<img src="../../../../static/imgs/sign_in_img_01.png" alt="" class="footer_li_left_img">
						<div class="footer_li_left_div">
							<p class="flex_between footer_li_left_div_p_01">
								<span>邀请好友</span>
								<span style="color: #31BFAD;">+500酷点</span>
							</p>
							<p class="footer_li_left_div_p_02">
								<span>邀请5人奖励500酷点</span>
								<img src="../../../../static/imgs/sign_in_img_04.png" alt="" class="footer_li_left_img_02">
							</p>
						</div>
					</div>
					<div class="footer_li_right">
						<span>完成 </span>
						<span class="footer_li_right_span_02">0</span>
						<span> / 5</span>
					</div>
				</li>
				<li class="flex_between footer_li">
					<div class="footer_li_left" @click='dialog_info(2)'> 
						<img src="../../../../static/imgs/sign_in_img_02.png" alt="" class="footer_li_left_img">
						<div class="footer_li_left_div">
							<p class="flex_between footer_li_left_div_p_01">
								<span>实名认证</span>
								<span style="color: #31BFAD;">+50酷点</span>
							</p>
							<p class="footer_li_left_div_p_02">
								<span>实名认证＋50酷点</span>
								<img src="../../../../static/imgs/sign_in_img_04.png" alt="" class="footer_li_left_img_02">
							</p>
						</div>
					</div>
					<div class="footer_li_right_btn">去实名</div>
				</li>
				<li class="flex_between footer_li">
					<div class="footer_li_left" @click='dialog_info(3)'> 
						<img src="../../../../static/imgs/sign_in_img_03.png" alt="" class="footer_li_left_img" style="height: 22px;">
						<div class="footer_li_left_div">
							<p class="flex_between footer_li_left_div_p_01">
								<span>每日分享</span>
								<span style="color: #31BFAD;">+5酷点</span>
							</p>
							<p class="footer_li_left_div_p_02">
								<span>每日分享＋5酷点</span>
								<img src="../../../../static/imgs/sign_in_img_04.png" alt="" class="footer_li_left_img_02">
							</p>
						</div>
					</div>
					<div class="footer_li_right_btn">去分享</div>
				</li>
			</ul>
		</div>
	</div>
	<!-- 弹框 -->
	<div class="flex_center dialog_diy" v-if='is_dialog' @click='is_dialog = false'>
		<div class="flex_center dialog_diy_main" @click.stop='is_dialog = true'>
			<h3 class="dialog_diy_title">{{ dialog_content.title }}</h3>
			<div class="dialog_diy_content">
				<p>{{ dialog_content.content_01 }}</p>
				<p>{{ dialog_content.content_02 }}</p>
				<p>可获得<span style="color: #31BFAD">+<span>{{ dialog_content.kd }}</span>酷点</span></p>
			</div>
			<div class="dialog_diy_btn" @click.stop='is_dialog = false'>我知道了</div>
		</div>
	</div>
	<!-- 签到成功弹框 -->
	<div class="flex_center dialog_diy" v-if='is_sign_in' @click='is_sign_in = false'>
		<div class="flex_center dialog_diy_main dialog_diy_main_02" @click.stop='is_sign_in = true'>
			<div class="dialog_diy_header">
				<img src="../../../../static/imgs/sign_in_dialog_bg.png" alt="" class="dialog_diy_header_bg" mode='widthFix'>
				<h3 class="dialog_diy_header_h3">获得奖励</h3>
				<img src="../../../../static/imgs/close_02.png" alt="" class="dialog_diy_header_close" @click.stop='is_sign_in = false'>
			</div>
			<div class="dialog_diy_content02">
				<p>酷点提升<span style="color: #FE8106">+<span>{{ get_kd }}</span></span></p>
			</div>
			<div class="dialog_diy_btn02" @click.stop='is_sign_in = false'>完成</div>
		</div>
	</div>
  </div>
</template>

<script>
import Toast from "../../../../static/vant/toast/toast";

export default {
  data () {
    return {
		is_dialog: false,
		is_sign_in: false,
		dialog_content: {
			title: '',
			content_01: '',
			content_02: '',
			kd: ''
		},
		is_sign: false,
		sign_in_data: {},
		time_line: [],
		//连续打卡天数
		hundred: 0,
		ten: 0,
		bit: 0,
		get_kd: '1'
    }
  },

  components: {
	
  },
  onLoad (options) {
	
  },
  launchAppError (e) {
	
  },
  methods: {
	dialog_info (index) {
		var that = this;
		if (index == 1) {
			this.dialog_content = {
				title: '邀请好友',
				content_01: '邀请5人成功注册后',
				content_02: '',
				kd: '500'
			};
		}else if (index == 2) {
			this.dialog_content = {
				title: '实名认证',
				content_01: '用户完成实名认证',
				content_02: '',
				kd: '50'
			};
		}else {
			this.dialog_content = {
				title: '每日分享',
				content_01: '分享海报或邀请链接至',
				content_02: '微信好友或朋友圈',
				kd: '5'
			};
		}
		this.is_dialog = true;
	},
	// 签到
	to_sign_in () {
		var that = this;
		wx.getStorage({
			key: 'token',
			success (res) {
				//签到
				that.$store.dispatch('to_sign_in', {token: res.data}).then((res) => {
					console.log('签到', res);
					if (res.data.status == 1) {
						that.is_sign_in = true;
						that.is_sign = true;
						that.get_sign_in_data();
					};
				});
			},
			fail (res) {
				mpvue.navigateTo({ url: "../../my/login/main?src=" + 'sign_in' });
				setTimeout(() => {
					Toast('请先登录！');
				}, 1000);
			}
		})
	},
	//签到首页数据
	get_sign_in_data () {
		var that = this;
		wx.getStorage({
			key: 'token',
			success (res) {
				//获取签到数据
				that.$store.dispatch('sign_data', {token: res.data}).then((res) => {
					console.log('签到数据', res);
					if (res.data.status == 1) {
						that.sign_in_data = res.data.result;
						that.time_line = res.data.result.list.reverse();
						if (that.sign_in_data.is_long && that.sign_in_data.is_long > 0) {
							that.hundred = parseInt(that.sign_in_data.is_long / 100);
							that.ten = parseInt((that.sign_in_data.is_long % 100) / 10);
							that.bit = parseInt(that.sign_in_data.is_long % 10);
						};
						var length = res.data.result.list.length;
						if (that.time_line[length - 1].user_points) {
							that.is_sign = true;
							that.get_kd = parseInt(that.time_line[length - 1].user_points);
						};
						for (var i = 0; i < length; i++) {
							if (that.time_line[i].reistertime) {
								that.time_line[i].reistertime = that.time_line[i].reistertime.substr(5);
								// that.time_line[i].change_time = that.$moment(that.time_line[i].change_time * 1000).format('MM-DD');
							};
						};
					};
				});
			},
			fail (res) {
				mpvue.navigateTo({ url: "../../my/login/main?src=" + 'sign_in' });
				setTimeout(() => {
					Toast('请先登录！');
				}, 1000);
			}
		})
	}
  },

  mounted () {
	this.get_sign_in_data();
  }
}
</script>

<style scoped>
	
	@import url("../../../styles/sign_in.css");
</style>
