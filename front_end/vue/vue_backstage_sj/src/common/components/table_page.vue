<template>
    <div class="table_page">
        <!-- 表格 指定height则代表固定表头并将多余的内容滚动条化-->
        <el-table
        stripe
        :height="table_data_self.table.is_height"
        :data="table_data_self.table.lists"
        style="width: 100%">
            <!-- 实现多选 -->
            <el-table-column
                type="selection"
                width="40">
            </el-table-column>

            <!-- 商家列表 -->
            <el-table-column 
                v-if="table_data_self.table.select=='sjlb'"
                prop="id"
                sortable
                :sort-method='date_sort'
                label="商家ID">
            </el-table-column>
            <el-table-column
                v-if="table_data_self.table.select=='sjlb'"
                prop="name"
                label="企业名称">
            </el-table-column>
            <!-- 门店列表 -->
            <el-table-column 
                v-if="table_data_self.table.select=='mdlb'"
                prop="id"
                sortable
                :sort-method='date_sort'
                label="门店ID">
            </el-table-column>
            <el-table-column
                v-if="table_data_self.table.select=='mdlb'"
                prop="club_name"
                label="门店名称">
            </el-table-column>
            <!-- 商品列表 -->
            <el-table-column 
                v-if="table_data_self.table.select=='splb'"
                prop="goods_id"
                sortable
                :sort-method='date_sort'
                label="商品ID">
            </el-table-column>
            <el-table-column
                v-if="table_data_self.table.select=='splb'"
                prop="goods_name"
                label="商品名称">
            </el-table-column>
            <!-- 用户列表 -->
            <el-table-column 
                v-if="table_data_self.table.select=='yhlb'"
                prop="user_id"
                sortable
                :sort-method='date_sort'
                label="用户ID">
            </el-table-column>
            <el-table-column
                v-if="table_data_self.table.select=='yhlb'"
                prop="nickname"
                label="昵称">
            </el-table-column>
            <!-- 统计信息 -->
            <el-table-column
                v-if="table_data_self.table.select=='tjxx'"
                prop="total_amount"
                label="累计消费金额">
            </el-table-column>
            <!-- 订单记录 -->
            <el-table-column
                v-if="table_data_self.table.select=='ddjl'"
                prop="order_sn"
                sortable
                :sort-method='date_sort'
                label="订单编号">
            </el-table-column>
            <el-table-column
                v-if="table_data_self.table.select=='ddjl'"
                prop="nickname"
                label="用户昵称">
            </el-table-column>
            <el-table-column
                v-if="table_data_self.table.select=='ddjl'"
                prop="mobile"
                label="用户手机">
            </el-table-column>
            <!-- 充值记录 -->
            <el-table-column
                v-if="table_data_self.table.select=='czjl'"
                prop="order_sn"
                sortable
                :sort-method='date_sort'
                label="充值编号">
            </el-table-column>
            <!-- 优惠券 -->
            <el-table-column
                v-if="table_data_self.table.select=='yhjlb'"
                prop="title"
                label="优惠券标题">
            </el-table-column>
            <!-- 操作日志 -->
            <el-table-column
                v-if="table_data_self.table.select=='logs'"
                prop="operator"
                label="操作人">
            </el-table-column>
            <!-- 员工列表 -->
            <el-table-column
                v-if="table_data_self.table.select=='yglb'"
                prop="id"
                sortable
                :sort-method='date_sort'
                label="工号">
            </el-table-column>
            <!-- 角色列表 -->
            <el-table-column
                v-if="table_data_self.table.select=='jslb'"
                prop="name"
                label="角色名称">
            </el-table-column>
            <el-table-column
                v-if="table_data_self.table.select=='jslb'"
                prop="describe"
                label="描述">
            </el-table-column>
            <el-table-column
                v-if="table_data_self.table.select=='jslb'"
                prop="num"
                sortable
                :sort-method='date_sort'
                label="员工数量">
            </el-table-column>
            <el-table-column
                v-if="table_data_self.table.select=='yglb'"
                prop="operator"
                label="姓名">
            </el-table-column>
            <el-table-column
                v-if="table_data_self.table.select=='logs'"
                prop="modules"
                label="操作模块">
            </el-table-column>
            <el-table-column
                v-if="table_data_self.table.select=='logs'"
                prop="contents"
                label="操作内容">
            </el-table-column>
            <el-table-column
                v-if="table_data_self.table.select=='yhjlb'"
                prop="price"
                sortable
                :sort-method='date_sort'
                label="金额（元）">
            </el-table-column>
            <el-table-column
                v-if="table_data_self.table.select=='yhjlb'"
                prop="get_way"
                label="获得方式">
            </el-table-column>
            <el-table-column
                v-if="table_data_self.table.select=='yhjlb'"
                prop="state"
                label="状态">
            </el-table-column>
            <el-table-column
                v-if="table_data_self.table.select=='czjl'"
                prop="account"
                sortable
                :sort-method='date_sort'
                label="充值酷币">
            </el-table-column>
            <el-table-column
                v-if="table_data_self.table.select=='czjl'"
                prop="user_points"
                sortable
                :sort-method='date_sort'
                label="赠送酷点">
            </el-table-column>
            <el-table-column
                v-if="table_data_self.table.select=='czjl'"
                prop="pay_name"
                label="支付方式">
            </el-table-column>
            <el-table-column
                v-if="table_data_self.table.select=='czjl'"
                prop="account"
                sortable
                :sort-method='date_sort'
                label="支付金额">
            </el-table-column>
            <el-table-column
                v-if="table_data_self.table.select=='tjxx'"
                prop="ddsl"
                label="订单数量">
            </el-table-column>
            <el-table-column
                v-if="table_data_self.table.select=='tjxx'"
                prop="underling_number"
                label="邀请好友数">
            </el-table-column>
            <el-table-column
                v-if="table_data_self.table.select=='tjxx'"
                prop="yhj"
                label="优惠券">
            </el-table-column>
            <el-table-column
                v-if="table_data_self.table.select=='tjxx'"
                prop="user_points"
                label="酷点">
            </el-table-column>
            <el-table-column
                v-if="table_data_self.table.select=='tjxx'"
                prop="cool_B"
                label="酷币">
            </el-table-column>
            </el-table-column>
            <!-- <el-table-column
                v-if="table_data_self.table.select=='splb'"
                prop="sssj"
                label="所属商家">
            </el-table-column> -->
            <el-table-column
                v-if="table_data_self.table.select=='splb'"
                prop="club_name"
                label="所属门店">
            </el-table-column>
            <el-table-column
                v-if="table_data_self.table.select=='splb'"
                prop="shop_price"
                label="商品销售金额">
            </el-table-column>
            <el-table-column
                v-if="table_data_self.table.select=='splb'"
                prop="cost_price"
                label="商品结算金额">
            </el-table-column>
            <el-table-column
                v-if="table_data_self.table.select=='splb'"
                prop="sales_sum"
                label="销量">
            </el-table-column>
            <el-table-column
                v-if="table_data_self.table.select=='sjlb' || table_data_self.table.select=='yhlb' || table_data_self.table.select=='yglb'"
                prop="mobile"
                label="手机号">
            </el-table-column>
            <el-table-column
                v-if="table_data_self.table.select=='yglb'"
                prop="role"
                label="角色">
            </el-table-column>
            <el-table-column
                v-if="table_data_self.table.select=='ddjl'"
                prop="store_name"
                label="订单标题">
            </el-table-column>
            <el-table-column
                v-if="table_data_self.table.select=='ddjl'"
                prop="total_amount"
                sortable
                :sort-method='date_sort'
                label="订单金额(元)">
            </el-table-column>
            <el-table-column
                v-if="table_data_self.table.select=='ddjl'"
                prop="status"
                label="订单状态">
            </el-table-column>
            <el-table-column
                v-if="table_data_self.table.select=='yhlb'"
                prop="total_amount"
                sortable
                :sort-method='date_sort'
                label="消费金额">
            </el-table-column>
            <!-- <el-table-column
                v-if="table_data_self.table.select=='yhlb'"
                prop="order"
                sortable
                :sort-method='date_sort'
                label="订单数量">
            </el-table-column> -->
            <el-table-column
                v-if="table_data_self.table.select=='sjlb'"
                prop="people"
                label="联系人">
            </el-table-column>
            <el-table-column
                v-if="table_data_self.table.select=='sjlb'"
                prop="stores"
                sortable
                :sort-method='date_sort'
                label="门店数量">
            </el-table-column>
            <el-table-column
                v-if="table_data_self.table.select=='sjlb' || table_data_self.table.select=='yhlb'"
                prop="city"
                label="地区">
            </el-table-column>
            <el-table-column
                v-if="table_data_self.table.select=='mdlb'"
                prop="ssqy"
                label="所属区域">
            </el-table-column>
            <el-table-column
                v-if="table_data_self.table.select=='mdlb'"
                prop="address"
                label="详细地址">
            </el-table-column>
            <el-table-column
                v-if="table_data_self.table.select=='mdlb'"
                prop="goods_num"
                sortable
                :sort-method='date_sort'
                label="商品数量">
            </el-table-column>
            <el-table-column
                v-if="table_data_self.table.select=='mdlb'"
                prop="status"
                label="门店状态">
            </el-table-column>
            <!-- 转换日期格式后 默认的排序方式会出错 所以要用自定义排序方法sort-method -->
            <el-table-column
                v-if="table_data_self.table.select=='sjlb'"
                prop="time"
                sortable
                :sort-method='date_sort'
                label="进驻日期">
            </el-table-column>
            <el-table-column
                v-if="table_data_self.table.select=='yhlb' || table_data_self.table.select=='tjxx'"
                prop="last_login"
                sortable
                :sort-method='date_sort'
                label="最近登录时间">
            </el-table-column>
            <el-table-column
                v-if="table_data_self.table.select=='ddjl'"
                prop="create_time"
                sortable
                :sort-method='date_sort'
                label="提交时间">
            </el-table-column>
            <el-table-column
                v-if="table_data_self.table.select=='ddjl'"
                prop="use_time"
                sortable
                :sort-method='date_sort'
                label="核销时间">
            </el-table-column>
            <el-table-column
                v-if="table_data_self.table.select=='czjl'"
                prop="pay_time"
                sortable
                :sort-method='date_sort'
                label="充值时间">
            </el-table-column>
            <el-table-column
                v-if="table_data_self.table.select=='yhjlb'"
                prop="deadline"
                sortable
                :sort-method='date_sort'
                label="截止时间">
            </el-table-column>
            <el-table-column
                v-if="table_data_self.table.select=='logs'"
                prop="czsj"
                sortable
                :sort-method='date_sort'
                label="操作时间">
            </el-table-column>
            <el-table-column
                v-if="table_data_self.table.select=='yglb'"
                prop="tjsj"
                sortable
                :sort-method='date_sort'
                label="添加时间">
            </el-table-column>
            <el-table-column
                v-if="table_data_self.table.select=='jslb'"
                prop="jslb_time"
                sortable
                :sort-method='date_sort'
                label="添加时间">
            </el-table-column>
            <el-table-column label="禁用账户" v-if="
                table_data_self.table.select=='sjlb' || 
                table_data_self.table.select=='yhlb'
            ">
                <template slot-scope="scope">
                    <el-switch
                        v-model="scope.row.is_lock == 0 ? true : false"
                        @change='change_ban(scope.$index, scope.row.is_lock, scope.row.user_sn)'
                        active-color="#13ce66"
                        inactive-color="#ccc">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column label="状态" v-if="
                table_data_self.table.select=='yglb'
            ">
                <template slot-scope="scope">
                    <el-switch
                        v-model="scope.row.is_lock == 0 ? true : false"
                        @change='change_ban(scope.$index, scope.row.is_lock, scope.row.user_sn)'
                        active-color="#13ce66"
                        inactive-color="#ccc">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作" v-if="
               table_data_self.table.select=='sjlb'|| 
               table_data_self.table.select=='mdlb'|| 
               table_data_self.table.select=='splb'|| 
               table_data_self.table.select=='yhlb'|| 
               table_data_self.table.select=='ddjl'|| 
               table_data_self.table.select=='yhjlb' ||
               table_data_self.table.select=='yglb' ||
               table_data_self.table.select=='jslb'
            ">
                <template slot-scope="scope">
                    <el-button type="text" @click="look_up(scope.row)"  v-if="
                    table_data_self.table.select=='sjlb'|| 
                    table_data_self.table.select=='mdlb'|| 
                    table_data_self.table.select=='splb'|| 
                    table_data_self.table.select=='yhlb'|| 
                    table_data_self.table.select=='ddjl'
                 ">查看</el-button>
                    <el-button type="text" @click="look_up(scope.row)" v-if="
                        table_data_self.table.select=='yhjlb' ||
                        table_data_self.table.select=='yglb'||
                        table_data_self.table.select=='jslb'
                    ">编辑</el-button>
                    <el-button type="text" @click="look_up(scope.row)" v-if="
                        table_data_self.table.select=='yhjlb' ||
                        table_data_self.table.select=='yglb'||
                        table_data_self.table.select=='jslb'
                    ">删除</el-button>
                    <el-button type="text" @click="check(scope.row)" v-if="
                        table_data_self.table.select=='ddjl' && scope.row.status != '已使用'
                    ">核销</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 页码 -->
        <div class="page" v-if='table_data_self.page.is_page'>
            <el-pagination
                @size-change="change_page_size"
                @current-change="change_page"
                :current-page="table_data_self.page.current_page"
                :page-sizes="[10]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="table_data_self.page.total">
            </el-pagination>
        </div>

    </div>
