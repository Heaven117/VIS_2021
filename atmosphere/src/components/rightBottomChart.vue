<template>
  <div id="right-bottom" style="width:100%; height: 100%">
    <div class="d-flex jc-center body-box flex-1">
      <dv-scroll-board ref="dvscrollbar" :config="config" style="width:100%;height:100%" />
    </div>
  </div>
</template>

<script>
export default {
  computed:{
    renderData: function (){
      return this.$store.state.rightBottomData;
    },

  },
  mounted() {
    this.updateData(this.renderData);
    console.log("更新完后的")
    console.log(this.config["data"])
  },
  data(){
    return{
      config: {
        header: ["未来日期", "AQI预测值", "趋势"],
        //[["datetime",
        data: [],
        rowNum: 5 , //表格行数
        headerHeight: 35,
        headerBGC: "#0f1325", //表头
        oddRowBGC: "#0f1325", //奇数行
        evenRowBGC: "#171c33", //偶数行
        // index: true,
        columnWidth: [100],
        align: ["center","center","center"]
      }
    }
  },
  methods:{
    updateData(newData){
      console.log(this.renderData)
      console.log("在更新")
      // this.$set(this.config, t ,this.renderData)
      this.config.data = newData
      this.$refs['dvscrollbar'].updateRows(newData)

    }
  },
  watch:{
    "renderData"() {
      console.log("数据更新了")
      console.log(typeof this.config.data)
      this.updateData(this.renderData)
      console.log("config"+this.config["data"])
      console.log("______???_______")
    },
  }

  // methods:{
  //   data(){
  //       return{
  //         config: {
  //           header: ["未来日期", "AQI预测值", "趋势"],
  //           //[["datetime",
  //           data: this.renderData,
  //           rowNum: 5 , //表格行数
  //           headerHeight: 35,
  //           headerBGC: "#0f1325", //表头
  //           oddRowBGC: "#0f1325", //奇数行
  //           evenRowBGC: "#171c33", //偶数行
  //           // index: true,
  //           columnWidth: [80],
  //           align: ["center"]
  //         }
  //       }
  //   }
  // },

  //
  // data(){
  //   return{
  //     config: {
  //       header: ["未来日期", "AQI预测值", "趋势"],
  //       //[["datetime",
  //       data: [
  //         ["组件1", "dev-1", "<span  class='colorGrass'>↑75%</span>"],
  //         ["组件2", "dev-2", "<span  class='colorRed'>↓33%</span>"],
  //         ["组件3", "dev-3", "<span  class='colorGrass'>↑100%</span>"],
  //         ["组件4", "rea-1", "<span  class='colorGrass'>↑94%</span>"],
  //         ["组件5", "rea-2", "<span  class='colorGrass'>↑95%</span>"],
  //         ["组件6", "fix-2", "<span  class='colorGrass'>↑63%</span>"],
  //         ["组件7", "fix-4", "<span  class='colorGrass'>↑84%</span>"],
  //         ["组件8", "fix-7", "<span  class='colorRed'>↓46%</span>"],
  //         ["组件9", "dev-2", "<span  class='colorRed'>↓13%</span>"],
  //         ["组件10", "dev-9", "<span  class='colorGrass'>↑76%</span>"]
  //       ],
  //       rowNum: 5 , //表格行数
  //       headerHeight: 35,
  //       headerBGC: "#0f1325", //表头
  //       oddRowBGC: "#0f1325", //奇数行
  //       evenRowBGC: "#171c33", //偶数行
  //       // index: true,
  //       columnWidth: [80],
  //       align: ["center"]
  //     }
  //   }
  // }
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
