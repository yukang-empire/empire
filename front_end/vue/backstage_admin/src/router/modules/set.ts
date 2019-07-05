import layout from "@/views/layout/index.vue";

const set = {
    path: "/set",
    name: "set",
    component: layout,
    redirect: '/set/change_password',
    meta: {
        title: '设置',
        icon: '#iconshezhi',
        hidden: false,
        roles: ['1']
    },
    children: [
        {
            path: '/set/role/list',
            name: 'role_list',
            component: () => import('@/views/set/role/role_list.vue'),
            meta: {
                title: '角色列表',
                hidden: false
            }
        },
        {
            path: '/set/role/add',
            name: 'role_add',
            component: () => import('@/views/set/role/role_add.vue'),
            meta: {
                title: '新增角色',
                hidden: true
            }
        },
        {
            path: '/set/staff/list',
            name: 'staff_list',
            component: () => import('@/views/set/staff/staff_list.vue'),
            meta: {
                title: '员工列表',
                hidden: false
            }
        },

        {
            path: '/set/staff/add',
            name: 'staff_add',
            component: () => import('@/views/set/staff/staff_add.vue'),
            meta: {
                title: '新增员工',
                hidden: true
            }
        },
        {
            path: '/set/change_password',
            name: 'change_password',
            component: () => import('@/views/set/change_password.vue'),
            meta: {
                title: '修改密码',
                hidden: false
            }
        },
        {
            path: '/set/log',
            name: 'log',
            component: () => import('@/views/set/log_list.vue'),
            meta: {
                title: '操作日志',
                hidden: false
            }
        },
        
    ]
};

export default set;