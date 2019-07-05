import layout from "@/views/layout/index.vue";

const coupon = {
    path: "/coupon",
    name: "coupon",
    component: layout,
    redirect: '/coupon/list',
    meta: {
        title: '优惠券管理',
        icon: '#iconyouhuiquan',
        hidden: false,
        roles: ['1']
    },
    children: [
        {
            path: '/coupon/list',
            name: 'coupon_list',
            component: () => import('@/views/coupon/coupon_list.vue'),
            meta: {
                title: '优惠券列表',
                hidden: false
            }
        },
        {
            path: '/coupon/add',
            name: 'coupon_add',
            component: () => import('@/views/coupon/coupon_add.vue'),
            meta: {
                title: '优惠券新增',
                hidden: false
            }
        },
    ]
};

export default coupon;