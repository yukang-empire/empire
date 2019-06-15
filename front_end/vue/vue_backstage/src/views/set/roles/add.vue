<template>
    <div class="roles_add">
        <div class="repeat_div">
            <p>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-jibenxinxi"></use>
                </svg>
                <span>角色信息</span>
            </p>
            <div class="business_write">
                <div class="form">
                    <div class="item">
                        <span>角色名称：</span>
                        <el-input
                            placeholder="请输入角色名称"
                            v-model="form.name"
                            clearable>
                        </el-input>
                    </div>
                    <div class="item">
                        <span>描述：</span>
                        <el-input
                            type="textarea"
                            :rows="4"
                            maxlength="300"
                            show-word-limit
                            placeholder="请输入描述"
                            v-model="form.textarea">
                        </el-input>
                    </div>
                </div>
            </div>
        </div>

        <div class="repeat_div">
            <p>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-qita"></use>
                </svg>
                <span>权限信息</span>
            </p>
            <div class="business_write">
                <div class="serves">
                    <el-checkbox :indeterminate="form.isIndeterminate_boss" v-model="form.check_all_boss" @change="handleCheckAllChange_boss"><h3>所有权限</h3></el-checkbox>
                    
                    <h4>
                        <el-checkbox :indeterminate="form.isIndeterminate01" v-model="form.check_all01" @change="handleCheckAllChange01"><h3>首页</h3></el-checkbox>
                    </h4>
                    <el-checkbox-group v-model="form.checked01" @change="handleCheckedCitiesChange01">
                        <el-checkbox v-for="item in form.all_serves01" :label="item" :key="item" border>{{ item }}</el-checkbox>
                    </el-checkbox-group>
                    <h4>
                        <el-checkbox :indeterminate="form.isIndeterminate02" v-model="form.check_all02" @change="handleCheckAllChange02"><h3>文章管理</h3></el-checkbox>
                    </h4>
                    <el-checkbox-group v-model="form.checked02" @change="handleCheckedCitiesChange02">
                        <el-checkbox v-for="item in form.all_serves02" :label="item" :key="item" border>{{ item }}</el-checkbox>
                    </el-checkbox-group>
                    <h4>
                        <el-checkbox :indeterminate="form.isIndeterminate03" v-model="form.check_all03" @change="handleCheckAllChange03"><h3>用户管理</h3></el-checkbox>
                    </h4>
                    <el-checkbox-group v-model="form.checked03" @change="handleCheckedCitiesChange03">
                        <el-checkbox v-for="item in form.all_serves03" :label="item" :key="item" border>{{ item }}</el-checkbox>
                    </el-checkbox-group>
                    <h4>
                        <el-checkbox :indeterminate="form.isIndeterminate04" v-model="form.check_all04" @change="handleCheckAllChange04"><h3>财务管理</h3></el-checkbox>
                    </h4>
                    <el-checkbox-group v-model="form.checked04" @change="handleCheckedCitiesChange04">
                        <el-checkbox v-for="item in form.all_serves04" :label="item" :key="item" border>{{ item }}</el-checkbox>
                    </el-checkbox-group>
                </div>
            </div>
        </div>
        
        <div class="btn flex_center">
            <el-button type="primary" @click='to_next'>提交</el-button>
            <el-button type="info" @click='cancel'>取消</el-button>
        </div>

        
    </div>
</template>

<script>
import { VueCropper }  from 'vue-cropper'

