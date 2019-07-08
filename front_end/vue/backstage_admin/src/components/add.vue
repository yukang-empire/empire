<template>
    <div class="add">
        <div class="repeat_div">
            <p>
                <svg class="icon" aria-hidden="true">
                    <use :xlink:href="add_data.icon"></use>
                </svg>
                <span>{{ add_data.title }}</span>
            </p>
            <el-form :model="ruleForm" :rules="add_rules" ref="ruleForm">
                <!-- 新增商家/门店 -->
                <div v-if="add_data.type == 'business' || add_data.type == 'store'">
                    <el-form-item :label="'所属' + add_data.select_name + ':'" prop="store_id_02" v-if="add_data.type == 'store' && !$route.query.store_id">
                        <el-select v-model="ruleForm.store_id_02" filterable placeholder="请选择(可搜索)" @change='business_id_change'>
                            <el-option
                                v-for="item in all_business"
                                :key="item.store_id"
                                :label="item.club_name"
                                :value="item.store_id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="联系人:" prop="realname">
                        <el-input v-model="ruleForm.realname" :placeholder="'请输入' + add_data.name + '联系人'" clearable maxlength="10" show-word-limit @change='input_data'></el-input>
                    </el-form-item>
                    <el-form-item label="手机号码:" prop="mobile">
                        <el-input type='number' v-model="ruleForm.mobile" placeholder="请输入手机号码" clearable maxlength="11" show-word-limit @change='input_data'></el-input>
                    </el-form-item>
                    <el-form-item v-if="!$route.query.store_id" label="密码:" prop="password">
                        <el-input v-model="ruleForm.password" placeholder="请输入登录密码" show-password clearable @change='input_data'></el-input>
                    </el-form-item>
                    <el-form-item v-if="!$route.query.store_id" label="确认密码:" prop="re_password">
                        <el-input v-model="ruleForm.re_password" placeholder="请再次输入登录密码" show-password clearable @change='input_data'></el-input>
                    </el-form-item>
                    <el-form-item label="营业执照:" prop="image" style="margin-bottom: 56px;" v-if="add_data.type == 'business'">
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

                <!-- 新增商品 -->
                <div v-if='add_data.type == "goods"'>
                    <el-form-item :label="'所属' + add_data.select_name + ':'" prop="store_id">
                        <el-select v-model="ruleForm.store_id" filterable placeholder="请选择(可搜索)" @change='store_id_change'>
                            <el-option
                                v-for="item in all_store"
                                :key="item.store_id"
                                :label="item.club_name"
                                :value="item.store_id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="卡类型:" prop="card_type">
                        <el-select v-model="ruleForm.card_type" filterable placeholder="请选择卡类型" @change='card_type_change'>
                            <el-option
                                v-for="item in all_card_type"
                                :key="item.card_type"
                                :label="item.card_name"
                                :value="item.card_type">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="商品名称:" prop="goods_name">
                        <el-input v-model="ruleForm.goods_name" placeholder="请输入商品名称" clearable maxlength="10" show-word-limit @change='input_data'></el-input>
                    </el-form-item>
                    <el-form-item label="销售价格(元):" prop="shop_price">
                        <el-input type='number' v-model="ruleForm.shop_price" placeholder="请输入商品的销售价格" clearable maxlength="10" show-word-limit @change='input_data'></el-input>
                    </el-form-item>
                    <el-form-item label="结算价格(元):" prop="cost_price">
                        <el-input type='number' v-model="ruleForm.cost_price" placeholder="请输入商品的结算价格" clearable maxlength="10" show-word-limit @change='input_data'></el-input>
                    </el-form-item>
                    <el-form-item label="购买须知:" prop="card_info">
                        <el-input type="textarea" @change='input_data' :autosize="{ minRows: 5, maxRows: 10 }" v-model="ruleForm.card_info" placeholder="请输入商品购买须知" maxlength="500" show-word-limit @keyup.13.native="add_submit()"></el-input>
                    </el-form-item>
                </div>
                
                <!-- 新增商家/门店 -->
                <div v-if="add_data.type == 'business' || add_data.type == 'store'">
                    <p v-if="add_data.type == 'business'" style="margin-bottom: 20px;">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#iconruzhuchenggongdapx"></use>
                        </svg>
                        <span>填写门店信息</span>
                    </p>
    
                    <el-form-item label="门店名称:" prop="club_name">
                        <el-input v-model="ruleForm.club_name" placeholder="请输入门店名称" clearable maxlength="32" show-word-limit @change='input_data'></el-input>
                    </el-form-item>
                    <el-form-item label="门店电话:" prop="tel">
                        <el-input type='number' v-model="ruleForm.tel" placeholder="请输入门店电话" clearable @change='input_data'></el-input>
                    </el-form-item>
                    <el-form-item label="所在地区:" prop="p_c_a_s_rule">
                        <p_c_a_s
                        :form='ruleForm'
                        @change_p="change_p"
                        @change_c="change_c"
                        @change_a='change_a'
                        @change_s="change_s"
                        />
                    </el-form-item>
                    <el-form-item label="详细地址:" prop="address">
                        <el-input v-model="ruleForm.address" placeholder="请输入详细地址" clearable @input='input_data_address'></el-input>
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
                                    <div v-if='show_delete_index == index' class="float flex_center">
                                        <i class="el-icon-zoom-in" @click='enlarge_img(index)'></i>
                                        <i class="el-icon-delete" @click='delete_store_img(index)'></i>
                                    </div>
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
                        <el-input type="textarea" @change='input_data' :autosize="{ minRows: 5, maxRows: 10 }" v-model="ruleForm.content" placeholder="请输入门店介绍" maxlength="500" show-word-limit @keyup.13.native="add_submit()"></el-input>
                    </el-form-item>
                </div>

                <el-form-item class="btn">
                    <el-button type="primary" @click="add_submit()" :loading="is_loading">提交</el-button>
                    <el-button @click="resetForm()">重置</el-button>
                </el-form-item>
            </el-form>

            <!-- 图片放大 -->
            <el-dialog class="enlarge_img" title="查看门店环境图片" :visible.sync="dialog_img.is_enlarge" width="800px" center>
                <img :src="dialog_img.src" alt="img">
            </el-dialog>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
