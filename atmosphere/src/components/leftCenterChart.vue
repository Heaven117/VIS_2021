<template>
  <div id="leftCenterChart" style="width:100%; height: 100%"></div>
</template>

<script>
export default {
  computed:{
    renderData: function (){
      return this.$store.state.leftCenterData;
    }
  },
  mounted() {
    this.mapFn();
  },
  methods:{
    mapFn(){
      var mapChart = this.$echarts.init(document.getElementById("leftCenterChart"));
      // Schema:
// date,AQIindex,PM2.5,PM10,CO,NO2,SO2
      const lineStyle = {
        width: 1,
        opacity: 0.5
      };
      var option = {
        // legend: {
        //   type:'scroll',
        //   bottom:20,
        //   data: ['Beijing', 'Shanghai', 'Guangzhou','Guangzhou2','Guangzhou3','Guangzhou4'],
        //   textStyle: {
        //     color: '#fff',
        //     fontSize: 14
        //   },
        //   selectedMode: 'single'
        // },
        radar: {
          radius:'70%',
          indicator: [
            { name: 'O3', max: 300 },
            { name: 'PM2.5', max: 250 },
            { name: 'PM10', max: 300 },
            { name: 'CO', max: 5 },
            { name: 'NO2', max: 200 },
            { name: 'SO2', max: 100 }
          ],
          shape: 'circle',
          splitNumber: 5,
          axisName: {
            color: '#fff'
          },
          splitLine: {
            lineStyle: {
              color: [
                'rgba(238, 300, 102, 0.1)',
                'rgba(238, 300, 102, 0.2)',
                'rgba(238, 300, 102, 0.4)',
                'rgba(238, 300, 102, 0.6)',
                'rgba(238, 300, 102, 0.8)',
                'rgba(238, 300, 102, 1)'
              ].reverse()
            }
          },
          splitArea: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(238, 197, 102,0.8)'
            }
          }
        },
        series: [
          {
            name: 'Beijing',
            type: 'radar',
            lineStyle: lineStyle,
            data: this.renderData,
            symbol: 'none',
            itemStyle: {
              color: '#F9713C'
            },
            areaStyle: {
              opacity: 0.1
            }
          },
        ]
      };
      mapChart.setOption(option);
    }
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
