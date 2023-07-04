// node后端服务器
const http = require('http');
const badyParser = require('body-parser');
const express = require('express');
const index = require('./routes/index')
const province = require('./routes/province')
const L7 = require('./routes/L7Data')

const port = 9000;

let app = express();
// let server = http.createServer(app);

//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, No-Cache, X-Requested-With, If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, Content-Type, X-E4M-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
// 定义参数的格式
app.use(badyParser.json());
// 获取请求参数
app.use(badyParser.urlencoded({
    extended: false
}));
// 后端api路由
app.use('/', index);
app.use('/province',province);
app.use('/L7',L7);

// 启动监听
app.listen(port, '127.0.0.1', () => {
    console.log(`Example app listening on port ${port}`)
    // var host = server.address().address
    // var port = server.address().port

    // console.log("应用实例，访问地址为 http://%s:%s", host, port)
    // console.log(' success!! port:8888')
})
