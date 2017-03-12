var fs = require('fs')


var filePath0 = 'db/level0.json'
var filePath1 = 'db/level1.json'
var filePath2 = 'db/level2.json'

// 这是一个用来存储 comment 数据的对象
const ModelComment = function(form) {
    // a = b || c 意思是如果 b 是 undefined 或者 null 就把 c 赋值给 a
    this.level = form.level || 0
    this.player = form.player || ''
    this.score = form.score || []
    //this._id = form.blog_id || 0
    // 生成一个 unix 时间, unix 时间是什么, 上课会说
    this.created_time = Math.floor(new Date() / 1000)
}

const loadData = function(filePath) {
    // 确保文件有内容, 这里就不用处理文件不存在或者内容错误的情况了
    // 注意, 一般都是这样不处理的
    var content = fs.readFileSync(filePath, 'utf8')
    var data = JSON.parse(content)
    return data
}


var b = {
    data: {
        0: loadData(filePath0),
        1: loadData(filePath1),
        2: loadData(filePath2)
    }
}

b.all = function(level) {
    return this.data
}

b.new = function(form) {
    var m = new ModelComment(form)
    // 设置新数据的 id

    var tempData = this.data[form.level]

    for (var i = 0; i < tempData.length; i++) {
        if (tempData[i].score == m.score) {
            return m
        }

    }

    var d = tempData[tempData.length - 1]
    if (d == undefined) {
        m.id = 1
    } else {
        m.id = d.id + 1
    }
    // 把 数据 加入 this.data 数组
    tempData.push(m)
    // 把 最新数据 保存到文件中
    this.save(form.level)
    // 返回新建的数据
    return m

}
var sort = function(object) {
    let sortedArr = []
    let max = {}
    for (let i = 0; i < object.length; i++) {
        for (let j = 0; j < object.length - i - 1; j++) {
            console.log(object[i].score)
            if (object[j].score > object[j + 1].score) {
                max = object[j]
                object[j] = object[j + 1]
                object[j + 1] = max
            }
        }
    }
    object.splice(10)
}
b.save = function(level) {
    let arr = this.data[level]
    sort(arr)
    console.log('排序后', arr);
    var s = JSON.stringify(this.data[level])
    if (level == 0) {
        fs.writeFile(filePath0, s, (err) => {
            if (err) {
                console.log(err)
            } else {
                console.log('保存成功')
            }
        })
    }
    if (level == 1) {
        fs.writeFile(filePath1, s, (err) => {
            if (err) {
                console.log(err)
            } else {
                console.log('保存成功')
            }
        })
    }
    if (level == 2) {
        fs.writeFile(filePath2, s, (err) => {
            if (err) {
                console.log(err)
            } else {
                console.log('保存成功')
            }
        })
    }
}

// 导出一个对象的时候用 module.exports = 对象 的方式
// 这样引用的时候就可以直接把模块当这个对象来用了(具体看使用方法)
module.exports = b
