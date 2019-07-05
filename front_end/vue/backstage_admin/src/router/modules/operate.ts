import layout from "@/views/layout/index.vue";

const operate = {
    path: "/operate",
    name: "operate",
    component: layout,
    redirect: '/operate/agreement/list',
    meta: {
        title: '运营管理',
        icon: '#iconzhidingfanwei',
        hidden: false,
        roles: ['1']
    },
    children: [
        {
            path: '/operate/agreement/list',
            name: 'agreement_list',
            component: () => import('@/views/operate/agreement/agreement_list.vue'),
            meta: {
                title: '协议列表',
                hidden: false
            }
        },
        {
            path: '/operate/agreement/add',
            name: 'agreement_add',
            component: () => import('@/views/operate/agreement/agreement_add.vue'),
            meta: {
                title: '新增协议',
                hidden: true
            }
        },
        {
            path: '/operate/article/list',
            name: 'article_list',
            component: () => import('@/views/operate/article/article_list.vue'),
            meta: {
                title: '文章列表',
                hidden: false
            }
        },

        {
            path: '/operate/article/add',
            name: 'article_add',
            component: () => import('@/views/operate/article/article_add.vue'),
            meta: {
                title: '新增文章',
                hidden: true
            }
        },
        {
            path: '/operate/carousel/list',
            name: 'carousel_list',
            component: () => import('@/views/operate/carousel/carousel_list.vue'),
            meta: {
                title: '轮播图列表',
                hidden: false
            }
        },
        {
            path: '/operate/carousel/add',
            name: 'carousel_add',
            component: () => import('@/views/operate/carousel/carousel_add.vue'),
            meta: {
                title: '新增轮播图',
                hidden: true
            }
        },
        {
            path: '/operate/help/list',
            name: 'help_list',
            component: () => import('@/views/operate/help/help_list.vue'),
            meta: {
                title: '帮助中心列表',
                hidden: false
            }
        },
        {
            path: '/operate/help/add',
            name: 'help_add',
            component: () => import('@/views/operate/help/help_add.vue'),
            meta: {
                title: '新增帮助中心',
                hidden: true
            }
        },
        {
            path: '/operate/help/recycle',
            name: 'help_recycle',
            component: () => import('@/views/operate/help/recycle_bin.vue'),
            meta: {
                title: '回收站',
                hidden: true
            }
        },
        
    ]
};

export default operate;