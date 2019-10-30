<template>
	<div class="search">
		<div class="flex_center header">
			<div class="flex_center back">
				<svg class="icon" aria-hidden="true" @click='back'>
					<use xlink:href="#icon-arrow-right"></use>
				</svg>
			</div>
			<div class="flex_center input">
				<input type="text" v-model='search_text' placeholder="请输入你想搜索的商品" ref='search_input'>
				<svg class="icon search_icon" aria-hidden="true">
					<use xlink:href="#icon-sousuo"></use>
				</svg>
			</div>
			<div class="flex_center btn">
				<button @click='to_search'>搜索</button>
			</div>
		</div>
		<ul class="goods_list" v-if='search_list.length > 0'>
			<router-link :to="{ path: '/goods_details', query: { goods_id: item.goods_id } }" tag='li' class="flex_center" v-for='(item, index) in search_list' :key='item.goods_id'>
				<div class="flex_center goods_img">
					<img v-if='item.original_img' :src="'https://shop.technologyle.com' + item.original_img" alt="goods">
					<img v-if='!item.original_img' src="../../assets/imgs/default_goods_img.png" alt="goods">
				</div>
				<p class="flex_center">
					<span class="tag vip_span">会员</span>
					<i>{{ item.goods_name }}</i>
				</p>
				<p class="price">¥<i>{{ item.shop_price }}</i></p>
			</router-link>
		</ul>
		<div class="flex_center no_result" v-if='search_list.length <= 0'>
			<img src="../../assets/imgs/search_no_result.png" alt="result">
			<p>暂无商品</p>
		</div>
		
	</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
	components: {

	}
})

export default class search extends Vue{
	private search_text: any = '';
	private search_list: any = [];

	to_search () {
		var that = this;
		var data = {
			type: 1,
			search: this.search_text
		};
		this.$store.dispatch('to_search', data).then((res) => {
			console.log('搜索结果', res);
			if (res.status == 1) {
				that.search_list = res.result;
			}
		});
	}

	created () {

	};
	mounted () {
		var that = this;
		var search_input_ref: any = this.$refs.search_input;
		search_input_ref.focus();
	};

	back () {
		this.$router.back();
	}
}
</script>

<style lang="scss" scoped>
	
	.header {
		justify-content: unset;
		background-color: #fff;
		height: 50px;
		margin-bottom: 2px;

		.back {
			width: 10%;

			.icon {
				width: 25px;
				height: 25px;
			}
		}

		.input {
			width: 70%;
			position: relative;
			
			input {
				width: 100%;
				color: #666;
				height: 35px;
				border: 1px solid #FAFAFA;
				padding: 0 20px 0 38px;
				border-radius: 5px;
			}

			.search_icon {
				position: absolute;
				color: #ccc;
				width: 20px;
				height: 20px;
				top: 50%;
				left: 10px;
				transform: translateY(-50%);
			}
		}

		.btn {
			width: 20%;

			button {
				font-size: 0.9rem;
				border: 1px solid #E6E6E6;
				color: #5D5860;
				width: 58px;
				height: 37px;
				text-align: canter;
				line-height: 35px;
				background-color: transparent;
			}
		}
	}

</style>