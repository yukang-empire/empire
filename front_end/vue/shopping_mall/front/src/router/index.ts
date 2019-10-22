import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

import { Message } from 'element-ui';

import home from './modules/home';
// import my from './modules/my';
// import goods from './modules/goods';
// import member_center from './modules/member_center';
// import address from './modules/address'; 
// import payment from './modules/payment';

const router = new VueRouter({
	// mode: 'history',
	// base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			redirect: '/index'
		},
		home,
		// my,
		// goods,
		// member_center,
		// address,
		// payment
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
