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
            <table_page :table_data='table_data_store' @change_state='change_state' @look_up='look_up_store' @edit='edit_store' />
        </div>
        <!-- 商品列表 -->
        <div class="repeat_div">
            <p>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#iconshangpin"></use>
                </svg>
                <span>商品列表</span>
            </p>
            <table_page :table_data='table_data_goods' @look_up='look_up_goods' @edit='edit_goods' />
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
        //请求商家的基本信息
        this.$store.dispatch("business_details", { club_id: this.$route.query.club_id}).then( res => {
            console.log("商家详情", res);
            var that: any = this;
            if (res.code == 0 || res.status == 1) {
                this.base_info = res.result.club;
                this.base_info.icon = "#iconjibenxinxi";
                this.base_info.title = "商家基本信息";
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

    //改变状态
    change_state (index: any, row: any) {
        var that: any = this;
        if (row.status == 1) {
            that.$confirm("确定禁用ID为 " + row.id +  " 的商家？", "提示", { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }).then( () => {
                this.$store.dispatch("change_state_user", { userSN: row.user_sn, isLock: '1' }).then( (res: any) => {
                    if (res.code == 0) {
                        console.log("改变状态", res);
                        this.table_data_store.table.lists[index].status = 2;
                        that.$message({ type: "success", message: "已成功禁用ID为 " + row.id + " 的商家！", duration: 2000 });
                    }else {
                        //登录失败提示
                        this.$message({ message: res.msg, type: "error", duration: 2500 });
                    };
                })
            });
        }else {
            that.$confirm("确定开启ID为 " + row.id +  " 的商家？", "提示", { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }).then( () => {
                this.$store.dispatch("change_state_user", { userSN: row.user_sn, isLock: '0' }).then( (res: any) => {
                    if (res.code == 0) {
                        console.log("改变状态", res);
                        this.table_data_store.table.lists[index].status = 1;
                        that.$message({ type: "success", message: "已成功开启ID为 " + row.id + " 的商家！", duration: 2000 });
                    }else {
                        //登录失败提示
                        this.$message({ message: res.msg, type: "error", duration: 2500 });
                    };
                })
            });
        };
    };

    //编辑门店
    edit_store (row: any) {
        console.log(row);
        sessionStorage.setItem('add_form_data', JSON.stringify(row));
        this.$router.push({ path: '/business/store/add', query: { store_id: row.id } });
    };
    
    //查看门店
    look_up_store (row: any) {
        this.$router.push({ path: '/business/store/list'} );
    };

    //编辑商品
    edit_goods (row: any) {
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