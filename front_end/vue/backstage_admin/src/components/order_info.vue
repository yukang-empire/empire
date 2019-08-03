<template>
    <div class="order_info">
        <div class="repeat_div">
            <p>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icondashboard"></use>
                </svg>
                <span>订单当前状态</span>
            </p>
            <p class="state">
                <i class="el-icon-warning"></i>订单<span>{{ show_order_data.status }}</span>
            </p>
        </div>

        <div class="repeat_div">
            <p>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icondingdan1"></use>
                </svg>
                <span>订单基本信息</span>
            </p>
            <div class="base">
                <ul v-if="order_data.type =='service'">
                    <li class="flex_between">
                        <p><span>订单编号：</span><span>{{ show_order_data.order_sn }}</span></p>
                        <p><span>订单状态：</span><span>{{ show_order_data.status }}</span></p>
                        <p><span>支付方式：</span><span>{{ show_order_data.pay_name }}</span></p>
                    </li>
                    <li class="flex_between">
                        <p><span>下单时间：</span><span>{{ show_order_data.add_time }}</span></p>
                        <p><span>付款时间：</span><span>{{ show_order_data.create_time }}</span></p>
                        <p><span>赠送酷点：</span><span>{{ show_order_data.return_points || 0 }}</span></p>
                    </li>
                </ul>
                <ul v-if="order_data.type =='transfer'">
                    <li class="flex_between">
                        <p><span>订单编号：</span><span>{{ show_order_data.order_sn }}</span></p>
                        <p><span>提交时间：</span><span>{{ show_order_data.creat_time }}</span></p>
                        <p><span>审核时间：</span><span>{{ show_order_data.add_time }}</span></p>
                    </li>
                    <li class="flex_between">
                        <p><span>领用时间：</span><span>{{ show_order_data.up_time }}</span></p>
                    </li>
                </ul>
                <ul v-if="order_data.type =='receive'">
                    <li class="flex_between">
                        <p><span>订单编号：</span><span>{{ show_order_data.current_state }}</span></p>
                        <p><span>领用时间：</span><span>{{ show_order_data.current_state }}</span></p>
                        <p><span>支付方式：</span><span>{{ show_order_data.current_state }}</span></p>
                    </li>
                </ul>
            </div>
        </div>

        <div class="repeat_div">
            <p>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#iconjibenxinxi"></use>
                </svg>
                <span>{{ order_data.title01 }}</span>
            </p>
            <div class="base">
                <ul>
                    <li class="flex_between">
                        <p><span>用户昵称：</span><span>{{ show_order_data.nickname }}</span></p>
                        <p><span>用户手机：</span><span>{{ show_order_data.mobile }}</span></p>
                        <p><span>用户地区：</span><span>{{ show_order_data.province + show_order_data.city + show_order_data.district || show_order_data.club_area }}</span></p>
                    </li>
                </ul>
            </div>
        </div>

        <div class="repeat_div" v-if="order_data.type =='transfer' || order_data.type =='receive'">
            <p>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#iconqia"></use>
                </svg>
                <span>健身卡信息</span>
            </p>
            <div class="base card">
                <ul>
                    <li class="flex_between">
                        <p><span>健身房名称：</span><span>{{ show_order_data.club_name }}</span></p>
                        <p><span>健身房地址：</span><span>{{ show_order_data.club_area }}</span></p>
                        <p><span>健身房电话：</span><span>{{ show_order_data.tel }}</span></p>
                    </li>
                    <li class="flex_between">
                        <p><span>健身卡类别：</span><span>{{ show_order_data.card_type }}</span></p>
                        <p><span>办卡费用：</span><span>{{ show_order_data.card_price }}</span></p>
                        <p><span>办卡时间：</span><span>{{ show_order_data.creat_time }}</span></p>
                    </li>
                    <li class="flex_between">
                        <p><span>持卡人姓名：</span><span>{{ show_order_data.nickname }}</span></p>
                        <p><span>持卡人手机：</span><span>{{ show_order_data.mobile }}</span></p>
                        <p><span>剩余可用：</span><span>{{ show_order_data.ex_day }}</span></p>
                    </li>
                    <li class="flex_between">
                        <p><span>到期时间：</span><span>{{ show_order_data.end_time }}</span></p>
                    </li>
                    <li class="imgs flex_between">
                        <p>
                            <span>健身房照片：</span>
                            <ul>
                                <li v-for='(item, index) in show_order_data.club_image' @click='enlarge_img(index, item, "健身房照片")' title='点击可放大'>
                                    <img :src="$store.state.order.domain02 + item" alt="logo">
                                </li>
                            </ul>
                        </p>
                    </li>
                    <li class="imgs flex_between">
                        <p>
                            <span>办卡合同：</span>
                            <ul>
                                <li v-for='(item, index) in show_order_data.contract_image' @click='enlarge_img(index, item, "合同照片")' title='点击可放大'>
                                    <img :src="$store.state.order.domain02 + item" alt="logo">
                                </li>
                            </ul>
                        </p>
                    </li>
                </ul>
            </div>
        </div>

        <!-- 图片放大 -->
        <el-dialog class="enlarge_img" :title="dialog_img.img_name" :visible.sync="dialog_img.is_enlarge" width="900px" center>
            <img :src="dialog_img.src" alt="logo">
        </el-dialog>

        <div class="repeat_div" v-if="order_data.type =='transfer' && show_order_data.status == '审核中'">
            <p>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#iconshenhe1"></use>
                </svg>
                <span>平台审核</span>
            </p>
            <div class="add check">
                <el-form :model="check_form_data" :rules="check_rules" ref="check_ref">
                    <el-form-item label="审核:" prop="status">
                        <el-radio v-model="check_form_data.status" label="1" border @change='check_order'>通过</el-radio>
                        <el-radio v-model="check_form_data.status" label="2" border @change='check_order'>不通过</el-radio>
                    </el-form-item>
                    <el-form-item label="酷币价值:" prop="price">
                        <el-input type='number' v-model="check_form_data.price" placeholder="请输入酷币价值"></el-input>
                    </el-form-item>
                    <el-form-item class="btn">
                        <el-button type="primary" @click="check_transfer_order" :loading="is_loading01">提交审核</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>

        <div class="repeat_div" v-if="order_data.type =='transfer' && (show_order_data.status == '已确认' || show_order_data.status == '已上架' )">
            <p>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#iconshangjia1"></use>
                </svg>
                <span>上架市场</span>
            </p>
            <div class="add upper">
                <el-form :model="check_form_data" :rules="check_rules" ref="upper_ref">
                    <el-form-item label="选择健身房：" prop="select">
                        <el-select v-model="check_form_data.select" filterable placeholder="请选择(可搜索)" @change='select_jsf'>
                            <el-option
                                v-for="item in all_jsf"
                                :key="item.club_id"
                                :label="item.club_name"
                                :value="item.club_id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="私教课：" prop="course" class="course">
                        <span class="bottom_tip plus" @click='add_course'><i class="el-icon-circle-plus"></i></span>
                        <table_page :table_data='course_data' @edit='edit_course' />
                    </el-form-item>
                    <!-- <el-form-item class="btn">
                        <el-button type="primary" @click="upper" :loading="is_loading02">确定上架</el-button>
                    </el-form-item> -->
                </el-form>
            </div>
        </div>

        <!-- 新增/编辑私教课 -->
        <dialog_form :dialog_data='dialog_course' @sure='add_edit' />

        <div class="repeat_div" v-if="order_data.type == 'service' || order_data.type == 'receive'">
            <p>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#iconshangpin"></use>
                </svg>
                <span>{{ order_data.title02 }}</span>
            </p>
            <div class="goods">
                <ul class="copy_table">
                    <li class="flex_between">
                        <span v-if="order_data.type == 'service'">商品编号</span>
                        <span>商品名称</span>
                        <span v-if="order_data.type == 'service'">所属商家</span>
                        <span v-if="order_data.type == 'receive'">所属健身房</span>
                        <span>商品金额(元)</span>
                        <span v-if="order_data.type == 'receive'">结算金额(元)</span>
                    </li>
                    <li class="flex_between">
                        <span v-if="order_data.type == 'service'">{{ show_order_data.order_sn }}</span>
                        <span>{{ show_order_data.goods_name }}</span>
                        <span v-if="order_data.type == 'service'">{{ show_order_data.club_name }}</span>
                        <span v-if="order_data.type == 'receive'">{{ show_order_data.current_state }}</span>
                        <span>{{ show_order_data.goods_price }}</span>
                        <span v-if="order_data.type == 'receive'">{{ show_order_data.current_state }}</span>
                    </li>
                </ul>
                <p><span>订单金额：</span><span>¥{{ show_order_data.total_amount }}</span></p>
                <p v-if="order_data.type == 'service'"><span>优惠券：</span><span>¥{{ show_order_data.current_state || 0 }}</span></p>
                <h3><span>实付金额：</span><span>¥{{ show_order_data.order_amount }}</span></h3>
            </div>
        </div>

        <div class="repeat_div" v-if="order_data.type =='transfer' || order_data.type =='service'">
            <p>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#iconcaozuo"></use>
                </svg>
                <span>操作记录</span>
            </p>
            <div class="operation">
                <table_page :table_data='table_data_operation' @change_page="change_page_operation" @change_page_size="change_size_operation" />
            </div>
        </div>

    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import table_page from "@/components/table_page.vue";
