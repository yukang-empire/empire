<template>
	<div id="app">
		<transition :name="transitionName">
			<router-view />
		</transition>
	</div>
</template>

<script>
export default {
	name: 'app',
	data () {
		return {
			transitionName: ''
		}
	},
	//监听路由切换 改变动画效果
	watch: {
		$route(to, from) {
			if (to.meta.grade > from.meta.grade) {
				this.transitionName = 'slide-left';
			}else {
				this.transitionName = 'slide-right';
			}
		}
	}
}
</script>