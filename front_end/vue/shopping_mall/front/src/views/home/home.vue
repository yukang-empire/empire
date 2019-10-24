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
			<img src="../../assets/imgs/index_banner.png" alt="banner">
			<ul class="flex_center">
				<router-link :to="{ path: '/goods_area', query: { type: 0 } }" tag='li' class="flex_center">
					<img src="../../assets/imgs/index_nav_01.png" alt="vip">
					<span>会员区</span>
				</router-link>
				<router-link :to="{ path: '/goods_area', query: { type: 1 } }" tag='li' class="flex_center">
					<img src="../../assets/imgs/index_nav_02.png" alt="yx">
					<span>优选区</span>
				</router-link>
				<router-link :to="{ path: '/goods_area', query: { type: 2 } }" tag='li' class="flex_center">
					<img src="../../assets/imgs/index_nav_03.png" alt="moment">
					<span>运动区</span>
				</router-link>
			</ul>
		</div>
		<div class="footer">
			<h2>推荐商品</h2>
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
		<!-- 我的 -->
		<router-link to='/my' tag='div' class="flex_center my">
			<svg class="icon" aria-hidden="true">
				<use xlink:href="#icon-denglu"></use>
			</svg>
		</router-link>
	</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
	components: {

	}
})

export default class home extends Vue{
	
	created () {

	};
	mounted () {
		
	};

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