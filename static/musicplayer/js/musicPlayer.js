var a = e('#id-audio-player')
//
function changeMusic() {
    let buttonChange = e('.mp3-list')
    buttonChange.addEventListener('click', function(event) {
        a.src = event.target.dataset.path
        buttonChange.dataset.num = event.target.dataset.num
        canAduioPlay()
        refresh()
    })
}

function canAduioPlay() {
    // a.addEventListener('canplay', function() {
    //     a.play()
    //     showPlayTime()
    // })
    let buttonPlay = e('#id-button-play')
    let buttonPause = e('#id-button-pause')
    bindEvent(a, 'canplay', function() {
        a.play()
        rotatePicture()
        showPlayTime()
        if (!(window.timer2 === undefined)) {
            console.log('timer2');
            clearInterval(timer2)
        }
        progressBarShow()
        buttonPlay.classList.add('hide')
        buttonPause.classList.remove('hide')
    })
}

function showPlayTime() {
    let currentTime = e('#id-apan-currentTime')
    let timeTotal = parseInt(a.duration)
    let timeCurrent = parseInt(a.currentTime)
    if (timeTotal > 59) {
        if (parseInt(a.duration % 60) > 10) {
            e('#id-apan-totalTime').innerHTML = `${parseInt(a.duration/60)}:${parseInt(a.duration % 60)}`
        } else {
            e('#id-apan-totalTime').innerHTML = `${parseInt(a.duration/60)}:0${parseInt(a.duration % 60)}`
        }
    } else {
        if (parseInt(a.duration % 60) > 10) {
            e('#id-apan-totalTime').innerHTML = `0:${parseInt(a.duration % 60)}`
        }
        e('#id-apan-totalTime').innerHTML = `0:0${parseInt(a.duration % 60)}`
    }

    timer1 = setInterval(function() {
        if (parseInt(a.currentTime) > 59) {
            if (parseInt(a.currentTime % 60) > 9) {
                currentTime.innerHTML = `${parseInt(a.currentTime/60)}:${parseInt(a.currentTime%60)}`
            } else {
                currentTime.innerHTML = `${parseInt(a.currentTime/60)}:0${parseInt(a.currentTime%60)}`
            }
        } else {
            if (a.currentTime > 9) {
                currentTime.innerHTML = `0:${parseInt(a.currentTime)}`
            } else {
                currentTime.innerHTML = `0:0${parseInt(a.currentTime)}`
            }
        }
    }, 1000)
}

function progressBarShow() {
    console.log(``);
    timer2 = setInterval(() => {
        let mDuration = parseInt(a.duration)
        let mCurrentTime = parseInt(a.currentTime)
        console.log('progressBarShow', parseInt(100 * (mCurrentTime / mDuration)))
        let progressBar = e('.img-progress-bar')
        progressBar.style.width = parseInt(100 * (mCurrentTime / mDuration)) + "%"
        console.log('progressBar', `progressBar.style = ${progressBar.style.width}`)
    }, 1000)

}

function pauseButton() {
    let buttonPlay = e('#id-button-play')
    let buttonPause = e('#id-button-pause')
    // buttonPause.addEventListener('click', function() {
    //     a.pause()
    //     clearInterval(timer1)
    // })
    bindEvent(buttonPause, 'click', function() {
        a.pause()
        removeClassAll('picture-rotate')
        clearInterval(timer1)
        buttonPlay.classList.remove('hide')
        buttonPause.classList.add('hide')
        clearInterval(timer2)
    })
}

function playButton() {
    let buttonPlay = e('#id-button-play')
    let buttonPause = e('#id-button-pause')
    // buttonPlay.addEventListener('click', function() {
    //     a.play()
    //     showPlayTime()
    // })
    bindEvent(buttonPlay, 'click', function() {
        a.play()
        rotatePicture()
        showPlayTime()
        buttonPlay.classList.add('hide')
        buttonPause.classList.remove('hide')
        progressBarShow()
    })
}

function nextMusic() {
    let musicList = ['./mp3/GARNiDELiA - 極楽浄土 (加速版).mp3', './mp3/周杰伦 - 给我一首歌的时间.mp3', './mp3/朴树 - 那些花儿(吉他版).mp3']
    nextButton = e('#id-button-next')
    // nextButton.addEventListener('click', function() {
    //     console.log(e('.mp3-list').dataset.num);
    //     let i = e('.mp3-list').dataset.num
    //     a.src = musicList[(i + 1) % 3]
    //     e('.mp3-list').dataset.num = (i + 1) % 3
    //     canAduioPlay()
    // })
    bindEvent(nextButton, 'click', function() {
        console.log(e('.mp3-list').dataset.num);
        let i = e('.mp3-list').dataset.num
        a.src = musicList[(i + 1) % 3]
        e('.mp3-list').dataset.num = (i + 1) % 3
        canAduioPlay()
        refresh()
        showPage('playingPage')
    })
    nextPrt = e('#id-button-pre')
    bindEvent(nextPrt, 'click', function() {
        console.log(e('.mp3-list').dataset.num);
        let i = e('.mp3-list').dataset.num
        if ((i - 1) < 0) {
            a.src = musicList[2]
            e('.mp3-list').dataset.num = 2

        } else {
            a.src = musicList[(i - 1) % 3]
            e('.mp3-list').dataset.num = (i - 1) % 3
        }


        canAduioPlay()
        refresh()
        showPage('playingPage')
    })
}

