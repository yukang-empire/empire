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
            @clear_select='clear_select'
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
                    <download-excel
                        class = "export-excel-wrapper"
                        :data = "json_data"
                        :fields = "json_fields"
                        name = "今日提现申请表.xls">
                        <!-- 上面可以自定义自己的样式，还可以引用其他组件button -->
                        <el-button size="medium" type="primary" icon="el-icon-document">导出Excel</el-button>
                    </download-excel>
                    <!-- <el-button size="medium" type="primary" icon="el-icon-document" @click='excel'>导出Excel</el-button> -->
                    <el-button size="medium" type="primary" icon="el-icon-setting" @click='dialog_cash_out.is_dialog=true'>设置提现规则</el-button>
                </span>
            </p>
            <!-- 表格和页码 -->
            <table_page 
            :table_data='table_data'
            @change_page='change_page'
            @change_page_size='change_page_size'
            @look_up='look_up'
            @check_cash_out='check_cash_out'
            />
            <p class="total">合计金额：<span>¥{{ cashSum }}元</span></p>
            
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

    private json_fields: any = {
        // "Complete name": "name",    //常规字段
        //     Telephone: "phone.mobile", //支持嵌套属性
        // "Telephone 2": {
        //     field: "phone.landline",
        //             //自定义回调函数
        //     callback: value => {
        //         return `Landline Phone - ${value}`;
        //     }
        // }
        "ID": "id",
        "卡类型": "bank_type",
        "申请提现人": "bank_people",
        "手机号码": "mobile",
        "提现金额": "money",
        "提现账户": "bankcard",
        "账户类型": "openbank",
        "申请日期": "add_time",
        "打款日期": "up_time",
        "状态": "status",
    };
    get json_data(): any {   // 计算属性的get
        return this.$store.state.cash_out_excel || [];
    };
    private json_meta: any = [
        [
            {
            " key ": " charset ",
            " value ": " utf- 8 "
            }
        ]
    ];
    private cashSum: any = '';
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
            max_order: ''
        },
        //表单规则
        form_rules: {
            min_all_cash: [
                { required: true, message: '请输入最低提现总金额', trigger: 'blur' },
            ],
            min_cash: [
                { required: true, message: '请输入最低提现金额', trigger: 'blur' },
            ],
            max_order: [
                { required: true, message: '请输入每日提现次数上限', trigger: 'blur' },
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
            current_page: sessionStorage.getItem("cash_out_list_page") ? parseInt(sessionStorage.getItem("cash_out_list_page")) : 1,
            //每页显示的数量
            size: sessionStorage.getItem("cash_out_list_size") ? parseInt(sessionStorage.getItem("cash_out_list_size")) : 10,
            sizes: [10, 15, 20],
            //总数量
            total: 0,
        }
    };
    //请求列表数据的参数
    private send_data: any = {
        page: sessionStorage.getItem("cash_out_list_page") ? sessionStorage.getItem("cash_out_list_page") : 1,
        size: sessionStorage.getItem("cash_out_list_size") ? sessionStorage.getItem("cash_out_list_size") : 10,
        where: {
            mobile: sessionStorage.getItem("cash_out_list_mobile") ? sessionStorage.getItem("cash_out_list_mobile") : "",
            status: sessionStorage.getItem("cash_out_list_status") ? sessionStorage.getItem("cash_out_list_status") : "",
            stime: sessionStorage.getItem("cash_out_list_stime") ? sessionStorage.getItem("cash_out_list_stime") : "",
            etime: sessionStorage.getItem("cash_out_list_etime") ? sessionStorage.getItem("cash_out_list_etime") : ""
        }
    };
    //需要展示的筛选功能
    private show_filter: any = {
        is_type: "domain01",
        is_search: true,
        placeholder: "请输入手机号(全部)",
        show_time: true,
        time_name: '申请日期',
        is_state: true,
        state_name: '选择订单状态',
        all_state: [
            {state: 1, name: '已申请'},
            {state: 2, name: '提现成功'},
            {state: 3, name: '提现失败'},
        ]
    };

    mounted () {
        this.cash_out_list();
    };
    
    //请求提现列表数据
    cash_out_list () {
        this.$store.dispatch("cash_out_list", this.send_data).then( (res: any) => {
            console.log("提现列表", res);
            if (res.code == 0) {
                this.table_data.table.lists = res.data.cashOut;
                //提取长度出来 提高for循环性能
                var lists = this.table_data.table.lists;
                var length = lists.length;
                //转换时间戳
                for (var i = 0; i < length; i++) {
                    //typescript语法严格 不声明会报错
                    var that: any = this;
                    lists[i].add_time = lists[i].add_time == 0 ? "" : that.$moment(lists[i].add_time * 1000).format('YYYY-MM-DD HH:mm:ss');
                    lists[i].up_time = lists[i].up_time == 0 ? "" : that.$moment(lists[i].up_time * 1000).format('YYYY-MM-DD HH:mm:ss');
                    //状态
                    if (lists[i].status == 1) {
                        lists[i].status = '已申请';
                    }else if (lists[i].status == 2) {
                        lists[i].status = '提现成功';
                    }else if (lists[i].status == 3) {
                        lists[i].status = '提现失败';
                    }else {
                        lists[i].status = '';
                    };
                    //类型
                    if (lists[i].bank_type == 1) {
                        lists[i].bank_type = '银行卡';
                    }else if (lists[i].bank_type == 2) {
                        lists[i].bank_type = '微信';
                    }else if (lists[i].bank_type == 3) {
                        lists[i].bank_type = '支付宝';
                    }else {
                        lists[i].bank_type = '';
                    };
                };
                //总个数
                this.table_data.page.total = parseInt(res.count);
                this.cashSum = res.data.cashSum;
                this.$store.commit('change_cash_out_excel', JSON.stringify(this.table_data.table.lists));
                console.log(this.$store.state.cash_out_excel);

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
        this.send_data.page = 1;
        sessionStorage.setItem("cash_out_list_page", "1");
        this.send_data.where.status = val;
        sessionStorage.setItem("cash_out_list_state", val);
        this.cash_out_list();
    };

    //清空下拉选择状态
    clear_select () {
        this.send_data.where.status = '';
        sessionStorage.setItem("cash_out_list_state", "");
        this.cash_out_list();
    };

    //搜索 重新获取列表数据
    search (val: any) {
        //页码不重置为1的话 有可能请求不到数据
        this.send_data.page = 1;
        this.table_data.page.current_page = 1;
        sessionStorage.setItem("cash_out_list_page", '1');
        this.send_data.where.mobile = val;
        sessionStorage.setItem("cash_out_list_mobile", val);
        this.cash_out_list();
    };

    //清空搜索内容
    clear_search () {
        this.send_data.where.mobile = '';
        sessionStorage.setItem("cash_out_list_mobile", "");
        this.cash_out_list();
    };

    //筛选时间
    change_time(val: any) {
        //页码不重置为1的话 有可能请求不到数据
        this.send_data.page = 1;
        this.table_data.page.current_page = 1;
        sessionStorage.setItem("cash_out_list_page", '1');
        var that: any = this;
        this.send_data.where.stime = val[0] ? that.$moment(val[0]).valueOf() / 1000 : "",
        this.send_data.where.etime = val[1] ? that.$moment(val[1]).valueOf() / 1000 : "",
        sessionStorage.setItem("cash_out_list_stime", this.send_data.where.stime);
        sessionStorage.setItem("cash_out_list_etime", this.send_data.where.etime);
        this.cash_out_list();
    };

    //清空时间
    clear_time () {
        var that: any = this;
        this.send_data.where.stime = "",
        this.send_data.where.etime = "",
        sessionStorage.setItem("cash_out_list_stime", this.send_data.where.stime);
        sessionStorage.setItem("cash_out_list_etime", this.send_data.where.etime);
        this.cash_out_list();
    };
    
    //改变页码
    change_page(val: any) {
        this.table_data.page.current_page = val;
        this.send_data.page = val;
        sessionStorage.setItem("cash_out_list_page", val);
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
        this.$router.push({ path: '/finance/cash_out/details', query: { id: row.id } });
    };
    //审核
    check_cash_out (row: any) {
        console.log(row);
        this.$confirm("确定通过由 " + row.bank_people + " 发起的" + row.money + "元提现申请吗？", "提示", { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }).then( () => {
            this.$store.dispatch("cash_out_pass", { user_id: row.user_id, cash_sn: row.cash_sn }).then( (res: any) => {
                if (res.status == 0) {
                    console.log("提现通过", res);
                    this.$message({ message: res.msg, type: "success", duration: 2500 });
                    this.cash_out_list();
                }else {
                    //登录失败提示
                    this.$message({ message: res.msg, type: "error", duration: 2500 });
                };
            })
        });
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
        .el-button--medium {
            padding: 10px 10px;
            margin-left: 12px;
        }
    }
</style>