import dialog_form from "@/components/dialog_form.vue";

@Component({
    components: {
        table_page,
        dialog_form
    }
})

export default class order_info extends Vue{
    @Prop() private order_data !: any;

    private show_order_data: any = {};



    //新增/编辑私教课
    private dialog_course: any = {
        type: 'course',
        is_dialog: false,
        title: '',
        sure_name: '',
        //表单数据
        form_data: {
            tax_num: '',
            price: '',
            cost_price: ''
        },
        //表单规则
        form_rules: {
            tax_num: [
                { required: true, message: '请输入课程节数', trigger: 'blur' },
            ],
            price: [
                { required: true, message: '请输入私教费用', trigger: 'blur' },
            ],
            cost_price: [
                { required: true, message: '请输入结算费用', trigger: 'blur' },
            ]
        }
    };
    //放大图片
    private dialog_img: any = {
        is_enlarge: false,
        img_name: '',
        src: ''
    };

    //图片放大
    enlarge_img (index, src, title) {
        this.dialog_img.is_enlarge = true;
        this.dialog_img.img_name = title + (index + 1);
        this.dialog_img.src = this.$store.state.order.domain02 + src;
    };


    private is_loading01: boolean = false;
    private is_loading02: boolean = false;
    private all_jsf: any = [];
    //审核
    private check_form_data: any = {
        status: null,
        price: '',
        select: '',
    };
    //验证审核表单规则
    private check_rules: object = {
        status: [
            { required: true, message: '请审核', trigger: 'change' },
        ],
        select: [
            { required: true, message: '请选择健身房', trigger: 'change' },
        ],
    };
    //私家课列表
    private course_data: any = {
        //表格
        table: {
            //属于哪个表格
            which: 'upper_course',
            //是否多选
            checkbox: false,
            //是否固定表头
            is_height: "auto",
            //表格数据
            lists: [],
        },
        //页码
        page: {
            //是否显示页码
            is_page: false,
        }
    };
    //操作记录
    private table_data_operation: any = {
        //表格
        table: {
            //属于哪个表格
            which: 'operation_log',
            //是否多选
            checkbox: true,
            //是否固定表头
            is_height: "auto",
            //表格数据
            lists: [ {name: '康大大'} ],
        },
        //页码
        page: {
            //是否显示页码
            is_page: true,
            //当前页码
            current_page: sessionStorage.getItem("operation_log_page") ? parseInt(sessionStorage.getItem("operation_log_page")) : 1,
            //每页显示的数量
            size: sessionStorage.getItem("operation_log_size") ? parseInt(sessionStorage.getItem("operation_log_size")) : 5,
            sizes: [5, 10],
            //总数量
            total: 0,
        }
    };

