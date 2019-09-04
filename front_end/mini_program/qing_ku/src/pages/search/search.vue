<template>
	<div class="search">
		<div class="search_header">
			<i class="iconfont">&#xe690;</i>
			<input class="search_input" type="text" placeholder="请输入健身房名字" placeholder-style="color: #cccccc" auto-focus @input='input_club'>
		</div>
		<div class="club_list" v-if='club_lists.length > 0'>
			<ul>
				<li class="li_list" v-for='(item, index) in club_lists' :key='item.id'>
					<img class="img_list" :src="'https://shop.technologyle.com' + item.shop_image" alt="">
					<div class="info_01">
						<span class="name">{{ item.club_name }}</span>
						<span class="distance">{{ item.juli * 1000 }}m <i class="iconfont">&#xe63f;</i></span>
					</div>
					<div class="info_02">
						<span class="type"><i class="iconfont">&#xe604;</i> {{ item.goods_name }}</span>
						<span class="price">¥{{ item.price ? item.price : 0 }}</span>
					</div>
				</li>
			</ul>
		</div>
		<div class="search_footer" v-if='club_lists.length == 0'>
			<img class="search_img" src="../../../static/imgs/no_address.png" alt="">
			<p class="text">暂无搜索到的健身房</p>
		</div>
	</div>
</template>

<script>
export default {
	data () {
		return {
			club_lists: []
		}
	},
	components: {

	},
	methods: {
		//搜索会所
		input_club (e) {
			console.log(e.mp.detail.value);
			var that = this;
			wx.getStorage({
				key: 'get_address',
				success (res) {
					var send_data = {};
					send_data.lat = res.data.latitude;
					send_data.lng = res.data.longitude;
					send_data.search = e.mp.detail.value;
					that.$store.dispatch("search_club", send_data).then( (res) => {
						if (res.data.status == 1) {
							console.log("搜索会所", res.data.result);
							that.club_lists = res.data.result;
						};
					});
				}
			});
		}
	},
	mounted () {
		
	}
}
</script>

<style scoped>
	.search_header {
		display: flex;
		background-color: #fff;
		align-items: center;
		position: relative;
	}
	.search_header .iconfont {
		position: absolute;
		left: 15px;
		top: 50%;
		transform: translateY(-50%);
		color: #ccc;
	}
	.search_input {
		width: 100%;
		padding: 10px 20px 10px 42px;
	}
	.search_footer {
		padding-top: 130px;
		display: flex;
		align-items: center;
		flex-direction: column;
		color: #ccc;
	}
	.search_img {
		width: 216px;
		height: 180px;
	}
	
	.club_list {
		margin: 15px 15px;
	}
	.li_list {
		background-color: #fff;
		border-bottom-right-radius: 10px;
		border-bottom-left-radius: 10px;
		margin-bottom: 12px;
	}
	.li_list .img_list {
		height: 130px;
		border-top-right-radius: 8px;
		border-top-left-radius: 8px;
		display: block;
		margin-bottom: 12px;
	}
	.li_list .info_01, .li_list .info_02 {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: 0 12px 0 12px;
	}
	.li_list .name {
		font-weight: 900;
		font-size: 32rpx;
	}
	.distance {
		color: #ccc;
		font-size: 28rpx;
		display: flex;
		align-items: center;
	}
	.distance .iconfont {
		margin-left: 8px;
		font-size: 35rpx;
	}
	.type {
		display: flex;
		align-items: center;
		color: #666666;
		font-size: 30rpx;
	}
	.type .iconfont {
		margin-right: 8px;
		font-size: 40rpx;
		color: #ccc;
	}
	.info_02 .price {
		color: #FF8004;
		font-weight: 900;
	}
	.info_02 {
		padding-bottom: 8px;
	}
</style>