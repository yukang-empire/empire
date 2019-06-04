<template>
    <div class="business_info">
        <div class="repeat_div">
            <p>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-zhuceyaoqing"></use>
                </svg>
                <span>新增商家</span>
            </p>
            <div class="business_write">
                <div class="top_nav">
                    <div class="flat">
                        <span>商家信息</span>
                        <!-- 箭头 -->
                        <div class="right"></div>
                    </div>
                    <div class="flat tip">
                        <span>门店信息</span>
                        <!-- 箭头 -->
                        <div class="right"></div>
                        <div class="left"></div>
                    </div>
                    <div class="flat tip">
                        <span>完成</span>
                        <!-- 箭头 -->
                        <div class="right"></div>
                        <div class="left"></div>
                    </div>
                </div>

                <div class="form">
                    <div class="item">
                        <span>*联系人：</span>
                        <el-input
                            placeholder="请输入商家联系人名字"
                            v-model="form.name"
                            @blur='verify_input("name")'
                            clearable>
                        </el-input>
                    </div>
                    <transition name="fade"><p class='verify_warn' v-if='verify_warn.name.is_open'><span>{{ verify_warn.name.text }}</span></p></transition>
                    <div class="item">
                        <span>*手机号码：</span>
                        <el-input
                            placeholder="手机号码默认为登录账号"
                            v-model="form.account"
                            type='tel'
                            @blur='verify_input("account")'
                            @input='limit_input("account")'
                            clearable>
                        </el-input>
                    </div>
                    <transition name="fade"><p class='verify_warn' v-if='verify_warn.account.is_open'><span>{{ verify_warn.account.text }}</span></p></transition>
                    <div class="item">
                        <span>*密码：</span>
                        <el-input
                            placeholder="请输入登录密码"
                            v-model="form.password"
                            type='password'
                            show-password
                            @blur='verify_input("password")'
                            @input='limit_input("password")'
                            clearable>
                        </el-input>
                    </div>
                    <transition name="fade"><p class='verify_warn' v-if='verify_warn.password.is_open'><span>{{ verify_warn.password.text }}</span></p></transition>
                    <div class="item">
                        <span>*确认密码：</span>
                        <el-input
                            placeholder="请再次输入登录密码"
                            v-model="form.re_password"
                            type='password'
                            show-password
                            @blur='verify_input("re_password")'
                            @input='limit_input("re_password")'
                            clearable>
                        </el-input>
                    </div>
                    <transition name="fade"><p class='verify_warn' v-if='verify_warn.re_password.is_open'><span>{{ verify_warn.re_password.text }}</span></p></transition>
                    <div class="item">
                        <span>企业名称：</span>
                        <el-input
                            placeholder="请输入企业名称"
                            v-model="form.company"
                            clearable>
                        </el-input>
                    </div>
                    <div class="item">
                        <span>企业地址：</span>
                        <el-input
                            placeholder="请输入企业地址"
                            v-model="form.address"
                            clearable>
                        </el-input>
                    </div>
                    <div class="item">
                        <span>企业电话：</span>
                        <el-input
                            placeholder="请输入企业电话"
                            v-model="form.tel"
                            type='tel'
                            @input='limit_input("tel")'
                            clearable>
                        </el-input>
                    </div>
                    <div class="item">
                        <span>营业执照：</span>
                        <el-upload
                            class="avatar-uploader"
                            action=""
                            drag
                            :auto-upload='false'
                            :show-file-list="false"
                            :before-upload="upload_before"
                            :on-change='upload_change'
                            :on-success="upload_succ">
                            <img v-if="form.license" :src="form.license" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </div>
                </div>

                <div class="btn flex_center">
                    <el-button type="primary" @click='to_next'>下一步</el-button>
                    <el-button type="info" @click='cancel'>取消</el-button>
                </div>

                <!-- 图片裁剪 -->
                <div class="cut fixed_top" v-if='is_cropper'>
                    <h2>图片裁剪</h2>
                    <div class="main">
                        <!-- 裁剪框 -->
                        <vue-cropper
                            ref="cropper"
                            :img="option.img"
                            :output-size="option.size"
                            :output-type="option.outputType"
                            :info="true"
                            :full="option.full"
                            :can-move="option.canMove"
                            :can-move-box="option.canMoveBox"
                            :fixed-box="option.fixedBox"
                            :original="option.original"
                            :auto-crop="option.autoCrop"
                            :auto-crop-width="option.autoCropWidth"
                            :auto-crop-height="option.autoCropHeight"
                            :center-box="option.centerBox"
                            :high="option.high"
                            @real-time="realTime">
                        </vue-cropper>

                        <div class="right">
                            <!-- 裁剪预览框 方形 -->
                            <div class="show-preview square" :style="{'width': previews.w + 'px', 'height': previews.h + 'px',  'overflow': 'hidden'}">
                                <div :style="previews.div">
                                    <img :src="previews.url" :style="previews.img">
                                </div>
                            </div>
                            <!-- 裁剪预览框 圆形 -->
                            <div class="show-preview circle" :style="{'overflow': 'hidden'}">
                                <div :style="previews.div">
                                    <img :src="previews.url" :style="previews.img">
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    
                    <!-- 裁剪功能按钮 -->
                    <div class="func_btn">
                        <el-button type="success" @click="changeScale(1)">+</el-button>
                        <el-button type="success" @click="changeScale(-1)">-</el-button>
                        <el-button type="success" @click="rotateLeft">向左旋转</el-button>
                        <el-button type="success" @click="rotateRight">向右旋转</el-button>
                    </div>

                    <div class="final">
                        <el-button type="primary" @click="com_crop('base64')">完成裁剪</el-button>
                        <el-button type="primary" @click="cancel_crop">取消</el-button>
                    </div>
                </div>

            </div>
        </div>

        <transition name='fade'>
            <dialog_component :dialog='dialog' @off_dialog='off_dialog' />
        </transition>
    </div>
