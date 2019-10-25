<template>
	<div class="my">
		<div class="header_public header_my">
			<div class="flex_center back">
				<svg class="icon" aria-hidden="true" @click='back'>
					<use xlink:href="#icon-arrow-right"></use>
				</svg>
			</div>
			<h3 class="flex_center">我的</h3>
		</div>
		<div class="my_info">
			<div class="left">
				<div class="head_pic"><img src="../../assets/imgs/default_goods_img.png" alt="head_pic"></div>
				<div class="info">
					<h3>文一</h3>
					<p>18617109552</p>
				</div>
			</div>
		</div>
		<div class="my_order">
			<h3>
				<i></i>
				<span>我的订单</span>
			</h3>
			<ul class="nav">
				<li>
					<img src="../../assets/imgs/my_nav_01.png" alt="nav">
					<p>全部</p>
				</li>
				<li>
					<img src="../../assets/imgs/my_nav_02.png" alt="nav">
					<p>待支付</p>
				</li>
				<li>
					<img src="../../assets/imgs/my_nav_03.png" alt="nav">
					<p>待签收</p>
				</li>
				<li>
					<img src="../../assets/imgs/my_nav_04.png" alt="nav">
					<p>售后</p>
				</li>
			</ul>
		</div>
		<ul class="other">
			<li class="flex_between">
				<div>
					<img src="../../assets/imgs/my_address_icon.png" alt="address">
					<span>我的地址</span>
				</div>
				<svg class="icon" aria-hidden="true">
					<use xlink:href="#icon-you"></use>
				</svg>
			</li>
			<li class="flex_between">
				<div @click='vip_center'>
					<img src="../../assets/imgs/my_vip_icon.png" alt="vip">
					<span>会员中心</span>
				</div>
				<svg class="icon" aria-hidden="true">
					<use xlink:href="#icon-you"></use>
				</svg>
			</li>
		</ul>
	</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
	components: {

	}
})

export default class my extends Vue{
	private data: any = {

	};

	created () {

	};
	mounted () {

	};

	back () {
		this.$router.back();
	};

	vip_center () {
		this.$router.push({ path: '/vip_center' });
	}
	
}
</script>

<style lang="scss" scoped>
	
	.my_order {
		margin: 15px 0;
		padding: 0 15px;
		background-color: #fff;

		h3 {
			font-size: 0.98rem;
			padding: 10px 0;
			display: flex;
			align-items: center;

			i {
				width: 5px;
				height: 18px;
				background-color: $btn_color;
				margin-right: 8px;
			}
		}

		.nav {
			display: flex;
			align-items: center;
			justify-content: space-evenly;
			padding-bottom: 15px;

			li {
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;
				font-size: 0.9rem;

				img {
					width: 50px;
					border-radius: 50%;
					margin-bottom: 5px;
				}
			}
		}
	}


	.other {
	background-color: #fff;

		li {
			padding: 15px 0;
			margin: 0 15px;
			border-bottom: 1px solid #999999;

			div {
				display: flex;
				align-items: center;

				img {
					width: 25px;
					margin-right: 8px;
				}
			}

			.icon {
				color: #cccccc;
			}
		}
		li:last-of-type {
			border: none;
		}
	}
</style>