<template>
    <div class="coupon_list">
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
                <router-link to="/coupon/add" tag="span" class="add_btn">
                    <el-button size="medium" type="primary" icon="el-icon-circle-plus-outline">新增</el-button>
                </router-link>
            </p>
            <!-- 表格和页码 -->
            <table_page 
            :table_data='table_data'
            @change_page='change_page'
            @change_page_size='change_page_size'
            @edit='edit_coupon'
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

export default class coupon_list extends Vue{
    //表格、页码数据
    private table_data: any = {
        //表格
        table: {
            //属于哪个表格
            which: 'coupon_list',
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
            current_page: sessionStorage.getItem("coupon_list_p") ? parseInt(sessionStorage.getItem("coupon_list_p")) : 1,
            //每页显示的数量
            size: sessionStorage.getItem("coupon_list_size") ? parseInt(sessionStorage.getItem("coupon_list_size")) : 10,
            sizes: [10, 15, 20],
            //总数量
            total: 0,
        }
    };
    //请求列表数据的参数
    private send_data: any = {
        p: sessionStorage.getItem("coupon_list_p") ? sessionStorage.getItem("coupon_list_p") : 1,
        size: sessionStorage.getItem("coupon_list_size") ? sessionStorage.getItem("coupon_list_size") : 10,
        search: sessionStorage.getItem("coupon_list_search") ? sessionStorage.getItem("coupon_list_search") : "",
        start_time: sessionStorage.getItem("coupon_list_start_time") ? sessionStorage.getItem("coupon_list_start_time") : "",
        end_time: sessionStorage.getItem("coupon_list_end_time") ? sessionStorage.getItem("coupon_list_end_time") : "",
    };
    //需要展示的筛选功能
    private show_filter: any = {
        is_type: "domain02",
        is_search: true,
        placeholder: "请输入优惠券标题",
        show_time: true,
        time_name: '截止时间',
        is_state: false
    };

    mounted () {
        this.coupon_list();
    };
    
    //请求优惠券列表数据
    coupon_list () {
        this.$store.dispatch("coupon_list", this.send_data).then( (res: any) => {
            console.log("优惠券列表", res);
            var that: any = this;
            if (res.code == 0 || res.status == 1) {
                this.table_data.table.lists = res.result;
                //提取长度出来 提高for循环性能
                var lists = this.table_data.table.lists;
                var length = lists.length;
                //转换时间戳
                for (var i = 0; i < length; i++) {
                    //typescript语法严格 不声明会报错
                    lists[i].use_end_time = lists[i].use_end_time == 0 ? "" : that.$moment(lists[i].use_end_time * 1000).format('YYYY-MM-DD HH:mm:ss');
                    lists[i].status = lists[i].status == 1 ? '有效' : '无效';
                    lists[i].type = lists[i].type == 4 ? '注册赠送' : '购买银卡会籍赠';
                    lists[i].use_type = lists[i].use_type == 3 ? '健身专用' : '其他';
                };
                this.table_data.page.total = parseInt(res.count);
            }else {
                //请求失败提示
                this.$message({ message: res.msg, type: "error", duration: 2500 });
            };
        });
    };

    //新增
    add_help () {

    };

    //搜索
    search (val: any) {
        //页码不重置为1的话 有可能请求不到数据
        this.table_data.page.current_page = 1;
        this.send_data.p = 1;
        sessionStorage.setItem("coupon_list_p", "1");
        this.send_data.search = val;
        sessionStorage.setItem("coupon_list_search", val);
        this.coupon_list();
    };

    //清空搜索内容
    clear_search () {
        this.send_data.search = '';
        sessionStorage.setItem("coupon_list_search", "");
        this.coupon_list();
    };

    //筛选时间
    change_time(val: any) {
        //页码不重置为1的话 有可能请求不到数据
        this.table_data.page.current_page = 1;
        this.send_data.p = 1;
        sessionStorage.setItem("coupon_list_p", "1");
        var that: any = this;
        this.send_data.start_time = val[0] ? that.$moment(val[0]).valueOf() / 1000 : "",
        this.send_data.end_time = val[1] ? that.$moment(val[1]).valueOf() / 1000 : "",
        sessionStorage.setItem("coupon_list_start_time", this.send_data.start_time);
        sessionStorage.setItem("coupon_list_end_time", this.send_data.end_time);
        this.coupon_list();
    };

    //清空时间
    clear_time () {
        var that: any = this;
        this.send_data.start_time = "",
        this.send_data.end_time = "",
        sessionStorage.setItem("coupon_list_start_time", this.send_data.start_time);
        sessionStorage.setItem("coupon_list_end_time", this.send_data.end_time);
        this.coupon_list();
    };
    
    //改变页码
    change_page(val: any) {
        this.table_data.page.current_page = val;
        this.send_data.p = val;
        sessionStorage.setItem("coupon_list_p", val);
        this.coupon_list();
    };

    //改变每页的条数
    change_page_size(val: any) {
        this.table_data.page.size = val;
        this.send_data.size = val;
        sessionStorage.setItem("coupon_list_size", val);
        this.coupon_list();
    };

    //新增优惠券
    add_coupon () {
        
    };

    //编辑
    edit_coupon (row: any) {
        sessionStorage.setItem('add_form_data', JSON.stringify(row));
        this.$router.push({ path: '/coupon/add', query: { id: row.id } });
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