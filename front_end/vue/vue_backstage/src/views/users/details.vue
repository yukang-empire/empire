<template>
    <div class="user_details">
        <div class="repeat_div">
            <!-- <p>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-jibenxinxi"></use>
                </svg>
                <span>基本信息</span>
            </p> -->
            <p class="copy_title">基本信息：</p>
            <div class="base_info flex_between">
                <div class="left">
                    <img src="@/common/imgs/logo.png" alt="">
                </div>
                <div class="middle flex_center">
                    <div>
                        <p>昵称：</p>
                        <p>生日：</p>
                        <p>注册时间：</p>
                        <p>地区：</p>
                    </div>
                    <div>
                        <p>康大大</p>
                        <p>90后</p>
                        <p>今天</p>
                        <p>深圳</p>
                    </div>
                </div>
                <div class="right">
                    <div>
                        <p>性别：</p>
                        <p>手机号：</p>
                        <p>实名认证：</p>
                        <p>详细地址：</p>
                    </div>
                    <div>
                        <p>男</p>
                        <p>18312001212</p>
                        <p>已认证</p>
                        <p>深圳某处地方</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="repeat_div">
            <!-- <p>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-shangjia"></use>
                </svg>
                <span>门店信息</span>
            </p> -->
            <p class="copy_title">统计信息：</p>
            <!-- 门店列表 -->
            <table_page
            :table_data='table_data_tj'
            @change_page='change_page_tj'
            @change_page_size='change_page_size_tj'
            @change_ban='change_ban_tj'
            @look_up='look_up_tj'
            />
        </div>

        <div class="repeat_div">
            <!-- <p>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-shangpin"></use>
                </svg>
                <span>商品信息</span>
            </p> -->
            <p class="copy_title">订单记录：</p>
            <!-- 商品列表 -->
            <table_page
            :table_data='table_data_dd'
            @change_page='change_page_dd'
            @change_page_size='change_page_size_dd'
            @change_ban='change_ban_dd'
            @look_up='look_up_dd'
            />
        </div>

        <!-- 弹框 -->
        <dialog_component_tj :dialog='dialog_tj' @off_dialog='off_dialog_tj' />
        <dialog_component_dd :dialog='dialog_dd' @off_dialog='off_dialog_dd' />

    </div>
</template>

<script>
import dialog_component_tj from '@/common/components/dialog.vue';
import dialog_component_dd from '@/common/components/dialog.vue';
import table_page from '@/common/components/table_page.vue';

