<template>
  <div id="mapChart" ref="mapChart" style="width:100%; height: 100%"></div>
</template>
<script>
import '../../node_modules/echarts/map/js/china';
import {getSixYear,getIAQI,getPredictAQI} from "@/request/api";

export default {
  name: "ChinaEcharts",
  methods: {
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
            map: "china", //地图类型。
            data: [
              {
                "ename":"guizhou",
                "name": "贵州",
                "value": 108.29
              },
              {
                "ename":"liaoning",
                "name": "辽宁",
                "value": 94.78
              },
              {
                "ename":"guangdong",
                "name": "广东",
                "value": 113.45
              },
              {
                "ename":"xianggang",
                "name": "香港",
                "value": 78.81
              },
              {
                "ename":"shanxi",
                "name": "陕西",
                "value": 133.65
              },
              {
                "ename":"hebei",
                "name": "河北",
                "value": 107.93
              },
              {
                "ename":"jilin",
                "name": "吉林",
                "value": 72.71
              },
              {
                "ename":"fujian",
                "name": "福建",
                "value": 112.09
              },
              {
                "ename":"hainan",
                "name": "海南",
                "value": 51.61
              },
              {
                "ename":"sichuan",
                "name": "四川",
                "value": 71.99
              },
              {
                "ename":"heilongjiang",
                "name": "黑龙江",
                "value": 68.36
              },
              {
                "ename":"hunan",
                "name": "湖南",
                "value": 164.16
              },
              {
                "ename":"xizang",
                "name": "西藏",
                "value": 34.62
              },
              {
                "ename":"chongqing",
                "name": "重庆",
                "value": 141.85
              },
              {
                "ename":"jiangsu",
                "name": "江苏",
                "value": 152.91
              },
              {
                "ename":"beijing",
                "name": "北京",
                "value": 113.48
              },
              {
                "ename":"shanghai",
                "name": "上海",
                "value": 92.28
              },
              {
                "ename":"shandong",
                "name": "山东",
                "value": 187.41
              },
              {
                "ename":"zhejiang",
                "name": "浙江",
                "value": 80.0
              },
              {
                "ename":"guangxi",
                "name": "广西",
                "value": 163.6
              },
              {
                "ename":"tianjin",
                "name": "天津",
                "value": 237.89
              },
              {
                "ename":"gansu",
                "name": "甘肃",
                "value": 96.85
              },
              {
                "ename":"yunnan",
                "name": "云南",
                "value": 68.61
              },
              {
                "ename":"jiangxi",
                "name": "江西",
                "value": 154.09
              },
              {
                "ename":"anhui",
                "name": "安徽",
                "value": 162.79
              },
              {
                "ename":"taiwan",
                "name": "台湾",
                "value": 41.47
              },
              {
                "ename":"xinjiang",
                "name": "新疆",
                "value": 50.57
              },
              {
                "ename":"hubei",
                "name": "湖北",
                "value": 144.44
              },
              {
                "ename":"qinghai",
                "name": "青海",
                "value": 32.34
              },
              {
                "ename":"henan",
                "name": "河南",
                "value": 247.17
              },
              {
                "ename":"ningxia",
                "name": "宁夏",
                "value": 129.68
              },
              {
                "ename":"shanxi",
                "name": "山西",
                "value": 141.61
              },
              {
                "ename":"neimenggu",
                "name": "内蒙古",
                "value": 53.68
              },
            ],
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

      mapChart.on("click",(params) => {
        this.changeChartData(params.data)
      })
      window.addEventListener("resize", () => {
        // 自动渲染echarts
        mapChart.resize();
      });
    },
    changeChartData(params){
      console.log(params)
      console.log("开始改变")
      this.$emit("changeMap",params)
      //改变中间chart数据
      getSixYear({
        province:params.name
      }).then( res =>{
        // console.log(res);
        this.$store.commit("changeSixCityName",params.name)
        this.$store.commit("changeSixRenderData",res);
      })

      getIAQI({
        province:params.name
      }).then(res =>{
        // console.log(res);
        this.$store.commit("changeLeftCenterData",res)
      })

      getPredictAQI({
        province:params.name
      }).then(res=>{
        // console.log(res);
        this.$store.commit("changeRightBottomData",res)
      })
    }

  },
  mounted() {
    this.mapFn();
  },
};
</script>
<style scoped>
</style>
