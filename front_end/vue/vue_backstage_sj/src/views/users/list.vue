<template>
    <div class="users_list">
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
                    v-model="where.keyword"
                    @clear='clear'
                    @keyup.native.enter='search'
                    clearable>
                </el-input>
                <el-button type="primary" @click='search'>搜索</el-button>
                
                <span class="time">最近登录时间：</span>
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
import table_page from '@/common/components/table_page02.vue';

export default {
    name: 'users_list',
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
                    select: 'yhlb',
                    //是否固定表头
                    is_height: 769,
                    //表格数据
                    lists: [
                        {id: '6',name: '康哥',phone: '18312001212',price: '1111',order: '8', address: '深圳', time02: 1559214576, ban: 1},
                        {id: '7',name: '康哥',phone: '18312001212',price: '2222',order: '8', address: '深圳', time02: 1559214576, ban: 1},
                        {id: '8',name: '康哥',phone: '18312001212',price: '3333',order: '8', address: '深圳', time02: 1559215576, ban: 1},
                        {id: '9',name: '康哥',phone: '18312001212',price: '4444',order: '8', address: '深圳', time02: 1559316576, ban: 1},
                        {id: '10',name: '康哥',phone: '18312001212',price: '5555',order: '8', address: '深圳', time02: 1559417576, ban: 1},
                        {id: '11',name: '康哥',phone: '18312001212',price: '6666',order: '8', address: '深圳', time02: 1559518576, ban: 1},
                        {id: '12',name: '康哥',phone: '18312001212',price: '7777',order: '8', address: '深圳', time02: 1559619576, ban: 1},
                        {id: '13',name: '康哥',phone: '18312001212',price: '8888',order: '8', address: '深圳', time02: 1559714576, ban: 1},
                        {id: '14',name: '康哥',phone: '18312001212',price: '9999',order: '8', address: '深圳', time02: 1559814576, ban: 1},
                        {id: '15',name: '康哥',phone: '18312001212',price: '10000',order: '8', address: '深圳', time02: 1559914576, ban: 1},
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
            search_time: null,
            where: {
                keyword: '',
                stime: '',
                etime: '',
            },
        }
    },
    methods: {
        //请求数据
        get_lists(params) {
            var that = this;
            this.$axios.post('/api/getUserList', JSON.stringify(params)).then(response => {
                console.log('用户列表', response);
                var res = response.data;
                
                var lists = res.data;
                var length = res.data.length;
                //最近登录时间
                if (res.data[0] && res.data[0].last_login) {
                    for (var i = 0; i < length; i ++) {
                        if (lists[i].last_login <= 0) {
                            res.data[i].last_login = '/';
                        }else {
                            res.data[i].last_login = that.$moment(parseInt(lists[i].last_login) * 1000).format('YYYY-MM-DD HH:mm:ss');
                        }
                    };
                };
                console.log(res.data);
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
                this.where.stime = this.$moment(val[0]).valueOf() / 1000;
                this.where.etime = this.$moment(val[1]).valueOf() / 1000;

            }else {
                this.where.stime = '';
                this.where.etime = '';
            };
            var params = {
                page: 1,
                size: 10,
                where: this.where,
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
                where: this.where,
            };
            this.get_lists(params);
        },
        //搜索
        search () {
            sessionStorage.setItem('search_input', this.search_input);
            var params = {
                page: 1,
                size: 10,
                where: this.where,
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
        this.get_lists(params);
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
    .users_list {
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