<template>
  <div class="main">
  <div id="weatherChart" style="width:97%; height: 97%"></div>
  </div>
</template>

<script>
// import renderData from "./chartData/杭州.json"
import {getProvinceEveryMonth} from "@/request/api";

export default {
  data(){
    return{
      renderData:[],
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
    initData() {
      getProvinceEveryMonth({
        province2:this.province,
        year:this.year
      }).then(res =>{
        this.renderData = res;
        this.mapFn();
      })

    },
    mapFn(){
      var mapChart = this.$echarts.init(
          document.getElementById("weatherChart"),
          'dark'
      );
      var option = {
        backgroundColor:"transparent",
        title:{
          text: '温度与AQI关系图 (' + this.$store.state.year + '年)'
        },
        // title: {
        //   text: 'Stacked Line'
        // },
        // tooltip: {
        //   trigger: 'axis'
        // },
        // legend: {
        //   data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
        // },
        // grid: {
        //   left: '3%',
        //   right: '4%',
        //   bottom: '3%',
        //   containLabel: true
        // },
        // toolbox: {
        //   feature: {
        //     saveAsImage: {}
        //   }
        // },
        // xAxis: {
        //   type: 'category',
        //   boundaryGap: false,
        //   data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        // },
        // yAxis: {
        //   type: 'value'
        // },
        // series: [
        //   {
        //     name: 'Email',
        //     type: 'line',
        //     stack: 'Total',
        //     data: [120, 132, 101, 134, 90, 230, 210]
        //   },
        //   {
        //     name: 'Union Ads',
        //     type: 'line',
        //     stack: 'Total',
        //     data: [220, 182, 191, 234, 290, 330, 310]
        //   },
        //   {
        //     name: 'Video Ads',
        //     type: 'line',
        //     stack: 'Total',
        //     data: [150, 232, 201, 154, 190, 330, 410]
        //   },
        //   {
        //     name: 'Direct',
        //     type: 'line',
        //     stack: 'Total',
        //     data: [320, 332, 301, 334, 390, 330, 320]
        //   },
        //   {
        //     name: 'Search Engine',
        //     type: 'line',
        //     stack: 'Total',
        //     data: [820, 932, 901, 934, 1290, 1330, 1320]
        //   }
        // ]
        legend:{
          data:['温度', 'AQI'],
          x:'right',      //可设定图例在左、右、居中
          y:'bottom',     //可设定图例在上、下、居中
          padding:[0,50,0,0],   //可设定图例[距上方距离，距右方距离，距下方距离，距左方距离]
        },
        xAxis: {
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月',]
        },
        yAxis: {},
        series: [
          {
            data: this.renderData[0],
            type: 'line',
            name: '温度',
            smooth: true,
            itemStyle: {
              normal: {
                color: "#C34A36", //图例颜色
                borderWidth: 4,
                borderColor: "#C34A36",
                lineStyle: { color: "#C34A36", width: 2 }
              }
            },
            areaStyle: {
              normal: {
                // 渐变填充色（线条下半部分）
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#C34A36" },
                  { offset: 1, color: "#0081CF" }
                ])
              }
            }
          },
          {
            data: this.renderData[1],
            type: 'line',
            name: 'AQI',
            smooth: true,
            itemStyle: {
              normal: {
                color: "#845EC2", //图例颜色
                borderWidth: 4,
                borderColor: "",
                lineStyle: { color: "#845EC2", width: 2 }
              }
            },
            areaStyle: {
              normal: {
                // 渐变填充色（线条下半部分）
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#845EC2" },
                  { offset: 1, color: "#D65DB100" }
                ])
              }
            }
          },

        ]
      };
      mapChart.setOption(option);
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
}
</style>
