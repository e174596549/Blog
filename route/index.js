const comment = require('../model/comment')

var sendHtml = function(path, response) {
    var fs = require('fs')
    var options = {
        encoding: 'utf-8'
    }
    path = 'template/' + path
    fs.readFile(path, options, function(err, data) {
        console.log(`读取的html文件 ${path} 内容是`, data)
        response.send(data)
    })
}

var blog = {
    path: '/blog',
    method: 'get',
    func: function(request, response) {
        var path = 'blog_index.html'
        sendHtml(path, response)
    }
}

var leo = {
    path: '/leo',
    method: 'get',
    func: function(request, response) {
        var path = 'leo.html'
        sendHtml(path, response)
    }
}

var index = {
    path: '/',
    method: 'get',
    func: function(request, response) {
        var path = 'index.html'
        sendHtml(path, response)
    }
}

var routes = [
    blog,
    leo,
    index
]

module.exports.routes = routes
