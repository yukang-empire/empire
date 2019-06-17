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
                    <div class="flat">
                        <span>商家信息</span>
                        <!-- 箭头 -->
                        <div class="right"></div>
                    </div>
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
                            v-model="form.name"
                            clearable>
                        </el-input>
                    </div>
                    <div class="item">
                        <span>所在地区：</span>
                        <el-select v-model="form.p" filterable placeholder="请选择省份" class="pcas" @change='change_p'>
                            <el-option
                                v-for="item in pcas.p"
                                :key="item.name"
                                :label="item.name"
                                :value="item.name">
                            </el-option>
                        </el-select>
                        <el-select v-model="form.c" filterable placeholder="请选择城市" class="pcas" @change='change_c'>
                            <el-option
                                v-for="item in pcas.c"
                                :key="item.name"
                                :label="item.name"
                                :value="item.name">
                            </el-option>
                        </el-select>
                        <el-select v-model="form.a" filterable placeholder="请选择区" class="pcas" @change='change_a'>
                            <el-option
                                v-for="item in pcas.a"
                                :key="item.name"
                                :label="item.name"
                                :value="item.name">
                            </el-option>
                        </el-select>
                        <el-select v-model="form.s" filterable placeholder="请选择街道" class="pcas" @change='change_s'>
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
                    <!-- <div class="item">
                        <span>地图定位：</span>
                        
                    </div> -->
                    <div class="item">
                        <span>营业时间：</span>
                        <el-time-picker
                            is-range
                            v-model="form.time"
                            range-separator="至"
                            start-placeholder="开始时间"
                            end-placeholder="结束时间"
                            @blur='com_time'
                            placeholder="选择时间范围">
                        </el-time-picker>
                    </div>
                    <div class="item">
                        <span>可提供的附加服务：</span>
                        <div class="serves">
                            <el-checkbox :indeterminate="form.isIndeterminate" v-model="form.check_all" @change="handleCheckAllChange">全选</el-checkbox>
                            <el-checkbox-group v-model="form.checked" @change="handleCheckedCitiesChange">
                                <el-checkbox v-for="item in form.all_serves" :label="item" :key="item" border>{{ item }}</el-checkbox>
                            </el-checkbox-group>
                        </div>
                    </div>
                    <div class="item">
                        <div style="width: 130px;text-align: right;margin-right: 10px;">
                            <p>门店环境照片：</p>
                            <p style="text-align: center;">(5张以内)</p>
                        </div>
                        <el-upload
                            action=""
                            list-type="picture-card"
                            :auto-upload='false'
                            :limit='5'
                            :on-preview="handlePictureCardPreview"
                            :before-upload='beforeAvatarUpload'
                            :on-success='handleAvatarSuccess'
                            :on-remove="handleRemove">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="form.pic.dialogVisible">
                            <img width="100%" :src="form.pic.dialogImageUrl" alt="">
                        </el-dialog>
                    </div>
                    <div class="item">
                        <span>门店介绍：</span>
                        <el-input
                            type="textarea"
                            :rows="4"
                            maxlength="300"
                            show-word-limit
                            placeholder="请输入门店介绍"
                            v-model="form.textarea">
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
                name: '',
                p: '',
                c: '',
                a: '',
                s: '',
                address: '',
                location: '',
                //默认时间
                time: [new Date(2019, 6, 6, 8), new Date(2019, 6, 6, 22)],
                //健身会所提供的服务
                all_serves: ['跑步机', '举重', '瑜伽', '洗浴', '充电宝', '数据线', '抽烟区' ],
                //全选
                check_all: false,
                checked: ['跑步机', '举重'],
                isIndeterminate: true,
                serves: [],
                pic: {
                    dialogImageUrl: '',
                    dialogVisible: false
                },
                textarea: '',
            },
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
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
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
        com_time () {
            console.log(this.form.time);
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
            this.is_dialog('提交成功！');
        },
        cancel () {
            this.form = {
                name: '',
                p: '',
                c: '',
                a: '',
                s: '',
                address: '',
                location: '',
                time: '',
                serves: [],
                pic: '',
                textarea: '',
            }
        },
        //改变省份 筛选市
        change_p () {
            //改变前先清空
            this.form.c = '';
            this.form.a = '';
            this.form.s = '';
            //提取长度出来 提高性能
            var p_length = this.pcas.p.length;
            for (var i = 0; i < p_length; i ++) {
                //匹配省份
                if (this.pcas.p[i].name == this.form.p) {
                    this.pcas.c = this.pcas.p[i].children;
                };
            };
            //填入详细地址栏里
            this.form.address = this.form.p;
        },
        //改变市 筛选区
        change_c () {
            this.form.a = '';
            this.form.s = '';
            var c_length = this.pcas.c.length;
            for (var i = 0; i < c_length; i ++) {
                if (this.pcas.c[i].name == this.form.c) {
                    this.pcas.a = this.pcas.c[i].children;
                };
            };
            this.form.address = this.form.p + this.form.c;
        },
        //改变区 筛选街道
        change_a () {
            this.form.s = '';
            var a_length = this.pcas.a.length;
            for (var i = 0; i < a_length; i ++) {
                if (this.pcas.a[i].name == this.form.a) {
                    this.pcas.s = this.pcas.a[i].children;
                };
            };
            this.form.address = this.form.p + this.form.c + this.form.a;
        },
        //选择街道
        change_s () {
            var s_length = this.pcas.s.length;
            for (var i = 0; i < s_length; i ++) {
                if (this.pcas.p[i].name == this.form.p) {
                    
                };
            };
            this.form.address = this.form.p + this.form.c + this.form.a + this.form.s;
        },
    },
    mounted () {
        //省
        this.pcas.p = pcas;
        // console.log(this.pcas.p);
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