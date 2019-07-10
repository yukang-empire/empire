<template>
    <div class="cash_out_list">
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
                <span class="add_btn">
                    <el-button size="medium" type="primary" icon="el-icon-setting" @click='dialog_cash_out.is_dialog=true'>设置提现规则</el-button>
                </span>
            </p>
            <!-- 表格和页码 -->
            <table_page 
            :table_data='table_data'
            @change_page='change_page'
            @change_page_size='change_page_size'
            @look_up='look_up'
            />
            <p class="total">合计金额：<span>¥{{ 8888.00 }}元</span></p>
            
        </div>

        <!-- 设置提现规则 -->
        <dialog_form :dialog_data='dialog_cash_out' @sure='set_cash_out_rule' />
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import list_filter from "@/components/list_filter.vue";
import table_page from "@/components/table_page.vue";
import dialog_form from "@/components/dialog_form.vue";

@Component({
    components: {
        list_filter,
        table_page,
        dialog_form
    }
})

export default class cash_out_list extends Vue{
    //设置提现规则
    private dialog_cash_out: any = {
        type: 'cash_out',
        is_dialog: false,
        title: '设置提现规则',
        sure_name: '确定设置',
        //表单数据
        form_data: {
            min_all_cash: '',
            min_cash: '',
        },
        //表单规则
        form_rules: {
            min_all_cash: [
                { required: true, message: '请输入最低提现总金额', trigger: 'blur' },
            ],
            min_cash: [
                { required: true, message: '请输入最低提现金额', trigger: 'blur' },
            ]
        }
    };
    //表格、页码数据
    private table_data: any = {
        //表格
        table: {
            //属于哪个表格
            which: 'cash_out_list',
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
            current_page: sessionStorage.getItem("cash_out_list_p") ? parseInt(sessionStorage.getItem("cash_out_list_p")) : 1,
            //每页显示的数量
            size: sessionStorage.getItem("cash_out_list_size") ? parseInt(sessionStorage.getItem("cash_out_list_size")) : 10,
            sizes: [10, 15, 20],
            //总数量
            total: 0,
        }
    };
    //请求列表数据的参数
    private send_data: any = {
        p: sessionStorage.getItem("cash_out_list_p") ? sessionStorage.getItem("cash_out_list_p") : 1,
        size: sessionStorage.getItem("cash_out_list_size") ? sessionStorage.getItem("cash_out_list_size") : 10,
        search: sessionStorage.getItem("cash_out_list_search") ? sessionStorage.getItem("cash_out_list_search") : "",
        start_time: sessionStorage.getItem("cash_out_list_start_time") ? sessionStorage.getItem("cash_out_list_start_time") : "",
        end_time: sessionStorage.getItem("cash_out_list_end_time") ? sessionStorage.getItem("cash_out_list_end_time") : "",
        all_state: [
            {state: 0, name: "全部"},
            {state: 1, name: "待打款"},
            {state: 2, name: "已打款"},
        ],
        current_state: sessionStorage.getItem("cash_out_list_state") ? parseInt(sessionStorage.getItem("cash_out_list_state")) : 0,
    };
    //需要展示的筛选功能
    private show_filter: any = {
        is_type: "domain02",
        is_search: true,
        placeholder: "请输入提现人、手机号(全部)",
        show_time: true,
        time_name: '申请日期',
        is_state: true,
        state_name: '选择订单状态'
    };

    mounted () {
        this.cash_out_list();
    };
    
    //请求提现列表数据
    cash_out_list () {
        this.$store.dispatch("cash_out_list", this.send_data).then( (res: any) => {
            console.log("商家列表", res);
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
                    //拼接省市区
                    lists[i].address = lists[i].province + lists[i].city + lists[i].area;
                };
                this.table_data.page.total = parseInt(res.count);
            }else {
                //请求失败提示
                this.$message({ message: res.msg, type: "error", duration: 2500 });
            };
        });
    };

    //设置提现规则
    set_cash_out_rule (type: any, data: any) {
        this.$store.dispatch("set_cash_out_rule", data).then( (res: any) => {
            console.log("设置提现规则", res);
            if (res.code == 0 || res.status == 1) {

                this.$message({ message: "设置规则成功！", type: "success", duration: 2500 });
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
        sessionStorage.setItem("cash_out_list_p", "1");
        this.send_data.current_state = val;
        sessionStorage.setItem("cash_out_list_state", val);
        this.cash_out_list();
    };

    //搜索
    search (val: any) {
        //页码不重置为1的话 有可能请求不到数据
        this.table_data.page.current_page = 1;
        this.send_data.p = 1;
        sessionStorage.setItem("cash_out_list_p", "1");
        this.send_data.search = val;
        sessionStorage.setItem("cash_out_list_search", val);
        this.cash_out_list();
    };

    //清空搜索内容
    clear_search () {
        this.send_data.search = '';
        sessionStorage.setItem("cash_out_list_search", "");
        this.cash_out_list();
    };

    //筛选时间
    change_time(val: any) {
        //页码不重置为1的话 有可能请求不到数据
        this.table_data.page.current_page = 1;
        this.send_data.p = 1;
        sessionStorage.setItem("cash_out_list_p", "1");
        var that: any = this;
        this.send_data.start_time = val[0] ? that.$moment(val[0]).valueOf() / 1000 : "",
        this.send_data.end_time = val[1] ? that.$moment(val[1]).valueOf() / 1000 : "",
        sessionStorage.setItem("cash_out_list_start_time", this.send_data.start_time);
        sessionStorage.setItem("cash_out_list_end_time", this.send_data.end_time);
        this.cash_out_list();
    };

    //清空时间
    clear_time () {
        var that: any = this;
        this.send_data.start_time = "",
        this.send_data.end_time = "",
        sessionStorage.setItem("cash_out_list_start_time", this.send_data.start_time);
        sessionStorage.setItem("cash_out_list_end_time", this.send_data.end_time);
        this.cash_out_list();
    };
    
    //改变页码
    change_page(val: any) {
        this.table_data.page.current_page = val;
        this.send_data.p = val;
        sessionStorage.setItem("cash_out_list_p", val);
        this.cash_out_list();
    };

    //改变每页的条数
    change_page_size(val: any) {
        this.table_data.page.size = val;
        this.send_data.size = val;
        sessionStorage.setItem("cash_out_list_size", val);
        this.cash_out_list();
    };

    //查看
    look_up (row: any) {
        this.$router.push({ path: '/order/service/details', query: { club_id: row.id } });
    };
}

</script>

<style lang="scss">

    @media screen and (min-width: 769px) {
        
        .add_btn {

            .el-button {
                letter-spacing: 1px;
            }
        }
    }
</style>