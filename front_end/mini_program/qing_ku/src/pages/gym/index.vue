<template>
  <div class="gym">
	<top_nav :top_nav_data='top_nav_data' />
	<swiper :indicator-dots="gym_slide.is_dots" :autoplay="gym_slide.is_auto" :interval="gym_slide.interval" :duration="gym_slide.duration" :circular='gym_slide.circular'>
		<block v-for="(item, index) in gym_slide.banners" :key='item.id'>
			<swiper-item>
				<img :src="item.src" class="slide_banners" alt="banner" />
			</swiper-item>
		</block>
	</swiper>
  </div>
</template>

<script>
import top_nav from "../../components/top_nav.vue";

export default {
  data () {
    return {
		//顶部导航栏
		top_nav_data: {
			city: '深圳市',
			nav_height: ''
		},
		//banner轮播相关
		gym_slide: {
			is_dots: true,
			is_auto: true,
			interval: 2000,
			duration: 1000,
			circular: true,
			banners: [
				{id: 1, src: 'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640'},
				{id: 2, src: 'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640'},
				{id: 3, src: 'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'}
			]
		} 
    }
  },

  components: {
    top_nav
  },

  methods: {
    
  },

  mounted () {
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
	})
  }
}
</script>

<style scoped>
	@import url("../../styles/gym.css");
</style>
