<template>
  <div class="order">
	<div class="order_top_nav" :style="{height: top_nav_data + 'px'}">
		<div class="to_right" @click='back_my'>
			<img class="right_img" src="../../../../static/imgs/right.png" alt="">
		</div>
		<div class="order_title">
			<ul class="flex_center title_ul">
				<li class="title_li" :class="{active_li: switch_index == 1}" @click='switch_li(1)'>服务订单</li>
				<!-- <li class="title_li" :class="{active_li: switch_index == 2}" @click='switch_li(2)'>转让订单</li> -->
				<li class="title_li" :class="{active_li: switch_index == 3}" @click='switch_li(3)'>商城订单</li>
			</ul>
		</div>
	</div>
	<div class="article" :style="{marginTop: top_nav_data + 'px'}">
		<!-- 服务订单 -->
		<div v-if='switch_index == 1'>
			<van-tabs animated swipeable :active="status_index" color='#31BFAD' line-width='35' @change='onChange'>
				<van-tab title-style="color: #999999" title="全部订单">
					<div class="order_li" v-for='item in orders.all' :key='item.id' v-if='orders.all.length > 0'>
						<div class="flex_between li_title">
							<span>健身</span>
							<span>有效期：<span class="li_deadline">{{ item.end_time }}</span></span>
						</div>
						<div class="flex_between li_order_num">
							<div>
								<p class="li_order_id">{{ item.order_sn }}</p>
								<p class="li_order_time">下单时间：<span>{{ item.create_time }}</span></p>
							</div>
						</div>
						<div class="li_order_info">
							<div class="flex_between li_title02">
								<span>{{ item.goods_name }}</span>
								<span class="li_price">{{ item.goods_price }}元</span>
							</div>
							<div class="li_order_name">
								<img class="order_ico" src="../../../../static/imgs/store_ico.png" alt="">
								<span>{{ item.club_name }}</span>
							</div>
							<div class="li_order_address">
								<img class="order_ico_address" src="../../../../static/imgs/address_icon.png" alt="">
								<span>{{ item.province + item.city + item.area + item.address }}</span>
							</div>
							<div class="flex_between li_order_btn">
								<div class="flex_center cancel_btn" @click='cancel_order(item.id)'>取消订单</div>
								<div class="flex_center QR_code_btn" @click='look_QR_code(item.code, item.order_sn)'>
									<img class="QR_ico" src="../../../../static/imgs/QR_code.png" alt="">
									<span class="QR_code">二维码</span>
								</div>
							</div>
						</div>
					</div>
					<div class="flex_center no_order_div" v-if='orders.all.length <= 0'>
						<img class="no_order_img" src="../../../../static/imgs/no_order.png" alt="" mode='widthFix'>
						<p>暂无数据</p>
					</div>
				</van-tab>
				<van-tab title-style="color: #999999" title="进行中">
					<div class="order_li" v-for='item in orders.ing' :key='item.id' v-if='orders.ing.length > 0'>
						<div class="flex_between li_title">
							<span>健身</span>
							<span>有效期：<span class="li_deadline">{{ item.end_time }}</span></span>
						</div>
						<div class="flex_between li_order_num">
							<div>
								<p class="li_order_id">{{ item.order_sn }}</p>
								<p class="li_order_time">下单时间：<span>{{ item.create_time }}</span></p>
							</div>
						</div>
						<div class="li_order_info">
							<div class="flex_between li_title02">
								<span>{{ item.goods_name }}</span>
								<span class="li_price">{{ item.goods_price }}元</span>
							</div>
							<div class="li_order_name">
								<img class="order_ico" src="../../../../static/imgs/store_ico.png" alt="">
								<span>{{ item.club_name }}</span>
							</div>
							<div class="li_order_address">
								<img class="order_ico_address" src="../../../../static/imgs/address_icon.png" alt="">
								<span>{{ item.province + item.city + item.area + item.address }}</span>
							</div>
							<div class="flex_between li_order_btn">
								<div class="flex_center cancel_btn" @click='cancel_order(item.id)'>取消订单</div>
								<div class="flex_center QR_code_btn" @click='look_QR_code(item.code, item.order_sn)'>
									<img class="QR_ico" src="../../../../static/imgs/QR_code.png" alt="">
									<span class="QR_code">二维码</span>
								</div>
							</div>
						</div>
					</div>
					<div class="flex_center no_order_div" v-if='orders.ing.length <= 0'>
						<img class="no_order_img" src="../../../../static/imgs/no_order.png" alt="" mode='widthFix'>
						<p>暂无数据</p>
					</div>
				</van-tab>
				<van-tab title-style="color: #999999" title="已完成">
					<div class="order_li" v-for='item in orders.complete' :key='item.id' v-if='orders.complete.length > 0'>
						<div class="flex_between li_title gray">
							<span>健身</span>
							<span>有效期：<span class="li_deadline">{{ item.end_time }}</span></span>
						</div>
						<div class="flex_between li_order_num gray">
							<div>
								<p class="li_order_id">{{ item.order_sn }}</p>
								<p class="li_order_time">下单时间：<span>{{ item.create_time }}</span></p>
							</div>
							<img class="status_img" src="../../../../static/imgs/order_wc.png" alt="" mode='widthFix'>
						</div>
						<div class="li_order_info gray">
							<div class="flex_between li_title02">
								<span>{{ item.goods_name }}</span>
								<span class="li_price">{{ item.goods_price }}元</span>
							</div>
							<div class="li_order_name">
								<img class="order_ico" src="../../../../static/imgs/store_ico.png" alt="">
								<span>{{ item.club_name }}</span>
							</div>
							<div class="li_order_address">
								<img class="order_ico_address" src="../../../../static/imgs/address_icon.png" alt="">
								<span>{{ item.province + item.city + item.area + item.address }}</span>
							</div>
						</div>
					</div>
					<div class="flex_center no_order_div" v-if='orders.complete.length <= 0'>
						<img class="no_order_img" src="../../../../static/imgs/no_order.png" alt="" mode='widthFix'>
						<p>暂无数据</p>
					</div>
				</van-tab>
				<van-tab title-style="color: #999999" title="已退款">
					<div class="order_li" v-for='item in orders.refund' :key='item.id' v-if='orders.refund.length > 0'>
						<div class="flex_between li_title gray">
							<span>健身</span>
							<span>有效期：<span class="li_deadline">{{ item.end_time }}</span></span>
						</div>
						<div class="flex_between li_order_num gray">
							<div>
								<p class="li_order_id">{{ item.order_sn }}</p>
								<p class="li_order_time">下单时间：<span>{{ item.create_time }}</span></p>
							</div>
							<img class="status_img" src="../../../../static/imgs/order_tk.png" alt="" mode='widthFix'>
						</div>
						<div class="li_order_info gray">
							<div class="flex_between li_title02">
								<span>{{ item.goods_name }}</span>
								<span class="li_price">{{ item.goods_price }}元</span>
							</div>
							<div class="li_order_name">
								<img class="order_ico" src="../../../../static/imgs/store_ico.png" alt="">
								<span>{{ item.club_name }}</span>
							</div>
							<div class="li_order_address">
								<img class="order_ico_address" src="../../../../static/imgs/address_icon.png" alt="">
								<span>{{ item.province + item.city + item.area + item.address }}</span>
							</div>
						</div>
					</div>
					<div class="flex_center no_order_div" v-if='orders.refund.length <= 0'>
						<img class="no_order_img" src="../../../../static/imgs/no_order.png" alt="" mode='widthFix'>
						<p>暂无数据</p>
					</div>
				</van-tab>
			</van-tabs>
		</div>
		<!-- 商城订单 -->
		<div v-if='switch_index == 3'>
			<van-tabs animated swipeable :active="status_index" color='#31BFAD' line-width='35'>
				<van-tab title-style="color: #999999" title="全部订单">
					<div class="flex_center no_order_div">
						<img class="no_order_img" src="../../../../static/imgs/no_order.png" alt="" mode='widthFix'>
						<p>暂无数据</p>
					</div>
				</van-tab>
				<van-tab title-style="color: #999999" title="进行中">
					<div class="flex_center no_order_div">
						<img class="no_order_img" src="../../../../static/imgs/no_order.png" alt="" mode='widthFix'>
						<p>暂无数据</p>
					</div>
				</van-tab>
				<van-tab title-style="color: #999999" title="已完成">
					<div class="flex_center no_order_div">
						<img class="no_order_img" src="../../../../static/imgs/no_order.png" alt="" mode='widthFix'>
						<p>暂无数据</p>
					</div>
				</van-tab>
				<van-tab title-style="color: #999999" title="已退款">
					<div class="flex_center no_order_div">
						<img class="no_order_img" src="../../../../static/imgs/no_order.png" alt="" mode='widthFix'>
						<p>暂无数据</p>
					</div>
				</van-tab>
			</van-tabs>
		</div>
	</div>
	<van-dialog id="van-dialog" />
	<van-toast id="van-toast" />
	<!-- 二维码弹窗 -->
	<div class="QR_code_dialog" v-if='is_dialog' @click.stop='is_dialog = false'>
		<div class="dialog_main" @click='is_dialog = true'>
			<h2 class="flex_center QR_code_h2">轻酷健身会所单次健身</h2>
			<div class="overflow_div">
				<div class="flex_center QR_code_div">
					<p class="QR_code_p">请出示二维码，扫码使用</p>
					<!-- <img class="QR_code_img" :src="imagePath" alt=""> -->
					<canvas style="width: 160px;height: 160px;margin-bottom: 15px;" canvas-id="mycanvas" />
					<div class="circle_left"></div>
					<div class="circle_right"></div>
				</div>
				<p class="QR_code_num">{{ dialog_sn }}</p>
			</div>
			<img class="circle_close" src="../../../../static/imgs/circle_close.png" alt="" @click='is_dialog = false'>
		</div>
	</div>
  </div>
