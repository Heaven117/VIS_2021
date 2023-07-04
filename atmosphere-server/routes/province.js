const express = require('express');
const router = express.Router();
const fs = require('fs');
const basePath = './data/';

//省份名-》文件名
function changeFileName(province){
    return province+'.json';
}

router.get('/getCanlendarData',function (req,res){
    let province = req.query.province;
    let year= req.query.year
    let fileName = changeFileName(province);
    let renderData = getCanlendarData(fileName,year);
    console.log(renderData)
    res.json(renderData);
})

module.exports = router;

//获取某省某年每日AQI数据
function getCanlendarData(fileName,year){
    let ans =[];
    let json = JSON.parse(fs.readFileSync(basePath+fileName));
    json.forEach(item =>{
        if(item.datetime.slice(0,4) === year){
            let newArr = [item.datetime,item.AQI];
            ans.push(newArr);
        }
    })
    return ans;
}
