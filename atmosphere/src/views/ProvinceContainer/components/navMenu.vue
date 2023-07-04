<template>
  <div class="main">
    <div class="d-flex">
    <ul class="infinite-list flex-1 d-flex" style="overflow:auto">
      <li v-for="i in render"
          :key="i"
          @click="chooseProvince(i)"
          class="infinite-list-item"
          :class="i === activeProvince ? activeStyle : null"
          >{{ i }}</li>
    </ul>
    <div class="btn-group">
      <div @click="lastPage" class="btn"><i class="el-icon-caret-left"></i></div>
      <div @click="nextPage" class="btn"><i class="el-icon-caret-right"></i> </div>
      </div>
    </div>
  </div>
</template>

<script>
const provinces = [
  "北京","上海","天津","重庆","安徽",
  "福建","甘肃","广东","广西","贵州",
  "海南","河北","河南","黑龙江","湖北",
  "湖南","江苏","吉林","江西","辽宁",
  "内蒙古","宁夏","青海","山东","山西",
  "陕西","四川","台湾","西藏","香港",
  "新疆","云南","浙江"]

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
    activeProvince: function (){ return this.$store.state.province2},
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
      this.$store.commit('changeProvince2',province)
      console.log(this.$store.state.province2 + "xindeditutuu")
    }
  },
  // watch: {
  //   "year"() {
  //     this.initData();
  //   },
  //   "province"() {
  //     this.initData()
  //   }
  // }
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
      height: 40px;
    }

    .active-nav{
      height: 20px;
      background-color: aquamarine;
      color: black;
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


}

</style>
