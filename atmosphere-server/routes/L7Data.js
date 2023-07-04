const express = require('express');
const router = express.Router();
const csv = require('csvtojson')
const fs = require('fs');
const basePath = './daily.csv';

//获取SQ2最高的10个地区
router.get('/getSQ2',async function(req,res){
    let param = req.query.param;
    let ans =[];
    const converter = csv()
    .fromFile(basePath)
    .then((json) => {
        json.sort((a,b)=>{
            // return a['SO2(微克每立方米)'] < b['SO2(微克每立方米)']
            return a[param] < b[param];
        })
        let count = 0;
        let lat = 0, lon = 0;
        for(let i in json){
            if(count>= 10) break;
            else{
                if(Math.abs(lat- json[i].lat) > 3 && Math.abs(lon- json[i].lon) > 3 ){
                    lat = json[i].lat;
                    lon = json[i].lon;
                    
                    ans.push(json[i]);
                    count++;
                }
                else continue;
            }
        }
        res.json(ans);
    })
})

module.exports = router;

