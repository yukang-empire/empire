<template>
	<div class="gym_info">
		<div style="margin: 0 15px">
			<swiper :indicator-dots="club_slide.is_dots" :autoplay="club_slide.is_auto" :interval="club_slide.interval" :duration="club_slide.duration" :circular='club_slide.circular'>
				<block v-for="(item, index) in club_slide.banners" :key='index'>
					<swiper-item>
						<img :src="'https://shop.technologyle.com' + item" class="slide_banners" alt="banner" mode='widthFix'/>
					</swiper-item>
				</block>
			</swiper>
		</div>
		<h2 class="club_name">{{ info_data.club_name }}</h2>
		<div class="flex_between item_address">
			<div class="club_address">
				<img class="ico_img" src="../../../../static/imgs/address_icon.png" alt="">
				<span>{{ info_data.province + info_data.city + info_data.area + info_data.address }}</span>
			</div>
			<div class="flex_center tel">
				<img class="tel_icon" src="../../../../static/imgs/phone_ico.png" @click='call_phone' alt="" mode='widthFix'>
			</div>
		</div>
		<div class="club_service">
			<img class="ico_img" src="../../../../static/imgs/store_ico.png" alt="" mode="widthFix">
			<span class="service_time">门店服务<i style="color: #999;">（{{ info_data.open_time }} ）</i></span>
		</div>
		<div class="flex_between card_title">
			<div class="card_title_list">
				<img class="ico_img" src="../../../../static/imgs/card_icon.png" alt="" mode="widthFix">
				<span>健身列表</span>
			</div>
			<div class="card_title_right">
				<img class="refund" src="../../../../static/imgs/refund.png" alt="" mode='widthFix'>
				<span>随时退</span>
			</div>
		</div>
		<div class="card_lists">
			<ul>
				<li class="flex_between item_lists" v-for='item in card_lists' :key='item.goods_id' @click='submit_order(item)'>
					<div class="item_lists_left">
						<i class="card_type">{{ item.virtual_type }}</i>
						<span class="card_name">{{ item.goods_name }}</span>
						<img @click.stop='show_dialog(item.is_gift)' class="czhl" src="../../../../static/imgs/czhl.png" alt="" mode="widthFix" v-if='item.is_gift != 0'>
					</div>
					<div class="item_lists_right">
						<span class="item_lists_price">¥{{ item.shop_price }}</span>
						<button class="item_lists_button">购买</button>
					</div>
				</li>
			</ul>
		</div>
		<div class="store_introduce">
			<div class="introduce_title">
				<img class="ico_img" src="../../../../static/imgs/company_icon.png" alt="" mode="widthFix">
				<span>门店介绍</span>
			</div>
			<div class="introduce_content">{{ info_data.content }}</div>
		</div>
		<div class="store_introduce step">
			<div class="introduce_title">
				<img class="ico_img" src="../../../../static/imgs/step_icon.png" alt="" mode="widthFix">
				<span>健身步骤</span>
			</div>
			<div class="introduce_content">
				<img class="step_img" src="../../../../static/imgs/step.png" alt="" mode="widthFix">
			</div>
		</div>
		<!-- 弹框 -->
		<transition name="fade">
		<div class="dialog_gift" v-if='is_dialog' @click='close_dialog'>
			<div class="dialog_main" @click.stop='is_dialog = true'>
				<div class="dialog_top">
					<img class="dialog_top_img" src="../../../../static/imgs/thnk.png" alt="" mode='widthFix' v-if='card_num == 1'>
					<img class="dialog_top_img" src="../../../../static/imgs/thxsk.png" alt="" mode='widthFix' v-if='card_num == 2'>
					<div class="dialog_top_div">
						<p class="dialog_top_p1" v-if='card_num == 1'>特惠年卡</p>
						<p class="dialog_top_p1" v-if='card_num == 2'>特惠学生卡</p>
						<p class="dialog_top_p2" v-if='card_num == 1'>售价：¥<span>1888</span> /年</p>
						<p class="dialog_top_p2" v-if='card_num == 2'>售价：¥<span>1500</span> /年</p>
					</div>
				</div>
				<div class="dialog_middle">
					<div class="dialog_middle_title">
						<div class="dialog_middle_border"></div>
						<span>会员活动特惠福利</span>
					</div>
					<ul class="dialog_middle_ul" v-if='card_num == 1'>
						<li><span>1. 赠送 316元：2个月健身会期</span></li>
						<li><span>2. 赠送1980元：共20张请客健身周卡</span></li>
						<li>
							<span>3. 赠送 3300元：超值礼品</span>
							<ul class="dialog_middle_ul_ul">
								<li>￥ 1980 高档空气净化器一台</li>
								<li>￥ 899 挂烫机一台</li>
								<li>￥ 498 冰丝床上用品三件套一套</li>
								<li>￥ 398 高端胶原营养面膜两盒</li>
							</ul>
						</li>
					</ul>
					<ul class="dialog_middle_ul" v-if='card_num == 2'>
						<li><span>1. 赠送 250元：2个月健身会期</span></li>
						<li><span>2. 赠送1980元：共10张请客健身周卡</span></li>
						<li><span>3. 赠送  456 元：(男士+女士) 青春版面膜一套</span></li>
						<li>
							<span>4. 赠送 3300元：学费现金抵用券</span>
							<ul class="dialog_middle_ul_ul">
								<li>￥ 800 专插本抵用券（总价：3980元）</li>
								<li>￥1500专升本抵用券（总价：9800元）</li>
								<li>￥ 300 教师资格证考试抵用券（总价：1450元）</li>
								<li>￥ 800 驾校报名抵用券（总价：5680元）</li>
							</ul>
						</li>
						<li>
							<span>5. 获得总价值： 418元实体店消费抵用券大礼包</span>
							<ul class="dialog_middle_ul_ul">
								<li>￥ 38 鱼头消费券</li>
								<li>￥ 50 酒店住房抵用券</li>
								<li>￥ 330 KTV 4小时欢唱消费券</li>
							</ul>
						</li>
					</ul>
				</div>
				<div class="dialog_bottom">
					<p>附：所赠送的请客卡，每转化一个年卡会员，请客会员获得延期会籍一个月，最多10个月。</p>
				</div>
				<div class="close" @click.stop='close_dialog'>
					<img class="close_img" src="../../../../static/imgs/close.png" alt="" mode='widthFix'>
				</div>
			</div>
		</div>
		</transition>
	</div>
