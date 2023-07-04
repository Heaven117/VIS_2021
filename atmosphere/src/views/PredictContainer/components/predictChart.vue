<template>
  <div class="main">
    <div id="predictChart" style="width:100%; height: 100%"></div>
  </div>
</template>

<script>


export default {
  computed:{
    renderData: function (){
      return this.$store.state.provincePredictDetail;
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
          document.getElementById("predictChart"),
          'dark'
      );

      var option = {
        backgroundColor: '',
        legend: {},
        tooltip: {
          trigger: 'axis',
          showContent: false
        },
        dataset: {
          source: this.renderData
        },
        xAxis: { type: 'category' },
        yAxis: { gridIndex: 0 },
        grid: { top: '55%' },
        series: [
          {
            type: 'line',
            smooth: true,
            seriesLayoutBy: 'row',
            emphasis: { focus: 'series' }
          },
          {
            type: 'line',
            smooth: true,
            seriesLayoutBy: 'row',
            emphasis: { focus: 'series' }
          },
          {
            type: 'line',
            smooth: true,
            seriesLayoutBy: 'row',
            emphasis: { focus: 'series' }
          },
          {
            type: 'line',
            smooth: true,
            seriesLayoutBy: 'row',
            emphasis: { focus: 'series' }
          },
          {
            type: 'line',
            smooth: true,
            seriesLayoutBy: 'row',
            emphasis: { focus: 'series' }
          },
          {
            type: 'line',
            smooth: true,
            seriesLayoutBy: 'row',
            emphasis: { focus: 'series' }
          },
          {
            type: 'line',
            smooth: true,
            seriesLayoutBy: 'row',
            emphasis: { focus: 'series' }
          },
          {
            type: 'pie',
            id: 'pie',
            radius: '30%',
            center: ['50%', '25%'],
            emphasis: {
              focus: 'self'
            },
            label: {
              formatter: '{b}: {@2019-01-01} ({d}%)'
            },
            encode: {
              itemName: 'date',
              value: '2019-01-01',
              tooltip: '2019-01-01'
            }
          }
        ]
      };
      mapChart.on('updateAxisPointer', function (event) {
        const xAxisInfo = event.axesInfo[0];
        if (xAxisInfo) {
          const dimension = xAxisInfo.value + 1;
          mapChart.setOption({
            series: {
              id: 'pie',
              label: {
                formatter: '{b}: {@[' + dimension + ']} ({d}%)'
              },
              encode: {
                value: dimension,
                tooltip: dimension
              }
            }
          });
        }
      });
      mapChart.setOption(option);

      window.addEventListener("resize", () => {
        // 自动渲染echarts
        mapChart.resize();
      });
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
