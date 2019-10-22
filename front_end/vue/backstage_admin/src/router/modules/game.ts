import layout from "@/views/layout/index.vue";

const game = {
    path: "/game",
    name: "game",
    component: layout,
    redirect: '/game/list',
    meta: {
        title: '小游戏',
        icon: '#iconyouxi',
        hidden: false,
        roles: '20059'
    },
    children: [
        {
            path: '/game/sign_up',
            name: 'sign_up',
            component: () => import('@/views/game/sign_up.vue'),
            meta: {
                title: '早起打卡',
                hidden: false,
				roles: '20059'
            } 
		},
		{
            path: '/game/sign_up_set',
            name: 'sign_up_set',
            component: () => import('@/views/game/sign_up_set.vue'),
            meta: {
                title: '参数配置',
                hidden: true,
				roles: '20061'
            } 
        },
        {
            path: '/game/cap_treasure',
            name: 'cap_treasure',
            component: () => import('@/views/game/cap_treasure.vue'),
            meta: {
                title: '酷点夺宝',
                hidden: false,
				roles: '20062'
            }
		},
		{
            path: '/game/add_cap_treasure',
            name: 'add_cap_treasure',
            component: () => import('@/views/game/add_cap_treasure.vue'),
            meta: {
                title: '新增期数',
				hidden: true,
				roles: '20063'
            }
		},
		{
            path: '/game/cap_treasure_info',
            name: 'cap_treasure_info',
            component: () => import('@/views/game/cap_treasure_info.vue'),
            meta: {
                title: '期数详情',
				hidden: true,
				roles: '20065'
            }
		},
		{
            path: '/game/lottery',
            name: 'lottery',
            component: () => import('@/views/game/lottery.vue'),
            meta: {
                title: '开奖',
                hidden: true,
				roles: '20064'
            }
        },
    ]
};

export default game;