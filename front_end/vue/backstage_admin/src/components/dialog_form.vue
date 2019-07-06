<template>
    <el-dialog class='dialog_form' :title="dialog_data.title" :visible.sync="dialog_data.is_dialog" width="700px" center>
        <el-form :model="dialog_data.form_data" :rules="dialog_data.form_rules" ref="dialog_ref">
            <div v-if="dialog_data.type == 'course'">
                <el-form-item label="课程名称:" prop="course_name">
                    <el-input v-model="dialog_data.form_data.course_name" placeholder="请输入课程名称" clearable maxlength="20" show-word-limit></el-input>
                </el-form-item>
                <el-form-item label="私教费用:" prop="course_sale_price">
                    <el-input type='number' v-model="dialog_data.form_data.course_sale_price" placeholder="请输入私教费用"></el-input>
                </el-form-item>
                <el-form-item label="结算费用:" prop="course_cost_price">
                    <el-input type='number' v-model="dialog_data.form_data.course_cost_price" placeholder="请输入结算费用"></el-input>
                </el-form-item>
            </div>
            <div v-if="dialog_data.type == 'cash_out'">
                <el-form-item label="最低提现总金额:" prop="min_all_cash">
                    <el-input type="number" v-model="dialog_data.form_data.min_all_cash" placeholder="请输入最低提现总金额" clearable></el-input>
                </el-form-item>
                <el-form-item label="最低提现金额:" prop="min_cash">
                    <el-input type="number" v-model="dialog_data.form_data.min_cash" placeholder="请输入最低提现金额" clearable></el-input>
                </el-form-item>
            </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialog_data.is_dialog = false">取 消</el-button>
            <el-button type="primary" @click="sure(dialog_data.sure_name)" :loading="is_loading">{{ dialog_data.sure_name }}</el-button>
        </div>
    </el-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
    components: {
        
    }
})

export default class dialog_form extends Vue{
    @Prop() private dialog_data !: any;
    private is_loading: boolean = false;

    //验证表单
    sure (type) {
        let ref: any = this.$refs.dialog_ref;
        ref.validate((valid: boolean) => {
            if (valid) {
                this.is_loading = true;
                this.$emit("sure", type, this.dialog_data.form_data);
                setTimeout(() => {
                    this.is_loading = false;
                }, 3000);
            } else {
                this.$message({ message: "请完善带*号的必填信息！", type: 'error', duration: 2500 });
                return false;
            };
        });
    }
    
}

</script>

<style lang="scss">

    @media screen and (min-width: 769px) {

        .dialog_form {
            right: 75px;

            .el-dialog--center {

                .el-dialog__body {
                    overflow: hidden;
                    padding: 30px 0 0 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    .el-form-item__error {
                        width: 100%;
                        top: 99%;
                    }
                    
                    .el-form {
                        width: 75%;
                    }
                }
            }

            .el-form-item__label {
                min-width: 130px;
            }

            .el-dialog__footer {
                padding-bottom: 35px;

                .el-button {
                    margin: 0 15px;
                }
            
            }
            .el-form-item {
                margin-bottom: 26px;
            }
            
        }

    }
</style>