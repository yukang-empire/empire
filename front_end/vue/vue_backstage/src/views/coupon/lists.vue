<template>
    <div class="coupon_list">
        <div class="repeat_div">
            <p>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-funnel"></use>
                </svg>
                <span>筛选数据</span>
            </p>
            <div class="search_input">
                <span>输入关键词：</span>
                <el-input
                    placeholder="请输入要搜索的关键词"
                    v-model="search_input"
                    @clear='clear'
                    @keyup.native.enter='search'
                    clearable>
                </el-input>
                <el-button type="primary" @click='search'>搜索</el-button>
                
                <span class="time">使用截止时间：</span>
                <el-date-picker
                    v-model="search_time"
                    type="datetimerange"
                    range-separator="至"
                    @change='change_time'
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </div>
        </div>

        <div class="repeat_div">
            <p>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-shitu_gaikuang"></use>
                </svg>
                <span>{{ $store.state.current_route ? $store.state.current_route.meta.title : '' }}</span>
            </p>
            <!-- 表格和页码 -->
            <table_page 
            :table_data='table_data'
            @change_page='change_page'
            @change_page_size='change_page_size'
            @change_ban='change_ban'
            @look_up='look_up'
            />
            
        </div>

        <!-- 弹框 -->
        <dialog_component :dialog='dialog' @off_dialog='off_dialog' />
    </div>
</template>

<script>
import dialog_component from '@/common/components/dialog.vue';
import table_page from '@/common/components/table_page.vue';

export default {
    name: 'coupon_list',
    components: {
        dialog_component,
        table_page
    },
    data () {
        return {
            //弹框数据
            dialog: {
                is_open: false,
                msg: '',
                type: '1',
            },
            //表格和页码的数据
            table_data: {
                //表格
                table: {
                    //要展示哪些行
                    select: 'yhjlb',
                    //是否固定表头
                    is_height: 769,
                    //表格数据
                    lists: [
                        {title: '6',state: '上架',price: '1111', get_way: '注册', deadline: 1559214576},
                        {title: '7',state: '上架',price: '2222', get_way: '注册', deadline: 1559214576},
                        {title: '8',state: '上架',price: '3333', get_way: '注册', deadline: 1559215576},
                        {title: '9',state: '上架',price: '4444', get_way: '注册', deadline: 1559316576},
                        {title: '10',state: '上架',price: '5555', get_way: '注册', deadline: 1559417576},
                        {title: '11',state: '上架',price: '6666', get_way: '注册', deadline: 1559518576},
                        {title: '12',state: '上架',price: '7777', get_way: '注册', deadline: 1559619576},
                        {title: '13',state: '上架',price: '8888', get_way: '注册', deadline: 1559714576},
                        {title: '14',state: '上架',price: '9999', get_way: '注册', deadline: 1559814576},
                        {title: '15',state: '上架',price: '10000', get_way: '注册', deadline: 1559914576},
                    ],
                    //需要改变的行开关状态
                    switch: {
                        index: null,
                        ban: null,
                        user_sn: ''
                    },
                },
                //页码
                page: {
                    is_page: true,
                    //当前页码
                    current_page: 1,
                    //总数量
                    total: null,
                }
            },
            //搜索的内容
            search_input: null,
            search_time: null,
        }
    },
    methods: {
        //请求数据
        get_lists(params) {
            this.$axios.post('/api/getUserList', JSON.stringify(params)).then(response => {
                console.log('用户列表', response);
                var res = response.data;
                this.table_data.table.lists = res.data;
                this.table_data.page.total = parseInt(res.count);
            })
        },
        //关闭弹框
        off_dialog (state) {
            //确定则修改此行的ban状态
            if (state == 'sure') {
                this.table_data.table.lists[this.table_data.table.switch.index].is_lock = this.table_data.table.switch.is_lock;
                var params = {
                    userSN: this.table_data.table.switch.user_sn,
                    isLock: this.table_data.table.switch.is_lock
                };
                this.$axios.post('/api/userLock', JSON.stringify(params)).then(response => {
                    console.log(response);
                });
            };
            this.dialog.is_open = false;
        },
        //筛选时间
        change_time(val) {
            this.table_data.page.current_page = 1;
            sessionStorage.setItem('page', 1);
            if (val) {
                var start_time = this.$moment(val[0]).valueOf() / 1000;
                var end_time = this.$moment(val[1]).valueOf() / 1000;
            }else {
                var start_time = '';
                var end_time = '';
            };
            var params = {
                page: 1,
                size: 10,
                where: {
                    stime: start_time,
                    etime: end_time
                }
            };
            this.get_lists(params);
        },
        //改变页码页数
        change_page(val) {
            this.table_data.page.current_page = val;
            sessionStorage.setItem('page', val);
            var params = {
                page: val,
                size: 10,
            };
            this.get_lists(params);
        },
        //搜索
        search () {
            var params = {
                page: 1,
                size: 10,
                where: {
                    keyword: this.search_input
                }
            };
            this.get_lists(params);
        },
        //清空
        clear () {
            this.table_data.page.current_page = 1;
            sessionStorage.setItem('page', 1);
            var params = {
                page: 1,
                size: 10,
                where: {
                    keyword: '',
                    stime: '',
                    etime: ''
                }
            };
            this.get_lists(params);
        },
        //改变每页的条数
        change_page_size(val) {
            console.log(`每页 ${val} 条`);
        },
        //点击禁用/开启账户
        change_ban (index, val, user_sn) {
            this.dialog.is_open = true;
            if (val == 1) {
                this.dialog.msg = '是否开启?';
                //改为禁用 提交给弹框处理
                this.table_data.table.switch.is_lock = 0;
            }else {
                this.dialog.msg = '是否禁用?';
                //改为开启 交接给弹框处理
                this.table_data.table.switch.is_lock = 1;
            };
            this.table_data.table.switch.index = index;
            this.table_data.table.switch.user_sn = user_sn;
        },
        //查看
        look_up (row) {
            this.$router.push({ path: '/yhgl/yhxq', query: { id: row.user_id } });
            var user_id = {
                id: row.user_id
            };
            sessionStorage.setItem('user_id', JSON.stringify(user_id));
        },
    },
    mounted () {
        // this.search_time = [new Date(2019, 5, 1, 8, 30), new Date(2019, 5, 10, 22, 30)];
        this.table_data.page.current_page = sessionStorage.getItem('page') ? parseInt(sessionStorage.getItem('page')) : 1;
        var params = {
            page: this.table_data.page.current_page,
            size: 10,
            where: {
                user_sn: '',
                stime: '',
                etime: ''
            }
        };
        // this.get_lists(params);
    }
}
</script>

<style lang='scss'>
    input::-webkit-input-placeholder{
        font-size: 0.85rem;
    }
    input::-moz-input-placeholder{
        font-size: 0.85rem;
    }
    input::-ms-input-placeholder{
        font-size: 0.85rem;
    }
</style>
<style lang='scss' scoped>
    .coupon_list {
        padding: 0 20px;

        .el-input {
            width: 250px;
            margin: 0 15px;
        }

    }
    .search_input {
        display: flex;
        align-items: center;
    }
    .time {
        margin: 0 20px 0 50px;
    }
    @media screen and (min-width: 769px) {
        
    }
</style>