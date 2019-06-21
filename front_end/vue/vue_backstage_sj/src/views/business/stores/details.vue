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
                        <p>企业名称：</p>
                        <p>企业地址：</p>
                        <p>企业电话：</p>
                        <p>营业执照：</p>
                    </div>
                    <div>
                        <p>某某</p>
                        <p>某某</p>
                        <p>某某</p>
                        <p>某某</p>
                    </div>
                </div>
                <div class="right">
                    <div>
                        <p>联系人：</p>
                        <p>手机号：</p>
                        <p>入驻时间：</p>
                    </div>
                    <div>
                        <p>某某</p>
                        <p>某某</p>
                        <p>某某</p>
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
        }
    }

    @media screen and (min-width: 769px) {
        
    }
</style>