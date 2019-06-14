<template>
        <div class="coupon_add">
            <div class="repeat_div">
                <p>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-youhuiquan"></use>
                    </svg>
                    <span>新增优惠券</span>
                </p>
                <div class="business_write">
                    <div class="form">
                        <div class="item">
                            <span>优惠券标题*：</span>
                            <el-input
                                placeholder="请输入优惠券标题, 如：新用户无门槛优惠券"
                                v-model="form.name"
                                clearable>
                            </el-input>
                        </div>
                        <div class="item">
                            <span>优惠券描述：</span>
                            <el-input
                                placeholder="请输入优惠券描述"
                                v-model="form.xs_price"
                                type='number'
                                clearable>
                            </el-input>
                        </div>
                        <div class="item">
                            <span>优惠券是否上架*：</span>
                            <el-switch
                                v-model="form.is_online"
                                active-color="#13ce66"
                                inactive-color="#ff4949">
                            </el-switch>
                        </div>
                        <div class="item">
                            <span>优惠券金额*：</span>
                            <el-input
                                placeholder="请输入优惠券金额"
                                v-model="form.company"
                                clearable>
                            </el-input>
                        </div>
                        <div class="item">
                            <span>截止时间：</span>
                            <el-date-picker
                                v-model="form.deadline"
                                type="datetime"
                                placeholder="选择截止时间">
                            </el-date-picker>
                        </div>
                        <div class="item">
                            <span>使用门槛：</span>
                            <el-input
                                placeholder="满多少金额可用，无门槛请填0"
                                v-model="form.company"
                                clearable>
                            </el-input>
                        </div>
                        <div class="item">
                            <span>使用范围*：</span>
                            <div class="serves">
                                <el-checkbox :indeterminate="form.isIndeterminate" v-model="form.check_all" @change="handleCheckAllChange">全选</el-checkbox>
                                <el-checkbox-group v-model="form.checked" @change="handleCheckedCitiesChange">
                                    <el-checkbox v-for="item in form.all_serves" :label="item" :key="item" border>{{ item }}</el-checkbox>
                                </el-checkbox-group>
                            </div>
                        </div>
                        <div class="item">
                            <span>获得方式*：</span>
                            <div class="serves">
                                <el-dropdown trigger='click' placement='bottom' @command="handleCommand">
                                    <el-button type="primary">
                                        {{ form.default_select }}<i class="el-icon-arrow-down el-icon--right"></i>
                                    </el-button>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item command="注册">注册</el-dropdown-item>
                                        <el-dropdown-item command="邀请">邀请</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </div>
                        </div>
    
                    </div>
    
                    <div class="btn flex_center">
                        <el-button type="primary" @click='to_next'>提交</el-button>
                        <el-button type="info" @click='cancel'>取消</el-button>
                    </div>
                    
                </div>
            </div>
        </div>
    </template>
    
    <script>
    import { VueCropper }  from 'vue-cropper'
    
    export default {
        name: 'coupon_add',
        components: {
            VueCropper
        },
        data () {
            return {
                previews: {},
                form: {
                    is_online: true,
                    deadline: '',
                    name: '',
                    phone: '',
                    password: '',
                    re_password: '',
                    company: '',
                    address: '',
                    tel: '',
                    license: '',
                    //全选
                    all_serves: ['单次健身', '共享卡'],
                    check_all: false,
                    checked: ['单次健身', '共享卡'],
                    isIndeterminate: true,
                    serves: [],
                    cropper: {
                        img: '',
                        size: 1,
                        type: 'jpeg',
                        move: true,
                        box: true,
                        original: true,
                        crop: true,
                        width: '',
                        height: '',
                        fixed: true,
                    },
                    default_select: '注册'
                },
            }
        },
        methods: {
            //下拉选择
            handleCommand(command) {
                this.form.default_select = command;
            },
            //全选相关
            handleCheckAllChange(val) {
                this.form.checked = val ? this.form.all_serves : [];
                this.form.isIndeterminate = false;
            },
            handleCheckedCitiesChange(value) {
                let checkedCount = value.length;
                this.form.check_all = checkedCount === this.form.all_serves.length;
                this.form.isIndeterminate = checkedCount > 0 && checkedCount < this.form.all_serves.length;
            },
            //上传营业执照相关
            handleAvatarSuccess(res, file) {
                this.form.license = URL.createObjectURL(file.raw);
                console.log(this.form.license)
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            to_next () {
                this.$router.push({ path: '/business/xzsj/mdtx' });
            },
            cancel () {
                this.form = {
                    name: '',
                    phone: '',
                    password: '',
                    re_password: '',
                    company: '',
                    address: '',
                    tel: '',
                    license: '',
                }
            }
        },
        mounted () {
            console.log(VueCropper)
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
        .item .serves {
            display: flex;
            align-items: center;

            .el-checkbox.is-bordered {
                margin: 10px;
            }
        }
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
                width: 120px;
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