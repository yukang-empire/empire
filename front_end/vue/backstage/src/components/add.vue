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
                <div>
                    <el-form-item label="联系人:" prop="realname">
                        <el-input v-model="ruleForm.realname" placeholder="请输入商家联系人" clearable maxlength="10" show-word-limit></el-input>
                    </el-form-item>
                    <el-form-item label="手机号码:" prop="mobile">
                        <el-input v-model="ruleForm.mobile" placeholder="请输入商家手机号码" clearable maxlength="11" show-word-limit></el-input>
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
                            :on-change='upload_change_license'>
                            <img v-if="show_cropper.license" :src="show_cropper.license" class="avatar full_width">
                            <i v-else class="el-icon-plus avatar-uploader-icon" style="font-size: 2rem;"></i>
                        </el-upload>
                    </el-form-item>
                    <!-- 裁剪工具cropper -->
                    <cropper
                    v-if='license_cropper_data.is_cropper'
                    :cropper_data='license_cropper_data'
                    @startCrop='startCrop'
                    @cancel_crop='cancel_crop'
                    @com_crop='com_crop'
                    />
                </div>

                <div>
                    <p style="margin-top: 30px;margin-bottom: 20px;">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#iconruzhuchenggongdapx"></use>
                        </svg>
                        <span>填写门店信息</span>
                    </p>
    
                    <el-form-item label="门店名称:" prop="club_name">
                        <el-input v-model="ruleForm.club_name" placeholder="请输入门店名称" clearable maxlength="32" show-word-limit></el-input>
                    </el-form-item>
                    <el-form-item label="所在地区:" prop="p_c_a_s">
                        <p_c_a_s
                        :form='ruleForm'
                        @change_p="change_p"
                        @change_c="change_c"
                        @change_a='change_a'
                        @change_s="change_s"
                        />
                    </el-form-item>
                    <el-form-item label="详细地址:" prop="address">
                        <el-input v-model="ruleForm.address" placeholder="请输入详细地址" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="门店电话:" prop="tel">
                        <el-input v-model="ruleForm.tel" placeholder="请输入门店电话" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="营业时间:" prop="business_time">
                        <el-time-picker
                            is-range
                            v-model="ruleForm.business_time"
                            range-separator="至"
                            start-placeholder="开始时间"
                            end-placeholder="结束时间"
                            @change='business_time'
                            placeholder="选择时间范围">
                        </el-time-picker>
                    </el-form-item>
                    <el-form-item label="门店介绍" prop="content">
                        <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 10 }" v-model="ruleForm.content" placeholder="请输入门店介绍" maxlength="500" show-word-limit @keyup.13.native="add_business('ruleForm')"></el-input>
                    </el-form-item>
    
                    <el-form-item class="btn">
                        <el-button type="primary" @click="add_business" :loading="is_loading">提交</el-button>
                        <el-button @click="resetForm()">重置</el-button>
                    </el-form-item>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
//裁剪插件
import cropper from "@/components/cropper.vue";
//省-市-区-街道
import p_c_a_s from "@/components/p_c_a_s.vue";

@Component({
    components: {
        cropper,
        p_c_a_s
    }
})

export default class add extends Vue{
    private ruleForm: any = {
        realname: '',
        mobile: '',
        password: '',
        re_password: '',
        image: '',

        club_name: '',
        province: '',
        city: '',
        area: '',
        street: '',
        address: '',
        tel: '',
        business_time: '',
        open_time: '',
        close_time: '',

        content: ''
    };

    private is_loading: boolean = false;

    //验证再次输入密码
    private re_pass: any = (rule, value, callback) => {
        if (sessionStorage.getItem('add_business')) { this.ruleForm.password = JSON.parse(sessionStorage.getItem('add_business')).password };
        if (value !== this.ruleForm.password) {
            callback(new Error('两次输入的密码不一致'));
        }else {
            callback();
        };
    };

    //验证营业执照
    private license: any = (rule, value, callback) => {
        if (sessionStorage.getItem('show_license')) { this.ruleForm.image = sessionStorage.getItem('show_license') };
        if (!this.ruleForm.image) {
            callback(new Error('请上传营业执照'));
        }else {
            callback();
        };
    };

    //验证省市区街道
    private p_c_a_s: any = (rule, value, callback) => {
        if (sessionStorage.getItem('add_business')) { this.ruleForm = JSON.parse(sessionStorage.getItem('add_business')) };
        if (!this.ruleForm.province || !this.ruleForm.city || !this.ruleForm.area || !this.ruleForm.street) {
            callback(new Error('请选择完整的地区信息'));
        }else {
            callback();
        };
    };

    //验证规则
    private rules: object = {
        realname: [
            { required: true, message: '请输入商家联系人', trigger: 'blur' },
        ],
        mobile: [
            { required: true, message: '请输入商家手机号', trigger: 'blur' },
            { pattern: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[189])\d{8}$/, message: "请输入11位正确格式的手机号码", trigger: "blur" }
        ],
        password: [
            { required: true, message: '请输入登录密码', trigger: 'blur' },
            { pattern: /^[\w]{6,16}$/, message: "密码只能由数字或字母构成，且长度为6-16位", trigger: "blur" }
        ],
        re_password: [
            { required: true, message: '请再次输入登录密码', trigger: 'blur' },
            { validator: this.re_pass, trigger: "blur" }
        ],
        image: [
            { required: true, validator: this.license },
        ],