    //请求操作记录的参数
    private operation_log_data: any = {
        page: sessionStorage.getItem("operation_log_page") ? sessionStorage.getItem("operation_log_page") : 1,
        size: sessionStorage.getItem("operation_log_size") ? sessionStorage.getItem("operation_log_size") : 5,
        order_id: ''
    };

    
    created () {
        //获取所有的健身房
        this.$store.dispatch("all_jsf").then( (res: any) => {
            console.log("所有健身房", res);
            if (res.code == 0 || res.status == 1) {
                this.all_jsf = res.result;
            }else {
                //失败提示
                this.$message({ message: res.msg, type: "error", duration: 2500 });
            };
        });

        //获取服务订单详情
        if (this.order_data.type == 'service') {
            this.$store.dispatch("service_details", { out_id: this.$route.query.out_id }).then( (res: any) => {
                console.log("服务订单详情", res);
                if (res.code == 0 || res.status == 1) {
                    this.show_order_data = res.result;
                    this.show_order_data.status = this.show_order_data.status == 1 ? '未使用' : '已使用';
                    this.show_order_data.create_time = this.show_order_data.create_time > 0 ? this.$moment(this.show_order_data.create_time * 1000).format('YYYY-MM-DD HH:mm:ss') : "";
                    this.show_order_data.add_time = this.show_order_data.add_time > 0 ? this.$moment(this.show_order_data.add_time * 1000).format('YYYY-MM-DD HH:mm:ss') : "";
                }else {
                    //请求失败提示
                    this.$message({ message: res.msg, type: "error", duration: 2500 });
                };
            });
        };

        //获取转让订单详情
        if (this.order_data.type == 'transfer') {
            this.$store.dispatch("transfer_details", { out_id: this.$route.query.out_id }).then( (res: any) => {
                console.log("转让订单详情", res);
                if (res.code == 0 || res.status == 1) {
                    this.show_order_data = res.result;
                    switch (this.show_order_data.status) {
                        case 0: 
                            this.show_order_data.status = '审核中';
                            break;
                        case 1: 
                            this.show_order_data.status = '通过审核';
                            break;
                        case 2: 
                            this.show_order_data.status = '已确认';
                            break;
                        case 3: 
                            this.show_order_data.status = '已取消';
                            break;
                        case 4: 
                            this.show_order_data.status = '审核未通过';
                            break;
                        case 5: 
                            this.show_order_data.status = '已上架';
                            break;
                        case 6: 
                            this.show_order_data.status = '待核销';
                            break;
                        case 7: 
                            this.show_order_data.status = '已核销';
                            break;
                    };
                    this.show_order_data.creat_time = this.show_order_data.creat_time > 0 ? this.$moment(this.show_order_data.creat_time * 1000).format('YYYY-MM-DD HH:mm:ss') : "";
                    this.show_order_data.end_time = this.show_order_data.end_time > 0 ? this.$moment(this.show_order_data.end_time * 1000).format('YYYY-MM-DD HH:mm:ss') : "";
                    this.show_order_data.add_time = this.show_order_data.add_time > 0 ? this.$moment(this.show_order_data.add_time * 1000).format('YYYY-MM-DD HH:mm:ss') : "";
                    this.show_order_data.up_time = this.show_order_data.up_time > 0 ? this.$moment(this.show_order_data.up_time * 1000).format('YYYY-MM-DD HH:mm:ss') : "";
                    this.course_data.table.lists = this.show_order_data.tax_list;
                }else {
                    //请求失败提示
                    this.$message({ message: res.msg, type: "error", duration: 2500 });
                };
            });
        };
    };


