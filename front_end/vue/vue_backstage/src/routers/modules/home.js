import layout from "@/views/layout/index.vue";

const home = {
    path: "/home",
    name: "home",
    component: layout,
    meta: {
        title: '首页',
        icon: '#icon-shouye1',
        //是否属于侧边栏展示项
        is_aside: true
    },
    children: [
        {
            path: "/home",
            component: () => import('@/views/home/index.vue')
        }
    ]
};
export default home;