</template>

<script>

export default {
    name: 'table_page',
    props: [
        'table_data'
    ],
    data () {
        return {
            table_data_self: {
                table: {
                    is_height: 'auto',
                    lists: []
                },
                page: {
                    is_page: true
                }
            },
        }
    },
    methods: {
        //改变页码页数
        change_page (val) {
            this.$emit('change_page', val);
        },
        //改变每页的条数
        change_page_size (val) {
            this.$emit('change_page_size', val);
        },
        //点击禁用/开启账户
        change_ban (index, val, user_sn) {
            this.$emit('change_ban', index, val, user_sn);
        },
        change_ban02 (index, val, user_sn) {
            this.$emit('change_ban02', index, val, user_sn);
        },
        //查看详情
        look_up (row) {
            this.$emit('look_up', row);
        },
        //日期排序
        date_sort (a, b) {
            return a - b;
        },
        check (row) {
            this.$emit('check', row);
        }
    },
    mounted () {
        var that = this;
        setTimeout(() => {
            that.table_data_self = that.table_data;
            that.table_data_self.table.is_height = that.table_data_self.table.is_height ? that.table_data_self.table.is_height : 'auto';
            //将时间戳转为日期格式(异步 因为要请求后台数据)
            var lists = that.table_data_self.table.lists;
            var length = that.table_data_self.table.lists.length;
            if (that.table_data_self.table.lists[0] && that.table_data_self.table.lists[0].time) {
                for (var i = 0; i < length; i ++) {
                    // that.table_data_self.table.lists[i].time = new Date(lists[i].time * 1000).toLocaleDateString().replace(/\//g, "-");
                    that.table_data_self.table.lists[i].time = that.$moment(lists[i].time * 1000).format('YYYY-MM-DD');
                };
            };
            if (that.table_data_self.table.lists[0] && that.table_data_self.table.lists[0].time02) {
                for (var i = 0; i < length; i ++) {
                    that.table_data_self.table.lists[i].time02 = that.$moment(lists[i].time02 * 1000).format('YYYY-MM-DD HH:mm:ss');
                };
            };
            //最近登录时间
            // if (that.table_data_self.table.lists[0] && that.table_data_self.table.lists[0].last_login) {
            //     for (var i = 0; i < length; i ++) {
            //         if (lists[i].last_login <= 0) {
            //             that.table_data_self.table.lists[i].last_login = '/';
            //         }else {
            //             that.table_data_self.table.lists[i].last_login = that.$moment(lists[i].last_login * 1000).format('YYYY-MM-DD HH:mm:ss');
            //         }
            //     };
            // };
            //充值时间
            if (that.table_data_self.table.lists[0] && that.table_data_self.table.lists[0].pay_time) {
                for (var i = 0; i < length; i ++) {
                    that.table_data_self.table.lists[i].pay_time = that.$moment(lists[i].pay_time * 1000).format('YYYY-MM-DD HH:mm:ss');
                };
            };
            //下单时间
            // if (that.table_data_self.table.lists[0] && that.table_data_self.table.lists[0].add_time) {
            //     for (var i = 0; i < length; i ++) {
            //         that.table_data_self.table.lists[i].add_time = that.$moment(lists[i].add_time * 1000).format('YYYY-MM-DD HH:mm:ss');
            //     };
            // };
            //优惠券截止时间
            if (that.table_data_self.table.lists[0] && that.table_data_self.table.lists[0].deadline) {
                for (var i = 0; i < length; i ++) {
                    that.table_data_self.table.lists[i].deadline = that.$moment(lists[i].deadline * 1000).format('YYYY-MM-DD HH:mm:ss');
                };
            };
            //操作时间
            if (that.table_data_self.table.lists[0] && that.table_data_self.table.lists[0].czsj) {
                for (var i = 0; i < length; i ++) {
                    that.table_data_self.table.lists[i].czsj = that.$moment(lists[i].czsj * 1000).format('YYYY-MM-DD HH:mm:ss');
                };
            };
            //添加时间
            if (that.table_data_self.table.lists[0] && that.table_data_self.table.lists[0].tjsj) {
                for (var i = 0; i < length; i ++) {
                    that.table_data_self.table.lists[i].tjsj = that.$moment(lists[i].tjsj * 1000).format('YYYY-MM-DD HH:mm:ss');
                };
            };
            //角色列表-添加时间
            if (that.table_data_self.table.lists[0] && that.table_data_self.table.lists[0].jslb_time) {
                for (var i = 0; i < length; i ++) {
                    that.table_data_self.table.lists[i].jslb_time = that.$moment(lists[i].jslb_time * 1000).format('YYYY-MM-DD HH:mm:ss');
                };
            };
            //订单状态
            if (that.table_data_self.table.lists[0] && that.table_data_self.table.lists[0].order_status) {
                for (var i = 0; i < length; i ++) {
                    switch (that.table_data_self.table.lists[i].order_status) {
                        case 0:
                            that.table_data_self.table.lists[i].order_status = '待确认';
                            break;
                        case 1:
                            that.table_data_self.table.lists[i].order_status = '已确认';
                            break;
                        case 2:
                            that.table_data_self.table.lists[i].order_status = '已收货';
                            break;
                        case 3:
                            that.table_data_self.table.lists[i].order_status = '已取消';
                            break;
                        case 4:
                            that.table_data_self.table.lists[i].order_status = '已完成';
                            break;
                        case 5:
                            that.table_data_self.table.lists[i].order_status = '已作废';
                            break;
                    };
                };
            };
        }, 300);
        
    }
}
</script>