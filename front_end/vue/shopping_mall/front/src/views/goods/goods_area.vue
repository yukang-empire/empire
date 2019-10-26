<template>
	<div class="goods_area">
		<div class="header_public">
			<div class="flex_center back">
				<svg class="icon" aria-hidden="true" @click='back'>
					<use xlink:href="#icon-arrow-right"></use>
				</svg>
			</div>
			<h3 class="flex_center">{{ area_type }}</h3>
		</div>
		<ul class="flex_center nav">
			<li class="flex_center left">
				<span>综合</span>
				<svg class="icon" aria-hidden="true" @click='back'>
					<use xlink:href="#icon-downlist"></use>
				</svg>
			</li>
			<li class="flex_center middle">
				<span>销量</span>
			</li>
			<li class="flex_center right">
				<span>综合</span>
				<svg class="icon" aria-hidden="true" @click='back'>
					<use xlink:href="#icon-shangxia"></use>
				</svg>
			</li>
		</ul>
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
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
	components: {

	}
})

export default class goods_area extends Vue{
	private area_type: any = null;
	private goods_list: any = [];

	created () {

	};
	mounted () {
		var query = this.$route.query;
		if (query.type == 1) {
			this.area_type = '会员区';
		}else if (query.type == 2) {
			this.area_type = '优选区';
		}else if (query.type == 3) {
			this.area_type = '运动区';
		};
		//请求数据
		var http_data = {
			type: query.type,
			searcoriginal_imgh: ''
		};
		this.$store.dispatch('get_area_data', http_data).then((res) => {
			console.log('分区数据', res);
			if (res.status == 1) {
				this.goods_list = res.result;
			};
		});
	};

	back () {
		this.$router.back();
	}
}
</script>

<style lang="scss" scoped>
	
	.nav {
		background-color: #fff;
		justify-content: space-evenly;
		margin: 2px 0;
		height: 43px;
		color: #999999;
		
		.right {

			.icon {
				width: 12px;
				height: 12px;
				margin-left: 3px;
			}
		}
	}

	
</style>