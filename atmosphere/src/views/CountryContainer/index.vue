<template>
  <div class="d-flex flex-1 main-container">
    <div class="left-column d-flex flex-column flex-1">
      <dv-border-box-12 class="flex-1">
        <left-top />
      </dv-border-box-12>
      <dv-border-box-12 class="flex-2">
        <left-center />
      </dv-border-box-12>
    </div>
    <div class="center-column d-flex flex-column flex-3">
      <div class="center-top d-flex flex-2">
        <div class="map flex-2 w-100">
          <center-map/>
        </div>
        <div class="right-column d-flex flex-column flex-1">
          <dv-border-box-12 class="flex-1">
            <right-top/>
          </dv-border-box-12>
          <dv-border-box-12 class="flex-1">
            <right-bottom/>
          </dv-border-box-12>
        </div>
      </div>
      <dv-border-box-8 class="flex-1">
        <center-bottom/>
      </dv-border-box-8>
    </div>
  </div>
</template>

<script>
import CenterMap from "./components/centerMap";
import centerBottom from "./components/centerBottom";
import leftTop from "./components/leftTop";
import leftCenter from "./components/leftCenter";
import rightTop from "./components/rightTop";
import rightBottom from "./components/rightBottom";

export default {
  name: "index",
  components:{
    CenterMap,
    centerBottom,
    leftTop,
    leftCenter,
    rightTop,
    rightBottom
  }
}
</script>

<style scoped>

</style>
