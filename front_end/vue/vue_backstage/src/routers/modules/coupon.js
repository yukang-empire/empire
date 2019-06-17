import layout from "@/views/layout/index.vue";

const coupon = {

    path: "/coupon",
    name: "coupon",
    component: layout,
    redirect: '/coupon/lists',
    meta: {
        title: "优惠券管理",
        icon: '#icon-youhuiquan',
        //是否属于侧边栏展示项
        is_aside: true,
        roles: ['1']
    },
    children: [
        {
            path: '/coupon/add',
            name: 'coupon_add',
            component: () => import('@/views/coupon/add.vue'),
            meta: {
                title: '新增优惠券'
            } 
        },
        {
            path: '/coupon/lists',
            name: 'coupon_lists',
            component: () => import('@/views/coupon/lists.vue'),
            meta: {
                title: '优惠券列表'
            }
        },
    ]
};
export default coupon;