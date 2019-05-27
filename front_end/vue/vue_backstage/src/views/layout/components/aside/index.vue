<template>
    <div class="aside_component">
        <el-menu
            :default-active="$route.path"
            :router='is_router_mode'
            class="el-menu-vertical-demo"
            background-color="#304156"
            text-color="#fff"
            active-text-color="#409eff">
            
            <li v-for="(item, index) in routers.show">
                <!-- 没有子选项 -->
                <el-menu-item :index="item.path" v-if='!item.children'>
                    <svg class="icon" aria-hidden="true">
                        <use :xlink:href="item.meta.icon"></use>
                    </svg>
                    <span slot="title">{{ item.name }}</span>
                </el-menu-item>

                <!-- 有子选项 -->
                <el-submenu :index="item.path" v-else>
                    <template slot="title">
                        <svg class="icon" aria-hidden="true">
                            <use :xlink:href="item.meta.icon"></use>
                        </svg>
                        <span>{{ item.name }}</span>
                    </template>
                    
                    <li v-for="(item01, index) in item.children">
                        <el-menu-item :index="item.path + '/' + item01.path" v-if='!item01.children'>
                            {{ item01.name }}
                        </el-menu-item>
        
                        <el-submenu :index="item01.path" v-else>
                            <template slot="title">
                                {{ item01.name }}
                            </template>

                            <li v-for="(item02, index) in item01.children">
                                <el-menu-item :index="item.path + '/' + item01.path + '/' + item02.path" v-if='!item02.children'>
                                    {{ item02.name }}
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
    methods: {
        
    },
    mounted () {
        var routers = this.$router.options.routes;
        for (var i = 0; i < routers.length; i++) {
            if (routers[i].meta) {
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
        console.log('show',this.routers.show);
    }
}
</script>

<style lang='scss' scoped>
    .aside_component {
        width: 180px;
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