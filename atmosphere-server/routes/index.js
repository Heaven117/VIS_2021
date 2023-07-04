const express = require('express');
const router = express.Router();
const fs = require('fs');
const basePath = './data/';
const monthPath = './everymonth_province/';
const yearPath = './every_city_year_ave/';
const predictPath = './predict/';
const predictDetailPath = './predict_detail/'

//省份名-》文件名
function changeFileName(province){
    return province+'.json';
}
//年份名-》文件名
function changeFileNameByYear(year){
    return year+'.json';
}

//获取某省六年每日AQI数据
function sixYearAQI(fileName){
    let ans =[];
    let json = JSON.parse(fs.readFileSync(basePath+fileName));
    json.forEach(item =>{
        let newArr = [item.datetime,item.AQI];
        ans.push(newArr);
    })
    return ans;
}

//获取某省某年的每日
//[1, 91, 45, 125, 0.82, 34, 23, '良'],
// day,PM2.5,PM10,CO,NO2,SO2,O3,
function getProvinceByYear(fileName, year){
    let ans =[];
    let json = JSON.parse(fs.readFileSync(basePath+fileName));
    json.forEach(item =>{
        let ansYear = item.datetime.slice(0,4)
        if(ansYear === year){
            let ansDay = item.datetime[8] == '0' ? item.datetime[9] : item.datetime.slice(8,10)
            let evaluate = '优'
            let temp = item.AQI / 50
            console.log(parseInt(temp))
            switch (parseInt(temp)){
                case 0: evaluate = '优';break;
                case 1: evaluate = '良';break;
                case 2: evaluate = '轻度污染';break;
                case 3: evaluate = '中度污染';break;
                case 4: evaluate = '重度污染';break;
                default: evaluate = '严重污染';break;
            }

            let newArr = [ansDay, item["PM2.5"],item.PM10,item.CO,item.NO2,item.SO2,item.O3, evaluate];
            ans.push(newArr);
        }

    })
    return ans;
}

//获取雷达图IAQI数据
function getIAQI(fileName){
    let ans =[];
    let json = JSON.parse(fs.readFileSync(basePath+fileName));
    json.forEach(item =>{
        let newArr = [item.O3,item["PM2.5"],item.PM10,item.CO,item.NO2,item.SO2];
        ans.push(newArr);
    })
    return ans;
}

//获取某省未来十天AQI数据
function getPredictAQI(fileName){
    let ans =[];
    let json = JSON.parse(fs.readFileSync(predictPath+fileName));
    json.forEach(item =>{
        let trendNumber = item.trend;
        let tag = (item.trend >= 0) ? ((item.trend > 0) ? "<span  class='colorRed'>↑" : "<span  class='colorGrass'>") : "<span  class='colorGrass'>↓";
        let newArr = [item.datetime, item.AQI, tag + trendNumber + "%</span>"];
        ans.push(newArr);
    })
    return ans;

}

//获取 xx 与 xx 的关系散点图
function getTwoParamsRelationship(fileName, paramList) {
    let ans =[];
    let param1 = paramList[0];
    let param2 = paramList[1];
    let json = JSON.parse(fs.readFileSync(basePath+fileName));
    json.forEach(item =>{
        let newArr = [item[param1], item[param2]];
        ans.push(newArr);
    })
    return ans;
}

//获取某年的每个月份的温度和AQI关系图
//[[2,3,2,1,4,2,1,4,2,1,4,9],[1,2,3,2,1,4,2,1,4,2,1,4]] 温度 vs AQI
function getProvinceEveryMonth(fileName, year) {
    let ans =[];
    let temperature = []
    let aqi = []
    let json = JSON.parse(fs.readFileSync(monthPath+fileName));
    json.forEach(item =>{
        let ansYear = item.year_month.slice(0,4)
        if(ansYear === year){
            temperature.push(item.TEMP)
            aqi.push(item.AQI)
        }
    })
    ans.push(temperature)
    ans.push(aqi)
    return ans;
}
//获取某年所有城市的AQI值
function getEveryCityAQIByYear(fileName) {
    return JSON.parse(fs.readFileSync(yearPath + fileName))
}

