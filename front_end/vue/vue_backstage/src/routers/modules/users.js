import layout from "@/views/layout/index.vue";

const users = {

    path: "/yhgl",
    name: "yhgl",
    //最顶层layout组件包含main_component组件 而main_component带有router-view 意味着底下所有的children组件都在里面渲染
    component: layout,
    redirect: '/yhgl/yhlb',
    meta: {
        title: '用户管理',
        icon: '#icon-yonghu1',
        //是否属于侧边栏展示项
        is_aside: true,
        roles: ['admin']
    },
    children: [
        {
            path: '/yhgl/yhlb',
            name: 'yhlb',
            component: () => import('@/views/users/list.vue'),
            meta: {
                title: '用户列表'
            } 
        },
        {
            path: '/yhgl/yhxq',
            name: 'yhxq',
            component: () => import('@/views/users/details.vue'),
            meta: {
                title: '用户详情'
            }
        },
        // {
        //     path: '/yhgl/smsh',
        //     name: 'smsh',
        //     component: () => import('@/views/users/check.vue'),
        //     meta: {
        //         title: '实名审核'
        //     }
        // }
        
    ]
};
export default users;