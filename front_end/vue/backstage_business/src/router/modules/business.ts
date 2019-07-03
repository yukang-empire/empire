import layout from "@/views/layout/index.vue";

const business = {
    path: "/business",
    name: "business",
    component: layout,
    redirect: '/business/list',
    meta: {
        title: '商家管理',
        icon: '#iconshangjia',
        hidden: false,
        roles: ['1']
    },
    children: [
        {
            path: '/business/list',
            name: 'business_list',
            component: () => import('@/views/business/business/business_list.vue'),
            meta: {
                title: '商家列表',
                hidden: false
            }
        },
        {
            path: '/business/details',
            name: 'business_details',
            component: () => import('@/views/business/business/business_details.vue'),
            meta: {
                title: '商家详情',
                hidden: true
            }
        },
        {
            path: '/business/add',
            name: 'business_add',
            component: () => import('@/views/business/business/business_add.vue'),
            meta: {
                title: '新增商家',
                hidden: true
            }
        },

        {
            path: '/business/store/list',
            name: 'store_list',
            component: () => import('@/views/business/store/store_list.vue'),
            meta: {
                title: '门店列表',
                hidden: false
            }
        },
        {
            path: '/business/store/details',
            name: 'store_details',
            component: () => import('@/views/business/store/store_details.vue'),
            meta: {
                title: '门店详情',
                hidden: true
            }
        },
        {
            path: '/business/store/add',
            name: 'store_add',
            component: () => import('@/views/business/store/store_add.vue'),
            meta: {
                title: '新增门店',
                hidden: true
            }
        },

        {
            path: '/business/goods/list',
            name: 'goods_list',
            component: () => import('@/views/business/goods/goods_list.vue'),
            meta: {
                title: '商品列表',
                hidden: false
            }
        },
        {
            path: '/business/goods/details',
            name: 'goods_details',
            component: () => import('@/views/business/goods/goods_details.vue'),
            meta: {
                title: '商品详情',
                hidden: true
            }
        },
        {
            path: '/business/goods/add',
            name: 'goods_add',
            component: () => import('@/views/business/goods/goods_add.vue'),
            meta: {
                title: '新增商品',
                hidden: true
            }
        },

        {
            path: '/business/examine',
            name: 'entry_examine',
            component: () => import('@/views/business/entry_examine.vue'),
            meta: {
                title: '入驻审核',
                hidden: true
            }
        },
        
        
    ]
};

export default business;