    //获取操作记录
    get_operation_log () {
        var that: any = this;
        this.operation_log_data.order_id = sessionStorage.getItem('order_id');
        this.$store.dispatch("get_operation_log", this.operation_log_data).then( res => {
            console.log("操作记录", res);
            if (res.code == 0 || res.status == 1) {
                this.operation_log_data.table.lists = res.result;
                this.operation_log_data.page.total = parseInt(res.count);
                var lists = this.operation_log_data.table.lists;
                var length = lists.length;
                //转换充值时间格式
                for (var i = 0; i < length; i++) {
                    lists[i].operation_time = lists[i].operation_time ? that.$moment(lists[i].operation_time * 1000).format('YYYY-MM-DD HH:mm:ss') : "";
                };
            }else {
                //获取失败提示
                this.$message({ message: res.msg, type: "error", duration: 2500 });
            };
        });
    };

    //改变操作记录页码
    change_page_operation(val: any) {
        this.table_data_operation.page.current_page = val;
        this.operation_log_data.page = val;
        sessionStorage.setItem("operation_log_page", val);
        this.get_operation_log();
    };

    //改变操作记录每页的条数
    change_size_operation(val: any) {
        this.table_data_operation.page.size = val;
        this.operation_log_data.size = val;
        sessionStorage.setItem("operation_log_size", val);
        this.get_operation_log();
    };

    //选择健身房
    select_jsf (val) {
        this.check_form_data.select = val;
    };

    //是否通过审核
    check_order (val) {
        this.check_form_data.status = val;
    };

