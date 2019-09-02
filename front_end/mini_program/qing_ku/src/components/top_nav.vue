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
	}
	.address {
		margin: 0 auto;
	}
	.address .city {
		margin-left: 3px;
	}
	.map {
		margin-left: 8px;
	}
	.map .iconfont {
		font-size: 23px;
	}
</style>
	  