</template>

<script>
import Toast from "../../../../static/vant/toast/toast";
import Dialog  from "../../../../static/vant/dialog/dialog";
import QRCode from "../../../../static/plugins/qrcode";

export default {
  data () {
    return {
		//顶部导航栏
		top_nav_data: '',
		switch_index: 1,
		status_index: 0,
		page: { 
			all: 1,
			complete: 1,
			refund: 1,
			ing: 1
		},
		orders: {
			all: [],
			complete: [],
			refund: [],
			ing: []
		},
		current_order_type: 0,
		my_data: null,
		is_dialog: false,
		imagePath: '',
		dialog_sn: ''
    }
  },

  components: {
	
  },
  //下拉刷新
  onPullDownRefresh () {
	wx.showToast({
      title: '正在刷新...',
      icon: 'loading',
      duration: 1500
	});
	var that = this;  
	switch (this.current_order_type) {
		case 0: 
			var send_data = {
				order_status: 0,
				p: 1,
				token: that.my_data.user_sn
			};
			that.get_transfer_order(send_data);
			break;
		case 1: 
			var send_data = {
				order_status: 1,
				p: 1,
				token: that.my_data.user_sn
			};
			that.get_transfer_order(send_data);
			break;
		case 2: 
			var send_data = {
				order_status: 2,
				p: 1,
				token: that.my_data.user_sn
			};
			that.get_transfer_order(send_data);
			break;
		case 3: 
			var send_data = {
				order_status: 3,
				p: 1,
				token: that.my_data.user_sn
			};
			that.get_transfer_order(send_data);
			break;
	};
	wx.stopPullDownRefresh();
  },
  //上拉加载
  onReachBottom () {
	var that = this;  
	switch (this.current_order_type) {
		case 0: 
			that.page.all ++;
			var send_data = {
				order_status: 0,
				p: that.page.all,
				token: that.my_data.user_sn
			};
			that.get_transfer_order(send_data);
			break;
		case 1: 
			that.page.ing ++;
			var send_data = {
				order_status: 1,
				p: that.page.ing,
				token: that.my_data.user_sn
			};
			that.get_transfer_order(send_data);
			break;
		case 2: 
			that.page.complete ++;
			var send_data = {
				order_status: 2,
				p: that.page.complete,
				token: that.my_data.user_sn
			};
			that.get_transfer_order(send_data);
			break;
		case 3: 
			that.page.refund ++;
			var send_data = {
				order_status: 3,
				p: that.page.refund,
				token: that.my_data.user_sn
			};
			that.get_transfer_order(send_data);
			break;
	};
  },
  methods: {
	switch_li (index) {
		this.switch_index = index;
	},
	//取消订单
	cancel_order (card_id) {
		var that = this;
		var send_data = {
			card_id: card_id,
			token: that.my_data.user_sn
		};
		Dialog.confirm({
			title: '取消订单',
			message: '是否确认取消订单？'
		}).then(() => {
			that.$store.dispatch("cancel_order", send_data).then( (res) => {
				if (res.data.status == 1) {
					console.log("取消订单", res.data.result);
					Toast('取消成功！'); 
					setTimeout(() => {
						mpvue.navigateTo({ url: "../order/main" });
					}, 300);
				}else {
					Toast(res.data.msg);
				};
			});
		}).catch(() => {
			
		});
	},
	//展示二维码
	look_QR_code (code, order_sn) {
        var that = this;
		this.is_dialog = true;
		var time = Math.round(new Date() / 1000);
		var final_str = code + time;
		var qrcode = Object.assign({}, QRCode);
		this.dialog_sn = order_sn;
		console.log('QRCode', QRCode);
		console.log('qrcode', qrcode);
		qrcode.api.draw(final_str, 'mycanvas', 160, 160);
		setTimeout(() => {
            that.canvasToTempImage();
        }, 300);
	},
	//二维码绘制
	canvasToTempImage () {
		var that = this;
        //把当前画布指定区域的内容导出生成指定大小的图片，并返回文件路径。
        wx.canvasToTempFilePath({
			quality: 0.5,
			canvasId: 'mycanvas',
            success: function(res) {
                var tempFilePath = res.tempFilePath;
				console.log('tempFilePath', tempFilePath);
				// that.imagePath = tempFilePath;
            }
        });
	},
	//切换订单类型
	onChange (e) {
		console.log(e);
		var that = this;
		this.current_order_type = e.target.index;
		switch (this.current_order_type) {
			case 0: 
				if (this.orders.all.length == 0) {
					var send_data = {
						order_status: 0,
						p: 1,
						token: that.my_data.user_sn
					};
					that.get_transfer_order(send_data);
				};
				break;
			case 1: 
				if (this.orders.ing.length == 0) {
					var send_data = {
						order_status: 1,
						p: 1,
						token: that.my_data.user_sn
					};
					that.get_transfer_order(send_data);
				};
				break;
			case 2: 
				if (this.orders.complete.length == 0) {
					var send_data = {
						order_status: 2,
						p: 1,
						token: that.my_data.user_sn
					};
					that.get_transfer_order(send_data);
				};
				break;
			case 3: 
				if (this.orders.refund.length == 0) {
					var send_data = {
						order_status: 3,
						p: 1,
						token: that.my_data.user_sn
					};
					that.get_transfer_order(send_data);
				};
				break;
		};
	},
	//退回我的页面
	back_my () {
		mpvue.switchTab({ url: "../index/main" });
	},
	//请求转让订单
	get_transfer_order (send_data) {
		var that = this;
		//获取转让订单
		that.$store.dispatch("service_order", send_data).then( (res) => {
			if (res.data.status == 1) {
				console.log("转让订单", res.data.result);
				var all_order = res.data.result;
				var length = all_order.length;
				for (var i = 0; i < length; i++) {
					all_order[i].create_time = all_order[i].create_time ? that.$moment(all_order[i].create_time * 1000).format('YYYY-MM-DD HH:mm:ss') : '';
					all_order[i].end_time = all_order[i].end_time ? that.$moment(all_order[i].end_time * 1000).format('YYYY-MM-DD HH:mm:ss') : '';
					
				};
				
				switch (that.current_order_type) {
					case 0: 
						that.orders.all = that.orders.all.concat(all_order);
						break;
					case 1: 
						that.orders.ing = that.orders.ing.concat(all_order);
						break;
					case 2: 
						that.orders.complete = that.orders.complete.concat(all_order);
						break;
					case 3: 
						that.orders.refund = that.orders.refund.concat(all_order);
						break;
				};
			};
		});
	}
  },
  mounted () {
	var that = this;
	//检测系统
	wx.getSystemInfo({
		success: (res) => {
			console.log('系统信息', res); 
			if (res.system.indexOf('iOS') != -1) {
				that.top_nav_data = res.statusBarHeight + 32 + 12;
			}else {
				that.top_nav_data = res.statusBarHeight + 32 + 16;
			};
			console.log('顶部导航栏总高度', that.top_nav_data);
		}
	}); 
	//获取用户token 请求订单数据
	wx.getStorage({
		key: 'my_data',
		success (res) {
			console.log('我的数据', res);
			that.my_data = res.data;
			var send_data = {
				order_status: 0,
				p: that.page.all,
				token: that.my_data.user_sn
			};
			that.get_transfer_order(send_data);
		},
		fail (res) {
			mpvue.navigateTo({ url: "../login/main?src=" + 'my' });
			setTimeout(() => {
				Toast('请先登录！');
			}, 300);
		}
	});

  }
}
</script>

<style scoped>
	@import url("../../../styles/order.css");
</style>
