<template>
    <div class="service_details">
        <div class="repeat_div">
            <p>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-zhuceyaoqing"></use>
                </svg>
                <span>订单详情</span>
            </p>
            <div class="business_write">
                <div class="top_nav">
                    <div class="flat">
                        <span>已提交</span>
                        <!-- 箭头 -->
                        <div class="right"></div>
                    </div>
                    <div class="flat tip">
                        <span>待使用</span>
                        <!-- 箭头 -->
                        <div class="right"></div>
                        <div class="left"></div>
                    </div>
                    <div class="flat tip">
                        <span>已完成</span>
                        <!-- 箭头 -->
                        <div class="right"></div>
                        <div class="left"></div>
                    </div>
                </div>

                <div>
                    <p class="one">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-gantanhao-copy-copy"></use>
                        </svg>
                        <span>订单状态：等待用户使用</span>
                    </p>

                    <p class="copy_title">订单信息：</p>
                    <ul class="two">
                        <li>
                            <span>
                                订单编号：2019030102369669
                            </span>
                            <span>
                                订单状态：未支付
                            </span>
                        </li>
                        <li>
                            <span>
                                下单时间：2019-03-01 02：36
                            </span>
                            <span>
                                付款时间：2019-04-14 15：00
                            </span>
                        </li>
                        <li>
                            <span>
                                支付方式：微信支付
                            </span>
                        </li>
                    </ul>
                    <p class="copy_title">买家信息：</p>
                    <p class="three">
                        <span>
                            用户昵称：文一
                        </span>
                        <span>
                            用户手机：18312001212
                        </span>
                        <span>
                            用户地区：广东深圳
                        </span>
                    </p>
                    <p class="copy_title">商品信息：</p>
                    <el-table
                        :data="tableData"
                        style="width: 100%">
                        <el-table-column
                            prop="num"
                            label="商品编号">
                        </el-table-column>
                        <el-table-column
                            prop="sj"
                            label="所属商家">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="商品名称">
                        </el-table-column>
                        <el-table-column
                            prop="price"
                            label="商品金额(元)">
                        </el-table-column>
                    </el-table>
                    <div class="four">
                        <div>
                            <span>订单金额：</span>
                            <span>¥60.00</span>
                        </div>
                        <div>
                            <span>优惠券：</span>
                            <span>¥10</span>
                        </div>
                        <div>
                            <span>实付金额：</span>
                            <span>¥50.00</span>
                        </div>
                    </div>

                    <p class="copy_title">操作记录：</p>
                    <el-table
                        :data="tableData02"
                        style="width: 100%">
                        <el-table-column
                            prop="people"
                            label="操作人">
                        </el-table-column>
                        <el-table-column
                            prop="state"
                            label="订单状态">
                        </el-table-column>
                        <el-table-column
                            prop="fkzt"
                            label="支付状态">
                        </el-table-column>
                        <el-table-column
                            prop="czsj"
                            label="操作时间">
                        </el-table-column>
                        <el-table-column
                            prop="bz"
                            label="备注">
                        </el-table-column>
                    </el-table>
                </div>

                <!-- <div class="btn flex_center">
                    <el-button type="primary" @click='to_next'>下一步</el-button>
                    <el-button type="info" @click='cancel'>取消</el-button>
                </div> -->


            </div>
        </div>

        <!-- <transition name='fade'>
            <dialog_component :dialog='dialog' @off_dialog='off_dialog' />
        </transition> -->
    </div>
</template>

<script>
import dialog_component from '@/common/components/dialog.vue';
import table_page from '@/common/components/table_page.vue';

export default {
    name: 'service_details',
    components: {
        dialog_component
    },
    data () {
        return {
            //弹框相关
            dialog: {
                is_open: false,
                msg: null,
                type: 0
            },
            tableData: [
                {num: 123445345, name: '单次健身', price: '60.00', sj: 'XX健身房'}
            ],
            tableData02: [
                // {people: 123445345, state: '单次健身', fkzt: '60.00', czsj: 'XX健身房', bz: '暂无'}
            ]
        }
    },
    methods: {
        
        to_next () {
            var name = this.form.name;
            var account = this.form.account;
            var password = this.form.password;
            var re_password = this.form.re_password;
            //验证input值是否有空值
            var is_empty = !account || !password || !re_password || !name;
            //都不为空值的情况下 继续验证input值是否都符合正则
            var is_RE = is_empty || this.verify_warn.account.is_open || this.verify_warn.password.is_open || this.verify_warn.re_password.is_open || this.verify_warn.name.is_open;
            if (!is_RE) {

                this.$router.push({ path: '/business/xzsj/mdtx' });
            }else {
                this.is_dialog("请完善必填信息！");
            }
        },
        cancel () {
            this.form = {
                name: '',
                account: '',
                password: '',
                re_password: '',
                company: '',
                address: '',
                tel: '',
                license: '',
            }
        },

    },
    mounted () {
        
    }
}
</script>

