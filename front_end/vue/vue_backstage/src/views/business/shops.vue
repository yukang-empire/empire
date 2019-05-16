<template>
    <div class="shops">
        <div>
            shops
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from "vue-property-decorator";

    @Component({
        components: {
            
        }
    })

    export default class shops extends Vue {
        @Prop() private father !: object;
        private data: object = {

        };
        methods () {

        };
    }
</script>

<style lang='scss' scoped>
    
</style>