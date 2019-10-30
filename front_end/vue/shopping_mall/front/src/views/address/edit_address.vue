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
				<input type="text" placeholder="请输入收货人姓名" v-model='address_data.consignee'>
			</li>
			<li>
				<span>手机号码</span>
				<input type="text" placeholder="请输入联系电话" v-model='address_data.mobile' @input='limit_input'>
			</li>
			<li>
				<span>所在地区</span>
				<p @click='is_address_dialog=true'>
					<span :class="{is_final_address: final_address }">{{ final_address ? final_address : '请选择所在地区' }}</span>
					<svg class="icon" aria-hidden="true">
						<use xlink:href="#icon-you"></use>
					</svg>
				</p>
			</li>
			<li>
				<span>详细地址</span>
				<input type="text" placeholder="请输入详细地址" v-model='address_data.address'>
			</li>
		</ul>

		<div class="flex_between set_default">
			<span>设为默认地址</span>
			<el-switch v-model="is_default_address" @change='if_default' active-color="#31BFAD" inactive-color="#ccc"></el-switch>
		</div>

		<div class="bottom_btn">
			<button @click='sure_edit'>确定编辑</button>
		</div>

		<transition name='fade'>
			<div class="fixed_top diy_dialog address_dialog" v-if='is_address_dialog'>
				<div class="ad_center fixed_center diy_dialog_main">
					<h3>请选择地址</h3>
					<p_c_a_s
					:form='address_data'
					@change_p="change_p"
					@change_c="change_c"
					@change_a='change_a'
					/>
					<div class="btn">
						<button @click='select_address'>确定</button>
					</div>
				</div>
			</div>
		</transition>

		<!-- 文字提示 -->
		<transition name='fade'>
			<div class="text_tip" v-if='text_tip.is_open'>{{ text_tip.msg }}</div>
		</transition>

		<!-- <div class="fixed_top diy_dialog address_dialog" v-if='is_address_dialog'>
			<div class="fixed_bottom diy_dialog_main">
				<div class="flex_center address_title">
					<span>取消</span>
					<i>地区选择</i>
					<span>确认</span>
				</div>
				
				<div class="flex_center address_list">
					<div class="item province">
						<ul>
							<li>山东省</li>
							<li>江苏省</li>
							<li>广东省</li>
							<li>浙江省</li>
							<li>山东省</li>
						</ul>
					</div>
					<div class="line"></div>
					<div class="item city">
						<ul>
							<li>山东省</li>
							<li>江苏省</li>
							<li>广东省</li>
							<li>浙江省</li>
							<li>山东省</li>
						</ul>
					</div>
					<div class="line"></div>
					<div class="item district">
						<ul>
							<li>山东省</li>
							<li>江苏省</li>
							<li>广东省</li>
							<li>浙江省</li>
							<li>山东省</li>
						</ul>
					</div>
				</div>
			</div>
		</div> -->

	</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
//省-市-区-街道
import p_c_a_s from "@/components/p_c_a_s.vue";

@Component({
	components: {
		p_c_a_s
	}
})

export default class add_address extends Vue{
	private address_data: any = {
		province: '',
		city: '',
		district: '',
		address: '',
		all_address: '',
		consignee: '',
		mobile: '',
		is_default: '',
	};
	private is_address_dialog: any = false;
	private is_default_address: any = false;
	private final_address: any = null;
	private text_tip: any = {
		is_open: false,
		msg: '',
		can_click: true
	};

	//开关
	if_default (val) {
		console.log(val);
		if (val) {
			this.address_data.is_default = 1;
		}else {
			this.address_data.is_default = 0;
		};
	};
	//打开轻提示
	open_text_tip (text: any) {
		if (this.text_tip.can_click) {
			this.text_tip.can_click = false;
			this.text_tip.is_open = true;
			this.text_tip.msg = text;
			setTimeout(() => {
				this.text_tip.can_click = true;
				this.text_tip.is_open = false;
				this.text_tip.msg = '';
			}, 1500);
		}else {
			return false;
		};
	};

