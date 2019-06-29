<template>
    <div class="business_details">
        <!-- 基本信息 -->
        <base_info :base_info="base_info" :base_info_type='base_info_type' />
        <!-- 门店列表 -->
        <div class="repeat_div">
            <p>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#iconshangjia"></use>
                </svg>
                <span>门店列表</span>
            </p>
            <table_page :table_data='table_data_store' />
        </div>
        <!-- 商品列表 -->
        <div class="repeat_div">
            <p>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#iconshangpin"></use>
                </svg>
                <span>商品列表</span>
            </p>
            <table_page :table_data='table_data_goods' />
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

export default class business_details extends Vue{
    private base_info: any = {};
    private base_info_type: string = "business";
    
    //门店列表
    private table_data_store: any = {
        //表格
        table: {
            //属于哪个表格
            which: 'store_list',
            //是否多选
            checkbox: false,
            //是否固定表头
            is_height: "auto",
            //表格数据
            lists: [],
        },
        //页码
        page: {
            //是否显示页码
            is_page: false,
            //当前页码
            current_page: 1,
            //每页显示的数量
            size: 5,
            sizes: [5, 10],
            //总数量
            total: 0,
        }
    };

    //商品列表
    private table_data_goods: any = {
        //表格
        table: {
            //属于哪个表格
            which: 'goods_list',
            //是否多选
            checkbox: false,
            //是否固定表头
            is_height: "auto",
            //表格数据
            lists: [],
        },
        //页码
        page: {
            //是否显示页码
            is_page: false,
            //当前页码
            current_page: 1,
            //每页显示的数量
            size: 5,
            sizes: [5, 10],
            //总数量
            total: 0,
        }
    };

    mounted () {
        var that: any = this;
        //请求商家的基本信息
        this.$store.dispatch("business_details", { club_id: this.$route.query.club_id}).then( res => {
            console.log("商家详情", res);
            if (res.code == 0 || res.status == 1) {
                this.base_info = res.result.club;
                this.base_info.add_time = this.base_info.add_time == 0 ? "" : that.$moment(this.base_info.add_time * 1000).format('YYYY-MM-DD HH:mm:ss');
                //门店列表
                this.table_data_store.table.lists = res.result.club_list;
                var lists = this.table_data_store.table.lists;
                var length = lists.length;
                for (var i = 0; i < length; i++) {
                    //typescript语法严格 不声明会报错
                    var that: any = this;
                    //拼接省市区
                    lists[i].area_ = lists[i].province + lists[i].city + lists[i].area + lists[i].street;
                };
                //商品列表
                this.table_data_goods.table.lists = res.result.goods_list;
            }else {
                //获取失败提示
                this.$message({ message: res.msg, type: "error", duration: 2500 });
            };
        });
    };
}

</script>

<style lang="scss" scoped>

    @media screen and (min-width: 769px) {
        
    }
</style>