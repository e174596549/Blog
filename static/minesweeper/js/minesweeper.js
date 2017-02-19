//定义唯一全局变量入口
var mineApp = function() {
        this.randomLineArr = []
            //已点击位置的坐标数组
        this.clicked = []
            //游戏时间
        this.startTime = 0
        this.finishTime = 0
            //标记为雷的位置数组
        this.marked = []
            //需要排除地雷的总数
        this.wholeMine = 0
            //地雷id数组
        this.mineMap = []
            //更新剩余地雷书的元素
        this.unfindMinesNumber = e('#unFind-mines-number')
    }
    //更新剩余地雷数
var upDateUnfindMinesNumber = function() {
        console.log("upDateUnfindMinesNumber", `gVar.mineMap = ${gVar.mineMap} gVar.marked = ${gVar.marked}`);
        gVar.unfindMinesNumber.innerHTML = `剩余雷数：${gVar.mineMap.length - gVar.marked.length}个`
    }
    //判断是否排除所有地雷
var isClear = function() {
        if (gVar === undefined) {
            console.log('gVar is undefined');
            return false
        }
        for (var i = 0; i < gVar.marked.length; i++) {
            if (!gVar.mineMap.includes(gVar.marked[i])) {
                console.log('isClear', `gVar.mineMap = ${gVar.mineMap} gVar.marked = ${gVar.marked}`);
                return false
            }
        }
        return true
    }
    //踩中地雷效果
