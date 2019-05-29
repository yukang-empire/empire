import layout from "@/views/layout/index.vue";

const business = {

    path: "/business",
    name: "business",
    //最顶层layout组件包含main_component组件 而main_component带有router-view 意味着底下所有的children组件都在里面渲染
    component: layout,
    redirect: '/business/sjlb/lbxq',
    meta: {
        title: '商家管理',
        icon: '#icon-shangjia',
        //是否属于侧边栏展示项
        is_aside: true,
        roles: ['admin']
    },
    children: [
        {
            path: '/business/xzsj',
            name: 'xzsj',
            //次顶层需要有一个带router-view的index组件 来渲染更底层的children组件
            component: () => import('@/views/business/add/index.vue'),
            redirect: '/business/xzsj/sjtx',
            meta: {
                title: '新增商家'
            },
            children: [
                {
                    path: '/business/xzsj/sjtx',
                    name: 'sjtx',
                    //终端子组件 将会渲染在直接父组件的router-view里
                    component: () => import('@/views/business/add/business_info.vue'),
                    meta: {
                        title: '填写商家信息'
                    }
                },
                {
                    path: '/business/xzsj/mdtx',
                    name: 'mdtx',
                    component: () => import('@/views/business/add/stores_info.vue'),
                    meta: {
                        title: '填写门店信息'
                    }
                }
            ]
        },
        {
            path: '/business/sjlb',
            name: 'sjlb',
            component: () => import('@/views/business/info/index.vue'),
            redirect: '/business/sjlb/lbxq',
            meta: {
                title: '商家列表'
            },
            children: [
                {
                    path: '/business/sjlb/lbxq',
                    name: 'lbxq',
                    component: () => import('@/views/business/info/list.vue'),
                    meta: {
                        title: '列表详情'
                    }
                },
                {
                    path: '/business/sjlb/sjxq',
                    name: 'sjxq',
                    component: () => import('@/views/business/info/details.vue'),
                    meta: {
                        title: '商家详情'
                    }
                }
            ]
        },
        {
            path: '/business/splb',
            name: 'splb',
            component: () => import('@/views/business/goods/index.vue'),
            redirect: '/business/splb/lbxq',
            meta: {
                title: '商品列表'
            },
            children: [
                {
                    path: '/business/splb/lbxq',
                    name: 'goods_lbxq',
                    component: () => import('@/views/business/goods/list.vue'),
                    meta: {
                        title: '列表详情'
                    }
                },
                {
                    path: '/business/splb/spxq',
                    name: 'spxq',
                    component: () => import('@/views/business/goods/list.vue'),
                    meta: {
                        title: '商品详情'
                    }
                },
                {
                    path: '/business/splb/xzsp',
                    name: 'xzsp',
                    component: () => import('@/views/business/goods/add.vue'),
                    meta: {
                        title: '新增商品'
                    }
                },
            ]
        },
        {
            path: '/business/mdlb',
            name: 'mdlb',
            component: () => import('@/views/business/stores.vue'),
            meta: {
                title: '门店列表'
            }
        },
        {
            path: '/business/rzsh',
            name: 'rzsh',
            component: () => import('@/views/business/check.vue'),
            meta: {
                title: '入驻审核'
            }
        },
        
    ]
};
export default business;