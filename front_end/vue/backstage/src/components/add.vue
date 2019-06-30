<template>
    <div class="add">
        <div class="repeat_div">
            <p>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#iconzhuceyaoqing"></use>
                </svg>
                <span>填写商家信息</span>
            </p>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
                <el-form-item label="联系人:" prop="realname">
                    <el-input v-model="ruleForm.realname" placeholder="请输入商家联系人" clearable></el-input>
                </el-form-item>
                <el-form-item label="手机号码:" prop="mobile">
                    <el-input v-model="ruleForm.mobile" placeholder="请输入商家手机号码" clearable></el-input>
                </el-form-item>
                <el-form-item label="密码:" prop="password">
                    <el-input v-model="ruleForm.password" placeholder="请输入登录密码" show-password clearable></el-input>
                </el-form-item>
                <el-form-item label="确认密码:" prop="re_password">
                    <el-input v-model="ruleForm.re_password" placeholder="请再次输入登录密码" show-password clearable></el-input>
                </el-form-item>
                <el-form-item label="营业执照:" prop="image">
                    <el-upload
                        class="avatar-uploader"
                        action=""
                        drag
                        :auto-upload='false'
                        :show-file-list="false"
                        :before-upload="upload_before"
                        :on-change='upload_change'>
                        <img v-if="ruleForm.image" :src="ruleForm.image" class="avatar full_width">
                        <i v-else class="el-icon-plus avatar-uploader-icon" style="font-size: 2rem;"></i>
                    </el-upload>
                </el-form-item>
                <!-- 裁剪工具cropper -->
                <cropper
                ref="cropper"
                v-if='cropper_data.is_cropper'
                :cropper_data='cropper_data'
                @startCrop='startCrop'
                @realTime='realTime'
                @changeScale='changeScale'
                @rotateLeft='rotateLeft'
                @rotateRight='rotateRight'
                @cancel_crop='cancel_crop'
                @com_crop='com_crop'
                />


                <p style="margin-top: 30px;">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#iconruzhuchenggongdapx"></use>
                    </svg>
                    <span>填写门店信息</span>
                </p>
                <el-form-item label="门店介绍" prop="content">
                    <el-input v-model="ruleForm.content" placeholder="请输入门店介绍" clearable @keyup.13.native="add_business('ruleForm')"></el-input>
                </el-form-item>

                <el-form-item class="btn">
                    <el-button type="primary" @click="add_business" :loading="is_loading">提交</el-button>
                    <el-button @click="resetForm()">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import cropper from "@/components/cropper.vue";

@Component({
    components: {
        cropper
    }
})

export default class add extends Vue{
    private ruleForm: any = {
        realname: sessionStorage.getItem('realname') ? sessionStorage.getItem('realname') : '',
        mobile: '',
        password: '',
        re_password: '',
        image: '',
    };