function boom(element) {
    console.log('boom');
    toggleClass(element, 'mine9')
    if (!element.classList.contains('uncovered')) {
        element.classList.add('uncovered')
    }
    removeClassAll('covered')
    addClassAll('m9', 'mine9')
    console.log(`gVar.marked = ${gVar.marked} gVar.mineMap = ${gVar.mineMap}`);
    let rightMarked = 0
    for (var i = 0; i < gVar.marked.length; i++) {
        if (!gVar.mineMap.includes(gVar.marked[i])) {
            let tempElement = document.getElementById(gVar.marked[i])
            console.log('boom tempElement = ', tempElement);
            toggleClass(tempElement, 'mineWrong')
        } else {
            rightMarked++
        }
    }
    gVar.unfindMinesNumber.innerHTML = `剩余雷数：${gVar.mineMap.length - rightMarked}个`
    var myDate = new Date();
    gVar.finishTime = myDate.getTime()
    GuaActions(`BOOM !!!!
        time : ${(gVar.finishTime - gVar.startTime)/1000}s
        剩余雷数：${gVar.mineMap.length - rightMarked}个`, ['初级', '中级', '高级'], (x) => {
        console.log(`x = ${x}`);
        switch (x) {
            case '0':
                let button = e('#id-button-primary')
                console.log('button = ', button)
                button.click()
                break;
            case '1':
                e('#id-button-middle').click()
                break;
            case '2':
                e('#id-button-high').click()
                break;
            default:
        }
        console.log(`time : ${(gVar.finishTime - gVar.startTime)/1000}s`);
    })
}
//未踩中雷效果
function commonBoom(element) {
    console.log('commonBoom');
    element.innerHTML = element.dataset.value
    if (!element.classList.contains('uncovered')) {
        element.classList.add('uncovered')
    }
    //gVar.clicked.push(element.id)
}
//如果点击出周围地雷数为0则点亮周围
function showAround(element) {
    let x = element.dataset.locationx
    let y = element.dataset.locationy
    console.log('showAround', `x=${x} y=${y}`);
    // console.log('showAround', `e("#55")=${e("55")}`);
    for (let i = (Number(y) - 1); i <= (Number(y) + 1); i++) {
        for (let j = (Number(x) - 1); j <= (Number(x) + 1); j++) {
            if (i < 10 && i > 0) {
                var tempI = '0' + i.toString()
            } else {
                var tempI = i.toString()
            }
            if (j < 10 && i > 0) {
                var tempJ = '0' + j.toString()
            } else {
                var tempJ = j.toString()
            }
            let tempElement = document.getElementById(tempI + tempJ)
            console.log('tempElement = ', tempElement);
            if (tempElement) {
                console.log('showAround', tempElement.id);
                commonBoom(tempElement)
                if (tempElement.dataset.value == 0) {
                    if (!gVar.clicked.includes(tempElement.id)) {
                        tempElement.click()
                    }
                    console.log('showAround', `tempElement.dataset.value = ${tempElement.dataset.value}`);
                }
            }
        }
    }
}
//右击标记为雷操作
function rightClick() {
    function myRightClick() {
        log("右击成功！")
        console.log(this.classList)
        if (this.classList.contains('uncovered')) {
            return
        }
        if (this.classList.contains('mineMayBe')) {
            toggleClass(this, 'mineMayBe')
            for (let i = 0; i < gVar.marked.length; i++) {
                if (gVar.marked[i] === this.id) {
                    let temp1 = gVar.marked.slice(0, i)
                    let temp2 = gVar.marked.slice(i + 1)
                    gVar.marked = temp1.concat(temp2)
                    console.log('rightClick gVar.marked = ', gVar.marked);
                }
            }
            upDateUnfindMinesNumber()
        } else {
            toggleClass(this, 'mineMayBe')
            console.log(this.id);
            gVar.marked.push(this.id)
            console.log('rightClick', `gVar.marked = ${gVar.marked} gVar.wholeMine = ${gVar.wholeMine}`)
            upDateUnfindMinesNumber()
            if (gVar.wholeMine == gVar.marked.length && gVar.wholeMine != 0) {
                if (isClear()) {
                    let myDate = new Date();
                    gVar.finishTime = myDate.getTime()
                        //alert(`mines all clear !!!! time : ${(gVar.finishTime - gVar.startTime)/1000}s`)
                    GuaActions(`mines all clear !!!!
                        time : ${(gVar.finishTime - gVar.startTime)/1000}s`, ['初级', '中级', '高级'], (x) => {
                        console.log(`x = ${x}`);
                        switch (x) {
                            case '0':
                                let button = e('#id-button-primary')
                                console.log('button = ', button)
                                button.click()
                                break;
                            case '1':
                                e('#id-button-middle').click()
                                break;
                            case '2':
                                e('#id-button-high').click()
                                break;
                            default:
                        }
                        console.log(`time : ${(gVar.finishTime - gVar.startTime)/1000}s`);
                    })
                    removeClassAll('covered')
                    addClassAll('m9', 'mine9')
                } else {
                    boom(this)
                        // alert('boom!!!!!!!!!')
                        // removeClassAll('covered')
                        // addClassAll('m9', 'mine9')
                }
            }
        }
        return false
    }
    let mines = eAll(".mine")
    for (var i = 0; i < mines.length; i++) {
        mines[i].oncontextmenu = myRightClick
            //mines[i].bind('contextmenu', myRightClick)
    }
}
//左键单击操作
function check() {
    console.log('check');
    bindAll('.mine', 'click', (event) => {
        console.log('check', `event.target.innerHTML = ${event.target.innerHTML}`)
        console.log('check', `event.target.data.x = ${event.target.dataset.locationx}`)
        console.log('check', `event.target.data.y = ${event.target.dataset.locationy}`)
        console.log('check', `event.target.data.id = ${event.target.id}`)
        console.log('check', `event.target.data.value = ${event.target.dataset.value}`)
        let element = event.target
        let mineValue = event.target.dataset.value
        gVar.clicked.push(element.id)
        switch (mineValue) {
            case '9':
                console.log('check-boom');
                boom(element)
                    //alert('boom!!!!!!!!!')
                break;
            case '0':
                console.log('check-mineValue = 0');
                showAround(element)
                break;
            default:
                console.log('check-mineValue = 0 - 9');
                commonBoom(element)
                aroundIsChecked(element)
        }
    })
}
//如果左键点击后如果四周雷已被排空则点亮周围
var aroundIsChecked = function(element) {
    let x = element.dataset.locationx
    let y = element.dataset.locationy
    console.log('aroundIsChecked', `x=${x} y=${y}`);
    let aroundMarkedMines = []
    let aroundMines = []
    let aroundIds = []
    for (let i = (Number(y) - 1); i <= (Number(y) + 1); i++) {
        for (let j = (Number(x) - 1); j <= (Number(x) + 1); j++) {
            if (i < 10 && i > 0) {
                var tempI = '0' + i.toString()
            } else {
                var tempI = i.toString()
            }
            if (j < 10 && i > 0) {
                var tempJ = '0' + j.toString()
            } else {
                var tempJ = j.toString()
            }
            let tempElement = document.getElementById(tempI + tempJ)
            console.log('tempElement', tempElement);
            if (tempElement) {
                if (gVar.marked.includes(tempElement.id)) {
                    aroundMarkedMines.push(tempElement.id)
                }
                if (gVar.mineMap.includes(tempElement.id)) {
                    aroundMines.push(tempElement.id)
                }
                aroundIds.push(tempElement.id)
            }
            // if (tempElement) {
            //     console.log('showAround', tempElement.id);
            //     commonBoom(tempElement)
            //     if (tempElement.dataset.value == 0) {
            //         if (!gVar.clicked.includes(tempElement.id)) {
            //             tempElement.click()
            //         }
            //         console.log('showAround', `tempElement.dataset.value = ${tempElement.dataset.value}`);
            //     }
            // }
        }
    }
    console.log('aroundIsChecked', `aroundIds = ${aroundIds} aroundMarkedMines = ${aroundMarkedMines} aroundMines = ${aroundMines} gVar.mineMap = ${gVar.mineMap}`);
    if (aroundMarkedMines.length === aroundMines.length && aroundMines.length !== 0) {
        for (var i = 0; i < aroundMines.length; i++) {
            if (!gVar.mineMap.includes(aroundMarkedMines[i])) {
                boom(element)
                element.classList.remove('mine9')
                    // alert('boom!!!!!')
                    // removeClassAll('covered')
                    // addClassAll('m9', 'mine9')
                    // for (var i = 0; i < gVar.marked.length; i++) {
                    //     if (!gVar.mineMap.includes(gVar.marked[i])) {
                    //         let tempElement = document.getElementById(gVar.marked[i])
                    //         console.log('boom tempElement = ', tempElement);
                    //         toggleClass(tempElement, 'mineWrong')
                    //     }
                    // }
            }
        }

        for (var i = 0; i < aroundMines.length; i++) {
            if (!aroundMines.includes(aroundMarkedMines[i])) {
                return
            }
        }

        for (var i = 0; i < aroundIds.length; i++) {
            if (!gVar.clicked.includes(aroundIds[i]) && !aroundMines.includes(aroundIds[i])) {
                document.getElementById(aroundIds[i]).click()
            }
        }
    }
}

