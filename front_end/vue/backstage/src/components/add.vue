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
                        <el-input v-model="ruleForm.realname" placeholder="请输入商家联系人" clearable maxlength="10" show-word-limit @change='input_data'></el-input>
                    </el-form-item>
                    <el-form-item label="手机号码:" prop="mobile">
                        <el-input v-model="ruleForm.mobile" placeholder="请输入商家手机号码" clearable maxlength="11" show-word-limit @change='input_data'></el-input>
                    </el-form-item>
                    <el-form-item label="密码:" prop="password">
                        <el-input v-model="ruleForm.password" placeholder="请输入登录密码" show-password clearable @change='input_data'></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码:" prop="re_password">
                        <el-input v-model="ruleForm.re_password" placeholder="请再次输入登录密码" show-password clearable @change='input_data'></el-input>
                    </el-form-item>
                    <el-form-item label="营业执照:" prop="image">
                        <el-upload
                            id="license_img"
                            action=""
                            drag
                            :auto-upload='false'
                            :show-file-list="false"
                            :on-change='upload_change_license'>
                            <img v-if="show_cropper.license" :src="show_cropper.license" class="full_width" alt='license_img'>
                            <i v-else class="el-icon-plus" style="font-size: 2rem;"></i>
                        </el-upload>
                    </el-form-item>
                    <!-- 裁剪工具cropper -->
                    <cropper
                    v-if='license_cropper_data.is_cropper'
                    :cropper_data='license_cropper_data'
                    @startCrop='startCrop_license'
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
                        <el-input v-model="ruleForm.club_name" placeholder="请输入门店名称" clearable maxlength="32" show-word-limit @change='input_data'></el-input>
                    </el-form-item>
                    <el-form-item label="门店电话:" prop="tel">
                        <el-input v-model="ruleForm.tel" placeholder="请输入门店电话" clearable @change='input_data'></el-input>
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
                        <el-input v-model="ruleForm.address" placeholder="请输入详细地址" clearable @change='input_data_address'></el-input>
                    </el-form-item>
                    <el-form-item label="地图位置:">
                        <baidu_map />
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
                    <el-form-item label="附加服务:" prop="club_facil">
                        <el-checkbox :indeterminate="checkbox.isIndeterminate" v-model="checkbox.check_all" @change="handleCheckAllChange">全选</el-checkbox>
                        <el-checkbox-group v-model="checkbox.checked" @change="handleCheckedCitiesChange">
                            <el-checkbox v-for="item in checkbox.all_serves" :label="item.id" :key="item.id" border>{{ item.name }}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="门店环境照片:" prop="shop_image">
                        <span class="bottom_tip">(至多5张)</span>
                        <ul class="show_store_imgs flex_center">
                            <li class="flex_center" v-for='(item, index) in show_cropper.store' @mouseenter="enter_store_img(index)" @mouseleave="leave_store_img()">
                                <img :src="item" class="full_width" alt='license_img'>
                                <transition name="fade">
                                    <div v-if='show_delete_index == index' class="float flex_center"><i class="el-icon-delete" @click='delete_store_img(index)'></i></div>
                                </transition>
                            </li>
                            <el-upload
                                id="store_img"
                                v-if="show_cropper.store.length < 5"
                                action=""
                                drag
                                :show-file-list="false"
                                :auto-upload='false'
                                :on-change='upload_change_store'>
                                <i class="el-icon-plus" style="font-size: 2rem;"></i>
                            </el-upload>
                        </ul>
                    </el-form-item>
                    <!-- 裁剪工具cropper -->
                    <cropper
                    v-if='store_cropper_data.is_cropper'
                    :cropper_data='store_cropper_data'
                    @startCrop='startCrop_store'
                    @cancel_crop='cancel_crop'
                    @com_crop='com_crop'
                    />
                    <el-form-item label="门店介绍:" prop="content">
                        <el-input type="textarea" @change='input_data' :autosize="{ minRows: 5, maxRows: 10 }" v-model="ruleForm.content" placeholder="请输入门店介绍" maxlength="500" show-word-limit @keyup.13.native="add_business('ruleForm')"></el-input>
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
import baidu_map from "@/components/baidu_map.vue";

