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

                <!-- 修改密码 -->
                <!-- <div v-if='add_data.type == "change_password"'>
                    <el-form-item label="员工账户:" prop="staff_name">
                        <el-input v-model="ruleForm.staff_name" placeholder="请输入员工账户" clearable maxlength="10" show-word-limit @change='input_data'></el-input>
                    </el-form-item>
                    <el-form-item label="工号:" prop="staff_num">
                        <el-input v-model="ruleForm.staff_num" placeholder="请输入员工工号" clearable maxlength="20" show-word-limit @change='input_data'></el-input>
                    </el-form-item>
                    <el-form-item label="原密码:" prop="origin_password">
                        <el-input v-model="ruleForm.password" placeholder="请输入原密码" show-password clearable @change='input_data'></el-input>
                    </el-form-item>
                    <el-form-item label="新密码:" prop="password">
                        <el-input v-model="ruleForm.password" placeholder="请输入新密码" show-password clearable @change='input_data'></el-input>
                    </el-form-item>
                    <el-form-item label="确认新密码:" prop="re_password">
                        <el-input v-model="ruleForm.re_password" placeholder="请再次输入新密码" show-password clearable @change='input_data'></el-input>
                    </el-form-item>
                </div> -->

                <!-- 新增员工 -->
                <div v-if='add_data.type == "staff"'>
                    <el-form-item label="员工姓名:" prop="username">
                        <el-input v-model="ruleForm.username" placeholder="请输入员工姓名" clearable maxlength="10" show-word-limit @change='input_data'></el-input>
                    </el-form-item>
                    <el-form-item label="工号:" prop="workid">
                        <el-input v-model="ruleForm.workid" placeholder="请输入员工工号" clearable maxlength="20" show-word-limit @change='input_data'></el-input>
                    </el-form-item>
                    <el-form-item label="密码:" prop="password">
                        <el-input v-model="ruleForm.password" placeholder="请输入密码" show-password clearable @change='input_data'></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="状态:" prop="staff_state">
                        <el-switch v-model="ruleForm.staff_state" active-color="#13ce66" inactive-color="#ccc"> </el-switch>
                    </el-form-item> -->
                    <el-form-item label="角色:" prop="roleID">
                        <el-select v-model="ruleForm.roleID" filterable placeholder="请选择权限角色" @change='roleID_change'>
                            <el-option
                                v-for="item in staff_roles"
                                :key="item.RoleId"
                                :label="item.RoleName"
                                :value="item.RoleId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>
                
                    
                <!-- 新增员工 -->
                <div v-if='add_data.type == "staff"'>
                    <p v-if="add_data.type == 'business' || add_data.type == 'staff'" style="margin-bottom: 20px;">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#iconqita"></use>
                        </svg>
                        <span>其他信息</span>
                    </p>
                    <el-form-item label="手机号码:" prop="phone">
                        <el-input v-model="ruleForm.phone" placeholder="请输入员工手机号码" clearable maxlength="11" show-word-limit @change='input_data'></el-input>
                    </el-form-item>
                    <el-form-item label="头像:" prop="head" style="margin-bottom: 56px;">
                        <el-upload
                            id="head_img"
                            action=""
                            drag
                            :auto-upload='false'
                            :show-file-list="false"
                            :on-change='upload_change_head'>
                            <img v-if="show_cropper.head" :src="show_cropper.head" class="full_width staff_head" alt='license_img'>
                            <i v-else class="el-icon-plus" style="font-size: 2rem;"></i>
                        </el-upload>
                    </el-form-item>
                    <!-- 裁剪工具cropper -->
                    <cropper
                    v-if='head_cropper_data.is_cropper'
                    :cropper_data='head_cropper_data'
                    @startCrop='startCrop_head'
                    @cancel_crop='cancel_crop'
                    @com_crop='com_crop_staff'
                    />
                    <el-form-item label="简介:" prop="staff_content">
                        <el-input type="textarea" @change='input_data' :autosize="{ minRows: 5, maxRows: 10 }" v-model="ruleForm.staff_content" placeholder="请输入门店介绍" maxlength="500" show-word-limit @keyup.13.native="add_submit()"></el-input>
                    </el-form-item>
                </div>

                <!-- 新增分润 -->
                <div v-if='add_data.type == "share_profit"'>
                    <el-form-item label="期数:" prop="share_profit_num">
                        <el-input v-model="ruleForm.share_profit_num" placeholder="请输入期数"></el-input>
                    </el-form-item>
                    <el-form-item label="分润金额:" prop="share_profit_price">
                        <el-input v-model="ruleForm.share_profit_price" placeholder="请输入分润金额"></el-input>
                    </el-form-item>
                    <el-form-item label="分润时间:" prop="share_profit_time">
                        <el-date-picker
                            type="datetime"
                            v-model="ruleForm.share_profit_time"
                            @change='change_share_profit_time'
                            placeholder="选择分润开始时间">
                        </el-date-picker>
                    </el-form-item>
                </div>

                <!-- 新增角色 -->
                <div v-if='add_data.type == "role"'>
                    <el-form-item label="角色名称:" prop="RoleName">
                        <el-input v-model="ruleForm.RoleName" placeholder="请输入角色名" clearable maxlength="10" show-word-limit @change='input_data'></el-input>
                    </el-form-item>
                    <el-form-item label="描述:" prop="note">
                        <el-input type="textarea" @change='input_data' :autosize="{ minRows: 5, maxRows: 10 }" v-model="ruleForm.note" placeholder="请输入角色描述" maxlength="500" show-word-limit @keyup.13.native="add_submit()"></el-input>
                    </el-form-item>
                </div>

                <!-- 新增角色 -->
                <div v-if='add_data.type == "role"'>
                    <p style="margin-bottom: 20px;">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#iconquanxian"></use>
                        </svg>
                        <span>权限信息</span>
                    </p>
                    <checkbox_modules :data='checkbox_home' :checked_option='checkbox_home_already' @click_all='click_all_home' @click_option='click_option_home'></checkbox_modules>
                    <checkbox_modules :data='checkbox_user' :checked_option='checkbox_user_already' @click_all='click_all_user' @click_option='click_option_user'></checkbox_modules>
                    <checkbox_modules :data='checkbox_business' :checked_option='checkbox_business_already' @click_all='click_all_business' @click_option='click_option_business'></checkbox_modules>
                    <checkbox_modules :data='checkbox_order' :checked_option='checkbox_order_already' @click_all='click_all_order' @click_option='click_option_order'></checkbox_modules>
                    <checkbox_modules :data='checkbox_finance' :checked_option='checkbox_finance_already' @click_all='click_all_finance' @click_option='click_option_finance'></checkbox_modules>
                    <checkbox_modules :data='checkbox_share_profit' :checked_option='checkbox_share_profit_already' @click_all='click_all_share_profit' @click_option='click_option_share_profit'></checkbox_modules>
                    <!-- <checkbox_modules :data='checkbox_set' :checked_option='checkbox_set_already' @click_all='click_all_set' @click_option='click_option_set'></checkbox_modules> -->
                    <checkbox_modules :data='checkbox_set' :checked_option='checkbox_set_already' @click_all='click_all_set' @click_option='click_option_set'></checkbox_modules>
                </div>
                    

                <!-- 新增优惠券 -->
                <div v-if='add_data.type == "coupon"'>
                    <el-form-item label="优惠券标题:" prop="name">
                        <el-input v-model="ruleForm.name" placeholder="请输入优惠券标题" clearable maxlength="20" show-word-limit @change='input_data'></el-input>
                    </el-form-item>
                    <el-form-item label="优惠券描述:" prop="coupon_info">
                        <el-input v-model="ruleForm.coupon_info" placeholder="请输入优惠券描述" clearable maxlength="30" show-word-limit @change='input_data'></el-input>
                    </el-form-item>
                    <el-form-item label="是否上架:" prop="status">
                        <el-switch v-model="ruleForm.status" active-color="#13ce66" inactive-color="#ccc" @change='input_data'> </el-switch>
                    </el-form-item>
                    <el-form-item label="优惠金额:" prop="money">
                        ¥ &nbsp;<el-input v-model="ruleForm.money" placeholder="请输入优惠券可抵扣的金额" clearable @change='input_data'></el-input>
                    </el-form-item>
                    <el-form-item label="使用门槛:" prop="condition">
                        ¥ &nbsp;<el-input v-model="ruleForm.condition" placeholder="请输入优惠券使用门槛，无门槛请填0" clearable @change='input_data'></el-input>
                    </el-form-item>
                    <el-form-item label="有效时间:" prop="coupon_time">
                        <el-date-picker
                            is-range
                            type="datetimerange"
                            v-model="ruleForm.coupon_time"
                            range-separator="至"
                            start-placeholder="开始时间"
                            end-placeholder="截止时间"
                            @change='select_coupon_time'
                            placeholder="选择时间范围">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="使用范围:" prop="use_type">
                        <el-checkbox :indeterminate="checkbox.isIndeterminate" v-model="checkbox.check_all" @change="handleCheckAllChange_coupon">全选</el-checkbox>
                        <el-checkbox-group v-model="checkbox.checked" @change="handleCheckedCitiesChange_coupon">
                            <el-checkbox v-for="item in checkbox.all_range" :label="item.id" :key="item.id" border>{{ item.name }}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="获得方式:" prop="type">
                        <el-select v-model="ruleForm.type" filterable placeholder="请选择获得方式" @change='coupon_get_way_change'>
                            <el-option
                                v-for="item in all_get_way"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>

                <!-- 新增轮播图 -->
                <div v-if='add_data.type == "carousel"'>
                    <el-form-item label="轮播图名称:" prop="carousel_name">
                        <el-input v-model="ruleForm.carousel_name" placeholder="请输入轮播图名称" clearable maxlength="11" show-word-limit @change='input_data'></el-input>
                    </el-form-item>
                    <el-form-item label="轮播图:" prop="head">
                        <el-upload
                            id="carousel_img"
                            action=""
                            drag
                            :auto-upload='false'
                            :show-file-list="false"
                            :on-change='upload_change_head'>
                            <img v-if="show_cropper.head" :src="show_cropper.head" class="full_width staff_head" alt='license_img'>
                            <i v-else class="el-icon-plus" style="font-size: 2rem;"></i>
                        </el-upload>
                    </el-form-item>
                    <!-- 裁剪工具cropper -->
                    <cropper
                    v-if='carousel_cropper_data.is_cropper'
                    :cropper_data='carousel_cropper_data'
                    @startCrop='startCrop_head'
                    @cancel_crop='cancel_crop'
                    @com_crop='com_crop_staff'
                    />
                    <el-form-item label="轮播图位置:" prop="carousel_local">
                        <el-select v-model="ruleForm.carousel_local" filterable placeholder="请选择轮播图位置" @change='card_type_change'>
                            <el-option
                                v-for="item in carousel_locals"
                                :key="item.state"
                                :label="item.name"
                                :value="item.state">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="轮播图状态:" prop="carousel_state">
                        <el-switch v-model="ruleForm.carousel_state" active-color="#13ce66" inactive-color="#ccc"> </el-switch>
                    </el-form-item>
                    <el-form-item label="轮播图链接:" prop="carousel_link">
                        <el-input v-model="ruleForm.carousel_link" placeholder="请输入轮播图携带的链接" clearable @change='input_data'></el-input>
                    </el-form-item>
                    <el-form-item label="排序号:" prop="carousel_num">
                        <el-input v-model="ruleForm.carousel_num" placeholder="数字越大越靠前" clearable @change='input_data'></el-input>
                    </el-form-item>
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
                <div v-if="
                    add_data.type == 'business' ||
                    add_data.type == 'store'
                ">
                    <p v-if="add_data.type == 'business' || add_data.type == 'staff'" style="margin-bottom: 20px;">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#iconruzhuchenggongdapx"></use>
                        </svg>
                        <span>填写门店信息</span>
                    </p>
                    
                    <div v-if="add_data.type == 'business' || add_data.type == 'store'">
                        <el-form-item label="门店名称:" prop="club_name">
                            <el-input v-model="ruleForm.club_name" placeholder="请输入门店名称" clearable maxlength="32" show-word-limit @change='input_data'></el-input>
                        </el-form-item>
                        <el-form-item label="门店电话:" prop="tel">
                            <el-input v-model="ruleForm.tel" placeholder="请输入门店电话" clearable @change='input_data'></el-input>
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
                    </div>

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
import axios from '@/assets/api/axios';
//多选
import checkbox_modules from '@/components/checkbox.vue';