var random01 = function(n) {
    /*
    随机生成0-n 之间的一个数
    js 标准数学库有一个随机数函数
    Math.random()
    它返回 0 - 1 之间的小数

    用它实现本函数, 返回 0 或 1
    */
    // r 是一个 0 - 1 的小数
    var r = Math.random()
        // * 100000, 现在是 0 - 100000 的小数了
    r *= 100000
        // 取整, 现在是 0 - 100000 的整数了
    r = Math.floor(r)
        // 用余数来取随机 0-n
    return r % n
}

var randomLine01 = function(n) {
    //随机生产一串01
    /*
    返回一个只包含了 0 1 的随机 array, 长度为 n
    假设 n 为 5, 返回的数据格式如下(这是格式范例, 真实数据是随机的)
    [0, 0, 1, 0, 1]
    */
    var arr = []
    for (var i = 0; i < n; i++) {
        arr[i] = random01()
    }
    return arr
}

var randomLine09 = function(n, x) {
    //随机成生x个9
    /*
    返回一个只包含了 0 9 的随机 array, 长度为 n
    假设 n 为 5, x 为 2 ,返回的数据格式如下(这是格式范例, 真实数据是随机的)
    [0, 0, 9, 0, 9]
    */

    var arr = []
    var temp = []
    for (let i = 0; i < x; i++) {
        let num = random01(n)
        if (temp.includes(num)) {
            i--
            continue
        }
        temp[i] = num
    }
    console.log('randomLine01', `temp = ${temp}`);
    for (let i = 0; i < n; i++) {
        arr[i] = 0
    }
    for (let i = 0; i < temp.length; i++) {
        arr[temp[i]] = 9
    }
    console.log('randomLine01', `arr = ${arr}`);
    return arr
}

function randomLine(m, n, x) {
    //随机生成 M*N 0 9矩阵 有 x 个 9
    var arr = []
    let temp = randomLine09(m * n, x)
    for (var i = 0; i < n; i++) {
        arr.push(temp.slice(i * m, m * (i + 1)))
        log('randomLine', `temp = ${temp.slice(i, m*(i+1))}`)
    }
    return arr
}

