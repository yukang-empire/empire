<template>
	<div class="home">
		<div class="swiper">
			<swiper :autoplay="swiper_option.autoplay" :interval="swiper_option.interval" :duration="swiper_option.duration" :circular='swiper_option.circular'>
				<swiper-item v-for="(item, index) in swiper_option.imgs" :key='item.ad_id'>
					<img :src="'https://shop.technologyle.com' + item.ad_code" alt="swiper" style="height: 100%;">
				</swiper-item>
			</swiper>
		</div>
		<ul class="flex_between nav">
			<li class="item">
				<img class="img" src="../../../../static/imgs/home/index_nav_01.png" alt="nav">
				<p>房券预售</p>
			</li>
			<li class="item">
				<img class="img" src="../../../../static/imgs/home/index_nav_02.png" alt="nav">
				<p>交易市场</p>
			</li>
			<li class="item">
				<img class="img" src="../../../../static/imgs/home/index_nav_03.png" alt="nav">
				<p>我的房券</p>
			</li>
		</ul>
		<div>
			<div>
				<div></div>
				<span>预售</span>
			</div>
			<div>
				<span>更多</span>
				<i class="iconfont">&#xe618;</i>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data () {
		return {
			//轮播参数
			swiper_option: {
				autoplay: true,
				interval: 4000,
				duration: 1000,
				circular: true,
				imgs: []
			}
		}
	},
	components: {

	},
	//下拉刷新
	onPullDownRefresh () {
		wx.showToast({
			title: '正在更新数据...',
			icon: 'loading',
			duration: 1500
		});

		wx.stopPullDownRefresh();
	},
	created () {
		
	},
	mounted () {
		var that = this;
		this.$store.dispatch('home_swipers').then((res) => {
			console.log('首页swipers', res);
			if (res.data.status == 1) {
				that.swiper_option.imgs = res.data.result || [];
			};
		});
	},
	methods: {

	}
}
</script>

<style lang="scss" scoped>

	
</style>