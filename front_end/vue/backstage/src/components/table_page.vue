<template>
    <div class="table_page">
        <!-- 表格 指定height则代表固定表头并将多余的内容滚动条化-->
        <el-table stripe :height="table_data.table.is_height" :data="table_data.table.lists" style="width: 100%">
            <!-- 实现多选 -->
            <el-table-column type="selection" width="40"> </el-table-column>

            <!-- 用户列表 -->
            <el-table-column v-if="table_data.table.which=='user_list'" prop="user_id" label="用户ID" sortable :sort-method='date_sort'> </el-table-column>
            <el-table-column v-if="table_data.table.which=='user_list'" prop="nickname" label="昵称"> </el-table-column>
            <el-table-column v-if="table_data.table.which=='user_list'" prop="mobile" label="手机号"> </el-table-column>
            <el-table-column v-if="table_data.table.which=='user_list'" prop="city" label="地区"> </el-table-column>
            <el-table-column v-if="table_data.table.which=='user_list'" prop="total_amount" label="消费金额" sortable :sort-method='date_sort'> </el-table-column>
            <el-table-column v-if="table_data.table.which=='user_list'" prop="last_login" label="最近登录时间" sortable :sort-method='date_sort'> </el-table-column>

            <el-table-column label="禁用账户" v-if="
                table_data.table.which=='user_list'
            ">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.is_lock == 0 ? true : false" @change='change_state(scope.$index, scope.row)' active-color="#13ce66" inactive-color="#ccc"> </el-switch>
                </template>
            </el-table-column>

            <el-table-column label="操作" v-if="
                table_data.table.which=='user_list'
            ">
                <template slot-scope="scope">
                    <el-button type="text" @click="look_up(scope.row)"  v-if="">查看</el-button>
                </template>
            </el-table-column>

        </el-table>

        <!-- 页码 -->
        <div class="page" v-if='table_data.page.is_page'>
            <el-pagination
                @size-change="change_page_size"
                @current-change="change_page"
                :current-page="table_data.page.current_page"
                :page-sizes="[10]"
                :page-size="table_data.page.size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="table_data.page.total">
            </el-pagination>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
    components: {
        
    }
})

export default class table_page extends Vue{
    // private table_data: any = {
    //     table: {
    //         is_height: 'auto',
    //         lists: []
    //     },
    //     page: {
    //         is_page: true
    //     }
    // };
    @Prop() private table_data !: any;

    //改变页码页数
    change_page (val: any) {
        this.$emit('change_page', val);
    };
    //改变每页的条数
    change_page_size (val: any) {
        this.$emit('change_page_size', val);
    };
    //点击禁用/开启账户
    change_state (index: number, row: any) {
        this.$emit('change_state', index, row);
    };
    //查看详情
    look_up (row: any) {
        this.$emit('look_up', row);
    };
    //日期排序
    date_sort (a: any, b: any) {
        return a - b;
    };
}

</script>

<style lang="scss" scoped>

    @media screen and (min-width: 769px) {
        
    }
</style>