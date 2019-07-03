import layout from "@/views/layout/index.vue";

const user = {
    path: "/user",
    name: "user",
    component: layout,
    redirect: '/user/list',
    meta: {
        title: '用户管理',
        icon: '#iconyonghu1',
        hidden: false,
        roles: ['1']
    },
    children: [
        {
            path: '/user/list',
            name: 'user_list',
            component: () => import('@/views/user/user_list.vue'),
            meta: {
                title: '用户列表',
                hidden: false
            } 
        },
        {
            path: '/user/details',
            name: 'user_details',
            component: () => import('@/views/user/user_details.vue'),
            meta: {
                title: '用户详情',
                hidden: true
            }
        },
        {
            path: '/user/examine',
            name: 'user_examine',
            component: () => import('@/views/user/user_examine.vue'),
            meta: {
                title: '实名审核',
                hidden: true
            }
        }
    ]
};

export default user;