<style lang="scss">
    .item .el-input__inner,.el-input {
        width: 450px;
        font-size: 0.95rem;
    }
    .item .el-input__inner {
        height: 45px;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 100%;
        display: block;
    }
    .el-upload-dragger {
        width: 250px;
        height: 200px;
    }

    .cut {
        height: 100%;
        color: #fff;
        text-align: center;
        flex-direction: column;
        background-color: rgba(0, 0, 0, 0.7);

        h2 {
            font-size: 2rem;
            letter-spacing: 3px;
            margin: 50px 0 50px 0;
        }

        .main {
            height: 55%;
            display: flex;
            justify-content: center;

            .right {
                margin-left: 10%;
                flex-direction: column;
            }

            .square {
                margin-bottom: 20px;
            }

            .circle {
                width: 250px;
                height: 250px;
                border-radius: 50%;
            }
        }
        
        .func_btn {
            margin: 40px 0;

            .el-button {
                margin-right: 10px;
            }
        }

        .final {
            margin-top: 70px;

            button {
                margin-right: 20px;
            }
        }

    }

</style>

<style lang='scss' scoped>
    .copy_title{
        border-left: 2px solid $main;
        height: 17px;
        padding: 0 0 0 10px;
        font-weight: 900;
        font-size: 1.1rem;
        display: flex;
        align-items: center;
        color: #333;
        margin: 35px 0 15px 0 !important;
    }
    .one {
        margin: 15px 0 0 0;
        display: flex;
        align-items: center;

        .icon {
            width: 25px;
            height: 25px;
        }
    }
    .two {

        li {
            margin-bottom: 10px;

            span {
                margin-right: 100px;
            }
        }
    }
    .three {
        span {
            margin-right: 100px;
        }
    }
    .four {
        margin: 30px 0 0 0;
        &>div {
            display: flex;
            text-align: right;
            justify-content: flex-end;

            &>span:nth-of-type(1) {
                font-weight: 900;
            }

            &>span:nth-of-type(2) {
                display: inline-block;
                min-width: 60px;
                text-align: left;
                margin-left: 5px;
            }
        }

        &>div:last-of-type {
            color: red;
            margin: 10px 0 0 0;
        }
    }
    .vue-cropper {
        width: 50%;
        height: 100%;
    }
    .verify_warn {
        margin: -5px 0 -5px 100px;
    }
    .btn {
        margin-top: 20px;
    }
    .btn .el-button--primary {
        margin-right: 50px;
    }
    .btn .el-button--info {
        margin-left: 50px;
    }
    .form {
        padding: 40px 15px 20px 80px;
        color: #333;
    }
    .item {
        display: flex;
        align-items: center;
        margin: 20px 0;

        span {
            white-space: nowrap;
            margin-right: 8px;
            width: 90px;
            text-align: right;
        }
    }
    .service_details {
        padding: 0 20px;
    }
    .top_nav {
        display: flex;
        align-items: center;

        &>div {
            width: 120px;
            height: 42px;
            color: #fff;
            margin-right: 35px;
            text-align: center;
            line-height: 42px;
            background-color: $succ;
        }

        .flat {
            position: relative;

            .right {
                position: absolute;
                right: -42px;
                top: 0;
                border-width: 21px;
                border-style: solid;
                border-color: transparent transparent transparent #67c23a;
            }
        }

        .tip {
            position: relative;
            background-color: #bbb;

            .right {
                border-color: transparent transparent transparent #bbb;
            }

            .left {
                position: absolute;
                left: 0;
                top: 0;
                border-width: 21px;
                border-style: solid;
                border-color: transparent transparent transparent #fff;
            }

            span {
                margin-left: 10px;
            }
            
        }
    }
    
    @media screen and (min-width: 769px) {
        
    }
</style>