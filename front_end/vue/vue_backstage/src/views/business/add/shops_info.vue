<template>
    <div class="shops_info">
        <div>
            shops_info
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from "vue-property-decorator";

    @Component({
        components: {
            
        }
    })

    export default class shops_info extends Vue {
        @Prop() private father !: object;
        private data: any = {

        };
        methods () {

        };
    }
</script>

<style lang='scss' scoped>
    
</style>