function autoNext() {
    // a.addEventListener('ended', function() {
    //     console.log('autoNext')
    //     nextButton.click()
    // })
    bindEvent(a, 'ended', function() {
        console.log('autoNext')
        nextButton.click()
    })
}

function changeBackColor() {
    //let mp3 = e('.mp3-list')
    //log('changeBackColor', `musicList = ${musicList}`)
    bindAll('.mp3', 'mouseenter', function(event) {
        log('changeBackColor', `event.target = ${event.target}`)
        removeClassAll('mp3-playing')
        toggleClass(event.target, 'mp3-playing')
    })
}

function keepBackColor() {
    let mp3List = e('.mp3-list')
    let mp3Button = eAll('.mp3')
    log('keepBackColor', `mp3List.dataset.num = ${mp3List.dataset.num}`)
    bindEvent(mp3List, 'mouseout', function() {
        for (var i = 0; i < mp3Button.length; i++) {
            //log('keepBackColor', `mp3Button[${i}] = ${mp3Button[i]}`)
            if (i == mp3List.dataset.num) {
                log('keepBackColor', `i = ${i}`)
                removeClassAll('mp3-playing')
                mp3Button[i].classList.add('mp3-playing')
            }
        }
    })
}

function refresh() {
    var musicPicture = eAll('.mp3-picture')
    let mp3List = e('.mp3-list')
    let mp3Button = eAll('.mp3')
    for (var i = 0; i < mp3Button.length; i++) {
        if (i == mp3List.dataset.num) {
            removeClassAll('mp3-playing')
            mp3Button[i].classList.add('mp3-playing')
        }
    }
    for (var i = 0; i < musicPicture.length; i++) {
        log('musicPicture', musicPicture[i])
        if (musicPicture[i].classList.contains('playingPage')) {
            musicPicture[i].classList.remove('playingPage')
        }
        if (i == mp3List.dataset.num) {
            log('i == event.target.dataset.num')
            musicPicture[i].classList.add('playingPage')
        }
    }
}

function showPage(className) {
    var pages = eAll('.mp3-page')
    log('pages', pages)
    for (var i = 0; i < pages.length; i++) {
        let page = pages[i]
        page.classList.add('mp3-hide')
    }
    // 给 todo-new 删掉 gua-hide
    var selector = '.' + className
    var todonewDiv = eAll(selector)
    for (var i = 0; i < todonewDiv.length; i++) {
        todonewDiv[i].classList.remove('mp3-hide')
    }
    // todonewDiv.classList.remove('mp3-hide')
    // 如果是 todolist 界面， 需要刷新
    // if (className == 'todo-list') {
    //     showTodoList()
    // }
    // if (className == 'todo-edit') {
    //     showTodoEdit()
    // }
}

function changePage() {
    let button = e('.page')
    bindEvent(button, 'click', function(event) {
        let className = event.target.name.split('-')[1]
        showPage(className)
        log(event.target.name)
        pushState(className)
    })

    window.addEventListener("popstate", function(e) {
        var state = e.state;
        // state 就是 pushState 的第一个参数
        var pageName = state.page
        log('pop state', state, pageName)
        showPage(pageName)
        // pushState(pageName)
        document.title = pageName.split('-')[1]
    })
}

var pushState = function(className) {
    // 切换地址栏信息
    // todo-new todo-list
    var pageName = className
    var url = 'index.html?page=' + pageName
    var state = {
        page: className
    }
    history.pushState(state, 'title', url)
    // 手动设置 title
    document.title = pageName
}

var initApp = function() {
    // 根据地址栏的参数来显示不同的页面
    var query = location.search
    var [k,
        v
    ] = query.slice(1).split('=')
    log('query = ', query)
    log('k = ', k)
    log('v = ', v)
    // 让 page 初始化为 list
    var page = 'ListPage'
    // 设置一个 合法的 page 参数集合
    var validPages = ['ListPage', 'playingPage']
    if (k == 'page') {
        if (validPages.includes(v)) {
            page = v
        }
    }
    // ["page", "list"]
    var pageName = page
    showPage(pageName)
}
//转动唱片
function rotatePicture() {
    //picture - rotate
    let picture = eAll('.mp3-picture')
    log('rotatePicture', picture)
    for (var i = 0; i < picture.length; i++) {
        if (picture[i].classList.contains('playingPage')) {
            console.log(`picture[${i}].classList.contains('playingPage')`);
            removeClassAll('picture-rotate')
            picture[i].classList.add('picture-rotate')
        }
    }
}

function main() {
    changeMusic()
    pauseButton()
    playButton()
    nextMusic()
    autoNext()
    changeBackColor()
    keepBackColor()
    changePage()
    initApp()
}

main()
