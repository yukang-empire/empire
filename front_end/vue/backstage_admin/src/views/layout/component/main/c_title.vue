<template>
    <div class="c_title">
        <div class="border"></div>
        <h1>{{ $store.state.current_route ? $store.state.current_route.meta.title : '' }}</h1>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
    components: {
        
    }
})

export default class c_title extends Vue{
    
}

</script>

<style lang="scss">

    @media screen and (min-width: 769px) {
        .c_title {
            display: flex;
            align-items: center;
            padding: 10px 0 0 20px;

            .border {
                width: 5px;
                height: 26px;
                margin-right: 10px;
                background-color: $main;
            }
            
            h1{
                font-size: 1.7rem;
                text-align: left;
            }
        }
    }
</style>