import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

const path = "/chartData/";

export default new Vuex.Store({
  state: {
    province:"浙江",
    province2:"北京",
    province3:"北京",
    year:"2018",
    sixCityName:"杭州",
    paramList:["PM2.5","U"],
    sixRenderData: require("../../public/chartData/北京.json"),
    leftCenterData: require("../../public/2015-12-18.json"),
    rightBottomData: require("../../public/predict_data.json"),
    leftTopData: require("../../public/relationship_data.json"),
    //第二页的数据
    provinceDataByYear: require("../../public/province_year_data.json"),
    provinceEveryMonth: require("../../public/province_every_month.json"),
    everyCityAQIByYear: require("../../public/every_city_ave_year.json"),
    //第三页数据
    provincePredictDetail: require("../../public/province_predict_detail.json"),
    provincePredictAQI:require("../../public/predict_aqi.json"),
  },
  getters: {},
  mutations: {
    changeProvince(state,province){
      state.province = province;
    },
    changeProvince2(state,province){
      state.province2 = province;
    },
    changeProvince3(state,province){
      state.province3 = province;
    },
    changeYear(state,year){
      state.year = year;
    },
    changeTwoParams(state,param1,param2){
      state.paramList[0] = param1;
      state.paramList[1] = param2;
    },
    changeLeftTopData(state, relationshipData){
      state.leftTopData = relationshipData;
    },
    changeSixCityName(state,cityName){
      state.sixCityName = cityName;
    },
    changeSixRenderData(state,sixRenderData){
      state.sixRenderData = sixRenderData;
    },
    changeLeftCenterData(state,data){
      state.leftCenterData = data;
    },
    changeRightBottomData(state,predictData){
      state.rightBottomData = predictData;
      console.log("改变预测")
      // console.log(predictData)
    },
    //改变第二页的省份
    changeProvinceDataByYear(state, data){
      state.provinceDataByYear = data;
    },
    //改变第二页每个月的温度和AQI
    changeProvinceEveryMonth(state, data){
      state.provinceEveryMonth = data
    },
    //改变第二页城市的AQI值
    changeEveryCityAQIByYear(state, data){
      state.everyCityAQIByYear = data
    },
    //改变第三页的6大污染物预测数据
    changeProvincePredictDetail(state, data){
      state.provincePredictDetail = data
    },
    //改变第三页的AQI预测数据
    changeProvincePredictAQI(state, data){
      state.provincePredictAQI = data
    },
  },
  actions: {
    changeSixDataAction(context,sixData){
      let newPath = path+sixData.name+".json";
      // console.log(newPath);
      axios.get(newPath).then( res =>{
        context.commit("changeSixRenderData",res.data);
      })
    },
  },
  modules: {
  }
})
