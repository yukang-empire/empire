<template>
    <div class="set_revise">
        <div class="repeat_div">
            <p>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-bianji"></use>
                </svg>
                <span>修改资料</span>
            </p>
            <div class="business_write">
                <div class="form">
                    <div class="item">
                        <span>员工姓名：</span>
                        <el-input
                            placeholder="请输入员工姓名"
                            v-model="form.name"
                            clearable>
                        </el-input>
                    </div>
                    <div class="item">
                        <span>工号：</span>
                        <span>{{ 20186696699 }}</span>
                    </div>
                    <div class="item">
                        <span>原密码：</span>
                        <el-input
                            placeholder="请输入原密码"
                            v-model="form.js_price"
                            show-password
                            clearable>
                        </el-input>
                    </div>
                    <div class="item">
                        <span>新密码：</span>
                        <el-input
                            placeholder="请输入6-18位由数字与字母组成的新密码"
                            v-model="form.js_price"
                            show-password
                            clearable>
                        </el-input>
                    </div>
                    <div class="item">
                        <span>确认新密码：</span>
                        <el-input
                            placeholder="请再次输入新密码"
                            v-model="form.js_price"
                            show-password
                            clearable>
                        </el-input>
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
    name: 'set_revise',
    components: {
        VueCropper
    },
    data () {
        return {
            previews: {},
            form: {
                name: '',
                phone: '',
                password: '',
                re_password: '',
                company: '',
                address: '',
                tel: '',
                license: '',
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
                }
            }
        }
    },
    methods: {
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