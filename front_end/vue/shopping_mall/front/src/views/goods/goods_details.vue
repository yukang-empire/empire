<template>
	<div class="home">
		<div class="header_public">
			<div class="flex_center back">
				<svg class="icon" aria-hidden="true" @click='back'>
					<use xlink:href="#icon-arrow-right"></use>
				</svg>
			</div>
			<h3 class="flex_center">商品详情</h3>
		</div>
		<div class="article">
			<swiper_imgs :swiper_data='swiper_data'></swiper_imgs>
			<div class="goods_details">
				<h3>
					<span v-if='goods_info.shop_type == 1' class="tag vip_span">会员</span>
					<span v-if='goods_info.shop_type == 2' class="tag yx_span">优选</span>
					<span v-if='goods_info.shop_type == 3' class="tag motion_span">运动</span>
					<i>{{ goods_info.goods_name }}</i>
				</h3>
				<p class="goods_name">{{ goods_info.goods_remark }}</p>
				<p class="goods_price">￥<span>{{ goods_info.shop_price }}</span></p>
				<p class="goods_discount">本级折扣价：￥<span>{{ total_account }}</span></p>
			</div>
		</div>
		<div class="flex_between select_goods" @click='is_buy_dialog=true'>
			<span>请选择规格 / 数量</span>
			<svg class="icon" aria-hidden="true" @click='back'>
				<use xlink:href="#icon-you"></use>
			</svg>
		</div>
		<div class="footer">
			<h3 class="flex_center">
				<i></i>
				<span>商品细节</span>
			</h3>
			<div class="goods_imgs_list" v-html='goods_info.goods_content'>
				
			</div>
		</div>
		<div class="bottom_btn">
			<button class="fixed_bottom" @click='to_buy' style="z-index: 10;" v-if='is_hidden_btn'>立即购买</button>
		</div>

		<!-- 选择商品 -->
		<transition name='fade'>
			<div class="fixed_top diy_dialog" v-if='is_buy_dialog' @click.self='show_dialog'></div>
		</transition>
		<transition name='fold'>
			<div class="fixed_bottom diy_dialog_main" v-if='is_buy_dialog' style="z-index: 99;">
				<div class="goods_info">
					<div>
						<img v-if='goods_info.original_img' :src="'https://shop.technologyle.com' + goods_info.original_img" alt="goods">
						<img v-if='!goods_info.original_img' src="../../assets/imgs/search_no_result.png" alt="goods">
					</div>
					<div class="dialog_title">
						<p class="dialog_name">
							<span v-if='goods_info.shop_type == 1' class="tag vip_span">会员</span>
							<span v-if='goods_info.shop_type == 2' class="tag yx_span">优选</span>
							<span v-if='goods_info.shop_type == 3' class="tag motion_span">运动</span>
							<i>{{ goods_info.goods_name }}</i>
						</p>
						<p class="dialog_price">￥{{ goods_info.shop_price }}</p>
					</div>
					<svg class="icon" aria-hidden="true" @click='show_dialog'>
						<use xlink:href="#icon-1"></use>
					</svg>
				</div>
				<div class="dialog_specs" v-if='filter_spec[0]'>
					<h3>{{ filter_spec[0].key_name }}</h3>
					<ul>
						<li v-for='(item, index) in filter_spec[0].key_value' :key='item.item_id' :class="{select_li: size_index == index}" @click='select_size(index, item.item_id)'>{{ item.item }}</li>
					</ul>
				</div>
				<div class="dialog_specs" v-if='filter_spec[1]'>
					<h3>{{ filter_spec[1].key_name }}</h3>
					<ul>
						<li v-for='(item, index) in filter_spec[1].key_value' :key='item.item_id' :class="{select_li: color_index == index}" @click='select_color(index, item.item_id)'>{{ item.item }}</li>
					</ul>
				</div>
				<div class="flex_between dialog_num">
					<h3>数量</h3>
					<div class="flex_center add_reduce">
						<img @click='reduce' src="../../assets/imgs/reduce_icon.png" alt="reduce">
						<span>{{ goods_parameter.goods_num }}</span>
						<img @click='add' src="../../assets/imgs/add_icon.png" alt="add">
					</div>
				</div>
				<div class="bottom_btn">
					<button @click='sure_buy' style="z-index: 999;">确定购买</button>
				</div>
			</div>
		</transition>

		<!-- 文字提示 -->
		<transition name='fade'>
			<div class="text_tip" v-if='text_tip.is_open'>{{ text_tip.msg }}</div>
		</transition>

	</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import swiper_imgs from '@/components/swiper_imgs.vue';

