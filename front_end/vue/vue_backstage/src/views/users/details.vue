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
            :table_data='table_data_md'
            @change_page='change_page_md'
            @change_page_size='change_page_size_md'
            @change_ban='change_ban_md'
            @look_up='look_up_md'
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
            :table_data='table_data_sp'
            @change_page='change_page_sp'
            @change_page_size='change_page_size_sp'
            @change_ban='change_ban_sp'
            @look_up='look_up_sp'
            />
        </div>

        <!-- 弹框 -->
        <dialog_component_md :dialog='dialog_md' @off_dialog='off_dialog_md' />
        <dialog_component_sp :dialog='dialog_sp' @off_dialog='off_dialog_sp' />

    </div>
</template>

<script>
import dialog_component_md from '@/common/components/dialog.vue';
import dialog_component_sp from '@/common/components/dialog.vue';
import table_page from '@/common/components/table_page.vue';

export default {
    name: 'user_details',
    components: {
        dialog_component_md,
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
            //表格和页码的数据(门店的)
            table_data_md: {
                //表格
                table: {
                    //要展示哪些行
                    select: 'mdlb',
                    //是否固定表头
                    is_height: 300,
                    //表格数据
                    lists: [
                        {id: '6',name: '百得利健身会所',sssj: '百得利',ssqy: '深圳龙华',xxdz: '清湖地铁站',num: 10,ban: 1},
                        {id: '7',name: '百得利健身会所',sssj: '百得利',ssqy: '深圳龙华',xxdz: '清湖地铁站',num: 9,ban: 1},
                        {id: '8',name: '百得利健身会所',sssj: '百得利',ssqy: '深圳龙华',xxdz: '清湖地铁站',num: 8,ban: 1},
                        {id: '9',name: '百得利健身会所',sssj: '百得利',ssqy: '深圳龙华',xxdz: '清湖地铁站',num: 7,ban: 1},
                        {id: '10',name: '百得利健身会所',sssj: '百得利',ssqy: '深圳龙华',xxdz: '清湖地铁站',num: 6,ban: 1},
                        {id: '11',name: '百得利健身会所',sssj: '百得利',ssqy: '深圳龙华',xxdz: '清湖地铁站',num: 5,ban: 1},
                        {id: '12',name: '百得利健身会所',sssj: '百得利',ssqy: '深圳龙华',xxdz: '清湖地铁站',num: 4,ban: 1},
                        {id: '13',name: '百得利健身会所',sssj: '百得利',ssqy: '深圳龙华',xxdz: '清湖地铁站',num: 3,ban: 1},
                        {id: '14',name: '百得利健身会所',sssj: '百得利',ssqy: '深圳龙华',xxdz: '清湖地铁站',num: 2,ban: 1},
                        {id: '15',name: '百得利健身会所',sssj: '百得利',ssqy: '深圳龙华',xxdz: '清湖地铁站',num: 1,ban: 1},
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
        off_dialog_md (state) {
            //确定则修改此行的ban状态
            if (state == 'sure') {
                this.table_data_md.table.lists[this.table_data_md.table.switch.index].ban = this.table_data_md.table.switch.ban;
            };
            this.dialog_md.is_open = false;
        },
        off_dialog_sp (state) {
            //确定则修改此行的ban状态
            if (state == 'sure') {
                this.table_data_sp.table.lists[this.table_data_sp.table.switch.index].ban = this.table_data_sp.table.switch.ban;
            };
            this.dialog_sp.is_open = false;
        },
        //改变页码页数
        change_page_md(val) {
            console.log(`当前页: ${val}`);
        },
        change_page_sp(val) {
            console.log(`当前页: ${val}`);
        },
        //改变每页的条数
        change_page_size_md(val) {
            console.log(`每页 ${val} 条`);
        },
        change_page_size_sp(val) {
            console.log(`每页 ${val} 条`);
        },
        //点击禁用/开启账户
        change_ban_md (index, val) {
            this.dialog_md.is_open = true;
            if (val == 1) {
                this.dialog_md.msg = '是否禁用?';
                //改为禁用 提交给弹框处理
                this.table_data_md.table.switch.ban = 0;
            }else {
                this.dialog_md.msg = '是否开启?';
                //改为开启 交接给弹框处理
                this.table_data_md.table.switch.ban = 1;
            };
            this.table_data_md.table.switch.index = index;
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
        //查看详情
        look_up_md (row) {
            this.$router.push({ path: '/business/mdlb/mdxq', query: { id: row.id } });
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