        club_name: [
            { required: true, message: '请输入门店名称', trigger: 'blur' },
        ],
        p_c_a_s: [
            { required: true, validator: this.p_c_a_s },
        ],
        address: [
            { required: true, message: '请输入门店的详细地址', trigger: 'blur' },
        ],
        tel: [
            { required: true, message: '请输入门店电话', trigger: 'blur' },
        ],
        business_time: [
            { required: true, message: '请选择营业时间', trigger: 'blur' },
        ],
        content: [
            { required: true, message: '请输入门店介绍', trigger: 'blur' },
        ]
    };

    //营业执照裁剪相关数据
    private license_cropper_data: any = {
        //裁剪参数
        option: {
            img: '',
            fixedBox: true,
            autoCrop: true,
            // 只有自动截图开启 宽度高度才生效
            autoCropWidth: 300,
            autoCropHeight: 200,
            centerBox: true
        },
        //是否开启裁剪
        is_cropper: false,
        //裁剪预览框
        previews: {},
        //标题
        title: "营业执照裁剪"
    };

    //裁剪完成 展示图片
    private show_cropper: any = {
        license: '',
    };

    mounted () {
        if (sessionStorage.getItem('add_business')) {
            this.ruleForm = JSON.parse(sessionStorage.getItem('add_business'));
            if (!this.ruleForm.business_time) {
                this.ruleForm.business_time = [new Date(2019, 6, 6, 8), new Date(2019, 6, 6, 23)];
            };
        };
        if (sessionStorage.getItem('show_license')) {
            this.show_cropper.license = sessionStorage.getItem('show_license');
            this.ruleForm.image = this.convertBase64UrlToBlob(this.show_cropper.license);
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
        };
        return new Blob([ab], { type: 'image/jpeg' });
    };

    //选择营业时间
    business_time (time) {
        console.log('business_time', time);
        if (time) {
            this.ruleForm.business_time = time;
            this.ruleForm.open_time = this.$moment(time[0]).format('HH:mm');
            this.ruleForm.close_time = this.$moment(time[1]).format('HH:mm');
        }else {
            this.ruleForm.business_time = '';
            this.ruleForm.open_time = '';
            this.ruleForm.close_time = '';
            sessionStorage.setItem('add_business', JSON.stringify(this.ruleForm));
        };
        console.log('this.ruleForm', this.ruleForm);
    };
    //选择省
    change_p (province) {
        this.ruleForm.province = province;
        sessionStorage.setItem('add_business', JSON.stringify(this.ruleForm));
    };

    //改变市 筛选区
    change_c (city) {
        this.ruleForm.city = city;
        sessionStorage.setItem('add_business', JSON.stringify(this.ruleForm));
    };

    //改变区 筛选街道
    change_a (area) {
        this.ruleForm.area = area;
        sessionStorage.setItem('add_business', JSON.stringify(this.ruleForm));
    };

    //选择街道
    change_s (street) {
        this.ruleForm.street = street;
        sessionStorage.setItem('add_business', JSON.stringify(this.ruleForm));
        console.log(this.ruleForm);
    };

    //重置所有表单数据
    resetForm () {
        this.$confirm('重置后，保存的表单数据将全部清空！仍然重置吗？', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }).then(() => {
            var that: any = this;
            //不这样定义any类型 typescript解释器就会报错
            let ref: any = this.$refs.ruleForm;
            ref.resetFields();
            that.show_cropper.license = '';
            that.ruleForm.province = '';
            sessionStorage.setItem('show_license', '');
            sessionStorage.setItem('add_business', '');
        });
    };

    //上传图片
    upload_change_license(file) {
        var that: any = this;
        var isJPG = file.raw.type === 'image/jpeg' || file.raw.type === 'image/jpg';
        var isLt1M = file.size / 1024 / 1024 < 1;
        if (!isJPG) {
            this.$message({ message: "上传的图片只能是 jpg/jpeg 格式!", type: "error", duration: 2500 });
        };
        if (!isLt1M) {
            this.$message({ message: "上传的图片大小不能超过 1MB!", type: "error", duration: 2500 });
        };
        if (isJPG && isLt1M) {
            that.license_cropper_data.option.img = URL.createObjectURL(file.raw);
            that.startCrop();
        };
    };
    //开始裁剪图片
    startCrop() {
        var that: any = this;
        that.license_cropper_data.is_cropper = true;
    };
    //取消裁剪
    cancel_crop () {
        var that: any = this;
        that.license_cropper_data.is_cropper = false;
    };
    //完成裁剪
    com_crop(img, data) {
        var that: any = this;
        that.show_cropper.license = data;
        sessionStorage.setItem('show_license', data);
        that.ruleForm.image = img;
        that.license_cropper_data.is_cropper = false;
    };

    //新增商家
    add_business() {
        //不这样定义any类型 typescript解释器就会报错
        let ref: any = this.$refs.ruleForm;
        ref.validate((valid: boolean) => {
            if (valid) {
                console.log("this.ruleForm", this.ruleForm);
                sessionStorage.setItem('add_business', JSON.stringify(this.ruleForm));
                this.is_loading = true;
                this.$store.dispatch("add_business", this.ruleForm).then( (res: any) => {
                    console.log("新增商家", res);
                    if (res.code == 0) {
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