<template>
<div class="main">
  <div id="map"></div>
  <div class="btn-group">
    <button class="btn" @click="getWindScene">风场</button>
    <button class="btn" @click="getTempScene">温度</button>
    <button class="btn" @click="getPM10Scene">PM10</button>
    <button class="btn" @click="getSQScene">SQ2</button>

  </div>
</div>
</template>

<script>
import { Scene ,PointLayer, WindLayer,Marker} from '@antv/l7';
import { GaodeMap } from '@antv/l7-maps';
import {getSQLayer} from '../../request/api';
export default {
  name: "index",
  components:{
  },
  data(){
    return{
      scene: null,
      SQLayerFlag: true,
      AQILayerFlag: true,
      windLayerFlag: true,
      TempLayerFlag: true,
    }
  },
  mounted(){
     this.scene = new Scene({
      id: 'map',
      map: new GaodeMap({
        pitch: 0,
        style: 'dark',
        center: [ 110, 40 ],
        zoom: 4
      })
    });
  },
  methods:{
      getSQScene(){
        if(this.AQILayerFlag){
          getSQLayer({
            param: "SO2(微克每立方米)"
          })
          .then(data => {
            console.log(data);
            this.AQILayer = new PointLayer({})
              .source(data, {
                parser: {
                  type: 'json',
                  x: 'lon',
                  y: 'lat'
                }
              })
              .shape('circle')
              .active(true)
              .animate(true)
              .size(56)
              .color('#4cfd47')
              .style({
                opacity: 1
              });

            this.scene.addLayer(this.AQILayer);
            this.AQILayerFlag = false;
          });
        }
        else{
          this.AQILayerFlag = true;
          this.scene.removeLayer(this.AQILayer);
        }
      },
      getWindScene(){
        if(this.windLayerFlag){
          this.windLayer = new WindLayer({})
            .source(
              'https://gw.alipayobjects.com/mdn/rms_23a451/afts/img/A*wcU8S5xMEDYAAAAAAAAAAAAAARQnAQ',
              {
                parser: {
                  type: 'image',
                  extent: [ -180, -85, 180, 85 ]
                }
              }
            )
            .animate(true)
            .style({
              uMin: -21.32,
              uMax: 26.8,
              vMin: -21.57,
              vMax: 21.42,
              numParticles: 35535,
              fadeOpacity: 0.996,
              sizeScale: 1.2,
              rampColors: {
                0.0: '#c6dbef',
                0.1: '#9ecae1',
                0.2: '#6baed6',
                0.3: '#4292c6',
                0.4: '#2171b5',
                0.5: '#084594'
              }
            });
          this.scene.addLayer(this.windLayer);
          this.windLayerFlag = false;
        }else{
          this.windLayerFlag = true;
          this.scene.removeLayer(this.windLayer);
        }
      },

      getPM10Scene(){
        if(this.SQLayerFlag){
          getSQLayer({
            param: "PM10(微克每立方米)"
          })
            .then(data => {
              this.SQLayer = new PointLayer({})
                .source(data, {
                  parser: {
                  type: 'json',
                  x: 'lon',
                  y: 'lat'
                }
                })
                .shape('circle')
                .active(true)
                .animate(true)
                .size(40)
                .color('#ffa842')
                .style({
                  opacity: 1,
                  offsets: [ 40, 40 ]
                });
              this.scene.addLayer(this.SQLayer);
              this.SQLayerFlag = false;
            });
        }
        else{
          this.SQLayerFlag = true;
          this.scene.removeLayer(this.SQLayer);
        }
      },

      getTempScene(){
        if(this.TempLayerFlag){
          fetch(
            'https://gw.alipayobjects.com/os/basement_prod/67f47049-8787-45fc-acfe-e19924afe032.json'
          )
            .then(res => res.json())
            .then(nodes => {
              for (let i = 0; i < nodes.length; i++) {
                if (nodes[i].g !== '1' || nodes[i].v === '') {
                  continue;
                }
                const el = document.createElement('label');
                el.className = 'labelclass';
                el.textContent = nodes[i].v + '℃';
                el.style.background = this.getColor(nodes[i].v);
                el.style.borderColor = this.getColor(nodes[i].v);
                this.tempMarker = new Marker({
                  element: el
                }).setLnglat({ lng: nodes[i].x * 1, lat: nodes[i].y });
                this.scene.addMarker(this.tempMarker);
                this.TempLayerFlag = false;
              }
            })
        }
        else{
          this.TempLayerFlag = true;
          this.scene.removeMaker(this.tempMarker);
        }
      },
      getColor(v) {
        return v > 50
          ? '#800026'
          : v > 40
            ? '#BD0026'
            : v > 30
              ? '#E31A1C'
              : v > 20
                ? '#FC4E2A'
                : v > 10
                  ? '#FD8D3C'
                  : v > 5
                    ? '#FEB24C'
                    : v > 0
                      ? '#FED976'
                      : '#FFEDA0';
      }
  }
}
</script>

<style scoped lang="scss">
.main{
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

  #map{
    width: 100%;
    height: 100%;
    justify-content: center;
    position: relative;

    .labelclass{
      width: 20px;
      height: 20px;
      border-radius: 50%;
    }
  }
  .btn-group{
    position: absolute;
    top: 100px;

    .btn{
      display: block;
      margin: 10px;
      width: 50px;
    }
  }

  
}

</style>
