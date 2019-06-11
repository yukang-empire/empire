<template>
    <div class="table_page">
        <!-- 表格 指定height则代表固定表头并将多余的内容滚动条化-->
        <el-table
        stripe
        :height="table_data.table.is_height ? table_data.table.is_height : 'auto'"
        :data="table_data.table.lists"
        style="width: 100%">
            <!-- 实现多选 -->
            <el-table-column
                type="selection"
                width="40">
            </el-table-column>

            <!-- 商家列表 -->
            <el-table-column 
                v-if="table_data.table.select=='sjlb'"
                prop="id"
                sortable
                :sort-method='date_sort'
                label="商家ID">
            </el-table-column>
            <el-table-column
                v-if="table_data.table.select=='sjlb'"
                prop="name"
                label="企业名称">
            </el-table-column>
            <!-- 门店列表 -->
            <el-table-column 
                v-if="table_data.table.select=='mdlb'"
                prop="id"
                sortable
                :sort-method='date_sort'
                label="门店ID">
            </el-table-column>
            <el-table-column
                v-if="table_data.table.select=='mdlb'"
                prop="name"
                label="门店名称">
            </el-table-column>
            <!-- 商品列表 -->
            <el-table-column 
                v-if="table_data.table.select=='splb'"
                prop="id"
                sortable
                :sort-method='date_sort'
                label="商品ID">
            </el-table-column>
            <el-table-column
                v-if="table_data.table.select=='splb'"
                prop="name"
                label="商品名称">
            </el-table-column>
            <!-- 用户列表 -->
            <el-table-column 
                v-if="table_data.table.select=='yhlb'"
                prop="user_id"
                sortable
                :sort-method='date_sort'
                label="用户ID">
            </el-table-column>
            <el-table-column
                v-if="table_data.table.select=='yhlb'"
                prop="nickname"
                label="昵称">
            </el-table-column>
            <!-- 统计信息 -->
            <el-table-column
                v-if="table_data.table.select=='tjxx'"
                prop="xfje"
                sortable
                :sort-method='date_sort'
                label="累计消费金额">
            </el-table-column>
            <el-table-column
                v-if="table_data.table.select=='tjxx'"
                prop="ddsl"
                sortable
                :sort-method='date_sort'
                label="订单数量">
            </el-table-column>
            <el-table-column
                v-if="table_data.table.select=='tjxx'"
                prop="yqhy"
                sortable
                :sort-method='date_sort'
                label="邀请好友数">
            </el-table-column>
            <el-table-column
                v-if="table_data.table.select=='tjxx'"
                prop="yhj"
                sortable
                :sort-method='date_sort'
                label="优惠券">
            </el-table-column>
            <el-table-column
                v-if="table_data.table.select=='tjxx'"
                prop="kd"
                sortable
                :sort-method='date_sort'
                label="酷点">
            </el-table-column>
            <el-table-column
                v-if="table_data.table.select=='tjxx'"
                prop="kb"
                sortable
                :sort-method='date_sort'
                label="酷币">
            </el-table-column>
            </el-table-column>
            <el-table-column
                v-if="table_data.table.select=='mdlb' || table_data.table.select=='splb'"
                prop="sssj"
                label="所属商家">
            </el-table-column>
            <el-table-column
                v-if="table_data.table.select=='splb'"
                prop="ssmd"
                label="所属门店">
            </el-table-column>
            <el-table-column
                v-if="table_data.table.select=='splb'"
                prop="xsje"
                label="商品销售金额">
            </el-table-column>
            <el-table-column
                v-if="table_data.table.select=='splb'"
                prop="jsje"
                label="商品结算金额">
            </el-table-column>
            <el-table-column
                v-if="table_data.table.select=='splb'"
                prop="num"
                label="销量">
            </el-table-column>
            <el-table-column
                v-if="table_data.table.select=='sjlb' || table_data.table.select=='yhlb'"
                prop="mobile"
                label="手机号">
            </el-table-column>
            <el-table-column
                v-if="table_data.table.select=='yhlb'"
                prop="total_amount"
                sortable
                :sort-method='date_sort'
                label="消费金额">
            </el-table-column>
            <!-- <el-table-column
                v-if="table_data.table.select=='yhlb'"
                prop="order"
                sortable
                :sort-method='date_sort'
                label="订单数量">
            </el-table-column> -->
            <el-table-column
                v-if="table_data.table.select=='sjlb'"
                prop="people"
                label="联系人">
            </el-table-column>
            <el-table-column
                v-if="table_data.table.select=='sjlb'"
                prop="stores"
                sortable
                :sort-method='date_sort'
                label="门店数量">
            </el-table-column>
            <el-table-column
                v-if="table_data.table.select=='sjlb' || table_data.table.select=='yhlb'"
                prop="city"
                label="地区">
            </el-table-column>
            <el-table-column
                v-if="table_data.table.select=='mdlb'"
                prop="ssqy"
                label="所属区域">
            </el-table-column>
            <el-table-column
                v-if="table_data.table.select=='mdlb'"
                prop="xxdz"
                label="详细地址">
            </el-table-column>
            <el-table-column
                v-if="table_data.table.select=='mdlb'"
                prop="num"
                sortable
                :sort-method='date_sort'
                label="商品数量">
            </el-table-column>
            <!-- 转换日期格式后 默认的排序方式会出错 所以要用自定义排序方法sort-method -->
            <el-table-column
                v-if="table_data.table.select=='sjlb'"
                prop="time"
                sortable
                :sort-method='date_sort'
                label="进驻日期">
            </el-table-column>
            <el-table-column
                v-if="table_data.table.select=='yhlb'"
                prop="reg_time"
                sortable
                :sort-method='date_sort'
                label="最近登录时间">
            </el-table-column>
            <el-table-column
                v-if="table_data.table.select=='tjxx'"
                prop="time02"
                sortable
                :sort-method='date_sort'
                label="最近登录时间">
            </el-table-column>
            <el-table-column label="禁用账户" v-if="table_data.table.select=='sjlb' || table_data.table.select=='mdlb' || table_data.table.select=='yhlb'">
                <template slot-scope="scope">
                    <el-switch
                        v-model="scope.row.is_lock == 0 ? true : false"
                        @change='change_ban(scope.$index, scope.row.is_lock, scope.row.user_sn)'
                        active-color="#13ce66"
                        inactive-color="#ccc">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作" v-if="table_data.table.select=='sjlb' || table_data.table.select=='mdlb' || table_data.table.select=='splb' || table_data.table.select=='yhlb'">
                <template slot-scope="scope">
                    <el-button type="text" @click="look_up(scope.row)">查看</el-button>
                    <!-- <el-button type="text" @click="look_up(scope.row)" v-else>编辑</el-button> -->
                </template>
            </el-table-column>
        </el-table>

        <!-- 页码 -->
        <div class="page">
            <el-pagination
                @size-change="change_page_size"
                @current-change="change_page"
                :current-page="table_data.page.current_page"
                :page-sizes="[10]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="table_data.page.total">
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
        //查看详情
        look_up (row) {
            this.$emit('look_up', row);
        },
        //日期排序
        date_sort (a, b) {
            return a - b;
        }
    },
    mounted () {
        //将时间戳转为日期格式(异步 因为要请求后台数据)
        var lists = this.table_data.table.lists;
        var length = this.table_data.table.lists.length;
        if (this.table_data.table.lists[0].time) {
            for (var i = 0; i < length; i ++) {
                // this.table_data.table.lists[i].time = new Date(lists[i].time * 1000).toLocaleDateString().replace(/\//g, "-");
                this.table_data.table.lists[i].time = this.$moment(lists[i].time * 1000).format('YYYY-MM-DD');
            };
        };
        if (this.table_data.table.lists[0].time02) {
            for (var i = 0; i < length; i ++) {
                this.table_data.table.lists[i].time02 = this.$moment(lists[i].time02 * 1000).format('YYYY-MM-DD HH:mm:ss');
            };
        };
    }
}
</script>