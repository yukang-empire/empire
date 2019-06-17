import layout from "@/views/layout/index.vue";

const business = {

    path: "/orders",
    name: "orders",
    //最顶层layout组件包含main_component组件 而main_component带有router-view 意味着底下所有的children组件都在里面渲染
    component: layout,
    redirect: '/orders/fwdd',
    meta: {
        title: '订单管理',
        icon: '#icon-dingdan1',
        //是否属于侧边栏展示项
        is_aside: true,
        roles: ['1']
    },
    children: [
        {
            path: '/orders/fwdd',
            name: 'fwdd',
            component: () => import('@/views/orders/service/index.vue'),
            meta: {
                title: '服务订单'
            },
            children: [
                
                {
                    path: '/orders/fwdd/ddlb',
                    name: 'service_lists',
                    component: () => import('@/views/orders/service/lists.vue'),
                    meta: {
                        title: '订单列表'
                    }
                },
                {
                    path: '/orders/fwdd/ddxq',
                    name: 'service_details',
                    component: () => import('@/views/orders/service/details.vue'),
                    meta: {
                        title: '订单详情'
                    }
                },
            ]
        },
        {
            path: '/orders/zrdd',
            name: 'zrdd',
            component: () => import('@/views/orders/transfer/index.vue'),
            meta: {
                title: '转让订单'
            },
            children: [
                
                {
                    path: '/orders/zrdd/ddlb',
                    name: 'transfer_lists',
                    component: () => import('@/views/orders/transfer/lists.vue'),
                    meta: {
                        title: '订单列表'
                    }
                },
                {
                    path: '/orders/zrdd/ddxq',
                    name: 'transfer_details',
                    component: () => import('@/views/orders/transfer/details.vue'),
                    meta: {
                        title: '订单详情'
                    }
                },
            ]
        },
        
        
    ]
};
export default business;