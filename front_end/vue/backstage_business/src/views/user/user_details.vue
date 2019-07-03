<template>
    <div class="user_details">
        <!-- 基本信息 -->
        <base_info :base_info="base_info" :base_info_type='base_info_type' />
        <!-- 统计信息 -->
        <div class="repeat_div">
            <p>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#iconshitu_gaikuang"></use>
                </svg>
                <span>统计信息</span>
            </p>
            <table_page :table_data='table_data_statistic' />
        </div>
        <!-- 订单记录 -->
        <div class="repeat_div">
            <p>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icondingdan1"></use>
                </svg>
                <span>订单记录</span>
            </p>
            <table_page :table_data='table_data_order' @change_page="change_page_order" @change_page_size="change_size_order" />
        </div>
        <!-- 充值记录 -->
        <div class="repeat_div">
            <p>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon3"></use>
                </svg>
                <span>充值记录</span>
            </p>
            <table_page :table_data='table_data_recharge' @change_page="change_page_recharge" @change_page_size="change_size_recharge" />
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import base_info from "@/components/base_info.vue";
import table_page from "@/components/table_page.vue";

@Component({
    components: {
        base_info,
        table_page
    }
})

export default class user_details extends Vue{
    private base_info: any = {};
    private base_info_type: string = "user";

    //统计信息
    private table_data_statistic: any = {
        //表格
        table: {
            //属于哪个表格
            which: 'user_statistic',
            //是否多选
            checkbox: false,
            //是否固定表头
            is_height: "auto",
            //表格数据
            lists: [
                { total_amount: '', order: '', underling_number: '', coupon: '', user_points: '', cool_B: "", last_login: '' },
            ],
        },
        //页码
        page: {
            //是否显示页码
            is_page: false,
        }
    };

    //订单记录
    private table_data_order: any = {
        //表格
        table: {
            //属于哪个表格
            which: 'user_order',
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
            current_page: sessionStorage.getItem("user_order_page") ? parseInt(sessionStorage.getItem("user_order_page")) : 1,
            //每页显示的数量
            size: sessionStorage.getItem("user_order_size") ? parseInt(sessionStorage.getItem("user_order_size")) : 5,
            sizes: [5, 10],
            //总数量
            total: 0,
        }
    };

    //充值记录
    private table_data_recharge: any = {
        //表格
        table: {
            //属于哪个表格
            which: 'user_recharge',
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
            current_page: sessionStorage.getItem("user_recharge_page") ? parseInt(sessionStorage.getItem("user_recharge_page")) : 1,
            //每页显示的数量
            size: sessionStorage.getItem("user_recharge_size") ? parseInt(sessionStorage.getItem("user_recharge_size")) : 5,
            sizes: [5, 10],
            //总数量
            total: 0,
        }
    };

    //请求订单记录的参数
    private user_order_data: any = {
        page: sessionStorage.getItem("user_order_page") ? sessionStorage.getItem("user_order_page") : 1,
        size: sessionStorage.getItem("user_order_size") ? sessionStorage.getItem("user_order_size") : 5,
        user_id: ''
    };

    //请求充值记录的参数
    private user_recharge_data: any = {
        page: sessionStorage.getItem("user_recharge_page") ? sessionStorage.getItem("user_recharge_page") : 1,
        size: sessionStorage.getItem("user_recharge_size") ? sessionStorage.getItem("user_recharge_size") : 5,
        user_id: ''
    };

    mounted () {
        var that: any = this;
        //请求用户的基本信息
        this.$store.dispatch("user_base_info", { id: this.$route.query.id}).then( res => {
            console.log("基本信息", res);
            if (res.code == 0) {
                this.base_info = res.data;
                //保存用户user_id, 方便后续请求
                sessionStorage.setItem('user_id', this.base_info.user_id);
                //性别
                if (this.base_info.sex == 1) {
                    this.base_info.sex = '男';
                }else if (this.base_info.sex == 2) {
                    this.base_info.sex = '女';
                }else {
                    this.base_info.sex = '保密';
                };
                if (this.base_info.province == 0) { this.base_info.province = "" };
                if (this.base_info.city == 0) { this.base_info.city = "" };
                if (this.base_info.district == 0) { this.base_info.district = "" };
                if (this.base_info.address == 0) { this.base_info.address = "" };
                //统计信息的数据
                var statistic = this.table_data_statistic.table.lists[0];
                statistic.total_amount = this.base_info.total_amount;
                statistic.underling_number = this.base_info.underling_number;
                statistic.user_points = this.base_info.user_points;
                statistic.cool_B = this.base_info.cool_B;
                //转换登录时间格式
                statistic.last_login = this.base_info.last_login > 0 ? that.$moment(this.base_info.last_login * 1000).format('YYYY-MM-DD HH:mm:ss') : "";
                //获取用户其他记录
                this.user_order();
                this.user_recharge();
                this.user_coupon();
            }else {
                //获取失败提示
                this.$message({ message: res.msg, type: "error", duration: 2500 });
            };
        });
    };

