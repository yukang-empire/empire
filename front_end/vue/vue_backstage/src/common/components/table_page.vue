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
                label="门店ID">
            </el-table-column>
            <el-table-column
                v-if="table_data.table.select=='splb'"
                prop="name"
                label="商品名称">
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
                v-if="table_data.table.select=='sjlb'"
                prop="phone"
                label="手机号">
            </el-table-column>
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
                v-if="table_data.table.select=='sjlb'"
                prop="address"
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
            <el-table-column label="禁用账户" v-if="table_data.table.select=='sjlb' || table_data.table.select=='mdlb'">
                <template slot-scope="scope">
                    <el-switch
                        v-model="scope.row.ban == 1 ? true : false"
                        @change='change_ban(scope.$index, scope.row.ban)'
                        active-color="#13ce66"
                        inactive-color="#ccc">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作" v-if="table_data.table.select=='sjlb' || table_data.table.select=='mdlb' || table_data.table.select=='splb'">
                <template slot-scope="scope">
                    <el-button type="text" @click="look_up(scope.row)">查看</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 页码 -->
        <div class="page">
            <el-pagination
                @size-change="change_page_size"
                @current-change="change_page"
                :current-page="table_data.page.current_page"
                :page-sizes="[5, 10, 15, 20]"
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
        change_ban (index, val) {
            this.$emit('change_ban', index, val);
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
        //将时间戳转为日期格式
        var lists = this.table_data.table.lists;
        var length = this.table_data.table.lists.length;
        for (var i = 0; i < length; i ++) {
            this.table_data.table.lists[i].time = new Date(lists[i].time * 1000).toLocaleDateString().replace(/\//g, "-");
        };
    }
}
</script>