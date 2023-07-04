<template>
  <div id="centerBottomChart" style="width:100%; height: 100%"></div>
</template>

<script>
// import renderData from "./chartData/杭州.json"
export default {
  computed:{
    renderData: function (){
      return this.$store.state.sixRenderData;
    }
  },
  mounted() {
    this.mapFn();
  },
  methods:{
    mapFn(){
      var mapChart = this.$echarts.init(
          document.getElementById("centerBottomChart"),
          'dark'
      );
      var option = {
        tooltip: {
          trigger: 'axis'
        },
        backgroundColor:"transparent",
        textStyle:{
          color: "#ffffff",
          fontFamily: "Microsoft YaHei",
          fontSize: "12",
          fontStyle: "normal",
          fontWeight: "normal"
        },
        xAxis: {
          data: this.renderData.map(function (item) {
            return item[0];
          }),
        },
        yAxis: {},
        // toolbox: {
        //   right: 10,
        //   feature: {
        //     dataZoom: {
        //       yAxisIndex: 'none'
        //     },
        //     restore: {},
        //     saveAsImage: {}
        //   }
        // },
        dataZoom: [
          {
            startValue: '2014-06-01'
          },
          {
            type: 'inside'
          }
        ],
        visualMap: {
          showLabel:false,
          right: 10,
          pieces: [
            {
              gt: 0,
              lte: 50,
              color: '#93CE07'
            },
            {
              gt: 50,
              lte: 100,
              color: '#FBDB0F'
            },
            {
              gt: 100,
              lte: 150,
              color: '#FC7D02'
            },
            {
              gt: 150,
              lte: 200,
              color: '#FD0100'
            },
            {
              gt: 200,
              lte: 300,
              color: '#AA069F'
            },
            {
              gt: 300,
              color: '#AC3B2A'
            }
          ],
          outOfRange: {
            color: '#fff'
          },
        },
        series: {
          name: 'Beijing AQI',
          type: 'line',
          data: this.renderData.map(function (item) {
            return item[1];
          }),
        }
      };
      mapChart.setOption(option);
    },
  },
  watch: {
    "renderData"() {
      this.mapFn();
    },
  }
}
</script>

<style scoped>

</style>
