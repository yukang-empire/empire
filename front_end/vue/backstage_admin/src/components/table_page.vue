<template>
    <div class="table_page">
        <!-- 表格 指定height则代表固定表头并将多余的内容滚动条化-->
        <el-table stripe :height="table_data.table.is_height" :data="table_data.table.lists" style="width: 100%">
            <!-- 实现多选 -->
            <el-table-column type="selection" width="40" v-if="table_data.table.checkbox"> </el-table-column>

            <!-- 用户列表 -->
            <el-table-column v-if="table_data.table.which=='user_list'" prop="user_id" label="用户ID" sortable :sort-method='date_sort'></el-table-column>
            <el-table-column v-if="table_data.table.which=='user_list'" prop="nickname" label="昵称"></el-table-column>
            <el-table-column v-if="table_data.table.which=='user_list'" prop="mobile" label="手机号"></el-table-column>
            <el-table-column v-if="table_data.table.which=='user_list'" prop="city" label="地区"></el-table-column>
            <el-table-column v-if="table_data.table.which=='user_list'" prop="total_amount" label="消费金额" sortable :sort-method='date_sort'></el-table-column>
            <el-table-column v-if="table_data.table.which=='user_list'" prop="last_login" label="最近登录时间" sortable :sort-method='date_sort'></el-table-column>

            <!-- 用户详情-统计信息 -->
            <el-table-column v-if="table_data.table.which=='user_statistic'" prop="total_amount" label="累计消费金额"></el-table-column>
            <el-table-column v-if="table_data.table.which=='user_statistic'" prop="order" label="订单数量"></el-table-column>
            <el-table-column v-if="table_data.table.which=='user_statistic'" prop="underling_number" label="邀请好友数"></el-table-column>
            <el-table-column v-if="table_data.table.which=='user_statistic'" prop="coupon" label="优惠券"></el-table-column>
            <el-table-column v-if="table_data.table.which=='user_statistic'" prop="user_points" label="酷点"></el-table-column>
            <el-table-column v-if="table_data.table.which=='user_statistic'" prop="cool_B" label="酷卡"></el-table-column>
            <el-table-column v-if="table_data.table.which=='user_statistic'" prop="last_login" label="最近登录时间"></el-table-column>

            <!-- 用户详情-订单记录 -->
            <el-table-column v-if="table_data.table.which=='user_order'" prop="order_sn" label="订单编号"></el-table-column>
            <el-table-column v-if="table_data.table.which=='user_order'" prop="goods_name" label="商品名称"></el-table-column>
            <el-table-column v-if="table_data.table.which=='user_order'" prop="total_amount" label="订单金额(元)" sortable :sort-method='date_sort'></el-table-column>
            <el-table-column v-if="table_data.table.which=='user_order'" prop="order_status" label="订单状态"></el-table-column>
            <el-table-column v-if="table_data.table.which=='user_order'" prop="add_time" label="提交时间" sortable :sort-method='date_sort'></el-table-column>

            <!-- 用户详情-充值记录 -->
            <el-table-column v-if="table_data.table.which=='user_recharge'" prop="order_sn" label="充值订单编号"></el-table-column>
            <el-table-column v-if="table_data.table.which=='user_recharge'" prop="account" label="充值酷卡" sortable :sort-method='date_sort'></el-table-column>
            <el-table-column v-if="table_data.table.which=='user_recharge'" prop="user_points" label="赠送酷点" sortable :sort-method='date_sort'></el-table-column>
            <el-table-column v-if="table_data.table.which=='user_recharge'" prop="pay_name" label="支付方式"></el-table-column>
            <el-table-column v-if="table_data.table.which=='user_recharge'" prop="account" label="支付金额" sortable :sort-method='date_sort'></el-table-column>
            <el-table-column v-if="table_data.table.which=='user_recharge'" prop="ctime" label="充值时间" sortable :sort-method='date_sort'></el-table-column>

            <!-- 商家列表 -->
            <el-table-column v-if="table_data.table.which=='business_list'" prop="id" label="商家ID"></el-table-column>
            <el-table-column v-if="table_data.table.which=='business_list'" prop="club_name" label="企业名称"></el-table-column>
            <el-table-column v-if="table_data.table.which=='business_list'" prop="mobile" label="手机号"></el-table-column>
            <el-table-column v-if="table_data.table.which=='business_list'" prop="nickname" label="联系人"></el-table-column>
            <el-table-column v-if="table_data.table.which=='business_list'" prop="user_num" label="门店数量" sortable :sort-method='date_sort'></el-table-column>
            <el-table-column v-if="table_data.table.which=='business_list'" prop="address" label="地区"></el-table-column>
            <el-table-column v-if="table_data.table.which=='business_list'" prop="add_time" label="进驻日期" sortable :sort-method='date_sort'></el-table-column>

            <!-- 门店列表 -->
            <el-table-column v-if="table_data.table.which=='store_list'" prop="id" label="门店ID"></el-table-column>
            <el-table-column v-if="table_data.table.which=='store_list'" prop="club_name" label="门店名称"></el-table-column>
            <el-table-column v-if="table_data.table.which=='store_list'" prop="master_name" label="所属商家"></el-table-column>
            <el-table-column v-if="table_data.table.which=='store_list'" prop="area_" label="所属区域"></el-table-column>
            <el-table-column v-if="table_data.table.which=='store_list'" prop="address" label="详细地址"></el-table-column>
            <el-table-column v-if="table_data.table.which=='store_list'" prop="goods_num" label="商品数量" sortable :sort-method='date_sort'></el-table-column>

            <!-- 商品列表 -->
            <el-table-column v-if="table_data.table.which=='goods_list'" prop="goods_id" label="商品ID"></el-table-column>
            <el-table-column v-if="table_data.table.which=='goods_list'" prop="goods_name" label="商品名称"></el-table-column>
            <el-table-column v-if="table_data.table.which=='goods_list'" prop="club_name" label="所属门店"></el-table-column>
            <el-table-column v-if="table_data.table.which=='goods_list'" prop="shop_price" label="商品销售金额" sortable :sort-method='date_sort'></el-table-column>
            <el-table-column v-if="table_data.table.which=='goods_list'" prop="cost_price" label="商品结算金额" sortable :sort-method='date_sort'></el-table-column>
            <el-table-column v-if="table_data.table.which=='goods_list'" prop="sales_sum" label="销量" sortable :sort-method='date_sort'></el-table-column>

            <!-- 服务订单列表 -->
            <el-table-column v-if="table_data.table.which=='service_list'" prop="name" label="订单编号" sortable :sort-method='date_sort'></el-table-column>
            <el-table-column v-if="table_data.table.which=='service_list'" prop="name" label="用户昵称"></el-table-column>
            <el-table-column v-if="table_data.table.which=='service_list'" prop="name" label="手机号"></el-table-column>
            <el-table-column v-if="table_data.table.which=='service_list'" prop="name" label="订单标题"></el-table-column>
            <el-table-column v-if="table_data.table.which=='service_list'" prop="name" label="订单金额(元)" sortable :sort-method='date_sort'></el-table-column>
            <el-table-column v-if="table_data.table.which=='service_list'" prop="name" label="订单状态"></el-table-column>
            <el-table-column v-if="table_data.table.which=='service_list'" prop="name" label="提交时间" sortable :sort-method='date_sort'></el-table-column>

            <!-- 转让订单列表 -->
            <el-table-column v-if="table_data.table.which=='transfer_list'" prop="name" label="订单编号" sortable :sort-method='date_sort'></el-table-column>
            <el-table-column v-if="table_data.table.which=='transfer_list'" prop="name" label="用户昵称"></el-table-column>
            <el-table-column v-if="table_data.table.which=='transfer_list'" prop="name" label="手机号"></el-table-column>
            <el-table-column v-if="table_data.table.which=='transfer_list'" prop="name" label="健身房名称"></el-table-column>
            <el-table-column v-if="table_data.table.which=='transfer_list'" prop="name" label="酷卡价值" sortable :sort-method='date_sort'></el-table-column>
            <el-table-column v-if="table_data.table.which=='transfer_list'" prop="name" label="健身卡类型"></el-table-column>
            <el-table-column v-if="table_data.table.which=='transfer_list'" prop="name" label="订单状态"></el-table-column>
            <el-table-column v-if="table_data.table.which=='transfer_list'" prop="name" label="提交时间" sortable :sort-method='date_sort'></el-table-column>

            <!-- 领用订单列表 -->
            <el-table-column v-if="table_data.table.which=='receive_list'" prop="name" label="订单编号" sortable :sort-method='date_sort'></el-table-column>
            <el-table-column v-if="table_data.table.which=='receive_list'" prop="name" label="用户昵称"></el-table-column>
            <el-table-column v-if="table_data.table.which=='receive_list'" prop="name" label="手机号"></el-table-column>
            <el-table-column v-if="table_data.table.which=='receive_list'" prop="name" label="健身房名称"></el-table-column>
            <el-table-column v-if="table_data.table.which=='receive_list'" prop="name" label="支付金额" sortable :sort-method='date_sort'></el-table-column>
            <el-table-column v-if="table_data.table.which=='receive_list'" prop="name" label="订单状态"></el-table-column>
            <el-table-column v-if="table_data.table.which=='receive_list'" prop="name" label="提交时间" sortable :sort-method='date_sort'></el-table-column>

            <!-- 上架-私家课 -->
            <el-table-column v-if="table_data.table.which=='upper_course'" prop="name" label="课程名称"></el-table-column>
            <el-table-column v-if="table_data.table.which=='upper_course'" prop="name" label="私教费用"></el-table-column>
            <el-table-column v-if="table_data.table.which=='upper_course'" prop="name" label="结算费用"></el-table-column>

            <!-- 订单-操作记录 -->
            <el-table-column v-if="table_data.table.which=='operation_log'" prop="name" label="操作人"></el-table-column>
            <el-table-column v-if="table_data.table.which=='operation_log'" prop="name" label="订单状态"></el-table-column>
            <el-table-column v-if="table_data.table.which=='operation_log'" prop="name" label="付款状态"></el-table-column>
            <el-table-column v-if="table_data.table.which=='operation_log'" prop="name" label="操作时间" sortable :sort-method='date_sort'></el-table-column>
            <el-table-column v-if="table_data.table.which=='operation_log'" prop="name" label="备注"></el-table-column>

            <!-- 提现列表 -->
            <el-table-column v-if="table_data.table.which=='cash_out_list'" prop="name" label="序号" sortable :sort-method='date_sort'></el-table-column>
            <el-table-column v-if="table_data.table.which=='cash_out_list'" prop="name" label="用户类型"></el-table-column>
            <el-table-column v-if="table_data.table.which=='cash_out_list'" prop="name" label="申请提现人"></el-table-column>
            <el-table-column v-if="table_data.table.which=='cash_out_list'" prop="name" label="手机号码"></el-table-column>
            <el-table-column v-if="table_data.table.which=='cash_out_list'" prop="name" label="提现金额" sortable :sort-method='date_sort'></el-table-column>
            <el-table-column v-if="table_data.table.which=='cash_out_list'" prop="name" label="提现账户"></el-table-column>
            <el-table-column v-if="table_data.table.which=='cash_out_list'" prop="name" label="账户类型"></el-table-column>
            <el-table-column v-if="table_data.table.which=='cash_out_list'" prop="name" label="申请日期" sortable :sort-method='date_sort'></el-table-column>
            <el-table-column v-if="table_data.table.which=='cash_out_list'" prop="name" label="打款日期" sortable :sort-method='date_sort'></el-table-column>
            <el-table-column v-if="table_data.table.which=='cash_out_list'" prop="name" label="状态"></el-table-column>

            <!-- 财务-服务订单统计 -->
            <el-table-column v-if="table_data.table.which=='finance_service_list'" prop="name" label="序号"></el-table-column>
            <el-table-column v-if="table_data.table.which=='finance_service_list'" prop="name" label="日期"></el-table-column>
            <el-table-column v-if="table_data.table.which=='finance_service_list'" prop="name" label="合计金额"></el-table-column>
            <el-table-column v-if="table_data.table.which=='finance_service_list'" prop="name" label="订单金额"></el-table-column>
            <el-table-column v-if="table_data.table.which=='finance_service_list'" prop="name" label="结算金额"></el-table-column>
            <el-table-column v-if="table_data.table.which=='finance_service_list'" prop="name" label="平台收入"></el-table-column>

            <!-- 财务-服务订单统计-明细 -->
            <el-table-column v-if="table_data.table.which=='finance_service_details'" prop="name" label="订单编号"></el-table-column>
            <el-table-column v-if="table_data.table.which=='finance_service_details'" prop="name" label="用户昵称"></el-table-column>
            <el-table-column v-if="table_data.table.which=='finance_service_details'" prop="name" label="用户手机"></el-table-column>
            <el-table-column v-if="table_data.table.which=='finance_service_details'" prop="name" label="订单标题"></el-table-column>
            <el-table-column v-if="table_data.table.which=='finance_service_details'" prop="name" label="订单金额(元)"></el-table-column>
            <el-table-column v-if="table_data.table.which=='finance_service_details'" prop="name" label="结算金额(元)"></el-table-column>
            <el-table-column v-if="table_data.table.which=='finance_service_details'" prop="name" label="订单状态"></el-table-column>
            <el-table-column v-if="table_data.table.which=='finance_service_details'" prop="name" label="提交时间"></el-table-column>

            <!-- 财务-充值订单统计 -->
            <el-table-column v-if="table_data.table.which=='finance_recharge_list'" prop="name" label="序号"></el-table-column>
            <el-table-column v-if="table_data.table.which=='finance_recharge_list'" prop="name" label="日期"></el-table-column>
            <el-table-column v-if="table_data.table.which=='finance_recharge_list'" prop="name" label="合计金额"></el-table-column>
            <el-table-column v-if="table_data.table.which=='finance_recharge_list'" prop="name" label="充值金额"></el-table-column>

            <!-- 财务-充值订单统计-明细 -->
            <el-table-column v-if="table_data.table.which=='finance_recharge_details'" prop="name" label="序号"></el-table-column>
            <el-table-column v-if="table_data.table.which=='finance_recharge_details'" prop="name" label="时间"></el-table-column>
            <el-table-column v-if="table_data.table.which=='finance_recharge_details'" prop="name" label="用户昵称"></el-table-column>
            <el-table-column v-if="table_data.table.which=='finance_recharge_details'" prop="name" label="用户手机"></el-table-column>
            <el-table-column v-if="table_data.table.which=='finance_recharge_details'" prop="name" label="充值方式"></el-table-column>
            <el-table-column v-if="table_data.table.which=='finance_recharge_details'" prop="name" label="充值酷卡"></el-table-column>
            <el-table-column v-if="table_data.table.which=='finance_recharge_details'" prop="name" label="赠送酷点"></el-table-column>
            <el-table-column v-if="table_data.table.which=='finance_recharge_details'" prop="name" label="实付金额"></el-table-column>

            <!-- 财务-通用设置-充值 -->
            <el-table-column v-if="table_data.table.which=='finance_set_recharge'" prop="name" label="序号"></el-table-column>
            <el-table-column v-if="table_data.table.which=='finance_set_recharge'" prop="name" label="名称"></el-table-column>
            <el-table-column v-if="table_data.table.which=='finance_set_recharge'" prop="name" label="总酷卡值"></el-table-column>
            <el-table-column v-if="table_data.table.which=='finance_set_recharge'" prop="name" label="充值酷卡"></el-table-column>
            <el-table-column v-if="table_data.table.which=='finance_set_recharge'" prop="name" label="赠送酷卡"></el-table-column>
            <el-table-column v-if="table_data.table.which=='finance_set_recharge'" prop="name" label="赠送酷点"></el-table-column>
            <el-table-column v-if="table_data.table.which=='finance_set_recharge'" prop="name" label="售价(元)"></el-table-column>
            <el-table-column v-if="table_data.table.which=='finance_set_recharge'" prop="name" label="修改日期"></el-table-column>

            <!-- 财务-通用设置-会籍卡 -->
            <el-table-column v-if="table_data.table.which=='finance_set_card'" prop="name" label="序号"></el-table-column>
            <el-table-column v-if="table_data.table.which=='finance_set_card'" prop="name" label="名称"></el-table-column>
            <el-table-column v-if="table_data.table.which=='finance_set_card'" prop="name" label="购买金额"></el-table-column>
            <el-table-column v-if="table_data.table.which=='finance_set_card'" prop="name" label="赠送酷点"></el-table-column>
            <el-table-column v-if="table_data.table.which=='finance_set_card'" prop="name" label="修改日期"></el-table-column>

            <el-table-column label="禁用账户" v-if="table_data.table.which=='user_list'">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.is_lock == 0 ? true : false" @change='change_state(scope.$index, scope.row)' active-color="#13ce66" inactive-color="#ccc"> </el-switch>
                </template>
            </el-table-column>

            <!-- <el-table-column label="禁用商家" v-if="table_data.table.which=='business_list'">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.status == 1 ? true : false" @change='change_state(scope.$index, scope.row)' active-color="#13ce66" inactive-color="#ccc"> </el-switch>
                </template>
            </el-table-column> -->

            <el-table-column label="禁用门店" v-if="table_data.table.which=='store_list'">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.status == 1 ? true : false" @change='change_state(scope.$index, scope.row)' active-color="#13ce66" inactive-color="#ccc"> </el-switch>
                </template>
            </el-table-column>

            

            <el-table-column label="操作" v-if="
                table_data.table.which=='user_list' ||
                table_data.table.which=='user_order' ||
                table_data.table.which=='business_list' ||
                table_data.table.which=='store_list' ||
                table_data.table.which=='goods_list' ||
                table_data.table.which=='service_list' ||
                table_data.table.which=='transfer_list' ||
                table_data.table.which=='receive_list' ||
                table_data.table.which=='cash_out_list' ||
                table_data.table.which=='finance_service_list' ||
                table_data.table.which=='finance_service_details' ||
                table_data.table.which=='finance_recharge_list' ||
                table_data.table.which=='upper_course' ||
                table_data.table.which=='finance_set_recharge' ||
                table_data.table.which=='finance_set_card'
            ">
                <template slot-scope="scope">
                    <el-button type="text" @click="look_up(scope.row)"  v-if="">查看</el-button>
                    <el-button v-if="
                        table_data.table.which=='upper_course' ||
                        table_data.table.which=='goods_list' ||
                        table_data.table.which=='store_list' ||
                        table_data.table.which=='finance_set_recharge' ||
                        table_data.table.which=='finance_set_card'
                    " type="text" @click="edit(scope.row)">编辑</el-button>
                </template>
            </el-table-column>

        </el-table>

        <!-- 页码 -->
        <div class="page" v-if='table_data.page.is_page'>
            <el-pagination
                @size-change="change_page_size"
                @current-change="change_page"
                :current-page="table_data.page.current_page"
                :page-sizes="table_data.page.sizes"
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
    //编辑
    edit (row: any) {
        this.$emit('edit', row);
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