<template>
  <div id="right-bottom">
    <div class="d-flex pt-2 pl-2">
      <span style="color:#5cd9e8">
        <icon name="chart-line"></icon>
      </span>
      <div class="d-flex">
        <span class="fs-xl text mx-2">近10日{{cityName}}省污染预测</span>
      </div>
    </div>
    <div class="d-flex jc-center body-box flex-1">
      <right-bottom-chart class="chart"/>
    </div>
  </div>
</template>

<script>
import rightBottomChart from "@/components/rightBottomChart";
export default {
  components:{
    rightBottomChart
  },
  computed:{
    cityName: function (){
      return this.$store.state.sixCityName;
    }
  }
}
</script>

<style scoped>
#right-bottom{
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1rem;
}
</style>