@Component({
	components: {
		swiper_imgs
	}
})

export default class home extends Vue{
	private swiper_data: any = {
		options: {
			pagination: {
				el: '.swiper-pagination'
			},
			autoplay: {
				delay: 5000,
				disableOnInteraction: false
			},
			loop: true,
			slidesPerView: 'auto'
		},
		imgs: []
	};
	//文字轻提示
	private text_tip: any = {
		is_open: false,
		msg: '111',
		can_click: true
	};
	private is_hidden_btn: any = true;
	//打开商品选择弹窗
	private is_buy_dialog: any = false;
	//商品信息
	private goods_info: any = {};
	private total_account: any = null;
	private filter_spec: any = null;
	//选择规格
	private size_index: any = 0;
	private color_index: any = 0;
	//生成订单 需要的参数
	private goods_parameter: any = {
		goods_id: '',
		goods_num: 1,
		item_id: '',
		address_id: '',
		size: '',
		color: ''
	};
	
	private device: any = {
		is_android: null,
        is_ios: null
	};

	created () {

	};
	mounted () {
		var that = this;
		
		//判断浏览器终端类型
		var agent: any = navigator.userAgent;
		//Android终端
		this.device.is_android = agent.indexOf('Android') != -1 || agent.indexOf('Adr') != -1 || agent.indexOf('Linux') != -1;
		//IOS终端
		this.device.is_ios = !!agent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
		
		var query = this.$route.query;
		sessionStorage.setItem('goods_id', query.goods_id);
		//请求数据
		var http_data = {
			goods_id: query.goods_id
		};
		this.goods_parameter.goods_id = query.goods_id;
		this.$store.dispatch('get_goods_details', http_data).then((res) => {
			console.log('商品详情', res);
			if (res.status == 1) {
				this.total_account = res.result.total_account;
				this.goods_info = res.result.goods;
				if (this.goods_info.goods_content) {
					this.goods_info.goods_content = this.goods_info.goods_content.replace(/&(?!#?\w+;)/g, '&amp;').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, "\"").replace(/&#39;/g, "\'");
				}else {
					this.goods_info.goods_content = ''; 
				}; 
				if (res.result.goods.goods_images && res.result.goods.goods_images.length > 0) {
					this.swiper_data.imgs = res.result.goods.goods_images;
				};
				this.filter_spec = res.result.filter_spec;
				this.goods_parameter.size = this.filter_spec[0].key_value[0].item_id;
				this.goods_parameter.color = this.filter_spec[1].key_value[0].item_id;
				this.goods_parameter.item_id = this.goods_parameter.size + '_' + this.goods_parameter.color;
				console.log('goods_parameter', this.goods_parameter);
				console.log('goods_num', this.goods_parameter.goods_num);
			};
		});
	};

	back () {
		if (sessionStorage.getItem('token')) {
			var token = sessionStorage.getItem('token');
			window.location.href = 'https://shop.technologyle.com/shoppingMall/index.html#/index?token=' + token;
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

	//立即购买
	to_buy () {
		var that = this;
		this.is_hidden_btn = false;
		this.is_buy_dialog = true;
		setTimeout(() => {
			that.is_hidden_btn = true;
		}, 500);
	};

	show_dialog () {
		this.is_buy_dialog = false;
		this.is_hidden_btn = true;
	};

	// 与IOS原生APP交互相关 必须要有
    setupWebViewJavascriptBridge (callback: any) {
		console.log(window);
        if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); };
        if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); };
        window.WVJBCallbacks = [callback];
        var WVJBIframe = document.createElement('iframe');
        WVJBIframe.style.display = 'none';
        WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
        document.documentElement.appendChild(WVJBIframe);
        setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0);
    };

	//确定购买
	sure_buy () {
		var token = sessionStorage.getItem('token') || '';
		if (!token) {
			var that = this;
			var data = {};
			//ios终端
			if (this.device.is_ios) {
				this.setupWebViewJavascriptBridge( function(bridge: any) {
					//toLogin为事先与ios开发人员约好的函数名 data为发送过去的数据 response为ios那边返回的数据
					bridge.callHandler('toLogin', data, function(response: any) {
						
					});
				});
			}
			//android终端
			else if (this.device.is_android) {
				//toLogin为事先与android终端开发人员约好的函数名 data_json为发送过去的数据(一般建议转成JSON.stringify字符串)
				//把安卓返回的数据装起来
				window.jsInterface.toLogin();
			};
		}else {
			sessionStorage.setItem('goods_parameter', JSON.stringify(this.goods_parameter));
			this.$router.push({ path: '/order_sure' });

		}
	};

	//选择尺寸
	select_size(index: any, id: any) {
		this.size_index = index;
		this.goods_parameter.size = id;
		this.goods_parameter.item_id = id + '_' + this.goods_parameter.color;
		console.log(this.goods_parameter.item_id);
	};

	//选择颜色
	select_color(index: any, id: any) {
		this.color_index = index;
		this.goods_parameter.color = id;
		this.goods_parameter.item_id = this.goods_parameter.size + '_' + id;
		console.log(this.goods_parameter.item_id);
	};

	//数量增减
	reduce () {
		if (this.goods_parameter.goods_num <= 1) {
			this.open_text_tip('至少要购买一件!');
		}else {
			this.goods_parameter.goods_num --;
		};
	};
	add () {
		if (this.goods_parameter.goods_num >= this.goods_info.store_count) {
			this.open_text_tip('库存不足!');
		}else {
			this.goods_parameter.goods_num ++;
		};
	};

}
</script>

