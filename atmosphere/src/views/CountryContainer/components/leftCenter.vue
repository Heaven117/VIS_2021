<template>
  <div class="left-center h-100 d-flex flex-column">
    <div class="d-flex pt-2 pl-2">
        <span style="color:#5cd9e8">
          <icon name="chart-bar"></icon>
        </span>
      <div class="d-flex">
        <span class="fs-xl text mx-2">各污染物 IAQI 指数</span>
        <dv-decoration-6 style="width:100px;height:20px; position:relative;top:-3px;" />
      </div>
    </div>
    <div class="d-flex h-100">
      <left-center-chart/>
    </div>
  </div>
</template>

<script>
import leftCenterChart from "@/components/leftCenterChart";
export default {
  components:{
    leftCenterChart
  }
}
</script>

<style scoped>
.left-center{
  padding: 1rem;
}
</style>
