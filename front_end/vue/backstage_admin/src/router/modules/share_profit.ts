import layout from "@/views/layout/index.vue";

const share_profit = {
    path: "/share_profit",
    name: "share_profit",
    component: layout,
    redirect: '/share_profit/list',
    meta: {
        title: '分润管理',
        icon: '#icon3',
        hidden: false,
        roles: '20008'
    },
    children: [
        {
            path: '/share_profit/list',
            name: 'share_profit_list',
            component: () => import('@/views/share_profit/share_profit_list.vue'),
            meta: {
                title: '分润列表',
                hidden: false,
                roles: '20051'
            }
        },
        {
            path: '/share_profit/details',
            name: 'share_profit_details',
            component: () => import('@/views/share_profit/share_profit_details.vue'),
            meta: {
                title: '分润详情',
                hidden: true,
                roles: '20051'
            }
        },
        {
            path: '/share_profit/add',
            name: 'share_profit_add',
            component: () => import('@/views/share_profit/share_profit_add.vue'),
            meta: {
                title: '新增分润',
                hidden: true,
                roles: '20052'
            }
        },
        
    ]
};

export default share_profit;