var ajax = function(request) {
    /*
    request 是一个 object, 有如下属性
        method, 请求的方法, string
        url, 请求的路径, string
        data, 请求发送的数据, 如果是 GET 方法则没这个值, string
        callback, 响应回调, function

    本题不会就放弃, 本题带了一个用法在下方
    */
    var r = new XMLHttpRequest()
    r.open(request.method, request.url, true)
    if (request.contentType !== undefined) {
        r.setRequestHeader('Content-Type', request.contentType)
    }
    r.onreadystatechange = function(event) {
        if (r.readyState === 4) {
            request.callback(r.response)
        }
    }
    if (request.method === 'GET') {
        r.send()
    } else {
        r.send(request.data)
    }
}

var blogTemplate = function(blog) {
    var id = blog.id
    var title = blog.title
    var author = blog.author
    var d = new Date(blog.created_time * 1000)
    var time = d.toLocaleString()
    var t = `
    <div class="gua-blog-cell">
        <div class="blog-content">
            <a class="blog-title" href="#" data-id="${id}">
                ${title}
            </a>
        </div>
        <div class="">
            <span>${author}</span> @ <time>${time}</time>
        </div>
    </div>
    `
    return t
}
// <button class="blog-delete">删除blog</button>
// <div class="blog-comments">
//     <div class='new-comment'>
//         <input class='comment-blog-id' type=hidden value="${id}">
//         <input class='comment-author' value="">
//         <input class='comment-content' value="">
//         <button class='comment-add'>添加评论</button>
//         <button class="comment-delete">删除评论</button>
//     </div>
// </div>

var insertBlogAll = function(blogs) {
    var html = ''
    for (var i = 0; i < blogs.length; i++) {
        var b = blogs[i]
        var t = blogTemplate(b)
        html += t
    }
    // 把数据写入 .gua-blogs 中, 直接用覆盖式写入
    var div = document.querySelector('.gua-blogs')
    div.innerHTML = html
}

var blogAll = function() {
    var request = {
        method: 'GET',
        url: '/api/blog/all',
        contentType: 'application/json',
        callback: function(response) {
            // 不考虑错误情况(断网/服务器返回错误等等)
            console.log('响应', response)
            var blogs = JSON.parse(response)
            window.blogs = blogs
            insertBlogAll(blogs)
        }
    }
    ajax(request)
}

var blogNew = function(form) {
    // var form = {
    //     title: "测试标题",
    //     author: "gua",
    //     content: "测试内容",
    // }
    var data = JSON.stringify(form)
    var request = {
        method: 'POST',
        url: '/api/blog/add',
        data: data,
        contentType: 'application/json',
        callback: function(response) {
            console.log('响应', response)
            var res = JSON.parse(response)
            console.log(res)
            location.reload()
            bindDelButton()
        }
    }
    ajax(request)
}

var e = function(selector) {
    return document.querySelector(selector)
}

var eAll = function(selector) {
    return document.querySelectorAll(selector)
}

var bindEvent = function(element, eventName, callback) {
    element.addEventListener(eventName, callback)
}

var bindAll = function(selector, eventName, callback) {
    var elements = document.querySelectorAll(selector)
    for (var i = 0; i < elements.length; i++) {
        var e = elements[i]
        bindEvent(e, eventName, callback)
    }
}

var appendHtml = function(element, html) {
    element.insertAdjacentHTML('beforeend', html)
}

var bindEvents = function() {
    // 绑定发表新博客事件
    var button = e('#id-button-submit')
    button.addEventListener('click', function(event) {
        console.log('click new')
        // 得到用户填写的数据
        var form = {
            title: e('#id-input-title').value,
            author: e('#id-input-author').value,
            content: e('#id-input-content').value,
            mima: e('#id-input-mima').value
        }
        // 用这个数据调用 blogNew 来创建一篇新博客
        blogNew(form)
    })

}

var bindShowDetailButton = function() {
    bindAll('.blog-title', 'click', function(event) {
        //得到需要显示博客详情的id
        var form = {
            id: event.target.dataset.id,
        }
        console.log('bindEvents event.target.dataset.id: ', event.target.dataset.id)
        showDetail(form)
    })
}

var showDetail = function(form) {
    console.log('showDetail mId:', form)
    var data = JSON.stringify(form)
    var request = {
        method: 'POST',
        url: '/api/blog/detail',
        data: data,
        contentType: 'application/json',
        callback: function(response) {
            console.log('响应', response)
            var res = JSON.parse(response)
            console.log(res)
            insertBlogComment(res)
        }
    }
    ajax(request)
}

var insertBlogComment = function(comment) {
    console.log('comment.comment', comment.content);
    let element = eAll('.blog-title')
    var t = `
            <div class="blog-content-fulltext">
                ${comment.content}
            </div>
    `
    for (var i = 0; i < element.length; i++) {
        if (element[i].dataset.id == comment.id) {
            console.log('element[i].parentElement.childNodes.length:', element[i].parentElement.childNodes.length)
            if (element[i].parentElement.childNodes.length === 3) {
                appendHtml(element[i].parentElement, t)
            }

        }
    }
    // appendHtml(element, html)
}

function bindDelButton() {
    console.log('bindDelButton');
    var delComment = eAll('.comment-delete')
    console.log('bindDelButton delComment =', delComment);
    for (let i = 0; i < delComment.length; i++) {
        delComment[i].addEventListener('click', (event) => {
            console.log('button delComment.id', event.target.id);
            target.parentElement.remove()
        })
    }

    var delBlog = eAll('.blog-delete')
    console.log('bindDelButton delBlog =', delBlog);
    for (let i = 0; i < delBlog.length; i++) {
        delBlog[i].addEventListener('click', (event) => {
            console.log('button delBlog.id', event.target.id);
        })
    }
}

var __main = function() {
    // 载入博客列表
    blogAll()
    // 绑定事件
    bindEvents()

    setTimeout(function() {
        //bindDelButton()
        bindShowDetailButton()
    }, 10)
}

__main()