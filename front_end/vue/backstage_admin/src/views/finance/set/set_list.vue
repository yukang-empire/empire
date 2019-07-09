<template>
    <div class="set_list">
        <div class="repeat_div">
            <p class="flex_between">
                <span>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon48"></use>
                    </svg>
                    <span>充值设置</span>
                </span>
            </p>
            <!-- 表格和页码 -->
            <table_page 
            :table_data='table_data_recharge'
            @change_page='change_page_recharge'
            @change_page_size='change_page_recharge_size'
            @look_up='look_up_recharge'
            />
        </div>

        <div class="repeat_div">
            <p class="flex_between">
                <span>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#iconqia"></use>
                    </svg>
                    <span>会籍卡设置</span>
                </span>
            </p>
            <!-- 表格和页码 -->
            <table_page 
            :table_data='table_data_card'
            @change_page='change_page_card'
            @change_page_size='change_page_card_size'
            @look_up='look_up_card'
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
        table_page,
    }
})

export default class set_list extends Vue{
    //充值
    private table_data_recharge: any = {
        //表格
        table: {
            //属于哪个表格
            which: 'finance_set_recharge',
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
            current_page: sessionStorage.getItem("finance_set_recharge_p") ? parseInt(sessionStorage.getItem("finance_set_recharge_p")) : 1,
            //每页显示的数量
            size: sessionStorage.getItem("finance_set_recharge_size") ? parseInt(sessionStorage.getItem("finance_set_recharge_size")) : 10,
            sizes: [10, 15, 20],
            //总数量
            total: 0,
        }
    };
    //会籍卡
    private table_data_card: any = {
        //表格
        table: {
            //属于哪个表格
            which: 'finance_set_card',
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
            current_page: sessionStorage.getItem("finance_set_card_p") ? parseInt(sessionStorage.getItem("finance_set_card_p")) : 1,
            //每页显示的数量
            size: sessionStorage.getItem("finance_set_card_size") ? parseInt(sessionStorage.getItem("finance_set_card_size")) : 10,
            sizes: [10, 15, 20],
            //总数量
            total: 0,
        }
    };
    //请求列表数据的参数
    private send_data_recharge: any = {
        p: sessionStorage.getItem("finance_set_recharge_p") ? sessionStorage.getItem("finance_set_recharge_p") : 1,
        size: sessionStorage.getItem("finance_set_recharge_size") ? sessionStorage.getItem("finance_set_recharge_size") : 10,
        search: sessionStorage.getItem("finance_set_recharge_search") ? sessionStorage.getItem("finance_set_recharge_search") : "",
        start_time: sessionStorage.getItem("finance_set_recharge_start_time") ? sessionStorage.getItem("finance_set_recharge_start_time") : "",
        end_time: sessionStorage.getItem("finance_set_recharge_end_time") ? sessionStorage.getItem("finance_set_recharge_end_time") : ""
    };
    //请求列表数据的参数
    private send_data_card: any = {
        p: sessionStorage.getItem("finance_set_card_p") ? sessionStorage.getItem("finance_set_card_p") : 1,
        size: sessionStorage.getItem("finance_set_card_size") ? sessionStorage.getItem("finance_set_card_size") : 10,
        search: sessionStorage.getItem("finance_set_card_search") ? sessionStorage.getItem("finance_set_card_search") : "",
        start_time: sessionStorage.getItem("finance_set_card_start_time") ? sessionStorage.getItem("finance_set_card_start_time") : "",
        end_time: sessionStorage.getItem("finance_set_card_end_time") ? sessionStorage.getItem("finance_set_card_end_time") : ""
    };

    mounted () {
        this.finance_set_recharge();
        this.finance_set_card();
    };
    
    //请求列表数据
    finance_set_recharge () {
        this.$store.dispatch("finance_set_recharge", this.send_data_recharge).then( (res: any) => {
            console.log("商家列表", res);
            if (res.code == 0 || res.status == 1) {
                this.table_data_recharge.table.lists = res.result;
                //提取长度出来 提高for循环性能
                var lists = this.table_data_recharge.table.lists;
                var length = lists.length;
                //转换时间戳
                for (var i = 0; i < length; i++) {
                    //typescript语法严格 不声明会报错
                    var that: any = this;
                    lists[i].add_time = lists[i].add_time == 0 ? "" : that.$moment(lists[i].add_time * 1000).format('YYYY-MM-DD HH:mm:ss');
                };
                this.table_data_recharge.page.total = parseInt(res.count);
            }else {
                //请求失败提示
                this.$message({ message: res.msg, type: "error", duration: 2500 });
            };
        });
    };

