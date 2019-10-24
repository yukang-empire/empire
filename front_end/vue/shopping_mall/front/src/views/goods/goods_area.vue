<template>
	<div class="goods_area">
		<div class="header_public">
			<div class="flex_center back">
				<svg class="icon" aria-hidden="true" @click='back'>
					<use xlink:href="#icon-arrow-right"></use>
				</svg>
			</div>
			<h3 class="flex_center">会员区</h3>
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
		<ul class="goods_list" v-if='true'>
			<router-link :to="{ path: '/goods_details', query: { goods_id: 1 } }" tag='li' class="flex_center">
				<div class="flex_center goods_img">
					<img v-if='true' src="https://shop.technologyle.com/userReg/imgs/index_goods.png" alt="goods">
					<img v-if='false' src="../../assets/imgs/default_goods_img.png" alt="goods">
				</div>
				<p class="flex_center">
					<span class="tag vip_span">会员</span>
					<i>健身增肌粉健身增肌粉</i>
				</p>
				<p class="price">¥<i>268</i></p>
			</router-link>
		</ul>
		<div class="flex_center no_result" v-if='false'>
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

	created () {

	};
	mounted () {

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