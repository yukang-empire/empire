<template>
    <div class="transfer_list">
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
            @state_change="state_change"
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
            </p>
            <!-- 表格和页码 -->
            <table_page 
            :table_data='table_data'
            @change_page='change_page'
            @change_page_size='change_page_size'
            @change_state='change_state'
            @look_up='look_up'
            @state_change="state_change"
            @down_course='down_course'
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

export default class transfer_list extends Vue{
    //表格、页码数据
    private table_data: any = {
        //表格
        table: {
            //属于哪个表格
            which: 'transfer_list',
            //是否多选
            checkbox: true,
            //是否固定表头
            is_height: "auto",
            //表格数据
            lists: [ {name: '康大大'} ],
        },
        //页码
        page: {
            //是否显示页码
            is_page: true,
            //当前页码
            current_page: sessionStorage.getItem("transfer_list_p") ? parseInt(sessionStorage.getItem("transfer_list_p")) : 1,
            //每页显示的数量
            size: sessionStorage.getItem("transfer_list_size") ? parseInt(sessionStorage.getItem("transfer_list_size")) : 10,
            sizes: [10, 15, 20],
            //总数量
            total: 0,
        }
    };
    //请求列表数据的参数
    private send_data: any = {
        p: sessionStorage.getItem("transfer_list_p") ? sessionStorage.getItem("transfer_list_p") : 1,
        size: sessionStorage.getItem("transfer_list_size") ? sessionStorage.getItem("transfer_list_size") : 10,
        search: sessionStorage.getItem("transfer_list_search") ? sessionStorage.getItem("transfer_list_search") : "",
        start_time: sessionStorage.getItem("transfer_list_start_time") ? sessionStorage.getItem("transfer_list_start_time") : "",
        end_time: sessionStorage.getItem("transfer_list_end_time") ? sessionStorage.getItem("transfer_list_end_time") : "",
        order_status: sessionStorage.getItem("transfer_list_state") ? parseInt(sessionStorage.getItem("transfer_list_state")) : 0,
    };
    //需要展示的筛选功能
    private show_filter: any = {
        is_type: "domain02",
        is_search: true,
        placeholder: "请输入用户昵称、手机号(全部)",
        show_time: true,
        time_name: '提交时间',
        is_state: true,
        state_name: '选择订单状态',
        all_state: [
            {state: 0, name: "全部"},
            {state: 1, name: "待审核"},
            {state: 2, name: "已审核"},
            {state: 3, name: "已确定"},
            {state: 4, name: "审核失败"},
            {state: 5, name: "已取消"},
        ],
    };

    mounted () {
        this.transfer_list();
    };
    
    //请求transfer_list数据
    transfer_list () {
        this.$store.dispatch("transfer_list", this.send_data).then( (res: any) => {
            console.log("转让订单列表", res);
            if (res.code == 0 || res.status == 1) {
                this.table_data.table.lists = res.result;
                //提取长度出来 提高for循环性能
                var lists = this.table_data.table.lists;
                var length = lists.length;
                //转换时间戳
                for (var i = 0; i < length; i++) {
                    //typescript语法严格 不声明会报错
                    var that: any = this;
                    lists[i].add_time = lists[i].add_time == 0 ? "" : that.$moment(lists[i].add_time * 1000).format('YYYY-MM-DD HH:mm:ss');
                    switch (lists[i].status) {
                        case 0: 
                            lists[i].status = '审核中';
                            break;
                        case 1: 
                            lists[i].status = '通过审核';
                            break;
                        case 2: 
                            lists[i].status = '已确认';
                            break;
                        case 3: 
                            lists[i].status = '已取消';
                            break;
                        case 4: 
                            lists[i].status = '审核未通过';
                            break;
                        case 5: 
                            lists[i].status = '已上架';
                            break;
                        case 6: 
                            lists[i].status = '待核销';
                            break;
                        case 7: 
                            lists[i].status = '已核销';
                            break;
                    };
                    switch (lists[i].card_status) {
                        case 0: 
                            lists[i].card_status = '未上架';
                            break;
                        case 1: 
                            lists[i].card_status = '已上架';
                            break;
                        case 2: 
                            lists[i].card_status = '已出售';
                            break;
                        case 3: 
                            lists[i].card_status = '已上架';
                            break;
                        case 4: 
                            lists[i].card_status = '已下架';
                            break;
                    };
                };
                this.table_data.page.total = parseInt(res.count);
            }else {
                //请求失败提示
                this.$message({ message: res.msg, type: "error", duration: 2500 });
            };
        });
    };

    //改变状态 重新获取列表数据
    state_change (val) {
        //页码不重置为1的话 有可能请求不到数据
        this.table_data.page.current_page = 1;
        this.send_data.p = 1;
        sessionStorage.setItem("transfer_list_p", "1");
        this.send_data.order_status = val;
        sessionStorage.setItem("transfer_list_state", val);
        this.transfer_list();
    };

