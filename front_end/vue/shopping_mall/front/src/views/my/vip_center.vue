<template>
	<div class="vip_center">
		<div class="header_public header_my">
			<div class="flex_center back">
				<svg class="icon" aria-hidden="true" @click='back'>
					<use xlink:href="#icon-arrow-right"></use>
				</svg>
			</div>
			<h3 class="flex_center">会员中心</h3>
		</div>
		<div class="flex_between my_info" @click='member_grade'>
			<div class="left">
				<div class="head_pic">
					<img v-if='my_data.img' :src="my_data.img" alt="head_pic">
					<img v-if='!my_data.img' src="../../assets/imgs/my_icon.png" alt="head_pic">
				</div>
				<div class="info">
					<h3>
						<span>{{ my_data.nickname }}</span>
						<img v-if='my_data.shop_level == 0' src="../../assets/imgs/ordinary_vip_title.png" alt="logo">
						<img v-if='my_data.shop_level == 1' src="../../assets/imgs/golden_vip_title.png" alt="logo">
						<img v-if='my_data.shop_level == 2' src="../../assets/imgs/platinum_vip_title.png" alt="logo">
						<img v-if='my_data.shop_level == 3' src="../../assets/imgs/diamond_vip_title.png" alt="logo">
						<img v-if='my_data.shop_level == 4' src="../../assets/imgs/shop_owner_title.png" alt="logo">
					</h3>
					<p>{{ my_data.mobile ? my_data.mobile : '0.00' }}</p>
				</div>
			</div>
			<svg class="icon" aria-hidden="true">
				<use xlink:href="#icon-you"></use>
			</svg>
		</div>
		<div class="assessment">
			<div class="title">
				<span>本月考核</span>
				<!-- <i>2019.11.01</i>
				<i> ~ </i>
				<i>2019.11.31</i> -->
			</div>
			<div class="flex_between reusable_div">
				<div class="flex_center sales">
					<span>{{ my_data.month_amount ? my_data.month_amount : '0.00' }}</span>
					<p>
						<img src="../../assets/imgs/vip_center_sales.png" alt="profit">
						<span>本月销售额(元)</span>
					</p>
				</div>
				<div class="flex_center reach">
					<span>{{ my_data.give_bonus ? my_data.give_bonus : '0.00' }}</span>
					<p>
						<img src="../../assets/imgs/vip_center_reach.png" alt="profit">
						<span>达标收益(元)</span>
					</p>
				</div>
			</div>
		</div>
		<div class="total">
			<div class="title">
				<span>统计</span>
			</div>
			<div class="flex_center items">
				<div>
					<span>{{ my_data.last_month_amount ? my_data.last_month_amount : '0.00' }}</span>
					<p>上月销售额(元)</p>
				</div>
				<h4 class="line"></h4>
				<div>
					<span>{{ my_data.month_amount ? my_data.month_amount : '0.00' }}</span>
					<p>本月销售额(元)</p>
				</div>
			</div>
			<div class="flex_center items">
				<div>
					<span>{{ my_data.shop_amount ? my_data.shop_amount : '0.00' }}</span>
					<p>累计销售额(元)</p>
				</div>
				<h4 class="line"></h4>
				<div>
					<span>{{ my_data.total_bonus ? my_data.total_bonus : '0.00' }}</span>
					<p>收益合计(元)</p>
				</div>
			</div>
		</div>
		<div class="assessment">
			<div class="flex_between reusable_div">
				<div class="flex_center total">
					<span>{{ my_data.total_bonus ? my_data.total_bonus : '0.00' }}</span>
					<p>
						<img src="../../assets/imgs/vip_center_total_profit.png" alt="profit">
						<span>累计收益(元)</span>
					</p>
				</div>
				<div class="flex_center extract">
					<span>{{ my_data.bonus ? my_data.bonus : '0.00' }}</span>
					<p>
						<img src="../../assets/imgs/vip_center_extract_profit.png" alt="profit">
						<span>可提收益(元)</span>
					</p>
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

export default class vip_center extends Vue{
	private my_data: any = {};
	
	created () {

	};
	mounted () {
		var that = this;
		this.$store.dispatch('my_data').then((res) => {
			console.log('会员中心', res);
			if (res.status == 1) {
				that.my_data = res.result;
				sessionStorage.setItem('grade', that.my_data.shop_level);
			}
		})
	};

	back () {
		this.$router.back();
	};

	member_grade () {
		this.$router.push({ path: '/member_grade' });
	}
	
}
</script>

<style lang="scss" scoped>
	
	.vip_center {
		margin-bottom: 30px;
	}
	.my_info {

		.info {

			h3 {
				display: flex;
				align-items: center;

				img {
					width: 80px;
					height: 18px;
					margin-left: 8px;
				}
			}
		}
	}
	
	.assessment {
		margin: 15px 0;
		background-color: #fff;

		.title {
			background-color: #FAFAFA;
			padding: 10px 5%;
			font-weight: 900;
		}

		.reusable_div {
			padding: 10px 5%;

			div {
				padding: 12px 2.5%;
				border-radius: 10px;
				flex-direction: column;
				color: #FF8288;
				background-color: #ccc;
				width: 43%;

				p {
					margin-top: 5px;
					display: flex;
					align-items: center;

					span {
						white-space: nowrap;
					}

					img {
						width: 18px;
						margin-right: 5px;
					}
				}
			}
			.sales {
				background-color: #FFF2F5;
				color: #FF8288;
			}
			.reach {
				background-color: #FFF8EF;
				color: #FFA524;
			}
			.total {
				background-color: #EBFCFA;
				color: #31BFAD;
			}
			.extract {
				background-color: #F8F0FF;
				color: #B068DE;
			}
		}
	}

	.total {
		background-color: #fff;

		.title {
			background-color: #FAFAFA;
			padding: 10px 5%;
			font-weight: 900;
		}

		.items {
			padding: 12px 0;
			margin: 0 5%;
			justify-content: space-evenly;
			border-bottom: 1px solid #E0E0E0;

			div {
				font-size: 0.85rem;
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
				width: 49.5%;

				p {
					margin-top: 3px;
				}
			}
			.line {
				width: 1px;
				height: 30px;
				background-color: #E0E0E0;
			}
		}
		.items:last-of-type {
			border: none;
		}
	}



</style>