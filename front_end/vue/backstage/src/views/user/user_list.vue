<template>
    <div class="user_list">

        <div class="repeat_div">
            <p>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#iconshitu_gaikuang"></use>
                </svg>
                <span>{{ $store.state.current_route ? $store.state.current_route.meta.title : "列表数据" }}</span>
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
import table_page from "@/components/table_page.vue";

@Component({
    components: {
        table_page
    }
})

export default class user_list extends Vue{
    //表格、页码数据
    private table_data: any = {
        //表格
        table: {
            //属于哪个表格
            which: 'user_list',
            //是否固定表头
            is_height: 750,
            //表格数据
            lists: [
                { user_id: '6', nickname: '康哥', mobile: '18312001212', city: '1111', total_amount: '8', last_login: 1559214576, is_lock: 1 },
            ],
            //行开关状态
            switch: {
                index: null,
                ban: null,
                user_sn: ''
            },
        },
        //页码
        page: {
            //是否显示页码
            is_page: true,
            //当前页码
            current_page: 1,
            //每页显示的数量
            size: 10,
            //总数量
            total: 0,
        }
    };
    //请求列表数据的参数
    private send_data: any = {
        page: sessionStorage.getItem("page") ? sessionStorage.getItem("page") : 1,
        size: sessionStorage.getItem("size") ? sessionStorage.getItem("size") : 10,
        where: {
            keyword: sessionStorage.getItem("keyword") ? sessionStorage.getItem("keyword") : "",
            stime: sessionStorage.getItem("stime") ? sessionStorage.getItem("stime") : "",
            etime: sessionStorage.getItem("etime") ? sessionStorage.getItem("etime") : ""
        }
    };

    mounted () {
        this.user_list();
    };
    
    //请求user_list数据
    user_list () {
        this.$store.dispatch("user_list", this.send_data).then( (res: any) => {
            console.log("用户列表", res);
            if (res.code == 0) {
                this.table_data.table.lists = res.data;
                this.table_data.page.total = parseInt(res.count);
            }else {
                //请求失败提示
                this.$message({ message: res.msg, type: "error", duration: 2500 });
            };
        });
    };

    //搜索 重新获取列表数据
    search (val: any) {
        this.send_data.where.keyword = val;
        sessionStorage.setItem("keyword", val);
        this.user_list();
    };

    //清空搜索内容
    clear_search () {
        this.send_data.where.keyword = '';
        sessionStorage.setItem("keyword", "");
        this.user_list();
    };

    //筛选时间
    change_time(val: any) {
        var that: any = this;
        this.send_data.where.stime = val[0] ? that.$moment(val[0]).valueOf() / 1000 : "",
        this.send_data.where.etime = val[1] ? that.$moment(val[1]).valueOf() / 1000 : "",
        sessionStorage.setItem("stime", this.send_data.where.stime);
        sessionStorage.setItem("etime", this.send_data.where.etime);
        this.user_list();
    };
    
    //改变页码
    change_page(val: any) {
        this.table_data.page.current_page = val;
        this.send_data.page = val;
        sessionStorage.setItem("page", val);
        this.user_list();
    };

    //改变每页的条数
    change_page_size(val: any) {
        this.table_data.page.size = val;
        this.send_data.size = val;
        sessionStorage.setItem("size", val);
        this.user_list();
    };

    //改变状态
    change_state () {

    };

    //查看
    look_up (row: any) {
        this.$router.push({ path: '/user/details', query: { id: row.user_id } });
    };
}

</script>

<style lang="scss">

    @media screen and (min-width: 769px) {
        .user_list {
            padding: 0 20px;
        }
    }
</style>