    //请求列表数据
    finance_set_card () {
        this.$store.dispatch("finance_set_card", this.send_data_card).then( (res: any) => {
            console.log("商家列表", res);
            if (res.code == 0 || res.status == 1) {
                this.table_data_card.table.lists = res.result;
                //提取长度出来 提高for循环性能
                var lists = this.table_data_card.table.lists;
                var length = lists.length;
                //转换时间戳
                for (var i = 0; i < length; i++) {
                    //typescript语法严格 不声明会报错
                    var that: any = this;
                    lists[i].add_time = lists[i].add_time == 0 ? "" : that.$moment(lists[i].add_time * 1000).format('YYYY-MM-DD HH:mm:ss');
                };
                this.table_data_card.page.total = parseInt(res.count);
            }else {
                //请求失败提示
                this.$message({ message: res.msg, type: "error", duration: 2500 });
            };
        });
    };

    //搜索
    search_recharge (val: any) {
        //页码不重置为1的话 有可能请求不到数据
        this.table_data_recharge.page.current_page = 1;
        this.send_data.p = 1;
        sessionStorage.setItem("finance_set_recharge_p", "1");
        this.send_data.search = val;
        sessionStorage.setItem("finance_set_recharge_search", val);
        this.finance_set_recharge();
    };

    //搜索
    search_card (val: any) {
        //页码不重置为1的话 有可能请求不到数据
        this.table_data_card.page.current_page = 1;
        this.send_data.p = 1;
        sessionStorage.setItem("finance_set_card_p", "1");
        this.send_data.search = val;
        sessionStorage.setItem("finance_set_card_search", val);
        this.finance_set_card();
    };

    //清空搜索内容
    clear_search_recharge () {
        this.send_data.search = '';
        sessionStorage.setItem("finance_set_recharge_search", "");
        this.finance_set_recharge();
    };

    //清空搜索内容
    clear_search_card () {
        this.send_data.search = '';
        sessionStorage.setItem("finance_set_card_search", "");
        this.finance_set_card();
    };

    //筛选时间
    change_time_recharge(val: any) {
        //页码不重置为1的话 有可能请求不到数据
        this.table_data_recharge.page.current_page = 1;
        this.send_data.p = 1;
        sessionStorage.setItem("finance_set_recharge_p", "1");
        var that: any = this;
        this.send_data.start_time = val[0] ? that.$moment(val[0]).valueOf() / 1000 : "",
        this.send_data.end_time = val[1] ? that.$moment(val[1]).valueOf() / 1000 : "",
        sessionStorage.setItem("finance_set_recharge_start_time", this.send_data.start_time);
        sessionStorage.setItem("finance_set_recharge_end_time", this.send_data.end_time);
        this.finance_set_recharge();
    };

    //筛选时间
    change_time_card(val: any) {
        //页码不重置为1的话 有可能请求不到数据
        this.table_data_card.page.current_page = 1;
        this.send_data.p = 1;
        sessionStorage.setItem("finance_set_card_p", "1");
        var that: any = this;
        this.send_data.start_time = val[0] ? that.$moment(val[0]).valueOf() / 1000 : "",
        this.send_data.end_time = val[1] ? that.$moment(val[1]).valueOf() / 1000 : "",
        sessionStorage.setItem("finance_set_card_start_time", this.send_data.start_time);
        sessionStorage.setItem("finance_set_card_end_time", this.send_data.end_time);
        this.finance_set_card();
    };

    //清空时间
    clear_time_recharge () {
        var that: any = this;
        this.send_data.start_time = "",
        this.send_data.end_time = "",
        sessionStorage.setItem("finance_set_recharge_start_time", this.send_data.start_time);
        sessionStorage.setItem("finance_set_recharge_end_time", this.send_data.end_time);
        this.finance_set_recharge();
    };

    //清空时间
    clear_time_card () {
        var that: any = this;
        this.send_data.start_time = "",
        this.send_data.end_time = "",
        sessionStorage.setItem("finance_set_card_start_time", this.send_data.start_time);
        sessionStorage.setItem("finance_set_card_end_time", this.send_data.end_time);
        this.finance_set_card();
    };
    
    //改变页码
    change_page_recharge(val: any) {
        this.table_data_recharge.page.current_page = val;
        this.send_data.p = val;
        sessionStorage.setItem("finance_set_recharge_p", val);
        this.finance_set_recharge();
    };

    //改变页码
    change_page_card(val: any) {
        this.table_data_card.page.current_page = val;
        this.send_data.p = val;
        sessionStorage.setItem("finance_set_card_p", val);
        this.finance_set_card();
    };

    //改变每页的条数
    change_page_recharge_size(val: any) {
        this.table_data_recharge.page.size = val;
        this.send_data.size = val;
        sessionStorage.setItem("finance_set_recharge_size", val);
        this.finance_set_recharge();
    };

    //改变每页的条数
    change_page_card_size(val: any) {
        this.table_data_card.page.size = val;
        this.send_data.size = val;
        sessionStorage.setItem("finance_set_card_size", val);
        this.finance_set_card();
    };

    //查看
    look_up_recharge (row: any) {
        this.$router.push({ path: '/finance/recharge/details', query: { club_id: row.id } });
    };

    //查看
    look_up_card (row: any) {
        this.$router.push({ path: '/finance/card/details', query: { club_id: row.id } });
    };
}

</script>

<style lang="scss">

    @media screen and (min-width: 769px) {
        
    }
</style>