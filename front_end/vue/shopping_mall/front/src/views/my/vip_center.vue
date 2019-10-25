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
		<div class="flex_between my_info">
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
				<div class="flex_center">
					<span>0.00</span>
					<p>
						<img src="../../assets/imgs/vip_center_sales.png" alt="sales">
						<span>本月销售额（元）</span>
					</p>
				</div>
				<div class="flex_center">
					<span>0.00</span>
					<p>
						<img src="../../assets/imgs/vip_center_reach.png" alt="profit">
						<span>达标收益（元）</span>
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
	}
	
}
</script>

<style lang="scss" scoped>
	
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
</style>