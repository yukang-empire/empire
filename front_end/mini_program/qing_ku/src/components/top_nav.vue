<template>
	<div>
		<div class="gym_top_nav" :style="{height: top_nav_data.nav_height + 'px'}">
			<div class="map">
				<i class="iconfont">&#xe751;</i>
			</div>	
			<div class="address flex_center">
				<div class="address_div flex_center">
					<i class="iconfont" style="font-size: 17px;">&#xe78e;</i>
					<span class="city">{{ top_nav_data.city }}</span>
				</div>
			</div>
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
	
	.gym_top_nav {
		line-height: 44px;
		display: flex;
		align-items: flex-end;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 99;
		background-color: #fff;
	}
	.address {
		margin: 0 auto;
	}
	.address_div {
		margin-left: -23px;
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
	  