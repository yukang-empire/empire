<template>
	<div class="home">
		<div class="header">
			<router-link to='/search' tag='div'>
				<input type="text" placeholder="请输入你想搜索的商品" disabled>
			</router-link>
			<svg class="icon" aria-hidden="true">
				<use xlink:href="#icon-sousuo"></use>
			</svg>
		</div>
		<div class="nav">
			<swiper_imgs :swiper_data='swiper_data'></swiper_imgs>
			<ul class="flex_center">
				<li class="flex_center" @click='goods_area(1)'>
					<img src="../../assets/imgs/index_nav_01.png" alt="vip">
					<span>会员区</span>
				</li>
				<li class="flex_center" @click='goods_area(2)'>
					<img src="../../assets/imgs/index_nav_02.png" alt="vip">
					<span>优选区</span>
				</li>
				<li class="flex_center" @click='goods_area(3)'>
					<img src="../../assets/imgs/index_nav_03.png" alt="vip">
					<span>运动区</span>
				</li>
			</ul>
		</div>
		<div class="footer">
			<h2>推荐商品</h2>
			<ul class="goods_list" v-if='goods_list.length > 0'>
				<router-link v-for='(item, index) in goods_list' :to="{ path: '/goods_details', query: { goods_id: item.goods_id } }" tag='li' class="flex_center">
					<div class="flex_center goods_img">
						<img v-if='item.original_img' :src="'https://shop.technologyle.com' + item.original_img" alt="goods">
						<img v-if='!item.original_img' src="../../assets/imgs/default_goods_img.png" alt="goods">
					</div>
					<p class="flex_center">
						<span v-if='item.shop_type == 1' class="tag vip_span">会员</span>
						<span v-if='item.shop_type == 2' class="tag yx_span">优选</span>
						<span v-if='item.shop_type == 3' class="tag motion_span">运动</span>
						<i>{{ item.goods_name }}</i>
					</p>
					<p class="price">¥<i>{{ item.shop_price }}</i></p>
				</router-link>
			</ul>
			<div class="flex_center no_result" v-if='goods_list.length <= 0'>
				<img src="../../assets/imgs/search_no_result.png" alt="result">
				<p>暂无商品</p>
			</div>
		</div>
		<!-- 我的 -->
		<router-link to='/my' tag='div' class="flex_center my">
			<svg class="icon" aria-hidden="true">
				<use xlink:href="#icon-denglu"></use>
			</svg>
		</router-link>
		<!-- 文字提示 -->
		<transition name='fade'>
			<div class="text_tip" v-if='text_tip.is_open'>{{ text_tip.msg }}</div>
		</transition>
	</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import swiper_imgs from '@/components/swiper_imgs.vue';

@Component({
	components: {
		swiper_imgs
	}
})

export default class home extends Vue{
	private swiper_data: any = {
		options: {
			pagination: {
				el: '.swiper-pagination'
			},
			autoplay: {
				delay: 5000,
				disableOnInteraction: false
			},
			loop: true,
			slidesPerView: 'auto'
		},
		imgs: []
	};
	private goods_list: any = [];
	private text_tip: any = {
		is_open: false,
		msg: '',
		can_click: true
	};

	created () {

	};
	mounted () {
		var that = this;
		sessionStorage.setItem('token', '681b05855cb2');
		this.$store.dispatch('get_home_data').then((res) => {
			console.log('首页数据', res);
			if (res.status == 1) {
				if (res.result.ad.length > 0) {
					this.swiper_data.imgs = res.result.ad;
				}else {
					this.swiper_data.imgs = [{ ad_code: '/userReg/imgs/index_banner.png', ad_link: '/userReg/walk_money.html' }];
				};
				this.goods_list = res.result.list;
			};
		});
	};

	//打开轻提示
	open_text_tip (text) {
		if (this.text_tip.can_click) {
			this.text_tip.can_click = false;
			this.text_tip.is_open = true;
			this.text_tip.msg = text;
			setTimeout(() => {
				this.text_tip.can_click = true;
				this.text_tip.is_open = false;
				this.text_tip.msg = '';
			}, 1500);
		}else {
			return false;
		};
	};

	//跳转商品区域
	goods_area (type) {
		if (type != 1) {
			this.open_text_tip('敬请期待!');
		}else {
			this.$router.push({ path: '/goods_area', query: { type: type } });
		};
	}

}
</script>

<style lang="scss" scoped>
	
	.header {
		margin: 8px 20px;
		position: relative;

		&>div {
			display: flex;
		}

		input {
			height: 38px;
			color: #666;
			border-radius: 5px;
			background-color: #fff;
			padding: 0 20px 0 38px;
			flex-grow: 1;
		}

		.icon {
			position: absolute;
			color: #ccc;
			width: 20px;
			height: 20px;
			top: 50%;
			left: 10px;
			transform: translateY(-50%);
		}
	}

	.nav {
		color: #666666;
		background-color: #fff;
		margin-bottom: 12px;

		ul {
			padding: 20px 0;
			justify-content: space-evenly;
		}

		li {
			flex-direction: column;

			img {
				width: 55px;
				margin-bottom: 5px;
			}
		}
	}

	.footer {
		margin-bottom: 30px;

		h2 {
			background-color: #fff;
			text-align: center;
			font-size: 1.2rem;
			padding: 10px 0;
			margin-bottom: 2px;
		}
	}

	.my {
		width: 50px;
		height: 50px;
		background-color: $btn_color;
		position: fixed;
		right: 25px;
		bottom: 90px;
		border-radius: 50%;
		z-index: 99;

		.icon {
			width: 28px;
			height: 28px;
			color: #fff;
		}
	}

	.no_result {
		margin-top: 40px;
	}

</style>