<template>
  <div class="block">
    <el-timeline >
      <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :color="activity.color"
          @click="chooseYear(activity,index)"
      >
        <div @click="chooseYear(activity.timestamp,index)"
             class="content"
        >
          {{activity.timestamp}}
        </div>
      </el-timeline-item>
    </el-timeline>
</div>
</template>
<script>

export default {
  data() {
    return {
      activities: [
        {
          timestamp: '2013',
          color:"",
        }, {
          timestamp: '2014',
          color:"",
        }, {
          timestamp: '2015',
          color:"",
        }, {
          timestamp: '2016',
          color:"",
        },{
          timestamp: '2017',
          color:"",
        },{
          timestamp: '2018',
          color:"",
        }]
    };
  },
  created() {
    this.activities.forEach(item =>{
      if( this.$store.state.year === item.timestamp)
        item.color="#0bbd87"
    })
  },
  methods:{
    chooseYear(year,index){
      this.$store.commit('changeYear',year);
      console.log(this.$store.state.province2 + "xindeshengfen " + this.$store.state.year + "xindeyear" )
      // getProvinceByYear({
      //   province2:this.$store.state.province2,
      //   year:this.$store.state.year,
      // }).then(res =>{
      //   this.$store.commit("changeProvinceDataByYear",res)
      // })
      // getProvinceEveryMonth({
      //   province2:this.$store.state.province2,
      //   year:this.$store.state.year,
      // }).then(res =>{
      //   this.$store.commit("changeProvinceEveryMonth",res)
      // })
      this.activities.forEach(item =>{
        item.color=""
      })
      this.activities[index].color = '#0bbd87';
    }
  }
};
</script>
<style lang="scss">
.content{
  color: #999999;
}
</style>