var markedSquare = function(array) {
        //扫雷主逻辑
        /*
        array 是一个「包含了『只包含了 0 9 的 array』的 array」
        返回一个标记过的 array
        ** 注意, 使用一个新数组来存储结果, 不要直接修改老数组

        范例如下, 这是 array
        [
            [0, 9, 0, 0],
            [0, 0, 9, 0],
            [9, 0, 9, 0],
            [0, 9, 0, 0],
        ]

        这是标记后的结果
        [
            [1, 9, 2, 1],
            [2, 4, 9, 2],
            [9, 4, 9, 2],
            [2, 9, 2, 1],
        ]

        规则是, 0 会被设置为四周 8 个元素中 9 的数量
        */
        var arr = array.slice(0)
        for (var i = 0; i < array.length; i++) {
            for (var j = 0; j < array[i].length; j++) {
                if (array[i][j] === 0) {
                    // console.log('array[i][j] === 0', `i = ${i} j =${j}`);
                    var score = 0
                    for (var m = -1; m <= 1; m++) {
                        for (var n = -1; n <= 1; n++) {
                            if ((i + m) < 0 || (j + n) < 0 || (i + m) >= array.length || (j + n) > array[i].length) {
                                continue
                            } else {
                                // console.log('array[i + m][j + n] = ', `${array[i + m][j + n]} ; i + m =${i+m} j + n = ${j+ n}`);
                                if (array[i + m][j + n] === 9) {
                                    score++
                                }
                            }
                        }
                    }
                    arr[i][j] = score
                        // console.log(arr);
                }
            }
        }
        return arr
    }
    //生成随机棋盘
function makeRandomLine(buttonId) {
    console.log('makeRandomLine', `buttonId = ${buttonId}`);
    switch (buttonId) {
        case "id-button-primary":
            var arr = randomLine(8, 8, 10)
            gVar.wholeMine = 10
            break;
        case "id-button-middle":
            var arr = randomLine(16, 16, 48)
            gVar.wholeMine = 48
            break;
        case "id-button-high":
            var arr = randomLine(30, 16, 99)
            gVar.wholeMine = 99
            break;
        default:
            console.log('makeRandomLine false');
            var arr = []
    }
    gVar.randomLineArr = arr
    return markedSquare(arr)
}
//生成棋盘模板
function chessBoardTemplate(arr) {
    var t = ''
    for (var i = 0; i < arr.length; i++) {
        t += `
        <tr class="covered">`
        for (var j = 0; j < arr[i].length; j++) {
            //console.log('chessBoardTemplate', arr[i][j])
            if (i < 10 && i > 0) {
                var tempI = '0' + i.toString()
            } else {
                var tempI = i.toString()
            }
            if (j < 10 && i > 0) {
                var tempJ = '0' + j.toString()
            } else {
                var tempJ = j.toString()
            }
            //let locationInt = Number(location)
            t += `
            <td id=${tempI}${tempJ} class="mine m${arr[i][j]}" data-locationX=${tempJ} data-locationY=${tempI} data-value=${arr[i][j]}></td>`
        }
        t += `
        </tr>`
    }
    //console.log('chessBoardTemplate', t);
    return t
}
//插入棋盘模板
function buildLayout(t) {
    let container = e('#id-draw-table')
    removeChildAll('id-draw-table')
    appendHtml(container, t)
}
//按按钮生成棋盘逻辑
function generateLayout() {
    let buttonList = eAll('.level-button')
    for (var i = 0; i < buttonList.length; i++) {
        let button = buttonList[i]
        bindEvent(button, 'click', () => {
            //e('body').classList.add('modal-mask')
            let img = e('.background-image')
            img.classList.add('hide')
            delete gVar
            gVar = new mineApp()
            let myDate = new Date();
            gVar.startTime = myDate.getTime()
            console.log('gVar.startTime = ', gVar.startTime);
            let arr = makeRandomLine(button.id)
            console.log('generateLayout', arr);
            let t = chessBoardTemplate(arr)
            buildLayout(t)
            check()
            rightClick()
            setTimeout(init, 1000)
        })
    }
}

//alert 样式
var buttonTemplate = function(title, index) {
    var t = `
        <button class='modal-action-button'
                data-index="${index}">${title}</button>
    `
    return t
}

