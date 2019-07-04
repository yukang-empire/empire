<template>
    <div class="service_details">
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

export default class service_details extends Vue{
    private order_data: any = {
        current_state: '已确定',
        title01: '用户信息',
    }
}

</script>

<style lang="scss">

    @media screen and (min-width: 769px) {
        
    }
</style>