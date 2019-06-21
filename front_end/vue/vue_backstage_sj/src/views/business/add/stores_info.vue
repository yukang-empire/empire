<template>
    <div class="stores_info">
        <div class="repeat_div">
            <p>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-ruzhuchenggongdapx"></use>
                </svg>
                <span>新增门店</span>
            </p>
            <div class="business_write">
                <div class="top_nav">
                    <router-link tag="div" to="/business/xzsj/sjtx" class="flat" style="cursor: pointer;">
                        <span>商家信息</span>
                        <div class="right"></div>
                    </router-link>
                    <!-- <div class="flat" style="cursor: pointer;">
                        <span>商家信息</span>
                        <div class="right"></div>
                    </div> -->
                    <div class="flat tip tip02">
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
                        <span>门店名称：</span>
                        <el-input
                            placeholder="请输入门店名称"
                            v-model="form.club_name"
                            clearable>
                        </el-input>
                    </div>
                    <div class="item">
                        <span>所在地区：</span>
                        <el-select v-model="form.province" filterable placeholder="请选择省份" class="pcas" @change='change_p'>
                            <el-option
                                v-for="item in pcas.p"
                                :key="item.name"
                                :label="item.name"
                                :value="item.name">
                            </el-option>
                        </el-select>
                        <el-select v-model="form.city" filterable placeholder="请选择城市" class="pcas" @change='change_c'>
                            <el-option
                                v-for="item in pcas.c"
                                :key="item.name"
                                :label="item.name"
                                :value="item.name">
                            </el-option>
                        </el-select>
                        <el-select v-model="form.area" filterable placeholder="请选择区" class="pcas" @change='change_a'>
                            <el-option
                                v-for="item in pcas.a"
                                :key="item.name"
                                :label="item.name"
                                :value="item.name">
                            </el-option>
                        </el-select>
                        <el-select v-model="form.street" filterable placeholder="请选择街道" class="pcas" @change='change_s'>
                            <el-option
                                v-for="item in pcas.s"
                                :key="item.name"
                                :label="item.name"
                                :value="item.name">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="item">
                        <span>详细地址：</span>
                        <el-input
                            placeholder="请输入详细地址"
                            v-model="form.address"
                            clearable>
                        </el-input>
                    </div>
                    <div class="item">
                        <span>门店电话：</span>
                        <el-input
                            placeholder="请输入门店电话"
                            v-model="form.tel"
                            clearable>
                        </el-input>
                    </div>
                    <!-- <div class="item">
                        <span>地图定位：</span>
                        
                    </div> -->
                    <div class="item">
                        <span>营业时间：</span>
                        <el-time-picker
                            is-range
                            v-model="init_time"
                            range-separator="至"
                            start-placeholder="开始时间"
                            end-placeholder="结束时间"
                            @change='com_time'
                            placeholder="选择时间范围">
                        </el-time-picker>
                    </div>
                    <div class="item">
                        <span>可提供的附加服务：</span>
                        <div class="serves">
                            <el-checkbox :indeterminate="checkbox.isIndeterminate" v-model="checkbox.check_all" @change="handleCheckAllChange">全选</el-checkbox>
                            <el-checkbox-group v-model="checkbox.checked" @change="handleCheckedCitiesChange">
                                <el-checkbox v-for="item in checkbox.all_serves" :label="item.id" :key="item.id" border>{{ item.name }}</el-checkbox>
                            </el-checkbox-group>
                        </div>
                    </div>
                    <div class="item">
                        <div style="width: 130px;text-align: right;margin-right: 10px;">
                            <p>门店环境照片：</p>
                            <p style="text-align: center;">(5张以内)</p>
                        </div>
                        <el-upload
                            action="https://shop.technologyle.com/index.php?m=Api&c=User&a=add_club"
                            list-type="picture-card"
                            :auto-upload='true'
                            :limit='5'
                            :on-preview="handlePictureCardPreview"
                            :before-upload='beforeAvatarUpload'
                            :on-success='handleAvatarSuccess'
                            :on-remove="handleRemove">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <!-- <el-dialog :visible.sync="pic.dialogVisible" class="test002">
                            <img style="width: 100%" :src="pic.dialogImageUrl" alt="">
                        </el-dialog> -->
                    </div>
                    <div class="item">
                        <span>门店介绍：</span>
                        <el-input
                            type="textarea"
                            :rows="4"
                            maxlength="300"
                            show-word-limit
                            placeholder="请输入门店介绍"
                            v-model="form.content">
                        </el-input>
                    </div>
                </div>

                <div class="btn flex_center">
                    <el-button type="primary" @click='submit_data'>提交</el-button>
                    <el-button type="info" @click='cancel'>取消</el-button>
                </div>
                
            </div>
        </div>

        <!-- 弹框 -->
        <dialog_component :dialog='dialog' @off_dialog='off_dialog' />
    </div>
