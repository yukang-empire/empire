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
                    <img :src="base_data.head_pic" alt="">
                </div>
                <div class="middle flex_center">
                    <div>
                        <p>昵称：</p>
                        <p>生日：</p>
                        <p>注册时间：</p>
                        <p>地区：</p>
                    </div>
                    <div>
                        <p>{{ base_data.nickname }}</p>
                        <p>{{ base_data.birthday }}</p>
                        <p>{{ base_data.reg_time }}</p>
                        <p>{{ base_data.province + base_data.city }}</p>
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
                        <p>{{ base_data.sex == 1 ? '男' : '女' }}</p>
                        <p>{{ base_data.mobile }}</p>
                        <p>{{ base_data.idcard > 0 ? '已认证' : '未认证' }}</p>
                        <p>{{ base_data.address ? base_data.address : base_data.province + base_data.city + base_data.district }}</p>
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
            <table_page
            :table_data='table_data_tj'
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
            <table_page
            :table_data='table_data_dd'
            @change_page='change_page_dd'
            @change_page_size='change_page_size_dd'
            @look_up='look_up_dd'
            />
        </div>

        <div class="repeat_div">
            <!-- <p>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-shangpin"></use>
                </svg>
                <span>商品信息</span>
            </p> -->
            <p class="copy_title">充值记录：</p>
            <table_page
            :table_data='table_data_cz'
            @change_page='change_page_cz'
            @change_page_size='change_page_size_cz'
            />
        </div>

    </div>
</template>

<script>
import table_page from '@/common/components/table_page.vue';

