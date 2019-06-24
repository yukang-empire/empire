<template>
    <div class="goods_add">
        <div class="repeat_div">
            <p>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-shangpin"></use>
                </svg>
                <span>新增商品</span>
            </p>
            <div class="business_write">
                <div class="form">
                    <div class="item">
                        <span>商品名称*：</span>
                        <el-input
                            placeholder="请输入商品名称"
                            v-model="form.goods_name"
                            clearable>
                        </el-input>
                    </div>
                    <div class="item">
                        <span>销售价格*：</span>
                        <el-input
                            placeholder="请输入销售价格"
                            v-model="form.shop_price"
                            type='number'
                            clearable>
                        </el-input>
                    </div>
                    <div class="item">
                        <span>结算价格*：</span>
                        <el-input
                            placeholder="请输入结算价格"
                            v-model="form.cost_price"
                            type='number'
                            clearable>
                        </el-input>
                    </div>
                    <!-- <div class="item">
                        <span>选择商家：</span>
                        <el-input
                            placeholder="请输入企业名称"
                            v-model="form.company"
                            clearable>
                        </el-input>
                    </div> -->
                    <div class="item">
                        <span>选择卡类型*：</span>
                        <el-dropdown trigger='click' placement='bottom' @command="handleCommand02">
                            <el-button type="primary">
                                {{ default_select02 }}<i class="el-icon-arrow-down el-icon--right"></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item v-for='(item, index) in all_select02' :command="item">{{ item }}</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                    <div class="item">
                        <span>选择门店*：</span>
                        <el-dropdown trigger='click' placement='bottom' @command="handleCommand">
                            <el-button type="primary">
                                {{ default_select }}<i class="el-icon-arrow-down el-icon--right"></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item v-for='(item, index) in all_select' :command="item.club_name">{{ item.club_name }}</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                    <div class="item">
                        <span>购买须知：</span>
                        <el-input
                            type="textarea"
                            :rows="4"
                            maxlength="300"
                            show-word-limit
                            placeholder="请输入购买要注意的事项"
                            v-model="form.card_info">
                        </el-input>
                    </div>

                </div>

                <div class="btn flex_center">
                    <el-button type="primary" @click='to_next'>提交</el-button>
                    <el-button type="info" @click='cancel'>取消</el-button>
                </div>
                
            </div>

            <transition name='fade'>
                <dialog_component :dialog='dialog' @off_dialog='off_dialog' />
            </transition>
        </div>
    </div>
</template>

<script>
import dialog_component from '@/common/components/dialog.vue';

export default {
    name: 'goods_add',
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
            form: {
                shop_price: '',
                cost_price: '',
                goods_name: '',
                card_info: '',
                store_id: '',
                card_type: ''
            },
            all_select: [],
            all_select02: ["次卡", "月卡", "季卡", "半年卡", "年卡",],
            default_select: '',
            default_select02: ''
        }
    },
    methods: {
        //接收子组件事件 关闭dialog弹框
        off_dialog () {
            this.dialog.is_open = false;
            this.$router.push({ path: '/business/splb/lbxq' });
        },
        //打开dialog弹框
        is_dialog (info) {
            //打开遮罩
            this.dialog.is_open = true;
            this.dialog.msg = info;
        },
        //下拉选择
        handleCommand(command) {
            this.default_select = command;
            var length = this.all_select.length;
            for (var i = 0; i < length; i++) {
                if (this.all_select[i].club_name == command) {
                    this.form.store_id = this.all_select[i].store_id;
                };
            };
        },
        handleCommand02(command) {
            this.default_select02 = command;
            var length = this.all_select.length;
            switch (command) {
                case '次卡':
                    this.form.card_type = 1;
                    break;
                case '月卡':
                    this.form.card_type = 3;
                    break;
                case '季卡':
                    this.form.card_type = 4;
                    break;
                case '半年卡':
                    this.form.card_type = 5;
                    break;
                case '年卡':
                    this.form.card_type = 6;
                    break;
            };
        },
        to_next () {
            if (!this.form.shop_price || !this.form.cost_price || !this.form.goods_name) {
                this.$message('请输入必要的信息哦！');
            }else {
                if (!this.form.store_id) {
                    this.form.store_id = this.all_select[0].store_id;
                };
                if (!this.form.card_type) {
                    this.form.card_type = 1;
                };
                var params = new FormData();
                params.append("shop_price", this.form.shop_price);
                params.append("cost_price", this.form.cost_price);
                params.append("goods_name", this.form.goods_name);
                params.append("card_info", this.form.card_info);
                params.append("store_id", this.form.store_id);
                params.append("card_type", this.form.card_type);
                params.append("token", sessionStorage.getItem('token'));
                this.$axios.post("/index.php?m=Api&c=Club&a=add_club_goods", params).then( response => {
                    console.log("新增商品", response);
                    this.is_dialog(response.data.msg);
                });
            }
        },
        cancel () {
            this.form = {
                shop_price: '',
                cost_price: '',
                goods_name: '',
                card_info: '',
                store_id: '',
                card_type: ''
            }
        }
    },
    mounted () {
        var params = new FormData();
        params.append("token", sessionStorage.getItem('token'));
        this.$axios.post("/index.php?m=Api&c=Club&a=club_select", params).then( response => {
            console.log("门店类型", response.data.result);
            this.all_select = response.data.result;
            this.default_select = response.data.result[0].club_name;
            this.default_select02 = this.all_select02[0];
        })
    }
}
</script>

<style>
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
        width: 178px;
        height: 178px;
        display: block;
    }
</style>

<style lang='scss' scoped>
    .el-textarea {
        width: 450px;
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
        padding: 0px 15px 20px 80px;
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
    .business_info {
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