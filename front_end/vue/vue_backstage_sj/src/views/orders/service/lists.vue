<template>
    <div class="service_list">
        <div class="repeat_div">
            <p>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-funnel"></use>
                </svg>
                <span>筛选数据</span>
            </p>
            <div class="search_input">
                <span style="margin-right: 10px">选择订单状态：</span>
                <el-dropdown trigger='click' placement='bottom' @command="handleCommand">
                    <el-button type="primary">
                        {{ default_select }}<i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="全部">全部</el-dropdown-item>
                        <el-dropdown-item command="待使用">待使用</el-dropdown-item>
                        <el-dropdown-item command="已使用">已使用</el-dropdown-item>
                        <!-- <el-dropdown-item command="已取消">已取消</el-dropdown-item> -->
                    </el-dropdown-menu>
                </el-dropdown>

                <span style="margin-left: 40px;">输入关键词：</span>
                <el-input
                    placeholder="请输入要搜索的关键词"
                    v-model="send_data.search"
                    @clear='clear'
                    @keyup.native.enter='search'
                    clearable>
                </el-input>
                <el-button type="primary" @click='search'>搜索</el-button>
                
                <span class="time">提交时间：</span>
                <el-date-picker
                    v-model="search_time"
                    type="daterange"
                    range-separator="至"
                    @change='change_time'
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </div>
        </div>

        <div class="repeat_div">
            <p>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-shitu_gaikuang"></use>
                </svg>
                <span>{{ $store.state.current_route ? $store.state.current_route.meta.title : '' }}</span>
            </p>
            <!-- 表格和页码 -->
            <table_page 
            :table_data='table_data'
            @change_page='change_page'
            @change_page_size='change_page_size'
            @change_ban='change_ban'
            @look_up='look_up'
            @check='check'
            />
            
        </div>

        <!-- 弹框 -->
        <dialog_component :dialog='dialog' @off_dialog='off_dialog' />

        <!-- 点击核销 -->
        <el-dialog title="订单核销" :visible.sync="dialogFormVisible">
            <span style="min-width: 80px;text-align: right;display: inline-block;">卡劵码：</span>
            <el-input
                placeholder="请输入卡劵码"
                v-model="kjm"
                clearable>
            </el-input>
            <!-- <el-button type="text">检索</el-button> -->
            <p style="color: red;margin: 5px 0 0 0;text-align: center;" v-if='is_show_kjm'>{{ check_tip }}</p>
            <div class="check_item" style="margin-top: 30px;">
                <p>订单号：</p>
                <p>{{ check_data.order_sn }}</p>
            </div>
            <div class="check_item">
                <p>用户手机：</p>
                <p>{{ check_data.mobile }}</p>
            </div>
            <div class="check_item">
                <p>订单标题：</p>
                <p>{{ check_data.card_type }}</p>
            </div>
            <div class="check_item">
                <p>订单金额：</p>
                <p>¥{{ check_data.total_amount }}</p>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="sure_check">确定核销</el-button>
            </div>
        </el-dialog>


    </div>
</template>

<script>
import dialog_component from '@/common/components/dialog.vue';
import table_page from '@/common/components/table_page.vue';