    private is_loading: boolean = false;
    private re_pass: any = (rule, value, callback) => {
        if (value !== this.ruleForm.password) {
            callback(new Error('两次输入的密码不一致!'));
        }else {
            callback();
        };
    };
    //验证规则
    private rules: object = {
        realname: [
            { required: true, message: '请输入商家联系人', trigger: 'blur' },
            { min: 1, max: 10, message: '联系人长度应为1-10位', trigger: 'blur' },
        ],
        mobile: [
            { required: true, message: '请输入商家手机号', trigger: 'blur' },
            { pattern: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[189])\d{8}$/, message: "请输入11位正确格式的手机号码", trigger: "blur"}
        ],
        password: [
            { required: true, message: '请输入登录密码', trigger: 'blur' },
            { pattern: /^[\w]{6,16}$/, message: "密码只能由数字或字母构成，且长度为6-16位", trigger: "blur"}
        ],
        re_password: [
            { required: true, message: '请再次输入登录密码', trigger: 'blur' },
            { validator: this.re_pass, trigger: "blur"}
        ],
    };
    //裁剪相关数据
    private cropper_data: any = {
        //裁剪参数
        option: {
            img: '',
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
            autoCropHeight: 200,
            centerBox: true,
            high: true
        },
        //是否开启裁剪
        is_cropper: true,
        //裁剪预览框
        previews: {}
    };

    //重置所有表单数据
    resetForm () {
        //不这样定义any类型 typescript解释器就会报错
        let ref: any = this.$refs.ruleForm;
        ref.resetFields();
    };

    //上传图片前的检测
    upload_before(file) {
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
            this.$message({ message: "上传的图片只能是 JPG/PNG 格式!", type: "error", duration: 2500 });
        };
        if (!isLt2M) {
            this.$message({ message: "上传的图片大小不能超过 2MB!", type: "error", duration: 2500 });
        };
        return isJPG && isLt2M;
    };
    //改变上传图片时
    upload_change(file) {
        console.log(file);
        this.cropper_data.option.img = URL.createObjectURL(file.raw);
        this.startCrop();
    };
    //开始裁剪图片
    startCrop() {
        this.cropper_data.is_cropper = true;
    };
    //实时预览函数
    realTime(data) {
        var that: any = this;
        that.cropper_data.previews = data;
    };
    //放大缩小
    changeScale(num) {
        var that: any = this;
        num = num || 1;
        that.$refs.cropper.changeScale(num);
    };
    //旋转
    rotateLeft() {
        var that: any = this;
        that.$refs.cropper.rotateLeft();
    };
    rotateRight() {
        var that: any = this;
        that.$refs.cropper.rotateRight();
    };
    //取消裁剪
    cancel_crop () {
        this.cropper_data.is_cropper = false;
    };
    //完成裁剪
    com_crop(type) {
        var that: any = this;
        if (type === 'blob') {
            that.$refs.cropper.getCropBlob((data) => {
                console.log('blob格式图片', data);
                var img = window.URL.createObjectURL(data);
                this.ruleForm.image = img;
                this.cropper_data.is_cropper = false;
            });
        } else {
            //base 64
            that.$refs.cropper.getCropData((data) => {
                // console.log(data);
                this.convertBase64UrlToBlob(data);
                console.log("base64转成file文件", this.convertBase64UrlToBlob(data))
                this.ruleForm.image = this.convertBase64UrlToBlob(data);
                this.cropper_data.is_cropper = false;
            });
        };
    };
    // 将base64的图片转换为file文件
    convertBase64UrlToBlob(urlData) {
        let bytes = window.atob(urlData.split(',')[1]);//去掉url的头，并转换为byte
        //处理异常,将ascii码小于0的转换为大于0
        let ab = new ArrayBuffer(bytes.length);
        let ia = new Uint8Array(ab);
        for (var i = 0; i < bytes.length; i++) {
            ia[i] = bytes.charCodeAt(i);
        }
        return new Blob([ab], { type: 'image/jpeg' });
    };

    //新增商家
    add_business() {
        //不这样定义any类型 typescript解释器就会报错
        let ref: any = this.$refs.ruleForm;
        ref.validate((valid: boolean) => {
            if (valid) {
                this.is_loading = true;
                this.$store.dispatch("add_business", this.ruleForm).then( (res: any) => {
                    console.log("新增商家", res);
                    if (res.code == 0) {
                        //储存账户 方便用户下次登录
                        sessionStorage.setItem('realname', this.ruleForm.realname);
                        //新增成功提示
                        this.$message({ message: '新增成功！', type: "success", duration: 1500 });
                        this.$router.push({ path: '/business/list' });
                    }else {
                        //登录失败提示
                        this.$message({ message: res.msg, type: "error", duration: 2500 });
                    };
                    //取消转圈圈
                    this.is_loading = false;
                });
            } else {
                this.$message({ message: "请完善带*号的必填信息！", type: 'error', duration: 2500 });
                return false;
            };
        });
    };

}

</script>

<style lang="scss">

    @media screen and (min-width: 769px) {
        
    }
</style>