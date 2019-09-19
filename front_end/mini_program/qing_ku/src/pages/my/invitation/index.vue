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
			key: 'my_data',
			success (res) {
				console.log('my_data', res);
				that.url = 'https://shop.technologyle.com/userReg/invitation.html?invite_code=' + res.data.invite_code;
				console.log(that.url);
			},
			fail (res) {
				mpvue.navigateTo({ url: "../login/main?src=" + 'my' });
				setTimeout(() => {
					Toast('请先登录！');
				}, 1000);
			}
		});
	}
}
</script>