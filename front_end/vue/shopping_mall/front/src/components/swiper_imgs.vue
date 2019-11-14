<template>
	<div class="swiper_imgs">
		<swiper v-if="swiper_data.imgs.length > 0" :options="swiper_data.options">
			<swiper-slide v-for="(item, index) in swiper_data.imgs" :key="index">
				<img :src="'https://shop.technologyle.com' + item.ad_code" alt="goods">
			</swiper-slide>
			<div class="swiper-pagination" slot="pagination"></div>
		</swiper>
	</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';

@Component({
	components: {
		swiper,
		swiperSlide
	}
})

export default class swiper_imgs extends Vue{
	@Prop() private swiper_data !: any;

	created () {

	};
	mounted () {

	};

	jump (link: any) {
		if (link) {
			window.location.href = 'https://shop.technologyle.com' + link;
		};
	};
	
}
</script>

<style lang="scss">
	.swiper-pagination-bullet {
		background: #CCCCCC;
	}
	.swiper-pagination-bullet-active {
		background: #31BFAD;
	}
</style>