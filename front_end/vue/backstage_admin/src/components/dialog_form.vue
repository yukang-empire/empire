<template>
    <el-dialog class='dialog_form dialog_course' :title="dialog_course.title" :visible.sync="dialog_course.is_dialog" width="700px" center>
        <el-form :model="course_form_data" :rules="course_rules" ref="course_ref">
            <el-form-item label="课程名称:" prop="course_name">
                <el-input v-model="course_form_data.course_name" placeholder="请输入课程名称" clearable maxlength="20" show-word-limit></el-input>
            </el-form-item>
            <el-form-item label="私教费用:" prop="course_sale_price">
                <el-input type='number' v-model="course_form_data.course_sale_price" placeholder="请输入私教费用"></el-input>
            </el-form-item>
            <el-form-item label="结算费用:" prop="course_cost_price">
                <el-input type='number' v-model="course_form_data.course_cost_price" placeholder="请输入结算费用"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialog_course.is_dialog = false">取 消</el-button>
            <el-button type="primary" @click="add_edit(dialog_course.sure)" :loading="is_loading03">{{ dialog_course.sure }}</el-button>
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
    //新增/编辑私教课
    private dialog_course: any = {
        is_dialog: true,
        title: '',
        name: '',
        sale_price: '',
        cost_price: '',
        sure: ''
    };

    //新增私教课
    add_course () {
        this.dialog_course.is_dialog = true;
        this.dialog_course.title = '新增私教课';
        this.dialog_course.sure = '确定新增';
    };

    
    //上架
    private course_form_data: any = {
        course_name: '',
        course_sale_price: '',
        course_cost_price: '',
    };

    //验证私教课表单规则
    private course_rules: object = {
        course_name: [
            { required: true, message: '请输入课程名称', trigger: 'change' },
        ],
        course_sale_price: [
            { required: true, message: '请输入私教费用', trigger: 'change' },
        ],
        course_cost_price: [
            { required: true, message: '请输入结算费用', trigger: 'change' },
        ]
    };
    
}

</script>

<style lang="scss">

    @media screen and (min-width: 769px) {

        .dialog_form {

            .el-dialog--center .el-dialog__body {
                overflow: hidden;
                height: 250px;
                padding-bottom: 0;

                .el-form-item__error {
                    top: 99%;
                    left: 12%;
                }
            }
        }
    }
</style>