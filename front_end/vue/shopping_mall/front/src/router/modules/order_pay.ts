
const order_pay = {
	path: '/order_pay',
	name: '支付订单',
	component: () => import('@/views/order/order_pay.vue'),
	meta: {
		title: '支付订单',
		grade: 4
	}
};

export default order_pay;