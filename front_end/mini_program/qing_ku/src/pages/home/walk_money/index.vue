<template>
	<div class="activity">
		<web-view :src="url" bindmessage=""></web-view>
		<van-toast id="van-toast" />
	</div>
</template>
	
<script>
import Toast from "../../../../static/vant/toast/toast";

export default {
	data () {
		return {
			url: ''
		}
	},

	methods: {
		
	},
	onLoad () {
		var that = this;
		wx.getStorage({
			key: 'ad_link',
			success (res) {
				if (res.data) {
					that.url = 'https://shop.technologyle.com' + res.data;
				}else {
					Toast('敬请期待！');
					setTimeout(() => {
						mpvue.switchTab({ url: "../home/index/main" });
					}, 500); 
				}
			}
		});
	}
}
</script>