export default {
    name: 'roles_add',
    components: {
        VueCropper
    },
    data () {
        return {
            form: {
                name: '',
                phone: '',
                password: '',
                re_password: '',
                company: '',
                address: '',
                tel: '',
                license: '',
                state: true,
                default_select: '管理员',
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
                //健身会所提供的服务
                all_serves01: ['经营概况', '待办事项', '收入趋势'],
                all_serves02: ['查看', '新增', '编辑', '批量删除', '导出', '搜索' ],
                all_serves03: ['查看', '编辑', '导出', '搜索', ],
                all_serves04: ['查看', '编辑', '导出', '搜索', ],
                //全选
                check_all_boss: false,
                check_all01: false,
                check_all02: false,
                check_all03: false,
                check_all04: false,
                checked01: [],
                checked02: [],
                checked03: [],
                checked04: [],
                isIndeterminate_boss: false,
                isIndeterminate01: false,
                isIndeterminate02: false,
                isIndeterminate03: false,
                isIndeterminate04: false,
                serves: [],
            },
            //裁剪参数
            option: {
                img: 'http://5b0988e595225.cdn.sohucs.com/images/20180410/f1f9fe3c9b3844e997de5a65d9962128.jpeg',
                size: 1,
                full: true,
                outputType: 'jpg',
                canMove: true,
                canMoveBox: true,
                fixedBox: true,
                original: false,
                autoCrop: true,
                // 只有自动截图开启 宽度高度才生效
                autoCropWidth: 300,
                autoCropHeight: 250,
                centerBox: true,
                high: true
            },
            //裁剪预览框
            previews: {},
            //其他裁剪参数
            model: false,
            modelSrc: '',
            is_cropper: false,
        }
    },
    methods: {
        //全选相关
        handleCheckAllChange_boss(val) {
            for (var i = 1; i < 5; i++) {
                var str01 = 'this.handleCheckAllChange0';
                eval(str01 + i + '(' + val + ')');
                var str02 = 'this.handleCheckedCitiesChange0';
                if (val) {
                    var str03 = 'this.form.all_serves0';
                    eval(str02 + i + '(' + str03 + i + ')');
                }else {
                    eval(str02 + i + '([])');
                };
            };
            this.form.isIndeterminate_boss = false;
        },
        handleCheckAllChange01(val) {
            this.form.checked01 = val ? this.form.all_serves01 : [];
            this.form.isIndeterminate01 = false;
            this.form.isIndeterminate_boss = !this.form.isIndeterminate01 && !this.form.isIndeterminate02 && !this.form.isIndeterminate03 && !this.form.isIndeterminate04;
        },
        handleCheckAllChange02(val) {
            this.form.checked02 = val ? this.form.all_serves02 : [];
            this.form.isIndeterminate02 = false;
            this.form.isIndeterminate_boss = !this.form.isIndeterminate01 && !this.form.isIndeterminate02 && !this.form.isIndeterminate03 && !this.form.isIndeterminate04;
        },
        handleCheckAllChange03(val) {
            this.form.checked03 = val ? this.form.all_serves03 : [];
            this.form.isIndeterminate03 = false;
            this.form.isIndeterminate_boss = !this.form.isIndeterminate01 && !this.form.isIndeterminate02 && !this.form.isIndeterminate03 && !this.form.isIndeterminate04;
        },
        handleCheckAllChange04(val) {
            this.form.checked04 = val ? this.form.all_serves04 : [];
            this.form.isIndeterminate04 = false;
            this.form.isIndeterminate_boss = !this.form.isIndeterminate01 && !this.form.isIndeterminate02 && !this.form.isIndeterminate03 && !this.form.isIndeterminate04;
        },
        handleCheckedCitiesChange01(value) {
            let checkedCount = value.length;
            this.form.check_all01 = checkedCount === this.form.all_serves01.length;
            this.form.isIndeterminate01 = checkedCount > 0 && checkedCount < this.form.all_serves01.length;
            this.form.isIndeterminate_boss = this.form.isIndeterminate01 || this.form.isIndeterminate02 || this.form.isIndeterminate03 || this.form.isIndeterminate04;
        },
        handleCheckedCitiesChange02(value) {
            let checkedCount = value.length;
            this.form.check_all02 = checkedCount === this.form.all_serves02.length;
            this.form.isIndeterminate02 = checkedCount > 0 && checkedCount < this.form.all_serves02.length;
            this.form.isIndeterminate_boss = this.form.isIndeterminate01 || this.form.isIndeterminate02 || this.form.isIndeterminate03 || this.form.isIndeterminate04;
        },
        handleCheckedCitiesChange03(value) {
            let checkedCount = value.length;
            this.form.check_all03 = checkedCount === this.form.all_serves03.length;
            this.form.isIndeterminate03 = checkedCount > 0 && checkedCount < this.form.all_serves03.length;
            this.form.isIndeterminate_boss = this.form.isIndeterminate01 || this.form.isIndeterminate02 || this.form.isIndeterminate03 || this.form.isIndeterminate04;
        },
        handleCheckedCitiesChange04(value) {
            let checkedCount = value.length;
            this.form.check_all04 = checkedCount === this.form.all_serves04.length;
            this.form.isIndeterminate04 = checkedCount > 0 && checkedCount < this.form.all_serves04.length;
            this.form.isIndeterminate_boss = this.form.isIndeterminate01 || this.form.isIndeterminate02 || this.form.isIndeterminate03 || this.form.isIndeterminate04;
        },
        //裁剪图片相关
        startCrop() {
            this.is_cropper = true;
        },
        //实时预览函数
        realTime(data) {
            this.previews = data;
        },
        //放大缩小
        changeScale(num) {
            num = num || 1;
            this.$refs.cropper.changeScale(num);
        },
        //旋转
        rotateLeft() {
            this.$refs.cropper.rotateLeft();
        },
        rotateRight() {
            this.$refs.cropper.rotateRight();
        },
        //取消裁剪
        cancel_crop () {
            this.is_cropper = false;
        },
        //完成裁剪
        com_crop(type) {
            if (type === 'blob') {
                this.$refs.cropper.getCropBlob((data) => {
                    console.log(data);
                    var img = window.URL.createObjectURL(data);
                    this.form.license = img;
                    this.is_cropper = false;
                })
            } else {
                //base 64
                this.$refs.cropper.getCropData((data) => {
                    // console.log(data);
                    this.form.license = data;
                    this.is_cropper = false;
                });
            };
        },
        //上传营业执照相关
        upload_before(file) {
            const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJPG) {
                this.$message.error('上传的图片只能是 JPG/PNG 格式!');
            };
            if (!isLt2M) {
                this.$message.error('上传的图片大小不能超过 2MB!');
            };
            return isJPG && isLt2M;
        },
        upload_change(file, fileList) {
            console.log(file);
            this.option.img = URL.createObjectURL(file.raw);
            this.startCrop();
        },
        upload_succ(response, file, fileList) {
            console.log(response);
            console.log(file);
        },
        //下拉选择
        handleCommand(command) {
            this.form.default_select = command;
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
    
    .el-textarea__inner {
        width: 450px;
    }

</style>

<style lang='scss' scoped>
    
    .repeat_div {
        padding-bottom: 0;
    }
    .el-checkbox-group {
        margin-left: 20px;
    }
    .el-checkbox {
        margin: 0 10px 10px 10px;
    }
    .serves {
        h4 {
            margin: 10px 0 -5px 30px;
        }
        padding-bottom: 30px;

        .el-checkbox.is-bordered {
            margin: 10px;
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
        padding: 0 15px 20px 80px;
        color: #333;
    }
    .item {
        display: flex;
        align-items: center;
        margin: 20px 0;

        span {
            white-space: nowrap;
            margin-right: 8px;
            min-width: 90px;
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
    .el-checkbox {
        margin-left: 0;
        margin-bottom: 0;
        margin-top: 5px;
    }
    .el-textarea {
        width: auto;
    }
    @media screen and (min-width: 769px) {
        
    }
</style>