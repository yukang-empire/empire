
import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

//复用的layout视图组件 ts文件不能省略后缀的.vue
import layout from '@/views/layout/layout.vue';

//任何用户均可访问的路由页面
export const constant_routers = [
  {
    path: '/home',
    component: layout,
    name: '首页',
    meta: {
      title: '首页'
    }
  },
  {
    path: '/login',
    name: '登录',
    meta: {
      title: '登录'
    },
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/404',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/401',
    component: () => import('@/views/login/login.vue')
  },
  
];

//需要权限才能访问的路由页面 过滤后将concat到constant_routers里
export const jurisdiction_routers = [
  {
    path: '/merchant',
    component: layout,
    name: '商家管理',
    meta: {
      title: '商家管理',
      icon: '#icon-shangjia',
      roles: ['admin']
    },
    children: [
      {
        path: 'add',
        name: '新增商家',
        children: [
          {
            path: 'info',
            name: '商家信息',
            component: () => import('@/views/merchant_management/add_merchant/personal_info.vue')
          },
          {
            path: 'info',
            name: '门店信息',
            component: () => import('@/views/merchant_management/add_merchant/store_info.vue')
          },
        ]
      },
      {
        path: 'info',
        name: '商家信息',
        children: [
          {
            path: 'list',
            name: '商家列表',
            component: () => import('@/views/merchant_management/merchant_info/merchant_lists.vue')
          },
          {
            path: 'info',
            name: '门店信息',
            component: () => import('@/views/merchant_management/merchant_info/list_details.vue')
          },
        ]
      },
      {
        path: 'audit',
        name: '入驻审核',
        component: () => import('@/views/merchant_management/entry_audit.vue')
      },
      {
        path: 'goods',
        name: '商品列表',
        component: () => import('@/views/merchant_management/goods_lists.vue')
      },
      {
        path: 'store',
        name: '门店列表',
        component: () => import('@/views/merchant_management/store_lists.vue')
      }
    ]
  },

  { path: '*', redirect: '/404' }
];

//输出路由
export default new Router({
  // mode: 'history',
  routes: constant_routers
});
