import layout from "@/views/layout/index.vue";

const order = {
    path: "/order",
    name: "order",
    component: layout,
    redirect: '/order/service/list',
    meta: {
        title: '订单管理',
        icon: '#icondingdan1',
        hidden: false,
        roles: '20007'
    },
    children: [
        {
            path: '/order/service/list',
            name: 'service_list',
            component: () => import('@/views/order/service/service_list.vue'),
            meta: {
                title: '服务订单',
                hidden: false,
                roles: '20021'
            }
        },
        {
            path: '/order/service/details',
            name: 'service_details',
            component: () => import('@/views/order/service/service_details.vue'),
            meta: {
                title: '服务订单详情',
                hidden: true
            }
        },

        {
            path: '/order/transfer/list',
            name: 'transfer_list',
            component: () => import('@/views/order/transfer/transfer_list.vue'),
            meta: {
                title: '转让订单',
                hidden: false,
                roles: '20024'
            }
        },
        {
            path: '/order/transfer/details',
            name: 'transfer_details',
            component: () => import('@/views/order/transfer/transfer_details.vue'),
            meta: {
                title: '转让订单详情',
                hidden: true
            }
        },

        {
            path: '/order/receive/list',
            name: 'receive_list',
            component: () => import('@/views/order/receive/receive_list.vue'),
            meta: {
                title: '领用订单',
                hidden: false,
                roles: '20031'
            }
        },
        {
            path: '/order/receive/details',
            name: 'receive_details',
            component: () => import('@/views/order/receive/receive_details.vue'),
            meta: {
                title: '领用订单详情',
                hidden: true
            }
        },
        
        
    ]
};
export default order;