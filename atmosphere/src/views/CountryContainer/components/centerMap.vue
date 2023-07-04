<template>
<div class="center-map h-100">
  <china-echarts v-if="showMap === 'china'"
                 @changeMap="changeMap"/>
  <province-map v-else :province="province"
                @backToChinaMap="backToChinaMap"/>

</div>
</template>

<script>
import chinaEcharts from "@/components/ChinaEcharts";
import ProvinceMap from "@/components/provinceMap";

export default {
  name: "centerMap",
  components:{
    ProvinceMap,
    chinaEcharts
  },
  data(){
    return {
      showMap:"china",
      province:{
        ename:"beijing",
        name:"北京",
      }
    }
  },
  methods:{
    changeMap(param){
      this.showMap = "province";
      this.province = param;
      this.$store.state.province = param.name
    },
    backToChinaMap(){
      this.showMap = "china";
      this.province = {
          ename:"beijing",
          name:"北京",
      };
    }
  }
}
</script>

<style scoped>
.center-map{
  width: 100%;
  height: 500px;
}

</style>
