<template>
  <div class="gym">
	<top_nav :top_nav_data='top_nav_data' />
	<div :style="{marginTop: top_nav_data.nav_height + 'px'}">
		<swiper :indicator-dots="gym_slide.is_dots" :autoplay="gym_slide.is_auto" :interval="gym_slide.interval" :duration="gym_slide.duration" :circular='gym_slide.circular'>
			<block v-for="(item, index) in gym_slide.banners" :key='item.ad_id'>
				<swiper-item>
					<img :src="'https://shop.technologyle.com' + item.ad_code" class="slide_banners" alt="banner" />
				</swiper-item>
			</block>
		</swiper>
	</div>
	<div class="search">
		<div class="left">
			<div class="border"></div>
			<span>健身会所</span>
		</div>
		<div class="right">
			<i class="iconfont">&#xe690;</i>
			<input placeholder="请输入您想去的健身房" placeholder-style="color: #ccc">
		</div>
	</div>
	<div class="club_list">
		<div v-if='is_address'>
			<div v-if='is_loading' class="loading">
				<van-loading type="spinner" color="#ccc" />
			</div>
			<div v-if='!is_loading'>
				<ul>
					<li class="li_list" v-for='(item, index) in club_lists' :key='item.id'>
						<img class="img_list" :src="'https://shop.technologyle.com' + item.shop_image" alt="">
						<div class="info_01">
							<span class="name">{{ item.club_name }}</span>
							<span class="distance">{{ item.juli * 1000 }}m <i class="iconfont">&#xe63f;</i></span>
						</div>
						<div class="info_02">
							<span class="type"><i class="iconfont">&#xe604;</i> {{ item.goods_name }}</span>
							<span class="price">¥{{ item.price }}</span>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<div class="no_address" v-if='!is_address'>
			<img class="no_address_img" src="../../../static/imgs/no_address.png" alt="">
			<p>请<span class="click" @click='openSetting'>点我</span>打开地理位置授权</p>
			<p>获取您附近的会所</p>
		</div>
	</div>
  </div>
</template>

<script>
import top_nav from "../../components/top_nav.vue";

export default {
  data () {
    return {
		//测试数据
		test_data: '',
		//顶部导航栏
		top_nav_data: {
			city: '深圳市',
			nav_height: ''
		},
		//banner轮播相关
		gym_slide: {
			is_dots: false,
			is_auto: true,
			interval: 5000,
			duration: 1000,
			circular: true,
			banners: []
		},
		//会所列表
		club_lists: [],
		//是否获取了地理位置授权
		is_address: true,
		//加载中
		is_loading: false,
		//请求页码
		request_page: 1
    }
  },

  components: {
    top_nav
  },

  methods: {
	//获取会所列表(需要经纬度)
	get_club_list () {
		var that = this;
		that.is_address = true;
		that.is_loading = true;
		wx.getStorage({
			key: 'get_address',
			success (res) {
				console.log('储存的位置信息', res);
				var send_data = {};
				send_data.lat = res.data.latitude;
				send_data.lng = res.data.longitude;
				send_data.type = 2;
				send_data.p = that.request_page;
				that.$store.dispatch("club_list", send_data).then( (res) => {
					if (res.data.status == 1) {
						that.is_loading = false;
						console.log("会所列表", res.data.result);
						that.club_lists = res.data.result;
					};
				});
			},
			fail () {
				wx.getLocation({
					type: 'gcj02',
					success (res) {
						console.log("当前位置信息", res);
						wx.setStorage({
							key: "get_address",
							data: res
						});
						var send_data = {};
						send_data.lat = res.latitude;
						send_data.lng = res.longitude;
						send_data.type = 2;
						send_data.p = that.request_page;
						that.$store.dispatch("club_list", send_data).then( (res) => {
							if (res.data.status == 1) {
								that.is_loading = false;
								console.log("会所列表", res.data.result);
								that.club_lists = res.data.result;
							};
						});
					}
				})
			}
		});
	},

	//引导客户去设置页面 打开授权
	openSetting () {
		var that = this;
		wx.openSetting({
			success (res) {
				console.log("设置页面", res);
				if(res.authSetting["scope.userLocation"]){
					that.get_club_list()
				};
			}
		})
	}
  },

  created () {
	var that = this;
	//检测系统
	wx.getSystemInfo({
		success: (res) => {
			console.log('系统信息', res);
			if (res.system.indexOf('iOS') != -1) {
				this.top_nav_data.nav_height = res.statusBarHeight + 32 + 12;
			}else {
				this.top_nav_data.nav_height = res.statusBarHeight + 32 + 16;
			};
			console.log('顶部导航栏总高度' ,this.top_nav_data.nav_height);
		}
	});
	//请求轮播图
	this.$store.dispatch("gym_banner").then( (res) => {
		if (res.data.status == 1) {
			console.log("首页轮播图", res.data.result);
			this.gym_slide.banners = res.data.result;
		};
	});
	//获取地理位置
	wx.getSetting({
        success: function(res) {
			console.log("用户授权信息", res);
			if(!res.authSetting["scope.userLocation"]){
				wx.authorize({
					scope: 'scope.userLocation',
					success(res) {
						that.get_club_list()
					},
					fail () {
						that.is_address = false;
					}
				});
			}else{
				that.get_club_list()
			}
        }
	});

  }
}
</script>

<style scoped>
	@import url("../../styles/gym.css");
</style>
