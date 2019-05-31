<template>
    <div class="business_details">
        <div class="repeat_div">
            <p>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-jibenxinxi"></use>
                </svg>
                <span>基本信息</span>
            </p>
            <div class="base_info flex_between">
                <div class="left">
                    <p>基本信息：</p>
                </div>
                <div class="middle flex_center">
                    <div>
                        <p>企业名称：</p>
                        <p>企业地址：</p>
                        <p>企业电话：</p>
                        <p>营业执照：</p>
                    </div>
                    <div>
                        <p>某某</p>
                        <p>某某</p>
                        <p>某某</p>
                        <p>某某</p>
                    </div>
                </div>
                <div class="right">
                    <div>
                        <p>联系人：</p>
                        <p>手机号：</p>
                        <p>入驻时间：</p>
                    </div>
                    <div>
                        <p>某某</p>
                        <p>某某</p>
                        <p>某某</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="repeat_div">
            <p>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-shangjia"></use>
                </svg>
                <span>门店信息</span>
            </p>
            
            
        </div>

        <div class="repeat_div">
            <p>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-shangpin"></use>
                </svg>
                <span>商品信息</span>
            </p>
            
            
        </div>

    </div>
</template>

<script>

export default {
    name: 'business_details',
    components: {
        
    },
    data () {
        return {
            
        }
    },
    methods: {
        
    }
}
</script>

<style lang='scss' scoped>
    .base_info {
        align-items: unset;
        color: #333;
        font-size: 0.95rem;

        div {
            line-height: 2rem;

            p {
                margin: 0;
                line-height: 2rem;
            }

        }
    }
    .left p{
        border-left: 2px solid $main;
        height: 17px;
        padding: 0 0 0 10px;
        font-weight: 900;
        margin: 0 0 0 10px;
        font-size: 1.1rem;
        display: flex;
        align-items: center;
    }
    .middle,.right {
        margin-right: 10%;
        display: flex;
        align-items: center;

        &>div p{
            text-align: right;
        }
        
        &>div:nth-of-type(2) {
            color: #999;
        }
    }

    @media screen and (min-width: 769px) {
        
    }
</style>