export default {
    name: 'user_details',
    components: {
        dialog_component_tj,
        dialog_component_dd,
        table_page
    },
    data () {
        return {
            //弹框数据
            dialog_tj: {
                is_open: false,
                msg: '',
                type: '1',
            },
            dialog_dd: {
                is_open: false,
                msg: '',
                type: '1',
            },
            //表格和页码的数据(门店的)
            table_data_tj: {
                //表格
                table: {
                    //要展示哪些行
                    select: 'tjxx',
                    //是否固定表头
                    is_height: 300,
                    //表格数据
                    lists: [
                        {xfje: '6',ddsl: '1',yqhy: '1',yhj: '25',kd: 10,kb: 1, time02: 1559214576},
                        {xfje: '7',ddsl: '2',yqhy: '2',yhj: '25',kd: 9,kb: 1, time02: 1559214576},
                        {xfje: '8',ddsl: '3',yqhy: '3',yhj: '25',kd: 8,kb: 1, time02: 1559214576},
                        {xfje: '9',ddsl: '4',yqhy: '4',yhj: '25',kd: 7,kb: 1, time02: 1559214576},
                        {xfje: '10',ddsl: '4',yqhy: '5',yhj: '25',kd: 6,kb: 1, time02: 1559214576},
                        {xfje: '11',ddsl: '5',yqhy: '6',yhj: '25',kd: 5,kb: 1, time02: 1559214576},
                        {xfje: '12',ddsl: '6',yqhy: '7',yhj: '25',kd: 4,kb: 1, time02: 1559214576},
                        {xfje: '13',ddsl: '7',yqhy: '8',yhj: '25',kd: 3,kb: 1, time02: 1559214576},
                        {xfje: '14',ddsl: '8',yqhy: '9',yhj: '25',kd: 2,kb: 1, time02: 1559214576},
                        {xfje: '15',ddsl: '9',yqhy: '10',yhj: '25',kd: 1,kb: 1, time02: 1559214576},
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
            //表格和页码的数据(商品的)
            table_data_dd: {
                //表格
                table: {
                    //要展示哪些行
                    select: 'splb',
                    //是否固定表头
                    is_height: 300,
                    //表格数据
                    lists: [
                        {id: '6',name: '百得利健身会所',sssj: '百得利',ssmd: '百得利分店',xsje: 6666.00, jsje: 5555.00, num: 10},
                        {id: '7',name: '百得利健身会所',sssj: '百得利',ssmd: '百得利分店',xsje: 6666.00, jsje: 5555.00, num: 9},
                        {id: '8',name: '百得利健身会所',sssj: '百得利',ssmd: '百得利分店',xsje: 6666.00, jsje: 5555.00, num: 8},
                        {id: '9',name: '百得利健身会所',sssj: '百得利',ssmd: '百得利分店',xsje: 6666.00, jsje: 5555.00, num: 7},
                        {id: '10',name: '百得利健身会所',sssj: '百得利',ssmd: '百得利分店',xsje: 6666.00, jsje: 5555.00, num: 6},
                        {id: '11',name: '百得利健身会所',sssj: '百得利',ssmd: '百得利分店',xsje: 6666.00, jsje: 5555.00, num: 5},
                        {id: '12',name: '百得利健身会所',sssj: '百得利',ssmd: '百得利分店',xsje: 6666.00, jsje: 5555.00, num: 4},
                        {id: '13',name: '百得利健身会所',sssj: '百得利',ssmd: '百得利分店',xsje: 6666.00, jsje: 5555.00, num: 3},
                        {id: '14',name: '百得利健身会所',sssj: '百得利',ssmd: '百得利分店',xsje: 6666.00, jsje: 5555.00, num: 2},
                        {id: '15',name: '百得利健身会所',sssj: '百得利',ssmd: '百得利分店',xsje: 6666.00, jsje: 5555.00, num: 1},
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
        off_dialog_tj (state) {
            //确定则修改此行的ban状态
            if (state == 'sure') {
                this.table_data_tj.table.lists[this.table_data_tj.table.switch.index].ban = this.table_data_tj.table.switch.ban;
            };
            this.dialog_tj.is_open = false;
        },
        off_dialog_dd (state) {
            //确定则修改此行的ban状态
            if (state == 'sure') {
                this.table_data_dd.table.lists[this.table_data_dd.table.switch.index].ban = this.table_data_dd.table.switch.ban;
            };
            this.dialog_dd.is_open = false;
        },
        //改变页码页数
        change_page_tj(val) {
            console.log(`当前页: ${val}`);
        },
        change_page_dd(val) {
            console.log(`当前页: ${val}`);
        },
        //改变每页的条数
        change_page_size_tj(val) {
            console.log(`每页 ${val} 条`);
        },
        change_page_size_dd(val) {
            console.log(`每页 ${val} 条`);
        },
        //点击禁用/开启账户
        change_ban_tj (index, val) {
            this.dialog_tj.is_open = true;
            if (val == 1) {
                this.dialog_tj.msg = '是否禁用?';
                //改为禁用 提交给弹框处理
                this.table_data_tj.table.switch.ban = 0;
            }else {
                this.dialog_tj.msg = '是否开启?';
                //改为开启 交接给弹框处理
                this.table_data_tj.table.switch.ban = 1;
            };
            this.table_data_tj.table.switch.index = index;
        },
        change_ban_dd (index, val) {
            this.dialog_dd.is_open = true;
            if (val == 1) {
                this.dialog_dd.msg = '是否禁用?';
                //改为禁用 提交给弹框处理
                this.table_data_dd.table.switch.ban = 0;
            }else {
                this.dialog_dd.msg = '是否开启?';
                //改为开启 交接给弹框处理
                this.table_data_dd.table.switch.ban = 1;
            };
            this.table_data_dd.table.switch.index = index;
        },
        //查看详情
        look_up_tj (row) {
            this.$router.push({ path: '/business/mdlb/mdxq', query: { id: row.id } });
        },
        look_up_dd (row) {
            this.$router.push({ path: '/business/splb/spxq', query: { id: row.id } });
        },
    },
    mounted () {
        console.log(this.$route.query);
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
    .copy_title{
        border-left: 2px solid $main;
        height: 17px;
        padding: 0 0 0 10px;
        font-weight: 900;
        font-size: 1.1rem;
        display: flex;
        align-items: center;
        color: #333;
        margin: 15px 0 !important;
    }
    .left img {
        width: 60px;
        height: 60px;
        margin: 10px 0 0 20px;
    }
    .middle,.right {
        margin-right: 10%;
        display: flex;
        align-items: center;

        &>div p{
            text-align: right;
        }
        
        &>div:nth-of-type(2) p{
            color: #999;
            text-align: left;
        }
    }

    @media screen and (min-width: 769px) {
        
    }
</style>