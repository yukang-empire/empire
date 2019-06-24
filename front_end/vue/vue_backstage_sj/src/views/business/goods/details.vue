<template>
    <div class="goods_details">
        <div class="repeat_div">
            <p>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-shangpin"></use>
                </svg>
                <span>商品详情</span>
            </p>
            <div class="business_write">
                <div class="form">
                    <div class="item">
                        <span>商品名称：</span>
                        <i>{{ details_data.goods_name }}</i>
                    </div>
                    <div class="item">
                        <span>销售价格：</span>
                        <i>{{ details_data.shop_price }}</i>
                    </div>
                    <div class="item">
                        <span>结算价格：</span>
                        <i>{{ details_data.cost_price }}</i>
                    </div>
                    <div class="item">
                        <span>所属门店：</span>
                        <i>{{ details_data.club_name }}</i>
                    </div>
                    <div class="item">
                        <span>购买须知：</span>
                        <i>{{ details_data.card_info }}</i>
                    </div>

                </div>

            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'goods_details',
    components: {
        
    },
    data () {
        return {
            details_data: {
                goods_name: '',
                shop_price: '',
                cost_price: '',
                store_name: '',
                card_info: '',
                club_name: ''
            }
        }
    },
    methods: {
        
    },
    mounted () {
        console.log(this.$route.query);
        if (this.$route.query) {
            var params = new FormData();
            params.append("goods_id", this.$route.query.goods_id);
            params.append("token", sessionStorage.getItem('token'));
            this.$axios.post("/index.php?m=Api&c=Club&a=card_goods_info", params).then( response => {
                console.log("商品详情", response);
                this.details_data = response.data.result;
            })
        }
    }
}
</script>

<style>
    .item .el-input__inner,.el-input {
        width: 450px;
        font-size: 0.95rem;
    }
    .item .el-input__inner {
        height: 45px;
    }

    .item i {
        color: #999;
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
        width: 178px;
        height: 178px;
        display: block;
    }
</style>

<style lang='scss' scoped>
    .el-textarea {
        width: 450px;
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
        padding: 0px 15px 20px 80px;
        color: #333;
    }
    .item {
        display: flex;
        align-items: center;
        margin: 20px 0;

        span {
            white-space: nowrap;
            margin-right: 8px;
            width: 90px;
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
    }
    
    @media screen and (min-width: 769px) {
        
    }
</style>