//裁剪插件
import cropper from "@/components/cropper.vue";
//省-市-区-街道
import p_c_a_s from "@/components/p_c_a_s.vue";
//百度地图
import baidu_map from "@/components/baidu_map.vue";

@Component({
    components: {
        cropper,
        p_c_a_s,
        baidu_map
    }
})

export default class add extends Vue{
    @Prop () private add_data !: any;
    
    //表单数据
    private ruleForm: any = {
        goods_name: '',
        shop_price: '',
        cost_price: '',
        card_info: '',
        store_id: '',
        store_id_02: '',
        card_type: '',
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
        club_facil: sessionStorage.getItem('add_form_data') ? JSON.parse(sessionStorage.getItem('add_form_data')).club_facil : [],
        shop_image: [],
        shop_images: [],
        content: ''
    };

    //验证再次输入密码
    private re_pass: any = (rule, value, callback) => {
        if (sessionStorage.getItem('add_form_data')) { this.ruleForm = JSON.parse(sessionStorage.getItem('add_form_data')) };
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
    private p_c_a_s_rules: any = (rule, value, callback) => {
        if (sessionStorage.getItem('add_form_data')) { this.ruleForm = JSON.parse(sessionStorage.getItem('add_form_data')) };
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
    private add_rules: object = {
        goods_name: [
            { required: true, message: '请输入商品名称', trigger: 'blur' },
        ],
        shop_price: [
            { required: true, message: '请输入商品销售价格', trigger: 'blur' },
        ],
        cost_price: [
            { required: true, message: '请输入商品结算价格', trigger: 'blur' },
        ],
        card_info: [
            { required: true, message: '请输入商品购买须知', trigger: 'blur' },
        ],
        store_id_02: [
            { required: true, message: '请选择所属商家', trigger: 'change' },
        ],
        store_id: [
            { required: true, message: '请选择所属门店', trigger: 'change' },
        ],
        card_type: [
            { required: true, message: '请选择卡类型', trigger: 'change' },
        ],
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
        p_c_a_s_rule: [
            { required: true, validator: this.p_c_a_s_rules },
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
    
    //所有的商家
    private all_business: any = [];
    //所有的门店
    private all_store: any = [];
    //所有的卡类型
    private all_card_type: any = [
        { card_type: 1, card_name: "次卡" },
        { card_type: 3, card_name: "月卡" },
        { card_type: 4, card_name: "季卡" },
        { card_type: 5, card_name: "半年卡" },
        { card_type: 6, card_name: "年卡" },
    ]

    //营业执照裁剪相关数据
    private license_cropper_data: any = {
        //裁剪参数
        option: {
            img: '',
            fixedBox: true,
            autoCrop: true,
            // 只有自动截图开启 宽度高度才生效
            autoCropWidth: 600,
            autoCropHeight: 400,
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
            autoCropWidth: 600,
            autoCropHeight: 400,
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

    //放大图片
    private dialog_img: any = {
        is_enlarge: false,
        src: ''
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

    //新增门店选择商家
    business_id_change (val) {
        this.ruleForm.store_id_02 = val;
        sessionStorage.setItem('add_form_data', JSON.stringify(this.ruleForm));
    };
    //新增商品选择门店
    store_id_change (val) {
        this.ruleForm.store_id = val;
        sessionStorage.setItem('add_form_data', JSON.stringify(this.ruleForm));
    };
    //选择卡类型
    card_type_change (val) {
        this.ruleForm.card_type = val;
        sessionStorage.setItem('add_form_data', JSON.stringify(this.ruleForm));
    };
    //实时记录密码
    input_data () {
        sessionStorage.setItem('add_form_data', JSON.stringify(this.ruleForm));
    };
    //实时记录详情地址
    input_data_address (value) {
        this.ruleForm.address = value;
        this.$store.commit('change_map_data', this.ruleForm);
        sessionStorage.setItem('add_form_data', JSON.stringify(this.ruleForm));
    };
    //显示删除门店的图标
    enter_store_img (index) {
        this.show_delete_index = index;
    };

    //隐藏删除门店的图标
    leave_store_img () {
        this.show_delete_index = null;
    };

    //放大门店图片
    enlarge_img (index) {
        var that: any = this;
        that.dialog_img.is_enlarge = true;
        that.dialog_img.src = that.show_cropper.store[index];
    };

    //删除门店图片
    delete_store_img (index) {
        var that: any = this;
        that.$confirm('确定删除这张门店图片？', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }).then(() => {
            that.show_cropper.store.splice(index, 1);
            sessionStorage.setItem('show_store', JSON.stringify(that.show_cropper.store));
            var length = that.show_cropper.store.length;
            that.ruleForm.shop_image = [];
            that.ruleForm.shop_images = [];
            for (var i = 0; i < length; i++) {
                if (that.show_cropper.store[i].indexOf('.jpg') != -1 || that.show_cropper.store[i].indexOf('.jpeg') != -1 || that.show_cropper.store[i].indexOf('.png') != -1) {
                    that.ruleForm.shop_images.push(that.show_cropper.store[i]);
                }else {
                    that.ruleForm.shop_image.push(that.dataURLtoFile(that.show_cropper.store[i], "shop_image[]"));
                };
            };
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
        sessionStorage.setItem('add_form_data', JSON.stringify(this.ruleForm));
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
        sessionStorage.setItem('add_form_data', JSON.stringify(this.ruleForm));
        //验证
        let ref: any = that.$refs.ruleForm;
        ref.validate();
    };

    //选择营业时间
    business_time (time) {
        var that: any = this;
        if (time) {
            this.ruleForm.business_time = time;
            this.ruleForm.open_time = time[0];
            this.ruleForm.close_time = time[1];
        }else {
            this.ruleForm.business_time = [];
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
        sessionStorage.setItem('add_form_data', JSON.stringify(this.ruleForm));
    };

    //改变市 筛选区
    change_c (city) {
        this.ruleForm.city = city;
        sessionStorage.setItem('add_form_data', JSON.stringify(this.ruleForm));
    };

    //改变区 筛选街道
    change_a (area) {
        this.ruleForm.area = area;
        sessionStorage.setItem('add_form_data', JSON.stringify(this.ruleForm));
    };

    //选择街道
    change_s (street) {
        this.ruleForm.street = street;
        sessionStorage.setItem('add_form_data', JSON.stringify(this.ruleForm));
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
            that.ruleForm.business_time = [];
            that.checkbox.checked = [];
            that.ruleForm.club_facil = [];
            that.ruleForm.shop_image = [];
            sessionStorage.removeItem('show_license');
            sessionStorage.removeItem('show_store');
            sessionStorage.removeItem('add_form_data');
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
            if (this.$route.query.store_id) {
                var length = that.ruleForm.shop_images.length + that.ruleForm.shop_image.length;
                if (length == 5) {
                    that.$message({ message: '图片数量已达到上限，无法继续上传！', type: "info", duration: 2500 });
                };
            }else {
                if (that.ruleForm.shop_image.length == 5) {
                    that.$message({ message: '图片数量已达到上限，无法继续上传！', type: "info", duration: 2500 });
                };
            };
            sessionStorage.setItem('add_form_data', JSON.stringify(that.ruleForm));
        };
        //验证
        let ref: any = this.$refs.ruleForm;
        ref.validate();
    };

    created () {
        //获取所有的附加服务
        if (this.add_data.type == "business" || this.add_data.type == "store") {
            this.$store.dispatch("get_service").then( (res: any) => {
                console.log("附加服务", res);
                if (res.code == 0 || res.status == 1) {
                    this.checkbox.all_serves = res.result;
                }else {
                    //获取失败提示
                    this.$message({ message: res.msg, type: "error", duration: 2500 });
                };
            });
        };
        if (this.add_data.type == "store") {
            //获取所有商家
            this.$store.dispatch("get_all_business").then( (res: any) => {
                console.log("所有商家", res);
                if (res.code == 0 || res.status == 1) {
                    this.all_business = res.result;
                }else {
                    //获取失败提示
                    this.$message({ message: res.msg, type: "error", duration: 2500 });
                };
            });
        };
        if (this.add_data.type == "goods") {
            //获取所有门店
            this.$store.dispatch("get_all_store").then( (res: any) => {
                console.log("所有门店", res);
                if (res.code == 0 || res.status == 1) {
                    this.all_store = res.result;
                }else {
                    //获取失败提示
                    this.$message({ message: res.msg, type: "error", duration: 2500 });
                };
            });
        };

        if (sessionStorage.getItem('add_form_data')) {
            this.ruleForm = JSON.parse(sessionStorage.getItem('add_form_data'));
            if (this.$route.query.store_id) {
                //解析后端返回的营业时间
                if (typeof this.ruleForm.open_time == "string" && this.ruleForm.open_time.indexOf('-') != -1) {
                    var time_arr = this.ruleForm.open_time.split('-');
                    this.ruleForm.open_time = new Date('2019/06/06 ' + time_arr[0]).getTime();
                    this.ruleForm.close_time = new Date('2019/06/06 ' + time_arr[1]).getTime();
                    this.ruleForm.business_time = [];
                    this.ruleForm.business_time.push(this.ruleForm.open_time);
                    this.ruleForm.business_time.push(this.ruleForm.close_time);
                };
                //解析后端返回的附加服务
                if (typeof this.ruleForm.club_facil == "string") {
                    var serves_arr = this.ruleForm.club_facil.split(',');
                    var length01 = serves_arr.length;
                    this.checkbox.checked = [];
                    for (var i = 0; i < length01; i++) {
                        this.checkbox.checked.push(parseInt(serves_arr[i]))
                    };
                    this.ruleForm.club_facil = this.checkbox.checked;
                    sessionStorage.setItem('checkbox_checked', JSON.stringify(this.checkbox.checked));
                }else {
                    this.checkbox.checked = this.ruleForm.club_facil;
                };
                //解析前端返回的门店图片
                var init_img = this.ruleForm.shop_image;
                var length02 = init_img.length;
                this.show_cropper.store = sessionStorage.getItem('show_store') ? JSON.parse(sessionStorage.getItem('show_store')) : [];
                this.ruleForm.shop_images = this.ruleForm.shop_images ? this.ruleForm.shop_images : [];
                for (var i = 0; i < length02; i++) {
                    var bool = init_img.length > 0 && (typeof init_img[i] == 'string') && (init_img[i].indexOf('.jpg') != -1 || init_img[i].indexOf('.jpeg') != -1 || init_img[i].indexOf('.png') != -1);
                    if (bool) {
                        this.ruleForm.shop_images.push(init_img[i]);
                        var src = this.$store.state.business.domain02 + init_img[i];
                        // var src = init_img[i];
                        if (this.show_cropper.store.length == 0) {
                            this.show_cropper.store.push(src);
                        }else {
                            //如果没有这张图片 才添加
                            var is_add = this.show_cropper.store.every((item) => {
                                return item != src;
                            });
                            if (is_add) {
                                this.show_cropper.store.push(src);
                            };
                        };
                    };
                };
                this.ruleForm.shop_image = [];
                sessionStorage.setItem('show_store', JSON.stringify(this.show_cropper.store));
            }else {
                //保存的营业执照
                this.ruleForm.image = sessionStorage.getItem('show_license') ? this.dataURLtoFile(sessionStorage.getItem('show_license'), "image") : '';
                //保存的门店图片
                this.show_cropper.store = sessionStorage.getItem('show_store') ? JSON.parse(sessionStorage.getItem('show_store')) : [];
                console.log(this.show_cropper.store);
                var length = this.show_cropper.store.length;
                this.ruleForm.shop_image = [];
                for (var i = 0; i < length; i++) {
                    this.ruleForm.shop_image.push(this.dataURLtoFile(this.show_cropper.store[i], "shop_image[]"));
                };
            };
        };
    };

    //新增
    add_submit() {
        //不这样定义any类型 typescript解释器就会报错
        let ref: any = this.$refs.ruleForm;
        ref.validate((valid: boolean) => {
            if (valid) {
                this.ruleForm.open_time = !this.ruleForm.open_time ? "08:00" : this.$moment(this.ruleForm.open_time).format('HH:mm');
                this.ruleForm.close_time = !this.ruleForm.close_time ? "23:00" : this.$moment(this.ruleForm.close_time).format('HH:mm');
                var j_w = JSON.parse(sessionStorage.getItem('j_w'));
                this.ruleForm.lat = j_w ? j_w.lat : '';
                this.ruleForm.lng = j_w ? j_w.lng : '';
                this.ruleForm.store_id_02 = this.$route.query.store_id ? this.$route.query.store_id : '';
                console.log("ruleForm", this.ruleForm);
                sessionStorage.setItem('add_form_data', JSON.stringify(this.ruleForm));
                this.is_loading = true;
                this.$emit('add_submit', this.ruleForm);
                //取消转圈圈
                setTimeout(() => {
                    this.is_loading = false;
                }, 3000);
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