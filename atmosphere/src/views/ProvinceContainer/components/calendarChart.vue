<template>
  <div class="main">
    <div id="calendarChart" style="width:100%; height: 100%"></div>
  </div>
</template>

<script>
import {getCanlendarData} from "../../../request/api";
export default {
  data(){
    return{
      renderData:[],
      sortData:[],
      maxLimit:100,
    }
  },
  computed:{
    province: function (){ return this.$store.state.province2},
    year:function(){ return this.$store.state.year}
  },
  created() {
    this.initData();
  },
  methods:{
    initData(){
      getCanlendarData({
        province:this.province,
        year: this.year
      }).then(res =>{
        // console.log(res);
        this.renderData = res;

        this.sortData = this.renderData
            .sort(function (a, b) {
              return b[1] - a[1];
            }).slice(0, 12)

        this.maxLimit = this.sortData[0][1];

        this.mapFn();
      })
    },
    mapFn(){
      var mapChart = this.$echarts.init(
          document.getElementById("calendarChart"),
          'dark'
      );

      var option = {
        backgroundColor:"transparent",
        color:[''],
        visualMap: {
          show: false,
          min: 0,
          max: this.maxLimit,
        },
        calendar: [{
          range: this.$store.state.year,
          cellSize: 16,
          yearLabel:false,
          monthLabel:{
            color:"#fff"
          },
          dayLabel:{
            color: "#fff"
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#000',
              width: 2,
              type: 'solid'
            }
          },
          itemStyle: {
            color: '#323c48',
            borderWidth: 1,
            borderColor: '#111'
          }
        }],
        series:[
          {
            type: 'scatter',
            calendarIndex:0,
            coordinateSystem: 'calendar',
            data: this.renderData,
            symbolSize: function (val) {
              return val[1] / 10;
            },
            itemStyle: {
              color: '#ddb926'
            }
          },
          {
            type: 'effectScatter',
            calendarIndex:0,
            coordinateSystem: 'calendar',
            data: this.sortData,
            symbolSize: function (val) {
              return val[1] / 5;
            },
            showEffectOn: 'render',
            rippleEffect: {
              brushType: 'stroke'
            },
            itemStyle: {
              color: '#f4e925',
              shadowBlur: 10,
              shadowColor: '#333'
            },
            zlevel: 1
          },
        ]
      };
      mapChart.setOption(option);

      window.addEventListener("resize", () => {
        // 自动渲染echarts
        mapChart.resize();
      });
    },
  },
  watch: {
    "year"() {
      this.initData();
    },
    "province"() {
      this.initData()
    }
  }
}
</script>

<style scoped>
.main{
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