export default {
    name: 'service_list',
    components: {
        dialog_component,
        table_page
    },
    data () {
        return {
            dialogFormVisible: false,
            kjm: '',
            is_show_kjm: false,
            check_tip: '',
            formLabelWidth: '120px',
            //弹框数据
            dialog: {
                is_open: false,
                msg: '',
                type: '1',
            },
            //表格和页码的数据
            table_data: {
                //表格
                table: {
                    //要展示哪些行
                    select: 'ddjl',
                    //是否固定表头
                    is_height: 769,
                    //表格数据
                    lists: [
                        {order_sn: '46456546434',yhsj: '18312001212',goods_name: '健身房次卡',yhnc: '康哥', order_status: '待支付', add_time: '2019-01-25 10:55', total_amount: '100.00'},
                        {order_sn: '46456546434',yhsj: '18312001212',goods_name: '共享卡预约',yhnc: '康哥', order_status: '待核销', add_time: '2019-01-25 10:55', total_amount: '100.00'},
                        {order_sn: '46456546434',yhsj: '18312001212',goods_name: '健身房次卡',yhnc: '康哥', order_status: '待支付', add_time: '2019-01-25 10:55', total_amount: '100.00'},
                        {order_sn: '46456546434',yhsj: '18312001212',goods_name: '健身房次卡',yhnc: '康哥', order_status: '待支付', add_time: '2019-01-25 10:55', total_amount: '100.00'},
                        {order_sn: '46456546434',yhsj: '18312001212',goods_name: '健身房次卡',yhnc: '康哥', order_status: '待支付', add_time: '2019-01-25 10:55', total_amount: '100.00'},
                        {order_sn: '46456546434',yhsj: '18312001212',goods_name: '健身房次卡',yhnc: '康哥', order_status: '待支付', add_time: '2019-01-25 10:55', total_amount: '100.00'},
                        {order_sn: '46456546434',yhsj: '18312001212',goods_name: '健身房次卡',yhnc: '康哥', order_status: '待支付', add_time: '2019-01-25 10:55', total_amount: '100.00'},
                        {order_sn: '46456546434',yhsj: '18312001212',goods_name: '健身房次卡',yhnc: '康哥', order_status: '待支付', add_time: '2019-01-25 10:55', total_amount: '100.00'},
                        {order_sn: '46456546434',yhsj: '18312001212',goods_name: '健身房次卡',yhnc: '康哥', order_status: '待支付', add_time: '2019-01-25 10:55', total_amount: '100.00'},
                    ],
                    //需要改变的行开关状态
                    switch: {
                        index: null,
                        ban: null,
                        user_sn: ''
                    },
                },
                //页码
                page: {
                    is_page: true,
                    //当前页码
                    current_page: 1,
                    //总数量
                    total: null,
                }
            },
            //搜索的内容
            search_input: null,
            search_time: null,
            default_select: '全部',
            //请求数据的参数
            send_data: {
                status: 0,
                p: 1,
                search: '',
                start_time: '',
                end_time: '',
                token: sessionStorage.getItem('token')
            },
            //核销需要的参数
            check_data: {
                order_sn: '',
                mobile: '',
                card_type: '',
                total_amount: '',
            }
        }
    },
    methods: {
        //确定核销
        sure_check () {
            if (!this.kjm) {
                this.is_show_kjm = true;
                this.check_tip= '请输入卡劵码！';
            }else {
                var that = this;
                var params = new FormData();
                params.append("id", this.check_data.id);
                params.append("code", this.kjm);
                params.append("token", sessionStorage.getItem('token'));
                this.$axios.post("/index.php?m=Api&c=Club&a=store_use_order", params).then( response => {
                    console.log("核销", response);
                    var res = response.data;
                    if (res.status == 0) {
                        that.is_show_kjm = true;
                        that.check_tip= res.msg;
                        that.$message({
                            message: res.msg,
                            type: 'error',
                            duration: 2500
                        });
                    }else if (res.status == 1) {
                        that.is_show_kjm = true;
                        that.check_tip= res.msg;
                        that.dialogFormVisible = false;
                        that.get_lists(that.send_data);
                        that.$message({
                            message: "核销成功！",
                            type: 'success',
                            duration: 2500
                        });
                    };
                });
            };
        },
        //核销
        check (row) {
            console.log(row);
            this.check_data = row;
            this.dialogFormVisible = true;
        },
        //下拉选择
        handleCommand(command) {
            console.log(command);
            this.default_select = command;
            switch (command) {
                case '全部': 
                    this.send_data.status = 0;
                    break;
                case '待使用':
                    this.send_data.status = 1;
                    break;
                case '已使用':
                    this.send_data.status = 2;
                    break;
            };
            this.get_lists(this.send_data);
        },
        //请求数据
        get_lists(param) {
            var that = this;
            var params = new FormData();
            params.append("status",param.status);
            params.append("p",param.p);
            params.append("search",param.search);
            params.append("start_time",param.start_time);
            params.append("end_time",param.end_time);
            params.append("token",param.token);
            this.$axios.post('/index.php?m=Api&c=Club&a=club_order', params).then(response => {
                console.log('订单列表', response);
                var res = response.data;
                var length = res.result.length;
                for (var i = 0; i < length; i ++) {
                    switch (res.result[i].status) {
                        case 1: 
                            res.result[i].status = '待使用';
                            break;
                        case 2: 
                            res.result[i].status = '已使用';
                            break;
                    };
                    res.result[i].create_time = that.$moment(res.result[i].create_time * 1000).format('YYYY-MM-DD HH:mm:ss');
                    res.result[i].use_time = res.result[i].use_time == 0 ? "" : that.$moment(res.result[i].use_time * 1000).format('YYYY-MM-DD HH:mm:ss');
                };
                this.table_data.table.lists = res.result;
                this.table_data.page.total = parseInt(res.count);
            })
        },
        //关闭弹框
        off_dialog (state) {
            //确定则修改此行的ban状态
            if (state == 'sure') {
                this.table_data.table.lists[this.table_data.table.switch.index].is_lock = this.table_data.table.switch.is_lock;
                var params = {
                    userSN: this.table_data.table.switch.user_sn,
                    isLock: this.table_data.table.switch.is_lock
                };
                this.$axios.post('/api/userLock', JSON.stringify(params)).then(response => {
                    console.log(response);
                });
            };
            this.dialog.is_open = false;
        },
        //筛选时间
        change_time(val) {
            console.log(val);
            if (val) {
                // this.send_data.start_time = this.$moment(val[0]).valueOf() / 1000;
                // this.send_data.end_time = this.$moment(val[1]).valueOf() / 1000;
                this.send_data.start_time = this.$moment(val[0]).format('YYYY-MM-DD');
                this.send_data.end_time = this.$moment(val[1]).format('YYYY-MM-DD');
            }else {
                this.send_data.start_time = '';
                this.send_data.end_time = '';
            };
            this.get_lists(this.send_data);
        },
        //改变页码页数
        change_page(val) {
            this.table_data.page.current_page = val;
            this.send_data.p = val;
            this.get_lists(this.send_data);
        },
        //搜索
        search () {
            this.get_lists(this.send_data);
        },
        //清空
        clear () {
            this.table_data.page.current_page = 1;
            this.send_data = {
                status: 0,
                p: 1,
                search: '',
                start_time: '',
                end_time: '',
                token: sessionStorage.getItem('token')
            };
            this.get_lists(this.send_data);
        },
        //改变每页的条数
        change_page_size(val) {
            console.log(`每页 ${val} 条`);
        },
        //点击禁用/开启账户
        change_ban (index, val, user_sn) {
            this.dialog.is_open = true;
            if (val == 1) {
                this.dialog.msg = '是否开启?';
                //改为禁用 提交给弹框处理
                this.table_data.table.switch.is_lock = 0;
            }else {
                this.dialog.msg = '是否禁用?';
                //改为开启 交接给弹框处理
                this.table_data.table.switch.is_lock = 1;
            };
            this.table_data.table.switch.index = index;
            this.table_data.table.switch.user_sn = user_sn;
        },
        //查看
        look_up (row) {
            console.log(row)
            this.$router.push({ path: '/orders/ddxq', query: { id: row.id } });
            var user_id = {
                id: row.id
            };
            sessionStorage.setItem('order_id', JSON.stringify(user_id));
        },
    },
    mounted () {
        // this.search_time = [new Date(2019, 5, 1, 8, 30), new Date(2019, 5, 10, 22, 30)];
        this.table_data.page.current_page = sessionStorage.getItem('page') ? parseInt(sessionStorage.getItem('page')) : 1;
        this.get_lists(this.send_data);
    }
}
</script>

<style lang='scss'>
    input::-webkit-input-placeholder{
        font-size: 0.85rem;
    }
    input::-moz-input-placeholder{
        font-size: 0.85rem;
    }
    input::-ms-input-placeholder{
        font-size: 0.85rem;
    }
    
    .el-dialog__body {
        padding-bottom: 10px;
        padding-left: 30px;
    }
    .el-dialog__header {
        text-align: center;
    }
    .el-dialog__footer {
        text-align: center;
    }
    .el-dialog {
        margin-top: 200px !important;
        width: 500px;
    }
</style>
<style lang='scss' scoped>
    .el-button {
        margin: 0 30px 0 10px;
    }
    .check_item {
        display: flex;
        align-items: center;
        margin: 15px 0;

        p:first-of-type {
            min-width: 80px;
            text-align: right;
            margin-right: 20px;
        }
    }
    .service_list {
        padding: 0 20px;

        .el-input {
            width: 250px;
            margin: 0 15px;
        }

    }
    .search_input {
        display: flex;
        align-items: center;
    }
    .time {
        margin: 0 20px 0 50px;
    }
    @media screen and (min-width: 769px) {
        
    }
</style>