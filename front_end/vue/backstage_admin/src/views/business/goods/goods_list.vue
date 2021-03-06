<template>
    <div class="goods_list">
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
                <router-link to="/business/goods/add" tag="span" class="add_btn">
                    <el-button size="medium" type="primary" icon="el-icon-circle-plus-outline">新增商品</el-button>
                </router-link>
            </p>
            <!-- 表格和页码 -->
            <table_page 
            :table_data='table_data'
            @change_page='change_page'
            @change_page_size='change_page_size'
            @look_up='look_up'
            @edit='edit'
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

export default class goods_list extends Vue{
    //表格、页码数据
    private table_data: any = {
        //表格
        table: {
            //属于哪个表格
            which: 'goods_list',
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
            current_page: sessionStorage.getItem("goods_list_p") ? parseInt(sessionStorage.getItem("goods_list_p")) : 1,
            //每页显示的数量
            size: sessionStorage.getItem("goods_list_size") ? parseInt(sessionStorage.getItem("goods_list_size")) : 10,
            sizes: [10, 15, 20],
            //总数量
            total: 0,
        }
    };

    //请求列表数据的参数
    private send_data: any = {
        p: sessionStorage.getItem("goods_list_p") ? sessionStorage.getItem("goods_list_p") : 1,
        size: sessionStorage.getItem("goods_list_size") ? sessionStorage.getItem("goods_list_size") : 10,
        search: sessionStorage.getItem("goods_list_search") ? sessionStorage.getItem("goods_list_search") : "",
        start_time: sessionStorage.getItem("goods_list_start_time") ? sessionStorage.getItem("goods_list_start_time") : "",
        end_time: sessionStorage.getItem("goods_list_end_time") ? sessionStorage.getItem("goods_list_end_time") : ""
    };

    //需要展示的筛选功能
    private show_filter: any = {
        is_type: "domain02",
        is_search: true,
        placeholder: "请输入所属门店"
    };

    mounted () {
        this.goods_list();
    };
    
    //请求goods_list数据
    goods_list () {
        this.$store.dispatch("goods_list", this.send_data).then( (res: any) => {
            console.log("商品列表", res);
            if (res.code == 0 || res.status == 1) {
                this.table_data.table.lists = res.result;
                //提取长度出来 提高for循环性能
                var lists = this.table_data.table.lists;
                var length = lists.length;
                //转换时间戳
                for (var i = 0; i < length; i++) {
                    //typescript语法严格 不声明会报错
                    var that: any = this;
                    lists[i].last_login = lists[i].last_login == 0 ? "" : that.$moment(lists[i].last_login * 1000).format('YYYY-MM-DD HH:mm:ss');
                };
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
        this.table_data.page.current_page = 1;
        this.send_data.p = 1;
        sessionStorage.setItem("goods_list_p", "1");
        this.send_data.search = val;
        sessionStorage.setItem("goods_list_search", val);
        this.goods_list();
    };

    //清空搜索内容
    clear_search () {
        this.send_data.search = '';
        sessionStorage.setItem("goods_list_search", "");
        this.goods_list();
    };

    //筛选时间
    change_time(val: any) {
        //页码不重置为1的话 有可能请求不到数据
        this.table_data.page.current_page = 1;
        this.send_data.p = 1;
        sessionStorage.setItem("goods_list_p", "1");
        var that: any = this;
        this.send_data.start_time = val[0] ? that.$moment(val[0]).valueOf() / 1000 : "",
        this.send_data.end_time = val[1] ? that.$moment(val[1]).valueOf() / 1000 : "",
        sessionStorage.setItem("goods_list_start_time", this.send_data.start_time);
        sessionStorage.setItem("goods_list_end_time", this.send_data.end_time);
        this.goods_list();
    };

    //清空时间
    clear_time () {
        var that: any = this;
        this.send_data.start_time = "",
        this.send_data.end_time = "",
        sessionStorage.setItem("goods_list_start_time", this.send_data.start_time);
        sessionStorage.setItem("goods_list_end_time", this.send_data.end_time);
        this.goods_list();
    };
    
    //改变页码
    change_page(val: any) {
        this.table_data.page.current_page = val;
        this.send_data.p = val;
        sessionStorage.setItem("goods_list_p", val);
        this.goods_list();
    };

    //改变每页的条数
    change_page_size(val: any) {
        this.table_data.page.size = val;
        this.send_data.size = val;
        sessionStorage.setItem("goods_list_size", val);
        this.goods_list();
    };

    //编辑商品
    edit (row: any) {
        if (sessionStorage.getItem('add_form_data')) {
            var data = JSON.parse(sessionStorage.getItem('add_form_data'));
            data.club_name = row.club_name;
            data.cost_price = row.cost_price;
            data.goods_id = row.goods_id;
            data.goods_name = row.goods_name;
            data.sales_sum = row.sales_sum;
            data.shop_price = row.shop_price;
            data.store_id = row.store_id;
            data.card_type = row.card_type;
            data.card_info = row.card_info;
        }else {
            var data = {
                goods_id: row.goods_id,
                goods_name: row.goods_name,
                sales_sum: row.sales_sum,
                shop_price: row.shop_price,
                cost_price: row.cost_price,
                card_type: row.card_type,
                store_id: row.store_id,
                card_info: row.card_info,
                club_name: row.club_name,
            };
        };
        sessionStorage.setItem('add_form_data', JSON.stringify(data));
        this.$router.push({ path: '/business/goods/add', query: { goods_id: row.goods_id } });
    };
    
    //查看
    look_up (row: any) {
        this.$router.push({ path: '/business/goods/details', query: { goods_id: row.goods_id } });
    };
}

</script>

<style lang="scss">

    @media screen and (min-width: 769px) {
        
    }
</style>