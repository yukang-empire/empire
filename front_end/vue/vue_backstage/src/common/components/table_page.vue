<template>
    <div class="table_page">
        <!-- 表格 -->
        <el-table
        stripe
        :data="table_data.table.lists"
        style="width: 100%">
            <!-- 实现多选 -->
            <el-table-column
                type="selection"
                width="40">
            </el-table-column>
            <el-table-column
                prop="id"
                sortable
                label="商家ID">
            </el-table-column>
            <el-table-column
                prop="name"
                label="企业名称">
            </el-table-column>
            <el-table-column
                prop="phone"
                label="手机号">
            </el-table-column>
            <el-table-column
                prop="people"
                label="联系人">
            </el-table-column>
            <el-table-column
                prop="stores"
                sortable
                label="门店数量">
            </el-table-column>
            <el-table-column
                prop="address"
                label="地区">
            </el-table-column>
            <!-- 转换日期格式后 默认的排序方式会出错 所以要用自定义排序方法sort-method -->
            <el-table-column
                prop="time"
                sortable
                :sort-method='date_sort'
                label="进驻日期">
            </el-table-column>
            <el-table-column label="禁用账户">
                <template slot-scope="scope">
                    <el-switch
                        v-model="scope.row.ban == 1 ? true : false"
                        @change='change_ban(scope.$index)'
                        active-color="#13ce66"
                        inactive-color="#ccc">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="text" @click="look_up(scope.$index, scope.row)">查看</el-button>
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
                :total="30">
            </el-pagination>
        </div>

        <!-- 弹框 -->
        <dialog_component :dialog='dialog' @off_dialog='off_dialog' />
    </div>
</template>

<script>
import dialog_component from '@/common/components/dialog.vue';

export default {
    name: 'table_page',
    components: {
        dialog_component
    },
    props: [
        'table_data'
    ],
    data () {
        return {
            //弹框数据
            dialog: {
                is_open: false,
                msg: '',
                type: '1',
                is_sure: null,
            },
        }
    },
    methods: {
        //关闭弹框
        off_dialog (num) {
            if (num == 0) {
                this.dialog.is_sure = false;
            }else {
                this.dialog.is_sure = true;
            };
        },
        //改变页码页数
        change_page (val) {
            this.$emit('change_page', val);
        },
        //改变每页的条数
        change_page_size (val) {
            this.$emit('change_page_size', val);
        },
        //点击禁用/开启账户
        change_ban (index) {
            this.dialog.is_open = true;
            if (this.table_data.table.lists[index].ban == 1) {
                this.dialog.msg = '是否禁用?';
                if (this.dialog.is_sure) {
                    this.table_data.table.lists[index].ban = 0;
                };
                this.dialog.is_open = false;
            }else {
                this.dialog.msg = '是否开启?';
                if (this.dialog.is_sure) {
                    this.table_data.table.lists[index] = 1;
                };
                this.dialog.is_open = false;
            };
            // this.$emit('change_ban', index);
        },
        //查看详情
        look_up (index, row) {
            this.$emit('look_up', index, row);
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