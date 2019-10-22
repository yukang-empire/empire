<template>
  <div class="my">
	<div class="header">
		<img class="bg_my" src="../../../../static/imgs/bg_my.png" alt="bg" mode='widthFix'>
		<!-- <i class="iconfont">&#xe62d;</i> -->
		<div class="flex_center user_info">
			<img @click='to_login' class="default_head" src="../../../../static/imgs/default_head.png" alt="head" v-if='!my_data.head_pic'>
			<img @click='to_login' class="default_head" :src="'https://shop.technologyle.com' + my_data.head_pic" alt="head" v-if='my_data.head_pic'>
			<span @click='to_login' v-if='!my_data.nickname'>登录 / 注册</span>
			<span @click='to_login' v-if='my_data.nickname || my_data.mobile'>{{ my_data.nickname ? my_data.nickname : my_data.mobile }}</span>
		</div>
		<div class="flex_center bottom_info" v-if='my_data.distribut_level == 0' :style="{top: posi_top + 'px'}">
			<img class="yxhj" src="../../../../static/imgs/yxhj.png" alt="" mode='widthFix'>
			<span>开通会员卡分享得红包</span>
			<img class="immed_open" src="../../../../static/imgs/immed_open.png" alt="" mode='widthFix'>
		</div>
		<div class="flex_between bottom_info other" v-if='my_data.distribut_level == 1'>
			<div class="flex_center">
				<img class="silver_card" src="../../../../static/imgs/silver_card.png" alt="" mode='widthFix'>
				<span>银卡会籍</span>
			</div>
			<img class="immed_open" src="../../../../static/imgs/imme_upgrade.png" alt="" mode='widthFix'>
		</div>
		<div class="flex_between bottom_info other" v-if='my_data.distribut_level == 2'>
			<div class="flex_center">
				<img class="gold_card" src="../../../../static/imgs/gold_card.png" alt="" mode='widthFix'>
				<span>金卡会籍</span>
			</div>
			<img class="immed_open" src="../../../../static/imgs/imme_upgrade.png" alt="" mode='widthFix'>
		</div>
	</div>
	<ul class="flex_center nav">
		<li class="flex_center nav_item">
			<img class="nav_img" src="../../../../static/imgs/ku_dian.png" alt="">
			<span class="nav_span">酷点</span>
			<span class="nav_span_02">{{ my_data.user_points }}</span>
		</li>
		<li class="flex_center nav_item">
			<img class="nav_img" src="../../../../static/imgs//shou_yi.png" alt="">
			<span class="nav_span">收益</span>
			<span class="nav_span_02">{{ my_data.distribut_money }}</span>
		</li>
		<li class="flex_center nav_item">
			<img class="nav_img" src="../../../../static/imgs/my_coupon.png" alt="">
			<span class="nav_span">优惠券</span>
			<span class="nav_span_02">{{ my_data.coupon_count }}</span>
		</li>
	</ul>
	<div class="my_service">
		<div class="my_service_title">
			<div class="my_service_border"></div>
			<h2 class="my_service_h2">我的服务</h2>
		</div>
		<div class="flex_center my_service_bottom">
			<div class="my_service_item">
				<img @click='jump_order' class="my_service_img" src="../../../../static/imgs/my_order.png" alt="" mode='widthFix'>
				<span @click='jump_order' class="my_service_span">订单</span>
			</div>
			<!-- <div class="my_service_item">
				<img @click='jump_mall' class="my_service_img" src="../../../../static/imgs/my_mall.png" alt="" mode='widthFix'>
				<span @click='jump_mall' class="my_service_span">轻酷商城</span>
			</div> -->
			<!-- <div class="my_service_item">
				<img @click='jump_invi' class="my_service_img" src="../../../../static/imgs/my_invi.png" alt="" mode='widthFix'>
				<span @click='jump_invi' class="my_service_span">邀请得红包</span>
			</div> -->
			<!-- <div class="my_service_item">
				<img @click='jump_team' class="my_service_img" src="../../../../static/imgs/my_team.png" alt="" mode='widthFix'>
				<span @click='jump_team' class="my_service_span">好友</span>
			</div> -->
			<div class="my_service_item">
				<img @click='jump_help' class="my_service_img" src="../../../../static/imgs/my_help.png" alt="" mode='widthFix'>
				<span @click='jump_help' class="my_service_span">帮助中心</span>
			</div>
		</div>
	</div>
	<van-toast id="van-toast" />
  </div>
</template>

<script>
import Toast from '../../../../static/vant/toast/toast';

export default {
  data () {
    return {
      my_data: {
		nickname: '',
		head_pic: '',
	  },
	  posi_top: 0
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
	this.get_user_data();
	wx.stopPullDownRefresh();
  },
  methods: {
	jump_order () {
		wx.getStorage({
			key: 'my_data',
			success (res) {
				mpvue.navigateTo({ url: "../order/main" });
			},
			fail (res) {
				mpvue.navigateTo({ url: "../login/main?src=" + 'my' });
				setTimeout(() => {
					Toast('请先登录！');
				}, 300);
			}
		});
	},
	jump_mall () {
		mpvue.navigateTo({ url: "../mall/main" });
	},
	jump_invi () {
		wx.getStorage({
			key: 'my_data',
			success (res) {
				mpvue.navigateTo({ url: "../invitation/main" });
			},
			fail (res) {
				mpvue.navigateTo({ url: "../login/main?src=" + 'my' });
				setTimeout(() => {
					Toast('请先登录！');
				}, 300);
			}
		});
	},
	jump_team () {
		wx.getStorage({
			key: 'my_data',
			success (res) {
				// mpvue.navigateTo({ url: "../team/main" });
				Toast('敬请期待！');
			},
			fail (res) {
				mpvue.navigateTo({ url: "../login/main?src=" + 'my' });
				setTimeout(() => {
					Toast('请先登录！');
				}, 300);
			}
		});
	},
	jump_help () {
		mpvue.navigateTo({ url: "../help/main" });
	},
    to_login () {
		wx.getStorage({
			key: 'my_data',
			success (res) {
				
			},
			fail () {
				mpvue.navigateTo({ url: "../login/main?src=" + 'my' });
			}
		});
	},
	//拉取用户数据
	get_user_data () {
		var that = this;
		wx.getStorage({
			key: 'my_data',
			success (res) {
				console.log(res);
				that.my_data = res.data;
			},
			fail () {
				wx.getStorage({
					key: 'token',
					success (res) {
						//获取我的页面数据
						that.$store.dispatch("my_data", { token: res.data }).then( (res) => {
							if (res.data.status == 1) {
								console.log("我的", res.data.result);
								that.my_data = res.data.result;
								wx.setStorageSync('my_data', that.my_data);
							};
						});
					}
				});
			}
		});
	}
  },

  onShow () {
	this.get_user_data();
  },
  created () {
	  //检测系统
	  var that = this;
		wx.getSystemInfo({
			success: (res) => {
				that.posi_top = res.screenWidth / 3.312;
			}
		});
  }
}
</script>

<style scoped>
	@import url("../../../styles/my.css");
</style>
