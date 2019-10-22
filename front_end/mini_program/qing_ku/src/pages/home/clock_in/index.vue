<template>
	<div class="activity">
		<web-view :src="url" bindmessage="bindGetMsg"></web-view>
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
	onLoad (options) {
		var that = this;
		wx.getStorage({
			key: 'token',
			success (res) {
				that.url = 'https://shop.technologyle.com/sign_up/index.html?token=' + res.data;
			},
			fail (res) {
				Toast('敬请期待！');
			}
		});
	}
}
</script>