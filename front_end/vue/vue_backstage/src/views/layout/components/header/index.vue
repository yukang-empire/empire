<template>
    <div class="header_component flex_between">
        <div class="flex_center">
            <img src="@/common/imgs/logo02.png" alt="logo">
        </div>
        <div class="right">
            <div>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-yonghu2"></use>
                </svg>
            </div>
            <div>
                <span>admin</span>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'header_component',
    components: {
        
    },
    data () {
        return {
            
        }
    }
}
</script>

<style lang='scss' scoped>
    .header_component {
        color: #fff;
        height: 60px;
        padding: 0 20px;
        background-color: $back;
    }
    .header_component img {
        width: 40px;
    }
    .right {
        display: flex;
    }
    .right .icon {
        width: 1.7rem;
        height: 1.7rem;
        margin-right: 8px;
    }
    @media screen and (min-width: 769px) {
        
    }
</style>