var GuaActions = function(title, actions, callback) {
    e('#unFind-mines-number').classList.add('hide')
        /*
        title 是 string
        actions 是一个包含 string 的数组
        callback 是一个如下的函数
        function(index) {
            // index 是下标, 具体如下
            // index 如果是 -1 表明用户点击了 cancel
        }

        这个函数生成一个弹窗页面
        弹窗包含 title 作为标题
        actions 里面的 string 作为标题生成按钮
        弹窗还包含一个 Cancel 按钮
        点击按钮的时候, 调用 callback(index)
        */
    var buttons = []
    for (var i = 0; i < actions.length; i++) {
        var a = actions[i]
        buttons.push(buttonTemplate(a, i))
    }
    var actionButtons = buttons.join('')
    var t = `
    <div class='modal-container modal-remove'>
        <div class='modal-mask'></div>
        <div class="modal-alert vertical-center">
            <div class="modal-title">
                ${title}
            </div>
            <div class="modal-message">
                ${actionButtons}
            </div>
            <div class='modal-control'>
                <button class="modal-button modal-action-button" data-index="-1">Cancel</button>
            </div>
        </div>
    </div>
    `
    appendHtml(e('body'), t)
        // css
    var css = `
    <style class="modal-remove">
        .modal-container {
            position: fixed;
            top: 0px;
            left: 0px;
            width: 100%;
            height: 100%;
        }
        .modal-mask {
            position: fixed;
            top: 0px;
            left: 0px;
            width: 100%;
            height: 100%;
            background: black;
            opacity: 0.5;
        }
        .modal-alert {
            margin: 0 auto;
            width: 200px;
            opacity: 1;
        }
        .modal-title {
            text-align: center;
            font-size: 27px;
            background: lightblue;
        }
        .modal-message {
            padding: 10px 5px;
            background: white;
        }
        .modal-input {
            width: 100%;
        }
        .modal-control {
            font-size: 0;
        }
        button {
            width: 100%;
        }
        .modal-button {
            height: 100%;
            font-size: 18px;
            border: 0;
        }
        .vertical-center {
            top: 50%;
            position: relative;
            transform: translateY(-50%);
        }
    </style>
    `
    appendHtml(e('head'), css)
        // event
    bindAll('.modal-action-button', 'click', function(event) {
        console.log('click button')
        var index = event.target.dataset.index
        callback(index)
        removeAll('.modal-remove')
    })
}

//备用画板
function draw() {
    console.log('draw');
    let canvas = e("#id-draw-table")
    if (canvas == null) {
        console.log('canvas false')
        return false
    }

    let context = canvas.getContext("2d")
        //实践表明在不设施fillStyle下的默认fillStyle=black
    context.fillRect(0, 0, 100, 100)
        //实践表明在不设施strokeStyle下的默认strokeStyle=black
    context.strokeRect(120, 0, 100, 100)

    //设置纯色
    context.fillStyle = "red"
    context.strokeStyle = "blue"
    context.fillRect(0, 120, 100, 100)
    context.strokeRect(120, 120, 100, 100)

    //设置透明度实践证明透明度值>0,<1值越低，越透明，值>=1时为纯色，值<=0时为完全透明
    context.fillStyle = "rgba(255,0,0,0.2)"
    context.strokeStyle = "rgba(255,0,0,0.2)"
    context.fillRect(240, 0, 100, 100)
    context.strokeRect(240, 120, 100, 100)
}
//初始化地雷坐标数组
function init() {
    let mines = eAll('.m9')
    console.log(mines);
    for (var i = 0; i < mines.length; i++) {
        gVar.mineMap.push(mines[i].id)
    }
    console.log('gVar.mineMap = ', gVar.mineMap)
    upDateUnfindMinesNumber()
    let buttonList = eAll('.level-button')
    for (var i = 0; i < buttonList.length; i++) {
        if (!buttonList[i].classList.contains("hide")) {
            buttonList[i].classList.add("hide")
        }
    }
    let num = e('#unFind-mines-number')
    if (num.classList.contains("hide")) {
        num.classList.remove("hide")
    }
    let replay = e('#id-button-replay')
    if (replay.classList.contains("hide")) {
        replay.classList.remove("hide")
    }
    //alert('可以开始了！！！！')
}

var bindButtonReplay = function() {
    let button = e('#id-button-replay')
    bindEvent(button, 'click', () => {
        location.replace(location.href)
    })
}

// window.ontouchstart = function(e) {
//     e.preventDefault();
// }

window.document.oncontextmenu = function() {
    return false;
}

function __main() {
    generateLayout()
    bindButtonReplay()
}

__main()
