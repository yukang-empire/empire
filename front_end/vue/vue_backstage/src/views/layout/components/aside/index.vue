<template>
    <div class="aside_component">
        <el-menu
            :default-active="now_path"
            :router='is_router_mode'
            class="el-menu-vertical-demo"
            background-color="#304156"
            text-color="#fff"
            active-text-color="#409eff">
            
            <li v-for="(item, index) in routers.show">
                <!-- 没有子选项 -->
                <el-menu-item @click='get_history(item.meta.title, item.path)' :index="item.path" v-if='!item.children || (item.children.length < 2)'>
                    <svg class="icon" aria-hidden="true">
                        <use :xlink:href="item.meta.icon"></use>
                    </svg>
                    <span slot="title">{{ item.meta.title }}</span>
                </el-menu-item>

                <!-- 有子选项 -->
                <el-submenu :index="item.path" v-else>
                    <template slot="title">
                        <svg class="icon" aria-hidden="true">
                            <use :xlink:href="item.meta.icon"></use>
                        </svg>
                        <span>{{ item.meta.title }}</span>
                    </template>
                    
                    <li v-for="(item01, index) in item.children">
                        <el-menu-item @click='get_history(item01.meta.title, item01.path)' :index="item01.path" v-if='!item01.children || (item01.children.length < 2)'>
                            {{ item01.meta.title }}
                        </el-menu-item>
        
                        <el-submenu :index="item01.path" v-else>
                            <template slot="title">
                                {{ item01.meta.title }}
                            </template>

                            <li v-for="(item02, index) in item01.children">
                                <el-menu-item @click='get_history(item02.meta.title, item02.path)' :index="item02.path" v-if='!item02.children || (item02.children.length < 2)'>
                                    {{ item02.meta.title }}
                                </el-menu-item>
                            </li>
                        </el-submenu>
                    </li>
                </el-submenu>
            </li>
            
        </el-menu>
    </div>
</template>

<script>

export default {
    name: 'aside_component',
    components: {
        
    },
    props: [
        'role'
    ],
    data () {
        return {
            //侧边栏是否开启路由模式
            is_router_mode: true,
            //路由权限
            routers: {
                all: [],
                //普通用户都能看的
                user: [],
                //最终展示的路由页面
                show: [],
            }
        }
    },
    computed: {
        now_path () {
            return this.$store.state.now_path;
        }
    },
    methods: {
        get_history (name, path) {
            var history = {
                name: name,
                path: path
            };
            this.$store.commit('revise_history', history);
        }
    },
    mounted () {
        var routers = this.$router.options.routes;
        for (var i = 0; i < routers.length; i++) {
            if (routers[i].meta && routers[i].meta.is_aside) {
                this.routers.all.push(routers[i]);
                this.routers.user.push(routers[i]);
                //遍历meta里的roles 进行筛选
                if (routers[i].meta.roles) {
                    var roles = routers[i].meta.roles;
                    for (var j = 0; j < roles.length; j++) {
                        if (roles[j] == 'admin') {
                            //删掉需要权限才能看的
                            this.routers.user.pop(routers[i]);
                        };
                    };
                };
            };
        };
        if (this.role.status == 'admin') {
            this.routers.show = this.routers.all;
        }else {
            this.routers.show = this.routers.user;
        };
        console.log('show_routers',this.routers.show);
    }
}
</script>

<style lang='scss' scoped>
    .aside_component {
        width: 200px;
        overflow-y: scroll;
        padding-bottom: 25px;
        background-color: $aside;
    }
    .icon {
        margin-right: 8px;
    }
    .el-menu {
        border: none;
    }
    

    @media screen and (min-width: 769px) {
        
    }
</style>