export default {
    name: 'user_details',
    components: {
        table_page
    },
    data () {
        return {
            base_data: {
                head_pic: ''
            },
            //表格和页码的数据(统计信息)
            table_data_tj: {
                //表格
                table: {
                    //要展示哪些行
                    select: 'tjxx',
                    //是否固定表头
                    is_height: 126,
                    //表格数据
                    lists: [
                        {ddsl: '1',yqhy: '1',yhj: '25',kd: 10,},
                    ],
                },
                //页码
                page: {
                    //是否需要页码(仅有1页的情况下)
                    is_page: false,
                    //当前页码
                    current_page: 1,
                    //总数量
                    total: 30,
                }
            },
            //表格和页码的数据(订单记录)
            table_data_dd: {
                //表格
                table: {
                    //要展示哪些行
                    select: 'ddjl',
                    //是否固定表头
                    is_height: 300,
                    //表格数据
                    lists: [
                        {ddbh: '46456546434',name: 'Cassy',ddmc: '健身房次卡',zffs: '微信支付', ddzt: '待支付', tjsj: '2019-01-25 10:55', ddje: '100.00'},
                        {ddbh: '46456546434',name: 'Cassy',ddmc: '共享卡预约',zffs: '微信支付', ddzt: '待核销', tjsj: '2019-01-25 10:55', ddje: '100.00'},
                        {ddbh: '46456546434',name: 'Cassy',ddmc: '健身房次卡',zffs: '微信支付', ddzt: '待支付', tjsj: '2019-01-25 10:55', ddje: '100.00'},
                        {ddbh: '46456546434',name: 'Cassy',ddmc: '健身房次卡',zffs: '微信支付', ddzt: '待支付', tjsj: '2019-01-25 10:55', ddje: '100.00'},
                        {ddbh: '46456546434',name: 'Cassy',ddmc: '健身房次卡',zffs: '微信支付', ddzt: '待支付', tjsj: '2019-01-25 10:55', ddje: '100.00'},
                        {ddbh: '46456546434',name: 'Cassy',ddmc: '健身房次卡',zffs: '微信支付', ddzt: '待支付', tjsj: '2019-01-25 10:55', ddje: '100.00'},
                        {ddbh: '46456546434',name: 'Cassy',ddmc: '健身房次卡',zffs: '微信支付', ddzt: '待支付', tjsj: '2019-01-25 10:55', ddje: '100.00'},
                        {ddbh: '46456546434',name: 'Cassy',ddmc: '健身房次卡',zffs: '微信支付', ddzt: '待支付', tjsj: '2019-01-25 10:55', ddje: '100.00'},
                        {ddbh: '46456546434',name: 'Cassy',ddmc: '健身房次卡',zffs: '微信支付', ddzt: '待支付', tjsj: '2019-01-25 10:55', ddje: '100.00'},
                    ],
                },
                //页码
                page: {
                    is_page: true,
                    //当前页码
                    current_page: 1,
                    //总数量
                    total: 30,
                }
            },
            //表格和页码的数据(充值记录)
            table_data_cz: {
                //表格
                table: {
                    //要展示哪些行
                    select: 'czjl',
                    //是否固定表头
                    is_height: 300,
                    //表格数据
                    lists: [
                        {czbh: '46456546434',czkb: '100.00',zskd: '100.00',zffs: '微信支付', zfje: '100.00', czsj: '2019-01-25 10:55'},
                        {czbh: '46456546434',czkb: '100.00',zskd: '100.00',zffs: '支付宝支付', zfje: '100.00', czsj: '2019-01-25 10:55'},
                        {czbh: '46456546434',czkb: '100.00',zskd: '100.00',zffs: '微信支付', zfje: '100.00', czsj: '2019-01-25 10:55'},
                        {czbh: '46456546434',czkb: '100.00',zskd: '100.00',zffs: '微信支付', zfje: '100.00', czsj: '2019-01-25 10:55'},
                        {czbh: '46456546434',czkb: '100.00',zskd: '100.00',zffs: '微信支付', zfje: '100.00', czsj: '2019-01-25 10:55'},
                        {czbh: '46456546434',czkb: '100.00',zskd: '100.00',zffs: '微信支付', zfje: '100.00', czsj: '2019-01-25 10:55'},
                        {czbh: '46456546434',czkb: '100.00',zskd: '100.00',zffs: '微信支付', zfje: '100.00', czsj: '2019-01-25 10:55'},
                        {czbh: '46456546434',czkb: '100.00',zskd: '100.00',zffs: '微信支付', zfje: '100.00', czsj: '2019-01-25 10:55'},
                        {czbh: '46456546434',czkb: '100.00',zskd: '100.00',zffs: '微信支付', zfje: '100.00', czsj: '2019-01-25 10:55'},
                    ],
                },
                //页码
                page: {
                    is_page: true,
                    //当前页码
                    current_page: 1,
                    //总数量
                    total: 30,
                }
            },
        }
    },
    methods: {
        //改变页码页数
        change_page_cz(val) {
            console.log(`当前页: ${val}`);
        },
        change_page_dd(val) {
            console.log(`当前页: ${val}`);
        },
        //改变每页的条数
        change_page_size_cz(val) {
            console.log(`每页 ${val} 条`);
        },
        change_page_size_dd(val) {
            console.log(`每页 ${val} 条`);
        },
        look_up_dd (row) {
            this.$router.push({ path: '/business/splb/spxq', query: { id: row.id } });
        },
    },
    mounted () {
        var default_id = { id: '699766' };
        var id = localStorage.getItem('user_id') ? JSON.parse(localStorage.getItem('user_id')) : default_id;
        this.$axios.post('/api/getUser', JSON.stringify(id)).then(response => {
            console.log(response);
            var res = response.data.data;
            this.base_data = res;
            this.table_data_tj.table.lists[0].total_amount = res.total_amount;
            this.table_data_tj.table.lists[0].total_amount = res.total_amount;
            this.table_data_tj.table.lists[0].total_amount = res.total_amount;
            this.table_data_tj.table.lists[0].total_amount = res.total_amount;
            this.table_data_tj.table.lists[0].cool_B = res.cool_B;
            this.table_data_tj.table.lists[0].last_login = res.last_login;
        });
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
            height: 130px;

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
        border-radius: 50%;
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