	//选择完地址
	select_address () {
		console.log(this.address_data);
		this.is_address_dialog = false;
		this.final_address = this.address_data.province + this.address_data.city + this.address_data.district;
	};

	//选择省
	change_p (province) {
		this.address_data.province = province;
		this.address_data.address = '';
		//储存起来是为了验证
		sessionStorage.setItem('address_data', JSON.stringify(this.address_data));
		this.final_address = this.address_data.province;
	};

	//改变市 筛选区
	change_c (city) {
		this.address_data.city = city;
		sessionStorage.setItem('address_data', JSON.stringify(this.address_data));
		this.final_address = this.address_data.province + this.address_data.city;
	};

	//改变区 筛选街道
	change_a (district) {
		this.address_data.district = district;
		sessionStorage.setItem('address_data', JSON.stringify(this.address_data));
		this.final_address = this.address_data.province + this.address_data.city + this.address_data.district;
	};


	back () {
		this.$router.back();
	};
	
	//禁止输入中文
	limit_input () {
		this.address_data.mobile = this.address_data.mobile.replace(/[^\d]/g, '');
	};

	sure_edit () {
		var that = this;
		console.log('地址信息', this.address_data);
		this.address_data.address_id = this.$route.query.address_id;
		sessionStorage.setItem('address_data', JSON.stringify(this.address_data));
		this.$store.dispatch('edit_address', this.address_data).then((res) => {
			console.log('编辑地址', res);
			if (res.status == 1) {
				that.open_text_tip('编辑成功!');
				setTimeout(() => {
					that.$router.push({ path: '/all_address' });
				}, 1000);
			};
		});
	}
	
	created () {

	};
	mounted () {
		console.log(this.$route.query);
		if (sessionStorage.getItem('address_data')) {
			this.address_data = JSON.parse(sessionStorage.getItem('address_data'));
			this.final_address = this.address_data.province + this.address_data.city + this.address_data.district;
			if (this.address_data.is_default && this.address_data.is_default == 1) {
				this.is_default_address = true;
			};
		};
	};
}
</script>

<style lang="scss" scoped>

	.address_dialog {

		.diy_dialog_main {
			height: auto;
			top: 45%;
			width: 80%;
			border-radius: 10px;

			h3 {
				text-align: center;
				padding: 15px 0 20px 0;
			}

			.btn {
				
				button {
					width: 80%;
					margin: 10px 10% 25px 10%;
					height: 43px;
					line-height: 43px;
					border-radius: 5px;
					background-color: $btn_color;
					color: #fff;
				}
			}
		}
	}

	/* .address_dialog {

		.diy_dialog_main {
			height: auto;

			.address_title {
				justify-content: space-between;
				background-color: $btn_color;
				color: #097D6E;
				padding: 0 20px;
				height: 45px;

				i {
					color: #fff;
				}
			}

			.address_list {
				height: 175px;

				.line {
					width: 1px;
					height: 70%;
					background: linear-gradient(#ccc3, #ccc, #ccc3);
				}

				.item {
					width: 33%;
					text-align: center;

					li:nth-of-type(1) {
						color: #F0F0F0;
						font-size: 0.8rem;
					}
					li:nth-of-type(2) {
						color: #CCCCCC;
						font-size: 0.9rem;
					}
					li:nth-of-type(3) {
						color: #333333;
						font-size: 1rem;
					}
					li:nth-of-type(4) {
						color: #CCCCCC;
						font-size: 0.9rem;
					}
					li:nth-of-type(5) {
						color: #F0F0F0;
						font-size: 0.8rem;
					}
				}
			}
		}
	} */
	
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
				max-width: 70%;

				.icon {
					width: 1.2rem;
					height: 1.2rem;
					margin-left: 5px;
				}

				span {
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}

				.is_final_address {
					color: #333;
					font-size: 1rem;
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