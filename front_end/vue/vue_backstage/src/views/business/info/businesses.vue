<template>
    <div class="businesses">
        <div>
            businesses
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from "vue-property-decorator";

    @Component({
        components: {
            
        }
    })

    export default class businesses extends Vue {
        @Prop() private father !: object;
        private data: any = {

        };
        methods () {

        };
    }
</script>

<style lang='scss' scoped>
    
</style>