</template>

<script>
import { VueCropper }  from 'vue-cropper';
//省-市-区-街道数据
import pcas from '@/common/api/pcas.js';
import dialog_component from '@/common/components/dialog';

export default {
    name: 'stores_info',
    components: {
        VueCropper,
        dialog_component
    },
    data () {
        return {
            //弹框
            dialog: {
                is_open: false,
                msg: '',
                type: 0,
            },
            //省-市-区-街道数据
            pcas: {
                p: [],
                c: [],
                a: [],
                s: []
            },
            form: {
                realname: '',
                mobile: '',
                password: '',
                re_password: '',
                tel: '',
                image: '',
                club_name: '',
                province: '',
                city: '',
                area: '',
                street: '',
                address: '',
                lng: '',
                lat: '',
                open_time: '',
                close_time: '',
                club_facil: [],
                shop_image: [],
                content: '',
            },
            //默认时间
            init_time: [new Date(2019, 6, 6, 8), new Date(2019, 6, 6, 22)],
            pic: {
                dialogImageUrl: '',
                dialogVisible: false
            },
            checkbox: {
                //全选
                check_all: false,
                checked: sessionStorage.getItem('form') ? JSON.parse(sessionStorage.getItem('form')).club_facil : [],
                isIndeterminate: true,
                //健身会所提供的服务
                all_serves: [],
            }

        }
    },
    methods: {
        //上传营业执照相关
        handleAvatarSuccess(res, file) {
            // this.form.shop_image.push(URL.createObjectURL(file.raw));
            this.form.shop_image.push(file.raw);
            console.log(file);
            console.log(this.form.shop_image);
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
        handleRemove(file, fileList) {
            // console.log(file, fileList);
            this.form.shop_image.pop(URL.createObjectURL(file.raw));
            console.log(this.form.shop_image);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
            console.log(file);
        },
        //全选相关
        handleCheckAllChange(val) {
            if (val) {
                this.form.club_facil = [];
                for (var i = 0; i < this.checkbox.all_serves.length; i++) {
                    this.form.club_facil.push(this.checkbox.all_serves[i].id);
                };
            }else {
                this.form.club_facil = [];
            };
            this.checkbox.checked = this.form.club_facil;
            this.checkbox.isIndeterminate = false;
            console.log(this.form.club_facil);
        },
        handleCheckedCitiesChange(value) {
            let checkedCount = value.length;
            this.checkbox.check_all = checkedCount === this.checkbox.all_serves.length;
            this.checkbox.isIndeterminate = checkedCount > 0 && checkedCount < this.checkbox.all_serves.length;
            this.form.club_facil = value;
            console.log(this.form.club_facil);
        },
        com_time (time) {
            sessionStorage.setItem('init_time', JSON.stringify(time));
            this.form.open_time = this.$moment(time[0]).format('HH:mm');
            this.form.close_time = this.$moment(time[1]).format('HH:mm');
        },
        //接收子组件事件 关闭dialog弹框
        off_dialog () {
            this.dialog.is_open = false;
            this.$router.push({ path: '/business/sjlb/lbxq' });
        },
        //打开dialog弹框
        is_dialog (info) {
            //打开遮罩
            this.dialog.is_open = true;
            this.dialog.msg = info;
        },
        submit_data () {
            this.form.image = '';
            this.form.token = sessionStorage.getItem('token');
            if (!this.form.open_time) {
                var time1 = JSON.parse(sessionStorage.getItem('init_time'))[0];
                this.form.open_time = this.$moment(time1).format('HH:mm');
            };
            if (!this.form.close_time) {
                var time2 = JSON.parse(sessionStorage.getItem('init_time'))[1];
                this.form.open_time = this.$moment(time2).format('HH:mm');
            };
            sessionStorage.setItem('form', JSON.stringify(this.form));
            console.log("form", this.form);
            var params = new FormData();
            // formData.append('shop_image', this.form.shop_image[0]);
            // console.log("formData", formData);
            params.append("address", this.form.address);
            params.append("area", this.form.area);
            params.append("city", this.form.city);
            params.append("close_time", this.form.close_time);
            params.append("club_facil", this.form.club_facil);
            params.append("club_name", this.form.club_name);
            params.append("content", this.form.content);
            params.append("image", this.form.image);
            params.append("lat", this.form.lat);
            params.append("lng", this.form.lng);
            params.append("mobile", this.form.mobile);
            params.append("open_time", this.form.open_time);
            params.append("password", this.form.password);
            params.append("province", this.form.province);
            // params.append("shop_image[]", this.form.shop_image);
            this.form.shop_image.forEach(file => {
                params.append("shop_image[]", file);
            });
            params.append("realname", this.form.realname);
            params.append("street", this.form.street);
            params.append("tel", this.form.tel);
            params.append("token", this.form.token);
            this.$axios.post(this.$store.state.domain02 + '/index.php?m=Api&c=User&a=add_club', params).then(response => {
                console.log("新增商家门店", response);
                
            });
        },
        cancel () {
            this.form = {
                realname: '',
                mobile: '',
                password: '',
                re_password: '',
                tel: '',
                image: '',
                club_name: '',
                province: '',
                city: '',
                area: '',
                street: '',
                address: '',
                lng: '',
                lat: '',
                open_time: '',
                close_time: '',
                club_facil: [],
                shop_image: [],
                content: '',
            };
            this.checkbox.checked = []
        },
        //改变省份 筛选市
        change_p () {
            //改变前先清空
            this.form.city = '';
            this.form.area = '';
            this.form.street = '';
            //提取长度出来 提高性能
            var p_length = this.pcas.p.length;
            for (var i = 0; i < p_length; i ++) {
                //匹配省份
                if (this.pcas.p[i].name == this.form.province) {
                    this.pcas.c = this.pcas.p[i].children;
                };
            };
            //填入详细地址栏里
            // this.form.address = this.form.province;
        },
        //改变市 筛选区
        change_c () {
            this.form.area = '';
            this.form.street = '';
            var c_length = this.pcas.c.length;
            for (var i = 0; i < c_length; i ++) {
                if (this.pcas.c[i].name == this.form.city) {
                    this.pcas.a = this.pcas.c[i].children;
                };
            };
            // this.form.address = this.form.province + this.form.city;
        },
        //改变区 筛选街道
        change_a () {
            this.form.street = '';
            var a_length = this.pcas.a.length;
            for (var i = 0; i < a_length; i ++) {
                if (this.pcas.a[i].name == this.form.area) {
                    this.pcas.s = this.pcas.a[i].children;
                };
            };
            // this.form.address = this.form.province + this.form.city + this.form.area;
        },
        //选择街道
        change_s () {
            var s_length = this.pcas.s.length;
            for (var i = 0; i < s_length; i ++) {
                if (this.pcas.p[i].name == this.form.province) {
                    
                };
            };
            // this.form.address = this.form.province + this.form.city + this.form.area + this.form.street;
        },
    },
    mounted () {
        //省
        this.pcas.p = pcas;
        // console.log(this.pcas.p);
        this.$axios.get(this.$store.state.domain02 + '/index.php?m=Api&c=User&a=club_facil').then(response => {
            console.log("附加服务", response);
            var res = response.data;
            this.checkbox.all_serves = res.result;
        });
        if (sessionStorage.getItem('form')) {
            this.form = JSON.parse(sessionStorage.getItem('form'));
            this.form.shop_image = [];
        };
        if (sessionStorage.getItem('init_time')) {
            this.init_time = JSON.parse(sessionStorage.getItem('init_time'));
        };
    }
}
</script>

<style>
    .item .el-input__inner, .item .el-input {
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
    .el-textarea__inner {
        padding: 15px 20px;
        text-align: justify;
    }
    .pcas .el-input, .pcas .el-input--suffix .el-input__inner{
        width: 160px;
        margin-right: 15px;
        font-size: 0.8rem;
    }
    .el-icon-zoom-in {
        display: none;
    }
</style>

<style lang='scss' scoped>
    .el-textarea {
        width: 500px;
    }
    .item .serves {
        display: flex;
        align-items: center;

        .el-checkbox.is-bordered {
            margin: 10px;
        }
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
        padding: 40px 15px 20px 30px;
        color: #333;
    }
    .item {
        display: flex;
        align-items: center;
        margin: 20px 0;

        span {
            white-space: nowrap;
            margin-right: 8px;
            min-width: 130px;
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
        .tip02 {
            background-color: $succ;

            .right {
                border-color: transparent transparent transparent $succ;
            }
        }
    }
    
    @media screen and (min-width: 769px) {
        
    }
</style>