    //搜索
    search (val: any) {
        //页码不重置为1的话 有可能请求不到数据
        this.table_data.page.current_page = 1;
        this.send_data.p = 1;
        sessionStorage.setItem("transfer_list_p", "1");
        this.send_data.search = val;
        sessionStorage.setItem("transfer_list_search", val);
        this.transfer_list();
    };

    //清空搜索内容
    clear_search () {
        this.send_data.search = '';
        sessionStorage.setItem("transfer_list_search", "");
        this.transfer_list();
    };

    //筛选时间
    change_time(val: any) {
        //页码不重置为1的话 有可能请求不到数据
        this.table_data.page.current_page = 1;
        this.send_data.p = 1;
        sessionStorage.setItem("transfer_list_p", "1");
        var that: any = this;
        this.send_data.start_time = val[0] ? that.$moment(val[0]).valueOf() / 1000 : "",
        this.send_data.end_time = val[1] ? that.$moment(val[1]).valueOf() / 1000 : "",
        sessionStorage.setItem("transfer_list_start_time", this.send_data.start_time);
        sessionStorage.setItem("transfer_list_end_time", this.send_data.end_time);
        this.transfer_list();
    };

    //清空时间
    clear_time () {
        var that: any = this;
        this.send_data.start_time = "",
        this.send_data.end_time = "",
        sessionStorage.setItem("transfer_list_start_time", this.send_data.start_time);
        sessionStorage.setItem("transfer_list_end_time", this.send_data.end_time);
        this.transfer_list();
    };
    
    //改变页码
    change_page(val: any) {
        this.table_data.page.current_page = val;
        this.send_data.p = val;
        sessionStorage.setItem("transfer_list_p", val);
        this.transfer_list();
    };

    //改变每页的条数
    change_page_size(val: any) {
        this.table_data.page.size = val;
        this.send_data.size = val;
        sessionStorage.setItem("transfer_list_size", val);
        this.transfer_list();
    };

    //改变状态
    change_state (index: any, row: any) {
        var that: any = this;
        if (row.status == 1) {
            that.$confirm("确定禁用ID为 " + row.id +  " 的商家？", "提示", { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }).then( () => {
                this.$store.dispatch("change_state_user", { userSN: row.user_sn, isLock: '1' }).then( (res: any) => {
                    if (res.code == 0) {
                        console.log("改变状态", res);
                        this.table_data.table.lists[index].status = 2;
                        that.$message({ type: "success", message: "已成功禁用ID为 " + row.id + " 的商家！", duration: 2000 });
                    }else {
                        //登录失败提示
                        this.$message({ message: res.msg, type: "error", duration: 2500 });
                    };
                })
            });
        }else {
            that.$confirm("确定开启ID为 " + row.id +  " 的商家？", "提示", { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }).then( () => {
                this.$store.dispatch("change_state_user", { userSN: row.user_sn, isLock: '0' }).then( (res: any) => {
                    if (res.code == 0) {
                        console.log("改变状态", res);
                        this.table_data.table.lists[index].status = 1;
                        that.$message({ type: "success", message: "已成功开启ID为 " + row.id + " 的商家！", duration: 2000 });
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
        this.$router.push({ path: '/order/transfer/details', query: { out_id: row.id } });
    };

    //下架私教课
    down_course (row: any) {
        var that = this;
        if (row.card_status == '已上架') {
            that.$confirm("确定下架订单编号为 " + row.order_sn +  " 的订单？", "提示", { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }).then( () => {
                this.$store.dispatch("down_course", { id: row.id, is_sale: '2' }).then( (res: any) => {
                    if (res.status == 1) {
                        console.log("下架私教课", res);
                        that.$message({ type: "success", message: "已成功下架订单编号为 " + row.id + " 的订单！", duration: 2000 });
                        setTimeout(() => {
                            that.$router.go(0);
                        }, 500);
                    }else {
                        //登录失败提示
                        this.$message({ message: res.msg, type: "error", duration: 2500 });
                    };
                })
            });
        }else {
            that.$confirm("确定上架订单编号为 " + row.order_sn +  " 的订单？", "提示", { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }).then( () => {
                this.$store.dispatch("down_course", { id: row.id, is_sale: '1' }).then( (res: any) => {
                    if (res.status == 1) {
                        console.log("上架私教课", res);
                        that.$message({ type: "success", message: "已成功上架订单编号为 " + row.id + " 的订单！", duration: 2000 });
                        setTimeout(() => {
                            that.$router.go(0);
                        }, 500);
                    }else {
                        //登录失败提示
                        this.$message({ message: res.msg, type: "error", duration: 2500 });
                    };
                })
            });
        };
    }
}

</script>

<style lang="scss">

    @media screen and (min-width: 769px) {
        
    }
</style>