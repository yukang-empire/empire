<template>
    <div class="stores_details">
        <div class="repeat_div">
            <p>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-jibenxinxi"></use>
                </svg>
                <span>基本信息</span>
            </p>
            <div class="base_info flex_between">
                <div class="left">
                    <p>基本信息：</p>
                </div>
                <div class="middle flex_center">
                    <div>
                        <p>门店名称：</p>
                        <p>门店地址：</p>
                        <p>门店电话：</p>
                    </div>
                    <div>
                        <p>{{ store_data.club_name }}</p>
                        <p>{{ store_data.province }}{{ store_data.city }}{{ store_data.area }}{{ store_data.street }}{{ store_data.address }}</p>
                        <p>{{ store_data.tel ? store_data.tel : "无" }}</p>
                    </div>
                </div>
                <div class="right">
                    <div>
                        <p>联系人：</p>
                        <p>手机号：</p>
                        <p>入驻时间：</p>
                    </div>
                    <div>
                        <p>{{ store_data.nickname ? store_data.nickname : "无" }}</p>
                        <p>{{ store_data.mobile }}</p>
                        <p>{{ store_data.add_time }}</p>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="repeat_div">
            <p>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-shangpin"></use>
                </svg>
                <span>商品信息</span>
            </p>
            <!-- 商品列表 -->
            <table_page
            :table_data='table_data_sp'
            @change_page='change_page_sp'
            @change_page_size='change_page_size_sp'
            @change_ban='change_ban_sp'
            @look_up='look_up_sp'
            />
        </div>

        <!-- 弹框 -->
        <dialog_component_sp :dialog='dialog_sp' @off_dialog='off_dialog_sp' />

    </div>
</template>

<script>
import dialog_component_sp from '@/common/components/dialog.vue';
import table_page from '@/common/components/table_page.vue';

export default {
    name: 'stores_details',
    components: {
        dialog_component_sp,
        table_page
    },
    data () {
        return {
            store_data: {
                club_name: '',
                province: '',
                city: '',
                area: '',
                street: '',
                address: '',
                tel: '',
                nickname: '',
                mobile: '',
                add_time: '',
            },
            //弹框数据
            dialog_md: {
                is_open: false,
                msg: '',
                type: '1',
            },
            dialog_sp: {
                is_open: false,
                msg: '',
                type: '1',
            },
            //表格和页码的数据(商品的)
            table_data_sp: {
                //表格
                table: {
                    //要展示哪些行
                    select: 'splb',
                    //是否固定表头
                    is_height: false,
                    //表格数据
                    lists: [
                        // {goods_id: '6',goods_name: '百得利健身会所',sssj: '百得利',ssmd: '百得利分店',shop_price: 6666.00, cost_price: 5555.00, sales_sum: 10},
                        // {goods_id: '7',goods_name: '百得利健身会所',sssj: '百得利',ssmd: '百得利分店',shop_price: 6666.00, cost_price: 5555.00, sales_sum: 9},
                        // {goods_id: '8',goods_name: '百得利健身会所',sssj: '百得利',ssmd: '百得利分店',shop_price: 6666.00, cost_price: 5555.00, sales_sum: 8},
                        // {goods_id: '9',goods_name: '百得利健身会所',sssj: '百得利',ssmd: '百得利分店',shop_price: 6666.00, cost_price: 5555.00, sales_sum: 7},
                        // {goods_id: '10',goods_name: '百得利健身会所',sssj: '百得利',ssmd: '百得利分店',shop_price: 6666.00, cost_price: 5555.00, sales_sum: 6},
                        // {goods_id: '11',goods_name: '百得利健身会所',sssj: '百得利',ssmd: '百得利分店',shop_price: 6666.00, cost_price: 5555.00, sales_sum: 5},
                        // {goods_id: '12',goods_name: '百得利健身会所',sssj: '百得利',ssmd: '百得利分店',shop_price: 6666.00, cost_price: 5555.00, sales_sum: 4},
                        // {goods_id: '13',goods_name: '百得利健身会所',sssj: '百得利',ssmd: '百得利分店',shop_price: 6666.00, cost_price: 5555.00, sales_sum: 3},
                        // {goods_id: '14',goods_name: '百得利健身会所',sssj: '百得利',ssmd: '百得利分店',shop_price: 6666.00, cost_price: 5555.00, sales_sum: 2},
                        // {goods_id: '15',goods_name: '百得利健身会所',sssj: '百得利',ssmd: '百得利分店',shop_price: 6666.00, cost_price: 5555.00, sales_sum: 1},
                    ],
                    //需要改变的行开关状态
                    switch: {
                        index: null,
                        ban: null
                    },
                },
                //页码
                page: {
                    //当前页码
                    current_page: 1,
                    //总数量
                    total: 30,
                }
            },
        }
    },
    methods: {
        //关闭弹框
        off_dialog_sp (state) {
            //确定则修改此行的ban状态
            if (state == 'sure') {
                this.table_data_sp.table.lists[this.table_data_sp.table.switch.index].ban = this.table_data_sp.table.switch.ban;
            };
            this.dialog_sp.is_open = false;
        },
        change_page_sp(val) {
            console.log(`当前页: ${val}`);
        },
        change_page_size_sp(val) {
            console.log(`每页 ${val} 条`);
        },
        change_ban_sp (index, val) {
            this.dialog_sp.is_open = true;
            if (val == 1) {
                this.dialog_sp.msg = '是否禁用?';
                //改为禁用 提交给弹框处理
                this.table_data_sp.table.switch.ban = 0;
            }else {
                this.dialog_sp.msg = '是否开启?';
                //改为开启 交接给弹框处理
                this.table_data_sp.table.switch.ban = 1;
            };
            this.table_data_sp.table.switch.index = index;
        },
        look_up_sp (row) {
            console.log(row);
            this.$router.push({ path: '/business/splb/spxq', query: { goods_id: row.goods_id } });
        },
    },
    mounted () {
        console.log(this.$route.query);
        if (this.$route.query) {
            var params = new FormData();
            params.append("id", this.$route.query.id);
            params.append("token", sessionStorage.getItem('token'));
            this.$axios.post("/index.php?m=Api&c=Club&a=club_shop_info", params).then( response => {
                console.log("门店详情", response);
                this.store_data = response.data.result;
                this.table_data_sp.table.lists = response.data.result.goods;
                if (this.store_data.province.indexOf("市") != -1) {
                    this.store_data.city = '';
                };
                this.store_data.add_time = this.store_data.add_time ? this.$moment(this.store_data.add_time * 1000).format('YYYY-MM-DD HH:mm:ss') : '';
            })
        }
    }
}
</script>

<style lang='scss' scoped>
    .base_info {
        align-items: unset;
        color: #333;
        font-size: 0.95rem;

        div {
            line-height: 2rem;

            p {
                margin: 0;
                line-height: 2rem;
            }

        }
    }
    .left p{
        border-left: 2px solid $main;
        height: 17px;
        padding: 0 0 0 10px;
        font-weight: 900;
        margin: 0 0 0 10px;
        font-size: 1.1rem;
        display: flex;
        align-items: center;
    }
    .middle,.right {
        margin-right: 10%;
        display: flex;
        align-items: center;

        &>div p{
            text-align: right;
        }
        
        &>div:nth-of-type(2) {
            color: #999;
            min-height: 96px;
            p {
                text-align: left;
                margin-left: 5px;
            }
        }
    }

    @media screen and (min-width: 769px) {
        
    }
</style>