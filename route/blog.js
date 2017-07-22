const blog = require('../model/blog')


var all = {
    path: 'http://localhost:8081/api/blog/all',
    method: 'get',
    func: function(request, response) {
        var blogs = blog.all()
        var r = JSON.stringify(blogs)
        response.send(r)
    }
}

var add = {
    path: 'http://localhost:8081/api/blog/add',
    method: 'post',
    func: function(request, response) {
        // 浏览器发过来的数据我们一般称之为 form (表单)
        var form = request.body
        // 插入新数据并返回
        // 验证密码
        if (form.mima == '1') {
            console.log('mima == 1');
            var b = blog.new(form)
            var r = JSON.stringify(b)
        } else {
            console.log('mima is error');
            var r = JSON.stringify({

            })
        }
        response.send(r)
    }
}

var detail = {
    path: 'http://localhost:8081/api/blog/detail',
    method: 'post',
    func: function(request, response) {
        // 浏览器发过来的数据我们一般称之为 form (表单)
        var form = request.body
        console.log('detail form:', form)
        var b = blog.detail(form)
        var r = JSON.stringify(b)
        // 插入新数据并返回
        // 验证密码
        // if (form.id == '1') {
        //     console.log('mima == 1');
        //     var b = blog.new(form)
        //     var r = JSON.stringify(b)
        // } else {
        //     console.log('mima is error');
        //     var r = JSON.stringify({
        //
        //     })
        // }
        response.send(r)
    }
}

var routes = [
    all,
    add,
    detail,
]

module.exports.routes = routes
