import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

import home from './modules/home';
import search from './modules/search';
import goods_area from './modules/goods_area';
import goods_details from './modules/goods_details';
import my from './modules/my';

const router = new VueRouter({
	// mode: 'history',
	// base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			redirect: '/index'
		},
		home,
		search,
		goods_area,
		goods_details,
		my
	],
	scrollBehavior (to: any, from: any, savedPosition: any) {
		return { x: 0, y: 0}
	}
});

//全局导航守卫 可作白名单、token判断
router.beforeEach((to: any, from: any, next: any) => {
	next();
	document.title = to.meta.title ? to.meta.title : '轻酷商城';
});

export default router;