<style lang="scss" scoped>

	.article {
		margin-top: 1px;
		background-color: #fff;
		
		.goods_details {
			padding: 10px 20px 15px 20px;

			h3 {
				display: flex;
				align-items: center;
				font-size: 1.2rem;
				line-height: 1.4;
				margin-bottom: 8px;

				i {
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}

			.goods_name {
				color: #999999;
				line-height: 1.4;
				font-size: 0.95rem;
			}

			.goods_price {
				color: $price_color;
				font-size: 1.3rem;
				margin-top: 12px;
				line-height: 1.3;
			}

			.goods_discount {
				color: #31BFAD;
				font-size: 1rem;
			}
		}
	}

	.select_goods {
		margin: 15px 0;
		background-color: #fff;
		padding: 10px 20px;
		color: #666666;

		.icon {
			color: #ccc;
		}
	}

	.footer {
		padding-bottom: 65px;

		h3 {
			background-color: #fff;
			padding: 10px 20px;
			margin-bottom: 1px;
			font-size: 1rem;
			justify-content: unset;

			i {
				display: inline-block;
				width: 5px;
				height: 17px;
				background-color: $btn_color;
				margin-right: 8px;
			}
		}

		.goods_imgs_list {
			background-color: #fff;

			img {
				display: block;
			}
		}
	}

	.diy_dialog_main {
		padding-bottom: 50px;

		.goods_info {
			margin: 20px 15px;
			display: flex;
			align-items: center;
			position: relative;
			padding-bottom: 15px;
			border-bottom: 1px solid #E6E6E6;

			img {
				width: 70px;
				margin-right: 10px;
			}

			.dialog_title {
				max-width: 70%;
				
				.dialog_name {
					margin-bottom: 8px;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;

					span {
						font-weight: 900;
						margin-left: 5px;
					}
				}
			}

			.icon {
				position: absolute;
				top: -7px;
   	 			right: 0px;
				width: 1rem;
			}

			.dialog_price {
				color: $price_color;
				font-weight: 900;
				font-size: 1.1rem;
			}
		}

		.dialog_specs {
			display: flex;
			margin: 20px 15px;
			padding-bottom: 20px;
			color: #666666;
			border-bottom: 1px solid #E6E6E6;

			h3 {
				margin: 0 15px 0 0;
				white-space: nowrap;
			}

			ul {
				display: flex;
				flex-wrap: wrap;

				li {
					background-color: #F5F5F5;
					padding: 0 10px;
					border-radius: 5px;
					height: 35px;
					line-height: 35px;
					margin: 0 6px 0 6px;
				}

				.select_li {
					background-color: transparent;
					border: 1px solid $btn_color;
					color: $btn_color;
					height: 33px;
					line-height: 33px;
				}
			}
		}
		
		.dialog_num {
			margin: -6px 15px 0 15px;

			.add_reduce {
				
				span {
					margin: 0 15px;
				}

				img {
					width: 30px;
				}
			}
		}

	}

</style>