<template>
    <div class="business_info">
        <div class="repeat_div">
            <p>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-zhuceyaoqing"></use>
                </svg>
                <span>新增商家</span>
            </p>
            <div class="business_write">
                <div class="top_nav">
                    <div class="flat">
                        <span>商家信息</span>
                        <!-- 箭头 -->
                        <div class="right_top"></div>
                        <div class="right_bottom"></div>
                    </div>
                    <div class="tip">
                        <span>门店信息</span>
                        <!-- 箭头 -->
                        <div class="right_top"></div>
                        <div class="right_bottom"></div>
                        <div class="left_top"></div>
                        <div class="left_bottom"></div>
                    </div>
                    <div class="tip">
                        <span>完成</span>
                        <!-- 箭头 -->
                        <div class="right_top"></div>
                        <div class="right_bottom"></div>
                        <div class="left_top"></div>
                        <div class="left_bottom"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'business_info',
    components: {
        
    },
    data () {
        return {
            
        }
    }
}
</script>

<style lang='scss' scoped>
    .business_info {
        padding: 0 20px;
    }
    .top_nav {
        display: flex;
        align-items: center;
    }
    .top_nav>div {
        width: 120px;
        height: 42px;
        color: #fff;
        margin-right: 20px;
        text-align: center;
        line-height: 42px;
        background-color: $succ;
    }
    .flat {
        
    }
    @media screen and (min-width: 769px) {
        
    }
</style>