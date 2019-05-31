<template>
    <div class="h_title" v-if='$store.state.current_route'>
        <div class="border"></div>
        <h1>{{ $store.state.current_route ? $store.state.current_route.meta.title : '' }}</h1>
    </div>
</template>

<script>

export default {
    name: 'h_title',
    components: {
        
    },
    data () {
        return {
            
        }
    },
    mounted () {
        
    }
}
</script>

<style lang='scss' scoped>
    .h_title {
        display: flex;
        align-items: center;
        padding: 10px 0 0 20px;
    }
    .border {
        width: 5px;
        height: 26px;
        margin-right: 10px;
        background-color: $main;
    }
    .h_title h1{
        font-size: 1.7rem;
        text-align: left;
    }

    @media screen and (min-width: 769px) {
        
    }
</style>