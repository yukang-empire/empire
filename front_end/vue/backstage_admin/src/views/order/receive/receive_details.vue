<template>
    <div class="receive_details">
        <order_info :order_data='order_data' />
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import order_info from '@/components/order_info.vue';

@Component({
    components: {
        order_info
    }
})

export default class receive_details extends Vue{
    private order_data: any = {
        type: 'receive',
        current_state: '已确定',
        title01: '用户信息',
        title02: '私教课',
    }
}

</script>

<style lang="scss">

    @media screen and (min-width: 769px) {
        
    }
</style>