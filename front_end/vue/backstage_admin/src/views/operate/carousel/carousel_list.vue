<template>
    <div class="carousel_list">
        <div class="repeat_div">
            <p>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#iconfunnel"></use>
                </svg>
                <span>筛选数据</span>
            </p>
            <!-- 列表数据过滤 -->
            <list_filter 
            :send_data="send_data"
            :show_filter="show_filter"
            @search="search"
            @clear_search="clear_search"
            @change_time='change_time'
            @clear_time="clear_time"
            @clear_time_register='clear_time_register'
            @change_time_register='change_time_register'
            @state_change='change_type'
            @clear_select='clear_type'
            />
            
        </div>

        <div class="repeat_div">
            <p class="flex_between">
                <span>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#iconshitu_gaikuang"></use>
                    </svg>
                    <span>{{ $store.state.current_route ? $store.state.current_route.meta.title : "列表数据" }}</span>
                </span>
                <router-link to="/operate/carousel/add" tag="span" class="add_btn">
                    <el-button size="medium" type="primary" icon="el-icon-circle-plus-outline">新增轮播图</el-button>
                </router-link>
            </p>
            <!-- 表格和页码 -->
            <table_page 
            :table_data='table_data'
            @change_page='change_page'
            @change_page_size='change_page_size'
            @change_state='change_state'
            @look_up='look_up'
            />
            
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import list_filter from "@/components/list_filter.vue";
import table_page from "@/components/table_page.vue";

@Component({
    components: {
        list_filter,
        table_page
    }
})

export default class carousel_list extends Vue{
    //表格、页码数据
    private table_data: any = {
        //表格
        table: {
            //属于哪个表格
            which: 'carousel_list',
            //是否多选
            checkbox: true,
            //是否固定表头
            is_height: "auto",
            //表格数据
            lists: [],
        },
        //页码
        page: {
            //是否显示页码
            is_page: true,
            //当前页码
            current_page: sessionStorage.getItem("carousel_list_page") ? parseInt(sessionStorage.getItem("carousel_list_page")) : 1,
            //每页显示的数量
            size: sessionStorage.getItem("carousel_list_size") ? parseInt(sessionStorage.getItem("carousel_list_size")) : 10,
            sizes: [10, 15, 20],
            //总数量
            total: 0,
        }
    };
    //请求列表数据的参数
    private send_data: any = {
        page: sessionStorage.getItem("carousel_list_page") ? sessionStorage.getItem("carousel_list_page") : 1,
        size: sessionStorage.getItem("carousel_list_size") ? sessionStorage.getItem("carousel_list_size") : 10,
        where: {
            keyword: sessionStorage.getItem("carousel_list_keyword") ? sessionStorage.getItem("carousel_list_keyword") : "",
            stime: sessionStorage.getItem("carousel_list_stime") ? sessionStorage.getItem("carousel_list_stime") : "",
            etime: sessionStorage.getItem("carousel_list_etime") ? sessionStorage.getItem("carousel_list_etime") : "",
            pid: sessionStorage.getItem("carousel_list_pid") ? sessionStorage.getItem("carousel_list_pid") : "",
        }
    };
    //需要展示的筛选功能
    private show_filter: any = {
        is_type: 'domain01',
        is_search: true,
        show_time: true,
        time_name: '上传时间',
        state_name: '轮播图位置',
        is_state: true,
        all_state: [
            {state: '1', name: 'APP首页banner'},
            {state: '2', name: '开屏页图片'},
            {state: '3', name: '商城首页'},
            {state: '4', name: '淘卡首页'},
        ]
    };

    mounted () {
        this.carousel_list();
    };
    
    //请求carousel_list数据
    carousel_list () {
        this.$store.dispatch("carousel_list", this.send_data).then( (res: any) => {
            console.log("轮播图列表", res);
            if (res.code == 0) {
                this.table_data.table.lists = res.data;
                //提取长度出来 提高for循环性能
                var lists = this.table_data.table.lists;
                var length = lists.length;
                //转换时间戳
                for (var i = 0; i < length; i++) {
                    //typescript语法严格 不声明会报错
                    var that: any = this;
                    lists[i].start_time = lists[i].start_time == 0 ? "" : that.$moment(lists[i].start_time * 1000).format('YYYY-MM-DD HH:mm:ss');
                    switch (lists[i].pid) {
                        case '1': 
                            lists[i].pid = '首页banner';
                            break;
                        case '2': 
                            lists[i].pid = '开屏页图片';
                            break;
                        case '3': 
                            lists[i].pid = '地图页广告图';
                            break;
                        case '4': 
                            lists[i].pid = '转让卡广告图';
                            break;
                    };
                };
                //总个数
                this.table_data.page.total = parseInt(res.count);
            }else {
                //请求失败提示
                this.$message({ message: res.msg, type: "error", duration: 2500 });
            };
        });
    };

    //搜索 重新获取列表数据
    search (val: any) {
        //页码不重置为1的话 有可能请求不到数据
        this.send_data.page = 1;
        this.table_data.page.current_page = 1;
        sessionStorage.setItem("carousel_list_page", '1');
        this.send_data.where.keyword = val;
        sessionStorage.setItem("carousel_list_keyword", val);
        this.carousel_list();
    };

    //清空搜索内容
    clear_search () {
        this.send_data.where.keyword = '';
        sessionStorage.setItem("carousel_list_keyword", "");
        this.carousel_list();
    };

