import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

import home from './modules/home';
import search from './modules/search';
import goods_area from './modules/goods_area';
import goods_details from './modules/goods_details';
import order_sure from './modules/order_sure';
import order_pay from './modules/order_pay';
import all_address from './modules/all_address';
import add_address from './modules/add_address';
import edit_address from './modules/edit_address';
import my from './modules/my';
import vip_center from './modules/vip_center';
import member_grade from './modules/member_grade';

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
		order_sure,
		order_pay,
		all_address,
		add_address,
		edit_address,
		my,
		vip_center,
		member_grade,
		{
			path: '/order_list',
			name: '订单列表',
			component: () => import('../views/order/order_list.vue'),
			meta: {
				title: '订单列表',
				grade: 10
			}
		},
		{
			path: '/order_details',
			name: '订单详情',
			component: () => import('../views/order/order_details.vue'),
			meta: {
				title: '订单详情',
				grade: 11
			}
		}
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
