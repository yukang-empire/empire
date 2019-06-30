<template>
    <div class="cropper fixed_top">
        <h2>图片裁剪</h2>
        <div class="main">
            <!-- 裁剪框 -->
            <vue-cropper
                :img="cropper_data.option.img"
                :output-size="cropper_data.option.size"
                :output-type="cropper_data.option.outputType"
                :info="true"
                :full="cropper_data.option.full"
                :can-move="cropper_data.option.canMove"
                :can-move-box="cropper_data.option.canMoveBox"
                :fixed-box="cropper_data.option.fixedBox"
                :original="cropper_data.option.original"
                :auto-crop="cropper_data.option.autoCrop"
                :auto-crop-width="cropper_data.option.autoCropWidth"
                :auto-crop-height="cropper_data.option.autoCropHeight"
                :center-box="cropper_data.option.centerBox"
                :high="cropper_data.option.high"
                @real-time="realTime">
            </vue-cropper>

            <!-- 裁剪预览框 -->
            <div class="right">
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
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
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
        this.$emit("realTime");
    };
    //放大缩小
    changeScale(num) {
        this.$emit("changeScale", num);
    };
    //旋转
    rotateLeft() {
        this.$emit("rotateLeft");
    };
    rotateRight() {
        this.$emit("rotateRight");
    };
    //取消裁剪
    cancel_crop () {
        this.$emit("cancel_crop");
    };
    //完成裁剪
    com_crop(type) {
        this.$emit("com_crop", type);
    };
}

</script>

<style lang="scss">

    @media screen and (min-width: 769px) {
        
    }
</style>