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
				<div class="head_pic"><img src="../../assets/imgs/default_goods_img.png" alt="head_pic"></div>
				<div class="info">
					<h3>
						<span>文一</span>
						<img src="../../assets/imgs/ordinary_vip_title.png" alt="logo">
					</h3>
					<p>18617109552</p>
				</div>
			</div>
			<svg class="icon" aria-hidden="true">
				<use xlink:href="#icon-you"></use>
			</svg>
		</div>
		<div class="assessment">
			<div class="title">
				<span>本月考核：</span>
				<i>2019.11.01</i>
				<i> ~ </i>
				<i>2019.11.31</i>
			</div>
			<div class="flex_between reusable_div">
				<div class="flex_center sales">
					<span>0.00</span>
					<p>
						<img src="../../assets/imgs/vip_center_sales.png" alt="profit">
						<span>本月销售额(元)</span>
					</p>
				</div>
				<div class="flex_center reach">
					<span>0.00</span>
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
					<span>0.00</span>
					<p>上月销售额(元)</p>
				</div>
				<h4 class="line"></h4>
				<div>
					<span>0.00</span>
					<p>本月销售额(元)</p>
				</div>
			</div>
			<div class="flex_center items">
				<div>
					<span>0.00</span>
					<p>累计销售额(元)</p>
				</div>
				<h4 class="line"></h4>
				<div>
					<span>0.00</span>
					<p>收益合计(元)</p>
				</div>
			</div>
		</div>
		<div class="assessment">
			<div class="flex_between reusable_div">
				<div class="flex_center total">
					<span>0.00</span>
					<p>
						<img src="../../assets/imgs/vip_center_total_profit.png" alt="profit">
						<span>累计收益(元)</span>
					</p>
				</div>
				<div class="flex_center extract">
					<span>0.00</span>
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
	
	created () {

	};
	mounted () {

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