@Component({
    components: {
        cropper,
        p_c_a_s,
        baidu_map
    }
})

export default class add extends Vue{
    //表单数据
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
        business_time: [new Date(2019, 6, 6, 8), new Date(2019, 6, 6, 23)],
        open_time: '',
        close_time: '',
        club_facil: sessionStorage.getItem('add_business') ? JSON.parse(sessionStorage.getItem('add_business')).club_facil : [],
        shop_image: [],
        content: ''
    };

    private is_loading: boolean = false;
    private show_delete_index: any = null;
    
    //全选相关
    private checkbox: any = {
        //全选
        check_all: false,
        checked: sessionStorage.getItem('checkbox_checked') ? JSON.parse(sessionStorage.getItem('checkbox_checked')) : [],
        isIndeterminate: true,
        //健身会所提供的服务
        all_serves: [],
    };
    
    //验证再次输入密码
    private re_pass: any = (rule, value, callback) => {
        if (sessionStorage.getItem('add_business')) { this.ruleForm = JSON.parse(sessionStorage.getItem('add_business')) };
        if (value !== this.ruleForm.password) {
            callback(new Error('两次输入的密码不一致'));
        }else {
            callback();
        };
    };

    //验证营业执照
    private license: any = (rule, value, callback) => {
        if (sessionStorage.getItem('show_license')) { var show_license = sessionStorage.getItem('show_license') };
        if (!show_license) {
            callback(new Error('请上传营业执照'));
        }else {
            callback();
        };
    };

    //验证门店图片
    private store: any = (rule, value, callback) => {
        var length = this.show_cropper.store.length;
        if (sessionStorage.getItem('show_store')) { length = JSON.parse(sessionStorage.getItem('show_store')).length };
        if (length <= 0) {
            callback(new Error('请至少上传一张门店环境图片'));
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

    //验证多选服务
    private service: any = (rule, value, callback) => {
        var length = 0;
        if (sessionStorage.getItem('checkbox_checked')) { length = JSON.parse(sessionStorage.getItem('checkbox_checked')).length };
        if ( length <= 0 ) {
            callback(new Error('请至少选择一个附加服务'));
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
            { pattern: /^[\w]{6,16}$/, message: "密码只能由数字或字母构成，且长度为6-16位", trigger: "change" }
        ],
        re_password: [
            { required: true, message: '请再次输入登录密码', trigger: 'blur' },
            { validator: this.re_pass, trigger: "change" }
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
        club_facil: [
            { required: true, validator: this.service },
        ],
        shop_image: [
            { required: true, validator: this.store },
        ],
        content: [
            { required: true, message: '请输入门店介绍', trigger: 'blur' },
        ],
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

    //门店图片裁剪相关数据
    private store_cropper_data: any = {
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
        title: "门店图片裁剪"
    };

    //裁剪完成 展示图片
    private show_cropper: any = {
        license: '',
        store: [],
    };

    mounted () {
        //获取附加服务
        this.$store.dispatch("get_service").then( (res: any) => {
            console.log("附加服务", res);
            if (res.code == 0 || res.status == 1) {
                this.checkbox.all_serves = res.result;
            }else {
                //获取失败提示
                this.$message({ message: res.msg, type: "error", duration: 2500 });
            };
        });
        if (sessionStorage.getItem('add_business')) {
            this.ruleForm = JSON.parse(sessionStorage.getItem('add_business'));
        };
        //保存的营业执照
        if (sessionStorage.getItem('show_license')) {
            this.show_cropper.license = sessionStorage.getItem('show_license');
            this.ruleForm.image = this.dataURLtoFile(this.show_cropper.license, "image");
        };
        //保存的门店图片
        if (sessionStorage.getItem('show_store')) {
            this.show_cropper.store = JSON.parse(sessionStorage.getItem('show_store'));
            var length = this.show_cropper.store.length;
            this.ruleForm.shop_image = [];
            for (var i = 0; i < length; i++) {
                this.ruleForm.shop_image.push(this.dataURLtoFile(this.show_cropper.store[i], "shop_image[]"));
            };
        };
    };

    // 将base64的图片转换为File文件
    dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        };
        return new File([u8arr], filename, {
            type: mime
        });
    };
    // 将base64的图片转换为Blob文件
    // convertBase64UrlToBlob(urlData) {
    //     let bytes = window.atob(urlData.split(',')[1]);//去掉url的头，并转换为byte
    //     //处理异常,将ascii码小于0的转换为大于0
    //     let ab = new ArrayBuffer(bytes.length);
    //     let ia = new Uint8Array(ab);
    //     for (var i = 0; i < bytes.length; i++) {
    //         ia[i] = bytes.charCodeAt(i);
    //     };
    //     return new Blob([ab], { type: 'image/jpeg' });
    // };

    //实时记录密码
    input_data () {
        sessionStorage.setItem('add_business', JSON.stringify(this.ruleForm));
    };
    //实时记录详情地址
    input_data_address () {
        this.$store.commit('change_map_data', this.ruleForm);
        sessionStorage.setItem('add_business', JSON.stringify(this.ruleForm));
    };
    //显示删除门店的图标
    enter_store_img (index) {
        this.show_delete_index = index;
    };

    //隐藏删除门店的图标
    leave_store_img () {
        this.show_delete_index = null;
    };

    //删除门店图片
    delete_store_img (index) {
        var that: any = this;
        that.$confirm('确定删除这张门店图片？', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }).then(() => {
            that.show_cropper.store.splice(index, 1);
            that.ruleForm.shop_image.splice(index, 1);
            sessionStorage.setItem('show_store', JSON.stringify(that.show_cropper.store));
        });
    };

    //全选相关
    handleCheckAllChange(val) {
        var that: any = this;
        if (val) {
            this.ruleForm.club_facil = [];
            for (var i = 0; i < this.checkbox.all_serves.length; i++) {
                this.ruleForm.club_facil.push(this.checkbox.all_serves[i].id);
            };
        }else {
            this.ruleForm.club_facil = [];
        };
        this.checkbox.checked = this.ruleForm.club_facil;
        this.checkbox.isIndeterminate = false;
        sessionStorage.setItem('checkbox_checked', JSON.stringify(this.checkbox.checked));
        sessionStorage.setItem('add_business', JSON.stringify(this.ruleForm));
        //验证
        let ref: any = that.$refs.ruleForm;
        ref.validate();
    };
    handleCheckedCitiesChange(value) {
        var that: any = this;
        let checkedCount = value.length;
        this.checkbox.check_all = checkedCount === this.checkbox.all_serves.length;
        this.checkbox.isIndeterminate = checkedCount > 0 && checkedCount < this.checkbox.all_serves.length;
        this.ruleForm.club_facil = value;
        sessionStorage.setItem('checkbox_checked', JSON.stringify(this.checkbox.checked));
        sessionStorage.setItem('add_business', JSON.stringify(this.ruleForm));
        //验证
        let ref: any = that.$refs.ruleForm;
        ref.validate();
    };

    //选择营业时间
    business_time (time) {
        var that: any = this;
        if (time) {
            this.ruleForm.business_time = time;
            this.ruleForm.open_time = that.$moment(time[0]).format('HH:mm');
            this.ruleForm.close_time = that.$moment(time[1]).format('HH:mm');
        }else {
            this.ruleForm.business_time = '';
            this.ruleForm.open_time = '';
            this.ruleForm.close_time = '';
            //验证
            let ref: any = that.$refs.ruleForm;
            ref.validate();
        };
    };
    //选择省
    change_p (province) {
        this.ruleForm.province = province;
        this.ruleForm.address = '';
        //储存起来是为了验证
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
    };

    //重置所有表单数据
    resetForm () {
        this.$confirm('重置后，保存的表单数据将全部清空！仍然重置吗？', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }).then(() => {
            var that: any = this;
            //不这样定义any类型 typescript解释器就会报错
            let ref: any = that.$refs.ruleForm;
            ref.resetFields();
            that.show_cropper.license = '';
            that.show_cropper.store = [];
            that.ruleForm.province = '';
            that.ruleForm.city = '';
            that.ruleForm.area = '';
            that.ruleForm.street = '';
            that.ruleForm.business_time = '';
            that.checkbox.checked = [];
            that.ruleForm.club_facil = [];
            that.ruleForm.shop_image = [];
            sessionStorage.removeItem('show_license');
            sessionStorage.removeItem('show_store');
            sessionStorage.setItem('add_business', JSON.stringify(that.ruleForm));
            ref.validate();
        });
    };

    //上传营业执照
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
            that.startCrop_license();
        };
    };

    //上传门店图片
    upload_change_store (file) {
        var that: any = this;
        var isJPG = file.raw.type === 'image/jpeg' || file.raw.type === 'image/jpg' || file.raw.type === 'image/png';
        var isLt1M = file.size / 1024 / 1024 < 1;
        if (!isJPG) {
            that.$message({ message: "上传的图片只能是 jpg/jpeg/png 格式!", type: "error", duration: 2500 });
        };
        if (!isLt1M) {
            that.$message({ message: "上传的图片大小不能超过 1MB!", type: "error", duration: 2500 });
        };
        if (isJPG && isLt1M) {
            that.store_cropper_data.option.img = URL.createObjectURL(file.raw);
            that.startCrop_store();
        };
    };

    //开始裁剪图片
    startCrop_license() {
        var that: any = this;
        that.license_cropper_data.is_cropper = true;
    };
    startCrop_store() {
        var that: any = this;
        that.store_cropper_data.is_cropper = true;
    };
    //取消裁剪
    cancel_crop () {
        var that: any = this;
        that.license_cropper_data.is_cropper = false;
        that.store_cropper_data.is_cropper = false;
    };
    //完成裁剪
    com_crop(img, data, title) {
        var that: any = this;
        if (title == "营业执照裁剪") {
            that.show_cropper.license = data;
            sessionStorage.setItem('show_license', data);
            that.ruleForm.image = img;
            that.license_cropper_data.is_cropper = false;
        }else {
            that.show_cropper.store.push(data);
            sessionStorage.setItem('show_store', JSON.stringify(that.show_cropper.store));
            that.ruleForm.shop_image.push(img);
            that.store_cropper_data.is_cropper = false;
            if (that.ruleForm.shop_image.length == 5) {
                that.$message({ message: '图片数量已达到上限，无法继续上传！', type: "info", duration: 2500 });
            };
        };
        //验证
        let ref: any = this.$refs.ruleForm;
        ref.validate();
    };

    //新增商家
    add_business() {
        //不这样定义any类型 typescript解释器就会报错
        let ref: any = this.$refs.ruleForm;
        ref.validate((valid: boolean) => {
            if (valid) {
                this.ruleForm.open_time = !this.ruleForm.open_time ? "08:00" : this.ruleForm.open_time;
                this.ruleForm.close_time = !this.ruleForm.close_time ? "23:00" : this.ruleForm.close_time;
                var j_w = JSON.parse(sessionStorage.getItem('j_w'));
                this.ruleForm.lat = j_w ? j_w.lat : '';
                this.ruleForm.lng = j_w ? j_w.lng : '';
                console.log("this.ruleForm", this.ruleForm);
                sessionStorage.setItem('add_business', JSON.stringify(this.ruleForm));
                this.is_loading = true;
                this.$store.dispatch("add_business", this.ruleForm).then( (res: any) => {
                    console.log("新增商家", res);
                    if (res.code == 0 || res.status == 1) {
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