    //请求用户的订单记录
    user_order () {
        var that: any = this;
        this.user_order_data.user_id = sessionStorage.getItem('user_id');
        this.$store.dispatch("user_order", this.user_order_data).then( res => {
            console.log("订单记录", res);
            if (res.code == 0) {
                //获取统计信息里的订单数量
                this.table_data_statistic.table.lists[0].order = res.count;
                //订单记录
                this.table_data_order.table.lists = res.data;
                this.table_data_order.page.total = parseInt(res.count);
                var lists = this.table_data_order.table.lists;
                var length = lists.length;
                //转换提交时间格式
                for (var i = 0; i < length; i++) {
                    lists[i].add_time = lists[i].add_time ? that.$moment(lists[i].add_time * 1000).format('YYYY-MM-DD HH:mm:ss') : "";
                };
            }else {
                //获取失败提示
                this.$message({ message: res.msg, type: "error", duration: 2500 });
            };
        });
    };

    //请求用户的充值记录
    user_recharge () {
        var that: any = this;
        this.user_recharge_data.user_id = sessionStorage.getItem('user_id');
        this.$store.dispatch("user_recharge", this.user_recharge_data).then( res => {
            console.log("充值记录", res);
            if (res.code == 0) {
                this.table_data_recharge.table.lists = res.data;
                this.table_data_recharge.page.total = parseInt(res.count);
                var lists = this.table_data_recharge.table.lists;
                var length = lists.length;
                //转换充值时间格式
                for (var i = 0; i < length; i++) {
                    lists[i].ctime = lists[i].ctime ? that.$moment(lists[i].ctime * 1000).format('YYYY-MM-DD HH:mm:ss') : "";
                };
            }else {
                //获取失败提示
                this.$message({ message: res.msg, type: "error", duration: 2500 });
            };
        });
    };

    //请求用户的优惠券信息
    user_coupon () {
        var that: any = this;
        //只请求一次 获取统计信息的优惠券数量字段而已
        var send_data = { page: 1, size: 10, user_id: sessionStorage.getItem('user_id') };
        this.$store.dispatch("user_coupon", send_data).then( res => {
            console.log("用户优惠券信息", res);
            if (res.code == 0) {
                //获取统计信息里的订单数量
                this.table_data_statistic.table.lists[0].coupon = res.count;
            }else {
                //获取失败提示
                this.$message({ message: res.msg, type: "error", duration: 2500 });
            };
        });
    };

    //改变订单记录页码
    change_page_order(val: any) {
        this.table_data_order.page.current_page = val;
        this.user_order_data.page = val;
        sessionStorage.setItem("user_order_page", val);
        this.user_order();
    };

    //改变充值记录页码
    change_page_recharge(val: any) {
        this.table_data_recharge.page.current_page = val;
        this.user_recharge_data.page = val;
        sessionStorage.setItem("user_recharge_page", val);
        this.user_recharge();
    };

    //改变订单记录每页的条数
    change_size_order(val: any) {
        this.table_data_order.page.size = val;
        this.user_order_data.size = val;
        sessionStorage.setItem("user_order_size", val);
        this.user_order();
    };

    //改变充值记录每页的条数
    change_size_recharge(val: any) {
        this.table_data_recharge.page.size = val;
        this.user_recharge_data.size = val;
        sessionStorage.setItem("user_recharge_size", val);
        this.user_recharge();
    };
}

</script>

<style lang="scss">

    @media screen and (min-width: 769px) {
        
    }
</style>