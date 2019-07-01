<template>
    <div class="cropper fixed_top">
        <div class="main flex_center">
            <svg class="icon" aria-hidden="true" @click="cancel_crop">
                <use xlink:href="#iconchahao"></use>
            </svg>
            <h2>{{ cropper_data.title }}</h2>
            <!-- 裁剪框 -->
            <div class="img flex_center">
                <vue-cropper
                    ref="cropper"
                    :img="cropper_data.option.img"
                    :fixed-box="cropper_data.option.fixedBox"
                    :auto-crop="cropper_data.option.autoCrop"
                    :auto-crop-width="cropper_data.option.autoCropWidth"
                    :auto-crop-height="cropper_data.option.autoCropHeight"
                    :center-box="cropper_data.option.centerBox"
                    @real-time="realTime">
                </vue-cropper>

                <!-- 裁剪预览框 -->
                <div class="right flex_center">
                    <div class="show-preview square" :style="{'width': cropper_data.previews.w + 'px', 'height': cropper_data.previews.h + 'px',  'overflow': 'hidden'}">
                        <div :style="cropper_data.previews.div">
                            <img :src="cropper_data.previews.url" :style="cropper_data.previews.img">
                        </div>
                    </div>
                    <div class="show-preview circle" :style="{'overflow': 'hidden'}">
                        <div :style="cropper_data.previews.div">
                            <img :src="cropper_data.previews.url" :style="cropper_data.previews.img">
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
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
//裁剪插件官网 https://www.npmjs.com/package/vue-cropper/v/0.4.7
import { VueCropper } from 'vue-cropper';

@Component({
    components: {
        VueCropper
    }
})

export default class cropper extends Vue{
    @Prop () private cropper_data !: any;

    //开始裁剪图片
    startCrop() {
        this.$emit("startCrop");
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
        this.$emit("cancel_crop");
    };
    //完成裁剪
    com_crop(type) {
        var that: any = this;
        if (type === 'blob') {
            that.$refs.cropper.getCropBlob((data) => {
                console.log('blob格式图片', data);
                var img = window.URL.createObjectURL(data);
                that.$emit("com_crop", img);
            });
        } else {
            //base 64
            that.$refs.cropper.getCropData((data) => {
                // console.log(data);
                var img = that.convertBase64UrlToBlob(data);
                // console.log("base64转成file文件", img);
                that.$emit("com_crop", img, data);
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
        };
        return new Blob([ab], { type: 'image/jpeg' });
    };
}

</script>

<style lang="scss">

    @media screen and (min-width: 769px) {
        
    }
</style>