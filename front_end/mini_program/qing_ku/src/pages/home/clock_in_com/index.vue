<template>
	<div class="activity">
		<web-view :src="url" bindmessage="bindGetMsg"></web-view>
	</div>
</template>
	
<script>

export default {
	data () {
		return {
			url: '',
		}
	},

	methods: {
		
	},
	onLoad (options) {
		if (options) {
			this.url = 'https://shop.technologyle.com/sign_up/pay_success.html?phase=' + options.phase + '&one_price=' + options.one_price;
		}
	}
}
</script>