    //选择类型
    change_type (val) {
        //页码不重置为1的话 有可能请求不到数据
        this.send_data.page = 1;
        this.table_data.page.current_page = 1;
        sessionStorage.setItem("carousel_list_page", '1');
        this.send_data.where.pid = val;
        sessionStorage.setItem("carousel_list_pid", val);
        this.carousel_list();
    };

    //清空类型
    clear_type () {
        this.send_data.where.pid = '';
        sessionStorage.setItem("carousel_list_pid", '');
        this.carousel_list();
    };

    //筛选时间
    change_time(val: any) {
        //页码不重置为1的话 有可能请求不到数据
        this.send_data.page = 1;
        this.table_data.page.current_page = 1;
        sessionStorage.setItem("carousel_list_page", '1');
        var that: any = this;
        this.send_data.where.stime = val[0] ? that.$moment(val[0]).valueOf() / 1000 : "",
        this.send_data.where.etime = val[1] ? that.$moment(val[1]).valueOf() / 1000 : "",
        sessionStorage.setItem("carousel_list_stime", this.send_data.where.stime);
        sessionStorage.setItem("carousel_list_etime", this.send_data.where.etime);
        this.carousel_list();
    };

    //筛选注册时间
    change_time_register(val: any) {
        //页码不重置为1的话 有可能请求不到数据
        this.send_data.page = 1;
        this.table_data.page.current_page = 1;
        sessionStorage.setItem("carousel_list_page", '1');
        var that: any = this;
        this.send_data.where.reg_stime = val[0] ? that.$moment(val[0]).valueOf() / 1000 : "",
        this.send_data.where.reg_etime = val[1] ? that.$moment(val[1]).valueOf() / 1000 : "",
        sessionStorage.setItem("carousel_list_reg_stime", this.send_data.where.reg_stime);
        sessionStorage.setItem("carousel_list_reg_etime", this.send_data.where.reg_etime);
        this.carousel_list();
    };

    //清空时间
    clear_time () {
        var that: any = this;
        this.send_data.where.stime = "",
        this.send_data.where.etime = "",
        sessionStorage.setItem("carousel_list_stime", this.send_data.where.stime);
        sessionStorage.setItem("carousel_list_etime", this.send_data.where.etime);
        this.carousel_list();
    };

    //清空时间
    clear_time_register () {
        var that: any = this;
        this.send_data.where.reg_stime = "",
        this.send_data.where.reg_etime = "",
        sessionStorage.setItem("carousel_list_reg_stime", this.send_data.where.etime);
        sessionStorage.setItem("carousel_list_reg_etime", this.send_data.where.etime);
        this.carousel_list();
    };
    
    //改变页码
    change_page(val: any) {
        this.table_data.page.current_page = val;
        this.send_data.page = val;
        sessionStorage.setItem("carousel_list_page", val);
        this.carousel_list();
    };

    //改变每页的条数
    change_page_size(val: any) {
        this.table_data.page.size = val;
        this.send_data.size = val;
        sessionStorage.setItem("carousel_list_size", val);
        this.carousel_list();
    };

    //改变状态
    change_state (index: any, row: any) {
        var that: any = this;
        if (row.is_lock == 0) {
            that.$confirm("确定禁用ID为 " + row.user_id +  " 的账户？", "提示", { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }).then( () => {
                this.$store.dispatch("change_state_user", { userSN: row.user_sn, isLock: '1' }).then( (res: any) => {
                    if (res.code == 0) {
                        console.log("改变状态", res);
                        this.table_data.table.lists[index].is_lock = 1;
                        that.$message({ type: "success", message: "已成功禁用ID为 " + row.user_id + " 的账户！", duration: 2000 });
                    }else {
                        //登录失败提示
                        this.$message({ message: res.msg, type: "error", duration: 2500 });
                    };
                })
            });
        }else {
            that.$confirm("确定开启ID为 " + row.user_id +  " 的账户？", "提示", { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }).then( () => {
                this.$store.dispatch("change_state_user", { userSN: row.user_sn, isLock: '0' }).then( (res: any) => {
                    if (res.code == 0) {
                        console.log("改变状态", res);
                        this.table_data.table.lists[index].is_lock = 0;
                        that.$message({ type: "success", message: "已成功开启ID为 " + row.user_id + " 的账户！", duration: 2000 });
                    }else {
                        //登录失败提示
                        this.$message({ message: res.msg, type: "error", duration: 2500 });
                    };
                })
            });
        };
    };

    //查看
    look_up (row: any) {
        this.$router.push({ path: '/user/details', query: { id: row.user_id } });
    };

    //删除
    
    // this.$confirm("确定删除角色名为 " + row.RoleName +  " 的角色？", "提示", { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }).then( () => {
    //     that.$store.dispatch("del_role", { RoleId: row.RoleId }).then( (res: any) => {
    //         if (res.code == 0) {
    //             console.log("删除角色", res);
    //             that.$message({ type: "success", message: "已成功删除角色名为 " + row.RoleName + " 的角色！", duration: 2000 });
    //             setTimeout(() => {
    //                 that.$router.go(0);
    //             }, 500);
    //         }else {
    //             //登录失败提示
    //             that.$message({ message: res.msg, type: "error", duration: 2500 });
    //         };
    //     })
    // });
}

</script>

<style lang="scss">

    @media screen and (min-width: 769px) {
        
    }
</style>