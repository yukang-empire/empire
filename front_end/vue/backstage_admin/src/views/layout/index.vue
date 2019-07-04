<template>
    <div class="layout full">
        <c_header />
        <div class='footer full'>
            <c_aside />
            <c_main />
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
//引入文件夹的话 需要此文件夹里有一个ts文件 里面注入所有需要引入的vue组件
import { c_header, c_aside, c_main } from './component';

@Component({
    components: {
        c_header,
        c_aside,
        c_main
    }
})

export default class layout extends Vue{

    created () {
        //修改body背景色
        document.getElementsByTagName('body')[0].style.backgroundColor = '#fff';
    }
}

</script>

<style lang="scss">

    .el-submenu .el-menu-item {
        background-color: $bg !important;
    }
    .el-submenu .el-menu-item:hover {
        background-color: rgba(38, 52, 69, 1) !important;
    }

    @media screen and (min-width: 769px) {

        .copy_table {

            li {
                margin: 0 0 10px 12px;

                span {
                    display: inline;
                    min-width: 85px;
                    text-align: center;
                }

                span:last-of-type {
                    text-align: right;
                }
            }

            li:first-of-type {
                font-weight: 900;
                color: #333;
                font-size: 0.95rem;

                span:last-of-type {
                    text-align: right;
                }
            }
        }

        /* 订单详情 */
        .order_info {

            .state {
                margin-left: 20px;
                display: flex;
                align-items: center;
                font-size: 1.1rem;
                margin-bottom: 10px;

                i {
                    font-size: 1.5rem;
                    margin-right: 5px;
                }

                span {
                    color: $succ;
                    font-weight: 900;
                    margin-left: 3px;
                }
            }

            .base {

                li {
                    width: 85%;
                    margin:0 0 10px 0;
                    
                    p {

                        span:nth-of-type(1) {
                            color: #333;
                            min-width: 97px;
                            display: inline-block;
                            text-align: right;
                        }

                        ul {
                            display: flex;
                            align-items: center;
                            flex-wrap: wrap;

                            li {
                                width: 150px;
                                margin: 0;
                                
                                img {
                                    width: 100%;
                                    cursor: pointer;
                                }
                            }
                        }
                    }
                }

                li.imgs {
                    margin: 0;

                    p {
                        display: flex;
                        align-items: center;
                    }
                }
            }

            .goods {
                text-align: right;
                width: 98%;

                .el-table th, .el-table td {
                    text-align: right;
                }
                
                p {
                    margin: 5px 0;

                    span:nth-of-type(1) {
                        color: #333;
                        min-width: 97px;
                        display: inline-block;
                        text-align: right;
                    }
                }

                h3 {
                    margin: 20px 0 0 0;
                    font-size: 0.95rem;
                    color: red;
                }
            }
        }
        
        .el-table__empty-block {
            width: 100% !important;
        }
        /* 裁剪图片 */
        .cropper {
            height: 100%;
            color: #333;
            background-color: rgba(0, 0, 0, 0.6);

            h2 {
                font-size: 1.6rem;
                letter-spacing: 2px;
                margin-bottom: 25px;
            }

            .main {
                flex-direction: column;
                padding: 30px 0 60px 0;
                margin: 80px auto 0 auto;
                border-radius: 10px;
                background-color: #f7f7f7;
                position: relative;
                width: 1100px;

                &>.icon {
                    position: absolute;
                    right: 1px;
                    top: 10px;
                    width: 1.3rem;
                    height: 1.3rem;
                    color: #ccc;
                }

                .img {
                    width: 1000px;
                    margin-left: 35px;
                    height: 480px;

                    .vue-cropper {
                        width: 70%;
                        margin-right: 5%;
                        border-radius: 10px;
                    }
                    
                    .right {
                        height: 100%;
                        flex-direction: column;
                        
                        .square {
                            margin-bottom: 15px;
                        }

                        .circle {
                            width: 230px;
                            height: 230px;
                            border-radius: 50%;
                        }
                    }
                }

                .func_btn {
                    margin: 30px 0 10px 0;

                    .el-button {
                        margin-right: 10px;
                        margin-top: 10px;
                    }
                }

                .final {
                    button {
                        margin-left: 60px;
                    }
                }
            }
        }
        
        .add_btn {
            margin-top: 6px;
        }

        /* 添加 */
        .add {

            .el-input__inner {
                width: 450px;
            }
            .el-form-item {
                margin-left: 10%;
                margin-bottom: 26px;
                position: relative;
                display: flex;
                align-items: center;

                .bottom_tip {
                    position: absolute;
                    left: -87px;
                    top: 52%;
                }
            }
            .el-form-item.btn {
                display: block;
            }
            .el-button {
                margin: 30px 50px 0 0;
                width: 100px;
            }
            .el-form-item__label {
                min-width: 110px;
            }
            .el-form-item__error {
                width: 100%;
                top: 101%;
            }
            .el-input {
                width: 450px;
            }
            .el-form-item__content {
                justify-content: unset;
                flex-wrap: wrap;
            }
            #license_img {
                height: 200px;
            }
            .btn .el-form-item__content {
                justify-content: center;
            }
            .el-textarea {
                width: 450px;
            }
            .el-textarea__inner {
                padding: 10px 15px;
            }
            .el-select {

                &>.el-input {
                    width: 165px;

                    .el-input__inner {
                        width: 100%;
                        text-align: center;
                    }
                }
            }
            .el-select {
                margin-right: 20px;
            }
            .el-checkbox {
                margin-right: 10px;
            }
            .el-checkbox.is-bordered+.el-checkbox.is-bordered {
                margin-left: 0;
                margin-top: 12px;
            }
            .el-checkbox.is-bordered {
                width: 100px;
            }
            .el-upload--picture-card {
                width: 300px;
                height: 200px;
            }
            .el-upload-list--picture-card .el-upload-list__item {
                width: 225px;
                height: 150px;
            }
            #store_img {
                /* height: 150px; */

                .el-upload--picture-card {
                    width: 225px;
                    height: 150px;
                }
                .el-upload-dragger {
                    width: 225px;
                    height: 150px;
                }
            }
            .show_store_imgs {
                justify-content: unset;
                flex-wrap: wrap;
                    
                li {
                    margin: 0 12px 12px 0;
                    cursor: pointer;
                    position: relative;
                    border-radius: 10px;

                    img {
                        width: 225px;
                        border-radius: 10px;
                    }

                    .float {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        border-radius: 10px;
                        background-color: rgba(0, 0, 0, 0.7);

                        i {
                            font-size: 2rem;
                            margin: 0 5px;
                        }
                    }
                    
                }
            }
            .el-dialog__body {
                padding: 20px 30px;

                img {
                    border-radius: 10px;
                }
            }
        }

        /* 基本信息 */
        .base_info {

            .info {

                ul {
                    padding-right: 20%;

                    li {
                        line-height: 30px;
                        min-height: 90px;

                        p {
                            font-size: 0.95rem;

                            span {
                                color: #333;
                                letter-spacing: 1px;
                                min-width: 95px;
                                display: inline-block;
                                text-align: right;
                            }
                        }

                        img {
                            width: 80px;
                            margin-left: 15px;
                        }
                    }
                }
            }
        }

        /* 列表数据过滤 */
        .list_filter {
            flex-wrap: wrap;
            
            .item {
                margin: 10px 15px 10px 0;

                .el-input {
                    width: 280px;
                }

                .el-button {
                    height: 44px;
                    margin: 0 0 0 15px;
                }

                .filter_select {

                    .el-input {
                        width: 110px;
                    }

                    .el-input--suffix .el-input__inner {
                        text-align: center;
                    }
                }
            }
        }

        /* 重复利用的div */
        .repeat_div {
            color: #999;
            margin: 20px 0;
            font-size: 0.9rem;
            border-radius: 8px;
            border: 1px solid #ddd;
            padding: 10px 20px 20px 20px;

            &>p {
                display: flex;
                align-items: center;
                margin-bottom: 20px;
                font-size: 0.95rem;

                &>span {
                    display: flex;
                    align-items: center;
                }
            }
            
            .icon {
                width: 1.2rem;
                height: 1.2rem;
                margin-right: 5px;
            }
        }

        /* layout布局 */
        .layout {
            display: flex;
            flex-direction: column;

            input::-webkit-input-placeholder{
                font-size: 0.9rem;
            }
            input::-moz-input-placeholder{
                font-size: 0.9rem;
            }
            input::-ms-input-placeholder{
                font-size: 0.9rem;
            }

            .c_header {
                color: #fff;
                height: 66px;
                padding: 0 20px;
                background-color: $bg;
            }

            .footer {
                display: flex;
                overflow: hidden;

                .c_aside {
                    width: 210px;
                    overflow-y: scroll;
                    padding-bottom: 25px;
                    background-color: $aside;

                    .icon {
                        margin-right: 8px;
                    }
                }

                .c_main {
                    flex-grow: 1;
                    overflow-y: scroll;
                    padding-bottom: 30px;
                    word-break: break-word;

                    .main_content {
                        padding: 0 20px;
                    }
                }
            }
        }
    }
</style>