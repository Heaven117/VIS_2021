<template>
<div class="main">
  <div class="d-flex flex-1">
    <div class="rightContainer">
      <div class="calendar">
        <calendar-chart/>
      </div>
      <div class="pollution">
        <pollution-chart/>
      </div>
    </div>

    <div class="centerContainer">
      <div class="map">
        <province-map/>
      </div>
      <div class="weather">
        <weather-chart/>
      </div>
    </div>
  </div>
  <time-line class="time-line"/>
  <div class="navBar">
    <nav-menu/>
  </div>
</div>
</template>

<script>
import provinceMap from "./components/provinceMap";
import weatherChart from "./components/weatherChart";
import navMenu from "./components/navMenu";
import calendarChart from "./components/calendarChart";
import pollutionChart from "./components/pollutionChart";
import timeLine from "./components/timeLine";
export default {
  name: "index",
  components:{
    navMenu,
    weatherChart,
    calendarChart,
    pollutionChart,
    provinceMap,
    timeLine
  },
  data(){
    return{
    }
  }
}
</script>

<style scoped lang="scss">
.main{
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

  .time-line{
    position: absolute;
    left: 73%;
    top: 70%;
    height: 50%;
    width: 10px;
  }

  .navBar{
    position: relative;
    width: 100%;
    height: 20px;
    display: flex;
    justify-content: center;
  }

  .centerContainer{
    display: flex;
    width: 350px;
    flex-direction: column;

    .map{
      height: 50%;
      position: relative;

    }

    .weather{
      height: 50%;
    }
  }

  .rightContainer{
    display: flex;
    flex: 1;
    flex-direction: column;

    .calendar{
      flex: 1;
    }

    .pollution{
      flex: 2;
    }
  }
}

</style>
