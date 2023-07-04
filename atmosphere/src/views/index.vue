x<template>
  <div id="index">
    <dv-full-screen-container class="bg">
      <dv-loading v-if="loading">Loading...</dv-loading>
      <div v-else class="d-flex flex-column host-body">
        <div class="d-flex topNav">
          <dv-decoration-8 :reverse="true"
                           :color="['#568aea', '#000000']"
                           style="width:33.3%;height:50px;" />
          <span class="title-text">大气污染可视化平台</span>

          <div class="d-flex nav-menu">
              <div class="menu-item" @click="changeMenu(0)">全国时空态势</div>
              <div class="menu-item" @click="changeMenu(1)">省市时空态势</div>
              <div class="menu-item" @click="changeMenu(2)">污染预测分析</div>
              <div class="menu-item" @click="changeMenu(3)">地图展示</div>
          </div>
          <dv-decoration-8
              :color="['#568aea', '#000000']"
              style="width:33.3%;height:50px;" />
        </div>

        <div class="d-flex flex-1 main-container">
          <CountryContainer v-if="menuIndex === 0"/>
          <ProvinceContainer v-else-if="menuIndex === 1"/>
          <PredictContainer v-else-if="menuIndex === 2"/>
          <MapContainer v-else-if="menuIndex === 3"/>
        </div>
      </div>
    </dv-full-screen-container>
  </div>
</template>
<script>
import CountryContainer from "./CountryContainer";
import ProvinceContainer from "./ProvinceContainer";
import PredictContainer from "./PredictContainer";
import MapContainer from './MapContainer';
export default {
  name: "index",
  components:{
    CountryContainer,
    ProvinceContainer,
    PredictContainer,
    MapContainer
  },
  data(){
    return{
      loading:true,
      menuIndex:3
    }
  },
  mounted() {
    this.cancelLoading();
  },
  methods:{
    cancelLoading() {
      setTimeout(() => {
        this.loading = false;
      }, 2000);
    },
    changeMenu(index){
      this.menuIndex = index;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/scss/index.scss";
</style>
