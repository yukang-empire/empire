<template>
	<div class="top_nav" :style="{height: top_nav_data.nav_height + 'px'}">
		<div class="map">
			<i class="iconfont">&#xe751;</i>
		</div>	
		<div class="address flex_center">
			<i class="iconfont" style="font-size: 17px;">&#xe78e;</i>
			<span class="city">{{ top_nav_data.city }}</span>
		</div>
	</div>
</template>
	
<script>

export default {
	props: ['top_nav_data'],

	data () {
		return {
			
		}
	},

	components: {
		
	},

	methods: {
		
	},

	mounted () {
		
	}
}
</script>

<style scoped>
	.top_nav {
		line-height: 44px;
		display: flex;
		align-items: flex-end;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 99;
		background-color: #f0f0f0;
	}
	.address {
		margin: 0 auto;
	}
	.map {
		margin-left: 10px;
	}
	.address .city {
		margin-left: 3px;
	}
	.map .iconfont {
		font-size: 23px;
	}
</style>
	  