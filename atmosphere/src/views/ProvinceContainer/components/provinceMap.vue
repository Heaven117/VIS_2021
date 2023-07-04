<template>
  <div id="mapChart" ref="mapChart" style="width:100%; height: 100%"></div>
</template>
<script>
//获取地图数据
import '/node_modules/echarts/map/js/province/anhui';
import '/node_modules/echarts/map/js/province/aomen';
import '/node_modules/echarts/map/js/province/beijing';
import '/node_modules/echarts/map/js/province/chongqing';
import '/node_modules/echarts/map/js/province/fujian';
import '/node_modules/echarts/map/js/province/gansu';
import '/node_modules/echarts/map/js/province/guangdong';
import '/node_modules/echarts/map/js/province/guangxi';
import '/node_modules/echarts/map/js/province/guizhou';
import '/node_modules/echarts/map/js/province/hainan';
import '/node_modules/echarts/map/js/province/hebei';
import '/node_modules/echarts/map/js/province/heilongjiang';
import '/node_modules/echarts/map/js/province/henan';
import '/node_modules/echarts/map/js/province/hubei';
import '/node_modules/echarts/map/js/province/hunan';
import '/node_modules/echarts/map/js/province/jiangsu';
import '/node_modules/echarts/map/js/province/jiangxi';
import '/node_modules/echarts/map/js/province/jilin';
import '/node_modules/echarts/map/js/province/liaoning';
import '/node_modules/echarts/map/js/province/neimenggu';
import '/node_modules/echarts/map/js/province/ningxia';
import '/node_modules/echarts/map/js/province/qinghai';
import '/node_modules/echarts/map/js/province/shandong';
import '/node_modules/echarts/map/js/province/shanghai';
import '/node_modules/echarts/map/js/province/shanxi';
import '/node_modules/echarts/map/js/province/shanxi1';
import '/node_modules/echarts/map/js/province/sichuan';
import '/node_modules/echarts/map/js/province/taiwan';
import '/node_modules/echarts/map/js/province/tianjin';
import '/node_modules/echarts/map/js/province/xianggang';
import '/node_modules/echarts/map/js/province/xizang';
import '/node_modules/echarts/map/js/province/yunnan';
import '/node_modules/echarts/map/js/province/zhejiang';
import {getEveryCityAQIByYear} from "@/request/api";
export default {
  data(){
    return{
      renderData:[],
    }
  },
  computed:{
    province: function (){ return this.$store.state.province2},
    year:function(){ return this.$store.state.year}
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      getEveryCityAQIByYear({
        // province2:this.province,
        year:this.year
      }).then(res =>{
        this.renderData = res;
        this.mapFn();
      })

    },
    mapFn() {
      var mapChart = this.$echarts.init(
          document.getElementById("mapChart")
      );
      mapChart.setOption({
        backgroundColor: "", //背景颜色
        title: {
          text: "",
          subtext: "",
          color: "#fff",
          x: "center",
        },
        //是视觉映射组件，用于进行『视觉编码』，也就是将数据映射到视觉元素（视觉通道）。
        visualMap: {
          // 左下角定义 在选中范围中的视觉元素 渐变地区颜色
          type: "piecewise", // 类型为分段型
          top: "bottom",
          // calculable: true, //是否显示拖拽用的手柄（手柄能拖拽调整选中范围）。
          right: 10,
          splitNumber: 6,
          seriesIndex: [0],
          itemWidth: 20, // 每个图元的宽度
          itemGap: 2, // 每两个图元之间的间隔距离，单位为px
          pieces: [
            // 自定义每一段的范围，以及每一段的文字
            {
              gte: 301,
              label: "严重污染(>300)",
              color: "#721424"
            }, // 不指定 max，表示 max 为无限大（Infinity）。
            {
              gte: 201,
              lte: 300,
              label: "重度污染(201-300)",
              color: "#8c1a4b",
            },
            {
              gte: 151,
              lte: 200,
              label: "中度污染(151-200)",
              color: "#e93222",
            },
            {
              gte: 101,
              lte: 150,
              label: "轻度污染(101-150)",
              color: "#ef8433",
            },
            {
              gte: 50,
              lte: 100,
              label: "良(51-100)",
              color: "#fffc53",
            },
            {
              gte: 0,
              lte: 50,
              label: "优(0-50)",
              color: "#67e043"
            }, // 不指定 min，表示 min 为无限大（-Infinity）。
          ],
          textStyle: {
            color: "#BDBDBD",
          },
        },


        // 提示框，鼠标移入
        tooltip: {
          show: true, //鼠标移入是否触发数据
          trigger: "item", //出发方式
          formatter: "{b}-污染指数：{c}",
        },
        //配置地图的数据，并且显示
        series: [
          {
            name: "地图",
            type: "map", //地图种类
            map: this.province, //地图类型。
            // data: [{"name": "丽水市", "value": 40.14}, {"name": "台州市", "value": 41.84}, {"name": "嘉兴市", "value": 56.25}, {"name": "宁波市", "value": 44.29}, {"name": "杭州市", "value": 49.65}, {"name": "温州市", "value": 42.93}, {"name": "湖州市", "value": 56.27}, {"name": "绍兴市", "value": 50.8}, {"name": "舟山市", "value": 34.18}, {"name": "衢州市", "value": 44.25}],
            data: this.renderData,
            itemStyle: {
              normal: {
                label: {
                  show: true, //默认是否显示省份名称
                },
                areaStyle: {
                  color: "#FAFAFA", //默认的地图板块颜色
                },
                borderWidth: 1,
                borderColor: "#D9D9D9",
              },
              //地图区域的多边形 图形样式。
              emphasis: {
                label: {
                  show: true, //选中状态是否显示省份名称
                },
                areaStyle: {
                  color: "#90c31d", //选中状态的地图板块颜色
                },
              },
            },
            zoom: 1, //放大比例
            label: {
              //图形上的文本标签，可用于说明图形的一些数据信息
              show: true,
            },
          },
          {
            type: "scatter",
            showEffectOn: "render", //配置什么时候显示特效
            coordinateSystem: "geo", //该系列使用的坐标系
            symbolSize: 10, //标记的大小
            data: [{name: "宜昌", value: [111.3, 30.7, 130]}],
            zlevel: 99999,
          },
        ],
      });

      mapChart.on("dblclick",() => {
        this.changeChartData()

      })

      window.addEventListener("resize", () => {
        // 自动渲染echarts
        mapChart.resize();
      });
    },

    changeChartData(){
      this.$emit("backToChinaMap");
    }

  },
  mounted() {
    this.mapFn();
  },
  watch: {
    "year"() {
      this.initData();
      console.log(this.renderData)
    },
    "province"() {
      this.initData();
    }
  }
};
</script>
<style scoped>
.chinaecharts {
  width: 100%;
  height: 500px;
}

/*#mapChart {*/
/*  width: 100%;*/
/*  height: 500px;*/
/*}*/
</style>
