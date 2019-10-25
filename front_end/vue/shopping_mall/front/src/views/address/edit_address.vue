<template>
	<div class="add_address">
		<div class="header_public">
			<div class="flex_center back">
				<svg class="icon" aria-hidden="true" @click='back'>
					<use xlink:href="#icon-arrow-right"></use>
				</svg>
			</div>
			<h3 class="flex_center">编辑收货地址</h3>
		</div>

		<ul class="form_data">
			<li>
				<span>收货人</span>
				<input type="text" v-model='form.consignee' placeholder="请输入收货人姓名">
			</li>
			<li>
				<span>手机号码</span>
				<input type="text" v-model='form.phone' placeholder="请输入联系电话">
			</li>
			<li>
				<span>所在地区</span>
				<p>
					<span>广东省  深圳市  龙华新区</span>
					<svg class="icon" aria-hidden="true">
						<use xlink:href="#icon-you"></use>
					</svg>
				</p>
			</li>
			<li>
				<span>详细地址</span>
				<input type="text" v-model='form.address' placeholder="请输入详细地址">
			</li>
		</ul>

		<div class="flex_between set_default">
			<span>设为默认地址</span>
			<el-switch v-model="is_default" active-color="#31BFAD" inactive-color="#ccc"></el-switch>
		</div>

		<div class="bottom_btn" @click='sure_edit'>
			<button>确定编辑</button>
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

	private form: any = {
		consignee: '张三',
		phone: '13416816966',
		address: '金銮国际大厦1010'
	};
	
	created () {

	};
	mounted () {

	};

	back () {
		this.$router.back();
	};

	sure_edit () {

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
				text-align: right;
				font-size: 0.95rem;
			}

			p {
				font-size: 0.9rem;
				display: flex;
				align-items: center;

				.icon {
					color: #ccc;
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