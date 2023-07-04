<template>
  <div class="main">
    <div class="d-flex">
    <ul class="infinite-list flex-1 d-flex" style="overflow:auto">
      <li v-for="i in render"
          :key="i"
          @click="chooseProvince(i)"
          class="infinite-list-item"
          :class="i === activeProvince ? activeStyle : null">{{ i }}</li>
    </ul>
    <div class="btn-group">
      <div @click="lastPage" class="btn"><i class="el-icon-caret-left"></i></div>
      <div @click="nextPage" class="btn"><i class="el-icon-caret-right"></i> </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getPredictAQIData, getProvincePredictDetail} from "@/request/api";

const provinces = [
  "北京","上海","天津",
  "吉林","四川",
  "内蒙古","宁夏","山东","山西","台湾",
  "云南","安徽"]

export default {
  name: "navMenu",
  data(){
    return{
      provinces:provinces,
      pIndex:0,
      render:[],
      pageTotal:20,
      activeStyle:"active-nav"
    }
  },
  computed:{
    activeProvince: function (){ return this.$store.state.province3},
  },
  created() {
    this.render = this.provinces.slice(this.pIndex,this.pIndex+this.pageTotal);
  },
  methods:{
    lastPage(){
      this.pIndex = (this.pIndex-1) >= 0? this.pIndex-1: 0;
      this.render = this.provinces.slice(this.pIndex,this.pIndex+this.pageTotal);
    },
    nextPage(){
      this.pIndex = (this.pIndex+1 + this.pageTotal) < this.provinces.length?
          this.pIndex+1: this.provinces.length-this.pageTotal;
      this.render = this.provinces.slice(this.pIndex,this.pIndex+this.pageTotal);
    },
    chooseProvince(province){
      this.$store.commit('changeProvince3',province)
      console.log(this.$store.state.province3 + "第三页")
      getProvincePredictDetail({
        province3:this.$store.state.province3,
      }).then(res =>{
        this.$store.commit("changeProvincePredictDetail",res)
      })
      getPredictAQIData({
        province3:this.$store.state.province3,
      }).then(res =>{
        this.$store.commit("changeProvincePredictAQI",res)
      })
    }
  }
}
</script>

<style scoped lang="scss">
.main{
  height: 100%;
  display: flex;
  justify-content: center;

  .infinite-list{
    height: 100%;
    justify-content: space-around;

    .infinite-list-item{
      height: 20px;
    }
  }

  .btn-group{
    display: flex;

    .btn{
      width: 20px;
      height: 20px;

      i{
        color: #fff;
        font-size: 20px;
      }
    }
  }

  .active-nav{
    height: 10px;
    background-color: lightpink;
    color: black;
  }


}

</style>
