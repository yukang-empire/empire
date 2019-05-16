<template>
    <div class="header">
        <div>
            header
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from "vue-property-decorator";

    @Component({
        components: {
            
        }
    })

    export default class header extends Vue {
        @Prop() private father !: object;
        private data: any = {

        };
        methods () {

        };
    }
</script>

<style lang='scss' scoped>
    
</style>