    //审核
    check_transfer_order () {
        //不这样定义any类型 typescript解释器就会报错
        let ref: any = this.$refs.check_ref;
        ref.validate((valid: boolean) => {
            if (valid) {
                if (this.check_form_data.status == 1 && !this.check_form_data.price) {
                    this.$message({ message: "选择通过, 则需填写酷币价值！", type: 'info', duration: 4000 });
                    return false;
                }else {
                    this.is_loading01 = true;
                    this.check_form_data.out_id = this.$route.query.out_id;
                    this.$store.dispatch("check_transfer_order", this.check_form_data).then( (res: any) => {
                        console.log("审核转让订单", res);
                        if (res.code == 0 || res.status == 1) {
                            //审核成功提示
                            this.$message({ message: '审核成功！', type: "success", duration: 1500 });
                            this.$router.push({ path: '/order/transfer/list' });
                        }else {
                            //失败提示
                            this.$message({ message: res.msg, type: "error", duration: 2500 });
                        };
                        this.is_loading01 = false;
                    });
                };
            } else {
                this.$message({ message: "请完善带*号的必填信息！", type: 'error', duration: 2500 });
                return false;
            };
        });
    };

    
    //新增私教课
    add_course () {
        //不这样定义any类型 typescript解释器就会报错
        let ref: any = this.$refs.upper_ref;
        ref.validate((valid: boolean) => {
            if (valid) {
                this.dialog_course.is_dialog = true;
                this.dialog_course.title = '新增私教课';
                this.dialog_course.sure_name = '确定新增';
            } else {
                this.$message({ message: "请完善带*号的必填信息！", type: 'error', duration: 2500 });
                return false;
            };
        });
    };
    //编辑私教课
    edit_course (row) {
        console.log(row);
        this.dialog_course.form_data.tax_num = row.tax_num;
        this.dialog_course.form_data.price = row.price;
        this.dialog_course.form_data.cost_price = row.cost_price;
        this.dialog_course.is_dialog = true;
        this.dialog_course.title = '编辑私教课';
        this.dialog_course.sure_name = '确定修改';
    };

    //新增/编辑私教课
    add_edit (type, data) {
        data.club_id = this.check_form_data.select;
        data.out_id = this.$route.query.out_id;
        console.log('新增/编辑私教课', data);
        if (type == '确定新增') {
            data.tax_id = '';
            this.$store.dispatch("add_course", data).then( (res: any) => {
                console.log("新增私家课", res);
                if (res.code == 0 || res.status == 1) {
                    this.dialog_course.is_dialog = false;
                    //新增成功提示
                    this.$message({ message: '新增成功！', type: "success", duration: 1500 });
                    this.$router.go(0);
                }else {
                    //失败提示
                    this.$message({ message: res.msg, type: "error", duration: 2500 });
                };
            });
        }else {
            this.$store.dispatch("edit_course", data).then( (res: any) => {
                console.log("修改私家课", res);
                if (res.code == 0 || res.status == 1) {
                    //修改成功提示
                    this.$message({ message: '修改成功！', type: "success", duration: 1500 });
                }else {
                    //失败提示
                    this.$message({ message: res.msg, type: "error", duration: 2500 });
                };
            });
        };
        
    };

    //上架
    upper () {
        this.is_loading02 = true;
        this.$store.dispatch("upper", this.check_form_data).then( (res: any) => {
            console.log("上架", res);
            if (res.code == 0 || res.status == 1) {
                //上架成功提示
                this.$message({ message: '上架成功！', type: "success", duration: 1500 });
            }else {
                //失败提示
                this.$message({ message: res.msg, type: "error", duration: 2500 });
            };
            this.is_loading02 = false;
        });
    };

}

</script>

<style lang="scss">

    @media screen and (min-width: 769px) {

        .add {

            .el-button {
                width: 130px;
                height: 45px;
                margin-top: 0;
            }

            .btn {
                margin-bottom: 5px;

                .el-form-item__content {
                    justify-content: flex-start;
                    margin-left: 350px;
                }
            }

            .el-select > .el-input {
                width: 215px;
            }

            .el-form-item .bottom_tip.plus {
                left: -58px;
                top: 56%;

                .el-icon-circle-plus {
                    font-size: 1.5rem;
                    color: $succ;
                    cursor: pointer;
                }
            }

            .course {

                .el-form-item__content {
                    width: 600px;

                    .table_page {
                        width: 100%;
                    }
                }
            }
        }
        
    }
</style>