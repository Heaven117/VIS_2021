<template>
  <div class="left-top d-flex flex-column">
    <div class="d-flex pt-2 pl-2">
        <span style="color:#5cd9e8">
          <icon name="chart-bar"></icon>
        </span>
      <div class="d-flex">
        <span class="fs-xl text mx-2">污染物与物理情况关系图 </span>
        <dv-decoration-3 style="width:100px;height:20px; position:relative;top:-3px;" />
      </div>
    </div>
    <div class="d-flex chart-center h-100">
      <left-top-chart/>
    </div>
  </div>
</template>

<script>
import leftTopChart from "@/components/leftTopChart";
export default {
  components:{
    leftTopChart
  }
}
</script>

<style scoped>
.left-top{
  height: 100%;
  padding: 0.5rem;
}
</style>
