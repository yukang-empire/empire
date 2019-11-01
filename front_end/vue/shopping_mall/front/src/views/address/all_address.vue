<template>
	<div class="all_address">
		<div class="header_public">
			<div class="flex_center back">
				<svg class="icon" aria-hidden="true" @click='back'>
					<use xlink:href="#icon-arrow-right"></use>
				</svg>
			</div>
			<h3 class="flex_center">我的地址</h3>
		</div>
		<ul class="address_list" v-if='address_list.length > 0'>
			<li class="flex_between" v-for='(item, index) in address_list' :key='item.address_id'>
				<div class="content" @click='set_default(item.address_id)'>
					<div class="name">
						<p>{{ item.consignee }}</p>
						<i class='tag' v-if='item.is_default == 1'>默认</i>
					</div>
					<div class="address_info">
						<i>{{ item.mobile }}</i>
						<p>{{ item.province + item.city + item.district + item.twon + item.address }}</p>
					</div>
				</div>
				<div class="flex_center icon"><img @click='edit_address(item.address_id)' src="../../assets/imgs/edit_icon.png" alt="edit"></div>
			</li>
		</ul>
		<div v-if='address_list.length <= 0' class="no_address">
			<p>暂无地址，请新增</p>
		</div>
		<div class="bottom_btn" @click='add_address'>
			<button>+ 新建收货地址</button>
		</div>

		<!-- 文字提示 -->
		<transition name='fade'>
			<div class="text_tip" v-if='text_tip.is_open'>{{ text_tip.msg }}</div>
		</transition>
	</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
	components: {

	}
})

export default class all_address extends Vue{
	private address_list: any = [];
	private text_tip: any = {
		is_open: false,
		msg: '',
		can_click: true
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
	
	created () {

	};
	mounted () {
		this.get_all_address();
	};

	get_all_address () {
		var that = this;
		//获取所有地址
		this.$store.dispatch('get_all_address').then((res) => {
			console.log('所有地址', res);
			if (res.status == 1) {
				that.address_list = res.result;
			};
		});
	}

	back () {
		this.$router.push({ path: '/order_sure' });
	};

	add_address () {
		sessionStorage.removeItem('address_data');
		this.$router.push({ path: '/add_address' });
	};

	edit_address (id) {
		var that = this;
		for (var i = 0; i < this.address_list.length; i++) {
			if (this.address_list[i].address_id == id) {
				var address_data = JSON.stringify(this.address_list[i]);
				sessionStorage.setItem('address_data', address_data);
				this.$router.push({ path: '/edit_address', query: {address_id: id} });
			};
		};
	};
	//设为默认地址
	set_default (id) {
		var that = this;
		for (var i = 0; i < this.address_list.length; i++) {
			if (this.address_list[i].address_id == id) {
				console.log(this.address_list[i]);
				this.address_list[i].is_default = 1;
				this.$store.dispatch('edit_address', this.address_list[i]).then((res) => {
					console.log('编辑地址', res);
					if (res.status == 1) {
						that.open_text_tip('切换成功!');
						this.get_all_address();
					};
				});
			};
		};
	}
	
}
</script>

<style lang="scss" scoped>

	.no_address {
		margin: 100px 0 0 0;
		text-align: center;
		color: #ccc;
	}

	.address_list {
		margin-bottom: 70px;

		li {
			background-color: #fff;
			margin: 0 0 1px 0;
			padding: 12px 20px 12px 25px;

			.content {
				display: flex;
				width: 85%;

				.name {
					min-width: 25%;
					font-weight: 900;

					i.tag {
						height: 20px;
						line-height: 20px;
						border-radius: 5px;
						background-color: #31BFAD;
					}
				}

				.address_info {
					max-width: 75%;
					color: #666;

					p {
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						margin-top: 5px;
					}
				}
			}

			.icon {
				min-width: 15%;
				height: 100%;
				justify-content: flex-end;
				
				img {
					width: 20px;
				}
			}
		}
	}
</style>