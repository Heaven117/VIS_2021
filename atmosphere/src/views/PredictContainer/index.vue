<template>
<div class="main">

  <div class="d-flex flex-1">
    <div class="rightContainer">
      <div class="predict">
        <predict-chart/>
      </div>
      <div class="AQI">
        <predict-a-q-i/>
      </div>
    </div>

  </div>
  <div class="navBar">
    <nav-menu/>
  </div>

</div>
</template>



<script>
import navMenu from "./components/navMenu";
import predictChart from "./components/predictChart";
import predictAQI from "./components/predictAQI";
export default {
  name: "index",
  components:{
    navMenu,
    predictChart,
    predictAQI
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

  //.time-line{
  //  position: absolute;
  //  left: 940px;
  //  top: 500px;
  //  height: 50%;
  //  width: 10px;
  //}

  .navBar{
    position: relative;
    width: 100%;
    height: 20px;
    display: flex;
    justify-content: center;
  }


  //.centerContainer{
  //  display: flex;
  //  width: 350px;
  //  flex-direction: column;
  //
  //  .map{
  //    height: 50%;
  //    position: relative;
  //
  //  }
  //
  //  .weather{
  //    height: 50%;
  //  }
  //}

  .rightContainer{
    display: flex;
    flex: 1;
    flex-direction: row;
    justify-content: center;

    
    .predict{
      flex: 1;
    }

    .AQI{
      flex:1;
    }
  }
}

</style>
