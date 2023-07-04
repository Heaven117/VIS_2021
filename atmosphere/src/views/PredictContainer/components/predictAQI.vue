<template>
  <div class="main">
    <div id="predictAQI" style="width:100%; height: 50%"></div>
  </div>
</template>

<script>


export default {
  computed:{
    renderData: function (){
      return this.$store.state.provincePredictAQI;
    }
  },
  mounted() {
    this.mapFn();
  },
  methods:{
    data(){
      return{
        showProvince: this.$store.state.province3,
      }
    },
    mapFn(){
      var mapChart = this.$echarts.init(
          document.getElementById("predictAQI"),
          'dark'
      );

      var option = {
        backgroundColor: '',
        dataset: {
          source: this.renderData
        },
        xAxis: {
          type: 'category'
        },
        yAxis: {
          // type: 'value'
        },
        title: {
          text: this.$store.state.province3 + "AQI预测值",
        },
        grid: {
          top: '20%',
        },
        series: [
          {
            seriesLayoutBy: 'row',
            type: 'line',
            smooth: true
          }
        ]
      };

      mapChart.setOption(option);

      // window.addEventListener("resize", () => {
      //   // 自动渲染echarts
      //   mapChart.resize();
      // });
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
.main{
  width: 100%;
}
</style>
