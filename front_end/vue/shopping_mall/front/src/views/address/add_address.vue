<template>
	<div class="add_address">
		<div class="header_public">
			<div class="flex_center back">
				<svg class="icon" aria-hidden="true" @click='back'>
					<use xlink:href="#icon-arrow-right"></use>
				</svg>
			</div>
			<h3 class="flex_center">新建收货地址</h3>
		</div>

		<ul class="form_data">
			<li>
				<span>收货人</span>
				<input type="text" placeholder="请输入收货人姓名">
			</li>
			<li>
				<span>手机号码</span>
				<input type="text" placeholder="请输入联系电话">
			</li>
			<li>
				<span>所在地区</span>
				<p>
					<span>请选择所在地区</span>
					<svg class="icon" aria-hidden="true">
						<use xlink:href="#icon-you"></use>
					</svg>
				</p>
			</li>
			<li>
				<span>详细地址</span>
				<input type="text" placeholder="请输入详细地址">
			</li>
		</ul>

		<div class="flex_between set_default">
			<span>设为默认地址</span>
			<el-switch v-model="is_default" active-color="#31BFAD" inactive-color="#ccc"></el-switch>
		</div>

		<div class="bottom_btn" @click='sure_add'>
			<button>确定新增</button>
		</div>
	</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
	components: {

	}
})

export default class add_address extends Vue{
	private is_default: any = false;
	
	created () {

	};
	mounted () {

	};

	back () {
		this.$router.back();
	};

	sure_add () {

	}
}
</script>

<style lang="scss" scoped>
	
	.form_data {
		margin: 15px 0;
		background-color: #fff;

		li {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 10px 0;
			margin: 0 15px;
			border-bottom: 1px solid #E0E0E0;

			input {
				color: #666;
				text-align: right;
			}

			p {
				color: #ccc;
				font-size: 0.9rem;
				display: flex;
				align-items: center;

				.icon {
					width: 1.2rem;
					height: 1.2rem;
					margin-left: 5px;
				}
			}
		}

		li:last-of-type {
			border: none;
		}
	}

	.set_default {
		margin-bottom: 70px;
		background-color: #fff;
		padding: 12px 15px;
	}
</style>