</template>

<script>
export default {
	data () {
		return {
			club_slide: {
				is_dots: true,
				is_auto: true,
				interval: 5000,
				duration: 1000,
				circular: true,
				banners: []
			},
			info_data: {},
			card_lists: [],
			is_dialog: false,
			card_num: 0
		}
	},
	components: {

	},
	methods: {
		//展示介绍弹框
		show_dialog (index) {
			this.is_dialog = true;
			this.card_num = index;
		},
		close_dialog () {
			this.is_dialog = false;
		},
		//拨打电话
		call_phone () {
			wx.makePhoneCall({
				phoneNumber: this.info_data.tel
			})
		},
		//跳转
		submit_order (item) {
			mpvue.navigateTo({ url: "../../gym/submit_order/main?goods_id=" + item.goods_id });
		}
	},
	mounted () {
		var that = this;
		const pages = getCurrentPages();
		const send_data = pages[pages.length - 1].options;
		// const send_data = {clubId: 209};
		//请求会所详情
		that.$store.dispatch("get_club_info", send_data).then( (res) => {
			if (res.data.status == 1) {
				console.log("会所详情", res.data.result);
				that.info_data = res.data.result.club;
				that.club_slide.banners = res.data.result.club.shop_image;
				that.card_lists = res.data.result.goods;
				var length = that.card_lists.length;
				for (var i = 0; i < length; i++) {
					switch (that.card_lists[i].virtual_type) {
						case 1: 
							that.card_lists[i].virtual_type = '单';
							break;
						case 2: 
							that.card_lists[i].virtual_type = '多';
							break;
						case 3: 
							that.card_lists[i].virtual_type = '月';
							break;
						case 4: 
							that.card_lists[i].virtual_type = '季';
							break;
						case 5: 
							that.card_lists[i].virtual_type = '半';
							break;
						case 6: 
							that.card_lists[i].virtual_type = '年';
							break;
						case 7: 
							that.card_lists[i].virtual_type = '私';
							break;
					};
				};
			}else {

			};
		});
	}
}
</script>

<style scoped>
	@import url("../../../styles/gym_info.css");
	
</style>