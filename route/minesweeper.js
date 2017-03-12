const gamerank = require('../model/gamerank')

var add = {
    path: '/game/minesweeper/add',
    method: 'post',
    func: function(request, response) {
        // 浏览器发过来的数据我们一般称之为 form (表单)
        var form = request.body
        console.log('从前端收到：', form);
        var b = gamerank.new(form)
        var all = gamerank.all(form)
        var r = JSON.stringify(all)
        response.send(r)
    }
}

var all = {
    path: '/game/minesweeper/all',
    method: 'get',
    func: function(request, response) {
        // 浏览器发过来的数据我们一般称之为 form (表单)
        var a = gamerank.all()
        var r = JSON.stringify(a)
        response.send(r)
    }
}

var routes = [
    add,
    all
]

module.exports.routes = routes
