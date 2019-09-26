<template>
	<div class="activity">
		<web-view :src="url" bindmessage=""></web-view>
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
				console.log('ad_link', res.ad_link);
				that.url = 'https://shop.technologyle.com/' + res.ad_link;
			},
			fail (res) {
				Toast('敬请期待！');
			}
		});
	}
}
</script>