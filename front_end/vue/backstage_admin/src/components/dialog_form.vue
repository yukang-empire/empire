<template>
    <el-dialog class='dialog_form' :title="dialog_data.title" :visible.sync="dialog_data.is_dialog" width="700px" center>
        <el-form :model="dialog_data.form_data" :rules="dialog_data.form_rules" ref="dialog_ref">
			<!-- 编辑虚拟人数 -->
			<div v-if="dialog_data.type == 'invent_person'">
				<el-form-item label="输入虚拟人数:" prop="person_num">
					<el-input v-model="dialog_data.form_data.person_num" placeholder="请输入虚拟人数" @input='limit_input_person_num'></el-input>
				</el-form-item>
			</div>
            <!-- 修改密码 -->
            <div v-if="dialog_data.type == 'password'">
                <el-form-item label="原密码:" prop="password">
                    <el-input type='password' v-model="dialog_data.form_data.password" placeholder="请输入原密码" @change='password_data'></el-input>
                </el-form-item>
                <el-form-item label="新密码:" prop="newPwd">
                    <el-input type='password' v-model="dialog_data.form_data.newPwd" placeholder="请输入新密码" @change='password_data'></el-input>
                </el-form-item>
                <el-form-item label="再次输入新密码:" prop="re_newPwd">
                    <el-input type='password' v-model="dialog_data.form_data.re_newPwd" placeholder="请再次输入新密码" @change='password_data'></el-input>
                </el-form-item>
            </div>
            <div v-if="dialog_data.type == 'course'">
                <el-form-item label="课程节数:" prop="tax_num">
                    <el-input v-model="dialog_data.form_data.tax_num" placeholder="请输入课程节数" clearable maxlength="20" show-word-limit @input='limit_input_tax_num'></el-input>
                </el-form-item>
                <el-form-item label="私教费用:" prop="price">
                    <el-input type='number' v-model="dialog_data.form_data.price" placeholder="请输入私教总费用"></el-input>
                </el-form-item>
                <el-form-item label="结算费用:" prop="cost_price">
                    <el-input type='number' v-model="dialog_data.form_data.cost_price" placeholder="请输入结算总费用"></el-input>
                </el-form-item>
            </div>
            <div v-if="dialog_data.type == 'cash_out'">
                <el-form-item label="最低提现总金额:" prop="min_all_cash">
                    <el-input type="number" v-model="dialog_data.form_data.min_all_cash" placeholder="请输入最低提现总金额" clearable></el-input>
                </el-form-item>
                <el-form-item label="最低提现金额:" prop="min_cash">
                    <el-input type="number" v-model="dialog_data.form_data.min_cash" placeholder="请输入最低提现金额" clearable></el-input>
                </el-form-item>
                <el-form-item label="每日提现次数上限:" prop="max_order">
                    <el-input type="number" v-model="dialog_data.form_data.max_order" placeholder="请输入每日提现次数上限" clearable></el-input>
                </el-form-item>
            </div>
            <div v-if="dialog_data.type == 'card'" id="card">
                <el-form-item label="健身房名称:" prop="club_name">
                    <el-input v-model="dialog_data.form_data.club_name" placeholder="请输入健身房名称" clearable></el-input>
                </el-form-item>
                <el-form-item label="健身房名称:" prop="club_area">
                    <el-input v-model="dialog_data.form_data.club_area" placeholder="请输入健身房地址" clearable></el-input>
                </el-form-item>
                <el-form-item label="健身房名称:" prop="tel">
                    <el-input v-model="dialog_data.form_data.tel" placeholder="请输入健身房电话" clearable></el-input>
                </el-form-item>
                <el-form-item label="请选择健身卡类型:" prop="card_type" class="card_type">
                    <el-select v-model="dialog_data.form_data.card_type" filterable placeholder="请选择类型" clearable @change='type_change' class="filter_select">
                        <el-option
                            v-for="item in dialog_data.all_type"
                            :key="item.type"
                            :label="item.name"
                            :value="item.type">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="办卡费用:" prop="card_price">
                    <el-input v-model="dialog_data.form_data.card_price" placeholder="请输入办卡费用" clearable></el-input>
                </el-form-item>
                <el-form-item label="办卡时间:" prop="creat_time">
                    <el-date-picker
                        v-model="dialog_data.form_data.creat_time"
                        type="datetime"
                        @change='card_creat_time'
                        placeholder="请选择办卡时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="持卡人姓名:" prop="name">
                    <el-input v-model="dialog_data.form_data.name" placeholder="请输入持卡人姓名" clearable></el-input>
                </el-form-item>
                <el-form-item label="持卡人手机号:" prop="mobile">
                    <el-input v-model="dialog_data.form_data.mobile" placeholder="请输入持卡人手机号" clearable></el-input>
                </el-form-item>
                <el-form-item label="到期时间:" prop="end_time">
                    <el-date-picker
                        v-model="dialog_data.form_data.end_time"
                        type="datetime"
                        @change='card_end_time'
                        placeholder="请选择到期时间">
                    </el-date-picker>
                </el-form-item>
			</div>
			<!-- 本期分红 -->
			<div v-if="dialog_data.type == 'share_profit'">
				<el-form-item label="分红期数:" prop="phase">
					<el-input type="text" v-model="dialog_data.form_data.phase" disabled></el-input>
				</el-form-item>
				<el-form-item label="分红人数:" prop="bonus_num">
					<el-input type="text" v-model="dialog_data.form_data.bonus_num" disabled></el-input>
				</el-form-item>
				<el-form-item label="分红总酷点:" prop="total_points">
					<el-input type="text" v-model="dialog_data.form_data.total_points" disabled></el-input>
				</el-form-item>
				<el-form-item label="分红时间:" prop="up_time">
					<el-input type="text" v-model="dialog_data.form_data.up_time" disabled></el-input>
				</el-form-item>
				<el-form-item label="分红总金额:" prop="total_money">
					<el-input type="text" v-model="dialog_data.form_data.total_money" placeholder="请输入分红总金额" clearable :disabled="dialog_data.form_data.status == '已分'"></el-input>
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
	};
	
	mounted () {
		console.log(this.dialog_data);
	};

    //改变健身卡的类型
    type_change (val) {
        console.log(val);
        this.dialog_data.form_data.card_type = val;
    };
    //改变健身卡的时间
    card_creat_time (val) {
        // this.dialog_data.form_data.creat_time = val.getTime() / 1000;
        this.dialog_data.form_data.creat_time = val;
    };
    card_end_time (val) {
        // this.dialog_data.form_data.end_time = val.getTime() / 1000;
        this.dialog_data.form_data.end_time = val;
    };

    //不允许输入中文
    limit_input_tax_num () {
        this.dialog_data.form_data.tax_num = this.dialog_data.form_data.tax_num.replace(/[^\d]/g, '');
	};
	limit_input_person_num () {
        this.dialog_data.form_data.person_num = this.dialog_data.form_data.person_num.replace(/[^\d]/g, '');
    };
    
    //实时记录密码
    password_data () {
        sessionStorage.setItem('newPwd', JSON.stringify(this.dialog_data.form_data.newPwd));
    };
    
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
                min-width: 140px;
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

        #card {
            height: 500px;
            overflow-y: scroll;
            padding-right: 30px;
            margin-left: 19px;
            width: 93%;
        }

        .el-form-item__content {
            justify-content: unset;
        }

        .card_type .el-select {
            width: 100%;
        }
        .el-date-editor.el-input {
            width: 100%;
        }
    }
</style>