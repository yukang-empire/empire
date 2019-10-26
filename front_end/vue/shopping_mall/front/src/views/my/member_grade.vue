<template>
	<div class="member_grade">
		<div class="header_public header_my">
			<div class="flex_center back">
				<svg class="icon" aria-hidden="true" @click='back'>
					<use xlink:href="#icon-arrow-right"></use>
				</svg>
			</div>
			<h3 class="flex_center">会员等级</h3>
		</div>
		<div class="flex_center logo">
			<img src="../../assets/imgs/ordinary_vip_grade.png" alt="logo">
			<p><span>当前等级：</span><i>普通会员</i></p>
		</div>
		<h3 class="title">
			<span>距升级还差：￥</span>
			<i>200000</i>
		</h3>
		<div class="rule">
			<img src="../../assets/imgs/vip_grade_title.png" alt="title">
			<div class="items">
				<h3>
					<i></i>
					<span>晋升等级</span>
				</h3>
				<img src="../../assets/imgs/promotion_chart.png" alt="chart">
			</div>
			<div class="items">
				<h3>
					<i></i>
					<span>月达标奖励</span>
				</h3>
				<div class="have_bgc">
					<img src="../../assets/imgs/reward_chart.png" alt="chart">
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
	components: {

	}
})

export default class member_grade extends Vue{
	
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
	
	.logo {
		background-color: $btn_color;
		flex-direction: column;
		padding: 15px 0 25px 0;
		color: #fff;
		font-size: 1rem;

		img {
			width: 100px;
			margin-bottom: 5px;
		}
	}

	.title {
		padding: 10px 25px;
		background-color: #fff;
		font-size: 1rem;
		margin-bottom: 15px;
	}
	
	.rule {
		background-color: #fff;
		padding: 15px 25px 30px 25px;
		color: $btn_color;
		text-align: center;
		margin-bottom: 30px;

		&>img {
			width: 70%;
		}

		.items {
			
			h3 {
				display: flex;
				align-items: center;
				font-size: 1.1rem;
				margin: 10px 0 20px 0;

				i {
					width: 5px;
					height: 18px;
					margin-right: 8px;
					background-color: $btn_color;
				}
			}

			.have_bgc {
				background-color: #d6f2ef;
				padding: 25px 40px;
				border-radius: 10px;
			}
			
		}

	}
</style>