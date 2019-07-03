<template>
    <div class="baidu_map">
        <div :id="mapId"></div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import loadBMap from '@/assets/plugin/baidu_map.js';

@Component({
    components: {
        
    }
})

export default class baidu_map extends Vue{
    //异步加载百度地图 响应地址的变化
    private mapId: any = 'mapId';
    private myMap: any = null;
    
    mounted () {
        this.initMap();
    };

    //百度地图初始化
    initMap() {
        var num: any = Date.now() + Math.random();
        this.mapId = 'BMap-' + parseInt(num);
        //百度密钥 http://lbsyun.baidu.com/apiconsole/key
        var key = 'QM5TyraTXaaKcwKfw9qd8GyBBuoSWWLF';
        loadBMap(key).then(() => {
            var address = null;
            if (this.$store.state.map_data) {
                address = this.$store.state.map_data;
            }else {
                if (sessionStorage.getItem('add_form_data')) {
                    var data = JSON.parse(sessionStorage.getItem('add_form_data'));
                    if (data.province || data.city || data.area || data.street || data.address) {
                        address = data.province + data.city + data.area + data.street + data.address;
                    }else {
                        address = '广东省深圳市龙华区清湖地铁站';
                    };
                }else {
                    address = '广东省深圳市龙华区清湖地铁站';
                };
            };
            // 百度地图API功能
            this.myMap = new BMap.Map(this.mapId, {minZoom: 18,maxZoom: 18}); // 创建Map实例
            this.myMap.centerAndZoom(address, 18); // 初始化地图,设置中心点坐标和地图级别
            //添加地图类型控件
            this.myMap.addControl(
                new BMap.MapTypeControl({
                    mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP],
                })
            );
            this.myMap.setCurrentCity('深圳市'); // 设置地图显示的城市 此项是必须设置的
            this.myMap.enableScrollWheelZoom(false); //开启/关闭鼠标滚轮缩放
            this.myMap.disableDragging(); //禁止拖拽

            //根据地址获取经纬度
            var myGeo = new BMap.Geocoder();      
            myGeo.getPoint(address, function(point){
                sessionStorage.setItem('j_w', JSON.stringify(point));
            });
        }).catch(err => {
            this.$message({ message: '地图加载失败', type: "error", duration: 2500 });
        });
    };

    //地址一有变化就重新初始化地图
    @Watch('$store.state.map_data')
    private watch_map(){
        this.initMap();
    };
};

</script>

<style lang="scss">

    @media screen and (min-width: 769px) {
        .baidu_map {
            width: 700px;
            height: 300px;
            overflow: hidden;

            &>div {
                height: 300px;
            }
        }
    }
</style>