</template>

<script>
import { VueCropper }  from 'vue-cropper';
import dialog_component from '@/common/components/dialog.vue';

export default {
    name: 'business_info',
    components: {
        VueCropper,
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
            //表单正则
            form_RE: {
                phone: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/,
                email: /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/,
                password: /^[\w]{6,16}$/,
                verify_code: /^\d{6}$/
            },
            //验证错误时的提示
            verify_warn: {
                account: {
                    is_open: false,
                    text: null
                },
                password: {
                    is_open: false,
                    text: null
                },
                re_password: {
                    is_open: false,
                    text: null
                },
                name: {
                    is_open: false,
                    text: null
                },
            },
            form: {
                name: '',
                account: '',
                password: '',
                re_password: '',
                company: '',
                address: '',
                tel: '',
                license: '',
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
        //接收子组件事件 关闭dialog弹框
        off_dialog () {
            this.dialog.is_open = false;
        },
        //打开dialog弹框
        is_dialog (info) {
            //打开遮罩
            this.dialog.is_open = true;
            this.dialog.msg = info;
        },
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
        //验证失败的提示操作
        verify_error (which, text) {
            //打开提示段落
            this.verify_warn[which].is_open = true;
            this.verify_warn[which].text = text;
        },
        //失去焦点时 验证input值
        verify_input (name) {
            var that = this;
            switch (name) {
                case 'account':
                    //正则验证
                    if (!this.form_RE.phone.test(this.form.account)) {
                        this.verify_error('account', '请输入正确格式的手机号码！');
                    }else {
                        //储存手机号码 刷新后检测到有的话 则自动填入 更人性化
                        localStorage.setItem('account', this.form.account);
                        this.verify_warn.account.is_open = false;
                    };
                    break;
                case 'password':
                    if (!this.form_RE.password.test(this.form.password)) {
                        this.verify_error('password', '请输入6-16位数字与字母组成的密码！');
                    }else {
                        this.verify_warn.password.is_open = false;
                    };
                    break;
                case 're_password':
                    if (!this.form.re_password) {
                        this.verify_error('re_password', '请再次输入密码！');
                    }else if (this.form.re_password !== this.form.password) {
                        this.verify_error('re_password', '两次输入的密码不一致！');
                    }else {
                        this.verify_warn.re_password.is_open = false;
                    };
                    break;
                case 'name':
                    if (!this.form.name) {
                        this.verify_error('name', '商家名称不能为空！');
                    }else {
                        this.verify_warn.re_password.is_open = false;
                    };
                    break;
            };
        },
        //限制某些input的输入数据格式 设置type为number 在IOS端无效 设置为tel 在PC端无效 所以只能用js限制
        limit_input (name) {
            if (this.form[name]) {
                if ((name == 'account' && this.form[name]) || (name == 'tel' && this.form[name]) ) {
                    //限制手机号码只能纯数字
                    this.form[name] = this.form[name].replace(/[^\d]/g, '');
                }else {
                    //禁止输入中文
                    this.form[name] = this.form[name].replace(/[\u4e00-\u9fa5]/ig, '');
                };
            };
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