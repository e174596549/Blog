// 引入 express 并且创建一个 express 实例赋值给 app
var express = require('express')
var app = express()
var bodyParser = require('body-parser')

app.use(bodyParser.json())

app.use(function( req, res, next) {
    console.log(req.originalUrl)
    next()
});

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
    else  next();
});
// 配置静态文件目录
app.use(express.static('static'))


const registerRoutes = function(app, routes) {
    for (var i = 0; i < routes.length; i++) {
        var route = routes[i]
        // 下面这段是重点
        app[route.method](route.path, route.func)
    }
}

// const routeModules = [
//     './route/index',
//     './route/blog',
//     './route/comment',
// ]

// 导入 route/index.js 的所有路由数据
const routeIndex = require('./route/index')
registerRoutes(app, routeIndex.routes)

// 导入 route/blog 的所有路由数据
const routeBlog = require('./route/blog')
registerRoutes(app, routeBlog.routes)

// 导入 route/comment 的所有路由数据
const routeComment = require('./route/comment')
registerRoutes(app, routeComment.routes)

// 导入 route/minesweeper 的所有路由数据
const routeMinesweeper = require('./route/minesweeper')
registerRoutes(app, routeMinesweeper.routes)

// listen 函数的第一个参数是我们要监听的端口
// 这个端口是要浏览器输入的
// 默认的端口是 80
// 所以如果你监听 80 端口的话，浏览器就不需要输入端口了
// 但是 1024 以下的端口是系统保留端口，需要管理员权限才能使用
var server = app.listen(8081, function() {
    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)
})
