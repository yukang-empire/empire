import layout from "@/views/layout/index.vue";

const finance = {
    path: "/finance",
    name: "finance",
    component: layout,
    redirect: '/finance/cash_out/list',
    meta: {
        title: '财务管理',
        icon: '#iconcaiwu',
        hidden: false,
        roles: '20005'
    },
    children: [
        {
            path: '/finance/cash_out',
            name: 'finance_cash_out',
            component: () => import('@/views/finance/cash_out/cash_out_list.vue'),
            meta: {
                title: '提现管理',
                hidden: false,
                roles: '20032'
            }
        },
        {
            path: '/finance/cash_out/details',
            name: 'cash_out_details',
            component: () => import('@/views/finance/cash_out/cash_out_details.vue'),
            meta: {
                title: '提现管理明细',
                hidden: true
            }
        },
        {
            path: '/finance/recharge/list',
            name: 'finance_recharge_list',
            component: () => import('@/views/finance/recharge/recharge_list.vue'),
            meta: {
                title: '充值统计',
                hidden: false
            }
        },
        {
            path: '/finance/recharge/details',
            name: 'finance_recharge_details',
            component: () => import('@/views/finance/recharge/recharge_details.vue'),
            meta: {
                title: '充值明细',
                hidden: true
            }
        },
        {
            path: '/finance/order/list',
            name: 'finance_order_list',
            component: () => import('@/views/finance/order/order_list.vue'),
            meta: {
                title: '服务订单统计',
                hidden: false
            }
        },
        {
            path: '/finance/order/details',
            name: 'finance_order_details',
            component: () => import('@/views/finance/order/order_details.vue'),
            meta: {
                title: '服务订单明细',
                hidden: true
            }
        },
        {
            path: '/finance/set',
            name: 'finance_set',
            component: () => import('@/views/finance/set/set_list.vue'),
            meta: {
                title: '通用设置',
                hidden: false
            }
        },
        
    ]
};

export default finance;