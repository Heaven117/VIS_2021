<template>
  <div className="heatMapDom">
    <div class="heatMapDom" id="heatMap" />
  </div>
</template>
<script>
import echarts from 'echarts/lib/echarts'

require('echarts/extension/bmap/bmap')
import {option} from './option2'

export default {
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.chart = echarts.init(document.getElementById("heatMap"))
      console.log(option, '==数据')
      this.chart.setOption(option)
    }
  }
}
</script>
<style>
.heatMapDom {
  position: absolute;
  top: 0;
  width: 400px;
  height: 400px;
}

.BMap_noprint, .anchorBL {
  display: none;
}
</style>
