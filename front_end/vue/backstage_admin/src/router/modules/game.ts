import layout from "@/views/layout/index.vue";

const game = {
    path: "/game",
    name: "game",
    component: layout,
    redirect: '/game/list',
    meta: {
        title: '小游戏',
        icon: '#iconyonghu1',
        hidden: false
    },
    children: [
        {
            path: '/game/sign_up',
            name: 'sign_up',
            component: () => import('@/views/game/sign_up.vue'),
            meta: {
                title: '早起打卡',
                hidden: false
            } 
        },
        {
            path: '/game/cap_treasure',
            name: 'cap_treasure',
            component: () => import('@/views/game/cap_treasure.vue'),
            meta: {
                title: '酷点夺宝',
                hidden: false
            }
        },
    ]
};

export default game;