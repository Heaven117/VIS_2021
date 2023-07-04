<template>
  <div class="center-bottom h-100 flex-column">
    <div class="d-flex pt-2 pl-2">
        <span style="color:#5cd9e8">
          <icon name="chart-bar"></icon>
        </span>
      <div class="d-flex">
        <span class="fs-xl text mx-2">{{cityName}}近6年的污染数据</span>
        <dv-decoration-1 style="width:100px;height:20px; position:relative;top:-3px;" />
      </div>
    </div>
    <div class="chart-center h-100">
      <center-bottom-chart class="chart"/>
    </div>
  </div>
</template>

<script>
import centerBottomChart from "@/components/centerBottomChart";
export default {
  components:{
    centerBottomChart
  },
  computed: {
    cityName: function (){
      return this.$store.state.sixCityName;
    }
  },
}
</script>

<style scoped>
.center-bottom{
  width: 100%;
  padding: 1rem;
  overflow: hidden;
  position: absolute;
}
.chart-center{
  position: absolute;
  top: 0;
  left:0;
  width: 100%;
}
.chart{
  padding-bottom: 10px;
}
</style>
