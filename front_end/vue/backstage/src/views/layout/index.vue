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
        /* 列表数据过滤 */
        .list_filter {

            .item {

                .el-input {
                    width: 250px;
                }

                .el-button {
                    height: 44px;
                    margin: 0 0 0 15px;
                }
            }
        }

        /* 重复利用的div */
        .repeat_div {
            color: #999;
            margin: 20px 0;
            font-size: 0.9rem;
            border-radius: 5px;
            border: 1px solid #ddd;
            padding: 10px 20px 30px 20px;

            &>p {
                display: flex;
                align-items: center;
                margin-bottom: 20px;
            }
            
            .icon {
                width: 1rem;
                height: 1rem;
                margin-right: 10px;
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
                }
            }
        }
    }
</style>