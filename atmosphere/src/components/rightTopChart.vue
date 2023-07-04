<template>
  <div id="rightTopChart" style="width:100%; height: 100%"></div>
</template>

<script>
export default {
  mounted() {
    this.mapFn();
  },
  methods:{
    mapFn(){
      var mapChart = this.$echarts.init(document.getElementById("rightTopChart"));
      var option = {
        color: [
          "#37a2da",
          "#32c5e9",
          "#9fe6b8",
          "#ffdb5c",
          "#ff9f7f",
          "#fb7293",
          "#e7bcf3",
          "#8378ea"
        ],
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        toolbox: {
          show: true
        },
        calculable: true,
        legend: {
          orient: "vertical",
          icon: "circle",
          right: 0,
          top:'20%',
          data: ["PM2.5", "PM10", "NO2", "SO2", "CO", "AQI"],
          textStyle: {
            color: "#fff"
          }
        },
        series: [
          {
            name: "空气污染成分",
            type: "pie",
            radius: [10, 60],
            roseType: "area",
            center: ["40%", "50%"],
            data: [
              { value: 10, name: "PM2.5" },
              { value: 5, name: "PM10" },
              { value: 15, name: "NO2" },
              { value: 25, name: "SO2" },
              { value: 20, name: "CO" },
              { value: 35, name: "AQI" }
            ]
          }
        ]
      };
      mapChart.setOption(option);
    }
  }
}
</script>

<style scoped>
</style>
