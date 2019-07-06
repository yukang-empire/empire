<template>
    <div class="store_details">
        <!-- 基本信息 -->
        <base_info :base_info="base_info" :base_info_type='base_info_type' />
        <!-- 商品列表 -->
        <div class="repeat_div">
            <p>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#iconshangpin"></use>
                </svg>
                <span>商品列表</span>
            </p>
            <table_page :table_data='table_data_goods' @look_up='look_up_goods' @edit='edit' />
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

export default class store_details extends Vue{
    private base_info: any = {};
    private base_info_type: string = "store";
    
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
        //请求门店的基本信息
        this.$store.dispatch("store_details", { club_id: this.$route.query.club_id}).then( res => {
            console.log("门店详情", res);
            if (res.code == 0 || res.status == 1) {
                this.base_info = res.result.club;
                this.base_info.icon = "#iconshangjia";
                this.base_info.title = "门店基本信息";
                //商品列表
                this.table_data_goods.table.lists = res.result.goods_list;
            }else {
                //获取失败提示
                this.$message({ message: res.msg, type: "error", duration: 2500 });
            };
        });
    };

    //编辑商品
    edit (row: any) {
        if (sessionStorage.getItem('add_form_data')) {
            var data = JSON.parse(sessionStorage.getItem('add_form_data'));
            data.club_name = row.club_name;
            data.cost_price = row.cost_price;
            data.goods_id = row.goods_id;
            data.goods_name = row.goods_name;
            data.original_img = row.original_img;
            data.sales_sum = row.sales_sum;
            data.shop_price = row.shop_price;
            data.store_id = row.store_id;
            data.card_type = row.card_type;
            data.card_info = row.card_info;
        }else {
            var data = {
                goods_id: row.goods_id,
                original_img: row.original_img,
                goods_name: row.goods_name,
                sales_sum: row.sales_sum,
                shop_price: row.shop_price,
                cost_price: row.cost_price,
                card_type: row.card_type,
                store_id: row.store_id,
                card_info: row.card_info,
                store_id_02: '',
                realname: '',
                mobile: '',
                password: '',
                re_password: '',
                image: '',

                club_name: row.club_name,
                province: '',
                city: '',
                area: '',
                street: '',
                address: '',
                tel: '',
                business_time: [new Date(2019, 6, 6, 8), new Date(2019, 6, 6, 23)],
                open_time: '',
                close_time: '',
                club_facil: sessionStorage.getItem('add_form_data') ? JSON.parse(sessionStorage.getItem('add_form_data')).club_facil : [],
                shop_image: [],
                content: ''
            };
        };
        sessionStorage.setItem('add_form_data', JSON.stringify(data));
        this.$router.push({ path: '/business/goods/add', query: { goods_id: row.goods_id } });
    };

    //查看商品
    look_up_goods (row: any) {
        this.$router.push({ path: '/business/goods/list'} );
    };
}

</script>

<style lang="scss" scoped>

    @media screen and (min-width: 769px) {
        
    }
</style>