@Component({
    components: {
        cropper,
        p_c_a_s,
        baidu_map,
        checkbox_modules
    }
})

export default class add extends Vue{
    @Prop () private add_data !: any;
    
    //表单数据
    private ruleForm: any = {

        //轮播图
        carousel_name: '',
        carousel_local: '',
        carousel_state: true,
        carousel_link: '',
        carousel_num: '',

        //修改密码
        username: '',
        workid: '',
        // origin_password: '',

        //新增角色
        RoleName: '',
        Permission: '',
        DbPermission: '',
        note: '',

        //新增员工
        staff_state: '',
        roleID: '',
        phone: '',
        staff_content: '',
        head: '',

        //新增分润
        share_profit_num: '',
        share_profit_price: '',
        share_profit_time: '',

        //新增优惠券
        name: '',
        coupon_info: '',
        status: false,
        money: '',
        condition: '',
        use_type: '',
        type: [],
        coupon_time: [],
        coupon_time_start: '',
        coupon_time_end: '',

        //新增商品
        goods_name: '',
        shop_price: '',
        cost_price: '',
        card_info: '',
        store_id: '',
        store_id_02: '',
        card_type: '',

        //新增商家/门店
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
    //角色集合
    private staff_roles: any = [];

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

    //轮播图的位置
    private carousel_locals: any = [
        {state: '1', name: 'APP首页banner'},
        {state: '2', name: '开屏页图片'},
        {state: '3', name: '商城首页'},
        {state: '4', name: '淘卡首页'},
    ];

    //验证规则
    private add_rules: object = {

        //轮播图
        carousel_name: [
            { required: true, message: '请输入轮播图名称', trigger: 'blur' },
        ],
        carousel_local: [
            { required: true, message: '请输入选择轮播图位置', trigger: 'change' },
        ],

        staff_name: [
            { required: true, message: '请输入员工账户', trigger: 'blur' },
        ],
        username: [
            { required: true, message: '请输入员工姓名', trigger: 'blur' },
        ],
        staff_num: [
            { required: true, message: '请输入员工工号', trigger: 'blur' },
        ],
        workid: [
            { required: true, message: '请输入员工工号', trigger: 'blur' },
        ],
        // roleID: [
        //     { required: true, message: '请输入员工角色权限', trigger: 'blur' },
        // ],
        // origin_password: [
        //     { required: true, message: '请输入原密码', trigger: 'blur' },
        //     { pattern: /^[\w]{6,16}$/, message: "密码只能由数字或字母构成，且长度为6-16位", trigger: "change" }
        // ],

        name: [
            { required: true, message: '请输入优惠券标题', trigger: 'blur' },
        ],
        money: [
            { required: true, message: '请输入优惠券可抵扣的金额', trigger: 'blur' },
        ],
        condition: [
            { required: true, message: '请输入优惠券的使用门槛，无门槛请填0', trigger: 'blur' },
        ],
        use_type: [
            { required: true, message: '请选择优惠券的使用范围', trigger: 'change' },
        ],
        type: [
            { required: true, message: '请选择优惠券的获得方式', trigger: 'change' },
        ],

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
            { required: true, message: '请输入密码', trigger: 'blur' },
            { pattern: /^[\w]{6,16}$/, message: "密码只能由数字或字母构成，且长度为6-16位", trigger: "change" }
        ],
        re_password: [
            { required: true, message: '请再次输入密码', trigger: 'blur' },
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
        //分润
        share_profit_num: [
            { required: true, message: '请输入分润期数', trigger: 'blur' },
        ],
        share_profit_time: [
            { required: true, message: '请选择分润开始时间', trigger: 'change' },
        ],
        share_profit_price: [
            { required: true, message: '请输入分润总金额', trigger: 'blur' },
        ],
    };

    private is_loading: boolean = false;
    private show_delete_index: any = null;
    
    //全选相关
    private checkbox: any = {
        //全选
        check_all: false,
        //已选择的附加服务
        checked: sessionStorage.getItem('checkbox_checked') ? JSON.parse(sessionStorage.getItem('checkbox_checked')) : [],
        isIndeterminate: true,
        //健身会所提供的服务
        all_serves: [],
        //所有的优惠券获得方式
        all_range: [ { id: 3, name: "健身专用" } ]
    };

    //角色权限全选相关-首页
    private role_home: any = {
        //全选
        check_all: false,
        //已选择的附加服务
        checked: sessionStorage.getItem('checkbox_checked') ? JSON.parse(sessionStorage.getItem('checkbox_checked')) : [],
        isIndeterminate: true,
        //健身会所提供的服务
        all_role_home: [
            {}
        ]
    };
    
    //所有的商家
    private all_business: any = [];
    //所有的门店
    private all_store: any = [];
    //所有的优惠券获得方式
    private all_get_way: any = [ { id: 4, name: "注册" }, { id: 5, name: '购买银卡会籍赠送' } ];
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

    //头像裁剪相关数据
    private head_cropper_data: any = {
        //裁剪参数
        option: {
            img: '',
            fixedBox: true,
            autoCrop: true,
            // 只有自动截图开启 宽度高度才生效
            autoCropWidth: 200,
            autoCropHeight: 200,
            centerBox: true
        },
        is_previews: true,
        //是否开启裁剪
        is_cropper: false,
        //裁剪预览框
        previews: {},
        //标题
        title: "头像裁剪"
    };

    //轮播图裁剪数据
    private carousel_cropper_data: any = {
        //裁剪参数
        option: {
            img: '',
            fixedBox: true,
            autoCrop: true,
            // 只有自动截图开启 宽度高度才生效
            autoCropWidth: 750,
            autoCropHeight: 300,
            centerBox: true
        },
        is_previews: false,
        //是否开启裁剪
        is_cropper: false,
        //裁剪预览框
        previews: {},
        //标题
        title: "轮播图裁剪"
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
        head: ''
    };

    //放大图片
    private dialog_img: any = {
        is_enlarge: false,
        src: ''
    };

    
    //多选模块数据
    private checkbox_home: any = {
        name: '首页',
        options: [
            {id: 20009, name: '展示首页',},
            {id: 20053, name: '查看经营概况',},
            {id: 20056, name: '查看待办事项',},
            {id: 20054, name: '查看酷点',},
            {id: 20055, name: '查看收入趋势',},
        ]
    };
    private checkbox_user: any = {
        name: '用户管理',
        options: [
            {id: 20003, name: '查看用户列表'},
            {id: 20011, name: '查看用户详情'},
            {id: 20012, name: '禁用用户'}
        ]
    };
    private checkbox_business: any = {
        name: '商家管理',
        options: [
            {id: 20004, name: '展示商家管理'},
            {id: 20013, name: '查看商家列表'},
            {id: 20014, name: '新增商家'},
            {id: 20015, name: '查看门店列表'},
            {id: 20016, name: '新增门店'},
            {id: 20017, name: '编辑门店'},
            {id: 20023, name: '禁用/开启门店'},
            {id: 20020, name: '查看商品列表'},
            {id: 20019, name: '新增商品'},
            {id: 20018, name: '编辑商品'},
        ]
    };
    
    private checkbox_order: any = {
        name: '订单管理',
        options: [
            {id: 20007, name: '展示订单管理'},
            {id: 20024, name: '查看转让订单列表'},
            {id: 20025, name: '查看转让订单详情'},
            {id: 20026, name: '修改健身卡信息'},
            {id: 20027, name: '审核转让订单'},
            {id: 20028, name: '新增私教课'},
            {id: 20029, name: '上架私教课'},
            {id: 20030, name: '下架私教课'},
            {id: 20031, name: '查看领用订单列表'},
            {id: 20021, name: '查看服务订单列表'},
            {id: 20022, name: '查看服务订单详情'},
        ]
    };
    
    private checkbox_finance: any = {
        name: '财务管理',
        options: [
            {id: 20005, name: '展示财务管理'},
            {id: 20032, name: '查看提现列表'},
            {id: 20036, name: '查看提现详情'},
            {id: 20033, name: '审核提现/驳回'},
            {id: 20034, name: '设置提现规则'},
            {id: 20035, name: '导出提现excel列表'},
        ]
    };

    private checkbox_share_profit: any = {
        name: '分润',
        options: [
            {id: 20008, name: '展示分润模块'},
            {id: 20051, name: '查看分润详情'},
            {id: 20052, name: '新增分润'},
        ]
    };

    // private checkbox_share_profit: any = {
    //     name: '运营',
    //     options: [
    //         {id: 20002, name: '展示运营模块'},
    //         {id: 20051, name: '查看运营详情'},
    //         {id: 20052, name: '新增运营'},
    //     ]
    // };
    
    private checkbox_set: any = {
        name: '设置',
        options: [
            {id: 20001, name: '展示设置'},
            {id: 20037, name: '查看角色列表'},
            {id: 20038, name: '新增角色'},
            {id: 20039, name: '修改角色'},
            {id: 20040, name: '删除角色'},
            {id: 20041, name: '查看员工列表'},
            {id: 20042, name: '新增员工'},
            {id: 20043, name: '编辑员工'},
            {id: 20044, name: '删除员工'},
            {id: 20045, name: '禁用员工'},
            {id: 20046, name: '修改员工密码'},
        ]
    };
    
    private checkbox_home_already: any = [];
    private checkbox_user_already: any = [];
    private checkbox_business_already: any = [];
    private checkbox_order_already: any = [];
    private checkbox_set_already: any = [];
    private checkbox_share_profit_already: any = [];
    private checkbox_finance_already: any = [];
    
    private final_power: any = [];

    screen_checkbox (val, vals) {
        for (var i = 0; i < vals.length; i++) {
            if (this.final_power.includes(vals[i].id)) {
                var index = this.final_power.indexOf(vals[i].id);
                this.final_power.splice(index, 1);
            };
        };

        var arr = val || [];
        for (var i = 0; i < arr.length; i++) {
            if (!this.final_power.includes(arr[i])) {
                this.final_power.push(arr[i]);
            };
        };
        console.log('选择的权限集合', this.final_power);
    };

    //权限全选
    click_all_home (val) {
        this.screen_checkbox(val, this.checkbox_home.options);
    };
    click_option_home (val) {
        this.screen_checkbox(val, this.checkbox_home.options);
    };
    click_all_user (val) {
        this.screen_checkbox(val, this.checkbox_user.options);
    };
    click_option_user (val) {
        this.screen_checkbox(val, this.checkbox_user.options);
    };
    click_all_business (val) {
        this.screen_checkbox(val, this.checkbox_business.options);
    };
    click_option_business (val) {
        this.screen_checkbox(val, this.checkbox_business.options);
    };
    click_all_order (val) {
        this.screen_checkbox(val, this.checkbox_order.options);
    };
    click_option_order (val) {
        this.screen_checkbox(val, this.checkbox_order.options);
    };
    click_all_finance (val) {
        this.screen_checkbox(val, this.checkbox_finance.options);
    };
    click_option_finance (val) {
        this.screen_checkbox(val, this.checkbox_finance.options);
    };
    click_all_set (val) {
        this.screen_checkbox(val, this.checkbox_set.options);
    };
    click_option_set (val) {
        this.screen_checkbox(val, this.checkbox_set.options);
    };
    click_all_share_profit (val) {
        this.screen_checkbox(val, this.checkbox_share_profit.options);
    };
    click_option_share_profit (val) {
        this.screen_checkbox(val, this.checkbox_share_profit.options);
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
    //新增优惠券选择获得方式
    coupon_get_way_change (val) {
        this.ruleForm.type = val;
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

    //全选相关-优惠券
    handleCheckAllChange_coupon(val) {
        var that: any = this;
        if (val) {
            this.ruleForm.use_type = [];
            for (var i = 0; i < this.checkbox.all_range.length; i++) {
                this.ruleForm.use_type.push(this.checkbox.all_range[i].id);
            };
        }else {
            this.ruleForm.use_type = [];
        };
        this.checkbox.checked = this.ruleForm.use_type;
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

    handleCheckedCitiesChange_coupon(value) {
        var that: any = this;
        let checkedCount = value.length;
        this.checkbox.check_all = checkedCount === this.checkbox.all_range.length;
        this.checkbox.isIndeterminate = checkedCount > 0 && checkedCount < this.checkbox.all_range.length;
        this.ruleForm.use_type = value;
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

    //选择优惠券的截至时间
    select_coupon_time (time) {
        var that: any = this;
        if (time) {
            this.ruleForm.coupon_time = time;
            this.ruleForm.coupon_time_start = time[0].getTime() / 1000;
            this.ruleForm.coupon_time_end = time[1].getTime() / 1000;
        }else {
            this.ruleForm.coupon_time = [];
            this.ruleForm.coupon_time_start = 0;
            this.ruleForm.coupon_time_end = 0;
            //验证
            let ref: any = that.$refs.ruleForm;
            ref.validate();
        };
    };

    //选择分润开始的时间
    change_share_profit_time (time) {
        this.ruleForm.share_profit_time = this.$moment(time).valueOf();
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
            that.show_cropper.head = '';
            that.show_cropper.store = [];
            that.ruleForm.province = '';
            that.ruleForm.city = '';
            that.ruleForm.area = '';
            that.ruleForm.street = '';
            that.ruleForm.business_time = [];
            that.ruleForm.coupon_time = [];
            that.checkbox.checked = [];
            that.ruleForm.club_facil = [];
            that.ruleForm.shop_image = [];
            sessionStorage.removeItem('show_license');
            sessionStorage.removeItem('head');
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

    //上传头像
    upload_change_head(file) {
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
            that.head_cropper_data.option.img = URL.createObjectURL(file.raw);
            that.carousel_cropper_data.option.img = URL.createObjectURL(file.raw);
            that.startCrop_head();
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
    startCrop_head() {
        var that: any = this;
        that.head_cropper_data.is_cropper = true;
        that.carousel_cropper_data.is_cropper = true;
    };
    startCrop_store() {
        var that: any = this;
        that.store_cropper_data.is_cropper = true;
    };
    //取消裁剪
    cancel_crop () {
        var that: any = this;
        that.license_cropper_data.is_cropper = false;
        that.head_cropper_data.is_cropper = false;
        that.carousel_cropper_data.is_cropper = false;
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

    //完成头像裁剪
    com_crop_staff (img, data) {
        var that: any = this;
        var send_data: any = new FormData();
        send_data.append("pic", img);
        axios.post( "/api/uppic", send_data).then( (res: any) => {
            console.log('上传图片', res);
            that.show_cropper.head = res.data.pic;
            sessionStorage.setItem('head', res.data.pic);
            that.ruleForm.head = res.data.pic;
            that.head_cropper_data.is_cropper = false;
            that.carousel_cropper_data.is_cropper = false;
            sessionStorage.setItem('add_form_data', JSON.stringify(that.ruleForm));
        }).catch( error => {
            //返回error给调起dispatch的那边
            console.log(error);
        });
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
        //获取所有角色权限
        if (this.add_data.type == "staff") {
            var send_data = { page : 1, size: 20 };
            this.$store.dispatch("role_list", send_data).then( (res: any) => {
                console.log("角色权限", res);
                if (res.code == 0 || res.status == 1) {
                    this.staff_roles = res.data;
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
            //获取优惠券信息
            if (this.add_data.type == "coupon") {
                this.ruleForm.status = this.ruleForm.status == '有效' ? true : false;
                var item = this.ruleForm.use_type == '健身专用' ? 3 : '';
                var arr = [];
                arr.push(item);
                this.checkbox.checked = arr;
                this.ruleForm.use_type = item;
                this.ruleForm.coupon_time = [];
                this.ruleForm.coupon_time[0] = this.ruleForm.use_start_time * 1000;
                this.ruleForm.coupon_time[1] = this.$moment(this.ruleForm.use_end_time).valueOf();
                console.log(this.ruleForm.coupon_time);
            };
            //获取员工信息
            if (this.ruleForm.username) {
                this.show_cropper.head = this.ruleForm.head;
                this.ruleForm.staff_content = this.ruleForm.content;
            };
            //获取用户的权限信息
            var arr_power = this.ruleForm.Permission ? this.ruleForm.Permission.split(',') : '';
            var length = arr_power.length;
            for (var i = 0; i < length; i++) {
                var str = arr_power[i];
                arr_power[i] = parseInt(str);
            };
            
            this.checkbox_home_already = arr_power;
            this.checkbox_user_already = arr_power;
            this.checkbox_business_already = arr_power;
            this.checkbox_order_already = arr_power;
            this.checkbox_set_already = arr_power;
            this.checkbox_share_profit_already = arr_power;
            this.checkbox_finance_already = arr_power;
            // console.log('this.ruleForm.Permission', this.ruleForm.Permission);
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
                        // var src = this.$store.state.business.domain02 + init_img[i];
                        var src = init_img[i];
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
                sessionStorage.setItem('add_form_data', JSON.stringify(this.ruleForm));
            }else {
                //保存的营业执照
                this.ruleForm.image = sessionStorage.getItem('show_license') ? this.dataURLtoFile(sessionStorage.getItem('show_license'), "image") : '';
                this.ruleForm.head = sessionStorage.getItem('head') ? sessionStorage.getItem('head') : '';
                this.show_cropper.license = sessionStorage.getItem('show_license') || '';
                this.show_cropper.head = sessionStorage.getItem('head') || '';
                //保存的门店图片
                this.show_cropper.store = sessionStorage.getItem('show_store') ? JSON.parse(sessionStorage.getItem('show_store')) : [];
                var length = this.show_cropper.store.length;
                this.ruleForm.shop_image = [];
                for (var i = 0; i < length; i++) {
                    this.ruleForm.shop_image.push(this.dataURLtoFile(this.show_cropper.store[i], "shop_image[]"));
                };
            };
        };
    };

    roleID_change () {

    };

    //新增
    add_submit() {
        //不这样定义any类型 typescript解释器就会报错
        let ref: any = this.$refs.ruleForm;
        ref.validate((valid: boolean) => {
            if (valid) {
                //新增员工的状态
                this.ruleForm.staff_state = this.ruleForm.staff_state ? this.ruleForm.staff_state : true;
                var open_time = this.ruleForm.open_time;
                var close_time = this.ruleForm.close_time;
                this.ruleForm.open_time = !open_time ? "08:00" : this.$moment(open_time).format('HH:mm');
                this.ruleForm.close_time = !close_time ? "23:00" : this.$moment(close_time).format('HH:mm');
                var j_w = JSON.parse(sessionStorage.getItem('j_w'));
                this.ruleForm.lat = j_w ? j_w.lat : '';
                this.ruleForm.lng = j_w ? j_w.lng : '';
                this.ruleForm.store_id_02 = this.$route.query.store_id ? this.$route.query.store_id : '';
                console.log("ruleForm", this.ruleForm);
                sessionStorage.setItem('add_form_data', JSON.stringify(this.ruleForm));
                this.is_loading = true;
                //新增角色的权限集合
                if (this.final_power.length == 0 && this.$route.query.RoleId) {
                    if (sessionStorage.getItem('add_form_data')) {
                        var arr_power = JSON.parse(sessionStorage.getItem('add_form_data')).Permission.split(',')
                        this.ruleForm.Permission = arr_power.join(",");
                    }else {
                        this.ruleForm.Permission = '';
                    };
                }else {
                    this.ruleForm.Permission = this.final_power.join(",");
                };
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
        .staff_head {
            border-radius: 50%;
        }
        #head_img .el-upload-dragger {
            width: 200px;
            height: 200px;
        }
        #carousel_img {
            width: 375px;
            height: 150px;
        }
        #carousel_img .el-upload-dragger {
            width: 375px;
            height: 150px;
        }
        #carousel_img .staff_head {
            border-radius: 0;
        }
        .add .el-form-item__content {
            line-height: 56px;
        }
        .add .el-checkbox {
            margin-right: 20px;
        }
        .add .el-checkbox.is-bordered {
            width: 175px;
            text-align: center;
        }
    }
</style>