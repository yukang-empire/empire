import layout from "@/views/layout/index.vue";

const business = {

    path: "/set",
    name: "set",
    //最顶层layout组件包含main_component组件 而main_component带有router-view 意味着底下所有的children组件都在里面渲染
    component: layout,
    redirect: '/set/revise',
    meta: {
        title: '设置',
        icon: '#icon-shezhi',
        //是否属于侧边栏展示项
        is_aside: true,
        roles: ['admin']
    },
    children: [
        {
            path: '/set/yggl',
            name: 'yggl',
            component: () => import('@/views/set/employees/index.vue'),
            meta: {
                title: '员工管理'
            },
            children: [
                
                {
                    path: '/set/yggl/xzyg',
                    name: 'xzyg',
                    component: () => import('@/views/set/employees/add.vue'),
                    meta: {
                        title: '新增/编辑员工'
                    }
                },
                {
                    path: '/set/yggl/yglb',
                    name: 'yglb',
                    component: () => import('@/views/set/employees/lists.vue'),
                    meta: {
                        title: '员工列表'
                    }
                },
            ]
        },
        {
            path: '/set/jsgl',
            name: 'jsgl',
            component: () => import('@/views/set/roles/index.vue'),
            meta: {
                title: '角色管理'
            },
            children: [
                
                {
                    path: '/set/yggl/xzjs',
                    name: 'xzjs',
                    component: () => import('@/views/set/roles/add.vue'),
                    meta: {
                        title: '新增/编辑角色'
                    }
                },
                {
                    path: '/set/yggl/jslb',
                    name: 'jslb',
                    component: () => import('@/views/set/roles/lists.vue'),
                    meta: {
                        title: '角色列表'
                    }
                },
            ]
        },
        
        {
            path: '/set/xgzl',
            name: 'xgzl',
            //次顶层需要有一个带router-view的index组件 来渲染更底层的children组件
            component: () => import('@/views/set/revise'),
            meta: {
                title: '修改资料'
            },
        },
        {
            path: '/set/log',
            name: 'log',
            component: () => import('@/views/set/logs.vue'),
            meta: {
                title: '操作日志'
            }
        },
        
    ]
};
export default business;