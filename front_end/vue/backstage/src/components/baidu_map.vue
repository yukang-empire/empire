<template>
    <div class="baidu_map">
        <div ref='allmap'></div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
    components: {
        
    }
})

export default class baidu_map extends Vue{
    
    mounted () {
        var that: any = this;
        console.log(that.$refs.allmap);
        var map = new BMap.Map(that.$refs.allmap);
        map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
        map.addControl(new BMap.MapTypeControl({
		mapTypes:[
            BMAP_NORMAL_MAP,
            BMAP_HYBRID_MAP
        ]}));
        map.setCurrentCity("北京");
        map.enableScrollWheelZoom(true);
    }
}

</script>

<style lang="scss">

    @media screen and (min-width: 769px) {
        .baidu_map {
            width: 600px;
            height: 300px;
            overflow: hidden;
        }
    }
</style>