//获取某个身份的未来十天各个污染物预测图
function getProvincePredictDetail(fileName) {
    let ans =[];
    let title = ["date", "2019-01-01", "2019-01-02","2019-01-03","2019-01-04","2019-01-05","2019-01-06","2019-01-07","2019-01-08","2019-01-09","2019-01-10"]
    let PM25 = ["PM25"];
    let PM10 = ["PM10"];
    let NO2 = ["NO2"];
    let SO2 = ["SO2"];
    let CO = ["CO"];
    let O3 = ["O3"];
    let json = JSON.parse(fs.readFileSync(predictDetailPath+fileName));
    json.forEach(item =>{
        PM25.push(item["PM2.5"])
        PM10.push(item.PM10)
        NO2.push(item.NO2)
        SO2.push(item.SO2)
        CO.push(item.CO)
        O3.push(item.O3)
    })
    ans.push(title)
    ans.push(PM25)
    ans.push(PM10)
    ans.push(NO2)
    ans.push(SO2)
    ans.push(CO)
    ans.push(O3)
    return ans;
}
//折线图中获取AQI预测
//获取某省未来十天AQI数据
function getPredictAQIData(fileName){
    let ans =[];
    let title = ["date", "2019-01-01", "2019-01-02","2019-01-03","2019-01-04","2019-01-05","2019-01-06","2019-01-07","2019-01-08","2019-01-09","2019-01-10"]
    let AQI = ["AQI"]
    let json = JSON.parse(fs.readFileSync(predictPath+fileName));
    json.forEach(item =>{
        AQI.push(item.AQI)
    })
    ans.push(title)
    ans.push(AQI)
    return ans;

}

router.get('/getSixYear',function (req,res){
    let province = req.query.province;
    let fileName = changeFileName(province);
    let renderData = sixYearAQI(fileName);
    console.log(renderData)
    res.json(renderData);
})
router.get('/getProvinceByYear',function (req,res){
    let province = req.query.province2;
    let year = req.query.year;
    let fileName = changeFileName(province);
    let renderData = getProvinceByYear(fileName,year);
    console.log(renderData)
    res.json(renderData);
})
router.get('/getIAQI',function (req,res){
    let province = req.query.province;
    let fileName = changeFileName(province);
    let renderData = getIAQI(fileName);
    console.log(renderData)
    res.json(renderData);
})
router.get('/getPredictAQI',function (req,res){
    let province = req.query.province;
    let fileName = changeFileName(province);
    let renderData = getPredictAQI(fileName);
    console.log(renderData)
    res.json(renderData);
})
router.get('/getTwoParamsRelationship',function (req,res){
    let province = req.query.province;
    let paramList = req.query.paramList;
    let fileName = changeFileName(province);
    let renderData = getTwoParamsRelationship(fileName, paramList)
    console.log(renderData)
    res.json(renderData);
})
router.get('/getProvinceEveryMonth',function (req,res){
    let province = req.query.province2;
    let year = req.query.year;
    let fileName = changeFileName(province);
    let renderData = getProvinceEveryMonth(fileName,year);
    console.log(renderData)
    res.json(renderData);
})
router.get('/getEveryCityAQIByYear',function (req,res){
    let year = req.query.year;
    let fileName = changeFileNameByYear(year)
    let renderData = getEveryCityAQIByYear(fileName)
    console.log(renderData)
    res.json(renderData);
})
router.get('/getProvincePredictDetail',function (req,res){
    let province = req.query.province3;
    let fileName = changeFileName(province);
    let renderData = getProvincePredictDetail(fileName);
    console.log(renderData)
    res.json(renderData);
})
router.get('/getPredictAQIData',function (req,res){
    let province = req.query.province3;
    let fileName = changeFileName(province);
    let renderData = getPredictAQIData(fileName);
    console.log(renderData)
    res.json(renderData);
})

module.exports = router;
